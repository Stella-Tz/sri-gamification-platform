// client/src/features/course/data/courseAchievementIcons.ts

import {
  BadgeCheck,
  BatteryCharging,
  BookOpenCheck,
  Droplets,
  Flame,
  Lightbulb,
  PanelsTopLeft,
  SlidersHorizontal,
  Snowflake,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import type {
  CourseAchievementIcon,
} from "../course.types";

const courseAchievementIconMap = {
  BookOpenCheck,
  Workflow,
  Flame,
  Snowflake,
  Droplets,
  Wind,
  Lightbulb,
  PanelsTopLeft,
  Zap,
  BatteryCharging,
  SlidersHorizontal,
  BadgeCheck,
} satisfies Record<
  CourseAchievementIcon,
  LucideIcon
>;

export const getCourseAchievementIcon = (
  icon:
    CourseAchievementIcon,
): LucideIcon => {
  return courseAchievementIconMap[
    icon
  ];
};
