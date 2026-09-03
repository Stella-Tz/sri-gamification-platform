// client/src/pages/CaseStudyAssessmentPage.tsx

import {
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useCaseStudyAssessmentData,
} from "../features/caseStudy/hooks/useCaseStudyAssessmentData";

import type {
  CaseStudyAssessmentData,
} from "../features/caseStudy/assessment/caseStudyAssessment.types";

import {
  useCaseStudyProgress as useSharedCaseStudyProgress,
} from "../app/providers/CaseStudyProgressProvider";

import PageState from "../components/ui/PageState";

import {
  CASE_STUDY_ROUTES,
} from "../constants/routes";

import {
  toCaseStudyAssessmentService,
} from "../features/caseStudy/assessment/caseStudyAssessment.presentation";

import ServiceAssessmentWorkspace from "../features/caseStudy/components/assessment/ServiceAssessmentWorkspace";

import CaseStudyPageHeader from "../features/caseStudy/components/layout/CaseStudyPageHeader";
import CaseStudyReviewNotice from "../features/caseStudy/components/layout/CaseStudyReviewNotice";

import DomainSidebar from "../features/caseStudy/components/layout/DomainSidebar";

import {
  useCaseStudyAssessment,
} from "../features/caseStudy/hooks/useCaseStudyAssessment";

import type {
  CaseStudyAssessmentProgress,
} from "../features/caseStudy/progress/caseStudyProgress.types";

import type {
  DomainPresence,
  ServiceAnswer,
  TechnicalDomainName,
} from "../features/caseStudy/types/caseStudy.types";

type CaseStudyAssessmentContentProps = {
  assessmentData:
    CaseStudyAssessmentData;
};

const isDesktopViewport =
  (): boolean => {
    return window.matchMedia(
      "(min-width: 1024px)",
    ).matches;
  };

const CaseStudyAssessmentPage =
  () => {
    const {
      assessmentData,
      isLoading,
      error,
    } =
      useCaseStudyAssessmentData();

    if (isLoading) {
      return (
        <PageState
          isLoading={true}
          error={null}
        >
          <div />
        </PageState>
      );
    }

    if (
      error ||
      !assessmentData
    ) {
      return (
        <PageState
          isLoading={false}
          error={
            error ??
            "Assessment data is unavailable."
          }
        >
          <div />
        </PageState>
      );
    }

    return (
      <CaseStudyAssessmentContent
        assessmentData={
          assessmentData
        }
      />
    );
  };

