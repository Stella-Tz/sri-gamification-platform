// client/src/features/course/utils/buildCourseOverview.ts

import type {
  CourseDefinition,
  CourseOverviewView,
  CourseSectionStatus,
  CourseSectionView,
  CourseStepDefinition,
  CourseStepStatus,
  CourseStepView,
  UserCourseProgress,
} from "../course.types";

import {
  isCourseStepCompleted,
} from "./courseProgress.utils";

const getStepStatus = (
  step: CourseStepDefinition,
  currentStepId: string | null,
  progress: UserCourseProgress,
): CourseStepStatus => {
  if (
    isCourseStepCompleted(
      progress,
      step,
    )
  ) {
    return "completed";
  }

  if (
    step.id === currentStepId
  ) {
    return "current";
  }

  return "locked";
};

const getSectionStatus = (
  steps:
    readonly CourseStepView[],
): CourseSectionStatus => {
  const finalTest =
    steps.find(
      (step) =>
        step.type ===
        "final-test",
    );

  if (
    finalTest?.status ===
    "completed"
  ) {
    return "completed";
  }

  if (
    steps.some(
      (step) =>
        step.status ===
        "current",
    )
  ) {
    return "current";
  }

  return "locked";
};

export const buildCourseOverview = (
  definition: CourseDefinition,
  progress: UserCourseProgress,
): CourseOverviewView => {
  const allSteps =
    definition.sections.flatMap(
      (section) =>
        section.steps,
    );

  const currentStepDefinition =
    allSteps.find(
      (step) =>
        !isCourseStepCompleted(
          progress,
          step,
        ),
    ) ?? null;

  const currentStepId =
    currentStepDefinition?.id ??
    null;

  const sections:
    CourseSectionView[] =
    definition.sections.map(
      (section) => {
        const steps:
          CourseStepView[] =
          section.steps.map(
            (step) => ({
              ...step,

              status:
                getStepStatus(
                  step,
                  currentStepId,
                  progress,
                ),
            }),
          );

        const status =
          getSectionStatus(steps);

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

  const completedSteps =
    allSteps.filter(
      (step) =>
        isCourseStepCompleted(
          progress,
          step,
        ),
    ).length;

  const totalSteps =
    allSteps.length;

  const progressPercentage =
    totalSteps === 0
      ? 0
      : Math.round(
          (
            completedSteps /
            totalSteps
          ) * 100,
        );

  const completedSections =
    sections.filter(
      (section) =>
        section.status ===
        "completed",
    ).length;

  const currentSection =
    sections.find(
      (section) =>
        section.status ===
        "current",
    ) ?? null;

  const currentStep =
    currentSection?.steps.find(
      (step) =>
        step.status ===
        "current",
    ) ?? null;

  const isCaseStudyUnlocked =
    sections.length > 0 &&
    completedSections ===
      sections.length;

  return {
    id: definition.id,
    title: definition.title,
    subtitle:
      definition.subtitle,

    progressPercentage,
    completedSteps,
    totalSteps,

    completedSections,
    totalSections:
      sections.length,

    currentSectionId:
      currentSection?.id ??
      null,

    currentStep,

    sections,

    isCaseStudyUnlocked,
  };
};
