import prisma from "../prismaClient.js";
import { getOrCreateProgress } from "./progressService.js";

export type CaseStudyAnswerInput = {
  serviceId: string;
  selectedLevelId: string;
  share?: number;
};

const getSriClass = (score: number) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  if (score >= 35) return "E";
  if (score >= 20) return "F";
  return "G";
};

const average = (values: number[]) => {
  if (values.length === 0) return 0;

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length
  );
};

export const getCaseStudiesOverview = async (userId: string) => {
  const progress = await getOrCreateProgress(userId);

  const [caseStudies, attempts, course, fullProgress] = await Promise.all([
    prisma.caseStudy.findMany({
      orderBy: { order: "asc" },
    }),

    prisma.caseStudyAttempt.findMany({
      where: { progressId: progress.id },
      orderBy: { createdAt: "desc" },
    }),

    prisma.course.findFirst({
      include: {
        sections: true,
      },
    }),

    prisma.userCourseProgress.findUnique({
      where: { id: progress.id },
      include: {
        completedSections: true,
      },
    }),
  ]);

  const totalSections = course?.sections.length ?? 0;
  const completedSections = fullProgress?.completedSections.length ?? 0;

  const theoryCompleted =
    totalSections > 0 && completedSections === totalSections;

  return caseStudies.map((caseStudy) => {
    const latestAttempt =
      attempts.find((attempt) => attempt.caseStudyId === caseStudy.id) ?? null;

    const baselineAttempt =
      attempts.find(
        (attempt) =>
          attempt.caseStudyId === caseStudy.id && attempt.type === "BASELINE"
      ) ?? null;

    const improvementAttempt =
      attempts.find(
        (attempt) =>
          attempt.caseStudyId === caseStudy.id && attempt.type === "IMPROVEMENT"
      ) ?? null;

    const status = !theoryCompleted
      ? "locked"
      : improvementAttempt
      ? "fully_completed"
      : baselineAttempt
      ? "baseline_completed"
      : "available";

    return {
      id: caseStudy.id,
      title: caseStudy.title,
      description: caseStudy.description,
      order: caseStudy.order,
      difficulty: caseStudy.difficulty,
      status,
      latestResult: latestAttempt
        ? {
            totalScore: latestAttempt.totalScore,
            sriClass: latestAttempt.sriClass,
            energyScore: latestAttempt.energyScore,
            userNeedsScore: latestAttempt.userNeedsScore,
            flexibilityScore: latestAttempt.flexibilityScore,
          }
        : null,
      baselineResult: baselineAttempt
        ? {
            totalScore: baselineAttempt.totalScore,
            sriClass: baselineAttempt.sriClass,
          }
        : null,
      improvementResult: improvementAttempt
        ? {
            totalScore: improvementAttempt.totalScore,
            sriClass: improvementAttempt.sriClass,
          }
        : null,
    };
  });
};

export const getCaseStudyDetails = async (caseStudyId: string) => {
  return prisma.caseStudy.findUnique({
    where: { id: caseStudyId },
    include: {
      services: {
        orderBy: { order: "asc" },
        include: {
          levels: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });
};

export const submitCaseStudy = async (input: {
  userId: string;
  caseStudyId: string;
  type: "BASELINE" | "IMPROVEMENT";
  answers: CaseStudyAnswerInput[];
}) => {
  const progress = await getOrCreateProgress(input.userId);

  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id: input.caseStudyId },
    include: {
      services: {
        orderBy: { order: "asc" },
        include: {
          levels: true,
        },
      },
    },
  });

  if (!caseStudy) {
    return { status: "not_found" as const };
  }

  if (input.answers.length !== caseStudy.services.length) {
    return { status: "incomplete_answers" as const };
  }

  const selectedLevels = input.answers
    .map((answer) => {
      const service = caseStudy.services.find(
        (item) => item.id === answer.serviceId
      );

      const level = service?.levels.find(
        (item) => item.id === answer.selectedLevelId
      );

      if (!service || !level) return null;

      return {
        service,
        level,
        share: answer.share ?? 100,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (selectedLevels.length !== caseStudy.services.length) {
    return { status: "invalid_answers" as const };
  }

  const totalScore = average(selectedLevels.map((item) => item.level.score));

  const energyScore = average(
    selectedLevels.map((item) => item.level.energyImpact)
  );

  const userNeedsScore = average(
    selectedLevels.map((item) => item.level.userNeedsImpact)
  );

  const flexibilityScore = average(
    selectedLevels.map((item) => item.level.flexibilityImpact)
  );

  const domainScores = selectedLevels.map((item) => ({
    domain: item.service.domain,
    serviceId: item.service.id,
    serviceTitle: item.service.title,
    score: item.level.score,
  }));

  const strongestDomain =
    [...domainScores].sort((a, b) => b.score - a.score)[0]?.domain ?? null;

  const weakestDomain =
    [...domainScores].sort((a, b) => a.score - b.score)[0]?.domain ?? null;

  const impactScores = [
    { name: "Energy Performance", score: energyScore },
    { name: "User Needs", score: userNeedsScore },
    { name: "Flexibility", score: flexibilityScore },
  ];

  const weakestImpact =
    [...impactScores].sort((a, b) => a.score - b.score)[0]?.name ?? null;

  const attempt = await prisma.caseStudyAttempt.create({
    data: {
      progressId: progress.id,
      caseStudyId: caseStudy.id,
      type: input.type,
      status:
        input.type === "BASELINE"
          ? "BASELINE_COMPLETED"
          : "IMPROVEMENT_COMPLETED",
      totalScore,
      sriClass: getSriClass(totalScore),
      energyScore,
      userNeedsScore,
      flexibilityScore,
      strongestDomain,
      weakestDomain,
      weakestImpact,
      answers: {
        create: selectedLevels.map((item) => ({
          serviceId: item.service.id,
          selectedLevelId: item.level.id,
          share: item.share,
        })),
      },
    },
  });

  const baselineAttempt =
    input.type === "IMPROVEMENT"
      ? await prisma.caseStudyAttempt.findFirst({
          where: {
            progressId: progress.id,
            caseStudyId: caseStudy.id,
            type: "BASELINE",
          },
          orderBy: {
            createdAt: "desc",
          },
        })
      : null;

  return {
    status: "success" as const,
    data: {
      attemptId: attempt.id,
      caseStudyId: caseStudy.id,
      caseStudyTitle: caseStudy.title,
      type: attempt.type.toLowerCase(),
      status: attempt.status.toLowerCase(),
      totalScore,
      sriClass: attempt.sriClass,
      energyScore,
      userNeedsScore,
      flexibilityScore,
      strongestDomain,
      weakestDomain,
      weakestImpact,
      domainScores,
      comparison: baselineAttempt
        ? {
            baselineScore: baselineAttempt.totalScore,
            improvedScore: totalScore,
            improvement: totalScore - baselineAttempt.totalScore,
            baselineClass: baselineAttempt.sriClass,
            improvedClass: attempt.sriClass,
          }
        : null,
    },
  };
};