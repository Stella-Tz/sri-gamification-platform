// client/src/features/caseStudy/utils/guidedImprovementAnalysis.utils.ts

import {
  getOfficialImpactCriterionWeight,
  getOfficialSriWeight,
} from "../data/sriMethodWeightings";

import {
  getMaximumFunctionalityLevel,
  getServiceById,
} from "./serviceCatalogue.utils";

import type {
  BuildingType,
  ClimateZone,
  GuidedImprovementAnalysisFindings,
  GuidedImprovementQuestion,
  ImpactCriterionName,
  OfficialAssessmentMethod,
  ResultsServiceEntry,
  SriService,
  TechnicalDomainName,
} from "../types/caseStudy.types";

type BuildGuidedImprovementAnalysisParams = {
  assessmentMethod: OfficialAssessmentMethod;
  buildingType: BuildingType;
  climateZone: ClimateZone;

  /**
   * Fully resolved Catalogue A or Catalogue B.
   */
  services: SriService[];

  /**
   * Assessed and applicable services grouped by domain,
   * as returned by the SRI scoring result.
   */
  servicesByDomain: Record<
    TechnicalDomainName,
    ResultsServiceEntry[]
  >;
};

type GuidedImprovementAnalysisBuildResult = {
  questions: GuidedImprovementQuestion[];
  findings:
    | GuidedImprovementAnalysisFindings
    | null;
};

const excelImpactCriterionOrder = [
  "Energy efficiency",
  "Energy flexibility and storage",
  "Comfort",
  "Convenience",
  "Health, well-being and accessibility",
  "Maintenance and fault prediction",
  "Information to occupants",
] as const satisfies readonly ImpactCriterionName[];

const excelTechnicalDomainOrder = [
  "Heating",
  "Domestic hot water",
  "Cooling",
  "Ventilation",
  "Lighting",
  "Electricity",
  "Dynamic building envelope",
  "Electric vehicle charging",
  "Monitoring and control",
] as const satisfies readonly TechnicalDomainName[];

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

/**
 * Returns the impact criterion with the highest
 * official impact-criterion weight.
 *
 * In case of a tie, the first criterion in the
 * official Excel order is retained.
 */
const getHighestWeightedImpactCriterion =
  (): ImpactCriterionName => {
    return excelImpactCriterionOrder.reduce(
      (
        highestCriterion,
        currentCriterion,
      ) => {
        const highestWeight =
          getOfficialImpactCriterionWeight(
            highestCriterion,
          );

        const currentWeight =
          getOfficialImpactCriterionWeight(
            currentCriterion,
          );

        return currentWeight > highestWeight
          ? currentCriterion
          : highestCriterion;
      },
    );
  };

/**
 * Returns the technical domain with the highest
 * official weight for the selected impact criterion.
 *
 * The weight depends on:
 * - assessment method,
 * - building type,
 * - climate zone,
 * - technical domain,
 * - impact criterion.
 *
 * In case of a tie, the first domain in the
 * official Excel order is retained.
 */
const getHighestWeightedDomainForImpact = ({
  assessmentMethod,
  buildingType,
  climateZone,
  impactCriterion,
}: {
  assessmentMethod: OfficialAssessmentMethod;
  buildingType: BuildingType;
  climateZone: ClimateZone;
  impactCriterion: ImpactCriterionName;
}): TechnicalDomainName => {
  return excelTechnicalDomainOrder.reduce(
    (highestDomain, currentDomain) => {
      const highestWeight =
        getOfficialSriWeight({
          assessmentMethod,
          buildingType,
          climateZone,
          domain: highestDomain,
          impactCriterion,
        });

      const currentWeight =
        getOfficialSriWeight({
          assessmentMethod,
          buildingType,
          climateZone,
          domain: currentDomain,
          impactCriterion,
        });

      return currentWeight > highestWeight
        ? currentDomain
        : highestDomain;
    },
  );
};

/**
 * Finds a Results service inside the fully resolved
 * Catalogue A or Catalogue B.
 */
const getResolvedService = (
  services: SriService[],
  serviceEntry: ResultsServiceEntry,
): SriService => {
  const service = getServiceById(
    services,
    serviceEntry.serviceId,
  );

  if (!service) {
    throw new Error(
      `Service "${serviceEntry.serviceId}" was not found ` +
        `in the resolved catalogue.`,
    );
  }

  return service;
};

/**
 * Returns one official impact score without silently
 * replacing missing or invalid catalogue data with zero.
 */
