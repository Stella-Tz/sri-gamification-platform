import {
  CaseStudyRouteStage,
  Prisma,
} from "@prisma/client";

import prisma from "../prismaClient.js";

import {
  assertCaseStudyUnlocked,
  CASE_STUDY_ID,
  CaseStudyAccessError,
} from "./caseStudyService.js";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type GuidedImprovementFeedback =
  | "correct"
  | "wrong";

export type GuidedImprovementAnswer = {
  questionId: string;

  selectedOptionValue: string;

  isCorrect: boolean;

  attempts: number;
};

export type GuidedImprovementProgress = {
  currentIndex: number;

  selectedOptionValue?: string;

  feedback?:
    | GuidedImprovementFeedback
    | null;

  answers:
    GuidedImprovementAnswer[];

  completed: boolean;
};

type GuidedImprovementQuestionInternal = {
  id:
    | "highest-impact-criterion"
    | "highest-weight-domain"
    | "highest-impact-service";

  order: number;

  step:
    | "impact-criterion"
    | "technical-domain"
    | "service-impact";

  title: string;

  context: string;

  type:
    "single-choice";

  options: {
    value: string;
    label: string;
  }[];

  correctOptionValue: string;

  wrongFeedback: string;
};

type GuidedImprovementQuestionPublic =
  Omit<
    GuidedImprovementQuestionInternal,
    "correctOptionValue"
  >;

type CandidateService = {
  serviceId: string;
  serviceCode: string;
  serviceName: string;
  serviceGroup: string;

  technicalDomain: string;
  impactCriterion: string;

  currentLevelId: string;
  currentLevelNumber: number;
  currentLevelDescription: string;

  currentShare: number;

  currentAdditionalLevelId?: string;
  currentAdditionalLevelNumber?: number;
  currentAdditionalLevelDescription?: string;

  maxLevelId: string;
  maxLevelNumber: number;
  maxLevelDescription: string;

  maxImpactScore: number;
};

type GuidedImprovementDomainWeightingTable = {
  impactCriteria: string[];

  rows: {
    domain: string;

    weights:
      Record<
        string,
        number
      >;
  }[];
};

type GuidedImprovementServiceMaximumImpactScoresTable = {
  domain: string;

  impactCriteria: string[];

  rows: {
    serviceId: string;
    serviceCode: string;

    maxLevelNumber: number;

    scores:
      Record<
        string,
        number | null
      >;
  }[];
};

export type GuidedImprovementFindings = {
  highestImpactCriterion: string;

  highestWeightTechnicalDomain:
    string;

  highestImpactService:
    CandidateService;
};

type GuidedImprovementAnalysis = {
  questions:
    GuidedImprovementQuestionInternal[];

  highestImpactCriterion: string;

  highestWeightTechnicalDomain:
    string;

  candidateServices:
    CandidateService[];

  domainWeightingTable:
    GuidedImprovementDomainWeightingTable;

  serviceMaximumImpactScoresTable:
    GuidedImprovementServiceMaximumImpactScoresTable;

  findings:
    | GuidedImprovementFindings
    | null;
};

type GuidedImprovementResolvedContext = {
  highestImpactCriterion:
    | string
    | null;

  highestWeightTechnicalDomain:
    | string
    | null;

  candidateServices: {
    serviceId: string;
    serviceCode: string;
    maxImpactScore: number;
  }[];

  domainWeightingTable:
    | GuidedImprovementDomainWeightingTable
    | null;

  serviceMaximumImpactScoresTable:
    | GuidedImprovementServiceMaximumImpactScoresTable
    | null;
};

type GuidedImprovementResponse = {
  questions:
    GuidedImprovementQuestionPublic[];

  progress:
    GuidedImprovementProgress;

  resolvedContext:
    GuidedImprovementResolvedContext;

  hasSimulationScenario:
    boolean;

  findings:
    | GuidedImprovementFindings
    | null;
};

type CheckGuidedImprovementAnswerResult = {
  feedback:
    | "correct"
    | "wrong"
    | "empty";

  feedbackMessage: string;

  persisted: boolean;

  progress:
    GuidedImprovementProgress;

  resolvedContext:
    GuidedImprovementResolvedContext;

  hasSimulationScenario:
    boolean;
};

// -----------------------------------------------------------------------------
// Progress parsing
// -----------------------------------------------------------------------------

const createEmptyGuidedProgress =
  (): GuidedImprovementProgress => ({
    currentIndex: 0,

    selectedOptionValue:
      "",

    feedback:
      null,

    answers: [],

    completed: false,
  });

