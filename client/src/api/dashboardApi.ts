//client\src\api\dashboardApi.ts

import { apiClient } from "./apiClient";
import type { DashboardViewModel } from "../features/dashboard/dashboard.types";

export const dashboardApi = {
  async getDashboard(): Promise<DashboardViewModel> {
    return apiClient<DashboardViewModel>("/dashboard");
  },
};