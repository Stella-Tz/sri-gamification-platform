// client/src/features/caseStudy/hooks/useCaseStudyAssessmentData.ts

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
  CaseStudyAssessmentData,
} from "../assessment/caseStudyAssessment.types";

const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  return error instanceof Error
    ? error.message
    : fallback;
};

export const useCaseStudyAssessmentData =
  () => {
    const [
      assessmentData,
      setAssessmentData,
    ] =
      useState<
        CaseStudyAssessmentData | null
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

    const refreshAssessment =
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
            const nextAssessment =
              await caseStudyApi
                .getAssessment();

            if (
              requestId !==
              requestIdRef.current
            ) {
              return null;
            }

            setAssessmentData(
              nextAssessment,
            );

            return nextAssessment;
          } catch (loadError) {
            if (
              requestId ===
              requestIdRef.current
            ) {
              setError(
                getErrorMessage(
                  loadError,
                  "Could not load the Case Study Assessment.",
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

    useEffect(() => {
      void refreshAssessment();

      return () => {
        requestIdRef.current += 1;
      };
    }, [
      refreshAssessment,
    ]);

    return {
      assessmentData,
      isLoading,
      error,

      refreshAssessment,
    };
  };