const readGuidedProgress = (
  value:
    Prisma.JsonValue
    | null,
): GuidedImprovementProgress => {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return createEmptyGuidedProgress();
  }

  const raw =
    value as {
      currentIndex?: unknown;

      selectedOptionValue?:
        unknown;

      feedback?:
        unknown;

      answers?:
        unknown;

      completed?:
        unknown;
    };

  const answers:
    GuidedImprovementAnswer[] =
    Array.isArray(
      raw.answers,
    )
      ? raw.answers.flatMap(
          (item) => {
            if (
              !item ||
              typeof item !==
                "object" ||
              Array.isArray(item)
            ) {
              return [];
            }

            const answer =
              item as {
                questionId?:
                  unknown;

                selectedOptionValue?:
                  unknown;

                isCorrect?:
                  unknown;

                attempts?:
                  unknown;
              };

            if (
              typeof answer
                .questionId !==
                "string" ||
              typeof answer
                .selectedOptionValue !==
                "string" ||
              typeof answer
                .isCorrect !==
                "boolean" ||
              typeof answer
                .attempts !==
                "number" ||
              !Number.isInteger(
                answer.attempts,
              ) ||
              answer.attempts < 1
            ) {
              return [];
            }

            return [
              {
                questionId:
                  answer.questionId,

                selectedOptionValue:
                  answer
                    .selectedOptionValue,

                isCorrect:
                  answer.isCorrect,

                attempts:
                  answer.attempts,
              },
            ];
          },
        )
      : [];

  const feedback =
    raw.feedback ===
      "correct" ||
    raw.feedback ===
      "wrong"
      ? raw.feedback
      : null;

  return {
    currentIndex:
      typeof raw.currentIndex ===
        "number" &&
      Number.isInteger(
        raw.currentIndex,
      )
        ? Math.max(
            0,
            raw.currentIndex,
          )
        : 0,

    selectedOptionValue:
      typeof raw
        .selectedOptionValue ===
        "string"
        ? raw
            .selectedOptionValue
        : "",

    feedback,

    answers,

    completed:
      raw.completed === true,
  };
};

const getAnswerForQuestion = (
  progress:
    GuidedImprovementProgress,

  questionId: string,
) => {
  return (
    progress.answers.find(
      (answer) =>
        answer.questionId ===
        questionId,
    ) ?? null
  );
};

const upsertAnswer = (
  answers:
    readonly GuidedImprovementAnswer[],

  nextAnswer:
    GuidedImprovementAnswer,
): GuidedImprovementAnswer[] => {
  return [
    ...answers.filter(
      (answer) =>
        answer.questionId !==
        nextAnswer.questionId,
    ),

    nextAnswer,
  ];
};

const feedbackFromAnswer = (
  answer:
    | GuidedImprovementAnswer
    | null,
):
  | GuidedImprovementFeedback
  | null => {
  if (!answer) {
    return null;
  }

  return answer.isCorrect
    ? "correct"
    : "wrong";
};

// -----------------------------------------------------------------------------
// Access / context
// -----------------------------------------------------------------------------

const isResultsInvestigationCompleted =
  (
    value:
      Prisma.JsonValue
      | null,
  ): boolean => {
    if (
      !value ||
      typeof value !==
        "object" ||
      Array.isArray(value)
    ) {
      return false;
    }

    return (
      (
        value as {
          completed?: unknown;
        }
      ).completed === true
    );
  };

const getGuidedContext =
  async (
    userId: string,
  ) => {
    await assertCaseStudyUnlocked(
      userId,
    );

    const progress =
      await prisma
        .userCaseStudyProgress
        .findUnique({
          where: {
            userId_caseStudyId: {
              userId,

              caseStudyId:
                CASE_STUDY_ID,
            },
          },

          include: {
            activeAttempt: {
              include: {
                country:
                  true,
              },
            },
          },
        });

    const attempt =
      progress
        ?.activeAttempt ??
      null;

    if (
      !progress ||
      !attempt ||
      !attempt
        .assessmentCompleted ||
      !attempt
        .baselineResult
    ) {
      throw new CaseStudyAccessError(
        "Complete the Service Assessment before starting Guided Improvement Analysis.",
      );
    }

    if (
      !isResultsInvestigationCompleted(
        attempt
          .resultsInvestigation,
      )
    ) {
      throw new CaseStudyAccessError(
        "Complete the Assessment Results Investigation before starting Guided Improvement Analysis.",
      );
    }

    if (
      !attempt
        .assessmentMethod ||
      !attempt
        .buildingType ||
      !attempt.country
    ) {
      throw new Error(
        "Completed Case Study attempt is missing the context required for Guided Improvement Analysis.",
      );
    }

    return {
      progress,
      attempt,
    };
  };

// -----------------------------------------------------------------------------
// Guided Improvement analysis
// -----------------------------------------------------------------------------

const GUIDED_COMPARISON_EPSILON =
  1e-9;

/*
 * Keep the question option order aligned with the
 * authoritative pre-backend frontend / official Excel
 * presentation order. Correctness is still resolved
 * from canonical database weights.
 */
const GUIDED_IMPACT_CRITERION_ORDER = [
  "Energy efficiency",
  "Energy flexibility and storage",
  "Comfort",
  "Convenience",
  "Health, well-being and accessibility",
  "Maintenance and fault prediction",
  "Information to occupants",
] as const;

