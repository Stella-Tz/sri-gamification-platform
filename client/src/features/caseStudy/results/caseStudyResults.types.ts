// client/src/features/caseStudy/results/caseStudyResults.types.ts

import type {
  DomainScore,
  ImpactCriterionName,
  ImpactScore,
  KeyFunctionalityName,
  KeyFunctionalityScore,
  ResultsServiceEntry,
  ScoreMatrixCell,
  SriClass,
  TechnicalDomainName,
} from "../types/caseStudy.types";

import type {
  CaseStudyProgress,
} from "../progress/caseStudyProgress.types";

export type ResultsInvestigationFeedback =
  | "correct"
  | "wrong";

export type ResultsInvestigationAnswer = {
  questionId: string;

  selectedAnswers:
    string[];

  feedback:
    ResultsInvestigationFeedback;

  attempts: number;
};

export type ResultsInvestigationProgress = {
  currentIndex: number;

  answers:
    ResultsInvestigationAnswer[];

  completed: boolean;
};

/*
 * Correct answers remain server-side.
 * The client receives only the data required
 * to present each investigation question.
 */

export type ResultsInvestigationQuestion = {
  id: string;

  order: number;

  prompt: string;

  helperText?:
    string;

  type:
    | "single-choice"
    | "multiple-choice";

  options: {
    value: string;
    label: string;
  }[];
};

export type GuidedInvestigationFindings = {
  weakestKeyFunctionality:
    KeyFunctionalityName;

  lowestImpactCriterion:
    ImpactCriterionName;

  weakestTechnicalDomains:
    TechnicalDomainName[];

  candidateServices: {
    serviceId: string;
    serviceCode: string;
    serviceName: string;
    serviceGroup: string;
  }[];
};

export type CaseStudyResultsPublicResult = {
  totalScore: number;

  sriClass:
    SriClass;

  domainScores:
    DomainScore[];

  impactScores:
    ImpactScore[];

  keyFunctionalityScores:
    KeyFunctionalityScore[];

  scoreMatrix:
    ScoreMatrixCell[];

  guidedInvestigationQuestions:
    ResultsInvestigationQuestion[];

  presentDomains:
    TechnicalDomainName[];

  absentMandatoryDomains:
    TechnicalDomainName[];

  absentNotMandatoryDomains:
    TechnicalDomainName[];

  servicesByDomain:
    Record<
      TechnicalDomainName,
      ResultsServiceEntry[]
    >;
};

export type CaseStudyResultsData = {
  result:
    CaseStudyResultsPublicResult;

  investigation:
    ResultsInvestigationProgress;

  findings:
    | GuidedInvestigationFindings
    | null;

  currentFeedbackMessage:
    | string
    | null;
};

export type ResultsInvestigationCheckResult = {
  feedback:
    | "correct"
    | "wrong"
    | "empty";

  feedbackMessage: string;

  persisted: boolean;

  progress:
    ResultsInvestigationProgress;
};

export type ResultsInvestigationAdvanceResult = {
  progress:
    ResultsInvestigationProgress;

  findings:
    | GuidedInvestigationFindings
    | null;

  caseStudyProgress:
    CaseStudyProgress;
};