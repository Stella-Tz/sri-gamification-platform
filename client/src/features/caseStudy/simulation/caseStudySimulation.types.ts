// client/src/features/caseStudy/simulation/caseStudySimulation.types.ts

import type {
  CaseStudyResultsPublicResult,
} from "../results/caseStudyResults.types";

import type {
  ImpactCriterionName,
  TechnicalDomainName,
} from "../types/caseStudy.types";

export type CaseStudySimulationResult = {
  before:
    CaseStudyResultsPublicResult;

  after:
    CaseStudyResultsPublicResult;

  upgradedService: {
    serviceId: string;

    serviceCode: string;
    serviceName: string;
    serviceGroup: string;

    technicalDomain:
      TechnicalDomainName;

    impactCriterion:
      ImpactCriterionName;

    previousLevelId:
      string;

    previousLevelNumber:
      number;

    previousLevelDescription:
      string;

    simulatedLevelId:
      string;

    simulatedLevelNumber:
      number;

    simulatedLevelDescription:
      string;
  };

  sriDelta:
    number;
};

export type CaseStudySimulationReadPreference =
  | "default"
  | "official";

export type CaseStudySimulationSource =
  | "active"
  | "official"
  | null;

export type CaseStudySimulationData = {
  simulationResult:
    | CaseStudySimulationResult
    | null;

  source:
    CaseStudySimulationSource;
};

export type CaseStudySimulationRunResult = {
  simulationResult:
    CaseStudySimulationResult;

  isOfficialAttempt:
    boolean;
};