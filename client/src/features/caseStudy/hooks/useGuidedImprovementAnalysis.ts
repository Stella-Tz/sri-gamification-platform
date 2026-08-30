// client/src/features/caseStudy/hooks/useGuidedImprovementAnalysis.ts

import {
  useMemo,
  useState,
} from "react";

import type {
  GuidedImprovementAnswer,
  GuidedImprovementQuestion,
  GuidedImprovementQuestionId,
} from "../types/caseStudy.types";

import type {
  CaseStudyGuidedImprovementProgress,
  CaseStudyInteractionFeedback,
} from "../progress/caseStudyProgress.types";

type UseGuidedImprovementAnalysisParams = {
  questions:
    GuidedImprovementQuestion[];

  initialProgress?:
    | CaseStudyGuidedImprovementProgress
    | null;
};

type FeedbackState =
  CaseStudyInteractionFeedback;

const getSafeInitialIndex = ({
  questions,
  initialProgress,
}: {
  questions:
    GuidedImprovementQuestion[];

  initialProgress:
    | CaseStudyGuidedImprovementProgress
    | null;
}): number => {
  if (questions.length === 0) {
    return 0;
  }

  const requestedIndex =
    initialProgress
      ?.currentIndex ?? 0;

  return Math.min(
    Math.max(
      requestedIndex,
      0,
    ),

    questions.length - 1,
  );
};

const getValidInitialAnswers = ({
  questions,
  initialProgress,
}: {
  questions:
    GuidedImprovementQuestion[];

  initialProgress:
    | CaseStudyGuidedImprovementProgress
    | null;
}): GuidedImprovementAnswer[] => {
  if (!initialProgress) {
    return [];
  }

  const validQuestionIds =
    new Set(
      questions.map(
        (question) =>
          question.id,
      ),
    );

  return initialProgress
    .answers
    .filter((answer) =>
      validQuestionIds.has(
        answer.questionId,
      ),
    );
};

const getAnswerForQuestion = (
  answers:
    readonly GuidedImprovementAnswer[],

  questionId:
    GuidedImprovementQuestionId,
): GuidedImprovementAnswer | null => {
  return (
    answers.find(
      (answer) =>
        answer.questionId ===
        questionId,
    ) ?? null
  );
};

const getFeedbackFromAnswer = (
  answer:
    | GuidedImprovementAnswer
    | null,
): FeedbackState => {
  if (!answer) {
    return null;
  }

  if (answer.isCorrect) {
    return "correct";
  }

  if (answer.attempts > 0) {
    return "wrong";
  }

  return null;
};

const upsertAnswer = (
  answers:
    readonly GuidedImprovementAnswer[],

  nextAnswer:
    GuidedImprovementAnswer,
): GuidedImprovementAnswer[] => {
  return [
    ...answers.filter(
      (answer) =>
        answer.questionId !==
        nextAnswer.questionId,
    ),

    nextAnswer,
  ];
};

