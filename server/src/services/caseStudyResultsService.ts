import {
  CaseStudyRouteStage,
  Prisma,
} from "@prisma/client";

import prisma from "../prismaClient.js";

import {
  assertCaseStudyUnlocked,
  CASE_STUDY_ID,
  CaseStudyAccessError,
} from "./caseStudyService.js";

import {
  toPublicSriResult,
} from "./sriCalculationService.js";

import type {
  SriCalculationResultInternal,
} from "./sriCalculationService.js";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ResultsInvestigationFeedback =
  | "correct"
  | "wrong";

export type ResultsInvestigationAnswer = {
  questionId: string;

  selectedAnswers:
    string[];

  feedback:
    ResultsInvestigationFeedback;

  attempts: number;
};

export type ResultsInvestigationProgress = {
  currentIndex: number;

  answers:
    ResultsInvestigationAnswer[];

  completed: boolean;
};

type CheckInvestigationAnswerResult = {
  feedback:
    | "correct"
    | "wrong"
    | "empty";

  feedbackMessage: string;

  persisted: boolean;

  progress:
    ResultsInvestigationProgress;
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const createEmptyInvestigationProgress =
  (): ResultsInvestigationProgress => ({
    currentIndex: 0,

    answers: [],

    completed: false,
  });

const readInvestigationProgress = (
  value: Prisma.JsonValue | null,
): ResultsInvestigationProgress => {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return createEmptyInvestigationProgress();
  }

  const raw =
    value as {
      currentIndex?: unknown;
      answers?: unknown;
      completed?: unknown;
    };

  const currentIndex =
    typeof raw.currentIndex ===
      "number" &&
    Number.isInteger(
      raw.currentIndex,
    )
      ? Math.max(
          0,
          raw.currentIndex,
        )
      : 0;

  const answers:
    ResultsInvestigationAnswer[] =
    Array.isArray(raw.answers)
      ? raw.answers.flatMap(
          (item) => {
            if (
              !item ||
              typeof item !==
                "object" ||
              Array.isArray(item)
            ) {
              return [];
            }

            const answer =
              item as {
                questionId?:
                  unknown;

                selectedAnswers?:
                  unknown;

                feedback?:
                  unknown;

                attempts?:
                  unknown;
              };

            if (
              typeof answer
                .questionId !==
                "string" ||
              !Array.isArray(
                answer
                  .selectedAnswers,
              ) ||
              !answer
                .selectedAnswers
                .every(
                  (value) =>
                    typeof value ===
                    "string",
                ) ||
              (
                answer.feedback !==
                  "correct" &&
                answer.feedback !==
                  "wrong"
              ) ||
              typeof answer.attempts !==
                "number" ||
              !Number.isInteger(
                answer.attempts,
              ) ||
              answer.attempts < 1
            ) {
              return [];
            }

            return [
              {
                questionId:
                  answer
                    .questionId,

                selectedAnswers:
                  [
                    ...answer
                      .selectedAnswers,
                  ],

                feedback:
                  answer
                    .feedback,

                attempts:
                  answer
                    .attempts,
              },
            ];
          },
        )
      : [];

  return {
    currentIndex,

    answers,

    completed:
      raw.completed === true,
  };
};

const getAnswerForQuestion = (
  progress:
    ResultsInvestigationProgress,

  questionId: string,
) => {
  return (
    progress.answers.find(
      (answer) =>
        answer.questionId ===
        questionId,
    ) ?? null
  );
};

const upsertAnswer = (
  answers:
    readonly ResultsInvestigationAnswer[],

  nextAnswer:
    ResultsInvestigationAnswer,
): ResultsInvestigationAnswer[] => {
  return [
    ...answers.filter(
      (answer) =>
        answer.questionId !==
        nextAnswer.questionId,
    ),

    nextAnswer,
  ];
};

