// client/src/pages/CaseStudyResultsPage.tsx

import {
  useLayoutEffect,
  useMemo,
  useRef,
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

import ApplicableServicesByDomainCard from "../features/caseStudy/components/results/ApplicableServicesByDomainCard";
import DomainPresenceResultsCard from "../features/caseStudy/components/results/DomainPresenceResultsCard";
import GuidedInvestigationCard from "../features/caseStudy/components/results/GuidedInvestigationCard";
import ResultsDomainScoresCard from "../features/caseStudy/components/results/ResultsDomainScoresCard";
import ResultsHeroCard from "../features/caseStudy/components/results/ResultsHeroCard";
import ResultsImpactScoresCard from "../features/caseStudy/components/results/ResultsImpactScoresCard";
import ResultsScoreMatrix from "../features/caseStudy/components/results/ResultsScoreMatrix";

import {
  caseStudyMockData,
} from "../features/caseStudy/data/caseStudyMockData";

import {
  getSriServicesForAssessmentMethod,
} from "../features/caseStudy/data/sriServiceCatalogue";

import {
  useCaseStudyProgress,
} from "../features/caseStudy/progress/useCaseStudyProgress";

import officeBuildingImage from "../assets/caseStudy/office-building3.png";

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

import type {
  CaseStudyResultsInvestigationProgress,
} from "../features/caseStudy/progress/caseStudyProgress.types";

type ResultsLocationState = {
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

  services?: SriService[];
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
      caseStudy.selectedServices.map(
        (selectedService) =>
          selectedService.serviceId,
      ),
    );

  return services.reduce<
    Record<string, boolean>
  >(
    (
      accumulator,
      service,
    ) => {
      accumulator[service.id] =
        applicableServiceIds.has(
          service.id,
        );

      return accumulator;
    },
    {},
  );
};

const CaseStudyResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const guidedInvestigationRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const {
    activeCaseStudy,
    getProgressForCaseStudy,
    saveResultsInvestigationProgress,
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
      | ResultsLocationState
      | null;

  const activeCaseStudyDefinition =
    activeCaseStudy
      ? caseStudyMockData.find(
          (candidate) =>
            candidate.id ===
            activeCaseStudy.caseStudyId,
        ) ?? null
      : null;

  /*
   * Route state is preferred during normal
   * forward navigation.
   *
   * Persisted progress is used after refresh
   * or direct navigation from the Dashboard.
   */
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
    savedProgress?.setup ??
    null;

  const savedSetupAnswers =
    savedSetup?.completed === true
      ? savedSetup.answers
      : null;

  const result =
    state?.result ??
    savedProgress?.baselineResult ??
    null;

  const answers =
    state?.answers ??
    savedProgress
      ?.assessment
      ?.answers ??
    null;

  const assessmentMethod =
    state?.assessmentMethod ??
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
    useMemo<SriService[] | null>(
      () => {
        if (state?.services) {
          return state.services;
        }

        if (!assessmentMethod) {
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
      Record<string, boolean> | null
    >(
      () => {
        if (
          state?.serviceApplicability
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
        state?.serviceApplicability,
      ],
    );

  const savedInvestigation =
    savedProgress
      ?.resultsInvestigation ??
    null;

  const scrollToGuidedInvestigation =
    () => {
      guidedInvestigationRef.current
        ?.scrollIntoView({
          block: "start",
          behavior: "auto",
        });
    };

  const handleInvestigationProgressChange =
    (
      investigation:
        CaseStudyResultsInvestigationProgress,
    ) => {
      if (!caseStudy) {
        return;
      }

      saveResultsInvestigationProgress(
        caseStudy.id,
        investigation,
      );
    };

  if (!caseStudy) {
    return (
      <ResultsPageLayout>
        <ResultsErrorState
          title="Case Study Not Found"
          description="The requested case study could not be found. Return to the case-study library and select an available case study."
          primaryAction={{
            label:
              "Back to Case Study",

            onClick: () =>
              navigate(
                ROUTES.caseStudy,
              ),
          }}
        />
      </ResultsPageLayout>
    );
  }

  if (!result) {
    return (
      <ResultsPageLayout>
        <ResultsErrorState
          title="Assessment Result Unavailable"
          description="No calculated assessment result is available. Complete the service assessment before opening the results page."
          primaryAction={{
            label:
              "Back to Assessment",

            onClick: () =>
              navigate(
                CASE_STUDY_ROUTES.assessment,
              ),
          }}
          secondaryAction={{
            label:
              "Back to Case Study",

            onClick: () =>
              navigate(
                ROUTES.caseStudy,
              ),
          }}
        />
      </ResultsPageLayout>
    );
  }

  const guidedImprovementNavigationState =
    (() => {
      /*
      * Values restored from SetupAnswers may
      * contain an empty string before the setup
      * has been completed.
      *
      * These checks also narrow the corresponding
      * TypeScript unions to their official types.
      */
      if (
        answers === null ||
        !assessmentMethod ||
        serviceApplicability === null ||
        domainPresence === null ||
        !buildingType ||
        !climateZone ||
        services === null
      ) {
        return undefined;
      }

      return {
        result,
        caseStudy,

        answers,

        assessmentMethod,

        serviceApplicability,

        domainPresence,

        buildingType,

        climateZone,

        services,
      };
    })();

  return (
    <ResultsPageLayout>
      <div className="mt-10 min-w-0 max-w-full space-y-6">
        <ResultsPageHeader />

        <ResultsHeroCard
          result={result}
        />

        <div className="grid min-w-0 max-w-full items-stretch gap-6 lg:grid-cols-[390px_minmax(0,1fr)]">
          <DomainPresenceResultsCard
            presentDomains={
              result.presentDomains
            }
            absentMandatoryDomains={
              result
                .absentMandatoryDomains
            }
            absentNotMandatoryDomains={
              result
                .absentNotMandatoryDomains
            }
          />

          <ApplicableServicesByDomainCard
            servicesByDomain={
              result.servicesByDomain
            }
          />
        </div>

        <ResultsImpactScoresCard
          result={result}
        />

        <ResultsDomainScoresCard
          result={result}
        />

        <ResultsScoreMatrix
          result={result}
        />

        <div
          ref={guidedInvestigationRef}
          className="min-w-0 max-w-full scroll-mt-24"
        >
          <GuidedInvestigationCard
            questions={
              result
                .guidedInvestigationQuestions
            }
            findings={
              result
                .guidedInvestigationFindings
            }
            navigationState={
              guidedImprovementNavigationState
            } 
            initialProgress={
              savedInvestigation
            }
            onProgressChange={
              handleInvestigationProgressChange
            }
            onStepChange={
              scrollToGuidedInvestigation
            }
          />
        </div>
      </div>
    </ResultsPageLayout>
  );
};

type ResultsPageLayoutProps = {
  children: ReactNode;
};

const ResultsPageLayout = ({
  children,
}: ResultsPageLayoutProps) => {
  return (
    <div
      className="
        min-h-[calc(100vh-64px)]
        min-w-0
        max-w-full
        overflow-x-hidden
        bg-slate-50
      "
    >
      <div
        className="
          mx-auto
          w-full
          min-w-0
          max-w-7xl
          px-5
          py-5
          sm:px-6
          lg:px-8
        "
      >
        <CaseStudyPageHeader
          currentStage="results"
        />

        {children}
      </div>
    </div>
  );
};

type ResultsErrorAction = {
  label: string;
  onClick: () => void;
};

type ResultsErrorStateProps = {
  title: string;
  description: string;

  primaryAction:
    ResultsErrorAction;

  secondaryAction?:
    ResultsErrorAction;
};

const ResultsErrorState = ({
  title,
  description,
  primaryAction,
  secondaryAction,
}: ResultsErrorStateProps) => {
  return (
    <div className="mt-10">
      <section
        role="alert"
        className="mx-auto max-w-4xl rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <h1 className="text-xl font-extrabold leading-7 text-amber-900">
              {title}
            </h1>

            <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-amber-200 bg-white px-5 py-3 text-sm font-extrabold text-amber-800 shadow-sm transition-colors duration-200 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:w-auto"
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

const ResultsPageHeader = () => {
  return (
    <header className="border-b border-slate-200">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-2xl pb-5">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-950 md:text-5xl">
            Results
          </h1>

          <p className="mt-3 text-sm font-extrabold text-blue-950">
            Well done! You&apos;ve
            completed the assessment.
          </p>

          <p className="mt-1 text-sm font-semibold leading-6 text-blue-900">
            Here&apos;s how your
            building performed.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="hidden shrink-0 lg:block"
        >
          <img
            src={
              officeBuildingImage
            }
            alt=""
            className="h-36 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default CaseStudyResultsPage;