export const useGuidedImprovementAnalysis = ({
  questions,
  initialProgress = null,
}: UseGuidedImprovementAnalysisParams) => {
  const initialIndex =
    getSafeInitialIndex({
      questions,
      initialProgress,
    });

  const initialAnswers =
    getValidInitialAnswers({
      questions,
      initialProgress,
    });

  const initialQuestion =
    questions[
      initialIndex
    ] ?? null;

  const initialAnswer =
    initialQuestion
      ? getAnswerForQuestion(
          initialAnswers,
          initialQuestion.id,
        )
      : null;

  const initialSelectedOptionValue =
    initialProgress
      ?.selectedOptionValue ??
    initialAnswer
      ?.selectedOptionValue ??
    "";

  const initialFeedback =
    initialProgress
      ?.feedback ??
    getFeedbackFromAnswer(
      initialAnswer,
    );

  const initialIsCompleted =
    initialProgress
      ?.completed === true;

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(
    () => initialIndex,
  );

  const [
    answers,
    setAnswers,
  ] = useState<
    GuidedImprovementAnswer[]
  >(
    () => [
      ...initialAnswers,
    ],
  );

  /*
   * These two values are local UI draft state.
   * Selecting an option does not persist it.
   */
  const [
    selectedOptionValue,
    setSelectedOptionValue,
  ] = useState(
    () =>
      initialSelectedOptionValue,
  );

  const [
    feedback,
    setFeedback,
  ] = useState<FeedbackState>(
    () => initialFeedback,
  );

  const [
    isCompleted,
    setIsCompleted,
  ] = useState(
    () => initialIsCompleted,
  );

  /*
   * This is the persisted snapshot exposed to
   * the page. It changes only after Check Answer,
   * question navigation or final completion.
   */
  const [
    progress,
    setProgress,
  ] = useState<
    CaseStudyGuidedImprovementProgress
  >(
    () => ({
      currentIndex:
        initialIndex,

      selectedOptionValue:
        initialSelectedOptionValue,

      feedback:
        initialFeedback,

      answers: [
        ...initialAnswers,
      ],

      completed:
        initialIsCompleted,
    }),
  );

  const currentQuestion =
    questions[
      currentIndex
    ] ?? null;

  const isLastQuestion =
    currentQuestion !== null &&
    currentIndex ===
      questions.length - 1;

  const currentAnswer =
    useMemo(() => {
      if (!currentQuestion) {
        return null;
      }

      return getAnswerForQuestion(
        answers,
        currentQuestion.id,
      );
    }, [
      answers,
      currentQuestion,
    ]);

  const hasErrorHint =
    feedback === "wrong" ||
    (
      currentAnswer
        ?.attempts ?? 0
    ) > 0;

  const selectOption = (
    value: string,
  ) => {
    /*
     * The selection remains local until the
     * user explicitly checks the answer.
     */
    setSelectedOptionValue(
      value,
    );

    setFeedback(null);
  };

  const checkAnswer =
    (): boolean => {
      if (!currentQuestion) {
        return false;
      }

      if (
        !selectedOptionValue
      ) {
        /*
         * An empty check is feedback only and is
         * not persisted as an attempted answer.
         */
        setFeedback("empty");

        return false;
      }

      const isCorrect =
        selectedOptionValue ===
        currentQuestion
          .correctOptionValue;

      const existingAnswer =
        getAnswerForQuestion(
          answers,
          currentQuestion.id,
        );

      const nextAnswer:
        GuidedImprovementAnswer =
        {
          questionId:
            currentQuestion.id,

          selectedOptionValue,

          isCorrect,

          attempts:
            (
              existingAnswer
                ?.attempts ?? 0
            ) + 1,
        };

      const nextAnswers =
        upsertAnswer(
          answers,
          nextAnswer,
        );

      const nextFeedback:
        FeedbackState =
        isCorrect
          ? "correct"
          : "wrong";

      setAnswers(
        nextAnswers,
      );

      setFeedback(
        nextFeedback,
      );

      setProgress({
        currentIndex,

        selectedOptionValue,

        feedback:
          nextFeedback,

        answers:
          nextAnswers,

        completed:
          isCompleted,
      });

      return isCorrect;
    };

  const goToNextQuestion =
    () => {
      if (!currentQuestion) {
        return;
      }

      /*
       * On the final question this action reveals
       * the simulation preparation section.
       */
      if (isLastQuestion) {
        setIsCompleted(true);

        setProgress({
          currentIndex,

          selectedOptionValue,

          feedback,

          answers,

          completed: true,
        });

        return;
      }

      const nextIndex =
        currentIndex + 1;

      const nextQuestion =
        questions[
          nextIndex
        ] ?? null;

      const savedNextAnswer =
        nextQuestion
          ? getAnswerForQuestion(
              answers,
              nextQuestion.id,
            )
          : null;

      const nextSelectedOptionValue =
        savedNextAnswer
          ?.selectedOptionValue ??
        "";

      const nextFeedback =
        getFeedbackFromAnswer(
          savedNextAnswer,
        );

      setCurrentIndex(
        nextIndex,
      );

      setSelectedOptionValue(
        nextSelectedOptionValue,
      );

      setFeedback(
        nextFeedback,
      );

      setProgress({
        currentIndex:
          nextIndex,

        selectedOptionValue:
          nextSelectedOptionValue,

        feedback:
          nextFeedback,

        answers,

        completed: false,
      });
    };

  const getSavedAnswerForQuestion = (
    questionId:
      GuidedImprovementQuestionId,
  ): GuidedImprovementAnswer | null => {
    return getAnswerForQuestion(
      answers,
      questionId,
    );
  };

  return {
    progress,

    currentIndex,
    currentQuestion,
    isLastQuestion,

    selectedOptionValue,
    selectOption,

    feedback,
    hasErrorHint,

    answers,
    currentAnswer,

    getAnswerForQuestion:
      getSavedAnswerForQuestion,

    checkAnswer,
    goToNextQuestion,

    isCompleted,
  };
};
