// client/src/features/course/components/CourseProgressCard.tsx

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";

import {
  getCurrentStepActionLabel,
} from "../course.routes";

import type {
  CourseOverviewView,
} from "../course.types";

type CourseProgressCardProps = {
  overview: CourseOverviewView;
  onContinue: () => void;
};

const clampPercentage = (
  value: number,
): number => {
  return Math.min(
    100,
    Math.max(0, value),
  );
};

const CourseProgressCard = ({
  overview,
  onContinue,
}: CourseProgressCardProps) => {
  const currentSection =
    overview.sections.find(
      (section) =>
        section.id ===
        overview.currentSectionId,
    ) ?? null;

  const currentStep =
    overview.currentStep;

  const progressPercentage =
    clampPercentage(
      overview.progressPercentage,
    );

  const isCourseCompleted =
    overview.totalSections > 0 &&
    overview.completedSections ===
      overview.totalSections;

  return (
    <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
      <div className="p-5 sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
          {isCourseCompleted
            ? "Course Progress"
            : "Continue Learning"}
        </p>

        <h2 className="mt-3 break-words text-xl font-extrabold tracking-tight text-blue-950 sm:text-2xl">
          {isCourseCompleted
            ? "Theory Course Completed"
            : currentSection?.title ??
              "Continue Your Course"}
        </h2>

        {isCourseCompleted ? (
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            The practical case study
            is now available.
          </p>
        ) : null}

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Course Progress
            </span>

            <span className="text-sm font-extrabold text-blue-700">
              {progressPercentage}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Overall course progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              progressPercentage
            }
            className="h-2.5 overflow-hidden rounded-full bg-slate-200"
          >
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-400
                to-indigo-500
                transition-[width]
                duration-300
                motion-reduce:transition-none
              "
              style={{
                width:
                  `${progressPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-blue-100 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-500">
            <span className="font-bold text-slate-700">
              {overview.completedSections}{" "}
              of{" "}
              {overview.totalSections}
            </span>{" "}
            sections completed
          </p>

          {currentStep ? (
            <PrimaryButton
              type="button"
              onClick={onContinue}
              className="group w-full justify-center sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                {getCurrentStepActionLabel(
                  currentStep,
                )}

                <ForwardArrowIcon />
              </span>
            </PrimaryButton>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CourseProgressCard;