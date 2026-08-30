// client/src/features/caseStudy/utils/sriScoring.utils.ts

import {
  impactCriteriaByKeyFunctionality,
  sriImpactCriterionNames,
  sriKeyFunctionalityNames,
  sriTechnicalDomainNames,
} from "../data/sriOfficialConstants";

import {
  getOfficialImpactCriterionWeight,
  getOfficialSriWeight,
} from "../data/sriMethodWeightings";

import {
  getAbsentMandatoryDomains,
  getAbsentNotMandatoryDomains,
  getPresentDomains,
} from "./domainPresence.utils";

import type {
  BuildingType,
  CaseStudySubmitResult,
  ClimateZone,
  DomainPresence,
  GuidedInvestigationFindings,
  GuidedInvestigationQuestion,
  ImpactCriterionName,
  KeyFunctionalityName,
  OfficialAssessmentMethod,
  ResultsServiceEntry,
  ServiceAnswer,
  SriClass,
  SriService,
  TechnicalDomainName,
} from "../types/caseStudy.types";

export type SriScoringInput = {
  /**
   * Fully resolved service catalogue for the selected official method.
   *
   * The services should come from:
   * getSriServicesForAssessmentMethod(assessmentMethod)
   *
   * Services must not be removed merely because they are not applicable,
   * because TRIAGE may still include them in the maximum obtainable score.
   */
  services: SriService[];

  answers: Record<string, ServiceAnswer>;

  assessmentMethod: OfficialAssessmentMethod;

  /**
   * Equivalent to the service-applicability input of the official
   * calculation sheet.
   */
  serviceApplicability: Record<string, boolean>;

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  buildingType: BuildingType;
  climateZone: ClimateZone;
};

type ScoreAccumulator = {
  actual: number;
  maximum: number;
};

type ScoreMatrix = Record<
  TechnicalDomainName,
  Record<ImpactCriterionName, ScoreAccumulator>
>;

type GuidedInvestigationBuildResult = {
  questions: GuidedInvestigationQuestion[];
  findings: GuidedInvestigationFindings;
};

const createEmptyMatrix = (): ScoreMatrix => {
  return sriTechnicalDomainNames.reduce(
    (domainAccumulator, domain) => {
      domainAccumulator[domain] =
        sriImpactCriterionNames.reduce(
          (impactAccumulator, impactCriterion) => {
            impactAccumulator[impactCriterion] = {
              actual: 0,
              maximum: 0,
            };

            return impactAccumulator;
          },
          {} as Record<
            ImpactCriterionName,
            ScoreAccumulator
          >,
        );

      return domainAccumulator;
    },
    {} as ScoreMatrix,
  );
};

const getScorePercentage = (
  actual: number,
  maximum: number,
): number | null => {
  if (maximum === 0) return null;

  return (actual / maximum) * 100;
};

const getFunctionalityLevel = (
  service: SriService,
  levelId: string,
) => {
  return service.functionalityLevels.find(
    (level) => level.id === levelId,
  );
};

const getMaximumLevel = (service: SriService) => {
  const [firstLevel, ...remainingLevels] =
    service.functionalityLevels;

  if (!firstLevel) {
    throw new Error(
      `Service ${service.code} has no functionality levels.`,
    );
  }

  return remainingLevels.reduce(
    (maximum, level) =>
      level.level > maximum.level
        ? level
        : maximum,
    firstLevel,
  );
};

const getLevelZero = (service: SriService) => {
  const levelZero = service.functionalityLevels.find(
    (level) => level.level === 0,
  );

  if (!levelZero) {
    throw new Error(
      `Service ${service.code} has no functionality level 0.`,
    );
  }

  return levelZero;
};

const getScoreAtLevel = (
  service: SriService,
  levelId: string,
  impactCriterion: ImpactCriterionName,
): number => {
  const score =
    service.impactScoresByLevel[levelId]?.[
      impactCriterion
    ];

  if (
    typeof score !== "number" ||
    !Number.isFinite(score)
  ) {
    throw new Error(
      `Missing or invalid impact score for service ${service.code}, ` +
        `level "${levelId}", criterion "${impactCriterion}".`,
    );
  }

  return score;
};

