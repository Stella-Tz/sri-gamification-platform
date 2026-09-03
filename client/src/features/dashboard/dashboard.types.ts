// client/src/features/dashboard/dashboard.types.ts

import type {
  AuthUser,
} from "../../types/auth.types";

import type {
  CourseAchievement,
} from "../course/course.types";

import type {
  CaseStudyProgress,
} from "../caseStudy/progress/caseStudyProgress.types";

import type {
  CaseStudyResultsPublicResult,
} from "../caseStudy/results/caseStudyResults.types";

import type {
  CaseStudySimulationResult,
} from "../caseStudy/simulation/caseStudySimulation.types";

import type {
  UserCourseProgress,
} from "../course/course.types";

export type DashboardDataDto = {
  user:
    AuthUser;

  courseProgress:
    UserCourseProgress;

  caseStudy: {
    id:
      | string
      | null;

    title:
      | string
      | null;

    progress:
      CaseStudyProgress;

    activeBaselineResult:
      | CaseStudyResultsPublicResult
      | null;

    officialSimulationResult:
      | CaseStudySimulationResult
      | null;
  };
};

export type AchievementStatus =
  | "unlocked"
  | "locked";

export type JourneyStepStatus =
  | "completed"
  | "current"
  | "locked";

/**
 * State of the current Case Study attempt.
 * This exists for navigation / Next Action only.
 */
export type CaseStudyDashboardStatus =
  | "locked"
  | "available"
  | "in-progress"
  | "completed"
  | "practice-in-progress";

export type NextActionState =
  | "start-learning"
  | "continue-learning"
  | "start-case-study"
  | "continue-case-study"
  | "resume-practice"
  | "review-case-study";

export type DashboardAchievement =
  CourseAchievement & {
    status:
      AchievementStatus;
  };

export type JourneyStep = {
  id: string;

  type:
    | "theory-section"
    | "case-study";

  title: string;
  order: number;

  status:
    JourneyStepStatus;
};

export type AssessmentProgressItem = {
  sectionId: string;
  sectionTitle: string;

  score:
    | number
    | null;

  passed:
    | boolean
    | null;

  attemptCount:
    number;
};

export type DashboardLearningMilestone = {
  title: string;

  progressPercentage:
    number;
};

export type DashboardNextAction = {
  state:
    NextActionState;

  path:
    string;

  /**
   * Present only while the learner is working
   * through the theory Course. It represents the
   * overall Course percentage that will be reached
   * after the current section is completed.
   */
  milestone:
    | DashboardLearningMilestone
    | null;
};

/**
 * The Case Study summary card is intentionally
 * independent from Practice Again.
 *
 * It represents only the first official Case Study
 * journey and its permanent official result.
 */
export type CaseStudySummaryState =
  | "locked"
  | "available"
  | "assessment-in-progress"
  | "baseline-result"
  | "completed";

export type DashboardKeyFunctionalityScore = {
  label: string;

  score:
    | number
    | null;
};

export type DashboardBaselineResultSummary = {
  totalScore:
    number;

  sriClass:
    string;

  keyFunctionalityScores:
    DashboardKeyFunctionalityScore[];
};

export type DashboardSimulationResultSummary = {
  beforeScore:
    number;

  beforeClass:
    string;

  afterScore:
    number;

  afterClass:
    string;

  delta:
    number;

  upgradedServiceCode:
    string;

  upgradedServiceTitle:
    string;
};

export type DashboardCaseStudySummary = {
  state:
    CaseStudySummaryState;

  caseStudyId:
    | string
    | null;

  caseStudyTitle:
    | string
    | null;

  completedCourseSteps:
    number;

  totalCourseSteps:
    number;

  remainingCourseSteps:
    number;

  courseProgressPercentage:
    number;

  baselineResult:
    | DashboardBaselineResultSummary
    | null;

  simulationResult:
    | DashboardSimulationResultSummary
    | null;

  completionAt:
    | string
    | null;
};

export type DashboardViewModel = {
  user:
    AuthUser;

  achievements:
    DashboardAchievement[];

  learningJourney:
    JourneyStep[];

  assessmentProgress:
    AssessmentProgressItem[];

  theoryProgress: {
    completedSections:
      number;

    totalSections:
      number;

    currentStepTitle:
      | string
      | null;

    status:
      | "not-started"
      | "in-progress"
      | "completed";
  };

  courseProgress: {
    completedSteps:
      number;

    totalSteps:
      number;

    progressPercentage:
      number;
  };

  /**
   * Current attempt state. Used by NextActionCard.
   */
  caseStudy: {
    id:
      | string
      | null;

    title:
      | string
      | null;

    status:
      CaseStudyDashboardStatus;

    currentStepLabel:
      | string
      | null;

    completionAt:
      | string
      | null;
  };

  /**
   * First official Case Study / permanent results.
   * Practice Again never changes this card once the
   * official Case Study has been completed.
   */
  caseStudySummary:
    DashboardCaseStudySummary;

  nextAction:
    DashboardNextAction;
};
