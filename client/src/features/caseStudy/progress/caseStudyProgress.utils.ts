// client/src/features/caseStudy/progress/caseStudyProgress.utils.ts

import {
  CASE_STUDY_ROUTES,
} from "../../../constants/routes";

import type {
  CaseStudyJourneyStatus,
  CaseStudyNextAction,
  CaseStudyProgressRecord,
  CaseStudyProgressState,
} from "./caseStudyProgress.types";

export const createEmptyCaseStudyProgressState =
  (): CaseStudyProgressState => {
    return {
      activeCaseStudyId: null,

      recordsByCaseStudyId:
        {},
    };
  };

export const createEmptyCaseStudyProgressRecord =
  (
    caseStudyId: string,
  ): CaseStudyProgressRecord => {
    return {
      caseStudyId,

      lastVisitedStage:
        null,

      setup: null,
      assessment: null,

      baselineResult: null,

      resultsInvestigation:
        null,

      guidedImprovement:
        null,

      simulationResult:
        null,

      completion:
        null,

      officialResult:
        null,

      updatedAt:
        new Date().toISOString(),
    };
  };

export const createNewPracticeAttemptRecord =
  (
    current:
      CaseStudyProgressRecord,
  ): CaseStudyProgressRecord => {
    return {
      ...createEmptyCaseStudyProgressRecord(
        current.caseStudyId,
      ),

      lastVisitedStage:
        "setup",

      /*
       * Practice Again clears only the active
       * attempt. The learning completion remains
       * permanently recorded.
       */
      completion:
        current.completion,

      /*
       * The first official result remains available
       * while the active practice attempt is reset.
       */
      officialResult:
        current.officialResult,

      updatedAt:
        new Date().toISOString(),
    };
  };

export const getCaseStudyProgressRecord =
  (
    progress:
      CaseStudyProgressState,

    caseStudyId: string,
  ): CaseStudyProgressRecord | null => {
    return (
      progress.recordsByCaseStudyId[
        caseStudyId
      ] ?? null
    );
  };

export const getActiveCaseStudyProgressRecord =
  (
    progress:
      CaseStudyProgressState,
  ): CaseStudyProgressRecord | null => {
    if (
      !progress.activeCaseStudyId
    ) {
      return null;
    }

    return getCaseStudyProgressRecord(
      progress,
      progress.activeCaseStudyId,
    );
  };

export const updateCaseStudyProgressRecord =
  (
    progress:
      CaseStudyProgressState,

    caseStudyId: string,

    updateRecord: (
      current:
        CaseStudyProgressRecord,
    ) => CaseStudyProgressRecord,
  ): CaseStudyProgressState => {
    const currentRecord =
      getCaseStudyProgressRecord(
        progress,
        caseStudyId,
      ) ??
      createEmptyCaseStudyProgressRecord(
        caseStudyId,
      );

    const updatedRecord =
      updateRecord(
        currentRecord,
      );

    const nextRecord:
      CaseStudyProgressRecord = {
        ...updatedRecord,

        caseStudyId,

        updatedAt:
          new Date().toISOString(),
      };

    return {
      activeCaseStudyId:
        caseStudyId,

      recordsByCaseStudyId: {
        ...progress
          .recordsByCaseStudyId,

        [caseStudyId]:
          nextRecord,
      },
    };
  };

export const removeCaseStudyProgressRecord =
  (
    progress:
      CaseStudyProgressState,

    caseStudyId: string,
  ): CaseStudyProgressState => {
    const nextRecords = {
      ...progress
        .recordsByCaseStudyId,
    };

    delete nextRecords[
      caseStudyId
    ];

    return {
      activeCaseStudyId:
        progress.activeCaseStudyId ===
        caseStudyId
          ? null
          : progress
              .activeCaseStudyId,

      recordsByCaseStudyId:
        nextRecords,
    };
  };

export const hasCaseStudyDerivedProgress =
  (
    record:
      | CaseStudyProgressRecord
      | null,
  ): boolean => {
    if (!record) {
      return false;
    }

    return (
      record.assessment !==
        null ||
      record.baselineResult !==
        null ||
      record.resultsInvestigation !==
        null ||
      record.guidedImprovement !==
        null ||
      record.simulationResult !==
        null
    );
  };

