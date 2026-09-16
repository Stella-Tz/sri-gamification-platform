import {
  CaseStudyRouteStage,
  Prisma,
} from "@prisma/client";

import prisma from "../prismaClient.js";

import {
  assertCaseStudyUnlocked,
  CASE_STUDY_ID,
  CaseStudyAccessError,
} from "./caseStudyService.js";

import {
  getCompletedGuidedImprovementScenario,
} from "./caseStudyGuidedImprovementService.js";

import {
  calculateSriSimulatedResult,
  toPublicSriResult,
} from "./sriCalculationService.js";

import type {
  SriCalculationResultInternal,
  SriCalculationResultPublic,
} from "./sriCalculationService.js";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type CaseStudySimulationResultInternal = {
  before:
    SriCalculationResultInternal;

  after:
    SriCalculationResultInternal;

  upgradedService: {
    serviceId: string;
    serviceCode: string;
    serviceName: string;
    serviceGroup: string;

    technicalDomain: string;
    impactCriterion: string;

    previousLevelId: string;
    previousLevelNumber: number;
    previousLevelDescription: string;

    simulatedLevelId: string;
    simulatedLevelNumber: number;
    simulatedLevelDescription: string;
  };

  sriDelta: number;
};

export type CaseStudySimulationResultPublic = {
  before:
    SriCalculationResultPublic;

  after:
    SriCalculationResultPublic;

  upgradedService:
    CaseStudySimulationResultInternal[
      "upgradedService"
    ];

  sriDelta: number;
};

type SimulationSource =
  | "active"
  | "official"
  | null;

export type SimulationReadPreference =
  | "default"
  | "official";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const SIMULATION_EPSILON =
  1e-9;

const readStoredSriResult = (
  value:
    Prisma.JsonValue
    | null,
): SriCalculationResultInternal => {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw new Error(
      "Stored SRI result is missing or invalid.",
    );
  }

  return value as unknown as
    SriCalculationResultInternal;
};

const readStoredSimulationResult = (
  value:
    Prisma.JsonValue
    | null,
): CaseStudySimulationResultInternal => {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw new Error(
      "Stored Simulation result is missing or invalid.",
    );
  }

  const result =
    value as unknown as
      CaseStudySimulationResultInternal;

  if (
    !result.before ||
    !result.after ||
    !result.upgradedService ||
    typeof result.sriDelta !==
      "number" ||
    !Number.isFinite(
      result.sriDelta,
    )
  ) {
    throw new Error(
      "Stored Simulation result is invalid.",
    );
  }

  return result;
};

export const toPublicSimulationResult =
  (
    result:
      CaseStudySimulationResultInternal,
  ): CaseStudySimulationResultPublic => {
    return {
      before:
        toPublicSriResult(
          result.before,
        ),

      after:
        toPublicSriResult(
          result.after,
        ),

      upgradedService:
        result.upgradedService,

      sriDelta:
        result.sriDelta,
    };
  };

const getSimulationContext =
  async (
    userId: string,
  ) => {
    await assertCaseStudyUnlocked(
      userId,
    );

    const progress =
      await prisma
        .userCaseStudyProgress
        .findUnique({
          where: {
            userId_caseStudyId: {
              userId,

              caseStudyId:
                CASE_STUDY_ID,
            },
          },

          include: {
            activeAttempt:
              true,

            officialAttempt:
              true,
          },
        });

    if (!progress) {
      throw new CaseStudyAccessError(
        "Start the Case Study before using the Simulation.",
      );
    }

    return progress;
  };

// -----------------------------------------------------------------------------
// GET Simulation
// -----------------------------------------------------------------------------

export const getCaseStudySimulation =
  async (
    userId: string,

    preference:
      SimulationReadPreference =
        "default",
  ): Promise<{
    simulationResult:
      | CaseStudySimulationResultPublic
      | null;

    source:
      SimulationSource;
  }> => {
    const progress =
      await getSimulationContext(
        userId,
      );

    /*
     * Dashboard official-result review.
     *
     * This deliberately ignores a newer active
     * Practice Again result and returns only the
     * first permanent official Simulation.
     */
    if (
      preference ===
      "official"
    ) {
      if (
        progress
          .officialAttempt
          ?.simulationResult
      ) {
        return {
          simulationResult:
            toPublicSimulationResult(
              readStoredSimulationResult(
                progress
                  .officialAttempt
                  .simulationResult,
              ),
            ),

          source:
            "official",
        };
      }

      return {
        simulationResult:
          null,

        source:
          null,
      };
    }

    /*
     * Normal Case Study fallback:
     *
     * 1. current active-attempt simulation
     * 2. first permanent official simulation
     */
    if (
      progress
        .activeAttempt
        ?.simulationResult
    ) {
      return {
        simulationResult:
          toPublicSimulationResult(
            readStoredSimulationResult(
              progress
                .activeAttempt
                .simulationResult,
            ),
          ),

        source:
          "active",
      };
    }

    if (
      progress
        .officialAttempt
        ?.simulationResult
    ) {
      return {
        simulationResult:
          toPublicSimulationResult(
            readStoredSimulationResult(
              progress
                .officialAttempt
                .simulationResult,
            ),
          ),

        source:
          "official",
      };
    }

    return {
      simulationResult:
        null,

      source:
        null,
    };
  };

