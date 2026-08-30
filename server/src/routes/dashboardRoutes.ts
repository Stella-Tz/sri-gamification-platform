import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getDashboardView } from "../services/dashboardService.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    const dashboard = await getDashboardView(userId);

    if (!dashboard) {
      return res.status(404).json({
        message: "Dashboard data not found",
      });
    }

    return res.json(dashboard);
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      message: "Failed to load dashboard",
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
});

export default router;