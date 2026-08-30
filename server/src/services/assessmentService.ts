import prisma from "../prismaClient.js";
import {
  completeProgressItem,
  completeProgressSectionAndUnlockBadge,
  getOrCreateProgress,
  getProgressView,
  mapAssessmentType,
} from "./progressService.js";

export type SubmittedAnswer = {
  questionId: string;
  selectedOptionId: string;
};

export const getAnswerMap = (
  answers: unknown
): Map<string, string> | null => {
  if (!Array.isArray(answers)) return null;

  const answerMap = new Map<string, string>();

  for (const answer of answers) {
    if (
      typeof answer !== "object" ||
      answer === null ||
      !("questionId" in answer) ||
      !("selectedOptionId" in answer)
    ) {
      return null;
    }

    const typedAnswer = answer as SubmittedAnswer;

    if (
      typeof typedAnswer.questionId !== "string" ||
      typeof typedAnswer.selectedOptionId !== "string"
    ) {
      return null;
    }

    answerMap.set(typedAnswer.questionId, typedAnswer.selectedOptionId);
  }

  return answerMap;
};

export const submitAssessment = async (input: {
  userId: string;
  assessmentId: string;
  answerMap: Map<string, string>;
}) => {
  const assessment = await prisma.assessmentContent.findUnique({
    where: { itemId: input.assessmentId },
    include: {
      item: {
        include: {
          section: true,
        },
      },
      questions: {
        orderBy: { order: "asc" },
        include: {
          options: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!assessment) {
    return {
      status: "not_found" as const,
    };
  }

  if (input.answerMap.size !== assessment.questions.length) {
    return {
      status: "incomplete_answers" as const,
    };
  }

  const questionResults = assessment.questions.map((question) => {
    const selectedOptionId = input.answerMap.get(question.id) ?? null;
    const isCorrect = selectedOptionId === question.correctOptionId;

    return {
      questionId: question.id,
      selectedOptionId,
      correctOptionId: question.correctOptionId,
      isCorrect,
      explanation: question.explanation,
    };
  });

  const correctCount = questionResults.filter(
    (question) => question.isCorrect
  ).length;

  const totalQuestions = assessment.questions.length;
  const wrongCount = totalQuestions - correctCount;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  const allowedMistakes =
    assessment.type === "FINAL_TEST" ? assessment.allowedMistakes ?? 0 : null;

  const passed =
    assessment.type === "QUIZ" ? true : wrongCount <= (allowedMistakes ?? 0);

  const progress = await getOrCreateProgress(input.userId);

  await prisma.assessmentAttempt.create({
    data: {
      progressId: progress.id,
      assessmentId: assessment.itemId,
      type: assessment.type,
      correctCount,
      wrongCount,
      totalQuestions,
      accuracy,
      passed,
    },
  });

  if (passed) {
    await completeProgressItem(progress.id, assessment.itemId);

    if (assessment.type === "FINAL_TEST") {
      await completeProgressSectionAndUnlockBadge(
        progress.id,
        assessment.item.sectionId
      );
    }
  }

  const updatedProgress = await getProgressView(input.userId);

  return {
    status: "success" as const,
    data: {
      assessmentId: assessment.itemId,
      type: mapAssessmentType(assessment.type),
      passed,
      correctCount,
      wrongCount,
      totalQuestions,
      accuracy,
      allowedMistakes,
      questionResults,
      progress: updatedProgress,
    },
  };
};