// client/src/features/course/hooks/useFinalTestSession.ts

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  courseApi,
  type FinalTestState,
} from "../../../api/courseApi";

import type {
  CourseQuestion,
  FinalTestFeedback,
} from "../course.types";

type UseFinalTestSessionOptions = {
  finalTestId: string;
  enabled?: boolean;
};

export const useFinalTestSession = ({
  finalTestId,
  enabled = true,
}: UseFinalTestSessionOptions) => {
  const [
    attempt,
    setAttempt,
  ] = useState<FinalTestState | null>(
    null,
  );

  /*
   * The backend advances to the next
   * question immediately after an answer.
   *
   * We keep the answered question visible
   * temporarily so the user can see the
   * Correct / Incorrect feedback before
   * pressing Next Question.
   */
  const [
    displayQuestion,
    setDisplayQuestion,
  ] =
    useState<CourseQuestion | null>(
      null,
    );

  const [
    displayQuestionNumber,
    setDisplayQuestionNumber,
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
    useState<FinalTestFeedback>(
      "idle",
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    isSubmittingAnswer,
    setIsSubmittingAnswer,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  const isSubmitted =
    feedback === "correct" ||
    feedback === "incorrect";

  const applyAttempt =
    useCallback(
      (
        nextAttempt:
          FinalTestState,
      ) => {
        setAttempt(
          nextAttempt,
        );

        setDisplayQuestion(
          nextAttempt.currentQuestion,
        );

        setDisplayQuestionNumber(
          nextAttempt.currentQuestionNumber,
        );

        setSelectedOptionId(
          null,
        );

        setFeedback(
          "idle",
        );

        setError(
          null,
        );
      },
      [],
    );

  const startAttempt =
    useCallback(
      async () => {
        const nextAttempt =
          await courseApi.startFinalTest(
            finalTestId,
          );

        applyAttempt(
          nextAttempt,
        );

        return nextAttempt;
      },
      [
        applyAttempt,
        finalTestId,
      ],
    );

  useEffect(() => {
    if (!enabled) {
      setAttempt(null);
      setDisplayQuestion(null);
      setDisplayQuestionNumber(0);
      setSelectedOptionId(null);
      setFeedback("idle");
      setError(null);
      setIsLoading(false);

      return;
    }

    let cancelled = false;

    const loadAttempt =
      async () => {
        try {
          setIsLoading(
            true,
          );

          setError(
            null,
          );

          const nextAttempt =
            await courseApi.startFinalTest(
              finalTestId,
            );

          if (cancelled) {
            return;
          }

          applyAttempt(
            nextAttempt,
          );
        } catch (loadError) {
          if (cancelled) {
            return;
          }

          setAttempt(null);
          setDisplayQuestion(null);

          setError(
            loadError instanceof
              Error
              ? loadError.message
              : "Failed to load final test.",
          );
        } finally {
          if (!cancelled) {
            setIsLoading(
              false,
            );
          }
        }
      };

    void loadAttempt();

    return () => {
      cancelled = true;
    };
  }, [
    applyAttempt,
    enabled,
    finalTestId,
  ]);

  const selectOption =
    useCallback(
      (optionId: string) => {
        if (
          !attempt ||
          attempt.status !==
            "in-progress" ||
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
        attempt,
        feedback,
        isSubmitted,
        isSubmittingAnswer,
      ],
    );

  const submitAnswer =
    useCallback(
      async (): Promise<
        FinalTestState | null
      > => {
        if (
          !attempt ||
          attempt.status !==
            "in-progress" ||
          !displayQuestion ||
          isSubmitted ||
          isSubmittingAnswer
        ) {
          return null;
        }

        if (!selectedOptionId) {
          setFeedback(
            "empty",
          );

          return null;
        }

        try {
          setIsSubmittingAnswer(
            true,
          );

          setError(
            null,
          );

          const result =
            await courseApi.submitFinalTestAnswer(
              {
                attemptId:
                  attempt.attemptId,

                questionId:
                  displayQuestion.id,

                selectedOptionId,
              },
            );

          const nextAttempt =
            result.attempt;

          /*
           * Counts, remaining mistakes and
           * status now come exclusively from
           * the backend.
           */
          setAttempt(
            nextAttempt,
          );

          if (
            nextAttempt.status ===
            "in-progress"
          ) {
            /*
             * Do not replace displayQuestion
             * yet. The server has already
             * advanced, but the UI must first
             * show feedback for the question
             * that was just answered.
             */
            setFeedback(
              result.correct
                ? "correct"
                : "incorrect",
            );

            return nextAttempt;
          }

          /*
           * PASSED / FAILED:
           * the result screen replaces the
           * question immediately.
           */
          setDisplayQuestion(
            null,
          );

          setDisplayQuestionNumber(
            nextAttempt.currentQuestionNumber,
          );

          setFeedback(
            result.correct
              ? "correct"
              : "incorrect",
          );

          return nextAttempt;
        } catch (submitError) {
          setError(
            submitError instanceof
              Error
              ? submitError.message
              : "Failed to submit answer.",
          );

          return null;
        } finally {
          setIsSubmittingAnswer(
            false,
          );
        }
      },
      [
        attempt,
        displayQuestion,
        isSubmitted,
        isSubmittingAnswer,
        selectedOptionId,
      ],
    );

  const goToNextQuestion =
    useCallback(() => {
      if (
        !attempt ||
        attempt.status !==
          "in-progress" ||
        !isSubmitted ||
        !attempt.currentQuestion
      ) {
        return;
      }

      /*
       * attempt.currentQuestion is already
       * the next persisted server question.
       */
      setDisplayQuestion(
        attempt.currentQuestion,
      );

      setDisplayQuestionNumber(
        attempt.currentQuestionNumber,
      );

      setSelectedOptionId(
        null,
      );

      setFeedback(
        "idle",
      );

      setError(
        null,
      );
    }, [
      attempt,
      isSubmitted,
    ]);

  const retry =
    useCallback(
      async () => {
        try {
          setIsLoading(
            true,
          );

          setError(
            null,
          );

          return await startAttempt();
        } catch (retryError) {
          setError(
            retryError instanceof
              Error
              ? retryError.message
              : "Failed to start a new attempt.",
          );

          return null;
        } finally {
          setIsLoading(
            false,
          );
        }
      },
      [startAttempt],
    );

  const selectedOption =
    useMemo(() => {
      if (
        !displayQuestion ||
        !selectedOptionId
      ) {
        return null;
      }

      return (
        displayQuestion.options.find(
          (option) =>
            option.id ===
            selectedOptionId,
        ) ?? null
      );
    }, [
      displayQuestion,
      selectedOptionId,
    ]);

  return {
    attempt,

    currentQuestion:
      displayQuestion,

    currentQuestionNumber:
      displayQuestionNumber,

    selectedOptionId,
    selectedOption,

    feedback,
    isSubmitted,

    correctCount:
      attempt?.correctCount ?? 0,

    wrongCount:
      attempt?.wrongCount ?? 0,

    answeredCount:
      attempt?.answeredCount ?? 0,

    totalQuestions:
      attempt?.totalQuestions ?? 0,

    allowedMistakes:
      attempt?.allowedMistakes ?? 0,

    remainingMistakes:
      attempt?.remainingMistakes ?? 0,

    accuracyPercentage:
      attempt?.accuracyPercentage ?? 0,

    scorePercentage:
      attempt?.scorePercentage ?? 0,

    result:
      attempt?.status ??
      "in-progress",

    isLoading,
    isSubmittingAnswer,
    error,

    selectOption,
    submitAnswer,
    goToNextQuestion,
    retry,
  };
};