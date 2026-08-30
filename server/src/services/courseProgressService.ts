import {
  CourseStepType,
  FinalTestAttemptStatus,
} from "@prisma/client";

import prisma from "../prismaClient.js";

const COURSE_ID = "sri-course";

export type CourseProgressDto = {
  completedLessonIds: string[];
  completedQuizIds: string[];

  finalTestAttempts: {
    id: string;
    sectionId: string;
    finalTestId: string;

    correctCount: number;
    wrongCount: number;
    totalQuestions: number;

    accuracyPercentage: number;
    scorePercentage: number;

    passed: boolean;
    completedAt: string;
  }[];
};

export class CourseAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CourseAccessError";
  }
}

const calculateAccuracyPercentage = (
  correctCount: number,
  answeredCount: number,
): number => {
  if (answeredCount <= 0) {
    return 0;
  }

  return Math.round(
    (correctCount / answeredCount) *
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
    (correctCount / totalQuestions) *
      100,
  );
};

const getOrderedCourseSteps =
  async () => {
    const course =
      await prisma.course.findUnique({
        where: {
          id: COURSE_ID,
        },

        select: {
          sections: {
            orderBy: {
              order: "asc",
            },

            select: {
              id: true,

              steps: {
                orderBy: {
                  order: "asc",
                },

                select: {
                  id: true,
                  type: true,
                  theoryLessonKey: true,
                },
              },
            },
          },
        },
      });

    if (!course) {
      throw new Error(
        `Course "${COURSE_ID}" was not found.`,
      );
    }

    return course.sections.flatMap(
      (section) =>
        section.steps.map((step) => ({
          ...step,
          sectionId: section.id,
        })),
    );
  };

const getCompletedStepIds = async (
  userId: string,
): Promise<Set<string>> => {
  const [
    completedSteps,
    passedFinalTests,
  ] = await Promise.all([
    prisma.userCompletedCourseStep.findMany(
      {
        where: {
          userId,
        },

        select: {
          stepId: true,
          step: {
            select: {
              type: true,
            },
          },
        },
      },
    ),

    prisma.finalTestAttempt.findMany({
      where: {
        userId,
        status:
          FinalTestAttemptStatus.PASSED,
      },

      select: {
        finalTestStepId: true,
      },
    }),
  ]);

  const completedIds =
    new Set<string>();

  completedSteps.forEach(
    (completion) => {
      /*
       * LESSON and QUIZ completion is
       * stored in UserCompletedCourseStep.
       *
       * FINAL_TEST completion is derived
       * only from a PASSED FinalTestAttempt.
       */
      if (
        completion.step.type ===
          CourseStepType.LESSON ||
        completion.step.type ===
          CourseStepType.QUIZ
      ) {
        completedIds.add(
          completion.stepId,
        );
      }
    },
  );

  passedFinalTests.forEach(
    (attempt) => {
      completedIds.add(
        attempt.finalTestStepId,
      );
    },
  );

  return completedIds;
};

export const getAccessibleCourseStep =
  async (
    userId: string,
    stepId: string,
  ) => {
    const steps =
      await getOrderedCourseSteps();

    const targetStep =
      steps.find(
        (step) =>
          step.id === stepId,
      );

    if (!targetStep) {
      throw new CourseAccessError(
        "Course step was not found.",
      );
    }

    const completedStepIds =
      await getCompletedStepIds(
        userId,
      );

    /*
     * Completed steps remain accessible
     * for review / retakes.
     */
    if (
      completedStepIds.has(stepId)
    ) {
      return targetStep;
    }

    const currentStep =
      steps.find(
        (step) =>
          !completedStepIds.has(
            step.id,
          ),
      ) ?? null;

    if (
      !currentStep ||
      currentStep.id !== stepId
    ) {
      throw new CourseAccessError(
        "This course step is not available yet.",
      );
    }

    return targetStep;
  };

