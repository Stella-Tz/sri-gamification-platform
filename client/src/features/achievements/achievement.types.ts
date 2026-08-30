export type AchievementCategory =
  | "course-section"
  | "case-study";

export type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
};