// client/src/features/caseStudy/types/caseStudy.types.ts

import type {
  ImpactCriterionName,
} from "../../../types/sri.types";

export type BuildingType =
  | "residential"
  | "non-residential";

export type BuildingUsage =
  | "single-family-house"
  | "small-multi-family-house"
  | "large-multi-family-house"
  | "residential-other"
  | "office"
  | "educational-buildings"
  | "healthcare"
  | "non-residential-other";

export type BuildingState =
  | "original"
  | "renovated";

export type ClimateZone =
  | "northern-europe"
  | "western-europe"
  | "southern-europe"
  | "north-eastern-europe"
  | "south-eastern-europe";

export type OfficialAssessmentMethod =
  | "A"
  | "B";

export type DomainPresence =
  | "present"
  | "absent-mandatory"
  | "absent-not-mandatory";

export type DomainPresenceValue =
  | 0
  | 1
  | 2;

export type TechnicalDomainName =
  | "Heating"
  | "Cooling"
  | "Domestic hot water"
  | "Ventilation"
  | "Lighting"
  | "Dynamic building envelope"
  | "Electricity"
  | "Electric vehicle charging"
  | "Monitoring and control";

export type {
  ImpactCriterionName,
};

export type KeyFunctionalityName =
  | "Energy performance and operation"
  | "Response to user needs"
  | "Energy flexibility";

export type SriClass =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G";

export type SelectOption<
  TValue extends string = string,
> = {
  value: TValue;
  label: string;
  description?: string;
  helperText?: string;
  disabled?: boolean;
};

export type FunctionalityLevel = {
  id: string;
  level: number;
  officialDescription: string;
  learningExplanation?: string;
};

// -----------------------------------------------------------------------------
// Setup
// -----------------------------------------------------------------------------

export type BuildingInformationAnswer = {
  buildingType:
    | BuildingType
    | "";

  buildingUsage:
    | BuildingUsage
    | "";

  country: string;

  climateZone?:
    | ClimateZone
    | "";

  floorArea: string;

  constructionYear: string;

  buildingState:
    | BuildingState
    | "";

  renovationYear: string;
};

export type MethodologySelectionAnswer = {
  assessmentMethod:
    | OfficialAssessmentMethod
    | "";
};

export type SetupAnswers = {
  buildingInformation:
    BuildingInformationAnswer;

  methodologySelection:
    MethodologySelectionAnswer;

  domainPresence:
    Record<
      TechnicalDomainName,
      DomainPresence | ""
    >;
};

// -----------------------------------------------------------------------------
// Assessment
// -----------------------------------------------------------------------------

export type ServiceAnswer = {
  serviceId: string;

  selectedLevelId:
    string;

  share:
    number;

  additionalLevelId?:
    string;
};

// -----------------------------------------------------------------------------
// Case Study definition
// -----------------------------------------------------------------------------

export type CaseStudyScenarioSection = {
  title: string;

  bullets:
    string[];
};

export type CaseStudyDefinition = {
  id: string;

  order: number;

  title: string;

  description: string;

  mode:
    | "baseline"
    | "improvement";

  scenario: {
    generalBuildingInformation:
      CaseStudyScenarioSection;

    methodologyContext:
      CaseStudyScenarioSection;

    buildingSystemsAndTechnologies:
      CaseStudyScenarioSection;
  };

  buildingInformation: {
    buildingUsage:
      BuildingUsage;

    locationLabel:
      string;

    floorArea:
      number;

    constructionYear:
      number;

    renovationYear:
      | number
      | null;
  };
};

// -----------------------------------------------------------------------------
// Case Study overview / journey
// -----------------------------------------------------------------------------

export type CaseStudyJourneyStage =
  | "building-information"
  | "service-assessment"
  | "results"
  | "guided-improvement-analysis"
  | "simulation-results";

export type CaseStudyStatus =
  | "locked"
  | "available"
  | "baseline_completed"
  | "fully_completed";

export type CaseStudyOverviewItem = {
  id: string;

  order: number;

  title: string;

  description: string;

  status:
    CaseStudyStatus;
};

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

export type ValidationErrorMap =
  Record<
    string,
    string
  >;

export type ValidationResult = {
  isValid:
    boolean;

  errors:
    ValidationErrorMap;
};

// -----------------------------------------------------------------------------
// Results
// -----------------------------------------------------------------------------

export type DomainScore = {
  domain:
    TechnicalDomainName;

  score:
    | number
    | null;
};

export type ImpactScore = {
  impactCriterion:
    ImpactCriterionName;

  score:
    | number
    | null;
};

export type KeyFunctionalityScore = {
  keyFunctionality:
    KeyFunctionalityName;

  score:
    | number
    | null;
};

export type ScoreMatrixCell = {
  domain:
    TechnicalDomainName;

  impactCriterion:
    ImpactCriterionName;

  score:
    | number
    | null;
};

export type ResultsServiceEntry = {
  serviceId: string;

  serviceCode: string;

  serviceName: string;

  serviceGroup: string;

  shortTitle: string;

  domain:
    TechnicalDomainName;

  selectedLevelId:
    string;

  selectedLevelNumber:
    number;

  selectedLevelDescription:
    string;

  maxLevelId:
    string;

  maxLevelNumber:
    number;

  maxLevelDescription:
    string;

  share:
    number;

  additionalLevelId?:
    string;

  additionalLevelNumber?:
    number;

  additionalLevelDescription?:
    string;

  impacts:
    ImpactCriterionName[];
};

