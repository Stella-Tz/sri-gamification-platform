// client/src/features/course/hooks/useLessonQuizSession.ts

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  CourseQuestion,
  LessonQuizFeedback,
} from "../course.types";

type UseLessonQuizSessionOptions = {
  quizId: string;
  questions:
    readonly CourseQuestion[];
};

export const useLessonQuizSession = ({
  quizId,
  questions,
}: UseLessonQuizSessionOptions) => {
  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  const [
    selectedOptionId,
    setSelectedOptionId,
  ] = useState<string | null>(
    null,
  );

  const [
    feedback,
    setFeedback,
  ] =
    useState<LessonQuizFeedback>(
      "idle",
    );

  const currentQuestion =
    questions[
      currentQuestionIndex
    ] ?? null;

  const totalQuestions =
    questions.length;

  const currentQuestionNumber =
    currentQuestion
      ? currentQuestionIndex + 1
      : 0;

  const isLastQuestion =
    currentQuestionIndex ===
      totalQuestions - 1 &&
    totalQuestions > 0;

  const isSubmitted =
    feedback === "correct" ||
    feedback === "incorrect";

  const resetQuestionState =
    useCallback(() => {
      setSelectedOptionId(null);
      setFeedback("idle");
    }, []);

  const resetSession =
    useCallback(() => {
      setCurrentQuestionIndex(0);
      resetQuestionState();
    }, [resetQuestionState]);

  useEffect(() => {
    resetSession();
  }, [
    quizId,
    totalQuestions,
    resetSession,
  ]);

  const selectOption = useCallback(
    (optionId: string) => {
      if (isSubmitted) {
        return;
      }

      setSelectedOptionId(
        optionId,
      );

      if (feedback === "empty") {
        setFeedback("idle");
      }
    },
    [feedback, isSubmitted],
  );

  const submitAnswer =
    useCallback((): boolean => {
      if (
        !currentQuestion
      ) {
        return false;
      }

      if (!selectedOptionId) {
        setFeedback("empty");
        return false;
      }

      const isCorrect =
        selectedOptionId ===
        currentQuestion.correctOptionId;

      setFeedback(
        isCorrect
          ? "correct"
          : "incorrect",
      );

      return true;
    }, [
      currentQuestion,
      selectedOptionId,
    ]);

  const goToNextQuestion =
    useCallback(() => {
      if (
        !isSubmitted ||
        isLastQuestion
      ) {
        return;
      }

      setCurrentQuestionIndex(
        (currentIndex) =>
          currentIndex + 1,
      );

      resetQuestionState();
    }, [
      isLastQuestion,
      isSubmitted,
      resetQuestionState,
    ]);

  const selectedOption =
    useMemo(() => {
      if (
        !currentQuestion ||
        !selectedOptionId
      ) {
        return null;
      }

      return (
        currentQuestion.options.find(
          (option) =>
            option.id ===
            selectedOptionId,
        ) ?? null
      );
    }, [
      currentQuestion,
      selectedOptionId,
    ]);

  return {
    currentQuestion,
    currentQuestionIndex,
    currentQuestionNumber,
    totalQuestions,

    selectedOptionId,
    selectedOption,

    feedback,
    isSubmitted,
    isLastQuestion,

    selectOption,
    submitAnswer,
    goToNextQuestion,
    resetSession,
  };
};