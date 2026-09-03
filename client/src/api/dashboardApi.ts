// client/src/api/dashboardApi.ts

import {
  apiClient,
} from "./apiClient";

import type {
  DashboardDataDto,
} from "../features/dashboard/dashboard.types";

type DashboardResponse = {
  dashboard:
    DashboardDataDto;
};

export const dashboardApi = {
  async getDashboard():
    Promise<
      DashboardDataDto
    > {
    const response =
      await apiClient<
        DashboardResponse
      >(
        "/dashboard",
      );

    return response.dashboard;
  },
};