const getImpactScoreAtLevel = (
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

/**
 * Returns the impact score of a service at its
 * maximum functionality level.
 *
 * Q3 compares this absolute maximum-level score.
 * It does not calculate maximum minus current score.
 */
const getServiceMaximumImpactScore = (
  services: SriService[],
  serviceEntry: ResultsServiceEntry,
  impactCriterion: ImpactCriterionName,
): number => {
  const service = getResolvedService(
    services,
    serviceEntry,
  );

  const maximumLevel =
    getMaximumFunctionalityLevel(service);

  return getImpactScoreAtLevel(
    service,
    maximumLevel.id,
    impactCriterion,
  );
};

/**
 * Checks whether the service can still be upgraded.
 *
 * - share = 100:
 *   only the main functionality level applies.
 *
 * - share = 0:
 *   only the additional functionality level applies.
 *
 * - 0 < share < 100:
 *   both functionality levels apply to different
 *   portions of the building surface.
 */
const canServiceBeUpgraded = (
  service: ResultsServiceEntry,
): boolean => {
  if (
    !Number.isFinite(service.share) ||
    service.share < 0 ||
    service.share > 100
  ) {
    throw new Error(
      `Invalid share ${service.share} for service ` +
        `${service.serviceCode}; expected 0–100.`,
    );
  }

  if (service.share === 100) {
    return (
      service.selectedLevelNumber <
      service.maxLevelNumber
    );
  }

  if (
    service.additionalLevelNumber ===
    undefined
  ) {
    throw new Error(
      `Service ${service.serviceCode} has a share below 100% ` +
        `without an additional functionality level.`,
    );
  }

  if (service.share === 0) {
    return (
      service.additionalLevelNumber <
      service.maxLevelNumber
    );
  }

  return (
    service.selectedLevelNumber <
      service.maxLevelNumber ||
    service.additionalLevelNumber <
      service.maxLevelNumber
  );
};

/**
 * Returns all assessed services of the selected domain
 * that can still be upgraded.
 *
 * Services with a maximum-level impact score of zero
 * remain in the list because they are valid comparison
 * options in the analysis question.
 *
 * The services are ranked by their absolute
 * maximum-level impact score for the selected criterion.
 * No current-to-maximum delta is used.
 */
const getUpgradeableServices = ({
  services,
  servicesByDomain,
  domain,
  impactCriterion,
}: {
  services: SriService[];

  servicesByDomain: Record<
    TechnicalDomainName,
    ResultsServiceEntry[]
  >;

  domain: TechnicalDomainName;
  impactCriterion: ImpactCriterionName;
}): ResultsServiceEntry[] => {
  const domainServices =
    servicesByDomain[domain] ?? [];

  const upgradeableServices =
    domainServices.filter(
      canServiceBeUpgraded,
    );

  return [...upgradeableServices].sort(
    (a, b) => {
      const impactDifference =
        getServiceMaximumImpactScore(
          services,
          b,
          impactCriterion,
        ) -
        getServiceMaximumImpactScore(
          services,
          a,
          impactCriterion,
        );

      if (impactDifference !== 0) {
        return impactDifference;
      }

      return a.serviceCode.localeCompare(
        b.serviceCode,
      );
    },
  );
};

export const buildGuidedImprovementAnalysis = ({
  assessmentMethod,
  buildingType,
  climateZone,
  services,
  servicesByDomain,
}: BuildGuidedImprovementAnalysisParams): GuidedImprovementAnalysisBuildResult => {
  /*
   * Q1:
   * Impact criterion with the highest official weight.
   */
  const highestImpactCriterion =
    getHighestWeightedImpactCriterion();

  /*
   * Q2:
   * Technical domain with the highest official weight
   * for the selected criterion.
   */
  const highestWeightTechnicalDomain =
    getHighestWeightedDomainForImpact({
      assessmentMethod,
      buildingType,
      climateZone,
      impactCriterion:
        highestImpactCriterion,
    });

  /*
   * Q3 options:
   * All assessed services of the selected domain that
   * can still be upgraded.
   *
   * Services whose maximum-level impact score for the
   * selected criterion is zero remain available as
   * comparison options.
   */
  const upgradeableServices =
    getUpgradeableServices({
      services,
      servicesByDomain,
      domain:
        highestWeightTechnicalDomain,
      impactCriterion:
        highestImpactCriterion,
    });

  /*
   * The services are already ranked by descending
   * maximum-level impact score.
   */
  const highestImpactServiceCandidate =
    upgradeableServices[0] ?? null;

  /*
   * The analysis continues to Q3 only if at least one
   * upgradeable service has a positive maximum-level
   * impact score for the selected criterion.
   *
   * If all upgradeable services have a score of zero,
   * no improvement candidate is proposed.
   */
  const highestImpactService =
    highestImpactServiceCandidate &&
    getServiceMaximumImpactScore(
      services,
      highestImpactServiceCandidate,
      highestImpactCriterion,
    ) > 0
      ? highestImpactServiceCandidate
      : null;

  const impactCriterionQuestion: GuidedImprovementQuestion =
    {
      id: "highest-impact-criterion",
      order: 1,
      step: "impact-criterion",
      title:
        "Which impact criterion has the highest official weight in the overall SRI calculation?",
      context:
        "Compare the official impact-criterion weights.",
      type: "single-choice",
      options: createOptions(
        excelImpactCriterionOrder,
      ),
      correctOptionValue:
        highestImpactCriterion,
      wrongFeedback:
        "Not quite. Compare the official impact-criterion weights and identify the highest one.",
      visualAsset:
        "key_functionalities_and_impact_criteria.png",
      highlightOnError:
        highestImpactCriterion,
    };

  const technicalDomainQuestion: GuidedImprovementQuestion =
    {
      id: "highest-weight-domain",
      order: 2,
      step: "technical-domain",
      title:
        `For ${highestImpactCriterion}, which technical domain has the highest weight?`,
      context:
        `Review the domain weighting table and compare the weights for ${highestImpactCriterion}.`,
      type: "single-choice",
      options: createOptions(
        excelTechnicalDomainOrder,
      ),
      correctOptionValue:
        highestWeightTechnicalDomain,
      wrongFeedback:
        `Not quite. Look at the ${highestImpactCriterion} column in the domain weighting table and compare the domain weights.`,
      highlightOnError:
        highestImpactCriterion,
    };

  const questions: GuidedImprovementQuestion[] =
    [
      impactCriterionQuestion,
      technicalDomainQuestion,
    ];

  /*
   * If the highest-weight domain has no assessed
   * service with a positive maximum-level impact score
   * that can still be upgraded, the analysis stops
   * after Q2.
   *
   * A different domain is not selected because that
   * would change the meaning of Q2.
   */
  if (!highestImpactService) {
    return {
      questions,
      findings: null,
    };
  }

  /*
   * The options contain all assessed services in the
   * selected domain that can still be upgraded.
   *
   * The options are ordered by service code for a
   * neutral and predictable presentation.
   */
  const serviceOptions =
    upgradeableServices
      .slice()
      .sort((a, b) =>
        a.serviceCode.localeCompare(
          b.serviceCode,
        ),
      )
      .map((service) => ({
        value: service.serviceId,
        label: service.serviceCode,
      }));

  const serviceQuestion: GuidedImprovementQuestion =
    {
      id: "highest-impact-service",
      order: 3,
      step: "service-impact",
      title:
        `Among the assessed services in ${highestWeightTechnicalDomain} that can still be upgraded, which service has the highest impact score for ${highestImpactCriterion} at its maximum functionality level?`,
      context:
        `Compare the maximum-level impact scores for ${highestImpactCriterion} among the assessed services in ${highestWeightTechnicalDomain} that can still be upgraded.`,
      type: "single-choice",
      options: serviceOptions,
      correctOptionValue:
        highestImpactService.serviceId,
      wrongFeedback:
        `Not quite. Review the assessed services in ${highestWeightTechnicalDomain} and compare their maximum-level impact scores for ${highestImpactCriterion}.`,
      highlightOnError:
        highestImpactCriterion,
    };

  questions.push(serviceQuestion);

  return {
    questions,

    findings: {
      highestImpactCriterion,
      highestWeightTechnicalDomain,

      highestImpactService: {
        serviceId:
          highestImpactService.serviceId,

        serviceCode:
          highestImpactService.serviceCode,

        serviceName:
          highestImpactService.serviceName,

        serviceGroup:
          highestImpactService.serviceGroup,

        shortTitle:
          highestImpactService.shortTitle,

        technicalDomain:
          highestImpactService.domain,

        impactCriterion:
          highestImpactCriterion,

        currentLevelId:
          highestImpactService.selectedLevelId,

        currentLevelNumber:
          highestImpactService.selectedLevelNumber,

        currentLevelDescription:
          highestImpactService
            .selectedLevelDescription,

        currentShare:
          highestImpactService.share,

        currentAdditionalLevelId:
          highestImpactService
            .additionalLevelId,

        currentAdditionalLevelNumber:
          highestImpactService
            .additionalLevelNumber,

        currentAdditionalLevelDescription:
          highestImpactService
            .additionalLevelDescription,

        maxLevelId:
          highestImpactService.maxLevelId,

        maxLevelNumber:
          highestImpactService
            .maxLevelNumber,

        maxLevelDescription:
          highestImpactService
            .maxLevelDescription,

        maxImpactScore:
          getServiceMaximumImpactScore(
            services,
            highestImpactService,
            highestImpactCriterion,
          ),
      },
    },
  };
};