//client\src\features\course\storage\courseProgressStorage.ts

import type {
  CourseQuizId,
  FinalTestAttempt,
  UserCourseProgress,
} from "../course.types";

import {
  createEmptyCourseProgress,
} from "../utils/courseProgress.utils";

const COURSE_PROGRESS_STORAGE_KEY =
  "sri-course-progress-v2";

const COURSE_PROGRESS_STORAGE_VERSION = 1;

type StoredCourseProgress = {
  version: number;
  progress: UserCourseProgress;
};

export const loadCourseProgress =
  (): UserCourseProgress => {
    if (typeof window === "undefined") {
      return createEmptyCourseProgress();
    }

    try {
      const storedValue =
        window.localStorage.getItem(
          COURSE_PROGRESS_STORAGE_KEY,
        );

      if (!storedValue) {
        return createEmptyCourseProgress();
      }

      const parsedValue: unknown =
        JSON.parse(storedValue);

      if (!isStoredCourseProgress(parsedValue)) {
        return createEmptyCourseProgress();
      }

      return parsedValue.progress;
    } catch {
      return createEmptyCourseProgress();
    }
  };

export const saveCourseProgress = (
  progress: UserCourseProgress,
): void => {
  if (typeof window === "undefined") {
    return;
  }

  const storedValue: StoredCourseProgress = {
    version:
      COURSE_PROGRESS_STORAGE_VERSION,
    progress,
  };

  try {
    window.localStorage.setItem(
      COURSE_PROGRESS_STORAGE_KEY,
      JSON.stringify(storedValue),
    );
  } catch {
    /*
     * Local storage may be unavailable or full.
     * Progress still remains available during
     * the current application session.
     */
  }
};

export const clearStoredCourseProgress =
  (): void => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.removeItem(
        COURSE_PROGRESS_STORAGE_KEY,
      );
    } catch {
      /*
       * Nothing else is required when local
       * storage is unavailable.
       */
    }
  };

const isStoredCourseProgress = (
  value: unknown,
): value is StoredCourseProgress => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.version ===
      COURSE_PROGRESS_STORAGE_VERSION &&
    isUserCourseProgress(value.progress)
  );
};

const isUserCourseProgress = (
  value: unknown,
): value is UserCourseProgress => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isStringArray(
      value.completedLessonIds,
    ) &&
    isCourseQuizIdArray(
      value.completedQuizIds,
    ) &&
    Array.isArray(
      value.finalTestAttempts,
    ) &&
    value.finalTestAttempts.every(
      isFinalTestAttempt,
    )
  );
};

const isFinalTestAttempt = (
  value: unknown,
): value is FinalTestAttempt => {
  if (!isRecord(value)) {
    return false;
  }

  if (
    !isNonEmptyString(value.id) ||
    !isNonEmptyString(value.sectionId) ||
    !isFinalTestId(value.finalTestId) ||
    !isNonNegativeInteger(
      value.correctCount,
    ) ||
    !isNonNegativeInteger(
      value.wrongCount,
    ) ||
    !isNonNegativeInteger(
      value.totalQuestions,
    ) ||
    !isPercentage(
      value.accuracyPercentage,
    ) ||
    typeof value.passed !== "boolean" ||
    !isValidDateString(
      value.completedAt,
    )
  ) {
    return false;
  }

  return (
    value.correctCount +
      value.wrongCount <=
    value.totalQuestions
  );
};

const isCourseQuizIdArray = (
  value: unknown,
): value is CourseQuizId[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isNonEmptyString(item) &&
        item.startsWith("quiz-"),
    )
  );
};

const isStringArray = (
  value: unknown,
): value is string[] => {
  return (
    Array.isArray(value) &&
    value.every(isNonEmptyString)
  );
};

const isFinalTestId = (
  value: unknown,
): value is `final-test-${string}` => {
  return (
    isNonEmptyString(value) &&
    value.startsWith("final-test-")
  );
};

const isNonEmptyString = (
  value: unknown,
): value is string => {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
};

const isNonNegativeInteger = (
  value: unknown,
): value is number => {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0
  );
};

const isPercentage = (
  value: unknown,
): value is number => {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 100
  );
};

const isValidDateString = (
  value: unknown,
): value is string => {
  return (
    isNonEmptyString(value) &&
    !Number.isNaN(Date.parse(value))
  );
};

const isRecord = (
  value: unknown,
): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};