//client\src\features\course\utils\buildCourseOverview.ts

import type {
  CourseDefinition,
  CourseOverviewView,
  CourseSectionView,
  CourseStepView,
  UserCourseProgress,
} from "../course.types";

/**
 * Presentation adapter only.
 *
 * Course availability, current/completed/locked
 * statuses, progress counts and Case Study unlock
 * state are already decided by the backend.
 *
 * This function only combines those canonical
 * journey values with the static presentation
 * metadata in courseDefinition.
 */
export const buildCourseOverview = (
  definition: CourseDefinition,
  progress: UserCourseProgress,
): CourseOverviewView => {
  const stepProgressById =
    new Map(
      progress.steps.map(
        (step) => [
          step.stepId,
          step,
        ],
      ),
    );

  const sectionProgressById =
    new Map(
      progress.sections.map(
        (section) => [
          section.sectionId,
          section,
        ],
      ),
    );

  const sections:
    CourseSectionView[] =
      definition.sections.map(
        (section) => {
          const backendSection =
            sectionProgressById.get(
              section.id,
            );

          const status =
            backendSection?.status ??
            "locked";

          const steps:
            CourseStepView[] =
              section.steps.map(
                (step) => ({
                  ...step,

                  status:
                    stepProgressById
                      .get(step.id)
                      ?.status ??
                    "locked",
                }),
              );

          return {
            ...section,

            status,

            achievementUnlocked:
              status ===
              "completed",

            steps,
          };
        },
      );

  const currentStep =
    progress.currentStepId
      ? (
          sections
            .flatMap(
              (section) =>
                section.steps,
            )
            .find(
              (step) =>
                step.id ===
                progress.currentStepId,
            ) ??
          null
        )
      : null;

  const currentSectionId =
    currentStep?.sectionId ??
    null;

  return {
    id: definition.id,
    title: definition.title,
    subtitle:
      definition.subtitle,

    progressPercentage:
      progress.progressPercentage,

    completedSteps:
      progress.completedSteps,

    totalSteps:
      progress.totalSteps,

    completedSections:
      progress.completedSections,

    totalSections:
      progress.totalSections,

    currentSectionId,
    currentStep,

    sections,

    isCaseStudyUnlocked:
      progress.isCaseStudyUnlocked,
  };
};
