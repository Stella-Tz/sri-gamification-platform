// client/src/api/caseStudyGuidedImprovementApi.ts

import {
  apiClient,
} from "./apiClient";

import type {
  GuidedImprovementCheckResult,
  GuidedImprovementData,
  GuidedImprovementQuestionId,
} from "../features/caseStudy/improvement/guidedImprovement.types";


// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export const caseStudyGuidedImprovementApi = {
  async getGuidedImprovement():
    Promise<
      GuidedImprovementData
    > {
    return apiClient<
      GuidedImprovementData
    >(
      "/case-study/guided-improvement",
    );
  },

  async checkAnswer(
    questionId:
      GuidedImprovementQuestionId,

    selectedOptionValue:
      string,
  ): Promise<
    GuidedImprovementCheckResult
  > {
    return apiClient<
      GuidedImprovementCheckResult
    >(
      "/case-study/guided-improvement/check",
      {
        method: "POST",

        body:
          JSON.stringify({
            questionId,
            selectedOptionValue,
          }),
      },
    );
  },

  async advance():
    Promise<
      GuidedImprovementData
    > {
    return apiClient<
      GuidedImprovementData
    >(
      "/case-study/guided-improvement/next",
      {
        method: "POST",
      },
    );
  },
};
