// client/src/api/caseStudyResultsApi.ts

import {
  apiClient,
} from "./apiClient";

import type {
  CaseStudyResultsData,
  ResultsInvestigationAdvanceResult,
  ResultsInvestigationCheckResult,
} from "../features/caseStudy/results/caseStudyResults.types";


// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export const caseStudyResultsApi = {
  getResults:
    async (): Promise<
      CaseStudyResultsData
    > => {
      return apiClient<
        CaseStudyResultsData
      >(
        "/case-study/results",
      );
    },

  checkAnswer:
    async (
      questionId: string,
      selectedAnswers:
        readonly string[],
    ): Promise<
      ResultsInvestigationCheckResult
    > => {
      return apiClient<
        ResultsInvestigationCheckResult
      >(
        "/case-study/results/investigation/check",
        {
          method:
            "POST",

          body:
            JSON.stringify({
              questionId,

              selectedAnswers:
                [...selectedAnswers],
            }),
        },
      );
    },

  advanceInvestigation:
    async (): Promise<
      ResultsInvestigationAdvanceResult
    > => {
      return apiClient<
        ResultsInvestigationAdvanceResult
      >(
        "/case-study/results/investigation/next",
        {
          method:
            "POST",
        },
      );
    },
};