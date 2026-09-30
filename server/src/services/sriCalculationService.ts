import {
  DomainPresence,
} from "@prisma/client";

import prisma from "../prismaClient.js";

import {
  assertCaseStudyUnlocked,
  CASE_STUDY_ID,
  CaseStudyAccessError,
} from "./caseStudyService.js";

type ScoreAccumulator = {
  actual: number;
  maximum: number;
};

type ResultServiceEntry = {
  serviceId: string;
  serviceCode: string;
  serviceName: string;
  serviceGroup: string;
  domain: string;

  selectedLevelId: string;
  selectedLevelNumber: number;
  selectedLevelDescription: string;

  maxLevelId: string;
  maxLevelNumber: number;
  maxLevelDescription: string;

  share: number;

  additionalLevelId?: string;
  additionalLevelNumber?: number;
  additionalLevelDescription?: string;

  impacts: string[];
};

type GuidedInvestigationQuestionInternal = {
  id: string;
  order: number;
  prompt: string;
  helperText?: string;
  type: "single-choice" | "multiple-choice";
  options: {
    value: string;
    label: string;
  }[];
  correctOptionValues: string[];
};

type GuidedInvestigationFindingsInternal = {
  weakestKeyFunctionality: string;
  lowestImpactCriterion: string;
  weakestTechnicalDomains: string[];
  candidateServices: {
    serviceId: string;
    serviceCode: string;
    serviceName: string;
    serviceGroup: string;
  }[];
};

export type SriCalculationResultInternal = {
  totalScore: number;
  sriClass: "A" | "B" | "C" | "D" | "E" | "F" | "G";

  domainScores: {
    domain: string;
    score: number | null;
  }[];

  impactScores: {
    impactCriterion: string;
    score: number | null;
  }[];

  keyFunctionalityScores: {
    keyFunctionality: string;
    score: number | null;
  }[];

  scoreMatrix: {
    domain: string;
    impactCriterion: string;
    score: number | null;
  }[];

  guidedInvestigationQuestions:
    GuidedInvestigationQuestionInternal[];

  guidedInvestigationFindings:
    GuidedInvestigationFindingsInternal;

  presentDomains: string[];
  absentMandatoryDomains: string[];
  absentNotMandatoryDomains: string[];

  servicesByDomain:
    Record<string, ResultServiceEntry[]>;
};

export type SriCalculationResultPublic = Omit<
  SriCalculationResultInternal,
  | "guidedInvestigationQuestions"
  | "guidedInvestigationFindings"
> & {
  guidedInvestigationQuestions: {
    id: string;
    order: number;
    prompt: string;
    helperText?: string;
    type: "single-choice" | "multiple-choice";
    options: {
      value: string;
      label: string;
    }[];
  }[];
};


export type SriSimulationOverride = {
  serviceId: string;

  selectedLevelId: string;

  share: number;

  additionalLevelId?:
    | string
    | null;
};

const getScorePercentage = (
  actual: number,
  maximum: number,
): number | null => {
  if (maximum === 0) {
    return null;
  }

  return (actual / maximum) * 100;
};

const getSriClass = (
  score: number,
): SriCalculationResultInternal["sriClass"] => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  if (score >= 35) return "E";
  if (score >= 20) return "F";

  return "G";
};

const createOptions = (
  values: readonly string[],
) => {
  return values.map((value) => ({
    value,
    label: value,
  }));
};

const formatList = (
  values: readonly string[],
): string => {
  if (values.length === 0) return "";
  if (values.length === 1) return values[0] ?? "";

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
};

const RESULTS_COMPARISON_EPSILON =
  1e-9;

const getUniqueLowestScoredItem = <
  TItem extends {
    score: number | null;
  },
