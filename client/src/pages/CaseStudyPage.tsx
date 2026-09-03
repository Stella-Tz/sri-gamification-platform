// client/src/pages/CaseStudyPage.tsx

import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Grid2X2,
  LockKeyhole,
  RotateCcw,
  Settings,
  TrendingUp,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import ForwardArrowIcon from "../components/ui/ForwardArrowIcon";
import PageHeader from "../components/ui/PageHeader";

import caseStudyBuildingImage from "../assets/caseStudy/case_study_building.png";

import {
  CASE_STUDY_ROUTES,
} from "../constants/routes";

import {
  getCaseStudyPrimaryActionPresentation,
  getCaseStudyProgressPresentation,
} from "../features/caseStudy/progress/caseStudyProgress.presentation";

import {
  useCaseStudyProgress,
} from "../app/providers/CaseStudyProgressProvider";

import {
  useCourseProgress,
} from "../app/providers/CourseProgressProvider";

type LearningObjective = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const learningObjectives = [
  {
    icon: Building2,

    title:
      "Define the Building Characteristics",

    description:
      "Use the scenario details to describe the building and complete the information setup.",
  },
  {
    icon: Grid2X2,

    title:
      "Identify the Technical Domain Status",

    description:
      "Determine the presence status of each technical domain based on the building scenario.",
  },
  {
    icon: Settings,

    title:
      "Assess Smart-Ready Services",

    description:
      "Select functionality levels and functionality shares for the available services.",
  },
  {
    icon: ClipboardList,

    title:
      "Calculate the Smart Readiness Indicator",

    description:
      "See how the selected options and their coverage affect the final SRI score.",
  },
  {
    icon: BarChart3,

    title:
      "Interpret the Assessment Results",

    description:
      "Review the results by impact area and technical domain to understand the building's performance.",
  },
  {
    icon: TrendingUp,

    title:
      "Identify Improvement Opportunities",

    description:
      "Explore guided recommendations and smarter choices to improve the building's smart readiness.",
  },
] satisfies readonly LearningObjective[];

const CaseStudyPage = () => {
  const navigate =
    useNavigate();

  /*
   * Course progress controls whether the
   * practical case study is unlocked.
   */
  const {
    progress: courseProgress,
  } = useCourseProgress();

  /*
   * Course completion and Case Study access
   * are canonical backend Course-progress
   * decisions.
   *
   * This page no longer derives them from
   * the frontend Course definition.
   */
  const completedSections =
    courseProgress
      .completedSections;

  const totalSections =
    courseProgress
      .totalSections;

  const isUnlocked =
    courseProgress
      .isCaseStudyUnlocked;

  /*
   * Case Study progress comes from the shared
   * provider used by the whole protected app.
   */
  const {
    progress,
    isLoading:
      isCaseStudyProgressLoading,
    isStartingPracticeAgain,
    error:
      caseStudyProgressError,
    startPracticeAgain,
  } =
    useCaseStudyProgress();

  /*
   * The backend is the source of truth for
   * the current Case Study journey status.
   *
   * "not-started" is used only as a temporary
   * presentation fallback while progress is
   * loading.
   */
  const caseStudyStatus =
    progress
      ?.journeyStatus ??
    "not-started";

  /*
   * The backend has already determined:
   * - journeyStatus
   * - nextStage
   * - isPracticeAttempt
   *
   * The presentation helper only converts
   * them into UI text and a React route.
   */
  const nextAction =
    progress
      ? getCaseStudyPrimaryActionPresentation(
          {
            status:
              progress
                .journeyStatus,

            nextStage:
              progress
                .nextStage,

            isPracticeAttempt:
              progress
                .isPracticeAttempt,
          },
        )
      : null;

  const progressPresentation =
    getCaseStudyProgressPresentation(
      caseStudyStatus,
    );

  const hasCurrentAttemptStarted =
    progress !== null &&
    progress
      .journeyStatus !==
      "not-started";

  const isCurrentAttemptCompleted =
    progress
      ?.journeyStatus ===
    "completed";

  /*
   * An official attempt represents a
   * permanently completed Case Study.
   *
   * A separate active practice attempt may
   * exist at the same time.
   */
  const hasCompletedCaseStudy =
    progress
      ?.officialAttemptId !=
    null;

  const handlePrimaryAction =
    () => {
      if (
        !isUnlocked ||
        !nextAction ||
        isCaseStudyProgressLoading
      ) {
        return;
      }

      navigate(
        nextAction.path,
      );
    };

  const handlePracticeAgain =
    async () => {
      const nextProgress =
        await startPracticeAgain();

      if (!nextProgress) {
        return;
      }

      navigate(
        CASE_STUDY_ROUTES.setup,
      );
    };

  return (
    <div className="pb-16">
      <PageHeader
        title="Case Study"
        subtitle="Apply the Smart Readiness Indicator methodology through a guided building assessment scenario."
      />

      <section
        aria-disabled={!isUnlocked}
        className={`
          mt-8
          overflow-hidden
          rounded-3xl
          border
          p-6
          shadow-sm
          md:p-8
          ${
            isUnlocked
              ? `
                  border-blue-100
                  bg-blue-100/60
                `
              : `
                  border-slate-200
                  bg-slate-100/70
                `
          }
        `}
      >
        <div className="min-w-0">
          <h2
            className={`
              break-words
              text-2xl
              font-extrabold
              tracking-tight
              md:text-3xl
              ${
                isUnlocked
                  ? "text-blue-900"
                  : "text-slate-600"
              }
            `}
          >
            Smart Readiness Assessment
          </h2>

          <div
            className={`
              mt-3
              h-1
              w-12
              rounded-full
              ${
                isUnlocked
                  ? "bg-blue-900"
                  : "bg-slate-300"
              }
            `}
            aria-hidden="true"
          />
        </div>

        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(380px,1.14fr)] lg:items-stretch">
          <div className="min-w-0">
            <div
              className={`
                max-w-xl
                space-y-4
                text-base
                font-semibold
                leading-7
                ${
                  isUnlocked
                    ? "text-slate-700"
                    : "text-slate-500"
                }
              `}
            >
              <p>
                In this case study, you
                will evaluate the smart
                readiness of a large
                office building by
                applying the official
                Smart Readiness
                Indicator (SRI)
                methodology step by
                step.
              </p>

              <p>
                You will complete the
                assessment, interpret
                the results and explore
                guided improvement
                opportunities to
                enhance the
                building&apos;s smart
                readiness.
              </p>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={
                caseStudyBuildingImage
              }
              alt="Illustration of the office building used in the case study."
              className={`
                absolute
                bottom-0
                right-0
                max-h-[200px]
                w-full
                max-w-[610px]
                object-contain
                object-right-bottom
                ${
                  isUnlocked
                    ? ""
                    : "grayscale opacity-40"
                }
              `}
            />
          </div>
        </div>

        <section
          aria-labelledby="learning-objectives-title"
          className={`
            mt-10
            rounded-3xl
            border
            p-5
            shadow-sm
            sm:p-6
            md:p-7
            ${
              isUnlocked
                ? `
                    border-white
                    bg-white
                  `
                : `
                    border-slate-200
                    bg-white/65
                  `
            }
          `}
        >
          <div>
            <h3
              id="learning-objectives-title"
              className={`
                text-base
                font-extrabold
                uppercase
                tracking-[0.18em]
                ${
                  isUnlocked
                    ? "text-blue-700"
                    : "text-slate-500"
                }
              `}
            >
              Learning Objectives
            </h3>

            <p
              className={`
                mt-2
                text-sm
                font-semibold
                ${
                  isUnlocked
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              By completing this case
              study, you will learn how
              to:
            </p>
          </div>

          <div className="mt-5 grid gap-x-10 gap-y-5 lg:grid-cols-2">
            {learningObjectives.map(
              (objective) => (
                <ObjectiveItem
                  key={
                    objective.title
                  }
                  icon={
                    objective.icon
                  }
                  title={
                    objective.title
                  }
                  description={
                    objective.description
                  }
                  unlocked={
                    isUnlocked
                  }
                />
              ),
            )}
          </div>
        </section>

        {isUnlocked ? (
          <div className="mt-6">
            {hasCurrentAttemptStarted ||
            hasCompletedCaseStudy ? (
              <CaseStudyProgressStatus
                hasCompletedCaseStudy={
                  hasCompletedCaseStudy
                }
                isCurrentAttemptCompleted={
                  isCurrentAttemptCompleted
                }
                hasCurrentAttemptStarted={
                  hasCurrentAttemptStarted
                }
                stageLabel={
                  progressPresentation
                    .stageLabel
                }
              />
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                disabled={
                  !nextAction ||
                  isCaseStudyProgressLoading ||
                  caseStudyProgressError !==
                    null
                }
                onClick={
                  handlePrimaryAction
                }
                className="
                  group
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-blue-700
                  px-6
                  py-3.5
                  text-base
                  font-bold
                  text-white
                  shadow-sm
                  transition-colors
                  duration-200
                  hover:bg-blue-800
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-blue-100
                  disabled:cursor-not-allowed
                  disabled:!bg-blue-700
                  disabled:!text-white
                  disabled:!opacity-100
                  sm:w-auto
                "
              >
                {isCaseStudyProgressLoading
                  ? "Loading..."
                  : nextAction?.label ??
                    "Start Case Study"}

                <ForwardArrowIcon
                  size={20}
                />
              </button>

              {isCurrentAttemptCompleted ? (
                <button
                  type="button"
                  onClick={() => {
                    void handlePracticeAgain();
                  }}
                  disabled={
                    isStartingPracticeAgain
                  }
                  className="
                    inline-flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-blue-200
                    bg-white
                    px-6
                    py-3.5
                    text-base
                    font-bold
                    text-blue-700
                    shadow-sm
                    transition-colors
                    duration-200
                    hover:bg-blue-50
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-blue-100
                    sm:w-auto
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <RotateCcw
                    size={18}
                    aria-hidden="true"
                  />

                  {isStartingPracticeAgain
                    ? "Starting..."
                    : "Practice Again"}
                </button>
              ) : null}
            </div>

            {caseStudyProgressError ? (
              <p
                role="alert"
                className="mt-3 text-sm font-semibold text-red-600"
              >
                {
                  caseStudyProgressError
                }
              </p>
            ) : null}
          </div>
        ) : (
          <LockedCaseStudyMessage
            completedSections={
              completedSections
            }
            totalSections={
              totalSections
            }
          />
        )}
      </section>
    </div>
  );
};

type CaseStudyProgressStatusProps = {
  hasCompletedCaseStudy: boolean;
  isCurrentAttemptCompleted: boolean;
  hasCurrentAttemptStarted: boolean;
  stageLabel: string;
};

const CaseStudyProgressStatus = ({
  hasCompletedCaseStudy,
  isCurrentAttemptCompleted,
  hasCurrentAttemptStarted,
  stageLabel,
}: CaseStudyProgressStatusProps) => {
  if (
    hasCompletedCaseStudy &&
    isCurrentAttemptCompleted
  ) {
    return (
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-700">
        <CheckCircle2
          size={18}
          className="shrink-0"
          aria-hidden="true"
        />

        <span className="font-extrabold">
          Case Study Completed
        </span>
      </div>
    );
  }

  if (
    hasCompletedCaseStudy &&
    hasCurrentAttemptStarted
  ) {
    return (
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <CheckCircle2
            size={18}
            className="shrink-0"
            aria-hidden="true"
          />

          <span className="font-extrabold">
            Case Study Completed
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Clock3
            size={18}
            className="shrink-0 text-blue-700"
            aria-hidden="true"
          />

          <span>
            Practice in progress:{" "}
            <strong className="font-extrabold text-blue-950">
              {stageLabel}
            </strong>
          </span>
        </div>
      </div>
    );
  }

  if (hasCompletedCaseStudy) {
    return (
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-700">
        <CheckCircle2
          size={18}
          className="shrink-0"
          aria-hidden="true"
        />

        <span className="font-extrabold">
          Case Study Completed
        </span>
      </div>
    );
  }

  return (
    <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600">
      <Clock3
        size={18}
        className="shrink-0 text-blue-700"
        aria-hidden="true"
      />

      <span>
        Current stage:{" "}
        <strong className="font-extrabold text-blue-950">
          {stageLabel}
        </strong>
      </span>
    </div>
  );
};

type LockedCaseStudyMessageProps = {
  completedSections: number;
  totalSections: number;
};

const LockedCaseStudyMessage = ({
  completedSections,
  totalSections,
}: LockedCaseStudyMessageProps) => {
  return (
    <div
      className="
        mt-6
        flex
        items-start
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        px-4
        py-4
      "
    >
      <LockKeyhole
        size={19}
        strokeWidth={2.2}
        className="mt-0.5 shrink-0 text-slate-400"
        aria-hidden="true"
      />

      <p className="text-sm font-semibold leading-6 text-slate-600">
        {completedSections} of{" "}
        {totalSections} theory
        sections completed.
        Complete all sections to
        unlock the practical case
        study.
      </p>
    </div>
  );
};

type ObjectiveItemProps =
  LearningObjective & {
    unlocked: boolean;
  };

const ObjectiveItem = ({
  icon: Icon,
  title,
  description,
  unlocked,
}: ObjectiveItemProps) => {
  return (
    <div
      className="
        grid
        min-w-0
        grid-cols-[44px_minmax(0,1fr)]
        gap-x-4
        gap-y-1
      "
    >
      <div
        className={`
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-2xl

          sm:row-span-2

          ${
            unlocked
              ? `
                  bg-blue-50
                  text-blue-700
                `
              : `
                  bg-slate-100
                  text-slate-400
                `
          }
        `}
      >
        <Icon
          className="h-[22px] w-[22px]"
          aria-hidden="true"
        />
      </div>

      <h4
        className={`
          min-w-0
          break-words
          text-sm
          font-extrabold
          leading-5

          ${
            unlocked
              ? "text-blue-950"
              : "text-slate-500"
          }
        `}
      >
        {title}
      </h4>

      <p
        className={`
          col-span-2
          break-words
          text-sm
          font-semibold
          leading-6

          sm:col-span-1
          sm:col-start-2

          ${
            unlocked
              ? "text-slate-600"
              : "text-slate-400"
          }
        `}
      >
        {description}
      </p>
    </div>
  );
};

export default CaseStudyPage;