const CaseStudyAssessmentContent =
  ({
    assessmentData,
  }: CaseStudyAssessmentContentProps) => {
    const navigate =
      useNavigate();

    const mainScrollRef =
      useRef<HTMLElement | null>(
        null,
      );

    const {
      progress:
        sharedProgress,

      applyProgress,
    } =
      useSharedCaseStudyProgress();

    const domainPresence =
      assessmentData
        .setup
        .domainPresence as Record<
          TechnicalDomainName,
          DomainPresence | ""
        >;

    /*
     * Backend Assessment services are now the
     * canonical source of truth.
     *
     * This adapter performs only:
     *
     * serviceId -> id
     * string domain -> TechnicalDomainName
     *
     * No frontend SRI catalogue is consulted.
     */
    const services =
      useMemo(
        () =>
          assessmentData
            .services
            .map(
              toCaseStudyAssessmentService,
            ),
        [
          assessmentData
            .services,
        ],
      );

    const scenarioByServiceId =
      useMemo(
        () => {
          return assessmentData
            .services
            .reduce<
              Record<
                string,
                {
                  evidence:
                    string[];
                }
              >
            >(
              (
                accumulator,
                service,
              ) => {
                accumulator[
                  service.serviceId
                ] = {
                  evidence: [
                    ...service
                      .scenarioEvidence,
                  ],
                };

                return accumulator;
              },
              {},
            );
        },
        [
          assessmentData
            .services,
        ],
      );

    const initialAssessmentProgress =
      useMemo<
        CaseStudyAssessmentProgress
      >(
        () => ({
          answers: {
            ...assessmentData
              .progress
              .answers,
          },

          validatedServiceIds: [
            ...assessmentData
              .progress
              .validatedServiceIds,
          ],

          selectedServiceId:
            assessmentData
              .progress
              .selectedServiceId,

          completed:
            assessmentData
              .progress
              .completed,
        }),
        [
          assessmentData
            .progress,
        ],
      );

    /*
     * Once Assessment has been completed,
     * returning to this route is review-only.
     *
     * Navigation between domains/services remains
     * available so the learner can inspect the
     * submitted assessment.
     */
    const isReviewMode =
      assessmentData
        .progress
        .completed;

    const assessment =
      useCaseStudyAssessment({
        services,

        domainPresence,

        scenarioByServiceId,

        initialProgress:
          initialAssessmentProgress,
      });

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

      if (
        !firstErrorSection
      ) {
        return;
      }

      if (
        !isDesktopViewport()
      ) {
        requestAnimationFrame(
          () => {
            firstErrorSection
              .scrollIntoView({
                behavior:
                  "auto",

                block:
                  "start",

                inline:
                  "nearest",
              });

            firstErrorSection
              .focus({
                preventScroll:
                  true,
              });
          },
        );

        return;
      }

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
        top:
          Math.max(
            0,
            targetScrollTop,
          ),

        behavior:
          "auto",
      });

      firstErrorSection.focus({
        preventScroll:
          true,
      });
    }, [
      assessment
        .errorsByField,
    ]);

    const excludedDomains =
      useMemo(
        () => [
          ...assessment
            .absentMandatoryDomains
            .map(
              (domain) => ({
                domain,

                reason:
                  "Absent but mandatory. Its relevant services are taken into account when calculating the maximum obtainable score.",
              }),
            ),

          ...assessment
            .absentNotMandatoryDomains
            .map(
              (domain) => ({
                domain,

                reason:
                  "Absent and not mandatory. Excluded from the assessment scope.",
              }),
            ),
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

        if (
          !scrollContainer
        ) {
          return;
        }

        if (
          isDesktopViewport()
        ) {
          scrollContainer.scrollTo({
            top: 0,

            behavior:
              "auto",
          });

          return;
        }

        window.scrollTo({
          top: 0,

          behavior:
            "auto",
        });
      };

    const handleChangeAnswer =
      (
        answer:
          ServiceAnswer,
      ) => {
        if (isReviewMode) {
          return;
        }

        assessment
          .onChangeAnswer(
            answer,
          );
      };

    const handlePreviousService =
      () => {
        const previousServiceId =
          assessment
            .goToPreviousService();

        if (
          previousServiceId
        ) {
          scrollAssessmentToTop();
        }
      };

    const handleSaveAndNext =
      async () => {
        const success =
          await assessment
            .saveAndNext();

        if (
          success
        ) {
          scrollAssessmentToTop();
        }
      };

    const handleSelectService =
      (
        serviceId:
          string,
      ) => {
        const selectedServiceId =
          assessment
            .onSelectService(
              serviceId,
            );

        if (
          !selectedServiceId
        ) {
          return;
        }

        scrollAssessmentToTop();
      };

    const handleSelectDomain =
      (
        domain:
          TechnicalDomainName,
      ) => {
        const selectedServiceId =
          assessment
            .onSelectDomain(
              domain,
            );

        if (
          !selectedServiceId
        ) {
          return;
        }

        scrollAssessmentToTop();
      };

    const handleSubmitAssessment =
      async () => {
        const submission =
          await assessment
            .submit();

        if (
          !submission
        ) {
          return;
        }

        const submitResponse =
          submission.result;

        /*
         * Apply the canonical journey state
         * before navigating so RouteGuard
         * immediately knows Results is allowed.
         */
        applyProgress(
          submitResponse
            .progress,
        );

        navigate(
          CASE_STUDY_ROUTES
            .results,
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
            ref={
              mainScrollRef
            }
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
                  allowedStages={
                    sharedProgress
                      ?.allowedStages
                  }
                  nextStage={
                    sharedProgress
                      ?.nextStage
                  }
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

                {isReviewMode ? (
                  <div className="mt-6">
                    <CaseStudyReviewNotice />
                  </div>
                ) : null}

                <div className="mt-8 min-w-0 max-w-full lg:hidden">
                  <DomainSidebar
                    {...domainNavigationProps}
                    variant="mobile"
                  />
                </div>

                {!isReviewMode &&
                assessment
                  .actionError ? (
                  <p
                    role="alert"
                    className="mt-6 text-sm font-semibold text-red-600"
                  >
                    {
                      assessment
                        .actionError
                    }
                  </p>
                ) : null}

                <section className="mt-6 min-w-0 max-w-full lg:mt-10">
                  <ServiceAssessmentWorkspace
                    isReviewMode={
                      isReviewMode
                    }
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
                      assessment
                        .answers
                    }
                    onChangeAnswer={
                      handleChangeAnswer
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
                    onSaveAndNext={() => {
                      void handleSaveAndNext();
                    }}
                    onSubmitAssessment={() => {
                      void handleSubmitAssessment();
                    }}
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