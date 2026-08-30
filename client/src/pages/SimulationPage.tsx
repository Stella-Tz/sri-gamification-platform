import {
  useLayoutEffect,
  type ReactNode,
} from "react";

import {
  AlertCircle,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import PrimaryButton from "../components/ui/PrimaryButton";

import {
  CASE_STUDY_ROUTES,
  ROUTES,
} from "../constants/routes";

import CaseStudyPageHeader from "../features/caseStudy/components/layout/CaseStudyPageHeader";

import SimulationCompletionCard from "../features/caseStudy/components/simulation/SimulationCompletionCard";
import SimulationResultsSection from "../features/caseStudy/components/simulation/SimulationResultsSection";

import {
  useCaseStudyProgress,
} from "../features/caseStudy/progress/useCaseStudyProgress";

import type {
  SimulationResult,
} from "../features/caseStudy/types/caseStudy.types";

type SimulationLocationState = {
  simulationResult?:
    SimulationResult;
};

const SimulationPage = () => {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const {
    activeCaseStudy,
  } = useCaseStudyProgress();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.key]);

  const state =
    location.state as
      | SimulationLocationState
      | null;

  /*
   * Normal navigation uses route state.
   *
   * During the active attempt, refresh/direct
   * navigation restores the current simulation.
   *
   * After Practice Again clears the active attempt,
   * the permanent first official Case Study result
   * remains available as the final fallback.
   */
  const simulationResult =
    state?.simulationResult ??
    activeCaseStudy
      ?.simulationResult ??
    activeCaseStudy
      ?.officialResult
      ?.simulationResult ??
    null;

  const handleReturnDashboard =
    () => {
      navigate(
        ROUTES.dashboard,
      );
    };

  const handleBackToCaseStudy =
    () => {
      navigate(
        ROUTES.caseStudy,
      );
    };

  const handleBackToImprovement =
    () => {
      navigate(
        CASE_STUDY_ROUTES
          .guidedImprovementAnalysis,
      );
    };

  if (!simulationResult) {
    return (
      <SimulationPageLayout>
        <SimulationPageErrorState
          onBackToImprovement={
            handleBackToImprovement
          }
          onBackToCaseStudy={
            handleBackToCaseStudy
          }
          onReturnDashboard={
            handleReturnDashboard
          }
        />
      </SimulationPageLayout>
    );
  }

  return (
    <SimulationPageLayout>
      <CaseStudyPageHeader
        currentStage="simulation-results"
      />

      <div className="mt-10 min-w-0 max-w-full space-y-6">
        <SimulationResultsSection
          result={
            simulationResult
          }
        />

        <SimulationCompletionCard
          onReturnDashboard={
            handleReturnDashboard
          }
        />
      </div>
    </SimulationPageLayout>
  );
};

type SimulationPageLayoutProps = {
  children: ReactNode;
};

const SimulationPageLayout = ({
  children,
}: SimulationPageLayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full min-w-0 max-w-full overflow-x-hidden bg-slate-50">
      <div className="mx-auto w-full min-w-0 max-w-7xl overflow-x-hidden px-5 py-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

type SimulationPageErrorStateProps = {
  onBackToImprovement:
    () => void;

  onBackToCaseStudy:
    () => void;

  onReturnDashboard:
    () => void;
};

const SimulationPageErrorState = ({
  onBackToImprovement,
  onBackToCaseStudy,
  onReturnDashboard,
}: SimulationPageErrorStateProps) => {
  return (
    <div className="flex min-h-[calc(100vh-104px)] items-center justify-center py-10">
      <section
        role="alert"
        className="w-full max-w-3xl rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8"
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            size={22}
            className="mt-0.5 shrink-0 text-amber-700"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <h1 className="break-words text-2xl font-extrabold tracking-tight text-amber-900">
              Simulation Result Unavailable
            </h1>

            <p className="mt-3 text-sm font-semibold leading-6 text-amber-800">
              No completed simulation result is available. Open the Guided Improvement Analysis and run the recommended service upgrade again.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-amber-200 pt-5 sm:flex-row sm:flex-wrap">
          <PrimaryButton
            onClick={
              onBackToImprovement
            }
            className="w-full sm:w-auto"
          >
            Back to Improvement Analysis
          </PrimaryButton>

          <button
            type="button"
            onClick={
              onBackToCaseStudy
            }
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-amber-200 bg-white px-5 py-3 text-sm font-extrabold text-amber-900 shadow-sm transition-colors duration-200 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:w-auto"
          >
            Back to Case Study
          </button>

          <button
            type="button"
            onClick={
              onReturnDashboard
            }
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-amber-200 bg-white px-5 py-3 text-sm font-extrabold text-amber-900 shadow-sm transition-colors duration-200 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:w-auto"
          >
            Return to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

export default SimulationPage;
