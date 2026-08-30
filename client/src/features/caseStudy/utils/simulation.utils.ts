// client/src/features/caseStudy/utils/simulation.utils.ts

import { calculateSriScore } from "./sriScoring.utils";

import type {
  BuildingType,
  CaseStudySubmitResult,
  ClimateZone,
  DomainPresence,
  GuidedImprovementAnalysisFindings,
  OfficialAssessmentMethod,
  ServiceAnswer,
  SimulationResult,
  SriService,
  TechnicalDomainName,
} from "../types/caseStudy.types";

type RunSriSimulationParams = {
  /*
   * Fully resolved Catalogue A or Catalogue B.
   */
  services: SriService[];

  answers: Record<string, ServiceAnswer>;

  assessmentMethod: OfficialAssessmentMethod;
  serviceApplicability: Record<string, boolean>;

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  buildingType: BuildingType;
  climateZone: ClimateZone;

  currentResult: CaseStudySubmitResult;
  findings: GuidedImprovementAnalysisFindings;
};

const createAnswersForSimulatedUpgrade = ({
  answers,
  findings,
}: {
  answers: Record<string, ServiceAnswer>;
  findings: GuidedImprovementAnalysisFindings;
}): Record<string, ServiceAnswer> | null => {
  const service =
    findings.highestImpactService;

  const currentAnswer =
    answers[service.serviceId];

  /*
   * The simulation must modify an already assessed
   * service, not create a new assessment answer.
   */
  if (!currentAnswer) {
    return null;
  }

  /*
   * Only the selected service is replaced.
   * Every other service answer keeps the same reference
   * and the same assessment values.
   */
  return {
    ...answers,

    [service.serviceId]: {
      ...currentAnswer,

      selectedLevelId:
        service.maxLevelId,

      share: 100,

      additionalLevelId:
        undefined,
    },
  };
};

export const runSriSimulation = ({
  services,
  answers,
  assessmentMethod,
  serviceApplicability,
  domainPresence,
  buildingType,
  climateZone,
  currentResult,
  findings,
}: RunSriSimulationParams): SimulationResult | null => {
  const simulatedAnswers =
    createAnswersForSimulatedUpgrade({
      answers,
      findings,
    });

  if (!simulatedAnswers) {
    return null;
  }

  const service =
    findings.highestImpactService;

  const simulatedResult =
    calculateSriScore({
      services,
      answers: simulatedAnswers,
      assessmentMethod,
      serviceApplicability,
      domainPresence,
      buildingType,
      climateZone,
    });

  const sriDelta =
    simulatedResult.totalScore -
    currentResult.totalScore;

  /*
   * This workflow is specifically an improvement
   * simulation. A non-positive result is inconsistent.
   */
  if (
    !Number.isFinite(sriDelta) ||
    sriDelta <= 0
  ) {
    return null;
  }

  return {
    before: currentResult,
    after: simulatedResult,

    upgradedService: {
      serviceId:
        service.serviceId,

      serviceCode:
        service.serviceCode,

      serviceName:
        service.serviceName,

      serviceGroup:
        service.serviceGroup,

      shortTitle:
        service.shortTitle,

      technicalDomain:
        service.technicalDomain,

      impactCriterion:
        service.impactCriterion,

      previousLevelId:
        service.currentLevelId,

      previousLevelNumber:
        service.currentLevelNumber,

      previousLevelDescription:
        service.currentLevelDescription,

      simulatedLevelId:
        service.maxLevelId,

      simulatedLevelNumber:
        service.maxLevelNumber,

      simulatedLevelDescription:
        service.maxLevelDescription,
    },

    sriDelta,
  };
};