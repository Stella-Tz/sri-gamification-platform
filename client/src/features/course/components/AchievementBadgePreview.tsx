// client/src/features/course/components/AchievementBadgePreview.tsx

import type {
  CourseAchievement,
} from "../course.types";

import {
  getCourseAchievementIcon,
} from "../data/courseAchievementIcons";

type AchievementBadgePreviewProps = {
  achievement:
    CourseAchievement;

  unlocked: boolean;
};

const AchievementBadgePreview = ({
  achievement,
  unlocked,
}: AchievementBadgePreviewProps) => {
  const AchievementIcon =
    getCourseAchievementIcon(
      achievement.icon,
    );

  return (
    <span
      aria-label={`${achievement.title}. ${
        unlocked
          ? "Achievement unlocked."
          : "Achievement locked."
      }`}
      className={`
        inline-flex
        min-h-8
        max-w-full
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-extrabold
        ${
          unlocked
            ? `
              border-amber-200
              bg-amber-50
              text-amber-700
            `
            : `
              border-slate-300
              bg-slate-100
              text-slate-500
            `
        }
      `}
    >
      <AchievementIcon
        size={15}
        strokeWidth={2.3}
        className="shrink-0"
        aria-hidden="true"
      />

      <span className="min-w-0 break-words">
        {achievement.title}
      </span>
    </span>
  );
};

export default AchievementBadgePreview;
