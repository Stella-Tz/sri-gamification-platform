// client/src/features/caseStudy/components/layout/CaseStudyPageHeader.tsx

import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  CASE_STUDY_ROUTES,
} from "../../../../constants/routes";

import type {
  CaseStudyRouteStage,
} from "../../progress/caseStudyProgress.types";

import type {
  CaseStudyJourneyStage,
} from "../../types/caseStudy.types";

import CaseStudyJourneyStepper from "./CaseStudyJourneyStepper";

export type CaseStudyBreadcrumbItem = {
  label: string;

  to?: string;

  isCurrentPage?: boolean;

  isAccessible?: boolean;
};

export type CaseStudyPageHeaderProgress = {
  label: string;

  value: number;

  text: string;
};

type CaseStudyNavigationStage = {
  /*
   * Presentation stage used by the
   * header and journey stepper.
   */
  id:
    CaseStudyJourneyStage;

  /*
   * Canonical backend route stage used
   * by progress.allowedStages.
   */
  routeStage:
    CaseStudyRouteStage;

  label:
    string;

  path:
    string;
};

type Props = {
  currentStage:
    CaseStudyJourneyStage;

  allowedStages?:
    readonly CaseStudyRouteStage[];

  nextStage?:
    CaseStudyRouteStage;

  progress?:
    CaseStudyPageHeaderProgress;
};

const navigationStages:
  readonly CaseStudyNavigationStage[] = [
    {
      id:
        "building-information",

      routeStage:
        "setup",

      label:
        "Building Information",

      path:
        CASE_STUDY_ROUTES.setup,
    },

    {
      id:
        "service-assessment",

      routeStage:
        "assessment",

      label:
        "Service Assessment",

      path:
        CASE_STUDY_ROUTES.assessment,
    },

    {
      id:
        "results",

      routeStage:
        "results",

      label:
        "Results",

      path:
        CASE_STUDY_ROUTES.results,
    },

    {
      id:
        "guided-improvement-analysis",

      routeStage:
        "guided-improvement-analysis",

      label:
        "Guided Improvement Analysis",

      path:
        CASE_STUDY_ROUTES
          .guidedImprovementAnalysis,
    },

    {
      id:
        "simulation-results",

      routeStage:
        "simulation-results",

      label:
        "Simulation Results",

      path:
        CASE_STUDY_ROUTES
          .simulationResults,
    },
  ];

const buildBreadcrumbs = (
  currentStage:
    CaseStudyJourneyStage,

  allowedStages?:
    readonly CaseStudyRouteStage[],

  nextStage?:
    CaseStudyRouteStage,
): CaseStudyBreadcrumbItem[] => {
  const currentStageIndex =
    navigationStages.findIndex(
      (stage) =>
        stage.id ===
        currentStage,
    );

  if (currentStageIndex < 0) {
    return [
      {
        label:
          "Case Study",

        to:
          CASE_STUDY_ROUTES.home,
      },
    ];
  }

  const canonicalStageIndex =
    nextStage
      ? navigationStages.findIndex(
          (stage) =>
            stage.routeStage ===
            nextStage,
        )
      : currentStageIndex;

  /*
   * Special case:
   *
   * During Practice Again the learner may
   * explicitly open the permanent official
   * Simulation Results from the Dashboard.
   *
   * That historical result is not part of
   * the current practice journey, so do not
   * display all intermediate future stages.
   */
  if (
    canonicalStageIndex >= 0 &&
    currentStageIndex >
      canonicalStageIndex
  ) {
    const currentNavigationStage =
      navigationStages[
        currentStageIndex
      ];

    return [
      {
        label:
          "Case Study",

        to:
          CASE_STUDY_ROUTES.home,

        isAccessible:
          true,
      },

      {
        label:
          currentNavigationStage.label,

        isCurrentPage:
          true,

        isAccessible:
          true,
      },
    ];
  }

  /*
   * The breadcrumb belongs to the CURRENT
   * attempt, therefore its visible extent
   * comes from backend nextStage rather than
   * from the broader route-access list.
   */
  const lastVisibleIndex =
    canonicalStageIndex >= 0
      ? canonicalStageIndex
      : currentStageIndex;

  const visibleStages =
    navigationStages.slice(
      0,
      lastVisibleIndex + 1,
    );

  return [
    {
      label:
        "Case Study",

      to:
        CASE_STUDY_ROUTES.home,

      isAccessible:
        true,
    },

    ...visibleStages.map(
      (
        stage,
      ): CaseStudyBreadcrumbItem => {
        const isCurrentPage =
          stage.id ===
          currentStage;

        const isAccessible =
          allowedStages
            ? allowedStages.includes(
                stage.routeStage,
              )
            : true;

        return {
          label:
            stage.label,

          to:
            !isCurrentPage &&
            isAccessible
              ? stage.path
              : undefined,

          isCurrentPage,

          isAccessible:
            isCurrentPage ||
            isAccessible,
        };
      },
    ),
  ];
};

