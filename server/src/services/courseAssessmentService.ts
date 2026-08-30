import {
  CourseStepType,
  FinalTestAttemptStatus,
} from "@prisma/client";

import prisma from "../prismaClient.js";

import {
  getAccessibleCourseStep,
  getUserCourseProgress,
} from "./courseProgressService.js";

// -----------------------------------------------------------------------------
// DTOs
// -----------------------------------------------------------------------------

export type PublicCourseQuestionDto = {
  id: string;
  prompt: string;

  options: {
    id: string;
    text: string;
  }[];
};

export type LessonQuizDto = {
  quizId: string;
  sectionId: string;
  lessonId: string;

  questions:
    PublicCourseQuestionDto[];
};

export type LessonQuizAnswerResultDto = {
  questionId: string;

  correct: boolean;

  correctOptionId: string;
  explanation: string;
};

export type FinalTestStateDto = {
  attemptId: string;

  finalTestId: string;
  sectionId: string;

  status:
    | "in-progress"
    | "passed"
    | "failed";

  allowedMistakes: number;
  remainingMistakes: number;

  correctCount: number;
  wrongCount: number;
  answeredCount: number;
  totalQuestions: number;

  accuracyPercentage: number;
  scorePercentage: number;

  currentQuestionNumber: number;

  currentQuestion:
    | PublicCourseQuestionDto
    | null;

  completedAt:
    | string
    | null;
};

export type FinalTestAnswerResultDto = {
  questionId: string;
  correct: boolean;

  attempt: FinalTestStateDto;
};

export type LessonQuizCompletionAnswer = {
  questionId: string;
  selectedOptionId: string;
};

// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------

export class CourseAssessmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name =
      "CourseAssessmentError";
  }
}

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

