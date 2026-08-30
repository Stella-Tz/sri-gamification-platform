// client/src/features/course/data/courseAchievements.ts

import type {
  TheorySectionId,
} from "../../theory/types/theory.types";

import type {
  CourseAchievement,
  CourseSectionAchievementId,
} from "../course.types";

type CourseAchievementMetadata =
  Omit<
    CourseAchievement,
    "id"
  >;

const courseSectionAchievementDefinitions = {
  "introduction-to-sri": {
    title: "SRI Foundations",
    icon: "BookOpenCheck",
  },

  "sri-assessment-framework": {
    title: "Assessment Framework Explorer",
    icon: "Workflow",
  },

  "heating-domain": {
    title: "Heating Specialist",
    icon: "Flame",
  },

  "cooling-domain": {
    title: "Cooling Specialist",
    icon: "Snowflake",
  },

  "domestic-hot-water-domain": {
    title: "Domestic Hot Water Specialist",
    icon: "Droplets",
  },

  "ventilation-domain": {
    title: "Ventilation Specialist",
    icon: "Wind",
  },

  "lighting-domain": {
    title: "Lighting Specialist",
    icon: "Lightbulb",
  },

  "dynamic-building-envelope-domain": {
    title: "Dynamic Envelope Specialist",
    icon: "PanelsTopLeft",
  },

  "electricity-domain": {
    title: "Electricity Specialist",
    icon: "Zap",
  },

  "electric-vehicle-charging-domain": {
    title: "EV Charging Specialist",
    icon: "BatteryCharging",
  },

  "monitoring-and-control-domain": {
    title: "Monitoring and Control Specialist",
    icon: "SlidersHorizontal",
  },
} satisfies Readonly<
  Record<
    TheorySectionId,
    CourseAchievementMetadata
  >
>;

const courseSectionAchievements:
  Readonly<
    Record<
      string,
      CourseAchievementMetadata
    >
  > =
  courseSectionAchievementDefinitions;

const getSectionAchievementId = (
  sectionId: TheorySectionId,
): CourseSectionAchievementId => {
  return `section-badge-${sectionId}`;
};

export const getCourseSectionAchievement = (
  sectionId: TheorySectionId,
): CourseAchievement => {
  const achievement =
    courseSectionAchievements[
      sectionId
    ];

  if (!achievement) {
    throw new Error(
      `No course achievement has been registered for section "${sectionId}".`,
    );
  }

  return {
    id:
      getSectionAchievementId(
        sectionId,
      ),

    title:
      achievement.title,

    icon:
      achievement.icon,
  };
};

export const caseStudyAchievement:
  CourseAchievement = {
  id: "case-study-achievement",
  title: "SRI Practitioner",
  icon: "BadgeCheck",
};