const CaseStudyPageHeader = ({
  currentStage,
  allowedStages,
  nextStage,
  progress,
}: Props) => {
  const breadcrumbs =
    buildBreadcrumbs(
      currentStage,
      allowedStages,
      nextStage,
    );


  return (
    <header>
      <div className="flex min-w-0 flex-col gap-3 border-b border-slate-200 pb-3 lg:flex-row lg:items-center lg:justify-between">
        <Breadcrumbs
          items={
            breadcrumbs
          }
        />

        {progress ? (
          <HeaderProgress
            progress={
              progress
            }
          />
        ) : null}
      </div>

      <div className="pt-6">
        <CaseStudyJourneyStepper
          currentStage={
            currentStage
          }
        />
      </div>
    </header>
  );
};

type BreadcrumbsProps = {
  items:
    readonly CaseStudyBreadcrumbItem[];
};

const Breadcrumbs = ({
  items,
}: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="min-w-0"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map(
          (
            item,
            index,
          ) => {
            const isLast =
              index ===
              items.length - 1;

            const isCurrentPage =
              item.isCurrentPage ===
              true;

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex min-w-0 items-center gap-2"
              >
                {item.to ? (
                  <Link
                    to={
                      item.to
                    }
                    className="rounded-sm text-xs font-extrabold text-slate-500 transition-colors duration-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {
                      item.label
                    }
                  </Link>
                ) : (
                  <span
                    aria-current={
                      isCurrentPage
                        ? "page"
                        : undefined
                    }
                    className={`
                      text-xs
                      font-extrabold
                      ${
                        isCurrentPage
                          ? "text-blue-700"
                          : item.isAccessible ===
                              false
                            ? "text-slate-300"
                            : "text-slate-500"
                      }
                    `}
                  >
                    {
                      item.label
                    }
                  </span>
                )}

                {!isLast ? (
                  <ChevronRight
                    size={14}
                    className="shrink-0 text-slate-300"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          },
        )}
      </ol>
    </nav>
  );
};

type HeaderProgressProps = {
  progress:
    CaseStudyPageHeaderProgress;
};

const HeaderProgress = ({
  progress,
}: HeaderProgressProps) => {
  const safeValue =
    Number.isFinite(
      progress.value,
    )
      ? Math.min(
          100,
          Math.max(
            0,
            progress.value,
          ),
        )
      : 0;

  return (
    <div
      className="
        grid
        w-full
        min-w-0
        grid-cols-[minmax(0,1fr)_auto]
        items-center
        gap-x-3
        gap-y-2
        lg:w-auto
        lg:min-w-[420px]
        lg:grid-cols-[auto_minmax(9rem,1fr)_auto]
      "
    >
      <span className="col-start-1 row-start-1 min-w-0 text-xs font-extrabold text-slate-600">
        {progress.label}
      </span>

      <span
        className="
          col-start-2
          row-start-1
          min-w-0
          justify-self-end
          text-right
          text-xs
          font-extrabold
          text-blue-700
          lg:col-start-3
        "
      >
        {progress.text}
      </span>

      <div
        role="progressbar"
        aria-label={
          progress.label
        }
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={
          safeValue
        }
        aria-valuetext={
          progress.text
        }
        className="
          col-span-2
          row-start-2
          h-2
          w-full
          min-w-0
          overflow-hidden
          rounded-full
          bg-slate-200
          lg:col-span-1
          lg:col-start-2
          lg:row-start-1
        "
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-[width] duration-200"
          style={{
            width:
              `${safeValue}%`,
          }}
        />
      </div>
    </div>
  );
};

export default CaseStudyPageHeader;