const getActualScore = (
  service: SriService,
  answer: ServiceAnswer,
  impactCriterion: ImpactCriterionName,
): number => {
  const mainLevel = getFunctionalityLevel(
    service,
    answer.selectedLevelId,
  );

  if (!mainLevel) {
    throw new Error(
      `Invalid selected level "${answer.selectedLevelId}" for service ${service.code}.`,
    );
  }

  if (
    !Number.isFinite(answer.share) ||
    answer.share < 0 ||
    answer.share > 100
  ) {
    throw new Error(
      `Invalid share ${answer.share} for service ${service.code}; expected 0–100.`,
    );
  }

  const mainScore = getScoreAtLevel(
    service,
    mainLevel.id,
    impactCriterion,
  );

  if (answer.share === 100) {
    return mainScore;
  }

  if (!answer.additionalLevelId) {
    throw new Error(
      `Service ${service.code} requires an additional level when share is below 100%.`,
    );
  }

  const additionalLevel = getFunctionalityLevel(
    service,
    answer.additionalLevelId,
  );

  if (!additionalLevel) {
    throw new Error(
      `Invalid additional level "${answer.additionalLevelId}" for service ${service.code}.`,
    );
  }

  const additionalScore = getScoreAtLevel(
    service,
    additionalLevel.id,
    impactCriterion,
  );

  return (
    mainScore * (answer.share / 100) +
    additionalScore *
      ((100 - answer.share) / 100)
  );
};

/**
 * Determines which functionality level contributes
 * to the maximum obtainable score.
 *
 * - Present + TRIAGE 1:
 *   maximum level, regardless of applicability.
 *
 * - Present + TRIAGE 0 + applicable:
 *   maximum level.
 *
 * - Present + TRIAGE 0 + not applicable:
 *   functionality level 0.
 *
 * - Absent but mandatory + TRIAGE 1:
 *   maximum level.
 *
 * - All other cases:
 *   excluded.
 */
const getLevelForMaximumScore = ({
  service,
  presence,
  isApplicable,
}: {
  service: SriService;
  presence: DomainPresence | "";
  isApplicable: boolean;
}) => {
  if (presence === "present") {
    if (service.triageValue === 1 || isApplicable) {
      return getMaximumLevel(service);
    }

    return getLevelZero(service);
  }

  if (
    presence === "absent-mandatory" &&
    service.triageValue === 1
  ) {
    return getMaximumLevel(service);
  }

  return null;
};

const getSriClass = (
  score: number,
): SriClass => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  if (score >= 35) return "E";
  if (score >= 20) return "F";

  return "G";
};

const calculateScoreMatrix = (
  matrix: ScoreMatrix,
) => {
  return sriTechnicalDomainNames.flatMap(
    (domain) =>
      sriImpactCriterionNames.map(
        (impactCriterion) => {
          const cell =
            matrix[domain][impactCriterion];

          return {
            domain,
            impactCriterion,
            score: getScorePercentage(
              cell.actual,
              cell.maximum,
            ),
          };
        },
      ),
  );
};

const calculateImpactScores = (
  matrix: ScoreMatrix,
  assessmentMethod: OfficialAssessmentMethod,
  buildingType: BuildingType,
  climateZone: ClimateZone,
) => {
  return sriImpactCriterionNames.map(
    (impactCriterion) => {
      let weightedActual = 0;
      let weightedMaximum = 0;

      sriTechnicalDomainNames.forEach(
        (domain) => {
          const cell =
            matrix[domain][impactCriterion];

          const weight = getOfficialSriWeight({
            assessmentMethod,
            buildingType,
            climateZone,
            domain,
            impactCriterion,
          });

          weightedActual +=
            cell.actual * weight;

          weightedMaximum +=
            cell.maximum * weight;
        },
      );

      return {
        impactCriterion,
        score: getScorePercentage(
          weightedActual,
          weightedMaximum,
        ),
      };
    },
  );
};

/**
 * Display score per technical domain.
 *
 * The Results sheet combines the valid domain × impact
 * percentages using the fixed impact-criterion weights.
 */