>(
  items: readonly TItem[],
  configurationLabel: string,
): TItem | null => {
  const scoredItems = items.filter(
    (
      item,
    ): item is TItem & {
      score: number;
    } => item.score !== null,
  );

  if (scoredItems.length === 0) {
    return null;
  }

  const lowestScore =
    Math.min(
      ...scoredItems.map(
        (item) => item.score,
      ),
    );

  const lowestItems =
    scoredItems.filter(
      (item) =>
        Math.abs(
          item.score -
            lowestScore,
        ) <=
        RESULTS_COMPARISON_EPSILON,
    );

  /*
   * These Results Investigation steps are
   * intentionally single-choice and the
   * following questions depend on one
   * unambiguous path.
   *
   * Never resolve a tie by array / DB order.
   * A tie is a configuration error instead.
   */
  if (lowestItems.length !== 1) {
    throw new Error(
      `Results Investigation configuration error: ${configurationLabel} must have exactly one lowest-scoring item.`,
    );
  }

  return lowestItems[0] ?? null;
};

const canServiceStillBeImproved = (
  service: ResultServiceEntry,
): boolean => {
  if (
    !Number.isFinite(service.share) ||
    service.share < 0 ||
    service.share > 100
  ) {
    throw new Error(
      `Invalid share ${service.share} for service ${service.serviceCode}.`,
    );
  }

  if (
    service.additionalLevelNumber ===
      undefined ||
    service.share >= 100
  ) {
    return (
      service.selectedLevelNumber <
      service.maxLevelNumber
    );
  }

  const currentLevelRatio =
    service.selectedLevelNumber *
      (service.share / 100) +
    service.additionalLevelNumber *
      ((100 - service.share) / 100);

  return (
    currentLevelRatio <
    service.maxLevelNumber
  );
};

