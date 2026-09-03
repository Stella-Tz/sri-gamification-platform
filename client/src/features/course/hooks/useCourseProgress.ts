// client/src/features/course/hooks/useCourseProgress.ts

import {
  useCallback,
  useEffect,
  useRef,
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

    currentStepId: null,

    steps: [],
    sections: [],

    completedSteps: 0,
    totalSteps: 0,

    completedSections: 0,
    totalSections: 0,

    progressPercentage: 0,

    isCourseCompleted: false,
    isCaseStudyUnlocked: false,
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

  const [
    isCompletingLesson,
    setIsCompletingLesson,
  ] = useState(false);

  const [
    actionError,
    setActionError,
  ] = useState<string | null>(
    null,
  );

  /*
   * Prevent an older GET /course/progress
   * response from overwriting a newer one.
   */
  const requestIdRef =
    useRef(0);

  const replaceProgress =
    useCallback(
      (
        nextProgress:
          UserCourseProgress,
      ): UserCourseProgress => {
        /*
         * Any in-flight refresh that started
         * before this mutation result is now
         * stale.
         */
        requestIdRef.current += 1;

        setProgress(
          nextProgress,
        );

        setError(
          null,
        );

        setActionError(
          null,
        );

        setIsLoading(
          false,
        );

        return nextProgress;
      },
      [],
    );

  const refreshProgress =
    useCallback(
      async (): Promise<
        UserCourseProgress
      > => {
        const requestId =
          ++requestIdRef.current;

        try {
          setIsLoading(
            true,
          );

          setError(
            null,
          );

          const nextProgress =
            await courseApi
              .getProgress();

          if (
            requestId ===
            requestIdRef.current
          ) {
            setProgress(
              nextProgress,
            );
          }

          return nextProgress;
        } catch (loadError) {
          if (
            requestId ===
            requestIdRef.current
          ) {
            setError(
              loadError instanceof
                Error
                ? loadError.message
                : "Failed to load course progress.",
            );
          }

          throw loadError;
        } finally {
          if (
            requestId ===
            requestIdRef.current
          ) {
            setIsLoading(
              false,
            );
          }
        }
      },
      [],
    );

  useEffect(() => {
    void refreshProgress().catch(
      () => undefined,
    );

    return () => {
      requestIdRef.current += 1;
    };
  }, [refreshProgress]);

  const completeLesson =
    useCallback(
      async (
        lessonStepId: string,
      ): Promise<
        UserCourseProgress
      > => {
        try {
          setIsCompletingLesson(
            true,
          );

          setActionError(
            null,
          );

          const nextProgress =
            await courseApi
              .completeLesson(
                lessonStepId,
              );

          return replaceProgress(
            nextProgress,
          );
        } catch (completionError) {
          setActionError(
            completionError instanceof
              Error
              ? completionError.message
              : "Failed to complete lesson.",
          );

          throw completionError;
        } finally {
          setIsCompletingLesson(
            false,
          );
        }
      },
      [replaceProgress],
    );

  const resetProgress =
    useCallback(
      async (): Promise<
        UserCourseProgress
      > => {
        try {
          setError(
            null,
          );

          const nextProgress =
            await courseApi
              .resetProgress();

          return replaceProgress(
            nextProgress,
          );
        } catch (resetError) {
          setError(
            resetError instanceof
              Error
              ? resetError.message
              : "Failed to reset course progress.",
          );

          throw resetError;
        }
      },
      [replaceProgress],
    );

  return {
    progress,
    isLoading,
    error,

    replaceProgress,
    refreshProgress,
    resetProgress,

    completeLesson,
    isCompletingLesson,
    actionError,
  };
};
