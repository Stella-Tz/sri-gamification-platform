import { Router } from "express";
import prisma from "../prismaClient.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAnswerMap, submitAssessment } from "../services/assessmentService.js";
import { isItemAccessible } from "../services/courseAccessService.js";
import {
  completeProgressItem,
  getOrCreateProgress,
  getProgressView,
  resetProgress,
} from "../services/progressService.js";

const router = Router();

const getStringParam = (value: string | string[] | undefined) => {
  if (!value || Array.isArray(value)) return null;
  return value;
};

router.get("/progress", authMiddleware, async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const progress = await getProgressView(userId);

    return res.json(progress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load progress" });
  }
});

router.post("/items/:itemId/complete", authMiddleware, async (req, res) => {
  try {
    const userId = req.session.userId;
    const itemId = getStringParam(req.params.itemId);

    if (!userId || !itemId) {
      return res.status(400).json({ message: "Missing user or item id" });
    }

    const item = await prisma.courseItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return res.status(404).json({ message: "Course item not found" });
    }

    if (item.type !== "THEORY") {
      return res.status(400).json({
        message: "Only theory items can be completed directly.",
      });
    }

    const accessible = await isItemAccessible(userId, itemId);

    if (!accessible) {
      return res.status(403).json({
        message: "This item is locked.",
      });
    }

    const progress = await getOrCreateProgress(userId);

    await completeProgressItem(progress.id, itemId);

    const updatedProgress = await getProgressView(userId);

    return res.json(updatedProgress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to complete item" });
  }
});

router.post(
  "/assessments/:assessmentId/submit",
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.session.userId;
      const assessmentId = getStringParam(req.params.assessmentId);

      if (!userId || !assessmentId) {
        return res.status(400).json({
          message: "Missing user or assessment id",
        });
      }

      const accessible = await isItemAccessible(userId, assessmentId);

      if (!accessible) {
        return res.status(403).json({
          message: "This assessment is locked.",
        });
      }

      const answerMap = getAnswerMap(req.body.answers);

      if (!answerMap) {
        return res.status(400).json({
          message: "Invalid answers format.",
        });
      }

      const result = await submitAssessment({
        userId,
        assessmentId,
        answerMap,
      });

      if (result.status === "not_found") {
        return res.status(404).json({
          message: "Assessment not found.",
        });
      }

      if (result.status === "incomplete_answers") {
        return res.status(400).json({
          message: "Please answer all questions before submitting.",
        });
      }

      return res.json(result.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failed to submit assessment.",
      });
    }
  }
);

router.post("/progress/reset", authMiddleware, async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const progress = await getOrCreateProgress(userId);

    await resetProgress(progress.id);

    const updatedProgress = await getProgressView(userId);

    return res.json(updatedProgress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to reset progress" });
  }
});

router.post("/dev/progress/reset/:userId", async (req, res) => {
  try {
    const userId = getStringParam(req.params.userId);

    if (!userId) {
      return res.status(400).json({ message: "Missing user id" });
    }

    const progress = await getOrCreateProgress(userId);

    await resetProgress(progress.id);

    const updatedProgress = await getProgressView(userId);

    return res.json(updatedProgress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to reset progress" });
  }
});

export default router;