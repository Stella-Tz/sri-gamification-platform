// client/src/pages/DashboardPage.tsx

import {
  useNavigate,
} from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import PageState from "../components/ui/PageState";

import {
  CASE_STUDY_ROUTES,
} from "../constants/routes";

import {
  useCaseStudyProgress,
} from "../app/providers/CaseStudyProgressProvider";

import {
  useCourseProgress,
} from "../app/providers/CourseProgressProvider";

import AchievementsRow from "../features/dashboard/components/AchievementsRow";

import AssessmentProgressCard from "../features/dashboard/components/AssessmentProgressCard";

import CaseStudySummaryCard from "../features/dashboard/components/CaseStudySummaryCard";

import CourseProgressCard from "../features/dashboard/components/CourseProgressCard";

import LearningJourneyCard from "../features/dashboard/components/LearningJourneyCard";

import NextActionCard from "../features/dashboard/components/NextActionCard";

import {
  useDashboard,
} from "../features/dashboard/hooks/useDashboard";

const OFFICIAL_SIMULATION_RESULTS_PATH =
  `${CASE_STUDY_ROUTES.simulationResults}?source=official`;

const DashboardPage = () => {
  const navigate =
    useNavigate();
  
  const {
    progress:
      courseProgress,
  } =
    useCourseProgress();

  const {
    progress:
      caseStudyProgress,
    isLoading:
      isCaseStudyProgressLoading,
    error:
      caseStudyProgressError,
    startPracticeAgain,
    isStartingPracticeAgain,
  } =
    useCaseStudyProgress();

  const {
    dashboard,
    isLoading:
      isDashboardLoading,
    error:
      dashboardError,
  } =
    useDashboard(
      courseProgress,
      caseStudyProgress,
    );
  
  const isLoading =
    isDashboardLoading ||
    (
      caseStudyProgress === null &&
      isCaseStudyProgressLoading
    );
  
  const error =
    dashboardError ??
    caseStudyProgressError;

  const handlePrimaryAction =
    () => {
      if (!dashboard) {
        return;
      }

      navigate(
        dashboard
          .nextAction
          .path,
      );
    };

  const handlePracticeAgain =
    async () => {
      if (
        !dashboard ||
        isStartingPracticeAgain
      ) {
        return;
      }

      const nextProgress =
        await startPracticeAgain();

      if (!nextProgress) {
        return;
      }

      navigate(
        CASE_STUDY_ROUTES
          .setup,
      );
    };

  const handleViewAssessmentResults =
    () => {
      navigate(
        CASE_STUDY_ROUTES
          .results,
      );
    };

  const handleViewSimulationResults =
    () => {
      navigate(
        OFFICIAL_SIMULATION_RESULTS_PATH,
      );
    };

  return (
    <PageState
      isLoading={
        isLoading
      }
      error={error}
      isEmpty={!dashboard}
      loadingText="Loading dashboard..."
      errorText="Failed to load dashboard data."
    >
      {dashboard ? (
        <div className="min-w-0">
          <PageHeader
            title={`Welcome back, ${dashboard.user.firstName} 👋`}
          />

          <div className="mt-8 min-w-0">
            <AchievementsRow
              achievements={
                dashboard.achievements
              }
            />
          </div>

          {/*
           * Below xl: one column.
           *
           * xl: fluid two-column layout so that
           * smaller desktop screens do not squeeze
           * Learning Journey too much.
           *
           * 2xl: Next Action settles at 520px and
           * Learning Journey receives the rest.
           */}
          <div className="mt-8 grid min-w-0 grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] 2xl:grid-cols-[520px_minmax(0,1fr)]">
            <div className="min-w-0">
              <NextActionCard
                state={
                  dashboard
                    .nextAction
                    .state
                }
                currentUnit={
                  dashboard
                    .theoryProgress
                    .currentStepTitle
                }
                milestoneTitle={
                  dashboard
                    .nextAction
                    .milestone
                    ?.title ??
                  null
                }
                milestoneProgress={
                  dashboard
                    .nextAction
                    .milestone
                    ?.progressPercentage ??
                  null
                }
                caseStudyTitle={
                  dashboard
                    .caseStudy
                    .title
                }
                currentStep={
                  dashboard
                    .caseStudy
                    .currentStepLabel
                }
                completionAt={
                  dashboard
                    .caseStudy
                    .completionAt
                }
                onPrimaryAction={
                  handlePrimaryAction
                }
                onPracticeAgain={
                  dashboard
                    .nextAction
                    .state ===
                  "review-case-study"
                    ? () => {
                        void handlePracticeAgain();
                      }
                    : undefined
                }
              />
            </div>

            <div className="min-w-0">
              <LearningJourneyCard
                steps={
                  dashboard
                    .learningJourney
                }
              />
            </div>
          </div>

          {/*
           * Course Progress + official Case Study
           * summary.
           *
           * They stack below xl. On desktop the
           * Course Progress card remains narrower.
           */}
          <div className="mt-6 grid min-w-0 grid-cols-1 items-stretch gap-6 xl:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[380px_minmax(0,1fr)]">
            <div className="min-w-0">
              <CourseProgressCard
                completedSections={
                  dashboard
                    .theoryProgress
                    .completedSections
                }
                totalSections={
                  dashboard
                    .theoryProgress
                    .totalSections
                }
                progressPercentage={
                  dashboard
                    .courseProgress
                    .progressPercentage
                }
              />
            </div>

            <div className="min-w-0">
              <CaseStudySummaryCard
                summary={
                  dashboard
                    .caseStudySummary
                }
                onViewAssessmentResults={
                  dashboard
                    .caseStudySummary
                    .state ===
                  "baseline-result"
                    ? handleViewAssessmentResults
                    : undefined
                }
                onViewSimulationResults={
                  dashboard
                    .caseStudySummary
                    .state ===
                    "completed" &&
                  dashboard
                    .caseStudySummary
                    .simulationResult
                    ? handleViewSimulationResults
                    : undefined
                }
              />
            </div>
          </div>

          <div className="mt-6 min-w-0">
            <AssessmentProgressCard
              items={
                dashboard
                  .assessmentProgress
              }
            />
          </div>
        </div>
      ) : null}
    </PageState>
  );
};

export default DashboardPage;
