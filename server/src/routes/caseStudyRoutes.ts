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
  CaseStudyAccessError,
  completeSetup,
  getCaseStudyProgress,
  saveSetupDraft,
  startNewCaseStudyPracticeAttempt,
} from "../services/caseStudyService.js";

import {
  getCaseStudyDefinition,
} from "../services/caseStudyDefinitionService.js";

import {
  getCaseStudyAssessment,
  saveAssessmentAnswer,
  setActiveAssessmentService,
  submitCaseStudyAssessment,
  validateAssessmentServiceAnswer,
} from "../services/caseStudyAssessmentService.js";

import {
  advanceGuidedImprovement,
  checkGuidedImprovementAnswer,
  getCaseStudyGuidedImprovement,
} from "../services/caseStudyGuidedImprovementService.js";

import {
  advanceResultsInvestigation,
  checkResultsInvestigationAnswer,
  getCaseStudyResults,
} from "../services/caseStudyResultsService.js";

import {
  getCaseStudySimulation,
  runCaseStudySimulation,
} from "../services/caseStudySimulationService.js";

const router = Router();

router.use(
  authMiddleware,
);

const getAuthenticatedUserId = (
  req: Request,
): string => {
  return req.session.userId!;
};

const handleCaseStudyError = (
  error: unknown,
  res: Response,
) => {
  if (
    error instanceof
    CaseStudyAccessError
  ) {
    return res.status(400).json({
      message:
        error.message,
    });
  }

  console.error(
    error,
  );

  return res.status(500).json({
    message:
      "Failed to process Case Study request.",
  });
};

router.get(
  "/definition",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const definition =
        await getCaseStudyDefinition(
          userId,
        );

      return res.json({
        definition,
      });
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.get(
  "/progress",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const progress =
        await getCaseStudyProgress(
          userId,
        );

      return res.json({
        progress,
      });
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.put(
  "/setup",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const { answers } =
        req.body ?? {};

      if (
        !answers ||
        typeof answers !==
          "object" ||
        !answers
          .buildingInformation ||
        !answers
          .methodologySelection ||
        !answers.domainPresence
      ) {
        return res
          .status(400)
          .json({
            message:
              "Setup answers are required.",
          });
      }

      const progress =
        await saveSetupDraft(
          userId,
          answers,
        );

      return res.json({
        progress,
      });
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/setup/complete",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const { answers } =
        req.body ?? {};

      if (
        !answers ||
        typeof answers !==
          "object" ||
        !answers
          .buildingInformation ||
        !answers
          .methodologySelection ||
        !answers.domainPresence
      ) {
        return res
          .status(400)
          .json({
            message:
              "Setup answers are required.",
          });
      }

      const result =
        await completeSetup(
          userId,
          answers,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.get(
  "/assessment",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const assessment =
        await getCaseStudyAssessment(
          userId,
        );

      return res.json({
        assessment,
      });
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.put(
  "/assessment/active-service",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const { serviceId } =
        req.body ?? {};

      if (
        typeof serviceId !==
          "string" ||
        !serviceId.trim()
      ) {
        return res
          .status(400)
          .json({
            message:
              "Service ID is required.",
          });
      }

      const result =
        await setActiveAssessmentService(
          userId,
          serviceId,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.put(
  "/assessment/answers/:serviceId",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const serviceId =
        req.params.serviceId;

      const { answer } =
        req.body ?? {};

      if (
        !serviceId ||
        !answer ||
        typeof answer !==
          "object" ||
        typeof answer
          .selectedLevelId !==
          "string" ||
        typeof answer.share !==
          "number"
      ) {
        return res
          .status(400)
          .json({
            message:
              "A valid service answer is required.",
          });
      }

      const result =
        await saveAssessmentAnswer(
          userId,
          serviceId,
          answer,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/assessment/answers/:serviceId/validate",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const serviceId =
        req.params.serviceId;

      const { answer } =
        req.body ?? {};

      if (
        !serviceId ||
        !answer ||
        typeof answer !==
          "object" ||
        typeof answer
          .selectedLevelId !==
          "string" ||
        typeof answer.share !==
          "number"
      ) {
        return res
          .status(400)
          .json({
            message:
              "A valid service answer is required.",
          });
      }

      const result =
        await validateAssessmentServiceAnswer(
          userId,
          serviceId,
          answer,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/assessment/submit",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const result =
        await submitCaseStudyAssessment(
          userId,
        );

      /*
       * Return the canonical journey state
       * together with the baseline result.
       *
       * The client can therefore update the
       * shared CaseStudyProgressProvider before
       * navigating to Results, avoiding a stale
       * RouteGuard decision.
       */
      const progress =
        await getCaseStudyProgress(
          userId,
        );

      return res.json({
        ...result,
        progress,
      });
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.get(
  "/results",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const results =
        await getCaseStudyResults(
          userId,
        );

      return res.json(
        results,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/results/investigation/check",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const {
        questionId,
        selectedAnswers,
      } =
        req.body ?? {};

      if (
        typeof questionId !==
          "string" ||
        !Array.isArray(
          selectedAnswers,
        ) ||
        !selectedAnswers.every(
          (answer) =>
            typeof answer ===
            "string",
        )
      ) {
        return res
          .status(400)
          .json({
            message:
              "A valid Results Investigation answer is required.",
          });
      }

      const result =
        await checkResultsInvestigationAnswer(
          userId,
          questionId,
          selectedAnswers,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/results/investigation/next",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const result =
        await advanceResultsInvestigation(
          userId,
        );

      /*
       * Results Investigation progress and the
       * overall Case Study journey are different
       * pieces of state.
       *
       * After every successful Next, return the
       * freshly derived canonical journey state.
       * On the final question this is what unlocks
       * Guided Improvement for the shared frontend
       * RouteGuard without requiring a second GET.
       */
      const caseStudyProgress =
        await getCaseStudyProgress(
          userId,
        );

      return res.json({
        ...result,
        caseStudyProgress,
      });
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.get(
  "/guided-improvement",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const result =
        await getCaseStudyGuidedImprovement(
          userId,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
); 

router.post(
  "/guided-improvement/check",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const {
        questionId,
        selectedOptionValue,
      } =
        req.body ?? {};

      if (
        typeof questionId !==
          "string" ||
        typeof selectedOptionValue !==
          "string"
      ) {
        return res
          .status(400)
          .json({
            message:
              "A valid Guided Improvement answer is required.",
          });
      }

      const result =
        await checkGuidedImprovementAnswer(
          userId,
          questionId,
          selectedOptionValue,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/guided-improvement/next",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const result =
        await advanceGuidedImprovement(
          userId,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.get(
  "/simulation",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const preference =
        req.query.source ===
        "official"
          ? "official"
          : "default";

      const result =
        await getCaseStudySimulation(
          userId,
          preference,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/simulation/run",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const result =
        await runCaseStudySimulation(
          userId,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

router.post(
  "/practice-again",
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(
          req,
        );

      const progress =
        await startNewCaseStudyPracticeAttempt(
          userId,
        );

      return res.json({
        progress,
      });
    } catch (error) {
      return handleCaseStudyError(
        error,
        res,
      );
    }
  },
);

export default router;
