import type {
  AssessmentType,
  CourseItemType,
  LessonBlockType,
} from "@prisma/client";
import prisma from "../prismaClient.js";
import { getCourseWithItems } from "./courseAccessService.js";
import { getProgressView } from "./progressService.js";

export const mapItemType = (type: CourseItemType) => {
  if (type === "THEORY") return "theory";
  if (type === "QUIZ") return "quiz";
  return "final-test";
};

export const mapLessonBlockType = (type: LessonBlockType) => {
  if (type === "PARAGRAPH") return "paragraph";
  return "bullet_list";
};

export const mapAssessmentType = (type: AssessmentType) => {
  if (type === "QUIZ") return "quiz";
  return "final-test";
};

const getProgressPercentage = (completed: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

const getAllOrderedItems = (
  course: NonNullable<Awaited<ReturnType<typeof getCourseWithItems>>>
) => {
  return course.sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section,
    }))
  );
};

const getCurrentItemIdFromCourse = (
  course: NonNullable<Awaited<ReturnType<typeof getCourseWithItems>>>,
  completedItemIds: string[]
) => {
  const orderedItems = getAllOrderedItems(course);

  return (
    orderedItems.find((item) => !completedItemIds.includes(item.id))?.id ?? null
  );
};

const getItemStatus = (
  itemId: string,
  currentItemId: string | null,
  completedItemIds: string[]
) => {
  if (completedItemIds.includes(itemId)) return "completed";
  if (currentItemId === itemId) return "current";
  return "locked";
};

const getSectionStatus = (
  section: NonNullable<
    Awaited<ReturnType<typeof getCourseWithItems>>
  >["sections"][number],
  currentItemId: string | null,
  completedSectionIds: string[]
) => {
  if (completedSectionIds.includes(section.id)) return "completed";

  const hasCurrentItem = section.items.some((item) => item.id === currentItemId);

  return hasCurrentItem ? "current" : "locked";
};

export const getCourseOverview = async (userId: string) => {
  const course = await getCourseWithItems();

  if (!course) return null;

  const progress = await getProgressView(userId);

  const completedSections = progress.completedSectionIds.length;
  const totalSections = course.sections.length;

  const currentItemId = getCurrentItemIdFromCourse(
    course,
    progress.completedItemIds
  );

  const sections = course.sections.map((section) => {
    const sectionStatus = getSectionStatus(
      section,
      currentItemId,
      progress.completedSectionIds
    );

    return {
      id: section.id,
      title: section.title,
      description: section.description,
      order: section.order,
      badgeCode: section.badgeCode,
      badgeLabel: section.badgeLabel,
      status: sectionStatus,
      items: section.items.map((item) => ({
        id: item.id,
        sectionId: item.sectionId,
        type: mapItemType(item.type),
        title: item.title,
        subtitle: item.subtitle,
        order: item.order,
        status: getItemStatus(item.id, currentItemId, progress.completedItemIds),
      })),
    };
  });

  const currentSection =
    sections.find((section) => section.status === "current") ?? null;

  const currentItem =
    sections
      .flatMap((section) => section.items)
      .find((item) => item.status === "current") ?? null;

  const caseStudiesUnlocked = completedSections === totalSections;

  return {
    id: course.id,
    title: currentSection
      ? `Current section: ${currentSection.title.replace(/^Section \d+ — /, "")}`
      : "Course completed",
    subtitle: currentItem
      ? `You completed ${completedSections} of ${totalSections} sections. Your next step is ${currentItem.title}.`
      : "You completed all theory sections. The case studies stage is now unlocked.",
    progressPercentage: getProgressPercentage(completedSections, totalSections),
    completedSections,
    totalSections,
    currentItem,
    currentItemLabel: currentItem?.title ?? null,
    currentSectionOrder: currentSection?.order ?? null,
    sections,
    caseStudiesStage: {
      title: "Final Stage — Case Studies",
      description:
        "Apply everything you learned in realistic building scenarios. This stage becomes available only after completing the full theory path and passing all final tests.",
      status: caseStudiesUnlocked ? "available" : "locked",
      unlockRequirementText: caseStudiesUnlocked
        ? "Case studies are now available. You can continue with the practical SRI assessment stage."
        : "Complete all theory sections successfully to unlock the practical assessment stage and access the Case Studies page.",
    },
  };
};

export const getLessonContent = async (input: {
  sectionId: string;
  lessonId: string;
}) => {
  const lesson = await prisma.lessonContent.findFirst({
    where: {
      itemId: input.lessonId,
      item: {
        sectionId: input.sectionId,
        type: "THEORY",
      },
    },
    include: {
      item: true,
      blocks: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!lesson) return null;

  return {
    itemId: lesson.itemId,
    sectionId: lesson.item.sectionId,
    title: lesson.item.title,
    subtitle: lesson.item.subtitle,
    blocks: lesson.blocks.map((block) => ({
      id: block.id,
      type: mapLessonBlockType(block.type),
      content: block.content ?? undefined,
      items: block.items,
    })),
  };
};

export const getAssessmentContent = async (input: {
  sectionId: string;
  itemId: string;
}) => {
  const assessment = await prisma.assessmentContent.findFirst({
    where: {
      itemId: input.itemId,
      item: {
        sectionId: input.sectionId,
      },
    },
    include: {
      item: true,
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

  if (!assessment) return null;

  return {
    itemId: assessment.itemId,
    sectionId: assessment.item.sectionId,
    title: assessment.item.title,
    subtitle: assessment.item.subtitle,
    type: mapAssessmentType(assessment.type),
    allowedMistakes: assessment.allowedMistakes ?? undefined,
    questions: assessment.questions.map((question) => ({
      id: question.id,
      prompt: question.prompt,
      correctOptionId: question.correctOptionId,
      explanation: question.explanation,
      options: question.options.map((option) => ({
        id: option.id,
        label: option.label,
        text: option.text,
      })),
    })),
  };
};