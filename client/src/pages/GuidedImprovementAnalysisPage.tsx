// client/src/pages/GuidedImprovementAnalysisPage.tsx

import {
  AlertCircle,
  Home,
} from "lucide-react";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import PageState from "../components/ui/PageState";
import PrimaryButton from "../components/ui/PrimaryButton";

import {
  CASE_STUDY_ROUTES,
  ROUTES,
} from "../constants/routes";

import GuidedImprovementFlow from "../features/caseStudy/components/improvement/GuidedImprovementFlow";
import GuidedImprovementHero from "../features/caseStudy/components/improvement/GuidedImprovementHero";
import GuidedImprovementQuestionCard from "../features/caseStudy/components/improvement/GuidedImprovementQuestionCard";
import CaseStudyPageHeader from "../features/caseStudy/components/layout/CaseStudyPageHeader";
import RunSimulationCard from "../features/caseStudy/components/simulation/RunSimulationCard";
import SelectedSimulationScenarioCard from "../features/caseStudy/components/simulation/SelectedSimulationScenarioCard";

import {
  useCaseStudyGuidedImprovement,
} from "../features/caseStudy/hooks/useCaseStudyGuidedImprovement";

import {
  useCaseStudyProgress as useSharedCaseStudyProgress,
} from "../app/providers/CaseStudyProgressProvider";

