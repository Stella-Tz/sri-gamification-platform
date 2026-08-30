// client/src/features/dashboard/hooks/useDashboard.ts

import {
  useMemo,
} from "react";

import {
  useAuth,
} from "../../../app/providers/AuthProvider";

import {
  CASE_STUDY_ROUTES,
  ROUTES,
} from "../../../constants/routes";

import {
  getCourseStepPath,
} from "../../course/course.routes";

import {
  caseStudyMockData,
} from "../../caseStudy/data/caseStudyMockData";

import type {
  CaseStudyJourneyStatus,
  CaseStudyRouteStage,
} from "../../caseStudy/progress/caseStudyProgress.types";

import {
  useCaseStudyProgress,
} from "../../caseStudy/progress/useCaseStudyProgress";

import type {
  CaseStudySubmitResult,
} from "../../caseStudy/types/caseStudy.types";

import type {
  FinalTestAttempt,
} from "../../course/course.types";

import {
  caseStudyAchievement,
} from "../../course/data/courseAchievements";

import {
  courseDefinition,
} from "../../course/data/courseDefinition";

import {
  useCourseProgress,
} from "../../course/hooks/useCourseProgress";

import {
  buildCourseOverview,
} from "../../course/utils/buildCourseOverview";

import type {
  AssessmentProgressItem,
  CaseStudyDashboardStatus,
  CaseStudySummaryState,
  DashboardAchievement,
  DashboardBaselineResultSummary,
  DashboardNextAction,
  DashboardSimulationResultSummary,
  DashboardViewModel,
  JourneyStep,
} from "../dashboard.types";

const getLatestFinalTestAttempt = (
  attempts:
    readonly FinalTestAttempt[],
): FinalTestAttempt | null => {
  if (attempts.length === 0) {
    return null;
  }

  return attempts.reduce<
    FinalTestAttempt | null
  >(
    (
      latest,
      candidate,
    ) => {
      if (!latest) {
        return candidate;
      }

      return new Date(
        candidate.completedAt,
      ).getTime() >=
        new Date(
          latest.completedAt,
        ).getTime()
        ? candidate
        : latest;
    },
    null,
  );
};

const getCaseStudyStageLabel = ({
  journeyStatus,
  lastVisitedStage,
}: {
  journeyStatus:
    CaseStudyJourneyStatus;

  lastVisitedStage:
    | CaseStudyRouteStage
    | null;
}): string => {
  switch (journeyStatus) {
    case "not-started":
    case "setup-in-progress":
      return lastVisitedStage ===
        "assessment"
        ? "Service Assessment"
        : "Building Information";

    case "assessment-not-started":
    case "assessment-in-progress":
      return "Service Assessment";

    case "results-investigation-not-started":
    case "results-investigation-in-progress":
      return "Results Investigation";

    case "improvement-analysis-not-started":
    case "improvement-analysis-in-progress":
      return "Guided Improvement Analysis";

    case "simulation-ready":
      return "Simulation";

    case "completed":
      return "Simulation Results";

    default:
      return "Case Study";
  }
};

const createBaselineResultSummary = (
  result:
    | CaseStudySubmitResult
    | null,
): DashboardBaselineResultSummary | null => {
  if (!result) {
    return null;
  }

  return {
    totalScore:
      result.totalScore,

    sriClass:
      result.sriClass,

    keyFunctionalityScores:
      result.keyFunctionalityScores.map(
        (item) => ({
          label:
            item.keyFunctionality,

          score:
            item.score,
        }),
      ),
  };
};

