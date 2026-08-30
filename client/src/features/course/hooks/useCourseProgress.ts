// client/src/features/course/hooks/useCourseProgress.ts

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  courseApi,
} from "../../../api/courseApi";

import type {
  UserCourseProgress,
} from "../course.types";

const EMPTY_COURSE_PROGRESS:
  UserCourseProgress = {
    completedLessonIds: [],
    completedQuizIds: [],
    finalTestAttempts: [],
  };

export const useCourseProgress = () => {
  const [
    progress,
    setProgress,
  ] =
    useState<UserCourseProgress>(
      EMPTY_COURSE_PROGRESS,
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  const replaceProgress =
    useCallback(
      (
        nextProgress:
          UserCourseProgress,
      ): UserCourseProgress => {
        setProgress(
          nextProgress,
        );

        setError(
          null,
        );

        return nextProgress;
      },
      [],
    );

  const refreshProgress =
    useCallback(
      async (): Promise<UserCourseProgress> => {
        try {
          setIsLoading(
            true,
          );

          setError(
            null,
          );

          const nextProgress =
            await courseApi.getProgress();

          setProgress(
            nextProgress,
          );

          return nextProgress;
        } catch (loadError) {
          const message =
            loadError instanceof Error
              ? loadError.message
              : "Failed to load course progress.";

          setError(
            message,
          );

          throw loadError;
        } finally {
          setIsLoading(
            false,
          );
        }
      },
      [],
    );

  useEffect(() => {
    void refreshProgress().catch(
      () => undefined,
    );
  }, [refreshProgress]);

  const resetProgress =
    useCallback(
      async (): Promise<UserCourseProgress> => {
        try {
          setError(
            null,
          );

          const nextProgress =
            await courseApi.resetProgress();

          setProgress(
            nextProgress,
          );

          return nextProgress;
        } catch (resetError) {
          const message =
            resetError instanceof Error
              ? resetError.message
              : "Failed to reset course progress.";

          setError(
            message,
          );

          throw resetError;
        }
      },
      [],
    );

  return {
    progress,

    isLoading,
    error,

    replaceProgress,
    refreshProgress,
    resetProgress,
  };
};