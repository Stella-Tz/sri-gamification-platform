//client\src\features\course\utils\courseProgress.utils.ts

import type {
  CourseFinalTestId,
  CourseQuizId,
  CourseStepDefinition,
  FinalTestAttempt,
  UserCourseProgress,
} from "../course.types";

import type {
  TheoryLessonId,
} from "../../theory/types/theory.types";

export const createEmptyCourseProgress =
  (): UserCourseProgress => {
    return {
      completedLessonIds: [],
      completedQuizIds: [],
      finalTestAttempts: [],
    };
  };

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

export const getLatestFinalTestAttempt = (
  progress: UserCourseProgress,
  finalTestId: CourseFinalTestId,
): FinalTestAttempt | null => {
  const matchingAttempts =
    progress.finalTestAttempts.filter(
      (attempt) =>
        attempt.finalTestId ===
        finalTestId,
    );

  if (
    matchingAttempts.length === 0
  ) {
    return null;
  }

  return [...matchingAttempts].sort(
    (first, second) =>
      second.completedAt.localeCompare(
        first.completedAt,
      ),
  )[0];
};

export const completeLesson = (
  progress: UserCourseProgress,
  lessonId: TheoryLessonId,
): UserCourseProgress => {
  if (
    progress.completedLessonIds.includes(
      lessonId,
    )
  ) {
    return progress;
  }

  return {
    ...progress,
    completedLessonIds: [
      ...progress.completedLessonIds,
      lessonId,
    ],
  };
};

export const completeQuiz = (
  progress: UserCourseProgress,
  quizId: CourseQuizId,
): UserCourseProgress => {
  if (
    progress.completedQuizIds.includes(
      quizId,
    )
  ) {
    return progress;
  }

  return {
    ...progress,
    completedQuizIds: [
      ...progress.completedQuizIds,
      quizId,
    ],
  };
};

export const recordFinalTestAttempt = (
  progress: UserCourseProgress,
  attempt: FinalTestAttempt,
): UserCourseProgress => {
  const alreadyRecorded =
    progress.finalTestAttempts.some(
      (existingAttempt) =>
        existingAttempt.id ===
        attempt.id,
    );

  if (alreadyRecorded) {
    return progress;
  }

  return {
    ...progress,
    finalTestAttempts: [
      ...progress.finalTestAttempts,
      attempt,
    ],
  };
};