import type { AssessmentType } from "@prisma/client";
import prisma from "../prismaClient.js";

export const mapAssessmentType = (type: AssessmentType) => {
  return type === "QUIZ" ? "quiz" : "final-test";
};

export const getOrCreateProgress = async (userId: string) => {
  return prisma.userCourseProgress.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
};

export const getProgressView = async (userId: string) => {
  const progress = await getOrCreateProgress(userId);

  const fullProgress = await prisma.userCourseProgress.findUnique({
    where: { id: progress.id },
    include: {
      completedItems: true,
      completedSections: true,
      unlockedBadges: true,
      assessmentAttempts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return {
    completedItemIds:
      fullProgress?.completedItems.map((item) => item.itemId) ?? [],

    completedSectionIds:
      fullProgress?.completedSections.map((section) => section.sectionId) ?? [],

    unlockedBadgeIds:
      fullProgress?.unlockedBadges.map((badge) => badge.badgeCode) ?? [],

    assessmentAttempts:
      fullProgress?.assessmentAttempts.map((attempt) => ({
        id: attempt.id,
        assessmentId: attempt.assessmentId,
        type: mapAssessmentType(attempt.type),
        correctCount: attempt.correctCount,
        wrongCount: attempt.wrongCount,
        totalQuestions: attempt.totalQuestions,
        accuracy: attempt.accuracy,
        passed: attempt.passed,
        createdAt: attempt.createdAt,
      })) ?? [],
  };
};

export const completeProgressItem = async (
  progressId: string,
  itemId: string
) => {
  return prisma.completedItem.upsert({
    where: {
      progressId_itemId: {
        progressId,
        itemId,
      },
    },
    update: {},
    create: {
      progressId,
      itemId,
    },
  });
};

export const completeProgressSectionAndUnlockBadge = async (
  progressId: string,
  sectionId: string
) => {
  const section = await prisma.courseSection.findUnique({
    where: { id: sectionId },
  });

  if (!section) return null;

  await prisma.completedSection.upsert({
    where: {
      progressId_sectionId: {
        progressId,
        sectionId,
      },
    },
    update: {},
    create: {
      progressId,
      sectionId,
    },
  });

  await prisma.unlockedBadge.upsert({
    where: {
      progressId_badgeCode: {
        progressId,
        badgeCode: section.badgeCode,
      },
    },
    update: {},
    create: {
      progressId,
      badgeCode: section.badgeCode,
    },
  });

  return section;
};

export const resetProgress = async (progressId: string) => {
  await prisma.completedItem.deleteMany({
    where: { progressId },
  });

  await prisma.completedSection.deleteMany({
    where: { progressId },
  });

  await prisma.unlockedBadge.deleteMany({
    where: { progressId },
  });

  await prisma.assessmentAttempt.deleteMany({
    where: { progressId },
  });
};