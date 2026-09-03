// client/src/features/caseStudy/progress/caseStudyProgress.types.ts

import type {
  ServiceAnswer,
  SetupAnswers,
} from "../types/caseStudy.types";

export type CaseStudyRouteStage =
  | "setup"
  | "assessment"
  | "results"
  | "guided-improvement-analysis"
  | "simulation-results";

export type CaseStudyJourneyStatus =
  | "not-started"
  | "setup-in-progress"
  | "assessment-not-started"
  | "assessment-in-progress"
  | "results-investigation-not-started"
  | "results-investigation-in-progress"
  | "improvement-analysis-not-started"
  | "improvement-analysis-in-progress"
  | "simulation-ready"
  | "completed";

export type CaseStudyAssessmentProgress = {
  answers: Record<
    string,
    ServiceAnswer
  >;

  validatedServiceIds:
    string[];

  selectedServiceId:
    | string
    | null;

  completed:
    boolean;
};

export type CaseStudyProgress = {
  caseStudyId: string;

  journeyStatus:
    CaseStudyJourneyStatus;

  nextStage:
    CaseStudyRouteStage;

  allowedStages:
    CaseStudyRouteStage[];

  isPracticeAttempt:
    boolean;

  activeAttemptId:
    | string
    | null;

  officialAttemptId:
    | string
    | null;

  lastVisitedStage:
    | CaseStudyRouteStage
    | null;

  setup: {
    answers:
      SetupAnswers;

    completed: boolean;
  } | null;

  assessmentCompleted:
    boolean;

  hasBaselineResult:
    boolean;

  resultsInvestigationCompleted:
    boolean;

  guidedImprovementCompleted:
    boolean;

  hasSimulationResult:
    boolean;

  hasOfficialSimulationResult:
    boolean;

  assessmentStarted:
    boolean;

  resultsInvestigationStarted:
    boolean;

  guidedImprovementStarted:
    boolean;

  startedAt:
    | string
    | null;

  completedAt:
    | string
    | null;

  officialCompletedAt:
    | string
    | null;

  updatedAt:
    | string
    | null;
};