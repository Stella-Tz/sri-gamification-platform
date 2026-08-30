// client/src/pages/GuidedImprovementAnalysisPage.tsx

import {
  AlertCircle,
  Home,
} from "lucide-react";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

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

import { useGuidedImprovementAnalysis } from "../features/caseStudy/hooks/useGuidedImprovementAnalysis";
import { useSimulation } from "../features/caseStudy/hooks/useSimulation";

import { buildGuidedImprovementAnalysis } from "../features/caseStudy/utils/guidedImprovementAnalysis.utils";

import type {
  BuildingType,
  CaseStudyDetails,
  CaseStudySubmitResult,
  ClimateZone,
  DomainPresence,
  OfficialAssessmentMethod,
  ServiceAnswer,
  SriService,
  TechnicalDomainName,
} from "../features/caseStudy/types/caseStudy.types";

import {
  caseStudyMockData,
} from "../features/caseStudy/data/caseStudyMockData";

import {
  getSriServicesForAssessmentMethod,
} from "../features/caseStudy/data/sriServiceCatalogue";

import {
  useCaseStudyProgress,
} from "../features/caseStudy/progress/useCaseStudyProgress";

import type {
  CaseStudyGuidedImprovementProgress,
} from "../features/caseStudy/progress/caseStudyProgress.types";

type GuidedImprovementLocationState = {
  result?: CaseStudySubmitResult;
  caseStudy?: CaseStudyDetails;

  answers?: Record<
    string,
    ServiceAnswer
  >;

  assessmentMethod?:
    OfficialAssessmentMethod;

  serviceApplicability?: Record<
    string,
    boolean
  >;

  domainPresence?: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  buildingType?: BuildingType;
  climateZone?: ClimateZone;

  /*
   * Fully resolved Catalogue A or Catalogue B.
   */
  services?: SriService[];
};

type GuidedImprovementAnalysisData =
  ReturnType<
    typeof buildGuidedImprovementAnalysis
  >;

type GuidedImprovementAnalysisContentProps = {
  caseStudy:
    CaseStudyDetails;

  baselineResult:
    CaseStudySubmitResult;

  answers: Record<
    string,
    ServiceAnswer
  >;

  assessmentMethod:
    OfficialAssessmentMethod;

  serviceApplicability:
    Record<string, boolean>;

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  buildingType:
    BuildingType;

  climateZone:
    ClimateZone;

  services:
    SriService[];

  guidedAnalysis:
    GuidedImprovementAnalysisData;

  initialProgress:
    | CaseStudyGuidedImprovementProgress
    | null;
};

const createServiceApplicability = ({
  services,
  caseStudy,
}: {
  services: SriService[];
  caseStudy: CaseStudyDetails;
}): Record<string, boolean> => {
  const applicableServiceIds =
    new Set(
      caseStudy
        .selectedServices
        .map(
          (selectedService) =>
            selectedService
              .serviceId,
        ),
    );

  return services.reduce<
    Record<string, boolean>
  >(
    (
      accumulator,
      service,
    ) => {
      accumulator[
        service.id
      ] =
        applicableServiceIds
          .has(
            service.id,
          );

      return accumulator;
    },
    {},
  );
};

