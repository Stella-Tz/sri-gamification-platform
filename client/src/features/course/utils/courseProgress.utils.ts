// client/src/features/course/utils/courseProgress.utils.ts

import type {
  CourseFinalTestId,
  CourseQuizId,
  CourseStepDefinition,
  UserCourseProgress,
} from "../course.types";

import type {
  TheoryLessonId,
} from "../../theory/types/theory.types";

export const isLessonCompleted = (
  progress: UserCourseProgress,
  lessonId: TheoryLessonId,
) => {
  return progress.completedLessonIds.includes(
    lessonId,
  );
};

export const isQuizCompleted = (
  progress: UserCourseProgress,
  quizId: CourseQuizId,
) => {
  return progress.completedQuizIds.includes(
    quizId,
  );
};

export const hasPassedFinalTest = (
  progress: UserCourseProgress,
  finalTestId: CourseFinalTestId,
) => {
  return progress.finalTestAttempts.some(
    (attempt) =>
      attempt.finalTestId ===
        finalTestId &&
      attempt.passed,
  );
};

export const isCourseStepCompleted = (
  progress: UserCourseProgress,
  step: CourseStepDefinition,
) => {
  switch (step.type) {
    case "lesson":
      return isLessonCompleted(
        progress,
        step.lessonId,
      );

    case "quiz":
      return isQuizCompleted(
        progress,
        step.id,
      );

    case "final-test":
      return hasPassedFinalTest(
        progress,
        step.id,
      );
  }
};