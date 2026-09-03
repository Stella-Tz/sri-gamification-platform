// client/src/features/caseStudy/assessment/caseStudyAssessment.types.ts

import type {
  ImpactCriterionName,
  ServiceAnswer,
} from "../types/caseStudy.types";

export type CaseStudyAssessmentServiceData = {
  serviceId: string;

  code: string;
  order: number;

  domain: string;

  serviceGroup: string;
  smartReadyService: string;

  officialDescription:
    | string
    | null;

  triageValue: number;

  triageNote:
    | string
    | null;

  applicabilityNote:
    | string
    | null;

  methodologyNote:
    | string
    | null;

  impactCriteria:
    ImpactCriterionName[];

  scenarioEvidence:
    string[];

  functionalityLevels: {
    id: string;
    level: number;
    officialDescription: string;
  }[];
};

export type CaseStudyAssessmentData = {
  caseStudyId: string;

  setup: {
    buildingType: string;
    climateZone: string;
    assessmentMethod: string;

    domainPresence:
      Record<string, string>;
  };

  services:
    CaseStudyAssessmentServiceData[];

  progress: {
    answers:
      Record<
        string,
        ServiceAnswer
      >;

    validatedServiceIds:
      string[];

    selectedServiceId:
      | string
      | null;

    completed: boolean;
  };
};