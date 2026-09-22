// server/src/services/dashboardService.ts

import type {
  Prisma,
} from "@prisma/client";

import prisma from "../prismaClient.js";


import {
  CASE_STUDY_ID,
} from "./caseStudyService.js";

import {
  toPublicSriResult,
  type SriCalculationResultInternal,
  type SriCalculationResultPublic,
} from "./sriCalculationService.js";

import {
  toPublicSimulationResult,
  type CaseStudySimulationResultInternal,
  type CaseStudySimulationResultPublic,
} from "./caseStudySimulationService.js";

export type DashboardUserDto = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  language: string;
};

export type DashboardDataDto = {
  user:
    DashboardUserDto;

  caseStudy: {
    id:
      | string
      | null;

    title:
      | string
      | null;

    /*
     * The current active attempt's baseline
     * result. Used before the learner has a
     * permanent official completion.
     */
    activeBaselineResult:
      | SriCalculationResultPublic
      | null;

    /*
     * The first permanent official Simulation
     * result. Practice Again never replaces it.
     */
    officialSimulationResult:
      | CaseStudySimulationResultPublic
      | null;
  };
};

const readStoredSriResult = (
  value:
    | Prisma.JsonValue
    | null,
): SriCalculationResultInternal | null => {
  if (!value) {
    return null;
  }

  if (
    typeof value !==
      "object" ||
    Array.isArray(value)
  ) {
    throw new Error(
      "Stored Dashboard baseline result is invalid.",
    );
  }

  return value as unknown as
    SriCalculationResultInternal;
};

const readStoredSimulationResult = (
  value:
    | Prisma.JsonValue
    | null,
): CaseStudySimulationResultInternal | null => {
  if (!value) {
    return null;
  }

  if (
    typeof value !==
      "object" ||
    Array.isArray(value)
  ) {
    throw new Error(
      "Stored Dashboard Simulation result is invalid.",
    );
  }

  return value as unknown as
    CaseStudySimulationResultInternal;
};

/**
 * Dashboard backend boundary.
 *
 * This service deliberately returns canonical
 * backend data, not a presentation-specific
 * DashboardViewModel.
 *
 * Card labels, icons, routes and layout remain
 * frontend presentation concerns.
 */
export const getDashboardData =
  async (
    userId: string,
  ): Promise<
    DashboardDataDto
  > => {
    const [
      user,
      caseStudy,
      storedCaseStudyProgress,
    ] =
      await Promise.all([
        prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            language: true,
          },
        }),

        prisma.caseStudy.findUnique({
          where: {
            id:
              CASE_STUDY_ID,
          },
          select: {
            id: true,
            title: true,
          },
        }),

        prisma.userCaseStudyProgress.findUnique({
          where: {
            userId_caseStudyId: {
              userId,
              caseStudyId:
                CASE_STUDY_ID,
            },
          },
          select: {
            activeAttempt: {
              select: {
                baselineResult:
                  true,
              },
            },
            officialAttempt: {
              select: {
                simulationResult:
                  true,
              },
            },
          },
        }),
      ]);

    if (!user) {
      throw new Error(
        "Authenticated user was not found.",
      );
    }

    const activeBaselineResult =
      readStoredSriResult(
        storedCaseStudyProgress
          ?.activeAttempt
          ?.baselineResult ??
          null,
      );

    const officialSimulationResult =
      readStoredSimulationResult(
        storedCaseStudyProgress
          ?.officialAttempt
          ?.simulationResult ??
          null,
      );

    return {
      user,

      caseStudy: {
        id:
          caseStudy?.id ??
          null,

        title:
          caseStudy?.title ??
          null,

        activeBaselineResult:
          activeBaselineResult
            ? toPublicSriResult(
                activeBaselineResult,
              )
            : null,

        officialSimulationResult:
          officialSimulationResult
            ? toPublicSimulationResult(
                officialSimulationResult,
              )
            : null,
      },
    };
  };