// -----------------------------------------------------------------------------
// Run Simulation
// -----------------------------------------------------------------------------

export const runCaseStudySimulation =
  async (
    userId: string,
  ) => {
    const progress =
      await getSimulationContext(
        userId,
      );

    const attempt =
      progress
        .activeAttempt;

    if (!attempt) {
      throw new CaseStudyAccessError(
        "No active Case Study attempt is available.",
      );
    }

    /*
     * Running the endpoint again after a successful
     * simulation is idempotent. Do not recalculate
     * or rewrite the completed attempt.
     */
    if (
      attempt
        .simulationResult
    ) {
      return {
        simulationResult:
          toPublicSimulationResult(
            readStoredSimulationResult(
              attempt
                .simulationResult,
            ),
          ),

        isOfficialAttempt:
          progress
            .officialAttemptId ===
          attempt.id,
      };
    }

    if (
      progress
        .officialAttemptId ===
        attempt.id
    ) {
      throw new Error(
        "Official Case Study attempt is marked as completed but has no Simulation result.",
      );
    }

    if (
      !attempt
        .assessmentCompleted ||
      !attempt
        .baselineResult
    ) {
      throw new CaseStudyAccessError(
        "Complete the Service Assessment before running the Simulation.",
      );
    }

    const {
      attemptId:
        guidedAttemptId,

      findings,
    } =
      await getCompletedGuidedImprovementScenario(
        userId,
      );

    if (
      guidedAttemptId !==
      attempt.id
    ) {
      throw new Error(
        "Guided Improvement state does not belong to the active Case Study attempt.",
      );
    }

    const service =
      findings
        .highestImpactService;

    /*
     * BEFORE is the immutable baseline snapshot
     * produced when Assessment was submitted.
     */
    const before =
      readStoredSriResult(
        attempt
          .baselineResult,
      );

    /*
     * AFTER:
     * Only the selected service is overridden,
     * entirely in memory:
     *
     *   maximum level
     *   share = 100%
     *   no additional level
     *
     * The stored Assessment answer is untouched.
     */
    const after =
      await calculateSriSimulatedResult(
        userId,
        {
          serviceId:
            service.serviceId,

          selectedLevelId:
            service.maxLevelId,

          share:
            100,

          additionalLevelId:
            null,
        },
      );

    const sriDelta =
      after.totalScore -
      before.totalScore;

    if (
      !Number.isFinite(
        sriDelta,
      ) ||
      sriDelta <=
        SIMULATION_EPSILON
    ) {
      throw new Error(
        `Simulation configuration error: upgrading service "${service.serviceCode}" to its maximum functionality level did not produce a positive SRI improvement.`,
      );
    }

    const simulationResult:
      CaseStudySimulationResultInternal =
      {
        before,

        after,

        upgradedService: {
          serviceId:
            service.serviceId,

          serviceCode:
            service.serviceCode,

          serviceName:
            service.serviceName,

          serviceGroup:
            service.serviceGroup,

          technicalDomain:
            service
              .technicalDomain,

          impactCriterion:
            service
              .impactCriterion,

          previousLevelId:
            service
              .currentLevelId,

          previousLevelNumber:
            service
              .currentLevelNumber,

          previousLevelDescription:
            service
              .currentLevelDescription,

          simulatedLevelId:
            service
              .maxLevelId,

          simulatedLevelNumber:
            service
              .maxLevelNumber,

          simulatedLevelDescription:
            service
              .maxLevelDescription,
        },

        sriDelta,
      };

    const completedAt =
      new Date();

    const becomesOfficial =
      progress
        .officialAttemptId ===
      null;

    /*
     * One transaction completes the active attempt
     * and, only on the first-ever completion,
     * permanently assigns officialAttemptId.
     */
    await prisma.$transaction(
      async (tx) => {
        await tx
          .caseStudyAttempt
          .update({
            where: {
              id:
                attempt.id,
            },

            data: {
              simulationResult:
                simulationResult as unknown as
                  Prisma.InputJsonValue,

              lastVisitedStage:
                CaseStudyRouteStage
                  .SIMULATION_RESULTS,

              completedAt,
            },
          });

        if (becomesOfficial) {
          await tx
            .userCaseStudyProgress
            .update({
              where: {
                id:
                  progress.id,
              },

              data: {
                officialAttemptId:
                  attempt.id,
              },
            });
        }
      },
    );

    return {
      simulationResult:
        toPublicSimulationResult(
          simulationResult,
        ),

      isOfficialAttempt:
        becomesOfficial ||
        progress
          .officialAttemptId ===
          attempt.id,
    };
  };
