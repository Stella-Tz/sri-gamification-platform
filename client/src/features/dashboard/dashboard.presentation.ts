// client/src/features/dashboard/dashboard.presentation.ts

import {
  CASE_STUDY_ROUTES,
  ROUTES,
} from "../../constants/routes";

import {
  getCaseStudyStagePath,
} from "../caseStudy/progress/caseStudyProgress.presentation";

import type {
  CaseStudyJourneyStatus,
  CaseStudyRouteStage,
} from "../caseStudy/progress/caseStudyProgress.types";

import {
  getCourseStepPath,
} from "../course/course.routes";

import type {
  FinalTestAttempt,
} from "../course/course.types";

import {
  caseStudyAchievement,
} from "../course/data/courseAchievements";

import {
  courseDefinition,
} from "../course/data/courseDefinition";

import {
  buildCourseOverview,
} from "../course/utils/buildCourseOverview";

import type {
  AssessmentProgressItem,
  CaseStudyDashboardStatus,
  CaseStudySummaryState,
  DashboardAchievement,
  DashboardBaselineResultSummary,
  DashboardDataDto,
  DashboardNextAction,
  DashboardSimulationResultSummary,
  DashboardViewModel,
  JourneyStep,
} from "./dashboard.types";

const OFFICIAL_SIMULATION_RESULTS_PATH =
  `${CASE_STUDY_ROUTES.simulationResults}?source=official`;

