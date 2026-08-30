// client/src/features/caseStudy/progress/useCaseStudyProgress.ts

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  CaseStudySubmitResult,
  SetupAnswers,
  SimulationResult,
} from "../types/caseStudy.types";

import type {
  CaseStudyAssessmentProgress,
  CaseStudyGuidedImprovementProgress,
  CaseStudyProgressRecord,
  CaseStudyProgressState,
  CaseStudyResultsInvestigationProgress,
  CaseStudyRouteStage,
} from "./caseStudyProgress.types";

import {
  clearCaseStudyProgress,
  loadCaseStudyProgress,
  saveCaseStudyProgress,
  subscribeToCaseStudyProgress,
} from "./caseStudyProgress.storage";

import {
  areCaseStudyValuesEqual,
  createEmptyCaseStudyProgressState,
  createNewPracticeAttemptRecord,
  getActiveCaseStudyProgressRecord,
  getCaseStudyNextAction,
  getCaseStudyProgressRecord,
  getCaseStudyProgressStage,
  hasCaseStudyDerivedProgress,
  removeCaseStudyProgressRecord,
  updateCaseStudyProgressRecord,
} from "./caseStudyProgress.utils";

type ProgressUpdater = (
  current:
    CaseStudyProgressState,
) => CaseStudyProgressState;