const GuidedImprovementAnalysisPage =
  () => {
    const navigate =
      useNavigate();

    const {
      progress:
        sharedProgress,

      refreshProgress:
        refreshSharedCaseStudyProgress,
    } =
      useSharedCaseStudyProgress();

    const investigationCardRef =
      useRef<HTMLDivElement | null>(
        null,
      );

    const simulationPreparationRef =
      useRef<HTMLDivElement | null>(
        null,
      );

    const {
      data,

      selectedOptionValue,
      feedback,

      isLoading,
      isChecking,
      isAdvancing,

      loadError,
      actionError,
      simulationRunError,

      selectOption,
      checkAnswer,
      advance,
      runSimulation,
    } =
      useCaseStudyGuidedImprovement();

    /*
     * This page mounts when its route is opened,
     * therefore it no longer needs location.state
     * merely to react to a location key.
     */
    useLayoutEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, []);

    // -------------------------------------------------------------------------
    // Guided state derived from canonical hook data
    // -------------------------------------------------------------------------

    const questions =
      data?.questions ??
      [];

    const progress =
      data?.progress ??
      null;

    const currentIndex =
      progress?.currentIndex ??
      0;

    const currentQuestion =
      questions[
        currentIndex
      ] ?? null;

    const isCompleted =
      progress?.completed ===
      true;

    const isLastQuestion =
      currentQuestion !==
        null &&
      currentIndex ===
        questions.length - 1;

    const resolvedContext =
      data?.resolvedContext ??
      null;

    const hasSimulationScenario =
      data
        ?.hasSimulationScenario ??
      false;

    /*
     * Findings are already returned by the
     * dedicated Guided Improvement backend API.
     *
     * No frontend catalogue enrichment or
     * presentation compatibility type is needed.
     */
    const findings =
      data?.findings ??
      null;

    const shouldShowSimulationPreparation =
      isCompleted &&
      hasSimulationScenario &&
      findings !==
        null;

    const shouldShowNoCandidate =
      isCompleted &&
      !hasSimulationScenario;

    // -------------------------------------------------------------------------
    // Scrolling
    // -------------------------------------------------------------------------

    useEffect(() => {
      if (
        !shouldShowSimulationPreparation &&
        !shouldShowNoCandidate
      ) {
        return;
      }

      const animationFrame =
        window
          .requestAnimationFrame(
            () => {
              simulationPreparationRef
                .current
                ?.scrollIntoView({
                  block: "start",
                  behavior: "auto",
                });
            },
          );

      return () => {
        window
          .cancelAnimationFrame(
            animationFrame,
          );
      };
    }, [
      shouldShowSimulationPreparation,
      shouldShowNoCandidate,
    ]);

    const scrollToInvestigationCard =
      () => {
        investigationCardRef
          .current
          ?.scrollIntoView({
            block: "start",
            behavior: "auto",
          });
      };

    // -------------------------------------------------------------------------
    // Actions
    // -------------------------------------------------------------------------

    const handleAdvance =
      async () => {
        const response =
          await advance();

        if (!response) {
          return;
        }

        if (
          !response.progress
            .completed
        ) {
          scrollToInvestigationCard();
          return;
        }

        /*
         * Guided Improvement completion changes the
         * canonical Case Study journey to
         * "simulation-ready".
         *
         * Refresh the shared provider before the user
         * can leave this stage, so CaseStudyPage and
         * RouteGuard do not keep the older Results-era
         * progress snapshot.
         *
         * refreshProgress is a background refresh once
         * progress has hydrated, so it does not replace
         * this page with a global loading screen.
         */
        await refreshSharedCaseStudyProgress();
      };

    const handleRunSimulation =
      async () => {
        const success =
          await runSimulation();

        if (!success) {
          return;
        }

        /*
         * Running the Simulation completes the active
         * Case Study attempt and may also establish the
         * first permanent official attempt.
         *
         * Synchronize the shared backend progress before
         * navigating. This is essential on the first-ever
         * completion, where "simulation-results" was not
         * previously an allowed stage.
         */
        const nextProgress =
          await refreshSharedCaseStudyProgress();

        if (!nextProgress) {
          return;
        }

        /*
         * No route state.
         * No local mirror.
         *
         * SimulationPage loads the persisted result
         * from GET /case-study/simulation.
         */
        navigate(
          CASE_STUDY_ROUTES
            .simulationResults,
        );
      };

    const handleBackToCaseStudy =
      () => {
        navigate(
          ROUTES.caseStudy,
        );
      };

    const handleReturnDashboard =
      () => {
        navigate(
          ROUTES.dashboard,
        );
      };

    // -------------------------------------------------------------------------
    // Loading / error states
    // -------------------------------------------------------------------------

    if (isLoading) {
      return (
        <GuidedImprovementPageLayout>
          <PageState
            isLoading={true}
            error={null}
          >
            <div />
          </PageState>
        </GuidedImprovementPageLayout>
      );
    }

    if (
      loadError ||
      !data
    ) {
      return (
        <GuidedImprovementPageLayout>
          <GuidedImprovementPageErrorState
            title="Guided Improvement Analysis Unavailable"
            description={
              loadError ??
              "The Guided Improvement Analysis could not be loaded. Complete the preceding Case Study stages before opening this page."
            }
            primaryAction={{
              label:
                "Back to Results",

              onClick: () =>
                navigate(
                  CASE_STUDY_ROUTES
                    .results,
                ),
            }}
            secondaryAction={{
              label:
                "Back to Case Study",

              onClick:
                handleBackToCaseStudy,
            }}
          />
        </GuidedImprovementPageLayout>
      );
    }

    if (
      questions.length === 0
    ) {
      return (
        <GuidedImprovementPageLayout>
          <GuidedImprovementPageErrorState
            title="Guided Improvement Analysis Unavailable"
            description="The backend could not generate the improvement questions from the current assessment result. Return to the case study and complete the assessment again."
            primaryAction={{
              label:
                "Back to Case Study",

              onClick:
                handleBackToCaseStudy,
            }}
            secondaryAction={{
              label:
                "Return to Dashboard",

              onClick:
                handleReturnDashboard,
            }}
          />
        </GuidedImprovementPageLayout>
      );
    }

    return (
      <GuidedImprovementPageLayout>
        <CaseStudyPageHeader
          currentStage="guided-improvement-analysis"
          allowedStages={
            sharedProgress
              ?.allowedStages
          }
          nextStage={
            sharedProgress
              ?.nextStage
          }
        />

        <div className="mt-10 min-w-0 max-w-full space-y-6">
          <GuidedImprovementHero />

          {!shouldShowSimulationPreparation &&
          !shouldShowNoCandidate &&
          currentQuestion &&
          resolvedContext ? (
            <>
              <GuidedImprovementFlow />

              <div
                ref={
                  investigationCardRef
                }
                className="min-w-0 max-w-full scroll-mt-24"
              >
                <GuidedImprovementQuestionCard
                  questions={
                    questions
                  }
                  currentIndex={
                    currentIndex
                  }
                  currentQuestion={
                    currentQuestion
                  }
                  selectedOptionValue={
                    selectedOptionValue
                  }
                  feedback={
                    feedback
                  }
                  resolvedImpactCriterion={
                    resolvedContext
                      .highestImpactCriterion
                  }
                  resolvedTechnicalDomain={
                    resolvedContext
                      .highestWeightTechnicalDomain
                  }
                  isChecking={
                    isChecking
                  }
                  isAdvancing={
                    isAdvancing
                  }
                  hasSimulationScenario={
                    hasSimulationScenario
                  }
                  domainWeightingTable={
                    resolvedContext
                      .domainWeightingTable
                  }
                  serviceMaximumImpactScoresTable={
                    resolvedContext
                      .serviceMaximumImpactScoresTable
                  }
                  onSelectOption={
                    selectOption
                  }
                  onCheckAnswer={() => {
                    void checkAnswer();
                  }}
                  onNextQuestion={() => {
                    void handleAdvance();
                  }}
                  onContinueToSimulation={() => {
                    void handleAdvance();
                  }}
                  isLastQuestion={
                    isLastQuestion
                  }
                />

                {actionError ? (
                  <div
                    role="alert"
                    className="mt-4 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
                  >
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                    />

                    <p>
                      {actionError}
                    </p>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}

          {shouldShowSimulationPreparation &&
          findings ? (
            <div
              ref={
                simulationPreparationRef
              }
              className="scroll-mt-24 space-y-6"
            >
              <SelectedSimulationScenarioCard
                findings={
                  findings
                }
              />

              <RunSimulationCard
                onRunSimulation={() => {
                  void handleRunSimulation();
                }}
                /*
                 * A successful run immediately navigates
                 * to Simulation Results, so this page no
                 * longer needs a duplicated local
                 * "simulation completed" state.
                 */
                isSimulationRun={
                  false
                }
              />

              {simulationRunError ? (
                <SimulationRunErrorState />
              ) : null}
            </div>
          ) : null}

          {shouldShowNoCandidate ? (
            <div
              ref={
                simulationPreparationRef
              }
              className="scroll-mt-24"
            >
              <NoUpgradeCandidateState
                onReturnDashboard={
                  handleReturnDashboard
                }
              />
            </div>
          ) : null}
        </div>
      </GuidedImprovementPageLayout>
    );
  };

// -----------------------------------------------------------------------------
// No candidate
// -----------------------------------------------------------------------------

type NoUpgradeCandidateStateProps = {
  onReturnDashboard:
    () => void;
};

const NoUpgradeCandidateState = ({
  onReturnDashboard,
}: NoUpgradeCandidateStateProps) => {
  return (
    <section
      role="status"
      className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          size={20}
          className="mt-0.5 shrink-0 text-amber-700"
          aria-hidden="true"
        />

        <div className="min-w-0">
          <h2 className="text-xl font-extrabold leading-7 text-amber-900">
            No Upgrade Candidate Available
          </h2>

          <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
            The highest-weighted technical domain has no assessed
            service that affects the selected impact criterion and can
            still be upgraded.
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-amber-200 pt-5">
        <PrimaryButton
          onClick={
            onReturnDashboard
          }
          className="w-full sm:w-auto"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <Home
              size={18}
              strokeWidth={2.4}
              aria-hidden="true"
            />

            Return to Dashboard
          </span>
        </PrimaryButton>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// Simulation error
// -----------------------------------------------------------------------------

const SimulationRunErrorState =
  () => {
    return (
      <section
        role="alert"
        className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0 text-amber-700"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <h2 className="text-xl font-extrabold leading-7 text-amber-900">
              Simulation Could Not Be Completed
            </h2>

            <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
              The recommended service upgrade could not produce a valid
              simulation result. Review the selected scenario and run the
              simulation again.
            </p>
          </div>
        </div>
      </section>
    );
  };

// -----------------------------------------------------------------------------
// Error state
// -----------------------------------------------------------------------------

type PageAction = {
  label: string;
  onClick: () => void;
};

type GuidedImprovementPageErrorStateProps = {
  title: string;
  description: string;
  primaryAction: PageAction;
  secondaryAction?: PageAction;
};

const GuidedImprovementPageErrorState = ({
  title,
  description,
  primaryAction,
  secondaryAction,
}: GuidedImprovementPageErrorStateProps) => {
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
            <h1 className="text-2xl font-extrabold tracking-tight text-amber-900">
              {title}
            </h1>

            <p className="mt-3 text-sm font-semibold leading-6 text-amber-800">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-amber-200 pt-5 sm:flex-row">
          <PrimaryButton
            onClick={
              primaryAction
                .onClick
            }
            className="w-full sm:w-auto"
          >
            {
              primaryAction
                .label
            }
          </PrimaryButton>

          {secondaryAction ? (
            <button
              type="button"
              onClick={
                secondaryAction
                  .onClick
              }
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-amber-200 bg-white px-5 py-3 text-sm font-extrabold text-amber-900 shadow-sm transition-colors duration-200 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              {
                secondaryAction
                  .label
              }
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

type GuidedImprovementPageLayoutProps = {
  children: ReactNode;
};

const GuidedImprovementPageLayout = ({
  children,
}: GuidedImprovementPageLayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full min-w-0 max-w-full overflow-x-hidden bg-slate-50">
      <div className="mx-auto w-full min-w-0 max-w-7xl overflow-x-hidden px-5 py-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default GuidedImprovementAnalysisPage;