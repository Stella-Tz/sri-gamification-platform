import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getCaseStudiesOverview,
  getCaseStudyDetails,
  submitCaseStudy,
} from "../services/caseStudyService.js";

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

    const caseStudies = await getCaseStudiesOverview(userId);

    return res.json(caseStudies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to load case studies.",
    });
  }
});

router.get("/:caseStudyId", authMiddleware, async (req, res) => {
  try {
    const caseStudyId = getStringParam(req.params.caseStudyId);

    if (!caseStudyId) {
      return res.status(400).json({ message: "Missing case study id." });
    }

    const caseStudy = await getCaseStudyDetails(caseStudyId);

    if (!caseStudy) {
      return res.status(404).json({ message: "Case study not found." });
    }

    return res.json(caseStudy);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to load case study.",
    });
  }
});

router.post("/:caseStudyId/submit", authMiddleware, async (req, res) => {
  try {
    const userId = req.session.userId;
    const caseStudyId = getStringParam(req.params.caseStudyId);

    if (!userId || !caseStudyId) {
      return res.status(400).json({
        message: "Missing user or case study id.",
      });
    }

    const type = req.body.type === "IMPROVEMENT" ? "IMPROVEMENT" : "BASELINE";

    if (!Array.isArray(req.body.answers)) {
      return res.status(400).json({
        message: "Invalid answers format.",
      });
    }

    const result = await submitCaseStudy({
      userId,
      caseStudyId,
      type,
      answers: req.body.answers,
    });

    if (result.status === "not_found") {
      return res.status(404).json({
        message: "Case study not found.",
      });
    }

    if (result.status === "incomplete_answers") {
      return res.status(400).json({
        message: "Please complete all services before submitting.",
      });
    }

    if (result.status === "invalid_answers") {
      return res.status(400).json({
        message: "Some selected levels are not valid.",
      });
    }

    return res.json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to submit case study.",
    });
  }
});

export default router;