export const getUserCourseProgress =
  async (
    userId: string,
  ): Promise<CourseProgressDto> => {
    const [
      completedSteps,
      finalTestAttempts,
    ] = await Promise.all([
      prisma.userCompletedCourseStep.findMany(
        {
          where: {
            userId,
          },

          orderBy: {
            completedAt: "asc",
          },

          select: {
            step: {
              select: {
                id: true,
                type: true,
                theoryLessonKey: true,
              },
            },
          },
        },
      ),

      prisma.finalTestAttempt.findMany({
        where: {
          userId,

          status: {
            in: [
              FinalTestAttemptStatus.PASSED,
              FinalTestAttemptStatus.FAILED,
            ],
          },

          completedAt: {
            not: null,
          },
        },

        orderBy: {
          startedAt: "asc",
        },

        select: {
          id: true,
          status: true,
          completedAt: true,

          finalTestStep: {
            select: {
              id: true,
              sectionId: true,
            },
          },

          questions: {
            select: {
              isCorrect: true,
            },
          },
        },
      }),
    ]);

    const completedLessonIds =
      completedSteps
        .filter(
          ({ step }) =>
            step.type ===
              CourseStepType.LESSON &&
            step.theoryLessonKey !==
              null,
        )
        .map(
          ({ step }) =>
            step.theoryLessonKey!,
        );

    const completedQuizIds =
      completedSteps
        .filter(
          ({ step }) =>
            step.type ===
            CourseStepType.QUIZ,
        )
        .map(({ step }) => step.id);

    return {
      completedLessonIds,
      completedQuizIds,

      finalTestAttempts:
        finalTestAttempts.map(
          (attempt) => {
            const correctCount =
              attempt.questions.filter(
                (question) =>
                  question.isCorrect ===
                  true,
              ).length;

            const wrongCount =
              attempt.questions.filter(
                (question) =>
                  question.isCorrect ===
                  false,
              ).length;
            
            const answeredCount =
              correctCount + wrongCount;

            const totalQuestions =
              attempt.questions.length;

            return {
              id: attempt.id,

              sectionId:
                attempt.finalTestStep
                  .sectionId,

              finalTestId:
                attempt.finalTestStep.id,

              correctCount,
              wrongCount,
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

              passed:
                attempt.status ===
                FinalTestAttemptStatus.PASSED,

              completedAt:
                attempt.completedAt!
                  .toISOString(),
            };
          },
        ),
    };
  };

export const completeLesson =
  async (
    userId: string,
    stepId: string,
  ): Promise<CourseProgressDto> => {
    const steps =
      await getOrderedCourseSteps();

    const targetStep =
      steps.find(
        (step) =>
          step.id === stepId,
      );

    if (!targetStep) {
      throw new CourseAccessError(
        "Course step was not found.",
      );
    }

    /*
    * Only lesson steps are completed
    * directly through this function.
    *
    * Quizzes use their own completion flow,
    * while final tests are completed only
    * by passing a FinalTestAttempt.
    */
    if (
        targetStep.type !==
        CourseStepType.LESSON
        ) {
        throw new CourseAccessError(
            "Only lesson steps can be completed directly.",
        );
     }

    const completedStepIds =
      await getCompletedStepIds(
        userId,
      );

    /*
     * Completion endpoints are idempotent.
     * Repeating the same request is safe.
     */
    if (
      completedStepIds.has(stepId)
    ) {
      return getUserCourseProgress(
        userId,
      );
    }

    const currentStep =
      steps.find(
        (step) =>
          !completedStepIds.has(
            step.id,
          ),
      ) ?? null;

    if (
      !currentStep ||
      currentStep.id !== stepId
    ) {
      throw new CourseAccessError(
        "This course step is not available yet.",
      );
    }

    await prisma.userCompletedCourseStep.create(
      {
        data: {
          userId,
          stepId,
        },
      },
    );

    return getUserCourseProgress(
      userId,
    );
  };

export const resetUserCourseProgress =
  async (
    userId: string,
  ): Promise<CourseProgressDto> => {
    await prisma.$transaction([
      /*
       * FinalTestAttemptQuestion rows are
       * removed automatically because of
       * the cascade relation.
       */
      prisma.finalTestAttempt.deleteMany({
        where: {
          userId,
        },
      }),

      prisma.userCompletedCourseStep.deleteMany(
        {
          where: {
            userId,
          },
        },
      ),
    ]);

    return getUserCourseProgress(
      userId,
    );
  };