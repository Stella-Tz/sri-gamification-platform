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
  CaseStudyJourneyStage,
} from "../../types/caseStudy.types";

import CaseStudyJourneyStepper from "./CaseStudyJourneyStepper";

export type CaseStudyBreadcrumbItem = {
  label: string;
  to?: string;
};

export type CaseStudyPageHeaderProgress = {
  label: string;
  value: number;
  text: string;
};

type CaseStudyNavigationStage = {
  id: CaseStudyJourneyStage;
  label: string;
  path: string;
};

type Props = {
  currentStage:
    CaseStudyJourneyStage;

  progress?:
    CaseStudyPageHeaderProgress;
};

/*
 * This configuration is used only for the
 * breadcrumb path.
 *
 * The breadcrumb is automatically truncated
 * at the current page. Future stages are never
 * included.
 */
const navigationStages:
  readonly CaseStudyNavigationStage[] = [
    {
      id:
        "building-information",

      label:
        "Building Information",

      path:
        CASE_STUDY_ROUTES.setup,
    },
    {
      id:
        "service-assessment",

      label:
        "Service Assessment",

      path:
        CASE_STUDY_ROUTES.assessment,
    },
    {
      id:
        "results",

      label:
        "Results",

      path:
        CASE_STUDY_ROUTES.results,
    },
    {
      id:
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
): CaseStudyBreadcrumbItem[] => {
  const currentStageIndex =
    navigationStages.findIndex(
      (stage) =>
        stage.id ===
        currentStage,
    );

  /*
   * The current stage should always exist,
   * but the fallback keeps the header safe
   * if an unsupported value is introduced.
   */
  if (currentStageIndex < 0) {
    return [
      {
        label:
          "Case Study",
      },
    ];
  }

  const visibleStages =
    navigationStages.slice(
      0,
      currentStageIndex + 1,
    );

  return [
    {
      label:
        "Case Study",

      to:
        CASE_STUDY_ROUTES.home,
    },

    ...visibleStages.map(
      (
        stage,
        index,
      ): CaseStudyBreadcrumbItem => {
        const isCurrentStage =
          index ===
          visibleStages.length - 1;

        return {
          label:
            stage.label,

          /*
           * Only previous stages are links.
           * The current page is displayed as
           * plain text with aria-current.
           */
          to:
            isCurrentStage
              ? undefined
              : stage.path,
        };
      },
    ),
  ];
};

const CaseStudyPageHeader = ({
  currentStage,
  progress,
}: Props) => {
  const breadcrumbs =
    buildBreadcrumbs(
      currentStage,
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

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex min-w-0 items-center gap-2"
              >
                {item.to &&
                !isLast ? (
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
                      isLast
                        ? "page"
                        : undefined
                    }
                    className={`
                      text-xs
                      font-extrabold
                      ${
                        isLast
                          ? "text-blue-700"
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