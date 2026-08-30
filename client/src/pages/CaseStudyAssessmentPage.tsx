// client/src/pages/CaseStudyAssessmentPage.tsx

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import PageState from "../components/ui/PageState";

import ServiceAssessmentWorkspace from "../features/caseStudy/components/assessment/ServiceAssessmentWorkspace";

import CaseStudyPageHeader from "../features/caseStudy/components/layout/CaseStudyPageHeader";
import DomainSidebar from "../features/caseStudy/components/layout/DomainSidebar";

import {
  caseStudyMockData,
} from "../features/caseStudy/data/caseStudyMockData";

import {
  getSriServicesForAssessmentMethod,
} from "../features/caseStudy/data/sriServiceCatalogue";

import {
  useCaseStudyAssessment,
} from "../features/caseStudy/hooks/useCaseStudyAssessment";

import {
  useCaseStudyProgress,
} from "../features/caseStudy/progress/useCaseStudyProgress";

import {
  calculateSriScore,
} from "../features/caseStudy/utils/sriScoring.utils";

import {
  CASE_STUDY_ROUTES,
} from "../constants/routes";

import type {
  BuildingType,
  CaseStudyDetails,
  ClimateZone,
  DomainPresence,
  OfficialAssessmentMethod,
  TechnicalDomainName,
} from "../features/caseStudy/types/caseStudy.types";

import type {
  CaseStudyAssessmentProgress,
} from "../features/caseStudy/progress/caseStudyProgress.types";

type AssessmentLocationState = {
  caseStudy?: CaseStudyDetails;

  domainPresence?: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  assessmentMethod?:
    OfficialAssessmentMethod;

  buildingType?: BuildingType;
  climateZone?: ClimateZone;
};

type CaseStudyAssessmentContentProps = {
  caseStudy: CaseStudyDetails;

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  assessmentMethod:
    OfficialAssessmentMethod;

  buildingType: BuildingType;
  climateZone: ClimateZone;

  initialAssessmentProgress:
    | CaseStudyAssessmentProgress
    | null;
};

const isDesktopViewport =
  (): boolean => {
    return window.matchMedia(
      "(min-width: 1024px)",
    ).matches;
  };

const CaseStudyAssessmentPage =
  () => {
    const location =
      useLocation();

    const {
      getProgressForCaseStudy,
    } = useCaseStudyProgress();

    const state =
      location.state as
        | AssessmentLocationState
        | null;

    const caseStudy =
      state?.caseStudy ??
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
      savedSetup?.completed ===
      true
        ? savedSetup.answers
        : null;

    const domainPresence =
      state?.domainPresence ??
      savedSetupAnswers
        ?.domainPresence ??
      null;

    const assessmentMethod =
      state?.assessmentMethod ??
      savedSetupAnswers
        ?.methodologySelection
        .assessmentMethod ??
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

    if (!caseStudy) {
      return (
        <PageState
          isLoading={false}
          error="Case study not found."
        >
          <div />
        </PageState>
      );
    }

    if (
      !domainPresence ||
      !assessmentMethod ||
      !buildingType ||
      !climateZone
    ) {
      return (
        <PageState
          isLoading={false}
          error="Please complete the building setup before starting the assessment."
        >
          <div />
        </PageState>
      );
    }

    return (
      <CaseStudyAssessmentContent
        caseStudy={caseStudy}
        domainPresence={
          domainPresence
        }
        assessmentMethod={
          assessmentMethod
        }
        buildingType={
          buildingType
        }
        climateZone={
          climateZone
        }
        initialAssessmentProgress={
          savedProgress
            ?.assessment ??
          null
        }
      />
    );
  };