export const useDashboard = () => {
  const {
    user,
  } = useAuth();

  const {
    progress:
      courseProgress,

    isLoading:
      isCourseProgressLoading,

    error:
      courseProgressError,
  } = useCourseProgress();

  const {
    getProgressForCaseStudy,
    getStatusForCaseStudy,
    getNextActionForCaseStudy,
  } = useCaseStudyProgress();

  const dashboard =
    useMemo<
      DashboardViewModel | null
    >(() => {
      if (!user) {
        return null;
      }

      const courseOverview =
        buildCourseOverview(
          courseDefinition,
          courseProgress,
        );

      /*
       * There is currently one practical
       * Case Study in the learning path.
       */
      const caseStudy =
        caseStudyMockData[0] ??
        null;

      const caseStudyRecord =
        caseStudy
          ? getProgressForCaseStudy(
              caseStudy.id,
            )
          : null;

      const caseStudyJourneyStatus =
        caseStudy
          ? getStatusForCaseStudy(
              caseStudy.id,
            )
          : "not-started";

      const caseStudyNextAction =
        caseStudy
          ? getNextActionForCaseStudy(
              caseStudy.id,
            )
          : null;

      const theoryStatus:
        DashboardViewModel[
          "theoryProgress"
        ]["status"] =
        courseOverview
          .completedSteps === 0
          ? "not-started"
          : courseOverview
                .isCaseStudyUnlocked
            ? "completed"
            : "in-progress";

      const hasCompletedCaseStudy =
        caseStudyRecord
          ?.completion != null;

      const currentAttemptCompleted =
        caseStudyJourneyStatus ===
          "completed" &&
        caseStudyRecord
          ?.simulationResult != null;

      const currentAttemptHasStarted =
        caseStudyRecord
          ?.lastVisitedStage != null ||
        caseStudyJourneyStatus !==
          "not-started";

      /*
       * This status belongs only to the active
       * attempt and therefore may become
       * practice-in-progress after completion.
       */
      let caseStudyStatus:
        CaseStudyDashboardStatus;

      if (
        !courseOverview
          .isCaseStudyUnlocked
      ) {
        caseStudyStatus =
          "locked";
      } else if (
        hasCompletedCaseStudy
      ) {
        caseStudyStatus =
          currentAttemptCompleted
            ? "completed"
            : "practice-in-progress";
      } else if (
        currentAttemptHasStarted
      ) {
        caseStudyStatus =
          "in-progress";
      } else {
        caseStudyStatus =
          "available";
      }

      const currentCaseStudyStepLabel =
        caseStudyStatus ===
          "in-progress" ||
        caseStudyStatus ===
          "practice-in-progress"
          ? getCaseStudyStageLabel({
              journeyStatus:
                caseStudyJourneyStatus,

              lastVisitedStage:
                caseStudyRecord
                  ?.lastVisitedStage ??
                null,
            })
          : null;

      /*
       * Next learning milestone.
       *
       * This is intentionally different from the
       * current Course Progress shown in the dedicated
       * CourseProgressCard. It represents where the
       * learner will be after completing the section
       * they are currently working through.
       */
      const currentCourseSection =
        courseOverview.currentSectionId
          ? courseOverview.sections.find(
              (section) =>
                section.id ===
                courseOverview
                  .currentSectionId,
            ) ?? null
          : null;

      const learningMilestone =
        currentCourseSection &&
        courseOverview.totalSteps > 0
          ? (() => {
              const stepsThroughCurrentSection =
                courseOverview.sections
                  .filter(
                    (section) =>
                      section.order <=
                      currentCourseSection.order,
                  )
                  .reduce(
                    (total, section) =>
                      total +
                      section.steps.length,
                    0,
                  );

              return {
                title:
                  currentCourseSection
                    .shortTitle,

                progressPercentage:
                  Math.round(
                    (
                      stepsThroughCurrentSection /
                      courseOverview.totalSteps
                    ) * 100,
                  ),
              };
            })()
          : null;

      const currentCourseStepPath =
        courseOverview.currentStep
          ? getCourseStepPath(
              courseOverview.currentStep,
            )
          : ROUTES.courses;

      let nextAction:
        DashboardNextAction;

      if (
        !courseOverview
          .isCaseStudyUnlocked
      ) {
        nextAction =
          courseOverview
            .completedSteps === 0
            ? {
                state:
                  "start-learning",

                path:
                  currentCourseStepPath,

                milestone:
                  learningMilestone,
              }
            : {
                state:
                  "continue-learning",

                path:
                  currentCourseStepPath,

                milestone:
                  learningMilestone,
              };
      }
      else {
        switch (
          caseStudyStatus
        ) {
          case "available":
            nextAction = {
              state:
                "start-case-study",

              path:
                ROUTES.caseStudy,

              milestone: null,
            };
            break;

          case "in-progress":
            nextAction = {
              state:
                "continue-case-study",

              path:
                caseStudyNextAction
                  ?.path ??
                CASE_STUDY_ROUTES
                  .setup,

              milestone: null,
            };
            break;

          case "practice-in-progress":
            nextAction = {
              state:
                "resume-practice",

              path:
                caseStudyNextAction
                  ?.path ??
                CASE_STUDY_ROUTES
                  .setup,

              milestone: null,
            };
            break;

          case "completed":
            nextAction = {
              state:
                "review-case-study",

              path:
                CASE_STUDY_ROUTES
                  .simulationResults,

              milestone: null,
            };
            break;

          case "locked":
          default:
            nextAction = {
              state:
                "continue-learning",

              path:
                ROUTES.courses,

              milestone:
                learningMilestone,
            };
            break;
        }
      }

      const theoryAchievements:
        DashboardAchievement[] =
        courseOverview.sections.map(
          (section) => ({
            ...section.achievement,

            status:
              section.achievementUnlocked
                ? "unlocked"
                : "locked",
          }),
        );

      const achievements:
        DashboardAchievement[] = [
          ...theoryAchievements,

          {
            ...caseStudyAchievement,

            status:
              hasCompletedCaseStudy
                ? "unlocked"
                : "locked",
          },
        ];

      /*
       * Practice Again never changes the completed
       * Case Study learning node back to current.
       */
      const learningJourney:
        JourneyStep[] = [
          ...courseOverview
            .sections.map(
              (section) => ({
                id:
                  section.id,

                type:
                  "theory-section" as const,

                title:
                  section.shortTitle,

                order:
                  section.order,

                status:
                  section.status,
              }),
            ),

          {
            id:
              caseStudy?.id ??
              "case-study",

            type:
              "case-study",

            title:
              "Practical Case Study",

            order:
              courseOverview
                .sections.length +
              1,

            status:
              !courseOverview
                .isCaseStudyUnlocked
                ? "locked"
                : hasCompletedCaseStudy
                  ? "completed"
                  : "current",
          },
        ];

      const assessmentProgress:
        AssessmentProgressItem[] =
        courseOverview.sections.map(
          (section) => {
            const sectionAttempts =
              courseProgress
                .finalTestAttempts
                .filter(
                  (attempt) =>
                    attempt
                      .sectionId ===
                    section.id,
                );

            const latestAttempt =
              getLatestFinalTestAttempt(
                sectionAttempts,
              );

            return {
              sectionId:
                section.id,

              sectionTitle:
                section.shortTitle,

              score:
                latestAttempt
                  ?.scorePercentage ??
                null,

              passed:
                latestAttempt
                  ?.passed ??
                null,

              attemptCount:
                sectionAttempts.length,
            };
          },
        );

      /*
       * Official Case Study summary.
       *
       * Once completion exists, active practice data is
       * intentionally ignored. The card remains bound to
       * the first official completion only.
       */
      const officialResult =
        caseStudyRecord
          ?.officialResult ??
        null;

      let caseStudySummaryState:
        CaseStudySummaryState;

      if (
        !courseOverview
          .isCaseStudyUnlocked
      ) {
        caseStudySummaryState =
          "locked";
      } else if (
        hasCompletedCaseStudy
      ) {
        caseStudySummaryState =
          "completed";
      } else if (
        caseStudyRecord
          ?.baselineResult
      ) {
        caseStudySummaryState =
          "baseline-result";
      } else if (
        currentAttemptHasStarted
      ) {
        caseStudySummaryState =
          "assessment-in-progress";
      } else {
        caseStudySummaryState =
          "available";
      }

      const baselineResultForSummary =
        hasCompletedCaseStudy
          ? officialResult
              ?.simulationResult
              .before ??
            null
          : caseStudyRecord
              ?.baselineResult ??
            null;

      const baselineResultSummary =
        createBaselineResultSummary(
          baselineResultForSummary,
        );

      const simulationResultSummary:
        DashboardSimulationResultSummary | null =
        officialResult
          ? {
              beforeScore:
                officialResult
                  .simulationResult
                  .before
                  .totalScore,

              beforeClass:
                officialResult
                  .simulationResult
                  .before
                  .sriClass,

              afterScore:
                officialResult
                  .simulationResult
                  .after
                  .totalScore,

              afterClass:
                officialResult
                  .simulationResult
                  .after
                  .sriClass,

              delta:
                officialResult
                  .simulationResult
                  .sriDelta,

              upgradedServiceCode:
                officialResult
                  .simulationResult
                  .upgradedService
                  .serviceCode,

              upgradedServiceTitle:
                officialResult
                  .simulationResult
                  .upgradedService
                  .shortTitle,
            }
          : null;

      const remainingCourseSteps =
        Math.max(
          0,
          courseOverview.totalSteps -
            courseOverview
              .completedSteps,
        );

      return {
        user,
        achievements,
        learningJourney,
        assessmentProgress,

        theoryProgress: {
          completedSections:
            courseOverview
              .completedSections,

          totalSections:
            courseOverview
              .totalSections,

          currentStepTitle:
            courseOverview
              .currentStep
              ?.title ??
            null,

          status:
            theoryStatus,
        },

        courseProgress: {
          completedSteps:
            courseOverview
              .completedSteps,

          totalSteps:
            courseOverview
              .totalSteps,

          progressPercentage:
            courseOverview
              .progressPercentage,
        },

        caseStudy: {
          id:
            caseStudy?.id ??
            null,

          title:
            caseStudy?.title ??
            null,

          status:
            caseStudyStatus,

          currentStepLabel:
            currentCaseStudyStepLabel,

          completionAt:
            caseStudyRecord
              ?.completion
              ?.completedAt ??
            null,
        },

        caseStudySummary: {
          state:
            caseStudySummaryState,

          caseStudyId:
            caseStudy?.id ??
            null,

          caseStudyTitle:
            caseStudy?.title ??
            null,

          completedCourseSteps:
            courseOverview
              .completedSteps,

          totalCourseSteps:
            courseOverview
              .totalSteps,

          remainingCourseSteps,

          courseProgressPercentage:
            courseOverview
              .progressPercentage,

          baselineResult:
            baselineResultSummary,

          simulationResult:
            simulationResultSummary,

          completionAt:
            caseStudyRecord
              ?.completion
              ?.completedAt ??
            null,

          officialSimulationResult:
            officialResult
              ?.simulationResult ??
            null,
        },

        nextAction,
      };
    }, [
      courseProgress,
      getNextActionForCaseStudy,
      getProgressForCaseStudy,
      getStatusForCaseStudy,
      user,
    ]);

  return {
    dashboard,

    isLoading:
      isCourseProgressLoading,

    error:
      courseProgressError,
  };
};
