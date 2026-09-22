// client/src/pages/CaseStudySetupPage.tsx

import {
  useLayoutEffect,
  useRef,
} from "react";


import {
  ClipboardList,
  Lightbulb,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import ForwardArrowIcon from "../components/ui/ForwardArrowIcon";
import PageState from "../components/ui/PageState";
import PrimaryButton from "../components/ui/PrimaryButton";

import guideIllustration from "../assets/caseStudy/guide-illustration.png";

import BuildingInformationForm from "../features/caseStudy/components/setup/BuildingInformationForm";
import DomainsPresenceTable from "../features/caseStudy/components/setup/DomainsPresenceTable";
import MethodologySelectionCard from "../features/caseStudy/components/setup/MethodologySelectionCard";

import CaseStudyPageHeader from "../features/caseStudy/components/layout/CaseStudyPageHeader";
import CaseStudyReviewNotice from "../features/caseStudy/components/layout/CaseStudyReviewNotice";
import CaseStudyScenarioCard from "../features/caseStudy/components/layout/CaseStudyScenarioCard";

import {
  useCaseStudyDefinition,
} from "../features/caseStudy/hooks/useCaseStudyDefinition";

import {
  sriTechnicalDomainNames,
} from "../features/caseStudy/data/sriOfficialConstants";

import {
  useCaseStudySetup,
} from "../features/caseStudy/hooks/useCaseStudySetup";

import {
  useCaseStudyProgress as useBackendCaseStudyProgress,
} from "../app/providers/CaseStudyProgressProvider";

import type {
  CaseStudyDefinition,
  SetupAnswers,
} from "../features/caseStudy/types/caseStudy.types";

import type {
  CaseStudyRouteStage,
} from "../features/caseStudy/progress/caseStudyProgress.types";

import {
  CASE_STUDY_ROUTES,
} from "../constants/routes";

const CaseStudySetupPage = () => {
  const {
    definition,
    isLoading:
      isDefinitionLoading,
    error:
      definitionError,
  } =
    useCaseStudyDefinition();

  const {
    progress,
    isLoading:
      isProgressLoading,
    error:
      progressError,
  } =
    useBackendCaseStudyProgress();

  if (
    isDefinitionLoading ||
    isProgressLoading
  ) {
    return (
      <PageState
        isLoading
        error={null}
      >
        <div />
      </PageState>
    );
  }

  if (
    definitionError ||
    progressError ||
    !definition ||
    !progress
  ) {
    return (
      <PageState
        isLoading={false}
        error={
          definitionError ??
          progressError ??
          "Could not load Case Study setup."
        }
      >
        <div />
      </PageState>
    );
  }

  /*
   * Setup answers are restored from canonical
   * backend progress, while the learner-visible
   * scenario comes from the backend definition.
   */
  const initialAnswers:
    SetupAnswers | null =
      progress.setup
        ?.answers ??
      null;

  /*
   * A completed Setup stage is review-only.
   *
   * This applies both while a later stage is
   * currently active and after the whole Case
   * Study has been completed.
   */
  const isReviewMode =
    progress.setup
      ?.completed ??
    false;

  return (
    <CaseStudySetupContent
      caseStudy={
        definition
      }
      initialAnswers={
        initialAnswers
      }
      isReviewMode={
        isReviewMode
      }
      allowedStages={
        progress.allowedStages
      }
      nextStage={
        progress.nextStage
      }
    />
  );
};

type CaseStudySetupContentProps = {
  caseStudy:
    CaseStudyDefinition;

  allowedStages:
   readonly CaseStudyRouteStage[];

  initialAnswers:
    SetupAnswers | null;

  isReviewMode:
    boolean;

  nextStage:
    CaseStudyRouteStage;
};

const CaseStudySetupContent = ({
  caseStudy,
  initialAnswers,
  isReviewMode,
  allowedStages,
  nextStage,
}: CaseStudySetupContentProps) => {
  const navigate = useNavigate();

  const {
    applyProgress,
  } =
    useBackendCaseStudyProgress();

  const setupPageRef =
    useRef<HTMLDivElement | null>(
      null,
    );

    const setup =
      useCaseStudySetup({
        domains: [
          ...sriTechnicalDomainNames,
        ],
    
        initialAnswers,
    
        onProgressChange:
          applyProgress,
      });

  useLayoutEffect(() => {
    if (
      Object.keys(
        setup.errors,
      ).length === 0
    ) {
      return;
    }

    const firstErrorElement =
      setupPageRef.current
        ?.querySelector<HTMLElement>(
          '[data-setup-error="true"]',
        );

    if (!firstErrorElement) {
      return;
    }

    const headerOffset = 88;

    const targetTop =
      firstErrorElement
        .getBoundingClientRect()
        .top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: Math.max(
        0,
        targetTop,
      ),

      behavior: "auto",
    });

    firstErrorElement.focus({
      preventScroll: true,
    });
  }, [setup.errors]);


  const handleContinue =
    async () => {
      if (isReviewMode) {
        return;
      }

      const response =
        await setup.complete();

      if (
        !response ||
        !response
          .validation
          .isValid
      ) {
        return;
      }

      /*
       * The completion response already contains
       * the new canonical backend journey state.
       *
       * Apply it to the shared provider BEFORE
       * navigating so CaseStudyRouteGuard sees
       * Assessment as available immediately.
       */
      applyProgress(
        response.progress,
      );

      navigate(
        CASE_STUDY_ROUTES
          .assessment,
      );
    };

  return (
    <div
      ref={setupPageRef}
      className="min-h-[calc(100vh-64px)] bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
        <CaseStudyPageHeader
          currentStage="building-information"
          allowedStages={
            allowedStages
          }
          nextStage={
            nextStage
          }
        />

        {isReviewMode ? (
          <div className="mt-6">
            <CaseStudyReviewNotice />
          </div>
        ) : null}

        <section className="mt-10 space-y-6">
          <CaseStudyScenarioCard
            caseStudy={caseStudy}
          />

          {!isReviewMode ? (
            <GuidanceCard />
          ) : null}

          <fieldset
            disabled={
              isReviewMode
            }
            className="m-0 min-w-0 border-0 p-0"
          >
            <BuildingInformationForm
              buildingType={
                setup.buildingType
              }
              setBuildingType={
                setup.setBuildingType
              }
              buildingUsage={
                setup.buildingUsage
              }
              setBuildingUsage={
                setup.setBuildingUsage
              }
              country={
                setup.country
              }
              setCountry={
                setup.setCountry
              }
              climateZone={
                setup.climateZone
              }
              floorArea={
                setup.floorArea
              }
              setFloorArea={
                setup.setFloorArea
              }
              constructionYear={
                setup.constructionYear
              }
              setConstructionYear={
                setup.setConstructionYear
              }
              buildingState={
                setup.buildingState
              }
              setBuildingState={
                setup.setBuildingState
              }
              renovationYear={
                setup.renovationYear
              }
              setRenovationYear={
                setup.setRenovationYear
              }
              errors={
                setup.errors
              }
            />
          </fieldset>

          <ScenarioBulletsCard
            title={
              caseStudy.scenario
                .methodologyContext
                .title
            }
            bullets={
              caseStudy.scenario
                .methodologyContext
                .bullets
            }
            layout="single"
          />

          <fieldset
            disabled={
              isReviewMode
            }
            className="m-0 min-w-0 border-0 p-0"
          >
            <MethodologySelectionCard
              assessmentMethod={
                setup.assessmentMethod
              }
              setAssessmentMethod={
                setup.setAssessmentMethod
              }
              errors={
                setup.errors
              }
            />
          </fieldset>

          <ScenarioBulletsCard
            title={
              caseStudy.scenario
                .buildingSystemsAndTechnologies
                .title
            }
            bullets={
              caseStudy.scenario
                .buildingSystemsAndTechnologies
                .bullets
            }
          />

          <fieldset
            disabled={
              isReviewMode
            }
            className="m-0 min-w-0 border-0 p-0"
          >
            <DomainsPresenceTable
              domains={[
                ...sriTechnicalDomainNames,
              ]}
              domainPresence={
                setup.domainPresence
              }
              setDomainPresence={
                setup.setDomainPresence
              }
              errors={
                setup.errors
              }
            />
          </fieldset>

          {!isReviewMode &&
          setup.submitError ? (
            <p className="text-sm font-semibold text-red-600">
              {setup.submitError}
            </p>
          ) : null}

          {!isReviewMode ? (
            <div className="flex justify-end pb-6">
              <PrimaryButton
                onClick={
                  handleContinue
                }
                disabled={
                  setup.isSubmitting
                }
                className="group w-full sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  {setup.isSubmitting
                    ? "Completing..."
                    : "Continue to Assessment"}

                  <ForwardArrowIcon />
                </span>
              </PrimaryButton>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

const GuidanceCard = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50 px-6 py-5 shadow-sm">
      <div
        className="
          grid
          min-w-0
          grid-cols-[56px_minmax(0,1fr)]
          gap-x-5
          gap-y-2
          md:pr-32
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white
            text-blue-600
            shadow-sm
            md:row-span-2
          "
        >
          <Lightbulb
            size={26}
            aria-hidden="true"
          />
        </div>

        <h2 className="min-w-0 self-center break-words text-base font-extrabold leading-6 text-slate-900 md:self-auto">
          Use the information from the
          scenario above to complete the
          fields below.
        </h2>

        <p
          className="
            col-span-2
            min-w-0
            break-words
            text-sm
            font-semibold
            leading-6
            text-slate-500
            md:col-span-1
            md:col-start-2
          "
        >
          Think carefully about each
          building characteristic before
          selecting the assessment method
          and defining the status of each
          technical domain.
        </p>
      </div>

      <img
        src={guideIllustration}
        alt=""
        aria-hidden="true"
        className="absolute right-6 top-1/2 hidden h-36 w-auto -translate-y-1/2 object-contain md:block"
      />
    </section>
  );
};