const GuidedImprovementAnalysisPage =
  () => {
    const location =
      useLocation();

    const navigate =
      useNavigate();

    const {
      activeCaseStudy,
      getProgressForCaseStudy,
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
        | GuidedImprovementLocationState
        | null;

    const activeCaseStudyDefinition =
      activeCaseStudy
        ? caseStudyMockData.find(
            (candidate) =>
              candidate.id ===
              activeCaseStudy
                .caseStudyId,
          ) ?? null
        : null;

    const caseStudy =
      state?.caseStudy ??
      activeCaseStudyDefinition ??
      caseStudyMockData[0] ??
      null;

    const savedProgress =
      caseStudy
        ? getProgressForCaseStudy(
            caseStudy.id,
          )
        : null;

    const savedSetup =
      savedProgress
        ?.setup ?? null;

    const savedSetupAnswers =
      savedSetup?.completed ===
      true
        ? savedSetup.answers
        : null;

    const baselineResult =
      state?.result ??
      savedProgress
        ?.baselineResult ??
      null;

    const answers =
      state?.answers ??
      savedProgress
        ?.assessment
        ?.answers ??
      null;

    const assessmentMethod =
      state
        ?.assessmentMethod ??
      savedSetupAnswers
        ?.methodologySelection
        .assessmentMethod ??
      null;

    const domainPresence =
      state?.domainPresence ??
      savedSetupAnswers
        ?.domainPresence ??
      null;

    const buildingType =
      state?.buildingType ??
      savedSetupAnswers
        ?.buildingInformation
        .buildingType ??
      null;

    const climateZone =
      state?.climateZone ??
      savedSetupAnswers
        ?.buildingInformation
        .climateZone ??
      null;

    const services =
      useMemo<
        SriService[] | null
      >(
        () => {
          if (
            state?.services
          ) {
            return [
              ...state.services,
            ];
          }

          if (
            !assessmentMethod
          ) {
            return null;
          }

          return getSriServicesForAssessmentMethod(
            assessmentMethod,
          );
        },
        [
          assessmentMethod,
          state?.services,
        ],
      );

    const serviceApplicability =
      useMemo<
        Record<
          string,
          boolean
        > | null
      >(
        () => {
          if (
            state
              ?.serviceApplicability
          ) {
            return state
              .serviceApplicability;
          }

          if (
            !services ||
            !caseStudy
          ) {
            return null;
          }

          return createServiceApplicability(
            {
              services,
              caseStudy,
            },
          );
        },
        [
          caseStudy,
          services,
          state
            ?.serviceApplicability,
        ],
      );

    const guidedAnalysis =
      useMemo<
        GuidedImprovementAnalysisData | null
      >(() => {
        if (
          !baselineResult ||
          !assessmentMethod ||
          !buildingType ||
          !climateZone ||
          !services
        ) {
          return null;
        }

        return buildGuidedImprovementAnalysis(
          {
            assessmentMethod,
            buildingType,
            climateZone,
            services,

            servicesByDomain:
              baselineResult
                .servicesByDomain,
          },
        );
      }, [
        baselineResult,
        assessmentMethod,
        buildingType,
        climateZone,
        services,
      ]);

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

    if (!caseStudy) {
      return (
        <GuidedImprovementPageLayout>
          <GuidedImprovementPageErrorState
            title="Case Study Not Found"
            description="The case study required for this improvement analysis is unavailable. Return to the case-study library and select an available case study."
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

    /*
     * The empty string values that can exist in
     * SetupAnswers are also rejected here. This
     * narrows the values to their official types.
     */
    if (
      !baselineResult ||
      !answers ||
      !assessmentMethod ||
      !serviceApplicability ||
      !domainPresence ||
      !buildingType ||
      !climateZone ||
      !services
    ) {
      return (
        <GuidedImprovementPageLayout>
          <GuidedImprovementPageErrorState
            title="Assessment Data Unavailable"
            description="The complete assessment data required for the Guided Improvement Analysis are unavailable. Open the case study from the case-study library and complete the assessment again."
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

    if (
      !guidedAnalysis ||
      guidedAnalysis
        .questions.length === 0
    ) {
      return (
        <GuidedImprovementPageLayout>
          <GuidedImprovementPageErrorState
            title="Guided Improvement Analysis Unavailable"
            description="The improvement questions could not be generated from the calculated assessment result. Return to the case-study library and complete the assessment again."
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
      <GuidedImprovementAnalysisContent
        caseStudy={
          caseStudy
        }
        baselineResult={
          baselineResult
        }
        answers={
          answers
        }
        assessmentMethod={
          assessmentMethod
        }
        serviceApplicability={
          serviceApplicability
        }
        domainPresence={
          domainPresence
        }
        buildingType={
          buildingType
        }
        climateZone={
          climateZone
        }
        services={
          services
        }
        guidedAnalysis={
          guidedAnalysis
        }
        initialProgress={
          savedProgress
            ?.guidedImprovement ??
          null
        }
      />
    );
  };

const GuidedImprovementAnalysisContent = ({
  caseStudy,
  baselineResult,
  answers,
  assessmentMethod,
  serviceApplicability,
  domainPresence,
  buildingType,
  climateZone,
  services,
  guidedAnalysis,
  initialProgress,
}: GuidedImprovementAnalysisContentProps) => {
  const navigate = useNavigate();

  const {
    saveGuidedImprovementProgress,
    completeSimulation,
  } = useCaseStudyProgress();

  const investigationCardRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const simulationPreparationRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const [
    simulationRunError,
    setSimulationRunError,
  ] = useState(false);

  const guidedAnalysisState =
    useGuidedImprovementAnalysis({
      questions:
        guidedAnalysis.questions,

      initialProgress,
    });

  const {
    hasRunSimulation,
    runSimulation,
  } = useSimulation({
    services,
    answers,
    assessmentMethod,
    serviceApplicability,
    domainPresence,
    buildingType,
    climateZone,

    currentResult:
      baselineResult,

    findings:
      guidedAnalysis.findings,
  });

  useEffect(() => {
    saveGuidedImprovementProgress(
      caseStudy.id,
      guidedAnalysisState.progress,
    );
  }, [
    caseStudy.id,
    guidedAnalysisState.progress,
    saveGuidedImprovementProgress,
  ]);

  const shouldShowSimulationPreparation =
    guidedAnalysisState.isCompleted &&
    guidedAnalysis.findings !== null;

  const shouldShowNoCandidate =
    guidedAnalysisState.isCompleted &&
    guidedAnalysis.findings === null;

  /*
   * The simulation scenario replaces the final
   * investigation question. Scroll after React has
   * rendered the new content, not before it exists.
   */
  useEffect(() => {
    if (
      !shouldShowSimulationPreparation &&
      !shouldShowNoCandidate
    ) {
      return;
    }

    const animationFrame =
      window.requestAnimationFrame(
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
      window.cancelAnimationFrame(
        animationFrame,
      );
    };
  }, [
    shouldShowSimulationPreparation,
    shouldShowNoCandidate,
  ]);

  const scrollToInvestigationCard = () => {
    investigationCardRef
      .current
      ?.scrollIntoView({
        block: "start",
        behavior: "auto",
      });
  };

  const handleNextQuestion = () => {
    scrollToInvestigationCard();

    guidedAnalysisState
      .goToNextQuestion();
  };

  const handleShowSimulationScenario = () => {
    setSimulationRunError(
      false,
    );

    guidedAnalysisState
      .goToNextQuestion();
  };

  const handleRunSimulation = () => {
    setSimulationRunError(
      false,
    );

    try {
      const simulationResult =
        runSimulation();

      /*
       * A null result means that the simulation
       * could not produce a valid recalculation.
       * Do not fail silently and do not navigate.
       */
      if (!simulationResult) {
        setSimulationRunError(
          true,
        );

        return;
      }

      completeSimulation(
        caseStudy.id,
        simulationResult,
      );

      navigate(
        CASE_STUDY_ROUTES
          .simulationResults,
        {
          state: {
            simulationResult,
            caseStudy,
          },
        },
      );
    } catch {
      setSimulationRunError(
        true,
      );
    }
  };

  const handleReturnDashboard = () => {
    navigate(ROUTES.dashboard);
  };

  return (
    <GuidedImprovementPageLayout>
      <CaseStudyPageHeader
        currentStage="guided-improvement-analysis"
      />

      <div className="mt-10 min-w-0 max-w-full space-y-6">
        <GuidedImprovementHero />

        {!shouldShowSimulationPreparation &&
        !shouldShowNoCandidate &&
        guidedAnalysisState.currentQuestion ? (
          <>
            <GuidedImprovementFlow />

            <div
              ref={investigationCardRef}
              className="min-w-0 max-w-full scroll-mt-24"
            >
              <GuidedImprovementQuestionCard
                questions={
                  guidedAnalysis
                    .questions
                }
                currentIndex={
                  guidedAnalysisState
                    .currentIndex
                }
                currentQuestion={
                  guidedAnalysisState
                    .currentQuestion
                }
                selectedOptionValue={
                  guidedAnalysisState
                    .selectedOptionValue
                }
                feedback={
                  guidedAnalysisState
                    .feedback
                }
                assessmentMethod={
                  assessmentMethod
                }
                hasSimulationScenario={
                  guidedAnalysis
                    .findings !== null
                }
                buildingType={
                  buildingType
                }
                climateZone={
                  climateZone
                }
                services={
                  services
                }
                servicesByDomain={
                  baselineResult
                    .servicesByDomain
                }
                onSelectOption={
                  guidedAnalysisState
                    .selectOption
                }
                onCheckAnswer={
                  guidedAnalysisState
                    .checkAnswer
                }
                onNextQuestion={
                  handleNextQuestion
                }
                onContinueToSimulation={
                  handleShowSimulationScenario
                }
                isLastQuestion={
                  guidedAnalysisState
                    .isLastQuestion
                }
              />
            </div>
          </>
        ) : null}

        {shouldShowSimulationPreparation &&
        guidedAnalysis.findings ? (
          <div
            ref={
              simulationPreparationRef
            }
            className="scroll-mt-24 space-y-6"
          >
            <SelectedSimulationScenarioCard
              findings={
                guidedAnalysis
                  .findings
              }
            />

            <RunSimulationCard
              onRunSimulation={
                handleRunSimulation
              }
              isSimulationRun={
                hasRunSimulation &&
                !simulationRunError
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
              onReturnDashboard={handleReturnDashboard}
            />
          </div>
        ) : null}
      </div>
    </GuidedImprovementPageLayout>
  );
};

type NoUpgradeCandidateStateProps = {
  onReturnDashboard: () => void;
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
          onClick={onReturnDashboard}
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

const SimulationRunErrorState = () => {
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
              primaryAction.onClick
            }
            className="w-full sm:w-auto"
          >
            {primaryAction.label}
          </PrimaryButton>

          {secondaryAction ? (
            <button
              type="button"
              onClick={
                secondaryAction.onClick
              }
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-amber-200 bg-white px-5 py-3 text-sm font-extrabold text-amber-900 shadow-sm transition-colors duration-200 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              {
                secondaryAction.label
              }
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
};

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
