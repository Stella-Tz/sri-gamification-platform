import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isItemAccessible } from "../services/courseAccessService.js";
import {
  getAssessmentContent,
  getCourseOverview,
  getLessonContent,
} from "../services/courseService.js";

const router = Router();

const getStringParam = (value: string | string[] | undefined) => {
  if (!value || Array.isArray(value)) return null;
  return value;
};

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const courseOverview = await getCourseOverview(userId);

    if (!courseOverview) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json(courseOverview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load course" });
  }
});

router.get("/lessons/:sectionId/:lessonId", authMiddleware, async (req, res) => {
  try {
    const userId = req.session.userId;
    const sectionId = getStringParam(req.params.sectionId);
    const lessonId = getStringParam(req.params.lessonId);

    if (!userId || !sectionId || !lessonId) {
      return res.status(400).json({ message: "Missing section or lesson id" });
    }

    const accessible = await isItemAccessible(userId, lessonId);

    if (!accessible) {
      return res.status(403).json({ message: "This lesson is locked." });
    }

    const lesson = await getLessonContent({
      sectionId,
      lessonId,
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    return res.json(lesson);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load lesson" });
  }
});

router.get(
  "/assessments/:sectionId/:itemId",
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.session.userId;
      const sectionId = getStringParam(req.params.sectionId);
      const itemId = getStringParam(req.params.itemId);

      if (!userId || !sectionId || !itemId) {
        return res
          .status(400)
          .json({ message: "Missing section or assessment id" });
      }

      const accessible = await isItemAccessible(userId, itemId);

      if (!accessible) {
        return res.status(403).json({ message: "This assessment is locked." });
      }

      const assessment = await getAssessmentContent({
        sectionId,
        itemId,
      });

      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      return res.json(assessment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to load assessment" });
    }
  }
);

export default router;