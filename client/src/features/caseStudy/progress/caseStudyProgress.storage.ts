// client/src/features/caseStudy/progress/caseStudyProgress.storage.ts

import type {
  CaseStudyAssessmentProgress,
  CaseStudyGuidedImprovementProgress,
  CaseStudyInteractionFeedback,
  CaseStudyCompletion,
  CaseStudyOfficialResult,
  CaseStudyProgressRecord,
  CaseStudyProgressState,
  CaseStudyResultsInvestigationAnswer,
  CaseStudyResultsInvestigationProgress,
  CaseStudyRouteStage,
  CaseStudySetupProgress,
} from "./caseStudyProgress.types";

import {
  createEmptyCaseStudyProgressState,
} from "./caseStudyProgress.utils";

const CURRENT_STORAGE_KEY =
  "sri-case-study-progress-v4";

const LEGACY_STORAGE_KEYS =
  [
    {
      key:
        "sri-case-study-progress-v3",

      version: 3,
    },

    {
      key:
        "sri-case-study-progress-v2",

      version: 2,
    },

    {
      key:
        "sri-case-study-progress-v1",

      version: 1,
    },
  ] as const;

const CURRENT_VERSION =
  4 as const;

const PROGRESS_CHANGE_EVENT =
  "sri-case-study-progress-change";

type PersistedCaseStudyProgress = {
  version:
    typeof CURRENT_VERSION;

  progress:
    CaseStudyProgressState;
};

const isBrowser = (): boolean => {
  return (
    typeof window !==
    "undefined"
  );
};

const isRecord = (
  value: unknown,
): value is Record<
  string,
  unknown
> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

const isStringArray = (
  value: unknown,
): value is string[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item ===
        "string",
    )
  );
};

const isNonNegativeInteger = (
  value: unknown,
): value is number => {
  return (
    typeof value ===
      "number" &&
    Number.isInteger(value) &&
    value >= 0
  );
};

const isRouteStage = (
  value: unknown,
): value is CaseStudyRouteStage => {
  return (
    value === "setup" ||
    value === "assessment" ||
    value === "results" ||
    value ===
      "guided-improvement-analysis" ||
    value ===
      "simulation-results"
  );
};

const isFeedback = (
  value: unknown,
): value is CaseStudyInteractionFeedback => {
  return (
    value === null ||
    value === "correct" ||
    value === "wrong" ||
    value === "empty"
  );
};

const isSetupProgress = (
  value: unknown,
): value is CaseStudySetupProgress => {
  return (
    isRecord(value) &&
    isRecord(value.answers) &&
    typeof value.completed ===
      "boolean"
  );
};

const isAssessmentProgress = (
  value: unknown,
): value is CaseStudyAssessmentProgress => {
  return (
    isRecord(value) &&
    isRecord(value.answers) &&
    isStringArray(
      value.validatedServiceIds,
    ) &&
    (
      typeof value
        .selectedServiceId ===
        "string" ||
      value.selectedServiceId ===
        null
    ) &&
    typeof value.completed ===
      "boolean"
  );
};

const isSubmitResult = (
  value: unknown,
): boolean => {
  return (
    isRecord(value) &&
    typeof value.totalScore ===
      "number" &&
    typeof value.sriClass ===
      "string" &&
    Array.isArray(
      value.domainScores,
    ) &&
    Array.isArray(
      value.impactScores,
    ) &&
    Array.isArray(
      value.keyFunctionalityScores,
    ) &&
    isRecord(
      value.servicesByDomain,
    )
  );
};

const isSimulationResult = (
  value: unknown,
): boolean => {
  return (
    isRecord(value) &&
    isSubmitResult(
      value.before,
    ) &&
    isSubmitResult(
      value.after,
    ) &&
    isRecord(
      value.upgradedService,
    ) &&
    typeof value.sriDelta ===
      "number"
  );
};