const calculateSriResult =
  async (
    userId: string,

    override:
      | SriSimulationOverride
      | null =
      null,
  ): Promise<
    SriCalculationResultInternal
  > => {
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
                country: true,

                domainPresence: {
                  include: {
                    domain: true,
                  },
                },

                serviceAnswers: {
                  where: {
                    validated: true,
                  },

                  include: {
                    scenarioService: {
                      include: {
                        serviceMethod: {
                          include: {
                            service: {
                              include: {
                                domain: true,
                              },
                            },
                          },
                        },
                      },
                    },

                    primaryLevel: true,
                    additionalLevel: true,
                  },
                },
              },
            },
          },
        });

    const attempt =
      progress?.activeAttempt ??
      null;

    if (
      !attempt ||
      !attempt.setupCompleted
    ) {
      throw new CaseStudyAccessError(
        "Complete the building Setup before calculating the SRI result.",
      );
    }

    if (
      !attempt.buildingType ||
      !attempt.assessmentMethod ||
      !attempt.country
    ) {
      throw new Error(
        "Completed Setup is missing SRI calculation context.",
      );
    }

    const [
      domains,
      impactCriteria,
      keyFunctionalities,
      serviceMethods,
      selectedScenarioServices,
      domainWeights,
    ] = await Promise.all([
      prisma.sriTechnicalDomain
        .findMany({
          orderBy: {
            order: "asc",
          },
        }),

      prisma.sriImpactCriterion
        .findMany({
          orderBy: {
            order: "asc",
          },

          include: {
            keyFunctionality: true,
          },
        }),

      prisma.sriKeyFunctionality
        .findMany({
          orderBy: {
            order: "asc",
          },
        }),

      prisma.sriServiceMethod
        .findMany({
          where: {
            method:
              attempt.assessmentMethod,
          },

          include: {
            service: {
              include: {
                domain: true,
              },
            },

            levels: {
              orderBy: {
                level: "asc",
              },

              include: {
                impactScores: true,
              },
            },
          },
        }),

      prisma.caseStudySelectedService
        .findMany({
          where: {
            caseStudyId:
              CASE_STUDY_ID,

            serviceMethod: {
              method:
                attempt.assessmentMethod,
            },
          },

          orderBy: {
            order: "asc",
          },

          include: {
            serviceMethod: {
              include: {
                service: {
                  include: {
                    domain: true,
                  },
                },
              },
            },
          },
        }),

      prisma.sriDomainWeight
        .findMany({
          where: {
            method:
              attempt.assessmentMethod,

            buildingType:
              attempt.buildingType,

            climateZone:
              attempt.country
                .climateZone,
          },
        }),
    ]);

    if (
      domains.length === 0 ||
      impactCriteria.length === 0 ||
      keyFunctionalities.length === 0 ||
      serviceMethods.length === 0
    ) {
      throw new Error(
        "Canonical SRI reference data is incomplete.",
      );
    }

    const domainPresenceById =
      new Map(
        attempt.domainPresence.map(
          (item) => [
            item.domainId,
            item.status,
          ],
        ),
      );

    for (const domain of domains) {
      if (
        !domainPresenceById.has(
          domain.id,
        )
      ) {
        throw new Error(
          `Domain presence is missing for \"${domain.name}\".`,
        );
      }
    }

    const applicableServiceIds =
      new Set(
        selectedScenarioServices
          .filter(
            (selected) =>
              domainPresenceById.get(
                selected
                  .serviceMethod
                  .service
                  .domainId,
              ) ===
              DomainPresence.PRESENT,
          )
          .map(
            (selected) =>
              selected
                .serviceMethod
                .service
                .id,
          ),
      );

    const selectedServiceOrder =
      new Map(
        selectedScenarioServices.map(
          (selected) => [
            selected
              .serviceMethod
              .service
              .id,
            selected.order,
          ],
        ),
      );

    const validatedAnswersByServiceId =
      new Map(
        attempt.serviceAnswers.map(
          (answer) => [
            answer
              .scenarioService
              .serviceMethod
              .service
              .id,
            answer,
          ],
        ),
      );

    if (override) {
      const currentAnswer =
        validatedAnswersByServiceId.get(
          override.serviceId,
        );

      if (
        !currentAnswer ||
        !currentAnswer
          .primaryLevel
      ) {
        throw new CaseStudyAccessError(
          "The simulated service must already have a validated Assessment answer.",
        );
      }

      const method =
        serviceMethods.find(
          (item) =>
            item.service.id ===
            override.serviceId,
        );

      if (!method) {
        throw new CaseStudyAccessError(
          "The simulated service is not part of the current SRI catalogue.",
        );
      }

      const primaryLevel =
        method.levels.find(
          (level) =>
            level.sourceLevelKey ===
            override
              .selectedLevelId,
        );

      if (!primaryLevel) {
        throw new CaseStudyAccessError(
          "The simulated functionality level is not valid for the selected service.",
        );
      }

      if (
        !Number.isFinite(
          override.share,
        ) ||
        override.share < 0 ||
        override.share > 100
      ) {
        throw new CaseStudyAccessError(
          "The simulated functionality-level share must be between 0 and 100.",
        );
      }

      const normalizedAdditionalLevelId =
        override
          .additionalLevelId
          ?.trim() ||
        null;

      const additionalLevel =
        normalizedAdditionalLevelId
          ? method.levels.find(
              (level) =>
                level.sourceLevelKey ===
                normalizedAdditionalLevelId,
            ) ??
            null
          : null;

      if (
        normalizedAdditionalLevelId &&
        !additionalLevel
      ) {
        throw new CaseStudyAccessError(
          "The simulated additional functionality level is not valid for the selected service.",
        );
      }

      if (
        override.share < 100 &&
        !additionalLevel
      ) {
        throw new CaseStudyAccessError(
          "A simulated partial implementation requires an additional functionality level.",
        );
      }

      if (
        override.share === 100 &&
        additionalLevel
      ) {
        throw new CaseStudyAccessError(
          "No additional functionality level is allowed when the simulated share is 100%.",
        );
      }

      /*
       * Simulation override exists only in memory.
       * The validated baseline Assessment answer
       * stored in PostgreSQL is never modified.
       */
      validatedAnswersByServiceId.set(
        override.serviceId,
        {
          ...currentAnswer,

          primaryLevelId:
            primaryLevel.id,

          share:
            override.share,

          additionalLevelId:
            additionalLevel
              ?.id ??
            null,

          primaryLevel,

          additionalLevel,
        },
      );
    }

    for (
      const serviceId of
      applicableServiceIds
    ) {
      const answer =
        validatedAnswersByServiceId.get(
          serviceId,
        );

      if (!answer?.primaryLevel) {
        throw new CaseStudyAccessError(
          "Complete and validate every service before submitting the Assessment.",
        );
      }
    }

    const weightByCell =
      new Map(
        domainWeights.map(
          (item) => [
            `${item.domainId}|${item.impactCriterionId}`,
            item.weight,
          ],
        ),
      );

    const matrix =
      new Map<
        string,
        Map<
          string,
          ScoreAccumulator
        >
      >();

    domains.forEach((domain) => {
      const byCriterion =
        new Map<
          string,
          ScoreAccumulator
        >();

      impactCriteria.forEach(
        (criterion) => {
          byCriterion.set(
            criterion.id,
            {
              actual: 0,
              maximum: 0,
            },
          );
        },
      );

      matrix.set(
        domain.id,
        byCriterion,
      );
    });

    const getCell = (
      domainId: string,
      criterionId: string,
    ) => {
      const cell =
        matrix
          .get(domainId)
          ?.get(criterionId);

      if (!cell) {
        throw new Error(
          `Missing score matrix cell for domain ${domainId} and criterion ${criterionId}.`,
        );
      }

      return cell;
    };

    const getImpactScoreAtLevel = (
      level: (typeof serviceMethods)[number]["levels"][number],
      criterionId: string,
    ): number => {
      const score =
        level.impactScores.find(
          (item) =>
            item.impactCriterionId ===
            criterionId,
        )?.score;

      if (
        typeof score !== "number" ||
        !Number.isFinite(score)
      ) {
        throw new Error(
          `Missing impact score for functionality level ${level.sourceLevelKey}.`,
        );
      }

      return score;
    };

    const getMaximumLevel = (
      method: (typeof serviceMethods)[number],
    ) => {
      const maximum =
        method.levels.reduce<
          (typeof method.levels)[number] | null
        >(
          (current, level) =>
            !current ||
            level.level >
              current.level
              ? level
              : current,
          null,
        );

      if (!maximum) {
        throw new Error(
          `Service ${method.service.code} has no functionality levels.`,
        );
      }

      return maximum;
    };

    const getLevelZero = (
      method: (typeof serviceMethods)[number],
    ) => {
      const levelZero =
        method.levels.find(
          (level) =>
            level.level === 0,
        );

      if (!levelZero) {
        throw new Error(
          `Service ${method.service.code} has no functionality level 0.`,
        );
      }

      return levelZero;
    };

    const getLevelForMaximum = (
      method: (typeof serviceMethods)[number],
      presence: DomainPresence,
      isApplicable: boolean,
    ) => {
      if (
        presence ===
        DomainPresence.PRESENT
      ) {
        if (
          method.triageValue === 1 ||
          isApplicable
        ) {
          return getMaximumLevel(
            method,
          );
        }

        return getLevelZero(
          method,
        );
      }

      if (
        presence ===
          DomainPresence.ABSENT_MANDATORY &&
        method.triageValue === 1
      ) {
        return getMaximumLevel(
          method,
        );
      }

      return null;
    };

    const getActualScore = (
      method: (typeof serviceMethods)[number],
      answer: (typeof attempt.serviceAnswers)[number],
      criterionId: string,
    ) => {
      const primaryLevel =
        method.levels.find(
          (level) =>
            level.id ===
            answer.primaryLevelId,
        );

      if (!primaryLevel) {
        throw new Error(
          `Invalid primary functionality level for service ${method.service.code}.`,
        );
      }

      if (
        !Number.isFinite(
          answer.share,
        ) ||
        answer.share < 0 ||
        answer.share > 100
      ) {
        throw new Error(
          `Invalid share for service ${method.service.code}.`,
        );
      }

      const primaryScore =
        getImpactScoreAtLevel(
          primaryLevel,
          criterionId,
        );

      if (
        answer.share === 100
      ) {
        return primaryScore;
      }

      if (
        !answer.additionalLevelId
      ) {
        throw new Error(
          `Service ${method.service.code} requires an additional functionality level.`,
        );
      }

      const additionalLevel =
        method.levels.find(
          (level) =>
            level.id ===
            answer.additionalLevelId,
        );

      if (!additionalLevel) {
        throw new Error(
          `Invalid additional functionality level for service ${method.service.code}.`,
        );
      }

      const additionalScore =
        getImpactScoreAtLevel(
          additionalLevel,
          criterionId,
        );

      return (
        primaryScore *
          (answer.share / 100) +
        additionalScore *
          ((100 - answer.share) /
            100)
      );
    };

    serviceMethods.forEach(
      (method) => {
        const domainId =
          method.service.domainId;

        const presence =
          domainPresenceById.get(
            domainId,
          );

        if (!presence) {
          throw new Error(
            `Domain presence is missing for service ${method.service.code}.`,
          );
        }

        const isApplicable =
          presence ===
            DomainPresence.PRESENT &&
          applicableServiceIds.has(
            method.service.id,
          );

        const levelForMaximum =
          getLevelForMaximum(
            method,
            presence,
            isApplicable,
          );

        const answer =
          validatedAnswersByServiceId.get(
            method.service.id,
          );

        impactCriteria.forEach(
          (criterion) => {
            const cell = getCell(
              domainId,
              criterion.id,
            );

            if (levelForMaximum) {
              cell.maximum +=
                getImpactScoreAtLevel(
                  levelForMaximum,
                  criterion.id,
                );
            }

            if (
              !isApplicable ||
              !answer
            ) {
              return;
            }

            cell.actual +=
              getActualScore(
                method,
                answer,
                criterion.id,
              );
          },
        );
      },
    );

    const scoreMatrix =
      domains.flatMap(
        (domain) =>
          impactCriteria.map(
            (criterion) => {
              const cell = getCell(
                domain.id,
                criterion.id,
              );

              return {
                domain:
                  domain.name,

                impactCriterion:
                  criterion.name,

                score:
                  getScorePercentage(
                    cell.actual,
                    cell.maximum,
                  ),
              };
            },
          ),
      );

    const impactScores =
      impactCriteria.map(
        (criterion) => {
          let weightedActual = 0;
          let weightedMaximum = 0;

          domains.forEach(
            (domain) => {
              const cell = getCell(
                domain.id,
                criterion.id,
              );

              const weight =
                weightByCell.get(
                  `${domain.id}|${criterion.id}`,
                );

              if (
                typeof weight !==
                "number"
              ) {
                throw new Error(
                  `Missing domain weight for ${domain.name} / ${criterion.name}.`,
                );
              }

              weightedActual +=
                cell.actual *
                weight;

              weightedMaximum +=
                cell.maximum *
                weight;
            },
          );

          return {
            impactCriterion:
              criterion.name,

            score:
              getScorePercentage(
                weightedActual,
                weightedMaximum,
              ),
          };
        },
      );

    const domainScores =
      domains.map((domain) => {
        let weightedScore = 0;
        let totalWeight = 0;

        impactCriteria.forEach(
          (criterion) => {
            const cell = getCell(
              domain.id,
              criterion.id,
            );

            const score =
              getScorePercentage(
                cell.actual,
                cell.maximum,
              );

            if (score === null) {
              return;
            }

            weightedScore +=
              score *
              criterion.overallWeight;

            totalWeight +=
              criterion.overallWeight;
          },
        );

        return {
          domain:
            domain.name,

          score:
            totalWeight === 0
              ? null
              : weightedScore /
                totalWeight,
        };
      });

    const keyFunctionalityScores =
      keyFunctionalities.map(
        (keyFunctionality) => {
          const relatedCriteria =
            impactCriteria.filter(
              (criterion) =>
                criterion
                  .keyFunctionalityId ===
                keyFunctionality.id,
            );

          const relatedScores =
            relatedCriteria.map(
              (criterion) => ({
                score:
                  impactScores.find(
                    (item) =>
                      item
                        .impactCriterion ===
                      criterion.name,
                  )?.score ?? null,

                weight:
                  criterion.overallWeight,
              }),
            );

          if (
            relatedScores.length ===
              0 ||
            relatedScores.some(
              (item) =>
                item.score === null,
            )
          ) {
            return {
              keyFunctionality:
                keyFunctionality.name,
              score: null,
            };
          }

          const totalWeight =
            relatedScores.reduce(
              (sum, item) =>
                sum + item.weight,
              0,
            );

          if (totalWeight === 0) {
            return {
              keyFunctionality:
                keyFunctionality.name,
              score: null,
            };
          }

          const weightedScore =
            relatedScores.reduce(
              (sum, item) =>
                sum +
                (item.score as number) *
                  item.weight,
              0,
            );

          return {
            keyFunctionality:
              keyFunctionality.name,

            score:
              weightedScore /
              totalWeight,
          };
        },
      );

    const validKeyFunctionalityScores =
      keyFunctionalityScores.map(
        (item) => {
          if (item.score === null) {
            throw new Error(
              `Cannot calculate the overall SRI score because \"${item.keyFunctionality}\" has no valid score.`,
            );
          }

          return item.score;
        },
      );

    const totalScore =
      validKeyFunctionalityScores.reduce(
        (sum, score) =>
          sum + score,
        0,
      ) /
      keyFunctionalities.length;

    const servicesByDomain:
      Record<
        string,
        ResultServiceEntry[]
      > = {};

    domains.forEach((domain) => {
      servicesByDomain[
        domain.name
      ] = [];
    });

    const assessedMethods =
      serviceMethods
        .filter((method) =>
          applicableServiceIds.has(
            method.service.id,
          ),
        )
        .sort(
          (left, right) =>
            (selectedServiceOrder.get(
              left.service.id,
            ) ??
              Number.MAX_SAFE_INTEGER) -
            (selectedServiceOrder.get(
              right.service.id,
            ) ??
              Number.MAX_SAFE_INTEGER),
        );

    assessedMethods.forEach(
      (method) => {
        const answer =
          validatedAnswersByServiceId.get(
            method.service.id,
          );

        if (!answer?.primaryLevel) {
          throw new Error(
            `Validated answer is missing for service ${method.service.code}.`,
          );
        }

        const maximumLevel =
          getMaximumLevel(method);

        const impacts =
          impactCriteria
            .filter((criterion) =>
              method.levels.some(
                (level) =>
                  getImpactScoreAtLevel(
                    level,
                    criterion.id,
                  ) !== 0,
              ),
            )
            .map(
              (criterion) =>
                criterion.name,
            );

        const entry:
          ResultServiceEntry = {
          serviceId:
            method.service.id,

          serviceCode:
            method.service.code,

          serviceName:
            method.smartReadyService,

          serviceGroup:
            method.serviceGroup,

          domain:
            method.service.domain.name,

          selectedLevelId:
            answer.primaryLevel
              .sourceLevelKey,

          selectedLevelNumber:
            answer.primaryLevel.level,

          selectedLevelDescription:
            answer.primaryLevel
              .officialDescription,

          maxLevelId:
            maximumLevel
              .sourceLevelKey,

          maxLevelNumber:
            maximumLevel.level,

          maxLevelDescription:
            maximumLevel
              .officialDescription,

          share:
            answer.share,

          ...(
            answer.additionalLevel
              ? {
                  additionalLevelId:
                    answer
                      .additionalLevel
                      .sourceLevelKey,

                  additionalLevelNumber:
                    answer
                      .additionalLevel
                      .level,

                  additionalLevelDescription:
                    answer
                      .additionalLevel
                      .officialDescription,
                }
              : {}
          ),

          impacts,
        };

        servicesByDomain[
          method.service.domain.name
        ]?.push(entry);
      },
    );

    const weakestKeyFunctionalityItem =
      getUniqueLowestScoredItem(
        keyFunctionalityScores,
        "Q1 key functionality",
      );

    if (!weakestKeyFunctionalityItem) {
      throw new Error(
        "Results Investigation configuration error: no scored key functionality is available.",
      );
    }

    const weakestKeyFunctionality =
      weakestKeyFunctionalityItem
        .keyFunctionality;

    const weakestKeyFunctionalityRecord =
      keyFunctionalities.find(
        (item) =>
          item.name ===
          weakestKeyFunctionality,
      );

    if (!weakestKeyFunctionalityRecord) {
      throw new Error(
        "Weakest key functionality could not be resolved.",
      );
    }

    const relatedCriteria =
      impactCriteria.filter(
        (criterion) =>
          criterion
            .keyFunctionalityId ===
          weakestKeyFunctionalityRecord.id,
      );

    if (
      relatedCriteria.length === 0
    ) {
      throw new Error(
        "No impact criteria are assigned to the weakest key functionality.",
      );
    }

    const relatedImpactScores =
      impactScores.filter(
        (impact) =>
          relatedCriteria.some(
            (criterion) =>
              criterion.name ===
              impact.impactCriterion,
          ),
      );

    const lowestImpactCriterionItem =
      getUniqueLowestScoredItem(
        relatedImpactScores,
        "lowest impact criterion",
      );

    if (!lowestImpactCriterionItem) {
      throw new Error(
        "Results Investigation configuration error: no scored impact criterion is available for the selected key functionality.",
      );
    }

    const lowestImpactCriterion =
      lowestImpactCriterionItem
        .impactCriterion;

    const scoredCellsForImpact =
      scoreMatrix.filter(
        (
          cell,
        ): cell is typeof cell & {
          score: number;
        } =>
          cell.impactCriterion ===
            lowestImpactCriterion &&
          cell.score !== null,
      );

    if (
      scoredCellsForImpact.length ===
      0
    ) {
      throw new Error(
        "Results Investigation configuration error: no scored technical domain is available for the selected impact criterion.",
      );
    }

    const weakestTechnicalDomains =
      (() => {
            const lowestScore =
              Math.min(
                ...scoredCellsForImpact.map(
                  (cell) =>
                    cell.score,
                ),
              );

            return scoredCellsForImpact
              .filter(
                (cell) =>
                  Math.abs(
                    cell.score -
                      lowestScore,
                  ) <=
                  RESULTS_COMPARISON_EPSILON,
              )
              .map(
                (cell) =>
                  cell.domain,
              );
          })();

    const servicesInWeakestDomains =
      weakestTechnicalDomains.flatMap(
        (domain) =>
          servicesByDomain[domain] ??
          [],
      );

    const candidateServices =
      servicesInWeakestDomains.filter(
        (service) =>
          service.impacts.includes(
            lowestImpactCriterion,
          ) &&
          canServiceStillBeImproved(
            service,
          ),
      );

    const domainOptions =
      Array.from(
        new Set(
          scoreMatrix
            .filter(
              (cell) =>
                cell.impactCriterion ===
                  lowestImpactCriterion &&
                cell.score !== null,
            )
            .map(
              (cell) =>
                cell.domain,
            ),
        ),
      );

    const serviceOptions =
      servicesInWeakestDomains.map(
        (service) => ({
          value:
            service.serviceId,

          label:
            `${service.serviceCode} — ${service.serviceGroup}`,
        }),
      );

    if (
      candidateServices.length === 0
    ) {
      serviceOptions.push({
        value: "none",
        label:
          "None of the assessed services",
      });
    }

    const questions:
      GuidedInvestigationQuestionInternal[] = [
        {
          id:
            "lowest-key-functionality",
          order: 1,
          type: "single-choice",
          prompt:
            "Which key functionality has the lowest score?",
          helperText:
            "Use the key functionality scores in the hero section.",
          options: createOptions(
            keyFunctionalities.map(
              (item) =>
                item.name,
            ),
          ),
          correctOptionValues: [
            weakestKeyFunctionality,
          ],
        },

        {
          id:
            "related-impact-criteria",
          order: 2,
          type: "multiple-choice",
          prompt:
            `Which impact criteria contribute to ${weakestKeyFunctionality}?`,
          helperText:
            `Use the official SRI relationship shown above and identify the impact criteria associated with ${weakestKeyFunctionality}.`,
          options: createOptions(
            impactCriteria.map(
              (item) =>
                item.name,
            ),
          ),
          correctOptionValues:
            relatedCriteria.map(
              (item) =>
                item.name,
            ),
        },
      ];

    if (
      relatedCriteria.length > 1
    ) {
      questions.push({
        id:
          "lowest-impact-within-functionality",
        order:
          questions.length + 1,
        type: "single-choice",
        prompt:
          `Which impact criterion has the lowest score within ${weakestKeyFunctionality}?`,
        helperText:
          `Use the impact criterion scores and compare only the criteria associated with ${weakestKeyFunctionality}.`,
        options: createOptions(
          relatedCriteria.map(
            (item) =>
              item.name,
          ),
        ),
        correctOptionValues: [
          lowestImpactCriterion,
        ],
      });
    }

    const weakestDomainLabel =
      formatList(
        weakestTechnicalDomains,
      );

    questions.push(
      {
        id:
          "lowest-domain-for-impact",
        order:
          questions.length + 1,
        type: "multiple-choice",
        prompt:
          `For ${lowestImpactCriterion}, which technical domains have the lowest score?`,
        helperText:
          `Use the detailed score matrix and identify all technical domains that share the lowest score for ${lowestImpactCriterion}.`,
        options: createOptions(
          domainOptions.length > 0
            ? domainOptions
            : domains.map(
                (item) =>
                  item.name,
              ),
        ),
        correctOptionValues: [
          ...weakestTechnicalDomains,
        ],
      },

      {
        id:
          "candidate-services-for-improvement",
        order:
          questions.length + 2,
        type: "multiple-choice",
        prompt:
          `Within ${weakestDomainLabel}, which assessed services affect ${lowestImpactCriterion} and could still be improved?`,
        helperText:
          `Use the Assessed Services by Domain card. Review ${weakestDomainLabel} and identify the services that affect ${lowestImpactCriterion} and are not already at their maximum functionality level.`,
        options:
          serviceOptions,
        correctOptionValues:
          candidateServices.length > 0
            ? candidateServices.map(
                (service) =>
                  service.serviceId,
              )
            : ["none"],
      },
    );

    return {
      totalScore,
      sriClass:
        getSriClass(totalScore),
      domainScores,
      impactScores,
      keyFunctionalityScores,
      scoreMatrix,

      guidedInvestigationQuestions:
        questions,

      guidedInvestigationFindings: {
        weakestKeyFunctionality,
        lowestImpactCriterion,
        weakestTechnicalDomains,
        candidateServices:
          candidateServices.map(
            (service) => ({
              serviceId:
                service.serviceId,
              serviceCode:
                service.serviceCode,
              serviceName:
                service.serviceName,
              serviceGroup:
                service.serviceGroup,
            }),
          ),
      },

      presentDomains:
        attempt.domainPresence
          .filter(
            (item) =>
              item.status ===
              DomainPresence.PRESENT,
          )
          .sort(
            (left, right) =>
              left.domain.order -
              right.domain.order,
          )
          .map(
            (item) =>
              item.domain.name,
          ),

      absentMandatoryDomains:
        attempt.domainPresence
          .filter(
            (item) =>
              item.status ===
              DomainPresence.ABSENT_MANDATORY,
          )
          .sort(
            (left, right) =>
              left.domain.order -
              right.domain.order,
          )
          .map(
            (item) =>
              item.domain.name,
          ),

      absentNotMandatoryDomains:
        attempt.domainPresence
          .filter(
            (item) =>
              item.status ===
              DomainPresence.ABSENT_NOT_MANDATORY,
          )
          .sort(
            (left, right) =>
              left.domain.order -
              right.domain.order,
          )
          .map(
            (item) =>
              item.domain.name,
          ),

      servicesByDomain,
    };
  };


export const calculateSriBaselineResult =
  async (
    userId: string,
  ): Promise<
    SriCalculationResultInternal
  > => {
    return calculateSriResult(
      userId,
      null,
    );
  };

export const calculateSriSimulatedResult =
  async (
    userId: string,

    override:
      SriSimulationOverride,
  ): Promise<
    SriCalculationResultInternal
  > => {
    return calculateSriResult(
      userId,
      override,
    );
  };

export const toPublicSriResult = (
  result:
    SriCalculationResultInternal,
): SriCalculationResultPublic => {
  const {
    guidedInvestigationQuestions,
    guidedInvestigationFindings: _hiddenFindings,
    ...publicResult
  } = result;

  return {
    ...publicResult,

    guidedInvestigationQuestions:
      guidedInvestigationQuestions.map(
        ({
          correctOptionValues:
            _correctOptionValues,
          ...question
        }) => question,
      ),
  };
};
