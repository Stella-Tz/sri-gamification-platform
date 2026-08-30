import prisma from "../prismaClient.js";
import { getProgressView } from "./progressService.js";

export const getCourseWithItems = async () => {
  return prisma.course.findFirst({
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
  });
};

export const getAllOrderedCourseItems = async () => {
  const course = await getCourseWithItems();

  if (!course) return [];

  return course.sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section,
    }))
  );
};

export const getCurrentItemId = async (userId: string) => {
  const [course, progress] = await Promise.all([
    getCourseWithItems(),
    getProgressView(userId),
  ]);

  if (!course) return null;

  const orderedItems = course.sections.flatMap((section) => section.items);

  return (
    orderedItems.find((item) => !progress.completedItemIds.includes(item.id))
      ?.id ?? null
  );
};

export const isItemAccessible = async (
  userId: string,
  itemId: string
) => {
  const progress = await getProgressView(userId);

  // already completed
  if (progress.completedItemIds.includes(itemId)) {
    return true;
  }

  // current progression item
  const currentItemId = await getCurrentItemId(userId);

  return currentItemId === itemId;
};