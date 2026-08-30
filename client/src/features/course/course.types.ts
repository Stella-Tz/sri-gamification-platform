// client/src/features/course/course.types.ts

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
    allowedMistakes: number;
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
  sectionId: TheorySectionId;
  lessonId: TheoryLessonId;

  prompt: string;

  options:
    readonly CourseQuestionOption[];

  correctOptionId: string;

  /**
   * Displayed only in formative lesson
   * quizzes. It is not shown during
   * final tests.
   */
  explanation: string;
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

export type FinalTestResult =
  | "in-progress"
  | "passed"
  | "failed";

export type FinalTestAttempt = {
  id: string;
  sectionId: TheorySectionId;
  finalTestId: CourseFinalTestId;

  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  accuracyPercentage: number;

  passed: boolean;
  completedAt: string;
};

export type UserCourseProgress = {
  completedLessonIds:
    readonly TheoryLessonId[];

  completedQuizIds:
    readonly CourseQuizId[];

  finalTestAttempts:
    readonly FinalTestAttempt[];
};
