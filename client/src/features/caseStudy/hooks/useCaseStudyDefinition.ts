// client/src/features/caseStudy/hooks/useCaseStudyDefinition.ts

import {
  useEffect,
  useState,
} from "react";

import {
  caseStudyApi,
} from "../../../api/caseStudyApi";

import type {
  CaseStudyDefinition,
} from "../types/caseStudy.types";

export const useCaseStudyDefinition = () => {
  const [
    definition,
    setDefinition,
  ] = useState<
    CaseStudyDefinition | null
  >(null);

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

  useEffect(() => {
    let cancelled = false;

    const loadDefinition =
      async () => {
        try {
          setIsLoading(true);
          setError(null);

          const nextDefinition =
            await caseStudyApi
              .getDefinition();

          if (cancelled) {
            return;
          }

          setDefinition(
            nextDefinition,
          );
        } catch (loadError) {
          if (cancelled) {
            return;
          }

          setDefinition(null);

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load Case Study definition.",
          );
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      };

    void loadDefinition();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    definition,
    isLoading,
    error,
  };
};