//client\src\features\course\components\CourseStatusBadge.tsx

import type {
  CourseSectionStatus,
} from "../course.types";

type CourseStatus =
  | CourseSectionStatus
  | "available";

type CourseStatusBadgeProps = {
  status: CourseStatus;
};

const statusConfig:
  Record<
    CourseStatus,
    {
      label: string;
      className: string;
    }
  > = {
  completed: {
    label: "Completed",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  current: {
    label: "Current",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  available: {
    label: "Available",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  locked: {
    label: "Locked",
    className:
      "border-slate-200 bg-slate-100 text-slate-500",
  },
};

const CourseStatusBadge = ({
  status,
}: CourseStatusBadgeProps) => {
  const config =
    statusConfig[status];

  return (
    <span
      className={`
        inline-flex
        w-fit
        shrink-0
        min-h-8
        items-center
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-extrabold
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
};

export default CourseStatusBadge;