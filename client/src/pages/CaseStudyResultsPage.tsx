// client/src/pages/CaseStudyResultsPage.tsx

import {
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

import {
  AlertCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useCaseStudyResults,
} from "../features/caseStudy/hooks/useCaseStudyResults";

import PageState from "../components/ui/PageState";
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
  useCaseStudyProgress as useSharedCaseStudyProgress,
} from "../app/providers/CaseStudyProgressProvider";

import officeBuildingImage from "../assets/caseStudy/office-building3.png";


const CaseStudyResultsPage = () => {
  const navigate = useNavigate();

  const guidedInvestigationRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const {
    applyProgress,
  } =
    useSharedCaseStudyProgress();

  const {
    results:
      serverResults,

    isLoading,

    error:
      loadError,

    checkAnswer,

    advanceInvestigation,
  } =
    useCaseStudyResults();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const scrollToGuidedInvestigation =
    () => {
      guidedInvestigationRef.current
        ?.scrollIntoView({
          block: "start",
          behavior: "auto",
        });
    };

  /*
   * Keep the shared backend journey progress synchronized
   * with Results Investigation before the user navigates to
   * Guided Improvement.
   *
   * `response.progress` belongs only to the Results
   * Investigation questions. `response.caseStudyProgress`
   * is the canonical journey state used by RouteGuard.
   */
  const handleAdvanceInvestigation =
    async () => {
      const response =
        await advanceInvestigation();

      applyProgress(
        response.caseStudyProgress,
      );

      return response;
    };

  if (
    isLoading &&
    !serverResults
  ) {
    return (
      <ResultsPageLayout>
        <PageState
          isLoading={true}
          error={null}
        >
          <div />
        </PageState>
      </ResultsPageLayout>
    );
  }

  if (
    loadError ||
    !serverResults
  ) {
    return (
      <ResultsPageLayout>
        <ResultsErrorState
          title="Assessment Result Unavailable"
          description={
            loadError ??
            "No calculated assessment result is available. Complete the service assessment before opening the results page."
          }
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

  const result =
    serverResults.result;


  return (
    <ResultsPageLayout>
      <div className="mt-10 min-w-0 max-w-full space-y-6">
        <ResultsPageHeader />

        <ResultsHeroCard
          result={
            result
          }
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
          result={
            result
          }
        />

        <ResultsDomainScoresCard
          result={
            result
          }
        />

        <ResultsScoreMatrix
          result={
            result
          }
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
              serverResults.findings
            }
            initialProgress={
              serverResults
                .investigation
            }
            initialFeedbackMessage={
              serverResults
                .currentFeedbackMessage
            }
            onCheckAnswer={
              checkAnswer
            }
            onNext={
              handleAdvanceInvestigation
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
  const {
    progress:
      sharedProgress,
  } =
    useSharedCaseStudyProgress();

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
          allowedStages={
            sharedProgress
              ?.allowedStages
          }
          nextStage={
            sharedProgress
              ?.nextStage
          }
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