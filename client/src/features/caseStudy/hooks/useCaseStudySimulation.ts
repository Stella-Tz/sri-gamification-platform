// client/src/features/caseStudy/hooks/useCaseStudySimulation.ts

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  caseStudySimulationApi,
} from "../../../api/caseStudySimulationApi";

import type {
  CaseStudySimulationReadPreference,
  CaseStudySimulationResult,
  CaseStudySimulationSource,
} from "../simulation/caseStudySimulation.types";

const getErrorMessage = (
  error: unknown,
): string => {
  return error instanceof
    Error
    ? error.message
    : "Could not load the Simulation result.";
};

type UseCaseStudySimulationOptions = {
  preference?:
    CaseStudySimulationReadPreference;
};

export const useCaseStudySimulation =
  ({
    preference =
      "default",
  }: UseCaseStudySimulationOptions = {}) => {
    const [
      simulationResult,
      setSimulationResult,
    ] = useState<
      CaseStudySimulationResult  | null
    >(null);

    const [
      source,
      setSource,
    ] = useState<
      CaseStudySimulationSource
    >(null);

    const [
      isLoading,
      setIsLoading,
    ] = useState(true);

    const [
      error,
      setError,
    ] = useState<
      string | null
    >(null);

    const requestIdRef =
      useRef(0);

    const refresh =
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
            const response =
              await caseStudySimulationApi
                .getSimulation(
                  preference,
                );

            if (
              requestId !==
              requestIdRef.current
            ) {
              return null;
            }

            setSimulationResult(
              response
                .simulationResult,
            );

            setSource(
              response.source,
            );

            return response;
          } catch (nextError) {
            if (
              requestId !==
              requestIdRef.current
            ) {
              return null;
            }

            setSimulationResult(
              null,
            );

            setSource(
              null,
            );

            setError(
              getErrorMessage(
                nextError,
              ),
            );

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
        [preference],
      );

    useEffect(() => {
      void refresh();

      return () => {
        requestIdRef.current +=
          1;
      };
    }, [refresh]);

    return {
      simulationResult,
      source,

      isLoading,
      error,

      refresh,
    };
  };
