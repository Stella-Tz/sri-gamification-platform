// client/src/features/theory/hooks/useTheoryLesson.ts

import { useCallback, useMemo } from "react";

import {
  getNextTheoryLesson,
  getPreviousTheoryLesson,
  getTheoryLessonBySectionAndId,
  getTheorySectionById,
  getTheorySourcesByIds,
} from "../utils/theoryContent.utils";

import type {
  TheoryContentBlock,
  TheoryLessonId,
  TheorySectionId,
} from "../types/theory.types";

export const useTheoryLesson = (
  sectionId?: TheorySectionId,
  lessonId?: TheoryLessonId
) => {
  const lesson = useMemo(() => {
    if (!sectionId || !lessonId) {
      return undefined;
    }

    return getTheoryLessonBySectionAndId(sectionId, lessonId);
  }, [sectionId, lessonId]);

  const section = useMemo(() => {
    if (!sectionId) {
      return undefined;
    }

    return getTheorySectionById(sectionId);
  }, [sectionId]);

  const previousLesson = useMemo(() => {
    if (!lesson?.previousLessonId) {
      return undefined;
    }

    return getPreviousTheoryLesson(lesson.id);
  }, [lesson]);

  const nextLesson = useMemo(() => {
    if (!lesson?.nextLessonId) {
      return undefined;
    }

    return getNextTheoryLesson(lesson.id);
  }, [lesson]);

  const getBlockSources = useCallback((block: TheoryContentBlock) => {
    if (!block.sourceRefs?.length) {
      return [];
    }

    return getTheorySourcesByIds(block.sourceRefs);
  }, []);

  return {
    lesson,
    section,
    previousLesson,
    nextLesson,
    getBlockSources,
    isFound: Boolean(section && lesson),
  };
};