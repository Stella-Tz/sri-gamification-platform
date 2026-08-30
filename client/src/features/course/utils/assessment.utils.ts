// client/src/features/course/utils/assessment.utils.ts

import type {
  CourseFinalTestId,
  CourseQuestion,
  FinalTestAttempt,
} from "../course.types";

import type {
  TheorySectionId,
} from "../../theory/types/theory.types";

export const shuffleItems = <T,>(
  items: readonly T[],
): T[] => {
  const shuffledItems = [
    ...items,
  ];

  for (
    let index =
      shuffledItems.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
          (index + 1),
      );

    [
      shuffledItems[index],
      shuffledItems[randomIndex],
    ] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
};

export const prepareFinalTestQuestions = (
  questions:
    readonly CourseQuestion[],
): readonly CourseQuestion[] => {
  return shuffleItems(
    questions,
  ).map((question) => ({
    ...question,
    options: shuffleItems(
      question.options,
    ),
  }));
};

export const calculateAccuracyPercentage = (
  correctCount: number,
  totalQuestions: number,
): number => {
  if (totalQuestions <= 0) {
    return 0;
  }

  return Math.round(
    (correctCount /
      totalQuestions) *
      100,
  );
};

export const createFinalTestSessionId =
  (): string => {
    const randomUuid =
      globalThis.crypto
        ?.randomUUID?.();

    if (randomUuid) {
      return randomUuid;
    }

    return [
      "final-test-attempt",
      Date.now(),
      Math.random()
        .toString(36)
        .slice(2),
    ].join("-");
  };

type CreateFinalTestAttemptOptions = {
  id: string;
  sectionId: TheorySectionId;
  finalTestId: CourseFinalTestId;

  correctCount: number;
  wrongCount: number;
  totalQuestions: number;

  passed: boolean;
};

export const createFinalTestAttempt = ({
  id,
  sectionId,
  finalTestId,

  correctCount,
  wrongCount,
  totalQuestions,

  passed,
}: CreateFinalTestAttemptOptions): FinalTestAttempt => {
  return {
    id,
    sectionId,
    finalTestId,

    correctCount,
    wrongCount,
    totalQuestions,

    accuracyPercentage:
      calculateAccuracyPercentage(
        correctCount,
        totalQuestions,
      ),

    passed,
    completedAt:
      new Date().toISOString(),
  };
};