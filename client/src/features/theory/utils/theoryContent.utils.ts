// client/src/features/theory/utils/theoryContent.utils.ts

import { theoryLessons } from "../data/theoryLessons";
import { theorySections } from "../data/theorySections";
import { theorySources } from "../data/theorySources";

import type {
  TheoryLesson,
  TheoryLessonId,
  TheorySection,
  TheorySectionId,
  TheorySource,
  TheorySourceId,
} from "../types/theory.types";

export const getTheorySections = (): readonly TheorySection[] => {
  return [...theorySections].sort((a, b) => a.order - b.order);
};

export const getTheorySectionById = (
  sectionId: TheorySectionId
): TheorySection | undefined => {
  return theorySections.find((section) => section.id === sectionId);
};

export const getTheoryLessons = (): readonly TheoryLesson[] => {
  return [...theoryLessons].sort((a, b) => a.order - b.order);
};

export const getTheoryLessonById = (
  lessonId: TheoryLessonId
): TheoryLesson | undefined => {
  return theoryLessons.find((lesson) => lesson.id === lessonId);
};

export const getTheoryLessonsBySectionId = (
  sectionId: TheorySectionId
): readonly TheoryLesson[] => {
  return theoryLessons
    .filter((lesson) => lesson.sectionId === sectionId)
    .sort((a, b) => a.order - b.order);
};

export const getTheorySourceById = (
  sourceId: TheorySourceId
): TheorySource | undefined => {
  return theorySources.find((source) => source.id === sourceId);
};

export const getTheorySourcesByIds = (
  sourceIds: readonly TheorySourceId[],
): readonly TheorySource[] => {
  return sourceIds.flatMap((sourceId) => {
    const source = getTheorySourceById(sourceId);

    if (!source) {
      if (import.meta.env.DEV) {
        console.warn(`Unknown theory source: ${sourceId}`);
      }

      return [];
    }

    return [source];
  });
};

export const getNextTheoryLesson = (
  lessonId: TheoryLessonId
): TheoryLesson | undefined => {
  const lesson = getTheoryLessonById(lessonId);

  if (!lesson?.nextLessonId) {
    return undefined;
  }

  return getTheoryLessonById(lesson.nextLessonId);
};

export const getPreviousTheoryLesson = (
  lessonId: TheoryLessonId
): TheoryLesson | undefined => {
  const lesson = getTheoryLessonById(lessonId);

  if (!lesson?.previousLessonId) {
    return undefined;
  }

  return getTheoryLessonById(lesson.previousLessonId);
};

export const getTheoryLessonBySectionAndId = (
  sectionId: TheorySectionId,
  lessonId: TheoryLessonId
): TheoryLesson | undefined => {
  return theoryLessons.find(
    (lesson) => lesson.sectionId === sectionId && lesson.id === lessonId
  );
};