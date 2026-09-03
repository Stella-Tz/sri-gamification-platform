// client/src/features/course/hooks/useLessonQuizSession.ts

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  courseApi,
} from "../../../api/courseApi";

import type {
  CourseQuestion,
  LessonQuizCompletionAnswer,
  LessonQuizFeedback,
  UserCourseProgress,
} from "../course.types";

type UseLessonQuizSessionOptions = {
  quizId: string;
  enabled?: boolean;

  onProgressChange?: (
    progress:
      UserCourseProgress,
  ) => void;
};

export const useLessonQuizSession = ({
  quizId,
  enabled = true,
  onProgressChange,
}: UseLessonQuizSessionOptions) => {
  const [
    questions,
    setQuestions,
  ] = useState<
    readonly CourseQuestion[]
  >([]);

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

  const [
    correctOptionId,
    setCorrectOptionId,
  ] = useState<string | null>(
    null,
  );

  const [
    explanation,
    setExplanation,
  ] = useState<string | null>(
    null,
  );

  const [
    answersByQuestionId,
    setAnswersByQuestionId,
  ] = useState<
    Record<string, string>
  >({});

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    isSubmittingAnswer,
    setIsSubmittingAnswer,
  ] = useState(false);

  const [
    isCompletingQuiz,
    setIsCompletingQuiz,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
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
      setSelectedOptionId(
        null,
      );

      setFeedback(
        "idle",
      );

      setCorrectOptionId(
        null,
      );

      setExplanation(
        null,
      );

      setError(
        null,
      );
    }, []);

  const resetSession =
    useCallback(() => {
      setCurrentQuestionIndex(
        0,
      );

      setAnswersByQuestionId(
        {},
      );

      resetQuestionState();
    }, [resetQuestionState]);

  useEffect(() => {
    resetSession();
    setQuestions([]);

    if (!enabled) {
      setIsLoading(
        false,
      );
      return;
    }

    let cancelled = false;

    const loadQuiz =
      async () => {
        try {
          setIsLoading(
            true,
          );

          setError(
            null,
          );

          const quiz =
            await courseApi
              .getLessonQuiz(
                quizId,
              );

          if (cancelled) {
            return;
          }

          setQuestions(
            quiz.questions,
          );
        } catch (loadError) {
          if (cancelled) {
            return;
          }

          setQuestions([]);

          setError(
            loadError instanceof
              Error
              ? loadError.message
              : "Failed to load quiz.",
          );
        } finally {
          if (!cancelled) {
            setIsLoading(
              false,
            );
          }
        }
      };

    void loadQuiz();

    return () => {
      cancelled = true;
    };
  }, [
    enabled,
    quizId,
    resetSession,
  ]);

  const selectOption =
    useCallback(
      (optionId: string) => {
        if (
          isSubmitted ||
          isSubmittingAnswer
        ) {
          return;
        }

        setSelectedOptionId(
          optionId,
        );

        if (
          feedback === "empty"
        ) {
          setFeedback(
            "idle",
          );
        }

        setError(
          null,
        );
      },
      [
        feedback,
        isSubmitted,
        isSubmittingAnswer,
      ],
    );

  const submitAnswer =
    useCallback(
      async (): Promise<
        boolean
      > => {
        if (
          !currentQuestion ||
          isSubmitted ||
          isSubmittingAnswer
        ) {
          return false;
        }

        if (!selectedOptionId) {
          setFeedback(
            "empty",
          );

          return false;
        }

        try {
          setIsSubmittingAnswer(
            true,
          );

          setError(
            null,
          );

          const result =
            await courseApi
              .validateLessonQuizAnswer(
                {
                  quizStepId:
                    quizId,

                  questionId:
                    currentQuestion.id,

                  selectedOptionId,
                },
              );

          setCorrectOptionId(
            result.correctOptionId,
          );

          setExplanation(
            result.explanation,
          );

          setFeedback(
            result.correct
              ? "correct"
              : "incorrect",
          );

          setAnswersByQuestionId(
            (
              currentAnswers,
            ) => ({
              ...currentAnswers,

              [currentQuestion.id]:
                selectedOptionId,
            }),
          );

          return true;
        } catch (submitError) {
          setError(
            submitError instanceof
              Error
              ? submitError.message
              : "Failed to check answer.",
          );

          return false;
        } finally {
          setIsSubmittingAnswer(
            false,
          );
        }
      },
      [
        currentQuestion,
        isSubmitted,
        isSubmittingAnswer,
        quizId,
        selectedOptionId,
      ],
    );

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

  const answers =
    useMemo<
      LessonQuizCompletionAnswer[]
    >(
      () =>
        questions.flatMap(
          (question) => {
            const answer =
              answersByQuestionId[
                question.id
              ];

            if (!answer) {
              return [];
            }

            return [
              {
                questionId:
                  question.id,

                selectedOptionId:
                  answer,
              },
            ];
          },
        ),
      [
        answersByQuestionId,
        questions,
      ],
    );

  const completeQuiz =
    useCallback(
      async () => {
        if (
          totalQuestions === 0 ||
          answers.length !==
            totalQuestions
        ) {
          throw new Error(
            "All quiz questions must be answered before completion.",
          );
        }

        try {
          setIsCompletingQuiz(
            true,
          );

          setError(
            null,
          );

          const nextProgress =
            await courseApi
              .completeLessonQuiz(
                {
                  quizStepId:
                    quizId,

                  answers,
                },
              );

          /*
           * The completion endpoint already
           * returns canonical Course progress.
           * Apply it immediately to the shared
           * CourseProgressProvider state.
           */
          onProgressChange?.(
            nextProgress,
          );

          return nextProgress;
        } catch (completionError) {
          setError(
            completionError instanceof
              Error
              ? completionError.message
              : "Failed to complete quiz.",
          );

          throw completionError;
        } finally {
          setIsCompletingQuiz(
            false,
          );
        }
      },
      [
        answers,
        onProgressChange,
        quizId,
        totalQuestions,
      ],
    );

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    currentQuestionNumber,
    totalQuestions,

    selectedOptionId,
    selectedOption,
    correctOptionId,
    explanation,

    feedback,
    isSubmitted,
    isLastQuestion,

    isLoading,
    isSubmittingAnswer,
    isCompletingQuiz,
    error,

    selectOption,
    submitAnswer,
    goToNextQuestion,
    completeQuiz,
    resetSession,
  };
};
