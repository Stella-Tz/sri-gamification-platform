// client/src/features/caseStudy/hooks/useCaseStudyGuidedImprovement.ts

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  caseStudyGuidedImprovementApi,
} from "../../../api/caseStudyGuidedImprovementApi";

import type {
  GuidedImprovementData,
  GuidedImprovementInteractionFeedback,
} from "../improvement/guidedImprovement.types";

import {
  caseStudySimulationApi,
} from "../../../api/caseStudySimulationApi";

const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  return error instanceof Error
    ? error.message
    : fallback;
};

export const useCaseStudyGuidedImprovement =
  () => {
    const [
      data,
      setData,
    ] = useState<
      GuidedImprovementData  | null
    >(null);

    /*
     * selectedOptionValue is intentionally
     * local UI draft state.
     *
     * Merely selecting an option does not
     * make it canonical.
     */
    const [
      selectedOptionValue,
      setSelectedOptionValue,
    ] = useState("");

    const [
      feedback,
      setFeedback,
    ] = useState<
      GuidedImprovementInteractionFeedback | null
    >(null);

    const [
      isLoading,
      setIsLoading,
    ] = useState(true);

    const [
      isChecking,
      setIsChecking,
    ] = useState(false);

    const [
      isAdvancing,
      setIsAdvancing,
    ] = useState(false);

    const [
      isRunningSimulation,
      setIsRunningSimulation,
    ] = useState(false);

    const [
      loadError,
      setLoadError,
    ] = useState<
      string | null
    >(null);

    const [
      actionError,
      setActionError,
    ] = useState<
      string | null
    >(null);

    const [
      simulationRunError,
      setSimulationRunError,
    ] = useState(false);

    const requestIdRef =
      useRef(0);

    const checkInFlightRef =
      useRef(false);

    const advanceInFlightRef =
      useRef(false);

    const simulationInFlightRef =
      useRef(false);

    // -------------------------------------------------------------------------
    // Initial / refresh load
    // -------------------------------------------------------------------------

    const refresh =
      useCallback(
        async () => {
          const requestId =
            ++requestIdRef.current;

          setIsLoading(true);
          setLoadError(null);

          try {
            /*
             * Guided Improvement is now fully self-contained.
             *
             * Questions, persisted progress, resolved context,
             * helper-table rows and findings all come from the
             * Guided Improvement backend endpoint.
             *
             * No Setup, Results or frontend catalogue data is
             * required for this hook.
             */
            const nextGuidedData =
              await caseStudyGuidedImprovementApi
                .getGuidedImprovement();

            if (
              requestId !==
              requestIdRef.current
            ) {
              return null;
            }

            setData(
              nextGuidedData,
            );

            setSelectedOptionValue(
              nextGuidedData
                .progress
                .selectedOptionValue ??
                "",
            );

            setFeedback(
              nextGuidedData
                .progress
                .feedback ??
                null,
            );

            return nextGuidedData;
          } catch (error) {
            if (
              requestId ===
              requestIdRef.current
            ) {
              setLoadError(
                getErrorMessage(
                  error,
                  "Could not load the Guided Improvement Analysis.",
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
    // Local option selection
    // -------------------------------------------------------------------------

    const selectOption =
      useCallback(
        (
          value: string,
        ) => {
          if (
            checkInFlightRef.current ||
            advanceInFlightRef.current
          ) {
            return;
          }

          setSelectedOptionValue(
            value,
          );

          setFeedback(null);
          setActionError(null);
        },
        [],
      );

    // -------------------------------------------------------------------------
    // Check answer
    // -------------------------------------------------------------------------

    const checkAnswer =
      useCallback(
        async () => {
          if (
            !data ||
            checkInFlightRef.current ||
            advanceInFlightRef.current
          ) {
            return null;
          }

          const currentQuestion =
            data.questions[
              data.progress
                .currentIndex
            ] ?? null;

          if (!currentQuestion) {
            return null;
          }

          checkInFlightRef.current =
            true;

          setIsChecking(true);
          setActionError(null);

          try {
            const response =
              await caseStudyGuidedImprovementApi
                .checkAnswer(
                  currentQuestion.id,
                  selectedOptionValue,
                );

            /*
             * Feedback may also be "empty".
             * Empty selection is UI feedback only
             * and is not persisted by the backend.
             */
            setFeedback(
              response.feedback,
            );

            setData(
              (current) => {
                if (!current) {
                  return current;
                }

                return {
                  ...current,

                  progress:
                    response.persisted
                      ? response.progress
                      : current.progress,

                  resolvedContext:
                    response
                      .resolvedContext,

                  hasSimulationScenario:
                    response
                      .hasSimulationScenario,
                };
              },
            );

            if (
              response.persisted
            ) {
              setSelectedOptionValue(
                response.progress
                  .selectedOptionValue ??
                  "",
              );
            }

            return response;
          } catch (error) {
            setActionError(
              getErrorMessage(
                error,
                "Could not check the Guided Improvement answer.",
              ),
            );

            return null;
          } finally {
            checkInFlightRef.current =
              false;

            setIsChecking(false);
          }
        },
        [
          data,
          selectedOptionValue,
        ],
      );

    // -------------------------------------------------------------------------
    // Advance / complete Guided Improvement
    // -------------------------------------------------------------------------

    const advance =
      useCallback(
        async () => {
          if (
            !data ||
            feedback !== "correct" ||
            checkInFlightRef.current ||
            advanceInFlightRef.current
          ) {
            return null;
          }

          advanceInFlightRef.current =
            true;

          setIsAdvancing(true);
          setActionError(null);

          try {
            const response =
              await caseStudyGuidedImprovementApi
                .advance();

            setData(
              response,
            );

            setSelectedOptionValue(
              response.progress
                .selectedOptionValue ??
                "",
            );

            setFeedback(
              response.progress
                .feedback ??
                null,
            );

            setSimulationRunError(
              false,
            );

            return response;
          } catch (error) {
            setActionError(
              getErrorMessage(
                error,
                "Could not continue the Guided Improvement Analysis.",
              ),
            );

            return null;
          } finally {
            advanceInFlightRef.current =
              false;

            setIsAdvancing(false);
          }
        },
        [
          data,
          feedback,
        ],
      );

    // -------------------------------------------------------------------------
    // Run backend Simulation
    // -------------------------------------------------------------------------

    const runSimulation =
      useCallback(
        async (): Promise<boolean> => {
          if (
            simulationInFlightRef.current
          ) {
            return false;
          }

          simulationInFlightRef.current =
            true;

          setIsRunningSimulation(
            true,
          );

          setSimulationRunError(
            false,
          );

          try {
            /*
             * No frontend SRI calculation.
             * No local simulation mirror.
             *
             * The backend creates and persists
             * the canonical Simulation result.
             */
            await caseStudySimulationApi
              .runSimulation();

            return true;
          } catch {
            setSimulationRunError(
              true,
            );

            return false;
          } finally {
            simulationInFlightRef.current =
              false;

            setIsRunningSimulation(
              false,
            );
          }
        },
        [],
      );

    // -------------------------------------------------------------------------
    // Load on mount
    // -------------------------------------------------------------------------

    useEffect(() => {
      void refresh();

      return () => {
        requestIdRef.current += 1;
      };
    }, [refresh]);

    return {
      data,

      selectedOptionValue,
      feedback,

      isLoading,
      isChecking,
      isAdvancing,
      isRunningSimulation,

      loadError,
      actionError,
      simulationRunError,

      selectOption,
      checkAnswer,
      advance,
      runSimulation,
      refresh,
    };
  };