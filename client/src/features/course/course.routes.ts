//client\src\features\course\course.routes.ts

import {
  COURSE_ROUTES,
} from "../../constants/routes";

import type {
  CourseStepDefinition,
  CourseStepView,
} from "./course.types";

type RoutableCourseStep =
  | CourseStepDefinition
  | CourseStepView;

export const getCourseStepPath = (
  step: RoutableCourseStep,
): string => {
  switch (step.type) {
    case "lesson":
      return COURSE_ROUTES.lesson(
        step.sectionId,
        step.lessonId,
      );

    case "quiz":
      return COURSE_ROUTES.quiz(
        step.sectionId,
        step.id,
      );

    case "final-test":
      return COURSE_ROUTES.finalTest(
        step.sectionId,
        step.id,
      );
  }
};

export const getCourseStepTypeLabel = (
  step: RoutableCourseStep,
): string => {
  switch (step.type) {
    case "lesson":
      return "Course Lesson";

    case "quiz":
      return "Learning Quiz";

    case "final-test":
      return "Final Section Test";
  }
};

export const getCurrentStepActionLabel = (
  step: RoutableCourseStep,
): string => {
  switch (step.type) {
    case "lesson":
      return "Continue Lesson";

    case "quiz":
      return "Continue Quiz";

    case "final-test":
      return "Continue Final Test";
  }
};