export const useCaseStudyProgress =
  () => {
    const [
      progress,
      setProgress,
    ] =
      useState<CaseStudyProgressState>(
        loadCaseStudyProgress,
      );

    useEffect(() => {
      return subscribeToCaseStudyProgress(
        () => {
          setProgress(
            loadCaseStudyProgress(),
          );
        },
      );
    }, []);

    const updateProgress =
      useCallback(
        (
          updater:
            ProgressUpdater,
        ) => {
          const currentProgress =
            loadCaseStudyProgress();

          const nextProgress =
            updater(
              currentProgress,
            );

          if (
            nextProgress ===
            currentProgress
          ) {
            return;
          }

          saveCaseStudyProgress(
            nextProgress,
          );

          setProgress(
            nextProgress,
          );
        },
        [],
      );

    const activeCaseStudy =
      useMemo(() => {
        return getActiveCaseStudyProgressRecord(
          progress,
        );
      }, [progress]);

    const activeCaseStudyStatus =
      useMemo(() => {
        return getCaseStudyProgressStage(
          activeCaseStudy,
        );
      }, [activeCaseStudy]);

    const activeCaseStudyNextAction =
      useMemo(() => {
        return getCaseStudyNextAction(
          activeCaseStudy,
        );
      }, [activeCaseStudy]);

    const getProgressForCaseStudy =
      useCallback(
        (
          caseStudyId: string,
        ): CaseStudyProgressRecord | null => {
          return getCaseStudyProgressRecord(
            progress,
            caseStudyId,
          );
        },
        [progress],
      );

    const getStatusForCaseStudy =
      useCallback(
        (
          caseStudyId: string,
        ) => {
          return getCaseStudyProgressStage(
            getCaseStudyProgressRecord(
              progress,
              caseStudyId,
            ),
          );
        },
        [progress],
      );

    const getNextActionForCaseStudy =
      useCallback(
        (
          caseStudyId: string,
        ) => {
          return getCaseStudyNextAction(
            getCaseStudyProgressRecord(
              progress,
              caseStudyId,
            ),
          );
        },
        [progress],
      );

    const activateCaseStudy =
      useCallback(
        (
          caseStudyId: string,
        ) => {
          updateProgress(
            (current) => {
              const existingRecord =
                getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                );

              if (
                existingRecord &&
                current
                  .activeCaseStudyId ===
                  caseStudyId
              ) {
                return current;
              }

              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) =>
                  record,
              );
            },
          );
        },
        [updateProgress],
      );

    const markStageVisited =
      useCallback(
        (
          caseStudyId: string,
          stage:
            CaseStudyRouteStage,
        ) => {
          updateProgress(
            (current) => {
              const existingRecord =
                getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                );

              if (
                existingRecord
                  ?.lastVisitedStage ===
                  stage &&
                current
                  .activeCaseStudyId ===
                  caseStudyId
              ) {
                return current;
              }

              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) => ({
                  ...record,

                  lastVisitedStage:
                    stage,
                }),
              );
            },
          );
        },
        [updateProgress],
      );

    const saveSetupDraft =
      useCallback(
        (
          caseStudyId: string,
          answers:
            SetupAnswers,
        ) => {
          updateProgress(
            (current) => {
              const existingRecord =
                getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                );

              const existingSetup =
                existingRecord
                  ?.setup ?? null;

              const answersUnchanged =
                existingSetup !==
                  null &&
                areCaseStudyValuesEqual(
                  existingSetup
                    .answers,
                  answers,
                );

              if (
                answersUnchanged &&
                existingRecord
                  ?.lastVisitedStage ===
                  "setup" &&
                current
                  .activeCaseStudyId ===
                  caseStudyId
              ) {
                return current;
              }

              /*
               * When a completed Setup already has
               * dependent progress, temporary edits are
               * not persisted automatically.
               *
               * The existing validation must succeed
               * before completeSetup can replace the
               * saved Setup.
               */
              const protectDerivedProgress =
                existingSetup
                  ?.completed ===
                  true &&
                hasCaseStudyDerivedProgress(
                  existingRecord,
                ) &&
                !answersUnchanged;

              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) => ({
                  ...record,

                  lastVisitedStage:
                    "setup",

                  setup:
                    protectDerivedProgress
                      ? record.setup
                      : {
                          answers,

                          completed:
                            answersUnchanged
                              ? (
                                  existingSetup
                                    ?.completed ??
                                  false
                                )
                              : false,
                        },
                }),
              );
            },
          );
        },
        [updateProgress],
      );

    const completeSetup =
      useCallback(
        (
          caseStudyId: string,
          answers:
            SetupAnswers,
        ) => {
          updateProgress(
            (current) => {
              const existingRecord =
                getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                );

              const existingSetup =
                existingRecord
                  ?.setup ?? null;

              const answersChanged =
                existingSetup ===
                  null ||
                !areCaseStudyValuesEqual(
                  existingSetup
                    .answers,
                  answers,
                );

              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) => ({
                  ...record,

                  lastVisitedStage:
                    "assessment",

                  setup: {
                    answers,
                    completed: true,
                  },

                  assessment:
                    answersChanged
                      ? null
                      : record
                          .assessment,

                  baselineResult:
                    answersChanged
                      ? null
                      : record
                          .baselineResult,

                  resultsInvestigation:
                    answersChanged
                      ? null
                      : record
                          .resultsInvestigation,

                  guidedImprovement:
                    answersChanged
                      ? null
                      : record
                          .guidedImprovement,

                  simulationResult:
                    answersChanged
                      ? null
                      : record
                          .simulationResult,
                }),
              );
            },
          );
        },
        [updateProgress],
      );

    const saveAssessmentProgress =
      useCallback(
        (
          caseStudyId: string,

          assessment:
            CaseStudyAssessmentProgress,
        ) => {
          updateProgress(
            (current) => {
              const existingRecord =
                getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                );

              const existingAssessment =
                existingRecord
                  ?.assessment ?? null;

              const answersChanged =
                existingAssessment ===
                  null ||
                !areCaseStudyValuesEqual(
                  existingAssessment
                    .answers,
                  assessment.answers,
                );

              const validationChanged =
                existingAssessment ===
                  null ||
                !areCaseStudyValuesEqual(
                  existingAssessment
                    .validatedServiceIds,

                  assessment
                    .validatedServiceIds,
                );

              const completionChanged =
                existingAssessment ===
                  null ||
                existingAssessment
                  .completed !==
                  assessment.completed;

              const selectedServiceChanged =
                existingAssessment
                  ?.selectedServiceId !==
                assessment
                  .selectedServiceId;

              const contentChanged =
                answersChanged ||
                validationChanged ||
                completionChanged;

              if (
                !contentChanged &&
                !selectedServiceChanged &&
                existingRecord
                  ?.lastVisitedStage ===
                  "assessment" &&
                current
                  .activeCaseStudyId ===
                  caseStudyId
              ) {
                return current;
              }

              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) => ({
                  ...record,

                  lastVisitedStage:
                    "assessment",

                  assessment,

                  /*
                   * Changing only selectedServiceId is
                   * navigation. It must not invalidate
                   * Results or Simulation.
                   */
                  baselineResult:
                    contentChanged
                      ? null
                      : record
                          .baselineResult,

                  resultsInvestigation:
                    contentChanged
                      ? null
                      : record
                          .resultsInvestigation,

                  guidedImprovement:
                    contentChanged
                      ? null
                      : record
                          .guidedImprovement,

                  simulationResult:
                    contentChanged
                      ? null
                      : record
                          .simulationResult,
                }),
              );
            },
          );
        },
        [updateProgress],
      );

    const completeAssessment =
      useCallback(
        (
          caseStudyId: string,

          assessment:
            CaseStudyAssessmentProgress,

          result:
            CaseStudySubmitResult,
        ) => {
          updateProgress(
            (current) => {
              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) => {
                  const answersChanged =
                    record.assessment ===
                      null ||
                    !areCaseStudyValuesEqual(
                      record.assessment
                        .answers,

                      assessment.answers,
                    );

                  const resultChanged =
                    record.baselineResult ===
                      null ||
                    !areCaseStudyValuesEqual(
                      record.baselineResult,

                      result,
                    );

                  /*
                   * Re-submitting the same correct
                   * assessment does not invalidate
                   * the completed investigation,
                   * guided analysis or simulation.
                   *
                   * Derived progress is cleared only
                   * when the validated answers or the
                   * calculated baseline result truly
                   * differ from the saved version.
                   */
                  const invalidateDerivedProgress =
                    answersChanged ||
                    resultChanged;

                  return {
                    ...record,

                    lastVisitedStage:
                      "results",

                    assessment: {
                      ...assessment,

                      completed: true,
                    },

                    baselineResult:
                      result,

                    resultsInvestigation:
                      invalidateDerivedProgress
                        ? null
                        : record
                            .resultsInvestigation,

                    guidedImprovement:
                      invalidateDerivedProgress
                        ? null
                        : record
                            .guidedImprovement,

                    simulationResult:
                      invalidateDerivedProgress
                        ? null
                        : record
                            .simulationResult,
                  };
                },
              );
            },
          );
        },
        [updateProgress],
      );

    const saveResultsInvestigationProgress =
      useCallback(
        (
          caseStudyId: string,

          investigation:
            CaseStudyResultsInvestigationProgress,
        ) => {
          updateProgress(
            (current) => {
              const existingRecord =
                getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                );

              const existingInvestigation =
                existingRecord
                  ?.resultsInvestigation ??
                null;

              const investigationChanged =
                existingInvestigation ===
                  null ||
                !areCaseStudyValuesEqual(
                  existingInvestigation,
                  investigation,
                );

              const hasDependentProgress =
                existingRecord !== null &&
                (
                  existingRecord
                    .guidedImprovement !==
                    null ||
                  existingRecord
                    .simulationResult !==
                    null
                );

              /*
               * Returning to an already completed
               * investigation is review, not a new
               * attempt. Local answer changes must
               * not overwrite the saved completion
               * or invalidate later stages.
               *
               * Practice Again creates a fresh record,
               * so normal persistence remains enabled
               * for the new attempt.
               */
              const protectCompletedInvestigation =
                existingInvestigation
                  ?.completed === true &&
                hasDependentProgress &&
                investigationChanged;

              if (
                protectCompletedInvestigation
              ) {
                if (
                  existingRecord
                    ?.lastVisitedStage ===
                    "results"
                ) {
                  return current;
                }

                return updateCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                  (record) => ({
                    ...record,

                    lastVisitedStage:
                      "results",
                  }),
                );
              }

              if (
                !investigationChanged &&
                existingRecord
                  ?.lastVisitedStage ===
                  "results"
              ) {
                return current;
              }

              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) => ({
                  ...record,

                  lastVisitedStage:
                    "results",

                  resultsInvestigation:
                    investigation,

                  guidedImprovement:
                    investigationChanged
                      ? null
                      : record
                          .guidedImprovement,

                  simulationResult:
                    investigationChanged
                      ? null
                      : record
                          .simulationResult,
                }),
              );
            },
          );
        },
        [updateProgress],
      );

    const saveGuidedImprovementProgress =
      useCallback(
        (
          caseStudyId: string,

          guidedImprovement:
            CaseStudyGuidedImprovementProgress,
        ) => {
          updateProgress(
            (current) => {
              const existingRecord =
                getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                );

              const existingGuidedImprovement =
                existingRecord
                  ?.guidedImprovement ??
                null;

              const guidedProgressChanged =
                existingGuidedImprovement ===
                  null ||
                !areCaseStudyValuesEqual(
                  existingGuidedImprovement,
                  guidedImprovement,
                );

              /*
               * A completed analysis with an existing
               * simulation belongs to the completed
               * attempt. Reopening the page must not
               * allow temporary UI state to invalidate
               * the saved simulation.
               */
              const protectCompletedAnalysis =
                existingGuidedImprovement
                  ?.completed === true &&
                existingRecord
                  ?.simulationResult !==
                  null &&
                guidedProgressChanged;

              if (
                protectCompletedAnalysis
              ) {
                if (
                  existingRecord
                    ?.lastVisitedStage ===
                    "guided-improvement-analysis"
                ) {
                  return current;
                }

                return updateCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                  (record) => ({
                    ...record,

                    lastVisitedStage:
                      "guided-improvement-analysis",
                  }),
                );
              }

              if (
                !guidedProgressChanged &&
                existingRecord
                  ?.lastVisitedStage ===
                  "guided-improvement-analysis"
              ) {
                return current;
              }

              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) => ({
                  ...record,

                  lastVisitedStage:
                    "guided-improvement-analysis",

                  guidedImprovement,

                  simulationResult:
                    guidedProgressChanged
                      ? null
                      : record
                          .simulationResult,
                }),
              );
            },
          );
        },
        [updateProgress],
      );

    const completeSimulation =
      useCallback(
        (
          caseStudyId: string,

          simulationResult:
            SimulationResult,
        ) => {
          updateProgress(
            (current) => {
              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) => {
                  const completedAt =
                    new Date()
                      .toISOString();

                  return {
                    ...record,

                    lastVisitedStage:
                      "simulation-results",

                    simulationResult,

                    /*
                     * Completion belongs to the learning
                     * journey, not to one practice attempt.
                     * Preserve the first completion date.
                     */
                    completion:
                      record.completion ??
                      {
                        completedAt,
                      },

                    /*
                     * Capture the permanent official result only on
                     * the first-ever completion. Practice attempts
                     * must never create or replace this snapshot.
                     */
                    officialResult:
                      record.officialResult ??
                      (
                        record.completion === null
                          ? {
                              simulationResult,
                            }
                          : null
                      ),
                  };
                },
              );
            },
          );
        },
        [updateProgress],
      );

    const startNewPracticeAttempt =
      useCallback(
        (
          caseStudyId: string,
        ) => {
          updateProgress(
            (current) => {
              const existingRecord =
                getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                );

              if (!existingRecord) {
                return current;
              }

              return updateCaseStudyProgressRecord(
                current,
                caseStudyId,
                (record) =>
                  createNewPracticeAttemptRecord(
                    record,
                  ),
              );
            },
          );
        },
        [updateProgress],
      );

    const resetCaseStudy =
      useCallback(
        (
          caseStudyId: string,
        ) => {
          updateProgress(
            (current) => {
              if (
                !getCaseStudyProgressRecord(
                  current,
                  caseStudyId,
                )
              ) {
                return current;
              }

              return removeCaseStudyProgressRecord(
                current,
                caseStudyId,
              );
            },
          );
        },
        [updateProgress],
      );

    const resetAllCaseStudyProgress =
      useCallback(() => {
        const emptyProgress =
          createEmptyCaseStudyProgressState();

        clearCaseStudyProgress();

        setProgress(
          emptyProgress,
        );
      }, []);

    return {
      progress,

      activeCaseStudy,
      activeCaseStudyStatus,
      activeCaseStudyNextAction,

      getProgressForCaseStudy,
      getStatusForCaseStudy,
      getNextActionForCaseStudy,

      activateCaseStudy,
      markStageVisited,

      saveSetupDraft,
      completeSetup,

      saveAssessmentProgress,
      completeAssessment,

      saveResultsInvestigationProgress,
      saveGuidedImprovementProgress,

      completeSimulation,

      startNewPracticeAttempt,

      /*
       * Hard reset methods remain available for
       * development and administrative actions.
       */
      resetCaseStudy,
      resetAllCaseStudyProgress,
    };
  };