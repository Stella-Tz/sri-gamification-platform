import type { AssessmentType } from "@prisma/client";
import prisma from "../prismaClient.js";

const getProgressPercentage = (completed: number, total: number) => {
  if (total === 0) return 0;

  return Math.round((completed / total) * 100);
};

const getTheoryStatus = (
  completedSections: number,
  totalSections: number
): "not_started" | "in_progress" | "completed" => {
  if (completedSections === 0) {
    return "not_started";
  }

  if (completedSections === totalSections) {
    return "completed";
  }

  return "in_progress";
};

const getFinalTestStats = (
  attempts: {
    type: AssessmentType;
    accuracy: number;
    createdAt: Date;
  }[]
) => {
  const finalTestAttempts = attempts
    .filter((attempt) => attempt.type === "FINAL_TEST")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  if (finalTestAttempts.length === 0) {
    return {
      averageAccuracy: 0,
      bestAccuracy: 0,
      lastQuizAccuracy: 0,
    };
  }

  const averageAccuracy = Math.round(
    finalTestAttempts.reduce((sum, attempt) => sum + attempt.accuracy, 0) /
      finalTestAttempts.length
  );

  const bestAccuracy = Math.max(
    ...finalTestAttempts.map((attempt) => attempt.accuracy)
  );

  return {
    averageAccuracy,
    bestAccuracy,
    lastQuizAccuracy: finalTestAttempts[0].accuracy,
  };
};

export const getDashboardView = async (userId: string) => {
  const [user, course, progress] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        language: true,
      },
    }),

    prisma.course.findFirst({
      include: {
        sections: {
          orderBy: { order: "asc" },
          include: {
            items: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    }),

    prisma.userCourseProgress.findUnique({
      where: { userId },
      include: {
        completedSections: true,
        unlockedBadges: true,
        assessmentAttempts: {
          orderBy: { createdAt: "desc" },
        },
        caseStudyAttempts: {
          orderBy: { createdAt: "desc" },
          include: {
            caseStudy: true,
          },
        },
      },
    }),
  ]);

  if (!user || !course) {
    return null;
  }

  const completedSectionIds =
    progress?.completedSections.map((section) => section.sectionId) ?? [];

  const unlockedBadgeIds =
    progress?.unlockedBadges.map((badge) => badge.badgeCode) ?? [];

  const completedSections = completedSectionIds.length;
  const totalSections = course.sections.length;

  const progressPercentage = getProgressPercentage(
    completedSections,
    totalSections
  );

  const theoryStatus = getTheoryStatus(completedSections, totalSections);

  const currentSection =
    course.sections.find(
      (section) => !completedSectionIds.includes(section.id)
    ) ?? null;

  const achievements = course.sections.map((section) => ({
    id: section.badgeCode,
    code: section.badgeCode,
    title: section.badgeLabel.replace(" Badge", ""),
    status: unlockedBadgeIds.includes(section.badgeCode)
      ? "unlocked"
      : "locked",
  }));

  const learningJourney = [
    ...course.sections.map((section, index) => {
      let status: "completed" | "current" | "locked" = "locked";

      if (completedSectionIds.includes(section.id)) {
        status = "completed";
      } else if (index === completedSections) {
        status = "current";
      }

      return {
        id: section.id,
        code: section.id,
        title: section.title.replace(/^Section \d+ — /, ""),
        order: section.order,
        status,
      };
    }),

    {
      id: "case-study-stage",
      code: "case-study-stage",
      title: "Case Studies",
      order: totalSections + 1,
      status:
        theoryStatus === "completed"
          ? ("current" as const)
          : ("locked" as const),
    },
  ];

  const finalTestStats = getFinalTestStats(progress?.assessmentAttempts ?? []);

  const assessmentProgress = course.sections
    .map((section) => {
      const finalTest = section.items.find(
        (item) => item.type === "FINAL_TEST"
      );

      if (!finalTest) {
        return null;
      }

      const latestAttempt =
        progress?.assessmentAttempts.find(
          (attempt) => attempt.assessmentId === finalTest.id
        ) ?? null;

      if (!latestAttempt) {
        return null;
      }

      return {
        sectionId: section.id,
        sectionTitle: section.title.replace(/^Section \d+ — /, ""),
        assessmentId: finalTest.id,
        accuracy: latestAttempt.accuracy,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const latestCaseStudyAttempt =
    progress?.caseStudyAttempts.find(
      (attempt) =>
        attempt.status === "BASELINE_COMPLETED" ||
        attempt.status === "IMPROVEMENT_COMPLETED"
    ) ?? null;

  return {
    user,

    achievements,

    learningJourney,

    assessmentProgress,

    theoryProgress: {
      completedUnits: completedSections,
      totalUnits: totalSections,
      currentUnitTitle: currentSection?.title ?? null,
      status: theoryStatus,
    },

    quizStats: finalTestStats,

    courseStats: {
      completedModules: completedSections,
      totalModules: totalSections,
      progressPercentage,
      nextMilestonePercentage:
        theoryStatus === "completed"
          ? null
          : getProgressPercentage(completedSections + 1, totalSections),
    },

    caseStudy: {
      status:
        theoryStatus !== "completed"
          ? "locked"
          : latestCaseStudyAttempt?.status === "IMPROVEMENT_COMPLETED"
          ? "fully_completed"
          : latestCaseStudyAttempt?.status === "BASELINE_COMPLETED"
          ? "baseline_completed"
          : "available",

      currentTitle: "Case Study 1: Small Office Building",

      currentStepLabel:
        latestCaseStudyAttempt?.status === "BASELINE_COMPLETED"
          ? "Improvement challenge"
          : null,

      completedCaseStudyIds: latestCaseStudyAttempt
        ? [latestCaseStudyAttempt.caseStudyId]
        : [],

      latestResult: latestCaseStudyAttempt
        ? {
            caseStudyId: latestCaseStudyAttempt.caseStudyId,
            caseStudyTitle: latestCaseStudyAttempt.caseStudy.title,
            sriScore: latestCaseStudyAttempt.totalScore,
            sriClass: latestCaseStudyAttempt.sriClass,
            energy: latestCaseStudyAttempt.energyScore,
            userNeeds: latestCaseStudyAttempt.userNeedsScore,
            flexibility: latestCaseStudyAttempt.flexibilityScore,
            strongestDomain: latestCaseStudyAttempt.strongestDomain ?? "-",
            weakestImpact: latestCaseStudyAttempt.weakestImpact ?? "-",
          }
        : null,
    },

    nextActionState:
      theoryStatus === "not_started"
        ? "start-learning"
        : theoryStatus === "in_progress"
        ? "continue-learning"
        : latestCaseStudyAttempt?.status === "BASELINE_COMPLETED"
        ? "improve-score"
        : latestCaseStudyAttempt?.status === "IMPROVEMENT_COMPLETED"
        ? "course-completed"
        : "start-case-study",

    caseStudyCardState:
      theoryStatus !== "completed"
        ? "locked"
        : latestCaseStudyAttempt
        ? "completed"
        : "unlocked-not-started",

    lockedCaseStudyProgressPercentage: progressPercentage,
  };
};