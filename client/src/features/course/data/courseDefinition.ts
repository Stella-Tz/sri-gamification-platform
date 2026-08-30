// client/src/features/course/data/courseDefinition.ts

import {
  getTheoryLessonById,
  getTheorySections,
} from "../../theory/utils/theoryContent.utils";

import type {
  TheoryLesson,
  TheoryLessonId,
  TheorySection,
  TheorySectionId,
} from "../../theory/types/theory.types";

import type {
  CourseDefinition,
  CourseFinalTestId,
  CourseQuizId,
  CourseSectionDefinition,
  CourseStepDefinition,
} from "../course.types";

import {
  getCourseSectionAchievement,
} from "./courseAchievements";

export const getLessonQuizId = (
  lessonId: TheoryLessonId,
): CourseQuizId => {
  return `quiz-${lessonId}`;
};

export const getSectionFinalTestId = (
  sectionId: TheorySectionId,
): CourseFinalTestId => {
  return `final-test-${sectionId}`;
};

const getRequiredTheoryLesson = (
  sectionId: TheorySectionId,
  lessonId: TheoryLessonId,
): TheoryLesson => {
  const lesson =
    getTheoryLessonById(lessonId);

  if (
    !lesson ||
    lesson.sectionId !== sectionId
  ) {
    throw new Error(
      `Invalid theory lesson "${lessonId}" in section "${sectionId}".`,
    );
  }

  return lesson;
};


const buildSectionSteps = (
  section: TheorySection,
): readonly CourseStepDefinition[] => {
  const steps:
    CourseStepDefinition[] = [];

  section.lessonIds.forEach(
    (lessonId, index) => {
      const lesson =
        getRequiredTheoryLesson(
          section.id,
          lessonId,
        );

      const lessonOrder =
        index * 2 + 1;

      const quizOrder =
        lessonOrder + 1;

      steps.push({
        id: lesson.id,
        sectionId: section.id,
        lessonId: lesson.id,
        type: "lesson",
        order: lessonOrder,
        title: lesson.title,
        subtitle: lesson.question,
      });

      steps.push({
        id: getLessonQuizId(
          lesson.id,
        ),
        sectionId: section.id,
        lessonId: lesson.id,
        type: "quiz",
        order: quizOrder,
        title:
          `${lesson.title} Quiz`,
        subtitle:
          "Check your understanding through a short learning quiz with feedback.",
      });
    },
  );

  steps.push({
    id: getSectionFinalTestId(
      section.id,
    ),
    sectionId: section.id,
    type: "final-test",
    order:
      section.lessonIds.length * 2 +
      1,
    title:
      `${
        section.shortTitle ??
        section.title
      } Final Test`,
    subtitle:
      "Complete the section assessment to earn its achievement and unlock the next section.",
  });

  return steps;
};

const buildCourseSection = (
  section: TheorySection,
): CourseSectionDefinition => {
  return {
    id: section.id,
    order: section.order,
    title: section.title,

    shortTitle:
      section.shortTitle ??
      section.title,

    description:
      section.description,

    learningGoal:
      section.learningGoal,

    achievement:
      getCourseSectionAchievement(
        section.id,
      ),

    steps:
      buildSectionSteps(
        section,
      ),
  };
};

export const courseDefinition:
  CourseDefinition = {
  id: "sri-course",

  title:
    "Smart Readiness Indicator Course",

  subtitle:
    "Complete each lesson, learning quiz and final section test to progress through the course and unlock the practical case study.",

  sections:
    getTheorySections().map(
      buildCourseSection,
    ),
};
