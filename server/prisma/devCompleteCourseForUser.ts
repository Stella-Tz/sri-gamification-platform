//npx tsx prisma/devCompleteCourseForUser.ts test@example.com

import "dotenv/config";

import {
  CourseStepType,
  FinalTestAttemptStatus,
} from "@prisma/client";

import prisma from "../src/prismaClient.js";

const COURSE_ID =
  "sri-course";

const email =
  process.argv[2]?.trim();

if (!email) {
  throw new Error(
    "Give the user's email as an argument.",
  );
}

const main = async () => {
  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (!user) {
    throw new Error(
      `User "${email}" was not found.`,
    );
  }

  const course =
    await prisma.course.findUnique({
      where: {
        id: COURSE_ID,
      },

      include: {
        sections: {
          orderBy: {
            order: "asc",
          },

          include: {
            steps: {
              orderBy: {
                order: "asc",
              },
            },

            questions: {
              include: {
                options: {
                  orderBy: {
                    order: "asc",
                  },
                },
              },
            },
          },
        },
      },
    });

  if (!course) {
    throw new Error(
      "Course was not found.",
    );
  }

  await prisma.$transaction(
    async (tx) => {
      for (
        const section
        of course.sections
      ) {
        for (
          const step
          of section.steps
        ) {
          /*
           * LESSON + QUIZ
           */
          if (
            step.type ===
              CourseStepType.LESSON ||
            step.type ===
              CourseStepType.QUIZ
          ) {
            await tx
              .userCompletedCourseStep
              .upsert({
                where: {
                  userId_stepId: {
                    userId:
                      user.id,

                    stepId:
                      step.id,
                  },
                },

                update: {},

                create: {
                  userId:
                    user.id,

                  stepId:
                    step.id,
                },
              });

            continue;
          }

          /*
           * FINAL TEST
           */
          if (
            step.type !==
            CourseStepType.FINAL_TEST
          ) {
            continue;
          }

          const alreadyPassed =
            await tx
              .finalTestAttempt
              .findFirst({
                where: {
                  userId:
                    user.id,

                  finalTestStepId:
                    step.id,

                  status:
                    FinalTestAttemptStatus.PASSED,
                },
              });

          if (alreadyPassed) {
            continue;
          }

          await tx.finalTestAttempt.deleteMany({
            where: {
              userId:
                user.id,

              finalTestStepId:
                step.id,

              status:
                FinalTestAttemptStatus.IN_PROGRESS,
            },
          });

          const questions =
            section.questions;

          if (
            questions.length === 0
          ) {
            throw new Error(
              `No questions found for ${step.id}.`,
            );
          }

          const completedAt =
            new Date();

          await tx
            .finalTestAttempt
            .create({
              data: {
                userId:
                  user.id,

                finalTestStepId:
                  step.id,

                status:
                  FinalTestAttemptStatus.PASSED,

                allowedMistakes:
                  Math.floor(
                    questions.length *
                      0.2,
                  ),

                completedAt,

                questions: {
                  create:
                    questions.map(
                      (
                        question,
                        index,
                      ) => ({
                        questionId:
                          question.id,

                        position:
                          index + 1,

                        optionOrder:
                          question.options.map(
                            (option) =>
                              option.key,
                          ),

                        /*
                         * Development-only:
                         * simulate a perfect
                         * completed test.
                         */
                        selectedOptionKey:
                          question
                            .correctOptionKey,

                        isCorrect:
                          true,

                        answeredAt:
                          completedAt,
                      }),
                    ),
                },
              },
            });
        }
      }
    },
  );

  console.log(
    `Course completed for ${user.email}.`,
  );
};

main()
  .catch(
    (error) => {
      console.error(error);

      process.exitCode =
        1;
    },
  )
  .finally(
    async () => {
      await prisma.$disconnect();
    },
  );