type ScenarioBulletsCardProps = {
  title: string;
  bullets: readonly string[];
  layout?: "single" | "columns";
};

const ScenarioBulletsCard = ({
  title,
  bullets,
  layout = "columns",
}: ScenarioBulletsCardProps) => {
  const singleParagraph =
    bullets.length === 1
      ? bullets[0]
      : null;

  return (
    <section className="rounded-3xl border border-indigo-100 bg-indigo-50 px-6 py-5 shadow-sm">
      <div
        className="
          grid
          min-w-0
          grid-cols-[48px_minmax(0,1fr)]
          gap-x-5
          gap-y-3
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white
            text-blue-600
            shadow-sm
            sm:row-span-2
          "
        >
          <ClipboardList
            size={23}
            aria-hidden="true"
          />
        </div>

        <h2 className="flex min-h-12 min-w-0 items-center break-words text-base font-extrabold leading-6 text-slate-900">
          {title}
        </h2>

        <div
          className="
            col-span-2
            min-w-0
            sm:col-span-1
            sm:col-start-2
          "
        >
          {singleParagraph ? (
            <p className="max-w-4xl break-words text-sm font-semibold leading-7 text-slate-700">
              {singleParagraph}
            </p>
          ) : (
            <ul
              className={
                layout === "single"
                  ? "max-w-5xl"
                  : "columns-1 gap-10 lg:columns-2"
              }
            >
              {bullets.map(
                (
                  bullet,
                  index,
                ) => (
                  <li
                    key={`${index}-${bullet}`}
                    className="mb-3 flex break-inside-avoid items-start gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-1.5 shrink-0 items-center justify-center"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    </span>

                    <p className="min-w-0 break-words text-sm font-semibold leading-7 text-slate-700">
                      {bullet}
                    </p>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySetupPage;