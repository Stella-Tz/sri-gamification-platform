// client/src/features/course/components/CourseSectionCard.tsx

import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";

import {
  getCurrentStepActionLabel,
} from "../course.routes";

import type {
  CourseSectionView,
  CourseStepView,
} from "../course.types";

import AchievementBadgePreview from "./AchievementBadgePreview";
import CourseStatusBadge from "./CourseStatusBadge";
import CourseStepCard from "./CourseStepCard";

type CourseSectionCardProps = {
  section: CourseSectionView;
  expanded: boolean;
  onToggle: () => void;
  onOpenStep: (
    step: CourseStepView,
  ) => void;
};

const CourseSectionCard = ({
  section,
  expanded,
  onToggle,
  onOpenStep,
}: CourseSectionCardProps) => {
  const currentStep =
    section.steps.find(
      (step) =>
        step.status === "current",
    ) ?? null;

  const contentId =
    `course-section-${section.id}-content`;

  return (
    <article className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
      <div className="p-5 sm:p-6 md:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-sm font-extrabold text-white">
                {String(
                  section.order,
                ).padStart(
                  2,
                  "0",
                )}
              </div>

              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
                Section
              </p>
            </div>

            <h2 className="mt-5 max-w-3xl break-words text-xl font-extrabold leading-tight text-blue-950 sm:text-2xl">
              {section.title}
            </h2>

            <div
              className="mt-3 h-1 w-14 rounded-full bg-blue-600"
              aria-hidden="true"
            />

            <p className="mt-4 max-w-4xl break-words text-sm font-semibold leading-7 text-slate-600">
              {section.description}
            </p>

            <div className="mt-5">
              <AchievementBadgePreview
                achievement={
                  section.achievement
                }
                unlocked={
                  section.achievementUnlocked
                }
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 lg:justify-end">
            <CourseStatusBadge
              status={section.status}
            />

            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-controls={contentId}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-md
                px-1
                py-1
                text-sm
                font-extrabold
                text-slate-500
                transition-colors
                duration-200
                hover:text-blue-700
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-blue-100
              "
            >
              {expanded
                ? "Hide"
                : "Show"}

              {expanded ? (
                <ChevronUp
                  size={16}
                  aria-hidden="true"
                />
              ) : (
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {expanded ? (
          <div
            id={contentId}
            className="mt-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {section.steps.map(
                (step) => (
                  <div
                    key={step.id}
                    className={
                      step.type ===
                      "final-test"
                        ? "min-w-0 md:col-span-2"
                        : "min-w-0"
                    }
                  >
                    <CourseStepCard
                      step={step}
                      onOpen={onOpenStep}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        ) : null}
      </div>

      {expanded &&
      section.status === "current" &&
      currentStep ? (
        <div className="border-t border-blue-100 bg-blue-50/25 px-5 py-5 sm:px-6 md:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
                Next Step
              </p>

              <p className="mt-1 break-words text-sm font-extrabold text-blue-950">
                {currentStep.title}
              </p>
            </div>

            <PrimaryButton
              type="button"
              onClick={() =>
                onOpenStep(
                  currentStep,
                )
              }
              className="group w-full justify-center sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                {getCurrentStepActionLabel(
                  currentStep,
                )}

                <ForwardArrowIcon />
              </span>
            </PrimaryButton>
          </div>
        </div>
      ) : null}
    </article>
  );
};

export default CourseSectionCard;
