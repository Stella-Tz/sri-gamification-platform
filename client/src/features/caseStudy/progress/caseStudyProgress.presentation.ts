// client/src/features/caseStudy/progress/caseStudyProgress.presentation.ts

import type {
  CaseStudyJourneyStatus,
} from "./caseStudyProgress.types";

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
    badgeLabel: "Available",
    stageLabel:
      "Building Information",
    tone: "available",
  },

  "setup-in-progress": {
    badgeLabel: "In Progress",
    stageLabel:
      "Building Information",
    tone: "active",
  },

  "assessment-not-started": {
    badgeLabel: "In Progress",
    stageLabel:
      "Service Assessment",
    tone: "active",
  },

  "assessment-in-progress": {
    badgeLabel: "In Progress",
    stageLabel:
      "Service Assessment",
    tone: "active",
  },

  "results-investigation-not-started":
    {
      badgeLabel: "In Progress",
      stageLabel:
        "Results Investigation",
      tone: "active",
    },

  "results-investigation-in-progress":
    {
      badgeLabel: "In Progress",
      stageLabel:
        "Results Investigation",
      tone: "active",
    },

  "improvement-analysis-not-started":
    {
      badgeLabel: "In Progress",
      stageLabel:
        "Guided Improvement Analysis",
      tone: "active",
    },

  "improvement-analysis-in-progress":
    {
      badgeLabel: "In Progress",
      stageLabel:
        "Guided Improvement Analysis",
      tone: "active",
    },

  "simulation-ready": {
    badgeLabel: "In Progress",
    stageLabel:
      "Simulation",
    tone: "active",
  },

  completed: {
    badgeLabel: "Completed",
    stageLabel:
      "Comparison & Interpretation",
    tone: "completed",
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