const isResultsInvestigationAnswer =
  (
    value: unknown,
  ): value is CaseStudyResultsInvestigationAnswer => {
    return (
      isRecord(value) &&
      typeof value.questionId ===
        "string" &&
      isStringArray(
        value.selectedAnswers,
      ) &&
      isFeedback(
        value.feedback,
      ) &&
      isNonNegativeInteger(
        value.attempts,
      )
    );
  };

const normalizeResultsInvestigation =
  (
    value: unknown,
  ): CaseStudyResultsInvestigationProgress | null => {
    if (!isRecord(value)) {
      return null;
    }

    if (
      !isNonNegativeInteger(
        value.currentIndex,
      ) ||
      typeof value.completed !==
        "boolean"
    ) {
      return null;
    }

    const answers =
      Array.isArray(
        value.answers,
      )
        ? value.answers.filter(
            isResultsInvestigationAnswer,
          )
        : [];

    return {
      currentIndex:
        value.currentIndex,

      answers,

      completed:
        value.completed,
    };
  };

const isGuidedImprovementAnswer =
  (
    value: unknown,
  ): boolean => {
    return (
      isRecord(value) &&
      typeof value.questionId ===
        "string" &&
      typeof value
        .selectedOptionValue ===
        "string" &&
      typeof value.isCorrect ===
        "boolean" &&
      isNonNegativeInteger(
        value.attempts,
      )
    );
  };

const normalizeGuidedImprovement =
  (
    value: unknown,
  ): CaseStudyGuidedImprovementProgress | null => {
    if (!isRecord(value)) {
      return null;
    }

    if (
      !isNonNegativeInteger(
        value.currentIndex,
      ) ||
      !Array.isArray(
        value.answers,
      ) ||
      typeof value.completed !==
        "boolean"
    ) {
      return null;
    }

    return {
      currentIndex:
        value.currentIndex,

      selectedOptionValue:
        typeof value
          .selectedOptionValue ===
          "string"
          ? value
              .selectedOptionValue
          : "",

      feedback:
        isFeedback(
          value.feedback,
        )
          ? value.feedback
          : null,

      answers:
        value.answers.filter(
          isGuidedImprovementAnswer,
        ) as CaseStudyGuidedImprovementProgress["answers"],

      completed:
        value.completed,
    };
  };

const normalizeCompletion =
  (
    value: unknown,
  ): CaseStudyCompletion | null => {
    if (
      !isRecord(value) ||
      typeof value.completedAt !==
        "string"
    ) {
      return null;
    }

    return {
      completedAt:
        value.completedAt,
    };
  };

const normalizeLegacyCompletion =
  (
    value: unknown,
  ): CaseStudyCompletion | null => {
    if (
      !isRecord(value) ||
      typeof value.completedAt !==
        "string"
    ) {
      return null;
    }

    return {
      completedAt:
        value.completedAt,
    };
  };

const normalizeOfficialResult =
  (
    value: unknown,
  ): CaseStudyOfficialResult | null => {
    if (
      !isRecord(value) ||
      !isSimulationResult(
        value.simulationResult,
      )
    ) {
      return null;
    }

    return {
      simulationResult:
        value.simulationResult as
          CaseStudyOfficialResult["simulationResult"],
    };
  };

const getLegacySimulationResult =
  (
    value: unknown,
  ): CaseStudyOfficialResult["simulationResult"] | null => {
    if (
      !isRecord(value) ||
      !isSimulationResult(
        value.simulationResult,
      )
    ) {
      return null;
    }

    return value.simulationResult as
      CaseStudyOfficialResult["simulationResult"];
  };

const inferLastVisitedStage = (
  record: {
    setup:
      CaseStudyProgressRecord["setup"];

    assessment:
      CaseStudyProgressRecord["assessment"];

    baselineResult:
      CaseStudyProgressRecord["baselineResult"];

    resultsInvestigation:
      CaseStudyProgressRecord["resultsInvestigation"];

    guidedImprovement:
      CaseStudyProgressRecord["guidedImprovement"];

    simulationResult:
      CaseStudyProgressRecord["simulationResult"];
  },
): CaseStudyRouteStage | null => {
  if (record.simulationResult) {
    return "simulation-results";
  }

  if (record.guidedImprovement) {
    return "guided-improvement-analysis";
  }

  if (
    record.baselineResult ||
    record.resultsInvestigation
  ) {
    return "results";
  }

  if (record.assessment) {
    return "assessment";
  }

  if (record.setup) {
    return "setup";
  }

  return null;
};

