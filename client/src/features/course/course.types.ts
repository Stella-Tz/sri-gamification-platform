import type {
  TheoryLessonId,
  TheorySectionId,
} from "../theory/types/theory.types";

export type CourseQuizId =
  `quiz-${string}`;

export type CourseFinalTestId =
  `final-test-${string}`;

export type CourseSectionAchievementId =
  `section-badge-${string}`;

export type CaseStudyAchievementId =
  "case-study-achievement";

export type CourseAchievementId =
  | CourseSectionAchievementId
  | CaseStudyAchievementId;

export type CourseStepType =
  | "lesson"
  | "quiz"
  | "final-test";

export type CourseStepStatus =
  | "locked"
  | "current"
  | "completed";

export type CourseSectionStatus =
  | "locked"
  | "current"
  | "completed";

export type CourseAchievementIcon =
  | "BookOpenCheck"
  | "Workflow"
  | "Flame"
  | "Snowflake"
  | "Droplets"
  | "Wind"
  | "Lightbulb"
  | "PanelsTopLeft"
  | "Zap"
  | "BatteryCharging"
  | "SlidersHorizontal"
  | "BadgeCheck";

export type CourseAchievement = {
  id: CourseAchievementId;
  title: string;
  icon: CourseAchievementIcon;
};

type CourseStepBaseDefinition = {
  sectionId: TheorySectionId;
  order: number;
  title: string;
  subtitle: string;
};

export type CourseLessonStepDefinition =
  CourseStepBaseDefinition & {
    id: TheoryLessonId;
    type: "lesson";
    lessonId: TheoryLessonId;
  };

export type CourseQuizStepDefinition =
  CourseStepBaseDefinition & {
    id: CourseQuizId;
    type: "quiz";
    lessonId: TheoryLessonId;
  };

export type CourseFinalTestStepDefinition =
  CourseStepBaseDefinition & {
    id: CourseFinalTestId;
    type: "final-test";
  };

export type CourseStepDefinition =
  | CourseLessonStepDefinition
  | CourseQuizStepDefinition
  | CourseFinalTestStepDefinition;

export type CourseSectionDefinition = {
  id: TheorySectionId;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  learningGoal: string;

  achievement:
    CourseAchievement;

  steps:
    readonly CourseStepDefinition[];
};

export type CourseDefinition = {
  id: string;
  title: string;
  subtitle: string;

  sections:
    readonly CourseSectionDefinition[];
};

export type CourseStepView =
  CourseStepDefinition & {
    status: CourseStepStatus;
  };

export type CourseSectionView =
  Omit<
    CourseSectionDefinition,
    "steps"
  > & {
    status: CourseSectionStatus;
    achievementUnlocked: boolean;

    steps:
      readonly CourseStepView[];
  };

export type CourseOverviewView = {
  id: string;
  title: string;
  subtitle: string;

  progressPercentage: number;

  completedSteps: number;
  totalSteps: number;

  completedSections: number;
  totalSections: number;

  currentSectionId:
    | TheorySectionId
    | null;

  currentStep:
    | CourseStepView
    | null;

  sections:
    readonly CourseSectionView[];

  isCaseStudyUnlocked: boolean;
};

export type CourseQuestionOption = {
  id: string;
  text: string;
};

export type CourseQuestion = {
  id: string;
  prompt: string;

  options:
    readonly CourseQuestionOption[];
};

export type LessonQuizFeedback =
  | "idle"
  | "empty"
  | "correct"
  | "incorrect";

export type FinalTestFeedback =
  | "idle"
  | "empty"
  | "correct"
  | "incorrect";

export type FinalTestAttempt = {
  id: string;
  sectionId: TheorySectionId;
  finalTestId: CourseFinalTestId;

  correctCount: number;
  wrongCount: number;
  totalQuestions: number;

  accuracyPercentage: number;
  scorePercentage: number;

  passed: boolean;
  completedAt: string;
};

export type CourseStepProgress = {
  stepId:
    CourseStepDefinition["id"];

  sectionId:
    TheorySectionId;

  type:
    CourseStepType;

  status:
    CourseStepStatus;
};

export type CourseSectionProgress = {
  sectionId:
    TheorySectionId;

  status:
    CourseSectionStatus;

  completedSteps: number;
  totalSteps: number;
};

export type UserCourseProgress = {
  /*
   * Historical completion collections are still
   * exposed because lesson/final-test UI and the
   * Dashboard currently use them.
   *
   * Course journey decisions below are canonical
   * backend output and must not be re-derived in
   * the frontend.
   */
  completedLessonIds:
    readonly TheoryLessonId[];

  completedQuizIds:
    readonly CourseQuizId[];

  finalTestAttempts:
    readonly FinalTestAttempt[];

  currentStepId:
    | CourseStepDefinition["id"]
    | null;

  steps:
    readonly CourseStepProgress[];

  sections:
    readonly CourseSectionProgress[];

  completedSteps: number;
  totalSteps: number;

  completedSections: number;
  totalSections: number;

  progressPercentage: number;

  isCourseCompleted: boolean;
  isCaseStudyUnlocked: boolean;
};

// -----------------------------------------------------------------------------
// Lesson quiz backend data
// -----------------------------------------------------------------------------

export type LessonQuizData = {
  quizId: string;
  sectionId: string;
  lessonId: string;

  questions:
    CourseQuestion[];
};

export type LessonQuizAnswerResult = {
  questionId: string;

  correct: boolean;

  correctOptionId: string;

  explanation: string;
};

export type LessonQuizCompletionAnswer = {
  questionId: string;

  selectedOptionId: string;
};

// -----------------------------------------------------------------------------
// Final test backend data
// -----------------------------------------------------------------------------

export type FinalTestState = {
  attemptId: string;

  finalTestId: string;

  sectionId: string;

  status:
    | "in-progress"
    | "passed"
    | "failed";

  allowedMistakes: number;

  remainingMistakes: number;

  correctCount: number;

  wrongCount: number;

  answeredCount: number;

  totalQuestions: number;

  accuracyPercentage: number;

  scorePercentage: number;

  currentQuestionNumber: number;

  currentQuestion:
    | CourseQuestion
    | null;

  completedAt:
    | string
    | null;
};

export type FinalTestAnswerResult = {
  questionId: string;

  correct: boolean;

  attempt:
    FinalTestState;
};

export type FinalTestAnswerSubmission = {
  result:
    FinalTestAnswerResult;

  progress:
    | UserCourseProgress
    | null;
};