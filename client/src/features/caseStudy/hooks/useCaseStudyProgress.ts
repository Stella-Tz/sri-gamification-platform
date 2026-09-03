// client/src/features/caseStudy/hooks/useCaseStudyProgress.ts

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  caseStudyApi,
} from "../../../api/caseStudyApi";

import type {
  CaseStudyProgress,
} from "../progress/caseStudyProgress.types";

const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  return error instanceof Error
    ? error.message
    : fallback;
};

export const useCaseStudyProgress =
  () => {
    const [
      progress,
      setProgress,
    ] =
      useState<
        CaseStudyProgress | null
      >(null);

    const [
      isLoading,
      setIsLoading,
    ] =
      useState(true);

    const [
      error,
      setError,
    ] =
      useState<string | null>(
        null,
      );

    const [
      isStartingPracticeAgain,
      setIsStartingPracticeAgain,
    ] =
      useState(false);

    /*
     * Keeps the latest canonical progress
     * available to async callbacks without
     * depending on a stale render closure.
     */
    const progressRef =
      useRef<
        CaseStudyProgress | null
      >(null);

    /*
     * Every GET receives an id.
     *
     * When a mutation gives us newer canonical
     * progress, applyProgress() invalidates any
     * older GET that may still be in flight.
     */
    const requestIdRef =
      useRef(0);

    const practiceInFlightRef =
      useRef(false);

    // -------------------------------------------------------------------------
    // Apply canonical progress returned by a mutation
    // -------------------------------------------------------------------------

    const applyProgress =
      useCallback(
        (
          nextProgress:
            CaseStudyProgress,
        ) => {
          /*
           * Invalidate any older progress GET.
           *
           * Example:
           *
           * GET /progress starts
           * POST /setup/complete finishes
           * applyProgress(new progress)
           * old GET finishes afterwards
           *
           * Without this guard, the old GET could
           * overwrite the newer mutation result.
           */
          requestIdRef.current +=
            1;

          progressRef.current =
            nextProgress;

          setProgress(
            nextProgress,
          );

          setError(null);

          /*
           * A mutation response is already
           * canonical backend state, therefore
           * there is nothing left to "load".
           */
          setIsLoading(false);
        },
        [],
      );

    // -------------------------------------------------------------------------
    // Refresh canonical progress
    // -------------------------------------------------------------------------

    const refreshProgress =
      useCallback(
        async (): Promise<
          CaseStudyProgress | null
        > => {
          const requestId =
            ++requestIdRef.current;

          /*
           * Only the FIRST hydration should put
           * progress into a loading state.
           *
           * Once we already have canonical data,
           * a background refresh must not tear down
           * or visually reset the current UI.
           */
          if (
            progressRef.current ===
            null
          ) {
            setIsLoading(true);
          }

          setError(null);

          try {
            const nextProgress =
              await caseStudyApi
                .getProgress();

            if (
              requestId !==
              requestIdRef.current
            ) {
              return null;
            }

            progressRef.current =
              nextProgress;

            setProgress(
              nextProgress,
            );

            return nextProgress;
          } catch (loadError) {
            if (
              requestId ===
              requestIdRef.current
            ) {
              setError(
                getErrorMessage(
                  loadError,
                  "Could not load Case Study progress.",
                ),
              );
            }

            return null;
          } finally {
            if (
              requestId ===
              requestIdRef.current
            ) {
              setIsLoading(false);
            }
          }
        },
        [],
      );

    // -------------------------------------------------------------------------
    // Practice Again
    // -------------------------------------------------------------------------

    const startPracticeAgain =
      useCallback(
        async (): Promise<
          CaseStudyProgress | null
        > => {
          if (
            practiceInFlightRef
              .current
          ) {
            return null;
          }

          practiceInFlightRef.current =
            true;

          setIsStartingPracticeAgain(
            true,
          );

          setError(null);

          try {
            const nextProgress =
              await caseStudyApi
                .startPracticeAgain();

            /*
             * The POST response already contains
             * the new canonical attempt state.
             *
             * Apply it immediately so RouteGuard,
             * CaseStudyPage and every other consumer
             * can see the same state before navigation.
             */
            applyProgress(
              nextProgress,
            );

            return nextProgress;
          } catch (practiceError) {
            setError(
              getErrorMessage(
                practiceError,
                "Could not start a new Case Study practice attempt.",
              ),
            );

            return null;
          } finally {
            practiceInFlightRef.current =
              false;

            setIsStartingPracticeAgain(
              false,
            );
          }
        },
        [
          applyProgress,
        ],
      );

    // -------------------------------------------------------------------------
    // Initial hydration
    // -------------------------------------------------------------------------

    useEffect(() => {
      void refreshProgress();

      return () => {
        /*
         * Ignore any request belonging to an
         * unmounted instance.
         */
        requestIdRef.current +=
          1;
      };
    }, [
      refreshProgress,
    ]);

    return {
      progress,

      isLoading,

      error,

      isStartingPracticeAgain,

      refreshProgress,

      /*
       * Allows mutation owners such as Setup,
       * Assessment, Results and Guided Improvement
       * to push their returned canonical progress
       * into the shared provider BEFORE navigating.
       */
      applyProgress,

      startPracticeAgain,
    };
  };