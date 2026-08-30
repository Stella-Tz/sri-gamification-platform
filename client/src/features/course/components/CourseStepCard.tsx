import {
  BookOpen,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  LockKeyhole,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";

import type {
  CourseStepView,
} from "../course.types";

type CourseStepCardProps = {
  step: CourseStepView;

  onOpen: (
    step: CourseStepView,
  ) => void;
};

type StepPresentation = {
  label: string;
  Icon: LucideIcon;
};

const CourseStepCard = ({
  step,
  onOpen,
}: CourseStepCardProps) => {
  const isCurrent =
    step.status === "current";

  const isCompleted =
    step.status === "completed";

  const isLocked =
    step.status === "locked";

  const presentation =
    getStepPresentation(step);

  const cardContent = (
    <>
      <div
        className={`
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-2xl
          ring-1
          transition-colors
          duration-200
          ${getIconClasses(
            step.status,
          )}
        `}
      >
        <presentation.Icon
          size={21}
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`
            text-xs
            font-extrabold
            uppercase
            tracking-[0.16em]
            transition-colors
            duration-200
            ${getLabelClasses(
              step.status,
            )}
          `}
        >
          {presentation.label}
        </p>

        <h3
          className={`
            mt-1
            break-words
            text-sm
            font-extrabold
            leading-5
            transition-colors
            duration-200
            ${getTitleClasses(
              step.status,
            )}
          `}
        >
          {step.title}
        </h3>

        <p
          className={`
            mt-1.5
            break-words
            text-xs
            font-medium
            leading-5
            transition-colors
            duration-200
            ${getSubtitleClasses(
              step.status,
            )}
          `}
        >
          {step.subtitle}
        </p>
      </div>

      <div className="mt-1 flex shrink-0 items-center justify-center">
        {isCurrent ? (
          <>
            <span
              className="
                inline-flex
                text-blue-500
                transition-colors
                duration-200
                group-hover:text-blue-800
              "
            >
              <ForwardArrowIcon />
            </span>

            <span className="sr-only">
              Current step
            </span>
          </>
        ) : null}

        {isCompleted ? (
          <>
            <CheckCircle2
              size={18}
              strokeWidth={2.3}
              className="
                text-emerald-600
                transition-colors
                duration-200
                group-hover:text-emerald-800
              "
              aria-hidden="true"
            />

            <span className="sr-only">
              Completed
            </span>
          </>
        ) : null}

        {isLocked ? (
          <>
            <LockKeyhole
              size={17}
              strokeWidth={2.2}
              className="text-slate-400"
              aria-hidden="true"
            />

            <span className="sr-only">
              Locked
            </span>
          </>
        ) : null}
      </div>
    </>
  );

  if (isLocked) {
    return (
      <article
        aria-disabled="true"
        className={`
          flex
          h-full
          min-w-0
          cursor-default
          items-start
          gap-4
          rounded-2xl
          border
          p-4
          sm:p-5
          ${getCardClasses(
            step.status,
          )}
        `}
      >
        {cardContent}
      </article>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        onOpen(step)
      }
      aria-current={
        isCurrent
          ? "step"
          : undefined
      }
      aria-label={
        isCompleted
          ? `Review ${step.title}`
          : `Open ${step.title}`
      }
      className={`
        group
        flex
        h-full
        w-full
        min-w-0
        cursor-pointer
        items-start
        gap-4
        rounded-2xl
        border
        p-4
        text-left
        transition-[background-color,border-color,box-shadow]
        duration-200
        focus-visible:outline-none
        focus-visible:ring-4
        sm:p-5
        ${getCardClasses(
          step.status,
        )}
        ${getFocusClasses(
          step.status,
        )}
      `}
    >
      {cardContent}
    </button>
  );
};

const getStepPresentation = (
  step: CourseStepView,
): StepPresentation => {
  if (
    step.type === "final-test"
  ) {
    return {
      label: "Final Test",
      Icon: ClipboardCheck,
    };
  }

  const itemNumber =
    Math.ceil(step.order / 2);

  if (
    step.type === "lesson"
  ) {
    return {
      label:
        `Lesson ${itemNumber}`,
      Icon: BookOpen,
    };
  }

  return {
    label:
      `Quiz ${itemNumber}`,
    Icon: CircleHelp,
  };
};

const getCardClasses = (
  status:
    CourseStepView["status"],
): string => {
  switch (status) {
    case "current":
      return `
        border-blue-300
        bg-blue-50/70
        hover:border-blue-500
        hover:bg-blue-100/70
        hover:shadow-sm
      `;

    case "completed":
      return `
        border-emerald-300
        bg-emerald-50/60
        hover:border-emerald-500
        hover:bg-emerald-100/60
        hover:shadow-sm
      `;

    case "locked":
      return `
        border-slate-200
        bg-slate-50/80
      `;
  }
};

const getFocusClasses = (
  status:
    CourseStepView["status"],
): string => {
  switch (status) {
    case "current":
      return `
        focus-visible:ring-blue-100
      `;

    case "completed":
      return `
        focus-visible:ring-emerald-100
      `;

    case "locked":
      return "";
  }
};

const getIconClasses = (
  status:
    CourseStepView["status"],
): string => {
  switch (status) {
    case "current":
      return `
        bg-blue-100
        text-blue-700
        ring-blue-200
        group-hover:bg-blue-200
        group-hover:text-blue-800
        group-hover:ring-blue-300
      `;

    case "completed":
      return `
        bg-emerald-100
        text-emerald-700
        ring-emerald-200
        group-hover:bg-emerald-200
        group-hover:text-emerald-800
        group-hover:ring-emerald-300
      `;

    case "locked":
      return `
        bg-slate-100
        text-slate-400
        ring-slate-200
      `;
  }
};

const getLabelClasses = (
  status:
    CourseStepView["status"],
): string => {
  switch (status) {
    case "current":
      return `
        text-blue-700
        group-hover:text-blue-800
      `;

    case "completed":
      return `
        text-emerald-700
        group-hover:text-emerald-800
      `;

    case "locked":
      return "text-slate-400";
  }
};

const getTitleClasses = (
  status:
    CourseStepView["status"],
): string => {
  switch (status) {
    case "current":
      return `
        text-blue-950
        group-hover:text-blue-800
      `;

    case "completed":
      return `
        text-emerald-950
        group-hover:text-emerald-800
      `;

    case "locked":
      return "text-slate-500";
  }
};

const getSubtitleClasses = (
  status:
    CourseStepView["status"],
): string => {
  switch (status) {
    case "current":
      return `
        text-slate-600
        group-hover:text-slate-700
      `;

    case "completed":
      return `
        text-slate-600
        group-hover:text-slate-700
      `;

    case "locked":
      return "text-slate-400";
  }
};

export default CourseStepCard;