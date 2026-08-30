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

export type ImpactScoreMap = Partial<
  Record<
    ImpactCriterionName,
    number
  >
>;

export type SriService = {
  id: string;
  code: string;
  domain: TechnicalDomainName;

  serviceGroup: string;
  smartReadyService: string;
  shortTitle: string;

  officialDescription?: string;
  learningExplanation?: string;
  assessmentHint?: string;

  includedInOfficialMethods:
    OfficialAssessmentMethod[];

  triageValue: 0 | 1;
  triageNote?: string;
  applicabilityNote?: string;
  methodologyNote?: string;

  functionalityLevels:
    FunctionalityLevel[];

  impactScoresByLevel: Record<
    string,
    ImpactScoreMap
  >;
};

export type ExpectedSetupAnswers = {
  buildingType?: BuildingType;
  buildingUsage?: BuildingUsage;
  country?: string;
  constructionYear?: string;
  buildingState?: BuildingState;
  renovationYear?: string;
  floorArea?: number;
  assessmentMethod?:
    OfficialAssessmentMethod;
  domainPresence?: Partial<
    Record<
      TechnicalDomainName,
      DomainPresence
    >
  >;
};

export type ExpectedServiceAnswer = {
  selectedLevelId: string;
  share: number;
  additionalLevelId?: string;
};

export type CaseStudySelectedService = {
  serviceId: string;
  scenarioEvidence: string[];
  expectedAnswer:
    ExpectedServiceAnswer;
};

export type BuildingInformationAnswer = {
  buildingType: BuildingType | "";
  buildingUsage: BuildingUsage | "";
  country: string;
  climateZone?: ClimateZone | "";
  floorArea: string;
  constructionYear: string;
  buildingState: BuildingState | "";
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

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;
};

export type ServiceAnswer = {
  serviceId: string;
  selectedLevelId: string;
  share: number;
  additionalLevelId?: string;
};

export type CaseStudyScenarioSection = {
  title: string;
  bullets: string[];
};

export type CaseStudyDetails = {
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
    buildingType: BuildingType;
    buildingUsage: BuildingUsage;
    locationLabel: string;
    country: string;
    climateZone?: ClimateZone;
    floorArea: number;
    constructionYear: string;
    buildingState: BuildingState;
    renovationYear?: string;
  };

  expectedSetupAnswers:
    ExpectedSetupAnswers;

  selectedServices:
    CaseStudySelectedService[];
};

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
  status: CaseStudyStatus;
};

export type ValidationErrorMap =
  Record<string, string>;

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationErrorMap;
};

export type DomainScore = {
  domain: TechnicalDomainName;
  score: number | null;
};

export type ImpactScore = {
  impactCriterion:
    ImpactCriterionName;

  score: number | null;
};

export type KeyFunctionalityScore = {
  keyFunctionality:
    KeyFunctionalityName;

  score: number | null;
};

export type ScoreMatrixCell = {
  domain: TechnicalDomainName;
  impactCriterion:
    ImpactCriterionName;

  score: number | null;
};

export type ResultsServiceEntry = {
  serviceId: string;
  serviceCode: string;
  serviceName: string;
  serviceGroup: string;
  shortTitle: string;
  domain: TechnicalDomainName;

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

  impacts: ImpactCriterionName[];
};

export type GuidedInvestigationQuestion = {
  id: string;
  order: number;
  prompt: string;
  helperText?: string;

  type:
    | "single-choice"
    | "multiple-choice";

  options: {
    value: string;
    label: string;
  }[];

  correctOptionValues: string[];
};

export type GuidedInvestigationFindings = {
  weakestKeyFunctionality: KeyFunctionalityName;

  lowestImpactCriterion: ImpactCriterionName;

  weakestTechnicalDomains: TechnicalDomainName[];

  candidateServices: {
    serviceId: string;
    serviceCode: string;
    serviceName: string;
    serviceGroup: string;
  }[];
};

export type GuidedImprovementQuestionId =
  | "highest-impact-criterion"
  | "highest-weight-domain"
  | "highest-impact-service";

export type GuidedImprovementQuestionStep =
  | "impact-criterion"
  | "technical-domain"
  | "service-impact";

