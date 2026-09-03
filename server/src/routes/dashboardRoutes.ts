// server/src/routes/dashboardRoutes.ts

import type {
  Request,
  Response,
} from "express";

import {
  Router,
} from "express";

import {
  authMiddleware,
} from "../middleware/authMiddleware.js";

import {
  getDashboardData,
} from "../services/dashboardService.js";

const router =
  Router();

router.use(
  authMiddleware,
);

const getAuthenticatedUserId = (
  req: Request,
): string => {
  return req.session.userId!;
};

const handleDashboardError = (
  error: unknown,
  res: Response,
) => {
  console.error(error);

  return res
    .status(500)
    .json({
      message:
        "Failed to load dashboard data.",
    });
};

router.get(
  "/",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const dashboard =
        await getDashboardData(
          userId,
        );

      return res.json({
        dashboard,
      });
    } catch (error) {
      return handleDashboardError(
        error,
        res,
      );
    }
  },
);

export default router;