const getLatestFinalTestAttempt = (
  attempts:
    readonly FinalTestAttempt[],
): FinalTestAttempt | null => {
  if (
    attempts.length ===
    0
  ) {
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
  switch (
    journeyStatus
  ) {
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
    DashboardDataDto[
      "caseStudy"
    ]["activeBaselineResult"],
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
      result
        .keyFunctionalityScores
        .map(
          (item) => ({
            label:
              item.keyFunctionality,

            score:
              item.score,
          }),
        ),
  };
};


export const buildDashboardViewModel = (
  data:
    DashboardDataDto,
): DashboardViewModel => {

    const {
          user,
          courseProgress,
          caseStudy,
        } = data;

        /*
         * buildCourseOverview is now only a
         * presentation adapter:
         *
         * backend step/section statuses
         * +
         * frontend titles/icons/routes.
         */
        const courseOverview =
          buildCourseOverview(
            courseDefinition,
            courseProgress,
          );

        const caseStudyProgress =
          caseStudy.progress;

        const caseStudyJourneyStatus =
          caseStudyProgress
            .journeyStatus;

        const hasCompletedCaseStudy =
          caseStudyProgress
            .officialAttemptId !==
          null;

        const currentAttemptCompleted =
          caseStudyProgress
            .journeyStatus ===
            "completed" &&
          caseStudyProgress
            .hasSimulationResult;

        const currentAttemptHasStarted =
          caseStudyProgress
            .activeAttemptId !==
            null &&
          caseStudyJourneyStatus !==
            "not-started";

        const theoryStatus:
          DashboardViewModel[
            "theoryProgress"
          ]["status"] =
          courseProgress
            .completedSteps ===
            0
            ? "not-started"
            : courseProgress
                .isCourseCompleted
              ? "completed"
              : "in-progress";

        /*
         * This status belongs to the current
         * active Case Study attempt.
         *
         * Permanent official completion is
         * represented separately by
         * hasCompletedCaseStudy.
         */
        let caseStudyStatus:
          CaseStudyDashboardStatus;

        if (
          !courseProgress
            .isCaseStudyUnlocked
        ) {
          caseStudyStatus =
            "locked";
        } else if (
          hasCompletedCaseStudy
        ) {
          caseStudyStatus =
            caseStudyProgress
              .isPracticeAttempt &&
            !currentAttemptCompleted
              ? "practice-in-progress"
              : "completed";
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
                  caseStudyProgress
                    .lastVisitedStage,
              })
            : null;

        /*
         * Next learning milestone is purely
         * Dashboard presentation.
         *
         * It describes where the Course
         * percentage will be after the current
         * section is completed.
         */
        const currentCourseSection =
          courseOverview
            .currentSectionId
            ? courseOverview
                .sections
                .find(
                  (section) =>
                    section.id ===
                    courseOverview
                      .currentSectionId,
                ) ??
              null
            : null;

        const learningMilestone =
          currentCourseSection &&
          courseOverview
            .totalSteps >
            0
            ? (() => {
                const stepsThroughCurrentSection =
                  courseOverview
                    .sections
                    .filter(
                      (section) =>
                        section.order <=
                        currentCourseSection
                          .order,
                    )
                    .reduce(
                      (
                        total,
                        section,
                      ) =>
                        total +
                        section.steps
                          .length,
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
                        courseOverview
                          .totalSteps
                      ) *
                        100,
                    ),
                };
              })()
            : null;

        const currentCourseStepPath =
          courseOverview
            .currentStep
            ? getCourseStepPath(
                courseOverview
                  .currentStep,
              )
            : ROUTES.courses;

        const currentCaseStudyPath =
          getCaseStudyStagePath(
            caseStudyProgress
              .nextStage,
          );

        let nextAction:
          DashboardNextAction;

        if (
          !courseProgress
            .isCaseStudyUnlocked
        ) {
          nextAction =
            courseProgress
              .completedSteps ===
              0
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
        } else {
          switch (
            caseStudyStatus
          ) {
            case "available":
              nextAction = {
                state:
                  "start-case-study",

                path:
                  ROUTES.caseStudy,

                milestone:
                  null,
              };
              break;

            case "in-progress":
              nextAction = {
                state:
                  "continue-case-study",

                path:
                  currentCaseStudyPath,

                milestone:
                  null,
              };
              break;

            case "practice-in-progress":
              nextAction = {
                state:
                  "resume-practice",

                path:
                  currentCaseStudyPath,

                milestone:
                  null,
              };
              break;

            case "completed":
              nextAction = {
                state:
                  "review-case-study",

                path:
                  OFFICIAL_SIMULATION_RESULTS_PATH,

                milestone:
                  null,
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
          courseOverview
            .sections
            .map(
              (section) => ({
                ...section
                  .achievement,

                status:
                  section
                    .achievementUnlocked
                    ? "unlocked"
                    : "locked",
              }),
            );

        const achievements:
          DashboardAchievement[] =
          [
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
         * Practice Again never changes the
         * permanent completed Case Study node
         * back to current.
         */
        const learningJourney:
          JourneyStep[] = [
            ...courseOverview
              .sections
              .map(
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
                caseStudy.id ??
                "case-study",

              type:
                "case-study",

              title:
                caseStudy.title ??
                "Practical Case Study",

              order:
                courseOverview
                  .sections
                  .length +
                1,

              status:
                !courseProgress
                  .isCaseStudyUnlocked
                  ? "locked"
                  : hasCompletedCaseStudy
                    ? "completed"
                    : "current",
            },
          ];

        const assessmentProgress:
          AssessmentProgressItem[] =
          courseOverview
            .sections
            .map(
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
                    sectionAttempts
                      .length,
                };
              },
            );

        /*
         * Permanent official Case Study summary.
         *
         * Practice Again may change active progress,
         * but never replaces the official Simulation.
         */
        let caseStudySummaryState:
          CaseStudySummaryState;

        if (
          !courseProgress
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
          caseStudy
            .activeBaselineResult
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
            ? caseStudy
                .officialSimulationResult
                ?.before ??
              null
            : caseStudy
                .activeBaselineResult;

        const baselineResultSummary =
          createBaselineResultSummary(
            baselineResultForSummary,
          );

        const officialSimulationResult =
          caseStudy
            .officialSimulationResult;

        const simulationResultSummary:
          DashboardSimulationResultSummary | null =
          officialSimulationResult
            ? {
                beforeScore:
                  officialSimulationResult
                    .before
                    .totalScore,

                beforeClass:
                  officialSimulationResult
                    .before
                    .sriClass,

                afterScore:
                  officialSimulationResult
                    .after
                    .totalScore,

                afterClass:
                  officialSimulationResult
                    .after
                    .sriClass,

                delta:
                  officialSimulationResult
                    .sriDelta,

                upgradedServiceCode:
                  officialSimulationResult
                    .upgradedService
                    .serviceCode,

                /*
                 * shortTitle was duplicate
                 * presentation data. The backend
                 * canonical serviceName is used
                 * directly.
                 */
                upgradedServiceTitle:
                  officialSimulationResult
                    .upgradedService
                    .serviceName,
              }
            : null;

        const remainingCourseSteps =
          Math.max(
            0,

            courseProgress
              .totalSteps -
              courseProgress
                .completedSteps,
          );

        return {
          user,

          achievements,

          learningJourney,

          assessmentProgress,

          theoryProgress: {
            completedSections:
              courseProgress
                .completedSections,

            totalSections:
              courseProgress
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
              courseProgress
                .completedSteps,

            totalSteps:
              courseProgress
                .totalSteps,

            progressPercentage:
              courseProgress
                .progressPercentage,
          },

          caseStudy: {
            id:
              caseStudy.id,

            title:
              caseStudy.title,

            status:
              caseStudyStatus,

            currentStepLabel:
              currentCaseStudyStepLabel,

            /*
             * This is the durable first official
             * completion timestamp. Practice Again
             * does not replace it.
             */
            completionAt:
              caseStudyProgress
                .officialCompletedAt,
          },

          caseStudySummary: {
            state:
              caseStudySummaryState,

            caseStudyId:
              caseStudy.id,

            caseStudyTitle:
              caseStudy.title,

            completedCourseSteps:
              courseProgress
                .completedSteps,

            totalCourseSteps:
              courseProgress
                .totalSteps,

            remainingCourseSteps,

            courseProgressPercentage:
              courseProgress
                .progressPercentage,

            baselineResult:
              baselineResultSummary,

            simulationResult:
              simulationResultSummary,

            completionAt:
              caseStudyProgress
                .officialCompletedAt,
          },

          nextAction,
        };
};