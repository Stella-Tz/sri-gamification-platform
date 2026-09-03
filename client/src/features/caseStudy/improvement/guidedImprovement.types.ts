import type {
  ImpactCriterionName,
  TechnicalDomainName,
} from "../types/caseStudy.types";

export type GuidedImprovementQuestionId =
  | "highest-impact-criterion"
  | "highest-weight-domain"
  | "highest-impact-service";

export type GuidedImprovementQuestionStep =
  | "impact-criterion"
  | "technical-domain"
  | "service-impact";

export type GuidedImprovementPublicQuestion = {
  id:
    GuidedImprovementQuestionId;

  order: number;

  step:
    GuidedImprovementQuestionStep;

  title: string;
  context: string;

  type:
    "single-choice";

  options: {
    value: string;
    label: string;
  }[];

  wrongFeedback: string;
};

export type GuidedImprovementAnswer = {
  questionId: string;

  selectedOptionValue: string;

  isCorrect: boolean;

  attempts: number;
};

export type GuidedImprovementPersistedFeedback =
  | "correct"
  | "wrong"
  | null;

export type GuidedImprovementInteractionFeedback =
  | GuidedImprovementPersistedFeedback
  | "empty";

export type GuidedImprovementProgress = {
  currentIndex: number;

  selectedOptionValue?:
    string;

  feedback?:
    GuidedImprovementPersistedFeedback;

  answers:
    GuidedImprovementAnswer[];

  completed: boolean;
};

export type GuidedImprovementDomainWeightingTable = {
  impactCriteria:
    ImpactCriterionName[];

  rows: {
    domain:
      TechnicalDomainName;

    weights:
      Record<
        ImpactCriterionName,
        number
      >;
  }[];
};

export type GuidedImprovementServiceMaximumImpactScoresTable = {
  domain:
    TechnicalDomainName;

  impactCriteria:
    ImpactCriterionName[];

  rows: {
    serviceId: string;
    serviceCode: string;

    maxLevelNumber: number;

    scores:
      Record<
        ImpactCriterionName,
        number | null
      >;
  }[];
};

export type GuidedImprovementResolvedContext = {
  highestImpactCriterion:
    | ImpactCriterionName
    | null;

  highestWeightTechnicalDomain:
    | TechnicalDomainName
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

export type GuidedImprovementBackendService = {
  serviceId: string;

  serviceCode: string;
  serviceName: string;
  serviceGroup: string;

  technicalDomain:
    TechnicalDomainName;

  impactCriterion:
    ImpactCriterionName;

  currentLevelId: string;
  currentLevelNumber: number;
  currentLevelDescription: string;
  currentShare: number;

  currentAdditionalLevelId?:
    string;

  currentAdditionalLevelNumber?:
    number;

  currentAdditionalLevelDescription?:
    string;

  maxLevelId: string;
  maxLevelNumber: number;
  maxLevelDescription: string;

  maxImpactScore: number;
};

export type GuidedImprovementBackendFindings = {
  highestImpactCriterion:
    ImpactCriterionName;

  highestWeightTechnicalDomain:
    TechnicalDomainName;

  highestImpactService:
    GuidedImprovementBackendService;
};

export type GuidedImprovementData = {
  questions:
    GuidedImprovementPublicQuestion[];

  progress:
    GuidedImprovementProgress;

  resolvedContext:
    GuidedImprovementResolvedContext;

  hasSimulationScenario:
    boolean;

  findings:
    | GuidedImprovementBackendFindings
    | null;
};

export type GuidedImprovementCheckResult = {
  feedback:
    GuidedImprovementInteractionFeedback;

  feedbackMessage: string;

  persisted: boolean;

  progress:
    GuidedImprovementProgress;

  resolvedContext:
    GuidedImprovementResolvedContext;

  hasSimulationScenario:
    boolean;
};