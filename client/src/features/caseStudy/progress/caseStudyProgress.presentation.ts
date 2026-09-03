// client/src/features/caseStudy/progress/caseStudyProgress.presentation.ts

import {
  CASE_STUDY_ROUTES,
} from "../../../constants/routes";

import type {
  CaseStudyJourneyStatus,
  CaseStudyRouteStage,
} from "./caseStudyProgress.types";

// -----------------------------------------------------------------------------
// Progress presentation
// -----------------------------------------------------------------------------

export type CaseStudyProgressTone =
  | "available"
  | "active"
  | "completed";

export type CaseStudyProgressPresentation = {
  badgeLabel: string;
  stageLabel: string;
  tone: CaseStudyProgressTone;
};

const presentationByStatus = {
  "not-started": {
    badgeLabel:
      "Available",

    stageLabel:
      "Building Information",

    tone:
      "available",
  },

  "setup-in-progress": {
    badgeLabel:
      "In Progress",

    stageLabel:
      "Building Information",

    tone:
      "active",
  },

  "assessment-not-started": {
    badgeLabel:
      "In Progress",

    stageLabel:
      "Service Assessment",

    tone:
      "active",
  },

  "assessment-in-progress": {
    badgeLabel:
      "In Progress",

    stageLabel:
      "Service Assessment",

    tone:
      "active",
  },

  "results-investigation-not-started":
    {
      badgeLabel:
        "In Progress",

      stageLabel:
        "Results Investigation",

      tone:
        "active",
    },

  "results-investigation-in-progress":
    {
      badgeLabel:
        "In Progress",

      stageLabel:
        "Results Investigation",

      tone:
        "active",
    },

  "improvement-analysis-not-started":
    {
      badgeLabel:
        "In Progress",

      stageLabel:
        "Guided Improvement Analysis",

      tone:
        "active",
    },

  "improvement-analysis-in-progress":
    {
      badgeLabel:
        "In Progress",

      stageLabel:
        "Guided Improvement Analysis",

      tone:
        "active",
    },

  "simulation-ready": {
    badgeLabel:
      "In Progress",

    stageLabel:
      "Simulation",

    tone:
      "active",
  },

  completed: {
    badgeLabel:
      "Completed",

    stageLabel:
      "Comparison & Interpretation",

    tone:
      "completed",
  },
} as const satisfies Record<
  CaseStudyJourneyStatus,
  CaseStudyProgressPresentation
>;

export const getCaseStudyProgressPresentation =
  (
    status:
      CaseStudyJourneyStatus,
  ): CaseStudyProgressPresentation => {
    return presentationByStatus[
      status
    ];
  };

// -----------------------------------------------------------------------------
// Route presentation
// -----------------------------------------------------------------------------

export const getCaseStudyStagePath =
  (
    stage:
      CaseStudyRouteStage,
  ): string => {
    switch (stage) {
      case "setup":
        return (
          CASE_STUDY_ROUTES.setup
        );

      case "assessment":
        return (
          CASE_STUDY_ROUTES
            .assessment
        );

      case "results":
        return (
          CASE_STUDY_ROUTES
            .results
        );

      case "guided-improvement-analysis":
        return (
          CASE_STUDY_ROUTES
            .guidedImprovementAnalysis
        );

      case "simulation-results":
        return (
          CASE_STUDY_ROUTES
            .simulationResults
        );
    }
  };

// -----------------------------------------------------------------------------
// Primary action presentation
// -----------------------------------------------------------------------------

export type CaseStudyPrimaryActionPresentation =
  {
    label: string;
    path: string;
  };

export const getCaseStudyPrimaryActionPresentation =
  ({
    status,
    nextStage,
    isPracticeAttempt,
  }: {
    status:
      CaseStudyJourneyStatus;

    nextStage:
      CaseStudyRouteStage;

    isPracticeAttempt:
      boolean;
  }): CaseStudyPrimaryActionPresentation => {
    let label: string;

    switch (status) {
      case "not-started":
        label =
          isPracticeAttempt
            ? "Start Practice"
            : "Start Case Study";
        break;

      case "setup-in-progress":
        label =
          isPracticeAttempt
            ? "Resume Practice"
            : "Continue Setup";
        break;

      case "assessment-not-started":
        label =
          isPracticeAttempt
            ? "Resume Practice"
            : "Start Assessment";
        break;

      case "assessment-in-progress":
        label =
          isPracticeAttempt
            ? "Resume Practice"
            : "Continue Assessment";
        break;

      case "results-investigation-not-started":
        label =
          isPracticeAttempt
            ? "Resume Practice"
            : "Start Results Investigation";
        break;

      case "results-investigation-in-progress":
        label =
          isPracticeAttempt
            ? "Resume Practice"
            : "Continue Results Investigation";
        break;

      case "improvement-analysis-not-started":
        label =
          isPracticeAttempt
            ? "Resume Practice"
            : "Start Guided Improvement Analysis";
        break;

      case "improvement-analysis-in-progress":
        label =
          isPracticeAttempt
            ? "Resume Practice"
            : "Continue Guided Improvement Analysis";
        break;

      case "simulation-ready":
        label =
          isPracticeAttempt
            ? "Resume Practice"
            : "Continue to Simulation";
        break;

      case "completed":
        label =
          "View Simulation Results";
        break;
    }

    return {
      label,

      /*
       * The backend has already decided
       * which stage comes next.
       *
       * The frontend only converts that
       * stage into a React route.
       */
      path:
        getCaseStudyStagePath(
          nextStage,
        ),
    };
  };