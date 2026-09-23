// client/src/features/dashboard/components/CaseStudySummaryCard.tsx

import {
  ArrowDown,
  ArrowRight,
  BatteryCharging,
  Clock3,
  Lock,
  Unlock,
  Users,
  Zap,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";

import SriComparisonScoreCard from "../../caseStudy/components/shared/SriComparisonScoreCard";

import type {
  DashboardCaseStudySummary,
  DashboardKeyFunctionalityScore,
} from "../dashboard.types";

type CaseStudySummaryCardProps = {
  summary:
    DashboardCaseStudySummary;

  onViewAssessmentResults?:
    () => void;

  onViewSimulationResults?:
    () => void;
};

const formatCompletionDate = (
  value:
    | string
    | null,
): string | null => {
  if (!value) {
    return null;
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(date);
};

const formatScore = (
  value: number,
): string => {
  return `${value.toFixed(1)}%`;
};

const formatDelta = (
  value: number,
): string => {
  const prefix =
    value > 0
      ? "+"
      : "";

  return `${prefix}${value.toFixed(1)} pp`;
};

type FunctionalityTone =
  | "green"
  | "blue"
  | "purple";

type KeyFunctionalityPresentation = {
  icon: LucideIcon;
  tone: FunctionalityTone;
};

const getKeyFunctionalityPresentation = (
  label: string,
): KeyFunctionalityPresentation => {
  switch (label) {
    case "Energy performance and operation":
      return {
        icon: Zap,
        tone: "green",
      };

    case "Response to user needs":
      return {
        icon: Users,
        tone: "blue",
      };

    case "Energy flexibility":
      return {
        icon: BatteryCharging,
        tone: "purple",
      };

    default:
      return {
        icon: Zap,
        tone: "blue",
      };
  }
};

const getFunctionalityIconClass = (
  tone: FunctionalityTone,
): string => {
  switch (tone) {
    case "green":
      return "bg-emerald-50 text-emerald-600";

    case "blue":
      return "bg-blue-50 text-blue-600";

    case "purple":
      return "bg-purple-50 text-purple-600";
  }
};

const getScoreBarClass = (
  score: number | null,
): string => {
  if (score === null) {
    return "bg-slate-300";
  }

  if (score >= 60) {
    return "bg-emerald-500";
  }

  if (score >= 30) {
    return "bg-amber-400";
  }

  return "bg-red-500";
};

const KeyFunctionalityRow = ({
  item,
}: {
  item:
    DashboardKeyFunctionalityScore;
}) => {
  const {
    icon: Icon,
    tone,
  } =
    getKeyFunctionalityPresentation(
      item.label,
    );

  const score =
    item.score;

  const displayScore =
    score === null
      ? "—"
      : formatScore(score);

  const width =
    score === null
      ? 0
      : Math.min(
          100,
          Math.max(
            0,
            score,
          ),
        );

  const accessibleScore =
    score === null
      ? "No calculable score"
      : displayScore;

  return (
    <div
      aria-label={`${item.label}: ${accessibleScore}`}
      className="grid min-w-0 grid-cols-[36px_minmax(0,1fr)_64px] items-center gap-3"
    >
      <div
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center rounded-full ${getFunctionalityIconClass(
          tone,
        )}`}
      >
        <Icon
          size={18}
          strokeWidth={2.4}
        />
      </div>

      <div className="min-w-0">
        <p className="break-words text-xs font-extrabold leading-5 text-blue-950">
          {item.label}
        </p>

        <div
          aria-hidden="true"
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200"
        >
          <div
            className={`h-full rounded-full ${getScoreBarClass(
              score,
            )}`}
            style={{
              width:
                `${width}%`,
            }}
          />
        </div>
      </div>

      <p className="text-right text-lg font-extrabold tracking-tight text-blue-950">
        {displayScore}
      </p>
    </div>
  );
};

const CompactSriScoreGauge = ({
  score,
}: {
  score: number;
}) => {
  const safeScore =
    Math.min(
      100,
      Math.max(
        0,
        score,
      ),
    );

  const pointerRotation =
    -90 +
    (safeScore / 100) * 180;

  return (
    <div
      aria-hidden="true"
      className="mx-auto h-[82px] w-[150px] max-w-full"
    >
      <svg
        viewBox="0 0 260 150"
        focusable="false"
        className="h-full w-full"
      >
        <path
          d="M 35 120 A 95 95 0 0 1 225 120"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M 35 120 A 95 95 0 0 1 82 42"
          fill="none"
          stroke="#dc2626"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M 82 42 A 95 95 0 0 1 130 25"
          fill="none"
          stroke="#f97316"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M 130 25 A 95 95 0 0 1 178 42"
          fill="none"
          stroke="#facc15"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M 178 42 A 95 95 0 0 1 225 120"
          fill="none"
          stroke="#22c55e"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <g
          style={{
            transform:
              `rotate(${pointerRotation}deg)`,
            transformOrigin:
              "130px 120px",
          }}
        >
          <line
            x1="130"
            y1="120"
            x2="130"
            y2="45"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        <circle
          cx="130"
          cy="120"
          r="7"
          fill="#0f172a"
        />

        <text
          x="35"
          y="145"
          textAnchor="middle"
          className="fill-blue-950 text-xs font-extrabold"
        >
          0%
        </text>

        <text
          x="225"
          y="145"
          textAnchor="middle"
          className="fill-blue-950 text-xs font-extrabold"
        >
          100%
        </text>
      </svg>
    </div>
  );
};

const BaselineResultOverview = ({
  summary,
}: {
  summary:
    NonNullable<
      DashboardCaseStudySummary[
        "baselineResult"
      ]
    >;
}) => {
  return (
    <section
      aria-label="Baseline SRI result"
      className="min-w-0"
    >
      <p className="text-center text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
        Overall SRI Score
      </p>

      <div className="mx-auto mt-5 grid w-full max-w-[380px] grid-cols-[minmax(0,1fr)_104px] items-center gap-7">
        <div className="min-w-0 text-center">
          <CompactSriScoreGauge
            score={
              summary.totalScore
            }
          />

          <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
            Score
          </p>

          <p className="mt-1 text-3xl font-extrabold tracking-tight text-emerald-600">
            {formatScore(
              summary.totalScore,
            )}
          </p>
        </div>

        <div className="border-l border-slate-200 pl-7 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
            SRI Class
          </p>

          <div className="mx-auto mt-3 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-3xl font-extrabold text-amber-700">
            {summary.sriClass}
          </div>
        </div>
      </div>
    </section>
  );
};

const CaseStudySummaryCard = ({
  summary,
  onViewAssessmentResults,
  onViewSimulationResults,
}: CaseStudySummaryCardProps) => {
  const completionDate =
    formatCompletionDate(
      summary.completionAt,
    );

  return (
    <Card className="flex h-full min-w-0 flex-col">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
            Practical Case Study
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Case Study
          </h3>
        </div>

        {summary.state ===
        "completed" ? (
          <span className="w-fit shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {completionDate
              ? `Completed ${completionDate}`
              : "Completed"}
          </span>
        ) : null}
      </div>

      {summary.state ===
      "locked" ? (
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="max-w-lg text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <Lock
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>

            <h4 className="mt-4 text-lg font-bold text-slate-900">
              Case Study Locked
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Complete all theory sections to unlock the practical SRI assessment.
            </p>
          </div>
        </div>
      ) : null}

      {summary.state ===
      "available" ? (
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="max-w-lg text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Unlock
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>

            <h4 className="mt-4 text-lg font-bold text-slate-900">
              Case Study Unlocked
            </h4>

            <p className="mt-2 text-sm font-semibold leading-6 text-blue-950">
              {summary.caseStudyTitle ??
                "Practical SRI Case Study"}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The practical assessment is ready. No SRI result is available yet.
            </p>
          </div>
        </div>
      ) : null}

      {summary.state ===
      "assessment-in-progress" ? (
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="max-w-lg text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Clock3
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>

            <h4 className="mt-4 text-lg font-bold text-slate-900">
              Assessment in Progress
            </h4>

            <p className="mt-2 text-sm font-semibold leading-6 text-blue-950">
              {summary.caseStudyTitle ??
                "Practical SRI Case Study"}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              No SRI result is available yet. Complete the service assessment to calculate the baseline result.
            </p>
          </div>
        </div>
      ) : null}

      {summary.state ===
        "baseline-result" &&
      summary.baselineResult ? (
        <div className="mx-auto mt-5 w-full max-w-5xl">
          <div
              className="
                grid
                min-w-0
                gap-8
                lg:grid-cols-[320px_minmax(0,1fr)]
                lg:items-start
                lg:gap-10
                xl:grid-cols-1
                xl:gap-8
                2xl:grid-cols-[320px_minmax(0,1fr)]
                2xl:items-start
                2xl:gap-10
              "
            >
            <BaselineResultOverview
              summary={
                summary.baselineResult
              }
            />

            <section
              className="
                min-w-0
                border-t
                border-slate-200
                pt-6
                lg:border-l
                lg:border-t-0
                lg:pl-10
                lg:pt-0
                xl:border-l-0
                xl:border-t
                xl:pl-0
                xl:pt-6
                2xl:border-l
                2xl:border-t-0
                2xl:pl-10
                2xl:pt-0
              "
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Key Functionalities
              </p>

              <div className="mt-5 grid gap-5">
                {summary
                  .baselineResult
                  .keyFunctionalityScores
                  .map(
                    (item) => (
                      <KeyFunctionalityRow
                        key={item.label}
                        item={item}
                      />
                    ),
                  )}
              </div>
            </section>
          </div>

          {onViewAssessmentResults ? (
            <div className="mt-10 flex justify-center">
              <PrimaryButton
                onClick={
                  onViewAssessmentResults
                }
                className="group"
              >
                <span className="inline-flex items-center gap-2">
                  View Assessment Results

                  <ForwardArrowIcon />
                </span>
              </PrimaryButton>
            </div>
          ) : null}
        </div>
      ) : null}

      {summary.state ===
      "completed" ? (
        <div className="mx-auto mt-6 w-full max-w-4xl">
          {summary.simulationResult ? (
            <>
              <section
                aria-label="Simulation result summary"
                className="min-w-0"
              >
                <div
                  className="
                    grid
                    min-w-0
                    gap-3
                    md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)]
                    md:items-center
                  "
                >
                  <SriComparisonScoreCard
                    label="Before Upgrade"
                    value={
                      summary
                        .simulationResult
                        .beforeScore
                    }
                    sriClass={
                      summary
                        .simulationResult
                        .beforeClass
                    }
                    tone="blue"
                    variant="compact"
                  />

                  <SimulationChangeColumn
                    delta={
                      summary
                        .simulationResult
                        .delta
                    }
                  />

                  <SriComparisonScoreCard
                    label="After Upgrade"
                    value={
                      summary
                        .simulationResult
                        .afterScore
                    }
                    sriClass={
                      summary
                        .simulationResult
                        .afterClass
                    }
                    tone="violet"
                    variant="compact"
                  />
                </div>
              </section>

              {onViewSimulationResults ? (
                <div className="mt-10 flex justify-center">
                  <PrimaryButton
                    onClick={
                      onViewSimulationResults
                    }
                    className="group"
                  >
                    <span className="inline-flex items-center gap-2">
                      View Simulation Results

                      <ForwardArrowIcon />
                    </span>
                  </PrimaryButton>
                </div>
              ) : null}
            </>
          ) : (
            <div
              role="status"
              className="mx-auto mt-6 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-semibold leading-6 text-amber-800"
            >
              The Case Study completion is recorded, but the permanent official result is not available in the current local progress data.
            </div>
          )}
        </div>
      ) : null}

    </Card>
  );
};

type SimulationChangeColumnProps = {
  delta: number;
};

const SimulationChangeColumn = ({
  delta,
}: SimulationChangeColumnProps) => {
  return (
    <div
      aria-label={`Overall SRI change: ${formatDelta(
        delta,
      )}`}
      className="
        flex
        min-w-0
        flex-row
        items-center
        justify-center
        gap-3
        py-2
        md:flex-col
        md:gap-2
        md:py-0
      "
    >
      <ArrowDown
        size={26}
        strokeWidth={2.2}
        className="shrink-0 text-slate-300 md:hidden"
        aria-hidden="true"
      />

      <ArrowRight
        size={26}
        strokeWidth={2.2}
        className="hidden shrink-0 text-slate-300 md:block"
        aria-hidden="true"
      />

      <div className="text-center">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
          Change
        </p>

        <p className="mt-1 whitespace-nowrap text-sm font-extrabold text-emerald-700">
          {formatDelta(delta)}
        </p>
      </div>
    </div>
  );
};

export default CaseStudySummaryCard;
