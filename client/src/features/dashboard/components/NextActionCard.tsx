//client\src\features\dashboard\components\NextActionCard.tsx

import Card from "../../../components/ui/Card";
import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import type { NextActionState } from "../dashboard.types";
import {
  RotateCcw,
} from "lucide-react";

type NextActionCardProps = {
  state: NextActionState;
  currentUnit?: string | null;

  milestoneTitle?:
    | string
    | null;

  milestoneProgress?:
    | number
    | null;

  caseStudyTitle?: string | null;
  currentStep?: string | null;
  completionAt?: string | null;

  onPrimaryAction?: () => void;
  onPracticeAgain?: () => void;
};

const nextActionConfig: Record<
  NextActionState,
  {
    title: string;
    description: string;
    primaryLabel: string;
  }
> = {
  "start-learning": {
    title: "Start Learning",
    description:
      "Begin the SRI course with the first theory section and progress through lessons, quizzes and final tests.",
    primaryLabel: "Start Course",
  },

  "continue-learning": {
    title: "Continue Learning",
    description:
      "Keep progressing toward the practical case study.",
    primaryLabel: "Continue Course",
  },

  "start-case-study": {
    title: "Start the Practical Case Study",
    description:
      "You completed the theory path. Apply the SRI methodology to the guided office-building assessment.",
    primaryLabel: "Start Case Study",
  },

  "continue-case-study": {
    title: "Continue Case Study",
    description:
      "Resume the current case study from the stage where you left off.",
    primaryLabel: "Continue Case Study",
  },

  "resume-practice": {
    title: "Resume Practice",
    description:
      "The case study learning milestone is already completed. Continue your current practice attempt from where you left off.",
    primaryLabel: "Resume Practice",
  },

  "review-case-study": {
    title: "Review Your Completed Case Study",
    description:
      "Review the completed assessment, improvement analysis and simulation results.",
    primaryLabel: "Review Results",
  },
};

const formatCompletionDate = (
  value: string | null | undefined,
) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
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

const clampPercentage = (
  value: number,
): number => {
  return Math.max(
    0,
    Math.min(100, value),
  );
};

const NextActionCard = ({
  state,
  currentUnit,
  milestoneTitle,
  milestoneProgress,
  caseStudyTitle,
  currentStep,
  completionAt,
  onPrimaryAction,
  onPracticeAgain,
}: NextActionCardProps) => {
  const config =
    nextActionConfig[state];

  const formattedCompletionDate =
    formatCompletionDate(
      completionAt,
    );

  const isLearningAction =
    state === "start-learning" ||
    state === "continue-learning";

  const hasLearningMilestone =
    isLearningAction &&
    Boolean(milestoneTitle) &&
    typeof milestoneProgress ===
      "number";

  const milestonePercentage =
    typeof milestoneProgress ===
      "number"
      ? clampPercentage(
          milestoneProgress,
        )
      : 0;

  return (
    <Card className="flex h-full flex-col">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
        Next Action
      </p>

      <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-900 xl:text-[2.35rem]">
        {config.title}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
        {state ===
          "continue-learning" &&
        currentUnit ? (
          <>
            You are currently on{" "}
            <span className="font-semibold text-slate-800">
              {currentUnit}
            </span>
            . {config.description}
          </>
        ) : (
          config.description
        )}
      </p>

      {/*
       * One learning progress visual only.
       *
       * CourseProgressCard owns the learner's
       * CURRENT overall Course Progress. This block
       * instead shows the NEXT SECTION MILESTONE:
       * the percentage the Course will have reached
       * once the current section is completed.
       */}
      {hasLearningMilestone ? (
        <div className="mt-6 max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Next Milestone
          </p>

          <div className="mt-2 flex items-start justify-between gap-4 text-sm">
            <span className="min-w-0 font-semibold leading-5 text-slate-800">
              Complete {milestoneTitle}
            </span>

            <span className="shrink-0 font-bold text-slate-900">
              {milestonePercentage}%
            </span>
          </div>

          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label={`Course progress after completing ${milestoneTitle}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              milestonePercentage
            }
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-500 to-purple-500 transition-[width] duration-300"
              style={{
                width: `${milestonePercentage}%`,
              }}
            />
          </div>

        </div>
      ) : null}

      {state ===
      "start-case-study" ? (
        <div className="mt-6 max-w-md rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-blue-600">
            Practical Case Study
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {caseStudyTitle ??
              "SRI Practical Case Study"}
          </p>
        </div>
      ) : null}

      {state ===
        "continue-case-study" ||
      state ===
        "resume-practice" ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Current Case
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {caseStudyTitle ??
                "Practical Case Study"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Current Step
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {currentStep ??
                "Building Information"}
            </p>
          </div>
        </div>
      ) : null}

      {state ===
      "review-case-study" ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-700">
              Learning Milestone
            </p>

            <p className="mt-1 text-sm font-semibold text-emerald-900">
              Completed
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              First Completed
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {formattedCompletionDate ??
                "Completed"}
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <PrimaryButton
          onClick={
            onPrimaryAction
          }
          className="group"
        >
          <span className="inline-flex items-center gap-2">
            {config.primaryLabel}

            <ForwardArrowIcon />
          </span>
        </PrimaryButton>

        {state ===
          "review-case-study" &&
        onPracticeAgain ? (
          <button
            type="button"
            onClick={
              onPracticeAgain
            }
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-blue-200
              bg-white
              px-5
              py-3
              text-sm
              font-extrabold
              text-blue-700
              shadow-sm
              transition-colors
              duration-200
              hover:bg-blue-50
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
            "
          >
            <RotateCcw
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
            />

            Practice Again
          </button>
        ) : null}
      </div>
    </Card>
  );
};

export default NextActionCard;
