// client/src/features/caseStudy/progress/caseStudyProgress.types.ts

import type {
  CaseStudySubmitResult,
  GuidedImprovementAnswer,
  ServiceAnswer,
  SetupAnswers,
  SimulationResult,
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

/*
 * Kept as an alias so existing imports do not
 * break while the Dashboard is being rebuilt.
 */
export type CaseStudyProgressStage =
  CaseStudyJourneyStatus;

export type CaseStudyInteractionFeedback =
  | "correct"
  | "wrong"
  | "empty"
  | null;

export type CaseStudySetupProgress = {
  answers: SetupAnswers;
  completed: boolean;
};

export type CaseStudyAssessmentProgress = {
  answers: Record<
    string,
    ServiceAnswer
  >;

  validatedServiceIds: string[];

  selectedServiceId:
    | string
    | null;

  completed: boolean;
};

export type CaseStudyResultsInvestigationAnswer =
  {
    questionId: string;

    selectedAnswers:
      string[];

    feedback:
      CaseStudyInteractionFeedback;

    attempts: number;
  };

export type CaseStudyResultsInvestigationProgress =
  {
    currentIndex: number;

    /*
     * Optional during the migration step.
     * Every newly saved record contains this
     * array.
     */
    answers?:
      CaseStudyResultsInvestigationAnswer[];

    completed: boolean;
  };

export type CaseStudyGuidedImprovementProgress =
  {
    currentIndex: number;

    /*
     * These values preserve the current answer
     * even before the user proceeds.
     */
    selectedOptionValue?: string;

    feedback?:
      CaseStudyInteractionFeedback;

    answers:
      GuidedImprovementAnswer[];

    completed: boolean;
  };

/*
 * Permanent learning completion.
 *
 * A new practice attempt may clear the active
 * attempt, but it never removes this record.
 */
export type CaseStudyCompletion = {
  completedAt: string;
};

/*
 * Permanent snapshot of the first official Case Study
 * completion. Practice attempts never replace it.
 */
export type CaseStudyOfficialResult = {
  /*
   * SimulationResult already contains the complete
   * official baseline as `before` and the simulated
   * improved result as `after`.
   */
  simulationResult: SimulationResult;
};

export type CaseStudyProgressRecord = {
  caseStudyId: string;

  lastVisitedStage:
    | CaseStudyRouteStage
    | null;

  setup:
    | CaseStudySetupProgress
    | null;

  assessment:
    | CaseStudyAssessmentProgress
    | null;

  baselineResult:
    | CaseStudySubmitResult
    | null;

  resultsInvestigation:
    | CaseStudyResultsInvestigationProgress
    | null;

  guidedImprovement:
    | CaseStudyGuidedImprovementProgress
    | null;

  /*
   * Result of the current attempt.
   */
  simulationResult:
    | SimulationResult
    | null;

  /*
   * Permanent completion of the learning step.
   * This remains when Practice Again starts a
   * new attempt.
   */
  completion:
    | CaseStudyCompletion
    | null;

  /*
   * Results from the first official completion.
   * Practice Again preserves this snapshot.
   */
  officialResult:
    | CaseStudyOfficialResult
    | null;

  updatedAt: string;
};

export type CaseStudyProgressState = {
  activeCaseStudyId:
    | string
    | null;

  recordsByCaseStudyId: Record<
    string,
    CaseStudyProgressRecord
  >;
};

export type CaseStudyNextAction = {
  status:
    CaseStudyJourneyStatus;

  stage:
    CaseStudyRouteStage;

  label: string;
  path: string;
};
