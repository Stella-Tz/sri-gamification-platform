//client\src\features\course\hooks\useCourseProgress.ts

import {
  useCallback,
  useRef,
  useState,
} from "react";

import type {
  TheoryLessonId,
} from "../../theory/types/theory.types";

import type {
  CourseQuizId,
  FinalTestAttempt,
  UserCourseProgress,
} from "../course.types";

import {
  loadCourseProgress,
  saveCourseProgress,
} from "../storage/courseProgressStorage";

import {
  completeLesson as completeLessonInProgress,
  completeQuiz as completeQuizInProgress,
  createEmptyCourseProgress,
  recordFinalTestAttempt as recordAttemptInProgress,
} from "../utils/courseProgress.utils";

type CourseProgressUpdater = (
  currentProgress: UserCourseProgress,
) => UserCourseProgress;

export const useCourseProgress = () => {
  const [progress, setProgress] =
    useState<UserCourseProgress>(
      loadCourseProgress,
    );

  const progressRef =
    useRef<UserCourseProgress>(progress);

  const updateProgress = useCallback(
    (
      updater: CourseProgressUpdater,
    ): UserCourseProgress => {
      const currentProgress =
        progressRef.current;

      const nextProgress =
        updater(currentProgress);

      if (
        nextProgress === currentProgress
      ) {
        return currentProgress;
      }

      progressRef.current =
        nextProgress;

      saveCourseProgress(
        nextProgress,
      );

      setProgress(nextProgress);

      return nextProgress;
    },
    [],
  );

  const completeLesson = useCallback(
    (
      lessonId: TheoryLessonId,
    ): UserCourseProgress => {
      return updateProgress(
        (currentProgress) =>
          completeLessonInProgress(
            currentProgress,
            lessonId,
          ),
      );
    },
    [updateProgress],
  );

  const completeQuiz = useCallback(
    (
      quizId: CourseQuizId,
    ): UserCourseProgress => {
      return updateProgress(
        (currentProgress) =>
          completeQuizInProgress(
            currentProgress,
            quizId,
          ),
      );
    },
    [updateProgress],
  );

  const recordFinalTestAttempt =
    useCallback(
      (
        attempt: FinalTestAttempt,
      ): UserCourseProgress => {
        return updateProgress(
          (currentProgress) =>
            recordAttemptInProgress(
              currentProgress,
              attempt,
            ),
        );
      },
      [updateProgress],
    );

  const resetProgress = useCallback(
    (): UserCourseProgress => {
      const emptyProgress =
        createEmptyCourseProgress();

      progressRef.current =
        emptyProgress;

      saveCourseProgress(
        emptyProgress,
      );

      setProgress(emptyProgress);

      return emptyProgress;
    },
    [],
  );

  return {
    progress,
    completeLesson,
    completeQuiz,
    recordFinalTestAttempt,
    resetProgress,
  };
};