export type GuidedImprovementQuestionOption = {
  value: string;
  label: string;
};

export type GuidedImprovementQuestion = {
  id: GuidedImprovementQuestionId;
  order: number;
  step: GuidedImprovementQuestionStep;

  title: string;
  context: string;

  type: "single-choice";

  options:
    GuidedImprovementQuestionOption[];

  correctOptionValue: string;
  wrongFeedback: string;

  visualAsset?: string;
  highlightOnError?: string;
};

export type GuidedImprovementAnswer = {
  questionId:
    GuidedImprovementQuestionId;

  selectedOptionValue: string;
  isCorrect: boolean;
  attempts: number;
};

export type GuidedImprovementAnalysisState = {
  currentQuestionId:
    GuidedImprovementQuestionId;

  answers:
    GuidedImprovementAnswer[];

  isCompleted: boolean;
};

export type GuidedImprovementAnalysisFindings = {
  highestImpactCriterion:
    ImpactCriterionName;

  highestWeightTechnicalDomain:
    TechnicalDomainName;

  highestImpactService: {
    serviceId: string;
    serviceCode: string;
    serviceName: string;
    serviceGroup: string;
    shortTitle: string;

    technicalDomain:
      TechnicalDomainName;

    impactCriterion:
      ImpactCriterionName;

    currentLevelId: string;
    currentLevelNumber: number;
    currentLevelDescription: string;

    /**
     * Percentage of the building's
     * net surface area to which the
     * main functionality level applies.
     */
    currentShare: number;

    /**
     * Applies to the remaining net
     * surface area when currentShare
     * is below 100%.
     */
    currentAdditionalLevelId?: string;
    currentAdditionalLevelNumber?: number;
    currentAdditionalLevelDescription?: string;

    maxLevelId: string;
    maxLevelNumber: number;
    maxLevelDescription: string;

    maxImpactScore: number;
  };
};

export type SimulationUpgradeLevel = {
  levelId: string;
  levelNumber: number;
  label: string;
  description: string;
};

export type SimulationCandidateService = {
  serviceId: string;
  serviceCode: string;
  serviceName: string;
  serviceGroup: string;
  shortTitle: string;

  technicalDomain:
    TechnicalDomainName;

  impactCriterion:
    ImpactCriterionName;

  currentLevelId: string;
  currentLevelNumber: number;
  currentLevelDescription: string;

  availableUpgradeLevels:
    SimulationUpgradeLevel[];
};

export type SimulationSelection = {
  serviceId: string;
  selectedUpgradeLevelId: string;
};

export type ImprovementComparisonResult = {
  beforeSriScore: number;
  afterSriScore: number;

  beforeSriClass: SriClass;
  afterSriClass: SriClass;

  improvementDelta: number;
};

export type CaseStudySubmitResult = {
  totalScore: number;
  sriClass: SriClass;

  domainScores: DomainScore[];
  impactScores: ImpactScore[];

  keyFunctionalityScores:
    KeyFunctionalityScore[];

  scoreMatrix:
    ScoreMatrixCell[];

  guidedInvestigationQuestions:
    GuidedInvestigationQuestion[];

  guidedInvestigationFindings:
    GuidedInvestigationFindings;

  presentDomains:
    TechnicalDomainName[];

  absentMandatoryDomains:
    TechnicalDomainName[];

  absentNotMandatoryDomains:
    TechnicalDomainName[];

  servicesByDomain: Record<
    TechnicalDomainName,
    ResultsServiceEntry[]
  >;
};

export type SimulationResult = {
  before: CaseStudySubmitResult;
  after: CaseStudySubmitResult;

  upgradedService: {
    serviceId: string;
    serviceCode: string;
    serviceName: string;
    serviceGroup: string;
    shortTitle: string;

    technicalDomain:
      TechnicalDomainName;

    impactCriterion:
      ImpactCriterionName;

    previousLevelId: string;
    previousLevelNumber: number;
    previousLevelDescription: string;

    simulatedLevelId: string;
    simulatedLevelNumber: number;
    simulatedLevelDescription: string;
  };

  sriDelta: number;
};