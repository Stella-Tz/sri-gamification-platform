import type {
  Request,
  Response,
} from "express";

import { Router } from "express";

import {
  authMiddleware,
} from "../middleware/authMiddleware.js";

import {
  completeLesson,
  CourseAccessError,
  getUserCourseProgress,
  resetUserCourseProgress,
} from "../services/courseProgressService.js";

import {
  CourseAssessmentError,
  getFinalTestAttempt,
  getLessonQuiz,
  completeLessonQuiz,
  startFinalTest,
  submitFinalTestAnswer,
  validateLessonQuizAnswer,
} from "../services/courseAssessmentService.js";

const router = Router();

/*
 * All Course routes require an
 * authenticated user.
 */
router.use(authMiddleware);

const getAuthenticatedUserId = (
  req: Request,
): string => {
  /*
   * authMiddleware has already verified
   * that userId exists.
   */
  return req.session.userId!;
};

const handleCourseError = (
  error: unknown,
  res: Response,
) => {
  if (
    error instanceof
      CourseAccessError ||
    error instanceof
      CourseAssessmentError
  ) {
    return res.status(400).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message:
      "Failed to process course request.",
  });
};

// -----------------------------------------------------------------------------
// Progress
// -----------------------------------------------------------------------------

router.get(
  "/progress",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const progress =
        await getUserCourseProgress(
          userId,
        );

      return res.json({
        progress,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/lessons/:lessonStepId/complete",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const {
        lessonStepId,
      } = req.params;

      const progress =
        await completeLesson(
          userId,
          lessonStepId,
        );

      return res.json({
        progress,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

/*
 * This mirrors the resetProgress()
 * capability of the current frontend.
 *
 * It is not currently exposed by the UI,
 * but keeping it here is useful for
 * development/testing.
 */
router.post(
  "/progress/reset",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const progress =
        await resetUserCourseProgress(
          userId,
        );

      return res.json({
        progress,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

// -----------------------------------------------------------------------------
// Lesson quizzes
// -----------------------------------------------------------------------------

router.get(
  "/quizzes/:quizStepId",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const { quizStepId } =
        req.params;

      const quiz =
        await getLessonQuiz(
          userId,
          quizStepId,
        );

      return res.json({
        quiz,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/quizzes/:quizStepId/answer",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const { quizStepId } =
        req.params;

      const {
        questionId,
        selectedOptionId,
      } = req.body ?? {};

      if (
        typeof questionId !==
          "string" ||
        typeof selectedOptionId !==
          "string"
      ) {
        return res.status(400).json({
          message:
            "questionId and selectedOptionId are required.",
        });
      }

      const result =
        await validateLessonQuizAnswer(
          userId,
          quizStepId,
          questionId,
          selectedOptionId,
        );

      return res.json({
        result,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/quizzes/:quizStepId/complete",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const { quizStepId } =
        req.params;

      const { answers } =
        req.body ?? {};

      if (!Array.isArray(answers)) {
        return res.status(400).json({
          message:
            "answers must be an array.",
        });
      }

      const validAnswers =
        answers.every(
          (answer) =>
            answer &&
            typeof answer.questionId ===
              "string" &&
            typeof answer.selectedOptionId ===
              "string",
        );

      if (!validAnswers) {
        return res.status(400).json({
          message:
            "Each answer must contain questionId and selectedOptionId.",
        });
      }

      const progress =
        await completeLessonQuiz(
          userId,
          quizStepId,
          answers,
        );

      return res.json({
        progress,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

// -----------------------------------------------------------------------------
// Final tests
// -----------------------------------------------------------------------------

router.post(
  "/final-tests/:finalTestStepId/start",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const {
        finalTestStepId,
      } = req.params;

      const attempt =
        await startFinalTest(
          userId,
          finalTestStepId,
        );

      return res.json({
        attempt,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

router.get(
  "/final-tests/attempts/:attemptId",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const { attemptId } =
        req.params;

      const attempt =
        await getFinalTestAttempt(
          userId,
          attemptId,
        );

      return res.json({
        attempt,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/final-tests/attempts/:attemptId/answer",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      const { attemptId } =
        req.params;

      const {
        questionId,
        selectedOptionId,
      } = req.body ?? {};

      if (
        typeof questionId !==
          "string" ||
        typeof selectedOptionId !==
          "string"
      ) {
        return res.status(400).json({
          message:
            "questionId and selectedOptionId are required.",
        });
      }

      const result =
        await submitFinalTestAnswer(
          userId,
          attemptId,
          questionId,
          selectedOptionId,
        );

      return res.json({
        result,
      });
    } catch (error) {
      return handleCourseError(
        error,
        res,
      );
    }
  },
);

export default router;