const normalizeProgressRecord = (
  value: unknown,
  caseStudyId: string,
): CaseStudyProgressRecord | null => {
  if (
    !isRecord(value) ||
    (
      typeof value.caseStudyId ===
        "string" &&
      value.caseStudyId !==
        caseStudyId
    )
  ) {
    return null;
  }

  const setup =
    value.setup === null
      ? null
      : isSetupProgress(
            value.setup,
          )
        ? value.setup
        : null;

  const assessment =
    value.assessment === null
      ? null
      : isAssessmentProgress(
            value.assessment,
          )
        ? value.assessment
        : null;

  const baselineResult =
    isSubmitResult(
      value.baselineResult,
    )
      ? (
          value.baselineResult as
            CaseStudyProgressRecord["baselineResult"]
        )
      : null;

  const resultsInvestigation =
    normalizeResultsInvestigation(
      value.resultsInvestigation,
    );

  const guidedImprovement =
    normalizeGuidedImprovement(
      value.guidedImprovement,
    );

  const simulationResult =
    isSimulationResult(
      value.simulationResult,
    )
      ? (
          value.simulationResult as
            CaseStudyProgressRecord["simulationResult"]
        )
      : null;

  const inferredLastVisited =
    inferLastVisitedStage({
      setup,
      assessment,
      baselineResult,
      resultsInvestigation,
      guidedImprovement,
      simulationResult,
    });

  const legacySimulationResult =
    getLegacySimulationResult(
      value.latestCompletedAttempt,
    );

  const officialResult =
    normalizeOfficialResult(
      value.officialResult,
    ) ??
    (
      legacySimulationResult
        ? {
            simulationResult:
              legacySimulationResult,
          }
        : null
    ) ??
    (
      simulationResult
        ? {
            simulationResult,
          }
        : null
    );

  const completion =
    normalizeCompletion(
      value.completion,
    ) ??
    normalizeLegacyCompletion(
      value.latestCompletedAttempt,
    ) ??
    (
      officialResult ||
      simulationResult
        ? {
            completedAt:
              typeof value.updatedAt ===
                "string"
                ? value.updatedAt
                : new Date()
                    .toISOString(),
          }
        : null
    );

  return {
    caseStudyId,

    lastVisitedStage:
      isRouteStage(
        value.lastVisitedStage,
      )
        ? value.lastVisitedStage
        : inferredLastVisited,

    setup,
    assessment,
    baselineResult,
    resultsInvestigation,
    guidedImprovement,
    simulationResult,
    completion,
    officialResult,

    updatedAt:
      typeof value.updatedAt ===
        "string"
        ? value.updatedAt
        : new Date()
            .toISOString(),
  };
};

const normalizeProgressState = (
  value: unknown,
): CaseStudyProgressState => {
  if (!isRecord(value)) {
    return createEmptyCaseStudyProgressState();
  }

  const rawRecords =
    isRecord(
      value.recordsByCaseStudyId,
    )
      ? value.recordsByCaseStudyId
      : {};

  const recordsByCaseStudyId =
    Object.entries(
      rawRecords,
    ).reduce<
      CaseStudyProgressState["recordsByCaseStudyId"]
    >(
      (
        accumulator,
        [caseStudyId, record],
      ) => {
        const normalized =
          normalizeProgressRecord(
            record,
            caseStudyId,
          );

        if (normalized) {
          accumulator[
            caseStudyId
          ] = normalized;
        }

        return accumulator;
      },
      {},
    );

  const requestedActiveId =
    typeof value
      .activeCaseStudyId ===
      "string"
      ? value.activeCaseStudyId
      : null;

  const activeCaseStudyId =
    requestedActiveId &&
    recordsByCaseStudyId[
      requestedActiveId
    ]
      ? requestedActiveId
      : null;

  return {
    activeCaseStudyId,
    recordsByCaseStudyId,
  };
};

