// client/src/features/caseStudy/hooks/useCaseStudyResults.ts

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  caseStudyResultsApi,
} from "../../../api/caseStudyResultsApi";

import type {
  CaseStudyResultsData,
} from "../results/caseStudyResults.types";

const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  return error instanceof Error
    ? error.message
    : fallback;
};

export const useCaseStudyResults =
  () => {
    const [
      results,
      setResults,
    ] =
      useState<
        CaseStudyResultsData | null
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

    const requestIdRef =
      useRef(0);

    // -------------------------------------------------------------------------
    // Load Results
    // -------------------------------------------------------------------------

    const refreshResults =
      useCallback(
        async () => {
          const requestId =
            ++requestIdRef.current;

          setIsLoading(
            true,
          );

          setError(
            null,
          );

          try {
            const nextResults =
              await caseStudyResultsApi
                .getResults();

            if (
              requestId !==
              requestIdRef.current
            ) {
              return null;
            }

            setResults(
              nextResults,
            );

            return nextResults;
          } catch (loadError) {
            if (
              requestId ===
              requestIdRef.current
            ) {
              setError(
                getErrorMessage(
                  loadError,
                  "Could not load Case Study results.",
                ),
              );
            }

            return null;
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

    // -------------------------------------------------------------------------
    // Check Results Investigation answer
    // -------------------------------------------------------------------------

    const checkAnswer =
      useCallback(
        async (
          questionId: string,

          selectedAnswers:
            readonly string[],
        ) => {
          const response =
            await caseStudyResultsApi
              .checkAnswer(
                questionId,
                selectedAnswers,
              );

          /*
           * The backend remains authoritative.
           *
           * Empty answers are feedback-only and
           * therefore do not replace persisted
           * investigation progress.
           */
          setResults(
            (current) => {
              if (!current) {
                return current;
              }

              return {
                ...current,

                investigation:
                  response.persisted
                    ? response.progress
                    : current
                        .investigation,

                currentFeedbackMessage:
                  response
                    .feedbackMessage,
              };
            },
          );

          return response;
        },
        [],
      );

    // -------------------------------------------------------------------------
    // Advance Results Investigation
    // -------------------------------------------------------------------------

    const advanceInvestigation =
      useCallback(
        async () => {
          const response =
            await caseStudyResultsApi
              .advanceInvestigation();

          setResults(
            (current) => {
              if (!current) {
                return current;
              }

              return {
                ...current,

                investigation:
                  response.progress,

                findings:
                  response.findings,

                /*
                 * Feedback belongs to the
                 * previous question.
                 */
                currentFeedbackMessage:
                  null,
              };
            },
          );

          return response;
        },
        [],
      );

    // -------------------------------------------------------------------------
    // Initial load
    // -------------------------------------------------------------------------

    useEffect(() => {
      void refreshResults();

      return () => {
        requestIdRef.current +=
          1;
      };
    }, [
      refreshResults,
    ]);

    return {
      results,
      isLoading,
      error,

      refreshResults,

      checkAnswer,

      advanceInvestigation,
    };
  };