const GUIDED_TECHNICAL_DOMAIN_ORDER = [
  "Heating",
  "Domestic hot water",
  "Cooling",
  "Ventilation",
  "Lighting",
  "Electricity",
  "Dynamic building envelope",
  "Electric vehicle charging",
  "Monitoring and control",
] as const;

const buildGuidedImprovementAnalysis =
  async (
    attempt:
      Awaited<
        ReturnType<
          typeof getGuidedContext
        >
      >["attempt"],
  ): Promise<
    GuidedImprovementAnalysis
  > => {
    const [
      impactCriteria,
      domains,
    ] = await Promise.all([
      prisma
        .sriImpactCriterion
        .findMany({
          orderBy: {
            order: "asc",
          },
        }),

      prisma
        .sriTechnicalDomain
        .findMany({
          orderBy: {
            order: "asc",
          },
        }),
    ]);

    if (
      impactCriteria.length ===
      0
    ) {
      throw new Error(
        "No SRI impact criteria are registered.",
      );
    }

    if (
      domains.length ===
      0
    ) {
      throw new Error(
        "No SRI technical domains are registered.",
      );
    }

    /*
     * Q1:
     * highest official impact-criterion weight.
     *
     * This is a single-choice educational question,
     * so the data must produce exactly one maximum.
     * A tie is a configuration error.
     */
    const highestImpactWeight =
      Math.max(
        ...impactCriteria.map(
          (criterion) =>
            criterion.overallWeight,
        ),
      );

    const highestImpactCriteria =
      impactCriteria.filter(
        (criterion) =>
          Math.abs(
            criterion.overallWeight -
            highestImpactWeight,
          ) <=
          GUIDED_COMPARISON_EPSILON,
      );

    if (
      highestImpactCriteria.length !==
      1
    ) {
      throw new Error(
        "Guided Improvement configuration error: Q1 must have exactly one highest-weight impact criterion.",
      );
    }

    const highestImpactCriterion =
      highestImpactCriteria[0]!;

    const allDomainWeights =
      await prisma
        .sriDomainWeight
        .findMany({
          where: {
            method:
              attempt
                .assessmentMethod!,

            buildingType:
              attempt
                .buildingType!,

            climateZone:
              attempt
                .country!
                .climateZone,
          },

          include: {
            domain:
              true,
          },
        });

    const domainWeights =
      allDomainWeights.filter(
        (item) =>
          item
            .impactCriterionId ===
          highestImpactCriterion
            .id,
      );

    if (
      domainWeights.length ===
      0
    ) {
      throw new Error(
        `No SRI domain weights were found for impact criterion "${highestImpactCriterion.name}".`,
      );
    }

    const domainWeightByCell =
      new Map(
        allDomainWeights.map(
          (item) => [
            `${item.domainId}|${item.impactCriterionId}`,
            item.weight,
          ] as const,
        ),
      );

    const domainWeightingTable:
      GuidedImprovementDomainWeightingTable =
      {
        impactCriteria:
          GUIDED_IMPACT_CRITERION_ORDER
            .map(
              (criterionName) =>
                criterionName,
            ),

        rows:
          domains.map(
            (domain) => {
              const weights:
                Record<
                  string,
                  number
                > = {};

              GUIDED_IMPACT_CRITERION_ORDER
                .forEach(
                  (
                    criterionName,
                  ) => {
                    const criterion =
                      impactCriteria.find(
                        (item) =>
                          item.name ===
                          criterionName,
                      );

                    if (!criterion) {
                      throw new Error(
                        `SRI impact criterion "${criterionName}" was not found.`,
                      );
                    }

                    const weight =
                      domainWeightByCell
                        .get(
                          `${domain.id}|${criterion.id}`,
                        );

                    if (
                      typeof weight !==
                      "number"
                    ) {
                      throw new Error(
                        `Missing SRI domain weight for ${domain.name} / ${criterion.name}.`,
                      );
                    }

                    weights[
                      criterionName
                    ] = weight;
                  },
                );

              return {
                domain:
                  domain.name,

                weights,
              };
            },
          ),
      };

    /*
     * Q2:
     * highest technical-domain weight for Q1.
     *
     * This is also single-choice, so a tie is
     * treated as a configuration error.
     */
    const highestDomainWeightValue =
      Math.max(
        ...domainWeights.map(
          (item) =>
            item.weight,
        ),
      );

    const highestDomainWeights =
      domainWeights.filter(
        (item) =>
          Math.abs(
            item.weight -
            highestDomainWeightValue,
          ) <=
          GUIDED_COMPARISON_EPSILON,
      );

    if (
      highestDomainWeights.length !==
      1
    ) {
      throw new Error(
        "Guided Improvement configuration error: Q2 must have exactly one highest-weight technical domain.",
      );
    }

    const highestWeightTechnicalDomain =
      highestDomainWeights[0]!
        .domain;

    /*
     * Q3:
     * only validated / assessed services
     * of the selected domain.
     */
    const serviceAnswers =
      await prisma
        .caseStudyAttemptServiceAnswer
        .findMany({
          where: {
            attemptId:
              attempt.id,

            validated:
              true,

            scenarioService: {
              caseStudyId:
                CASE_STUDY_ID,

              serviceMethod: {
                method:
                  attempt
                    .assessmentMethod!,

                service: {
                  domainId:
                    highestWeightTechnicalDomain
                      .id,
                },
              },
            },
          },

          include: {
            primaryLevel:
              true,

            additionalLevel:
              true,

            scenarioService: {
              include: {
                serviceMethod: {
                  include: {
                    service:
                      true,

                    levels: {
                      orderBy: {
                        level:
                          "asc",
                      },

                      include: {
                        impactScores:
                           true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

    const serviceMaximumImpactScoresTable:
      GuidedImprovementServiceMaximumImpactScoresTable =
      {
        domain:
          highestWeightTechnicalDomain
            .name,

        impactCriteria:
          GUIDED_IMPACT_CRITERION_ORDER
            .map(
              (criterionName) =>
                criterionName,
            ),

        rows:
          serviceAnswers.map(
            (answer) => {
              const method =
                answer
                  .scenarioService
                  .serviceMethod;

              const service =
                method.service;

              if (
                method.levels.length ===
                0
              ) {
                throw new Error(
                  `Service ${service.code} has no functionality levels.`,
                );
              }

              const maximumLevel =
                method.levels.reduce(
                  (
                    highest,
                    current,
                  ) =>
                    current.level >
                    highest.level
                      ? current
                      : highest,
                );

              const scores:
                Record<
                  string,
                  number | null
                > = {};

              GUIDED_IMPACT_CRITERION_ORDER
                .forEach(
                  (
                    criterionName,
                  ) => {
                    const criterion =
                      impactCriteria.find(
                        (item) =>
                          item.name ===
                          criterionName,
                      );

                    if (!criterion) {
                      throw new Error(
                        `SRI impact criterion "${criterionName}" was not found.`,
                      );
                    }

                    const score =
                      maximumLevel
                        .impactScores
                        .find(
                          (item) =>
                            item
                              .impactCriterionId ===
                            criterion.id,
                        )
                        ?.score;

                    scores[
                      criterionName
                    ] =
                      typeof score ===
                        "number" &&
                      Number.isFinite(
                        score,
                      )
                        ? score
                        : null;
                  },
                );

              return {
                serviceId:
                  service.id,

                serviceCode:
                  service.code,

                maxLevelNumber:
                  maximumLevel.level,

                scores,
              };
            },
          ),
      };
      
    const candidateServices:
      CandidateService[] =
      serviceAnswers
        .flatMap(
          (answer) => {
            if (
              !answer
                .primaryLevel
            ) {
              throw new Error(
                "A validated Case Study service answer is missing its primary functionality level.",
              );
            }

            const method =
              answer
                .scenarioService
                .serviceMethod;

            const service =
              method.service;

            if (
              method.levels.length ===
              0
            ) {
              throw new Error(
                `Service ${service.code} has no functionality levels.`,
              );
            }

            const maximumLevel =
              method.levels.reduce(
                (
                  highest,
                  current,
                ) =>
                  current.level >
                  highest.level
                    ? current
                    : highest,
              );

            /*
             * Same upgrade rule as the authoritative
             * pre-backend frontend:
             *
             * - share = 100:
             *   only the primary level applies.
             *
             * - share = 0:
             *   only the additional level applies.
             *
             * - 0 < share < 100:
             *   either implemented portion may still
             *   be below the maximum level.
             */
            if (
              !Number.isFinite(
                answer.share,
              ) ||
              answer.share < 0 ||
              answer.share > 100
            ) {
              throw new Error(
                `Invalid share ${answer.share} for service ${service.code}; expected 0–100.`,
              );
            }

            let canBeUpgraded:
              boolean;

            if (
              answer.share === 100
            ) {
              canBeUpgraded =
                answer
                  .primaryLevel
                  .level <
                maximumLevel
                  .level;
            } else {
              if (
                !answer
                  .additionalLevel
              ) {
                throw new Error(
                  `Validated service ${service.code} has a share below 100% without an additional functionality level.`,
                );
              }

              if (
                answer.share === 0
              ) {
                canBeUpgraded =
                  answer
                    .additionalLevel
                    .level <
                  maximumLevel
                    .level;
              } else {
                canBeUpgraded =
                  answer
                    .primaryLevel
                    .level <
                    maximumLevel
                      .level ||
                  answer
                    .additionalLevel
                    .level <
                    maximumLevel
                      .level;
              }
            }

            if (
              !canBeUpgraded
            ) {
              return [];
            }

            const maxImpactScore =
              maximumLevel
                .impactScores
                .find(
                  (item) =>
                    item
                      .impactCriterionId ===
                    highestImpactCriterion
                      .id,
                )
                ?.score;

            if (
              typeof maxImpactScore !==
                "number" ||
              !Number.isFinite(
                maxImpactScore,
              )
            ) {
              throw new Error(
                `Missing maximum-level impact score for service ${service.code} and criterion "${highestImpactCriterion.name}".`,
              );
            }

            return [
              {
                serviceId:
                  service.id,

                serviceCode:
                  service.code,

                serviceName:
                  method
                    .smartReadyService,

                serviceGroup:
                  method
                    .serviceGroup,

                technicalDomain:
                  highestWeightTechnicalDomain
                    .name,

                impactCriterion:
                  highestImpactCriterion
                    .name,

                currentLevelId:
                  answer
                    .primaryLevel
                    .sourceLevelKey,

                currentLevelNumber:
                  answer
                    .primaryLevel
                    .level,

                currentLevelDescription:
                  answer
                    .primaryLevel
                    .officialDescription,

                currentShare:
                  answer.share,

                ...(
                  answer.additionalLevel
                    ? {
                        currentAdditionalLevelId:
                          answer
                            .additionalLevel
                            .sourceLevelKey,

                        currentAdditionalLevelNumber:
                          answer
                            .additionalLevel
                            .level,

                        currentAdditionalLevelDescription:
                          answer
                            .additionalLevel
                            .officialDescription,
                      }
                    : {}
                ),

                maxLevelId:
                  maximumLevel
                    .sourceLevelKey,

                maxLevelNumber:
                  maximumLevel
                    .level,

                maxLevelDescription:
                  maximumLevel
                    .officialDescription,

                maxImpactScore,
              },
            ];
          },
        )
        .sort(
          (
            left,
            right,
          ) => {
            const impactDifference =
              right
                .maxImpactScore -
              left
                .maxImpactScore;

            if (
              impactDifference !==
              0
            ) {
              return impactDifference;
            }

            return left
              .serviceCode
              .localeCompare(
                right
                  .serviceCode,
              );
          },
        );

    let highestImpactService:
      CandidateService
      | null =
      null;

    if (
      candidateServices.length >
      0
    ) {
      const highestServiceImpactScore =
        Math.max(
          ...candidateServices.map(
            (service) =>
              service.maxImpactScore,
          ),
        );

      /*
       * The authoritative frontend stops after Q2
       * when every upgradeable service has a
       * maximum-level impact score of zero.
       */
      if (
        highestServiceImpactScore >
        GUIDED_COMPARISON_EPSILON
      ) {
        const highestImpactServices =
          candidateServices.filter(
            (service) =>
              Math.abs(
                service.maxImpactScore -
                highestServiceImpactScore,
              ) <=
              GUIDED_COMPARISON_EPSILON,
          );

        /*
         * Later product decision: these educational
         * questions are single-choice. If future data
         * creates a positive tie at the maximum, treat
         * it as a configuration error rather than
         * choosing an arbitrary service.
         */
        if (
          highestImpactServices.length !==
          1
        ) {
          throw new Error(
            "Guided Improvement configuration error: Q3 must have exactly one service with the highest positive maximum-level impact score.",
          );
        }

        highestImpactService =
          highestImpactServices[0]!;
      }
    }

    const impactCriterionQuestion:
      GuidedImprovementQuestionInternal =
      {
        id:
          "highest-impact-criterion",

        order: 1,

        step:
          "impact-criterion",

        title:
          "Which impact criterion has the highest official weight in the overall SRI calculation?",

        context:
          "Compare the official impact-criterion weights.",

        type:
          "single-choice",

        options:
          GUIDED_IMPACT_CRITERION_ORDER
            .map(
              (name) => ({
                value: name,
                label: name,
              }),
            ),

        correctOptionValue:
          highestImpactCriterion
            .name,

        wrongFeedback:
          "Not quite. Compare the official impact-criterion weights and identify the highest one.",
      };

    const technicalDomainQuestion:
      GuidedImprovementQuestionInternal =
      {
        id:
          "highest-weight-domain",

        order: 2,

        step:
          "technical-domain",

        title:
          `For ${highestImpactCriterion.name}, which technical domain has the highest weight?`,

        context:
          `Review the domain weighting table and compare the weights for ${highestImpactCriterion.name}.`,

        type:
          "single-choice",

        options:
          GUIDED_TECHNICAL_DOMAIN_ORDER
            .map(
              (name) => ({
                value: name,
                label: name,
              }),
            ),

        correctOptionValue:
          highestWeightTechnicalDomain
            .name,

        wrongFeedback:
          `Not quite. Look at the ${highestImpactCriterion.name} column in the domain weighting table and compare the domain weights.`,
      };

    const questions:
      GuidedImprovementQuestionInternal[] =
      [
        impactCriterionQuestion,
        technicalDomainQuestion,
      ];

    /*
     * If the highest-weight domain has no assessed
     * upgradeable service with a positive maximum-level
     * impact score, the analysis ends after Q2.
     *
     * Zero-score services remain valid Q3 comparison
     * options whenever another candidate has a positive
     * maximum-level impact score.
     */
    if (
      !highestImpactService
    ) {
      return {
        questions,

        highestImpactCriterion:
          highestImpactCriterion
            .name,

        highestWeightTechnicalDomain:
          highestWeightTechnicalDomain
            .name,

        candidateServices: [],

        domainWeightingTable,

        serviceMaximumImpactScoresTable,

        findings:
          null,
      };
    }

    /*
     * Q3 options come from exactly the same
     * candidate set used for the correct answer,
     * but are presented alphabetically by code.
     */
    const serviceOptions =
      [...candidateServices]
        .sort(
          (
            left,
            right,
          ) =>
            left
              .serviceCode
              .localeCompare(
                right
                  .serviceCode,
              ),
        )
        .map(
          (service) => ({
            value:
              service
                .serviceId,

            label:
              service
                .serviceCode,
          }),
        );

    questions.push({
      id:
        "highest-impact-service",

      order: 3,

      step:
        "service-impact",

      title:
        `Among the assessed services in ${highestWeightTechnicalDomain.name} that can still be upgraded, which service has the highest impact score for ${highestImpactCriterion.name} at its maximum functionality level?`,

      context:
        `Compare the maximum-level impact scores for ${highestImpactCriterion.name} among the assessed services in ${highestWeightTechnicalDomain.name} that can still be upgraded.`,

      type:
        "single-choice",

      options:
        serviceOptions,

      correctOptionValue:
        highestImpactService
          .serviceId,

      wrongFeedback:
        `Not quite. Review the assessed services in ${highestWeightTechnicalDomain.name} and compare their maximum-level impact scores for ${highestImpactCriterion.name}.`,
    });

    return {
      questions,

      highestImpactCriterion:
        highestImpactCriterion
          .name,

      highestWeightTechnicalDomain:
        highestWeightTechnicalDomain
          .name,

      candidateServices,
      
      domainWeightingTable,

      serviceMaximumImpactScoresTable,

      findings: {
        highestImpactCriterion:
          highestImpactCriterion
            .name,

        highestWeightTechnicalDomain:
          highestWeightTechnicalDomain
            .name,

        highestImpactService:
          highestImpactService,
      },
    };
  };

// -----------------------------------------------------------------------------
// Public view
// -----------------------------------------------------------------------------

const toPublicQuestion = (
  question:
    GuidedImprovementQuestionInternal,
): GuidedImprovementQuestionPublic => {
  const {
    correctOptionValue:
      _correctOptionValue,

    ...publicQuestion
  } = question;

  return publicQuestion;
};

const getResolvedContext = ({
  progress,
  analysis,
}: {
  progress:
    GuidedImprovementProgress;

  analysis:
    GuidedImprovementAnalysis;
}): GuidedImprovementResolvedContext => {
  const q1Answer =
    getAnswerForQuestion(
      progress,
      "highest-impact-criterion",
    );

  const q2Answer =
    getAnswerForQuestion(
      progress,
      "highest-weight-domain",
    );

  /*
   * Reveal only information the learner has
   * already established correctly.
   *
   * This lets the frontend render Q2/Q3 helper
   * tables without exposing future answers.
   */
  const impactCriterionResolved =
    q1Answer?.isCorrect ===
      true ||
    progress.currentIndex >
      0 ||
    progress.completed;

  const domainResolved =
    q2Answer?.isCorrect ===
      true ||
    progress.currentIndex >
      1 ||
    progress.completed;

  return {
    highestImpactCriterion:
      impactCriterionResolved
        ? analysis
            .highestImpactCriterion
        : null,

    highestWeightTechnicalDomain:
      domainResolved
        ? analysis
            .highestWeightTechnicalDomain
        : null,

    candidateServices:
      domainResolved
        ? analysis
            .candidateServices
            .map(
              (service) => ({
                serviceId:
                  service
                    .serviceId,

                serviceCode:
                  service
                    .serviceCode,

                maxImpactScore:
                  service
                    .maxImpactScore,
              }),
            )
        : [],

    /*
    * Q2 helper:
    * visible only after Q1 has
    * been correctly resolved.
    */
    domainWeightingTable:
      impactCriterionResolved
        ? analysis
            .domainWeightingTable
        : null,

    /*
    * Q3 helper:
    * visible only after Q2 has
    * been correctly resolved.
    */
    serviceMaximumImpactScoresTable:
      domainResolved
        ? analysis
            .serviceMaximumImpactScoresTable
        : null,
  };
};

const buildResponse = ({
  progress,
  analysis,
}: {
  progress:
    GuidedImprovementProgress;

  analysis:
    GuidedImprovementAnalysis;
}): GuidedImprovementResponse => {
  const safeIndex =
    analysis.questions.length ===
      0
      ? 0
      : Math.min(
          progress
            .currentIndex,

          analysis.questions
            .length -
            1,
        );

  const safeProgress = {
    ...progress,

    currentIndex:
      safeIndex,
  };

  return {
    questions:
      analysis
        .questions
        .map(
          toPublicQuestion,
        ),

    progress:
      safeProgress,

    resolvedContext:
      getResolvedContext({
        progress:
          safeProgress,

        analysis,
      }),

    hasSimulationScenario:
      analysis.findings !==
      null,

    findings:
      safeProgress.completed
        ? analysis.findings
        : null,
  };
};

// -----------------------------------------------------------------------------
// Persistence
// -----------------------------------------------------------------------------

const saveGuidedProgress =
  async ({
    attemptId,
    progress,
  }: {
    attemptId: string;

    progress:
      GuidedImprovementProgress;
  }) => {
    await prisma
      .caseStudyAttempt
      .update({
        where: {
          id:
            attemptId,
        },

        data: {
          lastVisitedStage:
            CaseStudyRouteStage
              .GUIDED_IMPROVEMENT_ANALYSIS,

          guidedImprovement:
            progress as unknown as
              Prisma.InputJsonValue,

          /*
           * Any real change to Guided
           * Improvement invalidates a
           * previously generated simulation.
           */
          simulationResult:
            Prisma.DbNull,

          completedAt:
            null,
        },
      });
  };

// -----------------------------------------------------------------------------
// GET Guided Improvement
// -----------------------------------------------------------------------------

export const getCaseStudyGuidedImprovement =
  async (
    userId: string,
  ): Promise<
    GuidedImprovementResponse
  > => {
    const {
      attempt,
    } =
      await getGuidedContext(
        userId,
      );

    const analysis =
      await buildGuidedImprovementAnalysis(
        attempt,
      );

    const progress =
      readGuidedProgress(
        attempt
          .guidedImprovement,
      );

    return buildResponse({
      progress,
      analysis,
    });
  };

// -----------------------------------------------------------------------------
// Check Answer
// -----------------------------------------------------------------------------

export const checkGuidedImprovementAnswer =
  async (
    userId: string,

    questionId: string,

    selectedOptionValue:
      string,
  ): Promise<
    CheckGuidedImprovementAnswerResult
  > => {
    const {
      progress:
        userProgress,

      attempt,
    } =
      await getGuidedContext(
        userId,
      );

    if (
      userProgress
        .officialAttemptId ===
        attempt.id
    ) {
      throw new CaseStudyAccessError(
        "The official completed Case Study can be reviewed but not modified.",
      );
    }

    const analysis =
      await buildGuidedImprovementAnalysis(
        attempt,
      );

    const rawProgress =
      readGuidedProgress(
        attempt
          .guidedImprovement,
      );

    const currentIndex =
      analysis.questions.length ===
        0
        ? 0
        : Math.min(
            rawProgress
              .currentIndex,

            analysis.questions
              .length -
              1,
          );

    const progress:
      GuidedImprovementProgress =
      {
        ...rawProgress,

        currentIndex,
      };

    if (
      progress.completed
    ) {
      throw new CaseStudyAccessError(
        "Guided Improvement Analysis is already completed.",
      );
    }

    const currentQuestion =
      analysis.questions[
        currentIndex
      ] ?? null;

    if (!currentQuestion) {
      throw new Error(
        "Current Guided Improvement question was not found.",
      );
    }

    if (
      currentQuestion.id !==
      questionId
    ) {
      throw new CaseStudyAccessError(
        "Only the current Guided Improvement question can be checked.",
      );
    }

    const normalizedValue =
      selectedOptionValue
        .trim();

    /*
     * Same behaviour as the frontend:
     * empty Check Answer is feedback only
     * and is not persisted as an attempt.
     */
    if (!normalizedValue) {
      return {
        feedback:
          "empty",

        feedbackMessage:
          "Please select an answer before checking.",

        persisted:
          false,

        progress,

        resolvedContext:
          getResolvedContext({
            progress,
            analysis,
          }),

        hasSimulationScenario:
          analysis.findings !==
          null,
      };
    }

    const allowedValues =
      new Set(
        currentQuestion
          .options
          .map(
            (option) =>
              option.value,
          ),
      );

    if (
      !allowedValues.has(
        normalizedValue,
      )
    ) {
      throw new CaseStudyAccessError(
        "The selected option is not valid for this question.",
      );
    }

    const isCorrect =
      normalizedValue ===
      currentQuestion
        .correctOptionValue;

    const existingAnswer =
      getAnswerForQuestion(
        progress,
        questionId,
      );

    const nextAnswer:
      GuidedImprovementAnswer =
      {
        questionId,

        selectedOptionValue:
          normalizedValue,

        isCorrect,

        attempts:
          (
            existingAnswer
              ?.attempts ??
            0
          ) + 1,
      };

    const nextProgress:
      GuidedImprovementProgress =
      {
        ...progress,

        selectedOptionValue:
          normalizedValue,

        feedback:
          isCorrect
            ? "correct"
            : "wrong",

        answers:
          upsertAnswer(
            progress.answers,
            nextAnswer,
          ),

        completed:
          false,
      };

    await saveGuidedProgress({
      attemptId:
        attempt.id,

      progress:
        nextProgress,
    });

    const isLastQuestion =
      currentIndex ===
      analysis.questions
        .length -
        1;

    return {
      feedback:
        isCorrect
          ? "correct"
          : "wrong",

      feedbackMessage:
        isCorrect
          ? (
              isLastQuestion
                ? analysis
                    .findings
                  ? "Correct. The selected simulation scenario is now ready."
                  : "Correct. The analysis outcome is now ready."
                : "Correct. You can continue to the next step."
            )
          : currentQuestion
              .wrongFeedback,

      persisted:
        true,

      progress:
        nextProgress,

      resolvedContext:
        getResolvedContext({
          progress:
            nextProgress,

          analysis,
        }),

      hasSimulationScenario:
        analysis.findings !==
        null,
    };
  };

// -----------------------------------------------------------------------------
// Next Question / Complete Analysis
// -----------------------------------------------------------------------------

export const advanceGuidedImprovement =
  async (
    userId: string,
  ) => {
    const {
      progress:
        userProgress,

      attempt,
    } =
      await getGuidedContext(
        userId,
      );

    if (
      userProgress
        .officialAttemptId ===
        attempt.id
    ) {
      throw new CaseStudyAccessError(
        "The official completed Case Study can be reviewed but not modified.",
      );
    }

    const analysis =
      await buildGuidedImprovementAnalysis(
        attempt,
      );

    const rawProgress =
      readGuidedProgress(
        attempt
          .guidedImprovement,
      );

    const currentIndex =
      analysis.questions.length ===
        0
        ? 0
        : Math.min(
            rawProgress
              .currentIndex,

            analysis.questions
              .length -
              1,
          );

    const progress:
      GuidedImprovementProgress =
      {
        ...rawProgress,

        currentIndex,
      };

    if (
      progress.completed
    ) {
      return buildResponse({
        progress,
        analysis,
      });
    }

    const currentQuestion =
      analysis.questions[
        currentIndex
      ] ?? null;

    if (!currentQuestion) {
      throw new Error(
        "Current Guided Improvement question was not found.",
      );
    }

    const currentAnswer =
      getAnswerForQuestion(
        progress,
        currentQuestion.id,
      );

    if (
      currentAnswer
        ?.isCorrect !==
        true
    ) {
      throw new CaseStudyAccessError(
        "Answer the current Guided Improvement question correctly before continuing.",
      );
    }

    const isLastQuestion =
      currentIndex ===
      analysis.questions
        .length -
        1;

    if (isLastQuestion) {
      const nextProgress:
        GuidedImprovementProgress =
        {
          ...progress,

          completed:
            true,
        };

      await saveGuidedProgress({
        attemptId:
          attempt.id,

        progress:
          nextProgress,
      });

      return buildResponse({
        progress:
          nextProgress,

        analysis,
      });
    }

    const nextIndex =
      currentIndex + 1;

    const nextQuestion =
      analysis.questions[
        nextIndex
      ] ?? null;

    if (!nextQuestion) {
      throw new Error(
        "Next Guided Improvement question was not found.",
      );
    }

    const savedNextAnswer =
      getAnswerForQuestion(
        progress,
        nextQuestion.id,
      );

    const nextProgress:
      GuidedImprovementProgress =
      {
        ...progress,

        currentIndex:
          nextIndex,

        selectedOptionValue:
          savedNextAnswer
            ?.selectedOptionValue ??
          "",

        feedback:
          feedbackFromAnswer(
            savedNextAnswer,
          ),

        completed:
          false,
      };

    await saveGuidedProgress({
      attemptId:
        attempt.id,

      progress:
        nextProgress,
    });

    return buildResponse({
      progress:
        nextProgress,

      analysis,
    });
  };

// -----------------------------------------------------------------------------
// Simulation bridge
// -----------------------------------------------------------------------------

export const getCompletedGuidedImprovementScenario =
  async (
    userId: string,
  ) => {
    const {
      attempt,
    } =
      await getGuidedContext(
        userId,
      );

    const analysis =
      await buildGuidedImprovementAnalysis(
        attempt,
      );

    const progress =
      readGuidedProgress(
        attempt
          .guidedImprovement,
      );

    if (
      !progress.completed
    ) {
      throw new CaseStudyAccessError(
        "Complete Guided Improvement Analysis before running the Simulation.",
      );
    }

    if (
      !analysis.findings
    ) {
      throw new CaseStudyAccessError(
        "No upgrade candidate is available for the current Guided Improvement Analysis.",
      );
    }

    return {
      attemptId:
        attempt.id,

      findings:
        analysis.findings,
    };
  };