const shuffleItems = <T>(
  items: readonly T[],
): T[] => {
  const shuffled = [...items];

  for (
    let index =
      shuffled.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
          (index + 1),
      );

    [
      shuffled[index],
      shuffled[randomIndex],
    ] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

const calculateAccuracyPercentage = (
  correctCount: number,
  answeredCount: number,
): number => {
  if (answeredCount <= 0) {
    return 0;
  }

  return Math.round(
    (correctCount /
      answeredCount) *
      100,
  );
};

const calculateScorePercentage = (
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

const mapStatus = (
  status: FinalTestAttemptStatus,
):
  | "in-progress"
  | "passed"
  | "failed" => {
  switch (status) {
    case FinalTestAttemptStatus.PASSED:
      return "passed";

    case FinalTestAttemptStatus.FAILED:
      return "failed";

    default:
      return "in-progress";
  }
};

// -----------------------------------------------------------------------------
// Lesson quiz
// -----------------------------------------------------------------------------

export const getLessonQuiz =
  async (
    userId: string,
    quizStepId: string,
  ): Promise<LessonQuizDto> => {
    const step =
      await getAccessibleCourseStep(
        userId,
        quizStepId,
      );

    if (
      step.type !==
        CourseStepType.QUIZ ||
      !step.theoryLessonKey
    ) {
      throw new CourseAssessmentError(
        "The requested course step is not a lesson quiz.",
      );
    }

    const questions =
      await prisma.courseQuestion.findMany(
        {
          where: {
            sectionId:
              step.sectionId,

            theoryLessonKey:
              step.theoryLessonKey,
          },

          orderBy: {
            order: "asc",
          },

          include: {
            options: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      );

    return {
      quizId: step.id,
      sectionId: step.sectionId,
      lessonId:
        step.theoryLessonKey,

      questions:
        questions.map(
          (question) => ({
            id: question.id,

            prompt:
              question.prompt,

            /*
             * The DB id of the option is
             * internal. The frontend keeps
             * using option-a / option-b etc.
             */
            options:
              question.options.map(
                (option) => ({
                  id: option.key,
                  text: option.text,
                }),
              ),
          }),
        ),
    };
  };

export const validateLessonQuizAnswer =
  async (
    userId: string,
    quizStepId: string,
    questionId: string,
    selectedOptionId: string,
  ): Promise<LessonQuizAnswerResultDto> => {
    const step =
      await getAccessibleCourseStep(
        userId,
        quizStepId,
      );

    if (
      step.type !==
        CourseStepType.QUIZ ||
      !step.theoryLessonKey
    ) {
      throw new CourseAssessmentError(
        "The requested course step is not a lesson quiz.",
      );
    }

    const question =
      await prisma.courseQuestion.findFirst(
        {
          where: {
            id: questionId,

            sectionId:
              step.sectionId,

            theoryLessonKey:
              step.theoryLessonKey,
          },

          include: {
            options: true,
          },
        },
      );

    if (!question) {
      throw new CourseAssessmentError(
        "Question was not found in this quiz.",
      );
    }

    const selectedOptionExists =
      question.options.some(
        (option) =>
          option.key ===
          selectedOptionId,
      );

    if (!selectedOptionExists) {
      throw new CourseAssessmentError(
        "Selected option is not valid for this question.",
      );
    }

    const correct =
      selectedOptionId ===
      question.correctOptionKey;

    /*
     * Lesson quizzes are formative:
     * after submission the UI is allowed
     * to reveal the correct option and the
     * explanation.
     */
    return {
      questionId:
        question.id,

      correct,

      correctOptionId:
        question.correctOptionKey,

      explanation:
        question.explanation,
    };
  };

export const completeLessonQuiz =
  async (
    userId: string,
    quizStepId: string,
    answers:
      readonly LessonQuizCompletionAnswer[],
  ) => {
    const step =
      await getAccessibleCourseStep(
        userId,
        quizStepId,
      );

    if (
      step.type !==
        CourseStepType.QUIZ ||
      !step.theoryLessonKey
    ) {
      throw new CourseAssessmentError(
        "The requested course step is not a lesson quiz.",
      );
    }

    /*
     * If this quiz was already completed,
     * completion is idempotent.
     */
    const existingCompletion =
      await prisma.userCompletedCourseStep.findUnique(
        {
          where: {
            userId_stepId: {
              userId,
              stepId: step.id,
            },
          },
        },
      );

    if (existingCompletion) {
      return getUserCourseProgress(
        userId,
      );
    }

    const questions =
      await prisma.courseQuestion.findMany(
        {
          where: {
            sectionId:
              step.sectionId,

            theoryLessonKey:
              step.theoryLessonKey,
          },

          include: {
            options: true,
          },
        },
      );

    if (questions.length === 0) {
      throw new CourseAssessmentError(
        "No questions are registered for this quiz.",
      );
    }

    /*
     * Every quiz question must have exactly
     * one submitted answer.
     */
    if (
      answers.length !==
      questions.length
    ) {
      throw new CourseAssessmentError(
        "All quiz questions must be answered before the quiz can be completed.",
      );
    }

    const answerMap =
      new Map(
        answers.map(
          (answer) => [
            answer.questionId,
            answer.selectedOptionId,
          ],
        ),
      );

    /*
     * Duplicate question IDs would make
     * Map.size smaller than answers.length.
     */
    if (
      answerMap.size !==
      answers.length
    ) {
      throw new CourseAssessmentError(
        "Each quiz question must be answered exactly once.",
      );
    }

    for (
      const question of questions
    ) {
      const selectedOptionId =
        answerMap.get(
          question.id,
        );

      if (!selectedOptionId) {
        throw new CourseAssessmentError(
          "All quiz questions must be answered before the quiz can be completed.",
        );
      }

      const selectedOptionExists =
        question.options.some(
          (option) =>
            option.key ===
            selectedOptionId,
        );

      if (!selectedOptionExists) {
        throw new CourseAssessmentError(
          `Invalid option for question "${question.id}".`,
        );
      }
    }

    /*
     * This is a formative quiz.
     * Correctness does not determine
     * completion: answering every question
     * does.
     */
    await prisma.userCompletedCourseStep.create(
      {
        data: {
          userId,
          stepId: step.id,
        },
      },
    );

    return getUserCourseProgress(
      userId,
    );
  };

// -----------------------------------------------------------------------------
// Final Test
// -----------------------------------------------------------------------------

const loadFinalTestAttempt =
  async (
    userId: string,
    attemptId: string,
  ) => {
    const attempt =
      await prisma.finalTestAttempt.findFirst(
        {
          where: {
            id: attemptId,
            userId,
          },

          include: {
            finalTestStep: {
              select: {
                id: true,
                sectionId: true,
              },
            },

            questions: {
              orderBy: {
                position: "asc",
              },

              include: {
                question: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      );

    if (!attempt) {
      throw new CourseAssessmentError(
        "Final test attempt was not found.",
      );
    }

    return attempt;
  };

const toFinalTestState = async (
  userId: string,
  attemptId: string,
): Promise<FinalTestStateDto> => {
  const attempt =
    await loadFinalTestAttempt(
      userId,
      attemptId,
    );

  const correctCount =
    attempt.questions.filter(
      (item) =>
        item.isCorrect === true,
    ).length;

  const wrongCount =
    attempt.questions.filter(
      (item) =>
        item.isCorrect === false,
    ).length;

  const answeredCount =
    correctCount + wrongCount;

  const totalQuestions =
    attempt.questions.length;

  const currentAssignment =
    attempt.questions.find(
      (item) =>
        item.answeredAt === null,
    ) ?? null;

  let currentQuestion:
    | PublicCourseQuestionDto
    | null = null;

  if (
    attempt.status ===
      FinalTestAttemptStatus.IN_PROGRESS &&
    currentAssignment
  ) {
    const optionsByKey =
      new Map(
        currentAssignment.question.options.map(
          (option) => [
            option.key,
            option,
          ],
        ),
      );

    currentQuestion = {
      id:
        currentAssignment.question.id,

      prompt:
        currentAssignment.question
          .prompt,

      /*
       * Reconstruct the exact option
       * order stored when the attempt
       * was created.
       */
      options:
        currentAssignment.optionOrder
          .map(
            (optionKey) =>
              optionsByKey.get(
                optionKey,
              ),
          )
          .filter(
            (
              option,
            ): option is NonNullable<
              typeof option
            > => option !== undefined,
          )
          .map((option) => ({
            id: option.key,
            text: option.text,
          })),
    };
  }

  return {
    attemptId: attempt.id,

    finalTestId:
      attempt.finalTestStep.id,

    sectionId:
      attempt.finalTestStep
        .sectionId,

    status:
      mapStatus(attempt.status),

    allowedMistakes:
      attempt.allowedMistakes,

    remainingMistakes:
      Math.max(
        0,
        attempt.allowedMistakes -
          wrongCount,
      ),

    correctCount,
    wrongCount,
    answeredCount,
    totalQuestions,

    accuracyPercentage:
      calculateAccuracyPercentage(
        correctCount,
        answeredCount,
      ),

    scorePercentage:
      calculateScorePercentage(
        correctCount,
        totalQuestions,
      ),

    currentQuestionNumber:
      attempt.status === FinalTestAttemptStatus.IN_PROGRESS &&
      currentAssignment
        ? currentAssignment.position
        : answeredCount,

    currentQuestion,

    completedAt:
      attempt.completedAt
        ?.toISOString() ??
      null,
  };
};

export const startFinalTest =
  async (
    userId: string,
    finalTestStepId: string,
  ): Promise<FinalTestStateDto> => {
    const step =
      await getAccessibleCourseStep(
        userId,
        finalTestStepId,
      );

    if (
      step.type !==
      CourseStepType.FINAL_TEST
    ) {
      throw new CourseAssessmentError(
        "The requested course step is not a final test.",
      );
    }

    /*
     * If the page was refreshed during
     * an active attempt, resume it
     * instead of creating a second one.
     */
    const existingAttempt =
      await prisma.finalTestAttempt.findFirst(
        {
          where: {
            userId,
            finalTestStepId:
              step.id,

            status:
              FinalTestAttemptStatus.IN_PROGRESS,
          },

          orderBy: {
            startedAt: "desc",
          },

          select: {
            id: true,
          },
        },
      );

    if (existingAttempt) {
      return toFinalTestState(
        userId,
        existingAttempt.id,
      );
    }

    const questions =
      await prisma.courseQuestion.findMany(
        {
          where: {
            sectionId:
              step.sectionId,
          },

          orderBy: {
            order: "asc",
          },

          include: {
            options: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      );

    if (questions.length === 0) {
      throw new CourseAssessmentError(
        "No questions are registered for this final test.",
      );
    }

    /*
     * Same rule as the current
     * frontend:
     *
     * floor(totalQuestions × 0.20)
     */
    const allowedMistakes =
      Math.floor(
        questions.length * 0.2,
      );

    const shuffledQuestions =
      shuffleItems(questions);

    const attempt =
      await prisma.finalTestAttempt.create(
        {
          data: {
            userId,

            finalTestStepId:
              step.id,

            allowedMistakes,

            questions: {
              create:
                shuffledQuestions.map(
                  (
                    question,
                    index,
                  ) => ({
                    questionId:
                      question.id,

                    /*
                     * Position is 1-based,
                     * matching the UI.
                     */
                    position:
                      index + 1,

                    optionOrder:
                      shuffleItems(
                        question.options,
                      ).map(
                        (option) =>
                          option.key,
                      ),
                  }),
                ),
            },
          },

          select: {
            id: true,
          },
        },
      );

    return toFinalTestState(
      userId,
      attempt.id,
    );
  };

export const getFinalTestAttempt =
  async (
    userId: string,
    attemptId: string,
  ): Promise<FinalTestStateDto> => {
    return toFinalTestState(
      userId,
      attemptId,
    );
  };

export const submitFinalTestAnswer =
  async (
    userId: string,
    attemptId: string,
    questionId: string,
    selectedOptionId: string,
  ): Promise<FinalTestAnswerResultDto> => {
    const attempt =
      await loadFinalTestAttempt(
        userId,
        attemptId,
      );

    if (
      attempt.status !==
      FinalTestAttemptStatus.IN_PROGRESS
    ) {
      throw new CourseAssessmentError(
        "This final test attempt has already been completed.",
      );
    }

    const currentAssignment =
      attempt.questions.find(
        (item) =>
          item.answeredAt === null,
      );

    if (!currentAssignment) {
      throw new CourseAssessmentError(
        "No unanswered question remains in this final test.",
      );
    }

    /*
     * Prevent skipping or answering
     * questions out of order.
     */
    if (
      currentAssignment.questionId !==
      questionId
    ) {
      throw new CourseAssessmentError(
        "This is not the current final test question.",
      );
    }

    const selectedOptionExists =
      currentAssignment.question.options.some(
        (option) =>
          option.key ===
          selectedOptionId,
      );

    if (!selectedOptionExists) {
      throw new CourseAssessmentError(
        "Selected option is not valid for this question.",
      );
    }

    const correct =
      selectedOptionId ===
      currentAssignment.question
        .correctOptionKey;

    const currentCorrectCount =
      attempt.questions.filter(
        (item) =>
          item.isCorrect === true,
      ).length;

    const currentWrongCount =
      attempt.questions.filter(
        (item) =>
          item.isCorrect === false,
      ).length;

    const nextCorrectCount =
      currentCorrectCount +
      (correct ? 1 : 0);

    const nextWrongCount =
      currentWrongCount +
      (correct ? 0 : 1);

    const nextAnsweredCount =
      nextCorrectCount +
      nextWrongCount;

    const hasExceededMistakes =
      nextWrongCount >
      attempt.allowedMistakes;

    const answeredAllQuestions =
      nextAnsweredCount ===
      attempt.questions.length;

    let nextStatus: FinalTestAttemptStatus =
        FinalTestAttemptStatus.IN_PROGRESS;

    if (hasExceededMistakes) {
      nextStatus =
        FinalTestAttemptStatus.FAILED;
    } else if (
      answeredAllQuestions
    ) {
      nextStatus =
        FinalTestAttemptStatus.PASSED;
    }

    const now = new Date();

    await prisma.$transaction([
      prisma.finalTestAttemptQuestion.update(
        {
          where: {
            id:
              currentAssignment.id,
          },

          data: {
            selectedOptionKey:
              selectedOptionId,

            isCorrect: correct,
            answeredAt: now,
          },
        },
      ),

      prisma.finalTestAttempt.update({
        where: {
          id: attempt.id,
        },

        data: {
          status: nextStatus,

          completedAt:
            nextStatus ===
            FinalTestAttemptStatus.IN_PROGRESS
              ? null
              : now,
        },
      }),
    ]);

    /*
     * Unlike the formative lesson quiz,
     * the final test deliberately does
     * NOT return correctOptionId or
     * explanation.
     */
    return {
      questionId,
      correct,

      attempt:
        await toFinalTestState(
          userId,
          attempt.id,
        ),
    };
  };