// client/src/api/caseStudySimulationApi.ts

import {
  apiClient,
} from "./apiClient";

import type {
  CaseStudySimulationData,
  CaseStudySimulationReadPreference,
  CaseStudySimulationRunResult,
} from "../features/caseStudy/simulation/caseStudySimulation.types";

export const caseStudySimulationApi = {
  getSimulation:
    async (
      preference:
        CaseStudySimulationReadPreference =
          "default",
    ): Promise<
      CaseStudySimulationData
    > => {
      const path =
        preference ===
          "official"
          ? "/case-study/simulation?source=official"
          : "/case-study/simulation";

      return apiClient<
        CaseStudySimulationData
      >(
        path,
      );
    },

  runSimulation:
    async (): Promise<
      CaseStudySimulationRunResult
    > => {
      return apiClient<
        CaseStudySimulationRunResult
      >(
        "/case-study/simulation/run",
        {
          method:
            "POST",
        },
      );
    },
};