const CaseStudyAssessmentContent =
  ({
    caseStudy,
    domainPresence,
    assessmentMethod,
    buildingType,
    climateZone,
    initialAssessmentProgress,
  }: CaseStudyAssessmentContentProps) => {
    const navigate =
      useNavigate();

    const mainScrollRef =
      useRef<HTMLElement | null>(
        null,
      );

    const {
      saveAssessmentProgress,
      completeAssessment,
    } = useCaseStudyProgress();

    const catalogue =
      useMemo(() => {
        return getSriServicesForAssessmentMethod(
          assessmentMethod,
        );
      }, [assessmentMethod]);

    const assessment =
      useCaseStudyAssessment({
        caseStudy,
        catalogue,
        domainPresence,

        initialProgress:
          initialAssessmentProgress,
      });

    /*
     * Persist every meaningful assessment
     * change.
     *
     * A previously completed assessment stays
     * completed until one of its answers changes.
     */
    useEffect(() => {
      if (
        assessment
          .totalServicesCount ===
        0
      ) {
        return;
      }

      saveAssessmentProgress(
        caseStudy.id,
        {
          answers:
            assessment.answers,

          validatedServiceIds:
            assessment
              .validatedServiceIds,

          selectedServiceId:
            assessment
              .selectedServiceId ||
            null,

          completed:
            assessment
              .isSavedAsCompleted,
        },
      );
    }, [
      assessment.answers,
      assessment
        .isSavedAsCompleted,
      assessment
        .selectedServiceId,
      assessment
        .totalServicesCount,
      assessment
        .validatedServiceIds,
      caseStudy.id,
      saveAssessmentProgress,
    ]);

    useLayoutEffect(() => {
      const scrollContainer =
        mainScrollRef.current;

      if (
        !scrollContainer ||
        Object.keys(
          assessment
            .errorsByField,
        ).length === 0
      ) {
        return;
      }

      const firstErrorSection =
        scrollContainer
          .querySelector<HTMLElement>(
            '[data-assessment-error="true"]',
          );

      if (!firstErrorSection) {
        return;
      }

      /*
       * Mobile / tablet:
       * the document performs the scroll.
       */
      if (
        !isDesktopViewport()
      ) {
        requestAnimationFrame(() => {
          firstErrorSection.scrollIntoView({
            behavior: "auto",
            block: "start",
            inline: "nearest",
          });

          firstErrorSection.focus({
            preventScroll: true,
          });
        });

        return;
      }

      /*
       * Desktop:
       * only the assessment main area scrolls.
       */
      const containerRect =
        scrollContainer
          .getBoundingClientRect();

      const errorRect =
        firstErrorSection
          .getBoundingClientRect();

      const targetScrollTop =
        scrollContainer
          .scrollTop +
        errorRect.top -
        containerRect.top -
        24;

      scrollContainer.scrollTo({
        top: Math.max(
          0,
          targetScrollTop,
        ),

        behavior: "auto",
      });

      firstErrorSection.focus({
        preventScroll: true,
      });
    }, [
      assessment.errorsByField,
    ]);

    const serviceApplicability =
      useMemo<
        Record<string, boolean>
      >(
        () => {
          const applicableServiceIds =
            new Set(
              assessment
                .services
                .map(
                  (service) =>
                    service.id,
                ),
            );

          return catalogue.reduce<
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
        },
        [
          assessment.services,
          catalogue,
        ],
      );

    const excludedDomains =
      useMemo(
        () => [
          ...assessment
            .absentMandatoryDomains
            .map((domain) => ({
              domain,

              reason:
                "Absent but mandatory. Its relevant services are taken into account when calculating the maximum obtainable score.",
            })),

          ...assessment
            .absentNotMandatoryDomains
            .map((domain) => ({
              domain,

              reason:
                "Absent and not mandatory. Excluded from the assessment scope.",
            })),
        ],
        [
          assessment
            .absentMandatoryDomains,

          assessment
            .absentNotMandatoryDomains,
        ],
      );

    const scrollAssessmentToTop =
      () => {
        const scrollContainer =
          mainScrollRef.current;

        if (!scrollContainer) {
          return;
        }

        if (
          isDesktopViewport()
        ) {
          scrollContainer.scrollTo(
            {
              top: 0,
              behavior: "auto",
            },
          );

          return;
        }

        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      };

    const handlePreviousService =
      () => {
        assessment
          .goToPreviousService();

        scrollAssessmentToTop();
      };

    const handleSaveAndNext =
      () => {
        const wasSaved =
          assessment
            .saveAndNext();

        if (wasSaved) {
          scrollAssessmentToTop();
        }
      };

    const handleSelectService =
      (
        serviceId: string,
      ) => {
        assessment
          .onSelectService(
            serviceId,
          );

        scrollAssessmentToTop();
      };

    const handleSelectDomain =
      (
        domain:
          TechnicalDomainName,
      ) => {
        assessment
          .onSelectDomain(
            domain,
          );

        scrollAssessmentToTop();
      };

    const handleSubmitAssessment =
      () => {
        const currentServiceIsValid =
          assessment
            .validateCurrentService();

        if (
          !currentServiceIsValid ||
          !assessment
            .selectedService
        ) {
          return;
        }

        const selectedServiceId =
          assessment
            .selectedService.id;

        const finalValidatedServiceIds =
          assessment
            .validatedServiceIds
            .includes(
              selectedServiceId,
            )
            ? assessment
                .validatedServiceIds
            : [
                ...assessment
                  .validatedServiceIds,

                selectedServiceId,
              ];

        const allServicesValidated =
          assessment.services.every(
            (service) =>
              finalValidatedServiceIds
                .includes(
                  service.id,
                ),
          );

        if (
          !allServicesValidated
        ) {
          return;
        }

        const result =
          calculateSriScore({
            services: catalogue,

            answers:
              assessment.answers,

            assessmentMethod,
            serviceApplicability,
            domainPresence,
            buildingType,
            climateZone,
          });

        /*
         * Persist the full baseline assessment
         * before leaving the page.
         */
        completeAssessment(
          caseStudy.id,
          {
            answers:
              assessment.answers,

            validatedServiceIds:
              finalValidatedServiceIds,

            selectedServiceId,

            completed: true,
          },
          result,
        );

        /*
         * Route state remains temporarily for
         * compatibility with the current Results
         * and Guided Improvement pages.
         */
        navigate(
          CASE_STUDY_ROUTES
            .results,
          {
            state: {
              result,
              caseStudy,

              answers:
                assessment.answers,

              assessmentMethod,
              serviceApplicability,
              domainPresence,
              buildingType,
              climateZone,

              services:
                catalogue,
            },
          },
        );
      };

    const domainNavigationProps =
      {
        domains:
          assessment
            .domainsWithServices,

        selectedDomain:
          assessment
            .selectedDomain,

        completedByDomain:
          assessment
            .completedByDomain,

        totalByDomain:
          assessment
            .totalByDomain,

        onSelectDomain:
          handleSelectDomain,

        excludedDomains,
      };

    return (
      <div
        className="
          min-h-[calc(100vh-64px)]
          min-w-0
          max-w-full
          overflow-x-hidden
          bg-slate-50

          lg:h-full
          lg:min-h-0
          lg:overflow-hidden
          lg:bg-white
        "
      >
        <div
          className="
            min-w-0
            max-w-full

            lg:flex
            lg:h-full
            lg:min-h-0
          "
        >
          <DomainSidebar
            {...domainNavigationProps}
            variant="desktop"
          />

          <main
            ref={mainScrollRef}
            aria-label="Service assessment"
            className="
              min-w-0
              max-w-full
              flex-1
              overflow-x-hidden
              bg-slate-50

              lg:h-full
              lg:min-h-0
              lg:overflow-y-auto
              lg:overscroll-y-contain
            "
          >
            <div className="min-w-0 max-w-full px-5 py-5 sm:px-6 lg:px-8">
              <div className="mx-auto w-full min-w-0 max-w-[1120px]">
                <CaseStudyPageHeader
                  currentStage="service-assessment"
                  progress={{
                    label:
                      "Assessment Progress",

                    value:
                      assessment.progress,

                    text:
                      `${assessment.completedServicesCount}/` +
                      `${assessment.totalServicesCount} services · ` +
                      `${assessment.progress}%`,
                  }}
                />

                <div className="mt-8 min-w-0 max-w-full lg:hidden">
                  <DomainSidebar
                    {...domainNavigationProps}
                    variant="mobile"
                  />
                </div>

                <section className="mt-6 min-w-0 max-w-full lg:mt-10">
                  <ServiceAssessmentWorkspace
                    services={
                      assessment
                        .selectedDomainServices
                    }
                    selectedService={
                      assessment
                        .selectedService
                    }
                    selectedServiceId={
                      assessment
                        .selectedServiceId
                    }
                    answers={
                      assessment.answers
                    }
                    onChangeAnswer={
                      assessment
                        .onChangeAnswer
                    }
                    errorsByField={
                      assessment
                        .errorsByField
                    }
                    scenarioByServiceId={
                      assessment
                        .scenarioByServiceId
                    }
                    onSelectService={
                      handleSelectService
                    }
                    canSelectService={
                      assessment
                        .canSelectService
                    }
                    isServiceValidated={
                      assessment
                        .isServiceValidated
                    }
                    canGoPrevious={
                      assessment
                        .canGoPrevious
                    }
                    onPrevious={
                      handlePreviousService
                    }
                    onSaveAndNext={
                      handleSaveAndNext
                    }
                    onSubmitAssessment={
                      handleSubmitAssessment
                    }
                    isFinalRemainingService={
                      assessment
                        .isFinalRemainingService
                    }
                  />
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

export default CaseStudyAssessmentPage;