export const hasAssessmentDerivedResults =
  (
    record:
      | CaseStudyProgressRecord
      | null,
  ): boolean => {
    if (!record) {
      return false;
    }

    return (
      record.baselineResult !==
        null ||
      record.resultsInvestigation !==
        null ||
      record.guidedImprovement !==
        null ||
      record.simulationResult !==
        null
    );
  };

export const getCaseStudyProgressStage =
  (
    record:
      | CaseStudyProgressRecord
      | null,
  ): CaseStudyJourneyStatus => {
    if (
      !record ||
      !record.setup
    ) {
      return "not-started";
    }

    if (
      !record.setup.completed
    ) {
      return "setup-in-progress";
    }

    if (!record.assessment) {
      return "assessment-not-started";
    }

    if (
      !record.assessment
        .completed ||
      !record.baselineResult
    ) {
      return "assessment-in-progress";
    }

    if (
      !record.resultsInvestigation
    ) {
      return "results-investigation-not-started";
    }

    if (
      !record
        .resultsInvestigation
        .completed
    ) {
      return "results-investigation-in-progress";
    }

    if (
      !record.guidedImprovement
    ) {
      return "improvement-analysis-not-started";
    }

    if (
      !record
        .guidedImprovement
        .completed
    ) {
      return "improvement-analysis-in-progress";
    }

    if (
      !record.simulationResult
    ) {
      return "simulation-ready";
    }

    return "completed";
  };

export const getCaseStudyNextAction =
  (
    record:
      | CaseStudyProgressRecord
      | null,
  ): CaseStudyNextAction => {
    const status =
      getCaseStudyProgressStage(
        record,
      );

    const isPracticeAttempt =
      record?.completion != null &&
      status !== "completed";

    switch (status) {
      case "not-started":
        return {
          status,
          stage: "setup",

          label:
            isPracticeAttempt
              ? "Start Practice"
              : "Start Case Study",

          path:
            CASE_STUDY_ROUTES.setup,
        };

      case "setup-in-progress":
        return {
          status,
          stage: "setup",

          label:
            isPracticeAttempt
              ? "Resume Practice"
              : "Continue Setup",

          path:
            CASE_STUDY_ROUTES.setup,
        };

      case "assessment-not-started":
        return {
          status,
          stage:
            "assessment",

          label:
            isPracticeAttempt
              ? "Resume Practice"
              : "Start Assessment",

          path:
            CASE_STUDY_ROUTES.assessment,
        };

      case "assessment-in-progress":
        return {
          status,
          stage:
            "assessment",

          label:
            isPracticeAttempt
              ? "Resume Practice"
              : "Continue Assessment",

          path:
            CASE_STUDY_ROUTES.assessment,
        };

      case "results-investigation-not-started":
        return {
          status,
          stage:
            "results",

          label:
            isPracticeAttempt
              ? "Resume Practice"
              : "Start Results Investigation",

          path:
            CASE_STUDY_ROUTES.results,
        };

      case "results-investigation-in-progress":
        return {
          status,
          stage:
            "results",

          label:
            isPracticeAttempt
              ? "Resume Practice"
              : "Continue Results Investigation",

          path:
            CASE_STUDY_ROUTES.results,
        };

      case "improvement-analysis-not-started":
        return {
          status,

          stage:
            "guided-improvement-analysis",

          label:
            isPracticeAttempt
              ? "Resume Practice"
              : "Start Guided Improvement Analysis",

          path:
            CASE_STUDY_ROUTES
              .guidedImprovementAnalysis,
        };

      case "improvement-analysis-in-progress":
        return {
          status,

          stage:
            "guided-improvement-analysis",

          label:
            isPracticeAttempt
              ? "Resume Practice"
              : "Continue Guided Improvement Analysis",

          path:
            CASE_STUDY_ROUTES
              .guidedImprovementAnalysis,
        };

      case "simulation-ready":
        return {
          status,

          stage:
            "guided-improvement-analysis",

          label:
            isPracticeAttempt
              ? "Resume Practice"
              : "Continue to Simulation",

          path:
            CASE_STUDY_ROUTES
              .guidedImprovementAnalysis,
        };

      case "completed":
        return {
          status,

          stage:
            "simulation-results",

          label:
            "View Simulation Results",

          path:
            CASE_STUDY_ROUTES
              .simulationResults,
        };
    }
  };

export const areCaseStudyValuesEqual =
  <TValue>(
    first: TValue,
    second: TValue,
  ): boolean => {
    return (
      JSON.stringify(first) ===
      JSON.stringify(second)
    );
  };
