// client/src/features/course/hooks/useFinalTestSession.ts

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  CourseQuestion,
  FinalTestFeedback,
  FinalTestResult,
} from "../course.types";

import {
  calculateAccuracyPercentage,
  createFinalTestSessionId,
  prepareFinalTestQuestions,
} from "../utils/assessment.utils";

type UseFinalTestSessionOptions = {
  finalTestId: string;

  questionPool:
    readonly CourseQuestion[];

  allowedMistakes: number;
};

type FinalTestSessionState = {
  sessionId: string;

  questions:
    readonly CourseQuestion[];

  currentQuestionIndex: number;
  selectedOptionId:
    | string
    | null;

  feedback:
    FinalTestFeedback;

  isSubmitted: boolean;

  correctCount: number;
  wrongCount: number;

  result:
    FinalTestResult;
};

const createSessionState = (
  questionPool:
    readonly CourseQuestion[],
): FinalTestSessionState => {
  return {
    sessionId:
      createFinalTestSessionId(),

    questions:
      prepareFinalTestQuestions(
        questionPool,
      ),

    currentQuestionIndex: 0,
    selectedOptionId: null,

    feedback: "idle",
    isSubmitted: false,

    correctCount: 0,
    wrongCount: 0,

    result: "in-progress",
  };
};

export const useFinalTestSession = ({
  finalTestId,
  questionPool,
  allowedMistakes,
}: UseFinalTestSessionOptions) => {
  const createInitialState =
    useCallback(() => {
      return createSessionState(
        questionPool,
      );
    }, [questionPool]);

  const [
    state,
    setState,
  ] =
    useState<FinalTestSessionState>(
      createInitialState,
    );

  useEffect(() => {
    setState(
      createInitialState(),
    );
  }, [
    finalTestId,
    allowedMistakes,
    createInitialState,
  ]);

  const currentQuestion =
    state.questions[
      state.currentQuestionIndex
    ] ?? null;

  const totalQuestions =
    state.questions.length;

  const currentQuestionNumber =
    currentQuestion
      ? state.currentQuestionIndex +
        1
      : 0;

  const isLastQuestion =
    totalQuestions > 0 &&
    state.currentQuestionIndex ===
      totalQuestions - 1;

  const answeredCount =
    state.correctCount +
    state.wrongCount;

  const remainingMistakes =
    Math.max(
      0,
      allowedMistakes -
        state.wrongCount,
    );

  const accuracyPercentage =
    calculateAccuracyPercentage(
      state.correctCount,
      totalQuestions,
    );

  const selectedOption =
    useMemo(() => {
      if (
        !currentQuestion ||
        !state.selectedOptionId
      ) {
        return null;
      }

      return (
        currentQuestion.options.find(
          (option) =>
            option.id ===
            state.selectedOptionId,
        ) ?? null
      );
    }, [
      currentQuestion,
      state.selectedOptionId,
    ]);

  const selectOption =
    useCallback(
      (optionId: string) => {
        setState(
          (currentState) => {
            if (
              currentState.result !==
                "in-progress" ||
              currentState
                .isSubmitted
            ) {
              return currentState;
            }

            return {
              ...currentState,
              selectedOptionId:
                optionId,
              feedback: "idle",
            };
          },
        );
      },
      [],
    );

  const submitAnswer =
    useCallback(() => {
      setState(
        (currentState) => {
          if (
            currentState.result !==
              "in-progress" ||
            currentState
              .isSubmitted
          ) {
            return currentState;
          }

          const question =
            currentState.questions[
              currentState
                .currentQuestionIndex
            ];

          if (!question) {
            return currentState;
          }

          if (
            !currentState
              .selectedOptionId
          ) {
            return {
              ...currentState,
              feedback: "empty",
            };
          }

          const isCorrect =
            currentState
              .selectedOptionId ===
            question.correctOptionId;

          const nextCorrectCount =
            currentState
              .correctCount +
            (isCorrect ? 1 : 0);

          const nextWrongCount =
            currentState
              .wrongCount +
            (isCorrect ? 0 : 1);

          const hasExceededMistakes =
            nextWrongCount >
            allowedMistakes;

          const isFinalQuestion =
            currentState
              .currentQuestionIndex ===
            currentState
              .questions.length -
              1;

          const nextResult:
            FinalTestResult =
            hasExceededMistakes
              ? "failed"
              : isFinalQuestion
                ? "passed"
                : "in-progress";

          return {
            ...currentState,

            feedback: isCorrect
                ? "correct"
                : "incorrect",

            isSubmitted: true,

            correctCount:
              nextCorrectCount,

            wrongCount:
              nextWrongCount,

            result: nextResult,
          };
        },
      );
    }, [allowedMistakes]);

  const goToNextQuestion =
    useCallback(() => {
      setState(
        (currentState) => {
          if (
            currentState.result !==
              "in-progress" ||
            !currentState
              .isSubmitted ||
            currentState
              .currentQuestionIndex >=
              currentState
                .questions.length -
                1
          ) {
            return currentState;
          }

          return {
            ...currentState,

            currentQuestionIndex:
              currentState
                .currentQuestionIndex +
              1,

            selectedOptionId: null,

            feedback: "idle",
            isSubmitted: false,
          };
        },
      );
    }, []);

  const retry =
    useCallback(() => {
      setState(
        createInitialState(),
      );
    }, [createInitialState]);

  return {
    sessionId:
      state.sessionId,

    questions:
      state.questions,

    currentQuestion,
    currentQuestionIndex:
      state.currentQuestionIndex,
    currentQuestionNumber,
    totalQuestions,

    selectedOptionId:
      state.selectedOptionId,
    selectedOption,

    feedback:
      state.feedback,
    isSubmitted:
      state.isSubmitted,
    isLastQuestion,

    correctCount:
      state.correctCount,
    wrongCount:
      state.wrongCount,
    answeredCount,

    allowedMistakes,
    remainingMistakes,

    accuracyPercentage,

    result:
      state.result,

    selectOption,
    submitAnswer,
    goToNextQuestion,
    retry,
  };
};