const areAnswersEqual = (
  selectedAnswers:
    readonly string[],

  correctAnswers:
    readonly string[],
): boolean => {
  if (
    selectedAnswers.length !==
    correctAnswers.length
  ) {
    return false;
  }

  const selectedSet =
    new Set(
      selectedAnswers,
    );

  return correctAnswers.every(
    (answer) =>
      selectedSet.has(
        answer,
      ),
  );
};

const formatList = (
  values:
    readonly string[],
): string => {
  if (values.length === 0) {
    return "";
  }

  if (values.length === 1) {
    return values[0] ?? "";
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values
    .slice(0, -1)
    .join(", ")}, and ${
    values[
      values.length - 1
    ]
  }`;
};

const getCorrectFeedback = (
  questionId: string,
): string => {
  const feedback:
    Record<string, string> = {
      "lowest-key-functionality":
        "Correct. You identified the lowest-scoring key functionality in the current assessment.",

      "related-impact-criteria":
        "Correct. These are the impact criteria used to calculate the selected key functionality.",

      "lowest-impact-within-functionality":
        "Correct. You identified the lowest-scoring impact criterion within the selected key functionality.",

      "lowest-domain-for-impact":
        "Correct. You identified all technical domains that share the lowest score for the selected impact criterion.",

      "candidate-services-for-improvement":
        "Correct. These service(s) affect the selected impact criterion and still have room for improvement.",
    };

  return (
    feedback[questionId] ??
    "Correct. This confirms the next step in the investigation."
  );
};

const getWrongFeedback = (
  questionId: string,

  findings:
    SriCalculationResultInternal[
      "guidedInvestigationFindings"
    ],
): string => {
  const domainLabel =
    formatList(
      findings
        .weakestTechnicalDomains,
    );

  switch (questionId) {
    case "lowest-key-functionality":
      return "Not quite. Compare the three key functionality scores and identify the one with the lowest score.";

    case "related-impact-criteria":
      return `Not quite. Use the relationship shown above and select all impact criteria associated with ${findings.weakestKeyFunctionality}.`;

    case "lowest-impact-within-functionality":
      return `Not quite. Compare the scores of the impact criteria associated with ${findings.weakestKeyFunctionality} and identify the lowest-scoring one.`;

    case "lowest-domain-for-impact":
      return `Not quite. In the detailed score matrix, look under ${findings.lowestImpactCriterion} and identify all technical domains that share the lowest score.`;

    case "candidate-services-for-improvement":
      return `Not quite. Review ${domainLabel} in the Assessed Services by Domain card. Look for services that affect ${findings.lowestImpactCriterion} and are not already at their maximum functionality level.`;

    default:
      return "Not quite. Review the relevant assessment results and try again.";
  }
};

// -----------------------------------------------------------------------------
// Results context
// -----------------------------------------------------------------------------

const getResultsContext =
  async (
    userId: string,
  ) => {
    await assertCaseStudyUnlocked(
      userId,
    );

    const progress =
      await prisma
        .userCaseStudyProgress
        .findUnique({
          where: {
            userId_caseStudyId: {
              userId,

              caseStudyId:
                CASE_STUDY_ID,
            },
          },

          include: {
            activeAttempt:
              true,
          },
        });

    const attempt =
      progress
        ?.activeAttempt ??
      null;

    if (
      !progress ||
      !attempt ||
      !attempt
        .assessmentCompleted ||
      !attempt
        .baselineResult
    ) {
      throw new CaseStudyAccessError(
        "Complete the Service Assessment before viewing Results.",
      );
    }

    /*
     * baselineResult is created only by our
     * backend calculation service.
     */
    const result =
      attempt
        .baselineResult as unknown as
        SriCalculationResultInternal;

    if (
      !Array.isArray(
        result
          .guidedInvestigationQuestions,
      )
    ) {
      throw new Error(
        "Stored SRI baseline result is invalid.",
      );
    }

    const investigation =
      readInvestigationProgress(
        attempt
          .resultsInvestigation,
      );

    /*
     * Protect against an invalid old index.
     */
    const safeIndex =
      result
        .guidedInvestigationQuestions
        .length === 0
        ? 0
        : Math.min(
            investigation
              .currentIndex,

            result
              .guidedInvestigationQuestions
              .length -
              1,
          );

    return {
      progress,
      attempt,
      result,

      investigation: {
        ...investigation,

        currentIndex:
          safeIndex,
      },
    };
  };

const saveInvestigationProgress =
  async ({
    attemptId,
    investigation,
  }: {
    attemptId: string;

    investigation:
      ResultsInvestigationProgress;
  }) => {
    await prisma
      .caseStudyAttempt
      .update({
        where: {
          id:
            attemptId,
        },

        data: {
          lastVisitedStage:
            CaseStudyRouteStage
              .RESULTS,

          resultsInvestigation:
            investigation as unknown as
              Prisma.InputJsonValue,

          /*
           * If Results Investigation really
           * changes, later stages are no
           * longer canonical.
           */
          guidedImprovement:
            Prisma.DbNull,

          simulationResult:
            Prisma.DbNull,

          completedAt:
            null,
        },
      });
  };

// -----------------------------------------------------------------------------
// GET Results
// -----------------------------------------------------------------------------

export const getCaseStudyResults =
  async (
    userId: string,
  ) => {
    const {
      result,
      investigation,
    } =
      await getResultsContext(
        userId,
      );

    const currentQuestion =
      result
        .guidedInvestigationQuestions[
          investigation.currentIndex
        ] ?? null;

    const currentAnswer =
      currentQuestion
        ? getAnswerForQuestion(
            investigation,
            currentQuestion.id,
          )
        : null;

    const currentFeedbackMessage =
      currentQuestion &&
      currentAnswer
        ? currentAnswer.feedback ===
          "correct"
          ? getCorrectFeedback(
              currentQuestion.id,
            )
          : getWrongFeedback(
              currentQuestion.id,
              result
                .guidedInvestigationFindings,
            )
        : null;

    return {
      result:
        toPublicSriResult(
          result,
        ),

      investigation,

      currentFeedbackMessage,

      /*
       * Do not reveal the hidden findings
       * while the learner is still solving
       * the investigation.
       *
       * They become visible in the summary
       * only after completion.
       */
      findings:
        investigation.completed
          ? result
              .guidedInvestigationFindings
          : null,
    };
  };

  export const checkResultsInvestigationAnswer =
  async (
    userId: string,

    questionId: string,

    selectedAnswers:
      string[],
  ): Promise<
    CheckInvestigationAnswerResult
  > => {
    const {
      progress,
      attempt,
      result,
      investigation,
    } =
      await getResultsContext(
        userId,
      );

    /*
     * The permanent official attempt can
     * still be reviewed, but never changed.
     */
    if (
      progress
        .officialAttemptId ===
        attempt.id
    ) {
      throw new CaseStudyAccessError(
        "The official completed Case Study can be reviewed but not modified.",
      );
    }

    if (
      investigation.completed
    ) {
      throw new CaseStudyAccessError(
        "The Results Investigation is already completed.",
      );
    }

    const currentQuestion =
      result
        .guidedInvestigationQuestions[
          investigation
            .currentIndex
        ] ?? null;

    if (!currentQuestion) {
      throw new Error(
        "Current Results Investigation question was not found.",
      );
    }

    if (
      currentQuestion.id !==
      questionId
    ) {
      throw new CaseStudyAccessError(
        "Only the current Results Investigation question can be checked.",
      );
    }

    /*
     * Same behaviour as frontend:
     * empty Check Answer is feedback only.
     * It does NOT increment attempts and is
     * not persisted.
     */
    if (
      selectedAnswers.length ===
      0
    ) {
      return {
        feedback:
          "empty",

        feedbackMessage:
          "Please select at least one answer before checking.",

        persisted:
          false,

        progress:
          investigation,
      };
    }

    const allowedValues =
      new Set(
        currentQuestion
          .options
          .map(
            (option) =>
              option.value,
          ),
      );

    if (
      selectedAnswers.some(
        (value) =>
          !allowedValues.has(
            value,
          ),
      )
    ) {
      throw new CaseStudyAccessError(
        "One or more selected options are not valid for this question.",
      );
    }

    if (
      currentQuestion.type ===
        "single-choice" &&
      selectedAnswers.length !==
        1
    ) {
      throw new CaseStudyAccessError(
        "Select exactly one answer for this question.",
      );
    }

    const isCorrect =
      areAnswersEqual(
        selectedAnswers,

        currentQuestion
          .correctOptionValues,
      );

    const existingAnswer =
      getAnswerForQuestion(
        investigation,

        questionId,
      );

    const nextAnswer:
      ResultsInvestigationAnswer =
      {
        questionId,

        selectedAnswers: [
          ...selectedAnswers,
        ],

        feedback:
          isCorrect
            ? "correct"
            : "wrong",

        attempts:
          (
            existingAnswer
              ?.attempts ??
            0
          ) + 1,
      };

    const nextProgress:
      ResultsInvestigationProgress =
      {
        ...investigation,

        answers:
          upsertAnswer(
            investigation
              .answers,

            nextAnswer,
          ),

        completed:
          false,
      };

    await saveInvestigationProgress({
      attemptId:
        attempt.id,

      investigation:
        nextProgress,
    });

    return {
      feedback:
        nextAnswer
          .feedback,

      feedbackMessage:
        isCorrect
          ? getCorrectFeedback(
              questionId,
            )
          : getWrongFeedback(
              questionId,

              result
                .guidedInvestigationFindings,
            ),

      persisted:
        true,

      progress:
        nextProgress,
    };
  };

export const advanceResultsInvestigation =
  async (
    userId: string,
  ) => {
    const {
      progress,
      attempt,
      result,
      investigation,
    } =
      await getResultsContext(
        userId,
      );

    if (
      progress
        .officialAttemptId ===
        attempt.id
    ) {
      throw new CaseStudyAccessError(
        "The official completed Case Study can be reviewed but not modified.",
      );
    }

    /*
     * Calling Next again after completion
     * is harmless and does not rewrite state.
     */
    if (
      investigation.completed
    ) {
      return {
        progress:
          investigation,

        findings:
          result
            .guidedInvestigationFindings,
      };
    }

    const questions =
      result
        .guidedInvestigationQuestions;

    const currentQuestion =
      questions[
        investigation
          .currentIndex
      ] ?? null;

    if (!currentQuestion) {
      throw new Error(
        "Current Results Investigation question was not found.",
      );
    }

    const currentAnswer =
      getAnswerForQuestion(
        investigation,

        currentQuestion.id,
      );

    /*
     * Same UI rule as now:
     * Next appears only after a correct answer.
     * The server also enforces it.
     */
    if (
      currentAnswer
        ?.feedback !==
      "correct"
    ) {
      throw new CaseStudyAccessError(
        "Answer the current question correctly before continuing.",
      );
    }

    const isLastQuestion =
      investigation
        .currentIndex ===
      questions.length - 1;

    if (isLastQuestion) {
      const nextProgress:
        ResultsInvestigationProgress =
        {
          ...investigation,

          completed:
            true,
        };

      await saveInvestigationProgress({
        attemptId:
          attempt.id,

        investigation:
          nextProgress,
      });

      return {
        progress:
          nextProgress,

        /*
         * Findings now become visible
         * in the Investigation Summary.
         */
        findings:
          result
            .guidedInvestigationFindings,
      };
    }

    const nextProgress:
      ResultsInvestigationProgress =
      {
        ...investigation,

        currentIndex:
          investigation
            .currentIndex +
          1,

        completed:
          false,
      };

    await saveInvestigationProgress({
      attemptId:
        attempt.id,

      investigation:
        nextProgress,
    });

    return {
      progress:
        nextProgress,

      findings:
        null,
    };
  };