const parseStoredValue = (
  storedValue: string | null,
): unknown => {
  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(
      storedValue,
    ) as unknown;
  } catch {
    return null;
  }
};

const loadCurrentProgress =
  (): CaseStudyProgressState | null => {
    if (!isBrowser()) {
      return null;
    }

    const parsed =
      parseStoredValue(
        window.localStorage.getItem(
          CURRENT_STORAGE_KEY,
        ),
      );

    if (
      !isRecord(parsed) ||
      parsed.version !==
        CURRENT_VERSION
    ) {
      return null;
    }

    return normalizeProgressState(
      parsed.progress,
    );
  };

const migrateLegacyProgress =
  (): CaseStudyProgressState | null => {
    if (!isBrowser()) {
      return null;
    }

    for (
      const legacyStorage of
      LEGACY_STORAGE_KEYS
    ) {
      const parsed =
        parseStoredValue(
          window.localStorage.getItem(
            legacyStorage.key,
          ),
        );

      if (
        !isRecord(parsed) ||
        parsed.version !==
          legacyStorage.version
      ) {
        continue;
      }

      const migrated =
        normalizeProgressState(
          parsed.progress,
        );

      const persisted:
        PersistedCaseStudyProgress = {
          version:
            CURRENT_VERSION,

          progress:
            migrated,
        };

      window.localStorage.setItem(
        CURRENT_STORAGE_KEY,
        JSON.stringify(
          persisted,
        ),
      );

      LEGACY_STORAGE_KEYS.forEach(
        ({ key }) => {
          window.localStorage.removeItem(
            key,
          );
        },
      );

      return migrated;
    }

    return null;
  };

const notifyProgressChanged =
  (): void => {
    if (!isBrowser()) {
      return;
    }

    window.dispatchEvent(
      new Event(
        PROGRESS_CHANGE_EVENT,
      ),
    );
  };

export const loadCaseStudyProgress =
  (): CaseStudyProgressState => {
    return (
      loadCurrentProgress() ??
      migrateLegacyProgress() ??
      createEmptyCaseStudyProgressState()
    );
  };

export const saveCaseStudyProgress =
  (
    progress:
      CaseStudyProgressState,
  ): void => {
    if (!isBrowser()) {
      return;
    }

    const persisted:
      PersistedCaseStudyProgress = {
        version:
          CURRENT_VERSION,

        progress,
      };

    window.localStorage.setItem(
      CURRENT_STORAGE_KEY,
      JSON.stringify(
        persisted,
      ),
    );

    notifyProgressChanged();
  };

export const clearCaseStudyProgress =
  (): void => {
    if (!isBrowser()) {
      return;
    }

    window.localStorage.removeItem(
      CURRENT_STORAGE_KEY,
    );

    LEGACY_STORAGE_KEYS.forEach(
      ({ key }) => {
        window.localStorage.removeItem(
          key,
        );
      },
    );

    notifyProgressChanged();
  };

export const subscribeToCaseStudyProgress =
  (
    listener: () => void,
  ): (() => void) => {
    if (!isBrowser()) {
      return () => undefined;
    }

    const handleLocalChange =
      () => {
        listener();
      };

    const handleStorageChange =
      (
        event: StorageEvent,
      ) => {
        if (
          event.key ===
            CURRENT_STORAGE_KEY ||
          LEGACY_STORAGE_KEYS.some(
            ({ key }) =>
              event.key === key,
          )
        ) {
          listener();
        }
      };

    window.addEventListener(
      PROGRESS_CHANGE_EVENT,
      handleLocalChange,
    );

    window.addEventListener(
      "storage",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        PROGRESS_CHANGE_EVENT,
        handleLocalChange,
      );

      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
    };
  };