const calculateDomainScores = (
  matrix: ScoreMatrix,
) => {
  return sriTechnicalDomainNames.map(
    (domain) => {
      let weightedScore = 0;
      let totalWeight = 0;

      sriImpactCriterionNames.forEach(
        (impactCriterion) => {
          const cell =
            matrix[domain][impactCriterion];

          const score = getScorePercentage(
            cell.actual,
            cell.maximum,
          );

          if (score === null) return;

          const weight =
            getOfficialImpactCriterionWeight(
              impactCriterion,
            );

          weightedScore += score * weight;
          totalWeight += weight;
        },
      );

      return {
        domain,
        score:
          totalWeight === 0
            ? 0
            : weightedScore / totalWeight,
      };
    },
  );
};

const calculateKeyFunctionalityScores = (
  impactScores: {
    impactCriterion: ImpactCriterionName;
    score: number | null;
  }[],
) => {
  return sriKeyFunctionalityNames.map(
    (keyFunctionality) => {
      const relatedImpacts =
        impactCriteriaByKeyFunctionality[
          keyFunctionality
        ];

      const relatedScores = relatedImpacts.map(
        (impactCriterion) => {
          const score =
            impactScores.find(
              (item) =>
                item.impactCriterion ===
                impactCriterion,
            )?.score ?? null;

          return {
            score,
            weight:
              getOfficialImpactCriterionWeight(
                impactCriterion,
              ),
          };
        },
      );

      if (
        relatedScores.some(
          (item) => item.score === null,
        )
      ) {
        return {
          keyFunctionality,
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
          keyFunctionality,
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
        keyFunctionality,
        score:
          weightedScore / totalWeight,
      };
    },
  );
};

const getOverallScore = (
  keyFunctionalityScores: {
    keyFunctionality: KeyFunctionalityName;
    score: number | null;
  }[],
): number => {
  const validScores =
    keyFunctionalityScores.map((item) => {
      if (item.score === null) {
        throw new Error(
          `Cannot calculate the overall SRI score because "${item.keyFunctionality}" has no valid score.`,
        );
      }

      return item.score;
    });

  return (
    validScores.reduce(
      (sum, score) => sum + score,
      0,
    ) / sriKeyFunctionalityNames.length
  );
};

const getImpactsForService = (
  service: SriService,
): ImpactCriterionName[] => {
  const impacts =
    new Set<ImpactCriterionName>();

  Object.values(
    service.impactScoresByLevel,
  ).forEach((impactScores) => {
    Object.entries(impactScores).forEach(
      ([impactCriterion, score]) => {
        if (
          typeof score === "number" &&
          Number.isFinite(score) &&
          score !== 0
        ) {
          impacts.add(
            impactCriterion as ImpactCriterionName,
          );
        }
      },
    );
  });

  return sriImpactCriterionNames.filter(
    (impactCriterion) =>
      impacts.has(impactCriterion),
  );
};

const buildResultsServiceEntry = (
  service: SriService,
  answer: ServiceAnswer,
): ResultsServiceEntry | null => {
  const selectedLevel =
    getFunctionalityLevel(
      service,
      answer.selectedLevelId,
    );

  if (!selectedLevel) return null;

  const additionalLevel =
    answer.additionalLevelId
      ? getFunctionalityLevel(
          service,
          answer.additionalLevelId,
        )
      : undefined;

  const maxLevel =
    getMaximumLevel(service);

  return {
    serviceId: service.id,
    serviceCode: service.code,
    serviceName:
      service.smartReadyService,
    serviceGroup: service.serviceGroup,
    shortTitle: service.shortTitle,
    domain: service.domain,

    selectedLevelId: selectedLevel.id,
    selectedLevelNumber:
      selectedLevel.level,
    selectedLevelDescription:
      selectedLevel.officialDescription,

    maxLevelId: maxLevel.id,
    maxLevelNumber: maxLevel.level,
    maxLevelDescription:
      maxLevel.officialDescription,

    share: answer.share,

    additionalLevelId:
      additionalLevel?.id,
    additionalLevelNumber:
      additionalLevel?.level,
    additionalLevelDescription:
      additionalLevel?.officialDescription,

    impacts: getImpactsForService(service),
  };
};

const buildServicesByDomain = (
  services: SriService[],
  answers: Record<string, ServiceAnswer>,
): Record<
  TechnicalDomainName,
  ResultsServiceEntry[]
> => {
  const grouped =
    sriTechnicalDomainNames.reduce(
      (accumulator, domain) => {
        accumulator[domain] = [];
        return accumulator;
      },
      {} as Record<
        TechnicalDomainName,
        ResultsServiceEntry[]
      >,
    );

  services.forEach((service) => {
    const answer = answers[service.id];

    if (
      !answer ||
      !answer.selectedLevelId
    ) {
      return;
    }

    const entry =
      buildResultsServiceEntry(
        service,
        answer,
      );

    if (!entry) return;

    grouped[service.domain].push(entry);
  });

  return grouped;
};

const getLowestScoredItem = <
  TItem extends {
    score: number | null;
  },
>(
  items: readonly TItem[],
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

  return [...scoredItems].sort(
    (a, b) => a.score - b.score,
  )[0];
};

const createOptions = <
  TValue extends string,
>(
  values: readonly TValue[],
): {
  value: TValue;
  label: string;
}[] => {
  return values.map((value) => ({
    value,
    label: value,
  }));
};

const getLowestImpactForKeyFunctionality = (
  keyFunctionality: KeyFunctionalityName,
  impactScores: {
    impactCriterion: ImpactCriterionName;
    score: number | null;
  }[],
): ImpactCriterionName | null => {
  const relatedImpacts =
    impactCriteriaByKeyFunctionality[
      keyFunctionality
    ];

  const relatedImpactScores =
    impactScores.filter((impactScore) =>
      relatedImpacts.includes(
        impactScore.impactCriterion,
      ),
    );

  return (
    getLowestScoredItem(
      relatedImpactScores,
    )?.impactCriterion ?? null
  );
};

const getLowestDomainsForImpact = (
  impactCriterion: ImpactCriterionName,
  scoreMatrix: {
    domain: TechnicalDomainName;
    impactCriterion: ImpactCriterionName;
    score: number | null;
  }[],
): TechnicalDomainName[] => {
  const scoredCells = scoreMatrix.filter(
    (
      cell,
    ): cell is {
      domain: TechnicalDomainName;
      impactCriterion: ImpactCriterionName;
      score: number;
    } =>
      cell.impactCriterion ===
        impactCriterion &&
      cell.score !== null,
  );

  if (scoredCells.length === 0) {
    return [];
  }

  const lowestScore = Math.min(
    ...scoredCells.map(
      (cell) => cell.score,
    ),
  );

  return scoredCells
    .filter(
      (cell) =>
        cell.score === lowestScore,
    )
    .map((cell) => cell.domain);
};

const getServiceLevelRatio = (
  service: ResultsServiceEntry,
): number => {
  if (
    service.additionalLevelNumber ===
      undefined ||
    service.share >= 100
  ) {
    return service.selectedLevelNumber;
  }

  return (
    service.selectedLevelNumber *
      (service.share / 100) +
    service.additionalLevelNumber *
      ((100 - service.share) / 100)
  );
};

const canServiceStillBeImproved = (
  service: ResultsServiceEntry,
): boolean => {
  return (
    getServiceLevelRatio(service) <
    service.maxLevelNumber
  );
};

const getCandidateServicesForImprovement = ({
  servicesByDomain,
  domains,
  impactCriterion,
}: {
  servicesByDomain: Record<
    TechnicalDomainName,
    ResultsServiceEntry[]
  >;
  domains: TechnicalDomainName[];
  impactCriterion: ImpactCriterionName;
}): ResultsServiceEntry[] => {
  return domains.flatMap((domain) =>
    servicesByDomain[domain].filter(
      (service) =>
        service.impacts.includes(
          impactCriterion,
        ) &&
        canServiceStillBeImproved(
          service,
        ),
    ),
  );
};

const formatList = (
  values: readonly string[],
): string => {
  if (values.length === 0) return "";

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values
    .slice(0, -1)
    .join(", ")}, and ${values[values.length - 1]}`;
};

const buildGuidedInvestigation = (
  input: {
    keyFunctionalityScores: {
      keyFunctionality: KeyFunctionalityName;
      score: number | null;
    }[];

    impactScores: {
      impactCriterion: ImpactCriterionName;
      score: number | null;
    }[];

    scoreMatrix: {
      domain: TechnicalDomainName;
      impactCriterion: ImpactCriterionName;
      score: number | null;
    }[];

    servicesByDomain: Record<
      TechnicalDomainName,
      ResultsServiceEntry[]
    >;
  },
): GuidedInvestigationBuildResult => {
  const lowestKeyFunctionality =
    getLowestScoredItem(
      input.keyFunctionalityScores,
    )?.keyFunctionality ??
    sriKeyFunctionalityNames[0];

  const relatedImpacts =
    impactCriteriaByKeyFunctionality[
      lowestKeyFunctionality
    ];

  const lowestImpact =
    getLowestImpactForKeyFunctionality(
      lowestKeyFunctionality,
      input.impactScores,
    ) ?? relatedImpacts[0];

  const lowestDomains =
    getLowestDomainsForImpact(
      lowestImpact,
      input.scoreMatrix,
    );

  const lowestDomainLabel =
   formatList(lowestDomains);

  const domainOptions =
    input.scoreMatrix
      .filter(
        (cell) =>
          cell.impactCriterion ===
            lowestImpact &&
          cell.score !== null,
      )
      .map((cell) => cell.domain);

  const uniqueDomainOptions =
    Array.from(new Set(domainOptions));

  const servicesInLowestDomains =
    lowestDomains.flatMap(
      (domain) =>
        input.servicesByDomain[domain],
    );

  const candidateServices =
    getCandidateServicesForImprovement({
      servicesByDomain:
        input.servicesByDomain,
      domains: lowestDomains,
      impactCriterion: lowestImpact,
    });

  const serviceOptions: {
    value: string;
    label: string;
  }[] = servicesInLowestDomains.map(
    (service) => ({
      value: service.serviceId,
      label:
        `${service.serviceCode} — ${service.serviceGroup}`,
    }),
  );

  if (candidateServices.length === 0) {
    serviceOptions.push({
      value: "none",
      label:
        "None of the assessed services",
    });
  }

  const candidateServiceIds =
    candidateServices.length > 0
      ? candidateServices.map(
          (service) =>
            service.serviceId,
        )
      : ["none"];

  const questions: GuidedInvestigationQuestion[] =
    [
      {
        id: "lowest-key-functionality",
        order: 1,
        type: "single-choice",
        prompt:
          "Which key functionality has the lowest score?",
        helperText:
          "Use the key functionality scores in the hero section.",
        options: createOptions(
          sriKeyFunctionalityNames,
        ),
        correctOptionValues: [
          lowestKeyFunctionality,
        ],
  
      },
      {
        id: "related-impact-criteria",
        order: 2,
        type: "multiple-choice",
        prompt:
          `Which impact criteria contribute to ${lowestKeyFunctionality}?`,
        helperText:
          `Use the official SRI relationship shown above and identify the impact criteria associated with ${lowestKeyFunctionality}.`,
        options: createOptions(
          sriImpactCriterionNames,
        ),
        correctOptionValues: [
          ...relatedImpacts,
        ],
        
      },
    ];

  if (relatedImpacts.length > 1) {
    questions.push({
      id:
        "lowest-impact-within-functionality",
      order: questions.length + 1,
      type: "single-choice",
      prompt:
        `Which impact criterion has the lowest score within ${lowestKeyFunctionality}?`,
      helperText:
        `Use the impact criterion scores and compare only the criteria associated with ${lowestKeyFunctionality}.`,
      options:
        createOptions(relatedImpacts),
      correctOptionValues: [
        lowestImpact,
      ],
    });
  }

  questions.push(
    {
      id: "lowest-domain-for-impact",
      order: questions.length + 1,
      type: "multiple-choice",
      prompt:
        `For ${lowestImpact}, which technical domains have the lowest score?`,
      helperText:
        `Use the detailed score matrix and identify all technical domains that share the lowest score for ${lowestImpact}.`,
      options: createOptions(
        uniqueDomainOptions.length > 0
          ? uniqueDomainOptions
          : sriTechnicalDomainNames,
      ),
      correctOptionValues: [
        ...lowestDomains,
      ],
    },
    {
      id:
        "candidate-services-for-improvement",
      order: questions.length + 2,
      type: "multiple-choice",
      prompt:
        `Within ${lowestDomainLabel}, which assessed services affect ${lowestImpact} and could still be improved?`,
      helperText:
        `Use the Assessed Services by Domain card. Review ${lowestDomainLabel} and identify the services that affect ${lowestImpact} and are not already at their maximum functionality level.`,
            options: serviceOptions,
      correctOptionValues:
        candidateServiceIds,
    },
  );

  return {
    questions,
    findings: {
      weakestKeyFunctionality:
        lowestKeyFunctionality,
      lowestImpactCriterion:
        lowestImpact,
      weakestTechnicalDomains:
        lowestDomains,
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
  };
};

export const calculateSriScore = ({
  services,
  answers,
  assessmentMethod,
  serviceApplicability,
  domainPresence,
  buildingType,
  climateZone,
}: SriScoringInput): CaseStudySubmitResult => {
  const matrix = createEmptyMatrix();

  services.forEach((service) => {
    const presence =
      domainPresence[service.domain];

    if (presence === "") {
      throw new Error(
        `Domain presence has not been defined for "${service.domain}".`,
      );
    }

    const hasApplicabilityValue =
      Object.prototype.hasOwnProperty.call(
        serviceApplicability,
        service.id,
      );

    if (
      presence === "present" &&
      !hasApplicabilityValue
    ) {
      throw new Error(
        `Applicability has not been defined for service ${service.code}.`,
      );
    }

    const isApplicable =
      presence === "present" &&
      serviceApplicability[
        service.id
      ] === true;

    const answer =
      answers[service.id];

    if (
      isApplicable &&
      !answer?.selectedLevelId
    ) {
      throw new Error(
        `Applicable service ${service.code} has not been assessed.`,
      );
    }

    const levelForMaximum =
      getLevelForMaximumScore({
        service,
        presence,
        isApplicable,
      });

    sriImpactCriterionNames.forEach(
      (impactCriterion) => {
        const cell =
          matrix[service.domain][
            impactCriterion
          ];

        if (levelForMaximum) {
          cell.maximum +=
            getScoreAtLevel(
              service,
              levelForMaximum.id,
              impactCriterion,
            );
        }

        if (
          !isApplicable ||
          !answer
        ) {
          return;
        }

        cell.actual += getActualScore(
          service,
          answer,
          impactCriterion,
        );
      },
    );
  });

  const scoreMatrix =
    calculateScoreMatrix(matrix);

  const impactScores =
    calculateImpactScores(
      matrix,
      assessmentMethod,
      buildingType,
      climateZone,
    );

  const domainScores =
    calculateDomainScores(matrix);

  const keyFunctionalityScores =
    calculateKeyFunctionalityScores(
      impactScores,
    );

  const totalScore = getOverallScore(
    keyFunctionalityScores,
  );

  const assessedServices =
    services.filter(
      (service) =>
        domainPresence[service.domain] ===
          "present" &&
        serviceApplicability[
          service.id
        ] === true,
    );

  const servicesByDomain =
    buildServicesByDomain(
      assessedServices,
      answers,
    );

  const guidedInvestigation =
    buildGuidedInvestigation({
      keyFunctionalityScores,
      impactScores,
      scoreMatrix,
      servicesByDomain,
    });

  return {
    totalScore,
    sriClass: getSriClass(totalScore),

    domainScores,
    impactScores,
    keyFunctionalityScores,
    scoreMatrix,

    guidedInvestigationQuestions:
      guidedInvestigation.questions,

    guidedInvestigationFindings:
      guidedInvestigation.findings,

    presentDomains:
      getPresentDomains(
        domainPresence,
      ),

    absentMandatoryDomains:
      getAbsentMandatoryDomains(
        domainPresence,
      ),

    absentNotMandatoryDomains:
      getAbsentNotMandatoryDomains(
        domainPresence,
      ),

    servicesByDomain,
  };
};