import {
  BuildingType,
  CaseStudyRouteStage,
  ClimateZone,
  DomainPresence,
  Prisma,
} from "@prisma/client";

import prisma from "../prismaClient.js";

import {
  assertCaseStudyUnlocked,
  CASE_STUDY_ID,
  CaseStudyAccessError,
} from "./caseStudyService.js";

import {
  calculateSriBaselineResult,
  toPublicSriResult,
} from "./sriCalculationService.js";

// -----------------------------------------------------------------------------
// DTOs
// -----------------------------------------------------------------------------

export type CaseStudyAssessmentAnswerDto = {
  serviceId: string;
  selectedLevelId: string;
  share: number;
  additionalLevelId?: string;
};

export type CaseStudyAssessmentServiceDto = {
  serviceId: string;
  code: string;
  order: number;

  domain: string;

  serviceGroup: string;
  smartReadyService: string;

  officialDescription:
    | string
    | null;

  triageValue: number;

  triageNote:
    | string
    | null;

  applicabilityNote:
    | string
    | null;

  methodologyNote:
    | string
    | null;

  impactCriteria:
    string[];

  scenarioEvidence: string[];

  functionalityLevels: {
    id: string;
    level: number;
    officialDescription: string;
  }[];
};

export type CaseStudyAssessmentDto = {
  caseStudyId: string;

  setup: {
    buildingType: string;
    climateZone: string;
    assessmentMethod: string;

    domainPresence:
      Record<string, string>;
  };

  services:
    CaseStudyAssessmentServiceDto[];

  progress: {
    answers: Record<
      string,
      CaseStudyAssessmentAnswerDto
    >;

    validatedServiceIds:
      string[];

    selectedServiceId:
      | string
      | null;

    completed: boolean;
  };
};

// -----------------------------------------------------------------------------
// Mappings
// -----------------------------------------------------------------------------

const mapBuildingTypeToDto = (
  value: BuildingType,
): string => {
  switch (value) {
    case BuildingType.RESIDENTIAL:
      return "residential";

    case BuildingType.NON_RESIDENTIAL:
      return "non-residential";
  }
};

const mapClimateZoneToDto = (
  value: ClimateZone,
): string => {
  switch (value) {
    case ClimateZone.NORTHERN_EUROPE:
      return "northern-europe";

    case ClimateZone.WESTERN_EUROPE:
      return "western-europe";

    case ClimateZone.SOUTHERN_EUROPE:
      return "southern-europe";

    case ClimateZone.NORTH_EASTERN_EUROPE:
      return "north-eastern-europe";

    case ClimateZone.SOUTH_EASTERN_EUROPE:
      return "south-eastern-europe";
  }
};

const mapDomainPresenceToDto = (
  value: DomainPresence,
): string => {
  switch (value) {
    case DomainPresence.PRESENT:
      return "present";

    case DomainPresence.ABSENT_MANDATORY:
      return "absent-mandatory";

    case DomainPresence.ABSENT_NOT_MANDATORY:
      return "absent-not-mandatory";
  }
};

// -----------------------------------------------------------------------------
// Assessment
// -----------------------------------------------------------------------------

export const getCaseStudyAssessment =
  async (
    userId: string,
  ): Promise<
    CaseStudyAssessmentDto
  > => {
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
            activeAttempt: {
              include: {
                country: true,

                domainPresence: {
                  include: {
                    domain: true,
                  },
                },

                serviceAnswers: {
                  include: {
                    scenarioService: {
                      include: {
                        serviceMethod: {
                          include: {
                            service: true,
                          },
                        },
                      },
                    },

                    primaryLevel:
                      true,

                    additionalLevel:
                      true,
                  },
                },

                activeScenarioService: {
                  include: {
                    serviceMethod: {
                      include: {
                        service: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

    const attempt =
      progress?.activeAttempt ??
      null;

    if (
      !attempt ||
      !attempt.setupCompleted
    ) {
      throw new CaseStudyAccessError(
        "Complete the building Setup before starting the Assessment.",
      );
    }

    if (
      !attempt.buildingType ||
      !attempt.country ||
      !attempt.assessmentMethod
    ) {
      throw new Error(
        "Completed Case Study Setup is missing required assessment context.",
      );
    }

    const selectedServices =
      await prisma
        .caseStudySelectedService
        .findMany({
          where: {
            caseStudyId:
              CASE_STUDY_ID,

            /*
             * The selected services must belong
             * to the validated assessment method.
             */
            serviceMethod: {
              method:
                attempt
                  .assessmentMethod,
            },
          },

          orderBy: {
            order: "asc",
          },

          include: {
            serviceMethod: {
              include: {
                service: {
                  include: {
                    domain: true,
                  },
                },

                levels: {
                  orderBy: {
                    level: "asc",
                  },

                  include: {
                    impactScores: {
                      include: {
                        impactCriterion:
                          true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

    const domainPresence:
      Record<string, string> =
        {};

    attempt.domainPresence
      .forEach(
        (item) => {
          domainPresence[
            item.domain.name
          ] =
            mapDomainPresenceToDto(
              item.status,
            );
        },
      );

    const answers:
      Record<
        string,
        CaseStudyAssessmentAnswerDto
      > = {};

    const validatedServiceIds:
      string[] = [];

    attempt.serviceAnswers
      .forEach(
        (answer) => {
          const serviceId =
            answer
              .scenarioService
              .serviceMethod
              .service
              .id;

          answers[
            serviceId
          ] = {
            serviceId,

            /*
             * The frontend uses the stable
             * sourceLevelKey such as
             * "h-1a-level-1", not the DB cuid.
             */
            selectedLevelId:
              answer.primaryLevel
              ?.sourceLevelKey ?? "",

            share:
              answer.share,

            ...(
              answer
                .additionalLevel
                ? {
                    additionalLevelId:
                      answer
                        .additionalLevel
                        .sourceLevelKey,
                  }
                : {}
            ),
          };

          if (
            answer.validated
          ) {
            validatedServiceIds
              .push(
                serviceId,
              );
          }
        },
      );

    const selectedServiceId =
      attempt
        .activeScenarioService
        ?.serviceMethod
        .service
        .id ??
      null;

    const services:
      CaseStudyAssessmentServiceDto[] =
      selectedServices.map(
        (selected) => {
          const method =
            selected.serviceMethod;

          const service =
            method.service;

          const impactCriteria =
            Array.from(
              new Map(
                method.levels
                  .flatMap(
                    (level) =>
                      level.impactScores,
                  )
                  .filter(
                    (impactScore) =>
                      impactScore.score !== 0,
                  )
                  .map(
                    (impactScore) =>
                      [
                        impactScore
                          .impactCriterion
                          .id,

                        impactScore
                          .impactCriterion,
                      ] as const,
                  ),
              ).values(),
            )
              .sort(
                (
                  left,
                  right,
                ) =>
                  left.order -
                  right.order,
              )
              .map(
                (criterion) =>
                  criterion.name,
              );

          return {
            serviceId:
              service.id,

            code:
              service.code,

            order:
              selected.order,

            domain:
              service
                .domain
                .name,

            serviceGroup:
              method
                .serviceGroup,

            smartReadyService:
              method
                .smartReadyService,

            officialDescription:
              method
                .officialDescription,

            triageValue:
              method
                .triageValue,

            triageNote:
              method
                .triageNote,

            applicabilityNote:
              method
                .applicabilityNote,

            methodologyNote:
              method
                .methodologyNote,

            impactCriteria,

            scenarioEvidence:
              selected
                .scenarioEvidence,

            functionalityLevels:
              method.levels.map(
                (level) => ({
                  id:
                    level
                      .sourceLevelKey,

                  level:
                    level.level,

                  officialDescription:
                    level
                      .officialDescription,
                }),
              ),
          };
        },
      );

    return {
      caseStudyId:
        CASE_STUDY_ID,

      setup: {
        buildingType:
          mapBuildingTypeToDto(
            attempt
              .buildingType,
          ),

        climateZone:
          mapClimateZoneToDto(
            attempt
              .country
              .climateZone,
          ),

        assessmentMethod:
          attempt
            .assessmentMethod,

        domainPresence,
      },

      services,

      progress: {
        answers,

        validatedServiceIds,

        selectedServiceId,

        completed:
          attempt
            .assessmentCompleted,
      },
    };
  };

  // -----------------------------------------------------------------------------
// Assessment writes
// -----------------------------------------------------------------------------

export type CaseStudyAssessmentAnswerInput = {
  selectedLevelId: string;
  share: number;
  additionalLevelId?: string;
};

export type CaseStudyAssessmentValidationResult = {
  isValid: boolean;

  errors:
    Record<string, string>;
};

export type ValidateAssessmentAnswerResult = {
  validation:
    CaseStudyAssessmentValidationResult;

  validatedServiceIds:
    string[];

  nextServiceId:
    | string
    | null;

  allServicesValidated:
    boolean;
};

const getActiveAssessmentContext =
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
            activeAttempt: {
              include: {
                domainPresence:
                  true,
              },
            },
          },
        });

    const attempt =
      progress?.activeAttempt ??
      null;

    if (
      !progress ||
      !attempt ||
      !attempt.setupCompleted
    ) {
      throw new CaseStudyAccessError(
        "Complete the building Setup before starting the Assessment.",
      );
    }

    if (
      !attempt.assessmentMethod
    ) {
      throw new Error(
        "Completed Setup is missing the assessment method.",
      );
    }

    return {
      progress,
      attempt,
    };
  };

const getScenarioService =
  async ({
    attempt,
    serviceId,
  }: {
    attempt: {
      assessmentMethod:
        NonNullable<
          Awaited<
            ReturnType<
              typeof getActiveAssessmentContext
            >
          >["attempt"]["assessmentMethod"]
        >;

      domainPresence: {
        domainId: string;
        status: DomainPresence;
      }[];
    };

    serviceId: string;
  }) => {
    const scenarioService =
      await prisma
        .caseStudySelectedService
        .findFirst({
          where: {
            caseStudyId:
              CASE_STUDY_ID,

            serviceMethod: {
              method:
                attempt
                  .assessmentMethod,

              service: {
                id:
                  serviceId,
              },
            },
          },

          include: {
            expectedPrimaryLevel:
              true,

            expectedAdditionalLevel:
              true,

            serviceMethod: {
              include: {
                service: {
                  include: {
                    domain: true,
                  },
                },

                levels: true,
              },
            },
          },
        });

    if (!scenarioService) {
      throw new CaseStudyAccessError(
        "This service is not part of the current Case Study assessment.",
      );
    }

    /*
     * The scenario assessment contains
     * services only from domains that the
     * validated Setup marked as present.
     */
    const domainStatus =
      attempt.domainPresence
        .find(
          (item) =>
            item.domainId ===
            scenarioService
              .serviceMethod
              .service
              .domainId,
        )
        ?.status ??
      null;

    if (
      domainStatus !==
      DomainPresence.PRESENT
    ) {
      throw new CaseStudyAccessError(
        "This service is not available for assessment in the current building setup.",
      );
    }

    return scenarioService;
  };

const resolveFunctionalityLevel =
  async ({
    serviceMethodId,
    sourceLevelKey,
  }: {
    serviceMethodId: string;

    sourceLevelKey:
      | string
      | undefined;
  }) => {
    const normalizedKey =
      sourceLevelKey?.trim() ??
      "";

    if (!normalizedKey) {
      return null;
    }

    const level =
      await prisma
        .sriFunctionalityLevel
        .findFirst({
          where: {
            serviceMethodId,
            sourceLevelKey:
              normalizedKey,
          },
        });

    if (!level) {
      throw new CaseStudyAccessError(
        "The selected functionality level is not valid for this service.",
      );
    }

    return level;
  };

const validateDraftShare = (
  share: number,
) => {
  if (
    !Number.isFinite(
      share,
    ) ||
    !Number.isInteger(
      share,
    ) ||
    share < 0 ||
    share > 100
  ) {
    throw new CaseStudyAccessError(
      "The functionality level share must be a whole number between 0 and 100.",
    );
  }
};

const clearAssessmentDerivedData =
  () => ({
    assessmentCompleted:
      false,

    baselineResult:
      Prisma.DbNull,

    resultsInvestigation:
      Prisma.DbNull,

    guidedImprovement:
      Prisma.DbNull,

    simulationResult:
      Prisma.DbNull,

    completedAt:
      null,
  });

export const setActiveAssessmentService =
  async (
    userId: string,
    serviceId: string,
  ) => {
    const {
      attempt,
    } =
      await getActiveAssessmentContext(
        userId,
      );

    const scenarioService =
      await getScenarioService({
        attempt: {
          ...attempt,

          assessmentMethod:
            attempt
              .assessmentMethod!,
        },

        serviceId,
      });

    /*
     * Navigation only.
     *
     * Do NOT invalidate answers,
     * validation or derived results.
     */
    await prisma
      .caseStudyAttempt
      .update({
        where: {
          id:
            attempt.id,
        },

        data: {
          lastVisitedStage:
            CaseStudyRouteStage
              .ASSESSMENT,

          activeScenarioServiceId:
            scenarioService.id,
        },
      });

    return {
      selectedServiceId:
        serviceId,
    };
  };

export const saveAssessmentAnswer =
  async (
    userId: string,
    serviceId: string,
    answer:
      CaseStudyAssessmentAnswerInput,
  ) => {
    const {
      progress,
      attempt,
    } =
      await getActiveAssessmentContext(
        userId,
      );

    validateDraftShare(
      answer.share,
    );

    const scenarioService =
      await getScenarioService({
        attempt: {
          ...attempt,

          assessmentMethod:
            attempt
              .assessmentMethod!,
        },

        serviceId,
      });

    const [
      primaryLevel,
      additionalLevel,
      existingAnswer,
    ] = await Promise.all([
      resolveFunctionalityLevel({
        serviceMethodId:
          scenarioService
            .serviceMethodId,

        sourceLevelKey:
          answer
            .selectedLevelId,
      }),

      resolveFunctionalityLevel({
        serviceMethodId:
          scenarioService
            .serviceMethodId,

        sourceLevelKey:
          answer
            .additionalLevelId,
      }),

      prisma
        .caseStudyAttemptServiceAnswer
        .findUnique({
          where: {
            attemptId_scenarioServiceId:
              {
                attemptId:
                  attempt.id,

                scenarioServiceId:
                  scenarioService.id,
              },
          },
        }),
    ]);

    const nextPrimaryLevelId =
      primaryLevel?.id ??
      null;

    const nextAdditionalLevelId =
      additionalLevel?.id ??
      null;

    const answerChanged =
      existingAnswer === null ||
      existingAnswer
        .primaryLevelId !==
        nextPrimaryLevelId ||
      existingAnswer.share !==
        answer.share ||
      existingAnswer
        .additionalLevelId !==
        nextAdditionalLevelId;

    /*
     * The first completed attempt is
     * permanent. Review is allowed,
     * mutation is not.
     */
    if (
      answerChanged &&
      progress
        .officialAttemptId ===
        attempt.id
    ) {
      throw new CaseStudyAccessError(
        "Start a new practice attempt before changing the completed Case Study.",
      );
    }

    await prisma.$transaction(
      async (tx) => {
        await tx
          .caseStudyAttemptServiceAnswer
          .upsert({
            where: {
              attemptId_scenarioServiceId:
                {
                  attemptId:
                    attempt.id,

                  scenarioServiceId:
                    scenarioService.id,
                },
            },

            create: {
              attemptId:
                attempt.id,

              scenarioServiceId:
                scenarioService.id,

              primaryLevelId:
                nextPrimaryLevelId,

              share:
                answer.share,

              additionalLevelId:
                nextAdditionalLevelId,

              validated:
                false,
            },

            update: {
              primaryLevelId:
                nextPrimaryLevelId,

              share:
                answer.share,

              additionalLevelId:
                nextAdditionalLevelId,

              /*
               * Changing an already validated
               * answer makes that service
               * incomplete again.
               */
              ...(
                answerChanged
                  ? {
                      validated:
                        false,
                    }
                  : {}
              ),
            },
          });

        await tx
          .caseStudyAttempt
          .update({
            where: {
              id:
                attempt.id,
            },

            data: {
              lastVisitedStage:
                CaseStudyRouteStage
                  .ASSESSMENT,

              activeScenarioServiceId:
                scenarioService.id,

              /*
               * Changing answer content
               * invalidates previous Results.
               * Pure navigation does not.
               */
              ...(
                answerChanged
                  ? clearAssessmentDerivedData()
                  : {}
              ),
            },
          });
      },
    );

    return {
      serviceId,

      validated:
        answerChanged
          ? false
          : (
              existingAnswer
                ?.validated ??
              false
            ),
    };
  };

const validateAssessmentAnswer =
  ({
    serviceId,
    selectedLevelId,
    share,
    additionalLevelId,
    expectedPrimaryLevelId,
    expectedShare,
    expectedAdditionalLevelId,
  }: {
    serviceId: string;

    selectedLevelId: string;

    share: number;

    additionalLevelId?:
      string;

    expectedPrimaryLevelId:
      string;

    expectedShare: number;

    expectedAdditionalLevelId:
      | string
      | null;
  }): CaseStudyAssessmentValidationResult => {
    const errors:
      Record<string, string> =
        {};

    /*
     * Same order as the current frontend:
     *
     * 1. Main level
     * 2. Share
     * 3. Additional level
     *
     * Return immediately after the first
     * problem.
     */

    if (!selectedLevelId) {
      errors.selectedLevelId =
        "Please select the main functionality level before continuing.";

      return {
        isValid: false,
        errors,
      };
    }

    if (
      selectedLevelId !==
      expectedPrimaryLevelId
    ) {
      errors.selectedLevelId =
        "This functionality level does not match the service capability described in the scenario.";

      return {
        isValid: false,
        errors,
      };
    }

    if (
      !Number.isFinite(
        share,
      ) ||
      share < 0 ||
      share > 100
    ) {
      errors.share =
        "The share of the main functionality level must be between 0% and 100%.";

      return {
        isValid: false,
        errors,
      };
    }

    if (
      share !==
      expectedShare
    ) {
      errors.share =
        "This functionality level share does not match the percentage of the building's net surface area described in the scenario.";

      return {
        isValid: false,
        errors,
      };
    }

    if (
      expectedShare < 100
    ) {
      if (
        !expectedAdditionalLevelId
      ) {
        throw new Error(
          `Expected answer for service "${serviceId}" requires an additional functionality level.`,
        );
      }

      if (
        !additionalLevelId
      ) {
        errors.additionalLevelId =
          "Please select the additional functionality level for the remaining net surface area.";

        return {
          isValid: false,
          errors,
        };
      }

      if (
        additionalLevelId !==
        expectedAdditionalLevelId
      ) {
        errors.additionalLevelId =
          "This additional functionality level does not match the remaining net surface area described in the scenario.";

        return {
          isValid: false,
          errors,
        };
      }
    }

    if (
      expectedShare ===
        100 &&
      additionalLevelId
    ) {
      errors.additionalLevelId =
        "No additional functionality level is needed when the main functionality level applies to 100% of the building's net surface area.";

      return {
        isValid: false,
        errors,
      };
    }

    return {
      isValid: true,
      errors: {},
    };
  };

const getOrderedAssessmentServices =
  async (
    attempt: Awaited<
      ReturnType<
        typeof getActiveAssessmentContext
      >
    >["attempt"],
  ) => {
    const services =
      await prisma
        .caseStudySelectedService
        .findMany({
          where: {
            caseStudyId:
              CASE_STUDY_ID,

            serviceMethod: {
              method:
                attempt
                  .assessmentMethod!,
            },
          },

          include: {
            serviceMethod: {
              include: {
                service: {
                  include: {
                    domain: true,
                  },
                },
              },
            },
          },
        });

    const presentDomainIds =
      new Set(
        attempt
          .domainPresence
          .filter(
            (item) =>
              item.status ===
              DomainPresence.PRESENT,
          )
          .map(
            (item) =>
              item.domainId,
          ),
      );

    return services
      .filter(
        (item) =>
          presentDomainIds.has(
            item
              .serviceMethod
              .service
              .domainId,
          ),
      )
      .sort(
        (
          left,
          right,
        ) => {
          const domainDifference =
            left
              .serviceMethod
              .service
              .domain
              .order -
            right
              .serviceMethod
              .service
              .domain
              .order;

          if (
            domainDifference !==
            0
          ) {
            return domainDifference;
          }

          return (
            left.order -
            right.order
          );
        },
      );
  };

const findNextIncompleteService =
  ({
    services,
    currentScenarioServiceId,
    validatedServiceIds,
  }: {
    services:
      Awaited<
        ReturnType<
          typeof getOrderedAssessmentServices
        >
      >;

    currentScenarioServiceId:
      string;

    validatedServiceIds:
      Set<string>;
  }) => {
    const currentService =
      services.find(
        (item) =>
          item.id ===
          currentScenarioServiceId,
      );

    if (!currentService) {
      return null;
    }

    const currentDomainId =
      currentService
        .serviceMethod
        .service
        .domainId;

    /*
     * Preserve canonical domain order.
     */
    const domainIds =
      Array.from(
        new Map(
          services.map(
            (item) => [
              item
                .serviceMethod
                .service
                .domainId,

              item
                .serviceMethod
                .service
                .domain
                .order,
            ],
          ),
        ).entries(),
      )
        .sort(
          (
            left,
            right,
          ) =>
            left[1] -
            right[1],
        )
        .map(
          ([domainId]) =>
            domainId,
        );

    const currentDomainIndex =
      domainIds.indexOf(
        currentDomainId,
      );

    if (
      currentDomainIndex === -1
    ) {
      return null;
    }

    const currentDomainServices =
      services.filter(
        (item) =>
          item
            .serviceMethod
            .service
            .domainId ===
          currentDomainId,
      );

    const currentServiceIndex =
      currentDomainServices
        .findIndex(
          (item) =>
            item.id ===
            currentScenarioServiceId,
        );

    if (
      currentServiceIndex === -1
    ) {
      return null;
    }

    /*
     * 1. Stay in the current domain.
     *
     * Search after the current service,
     * then wrap to services before it.
     */
    const sameDomainSearch = [
      ...currentDomainServices
        .slice(
          currentServiceIndex +
            1,
        ),

      ...currentDomainServices
        .slice(
          0,
          currentServiceIndex,
        ),
    ];

    const nextInSameDomain =
      sameDomainSearch.find(
        (item) =>
          !validatedServiceIds.has(
            item
              .serviceMethod
              .service
              .id,
          ),
      );

    if (
      nextInSameDomain
    ) {
      return nextInSameDomain;
    }

    /*
     * 2. Current domain completed.
     *
     * Continue through following domains,
     * then wrap to the beginning.
     */
    const domainsToSearch = [
      ...domainIds.slice(
        currentDomainIndex +
          1,
      ),

      ...domainIds.slice(
        0,
        currentDomainIndex,
      ),
    ];

    for (
      const domainId of
      domainsToSearch
    ) {
      const nextService =
        services.find(
          (item) =>
            item
              .serviceMethod
              .service
              .domainId ===
              domainId &&
            !validatedServiceIds.has(
              item
                .serviceMethod
                .service
                .id,
            ),
        );

      if (nextService) {
        return nextService;
      }
    }

    return null;
  };

export const validateAssessmentServiceAnswer =
  async (
    userId: string,
    serviceId: string,
    answer:
      CaseStudyAssessmentAnswerInput,
  ): Promise<
    ValidateAssessmentAnswerResult
  > => {
    /*
     * Persist the submitted values first.
     *
     * If they differ from a previously
     * validated answer, that validation is
     * already removed here.
     */
    await saveAssessmentAnswer(
      userId,
      serviceId,
      answer,
    );

    const {
      attempt,
    } =
      await getActiveAssessmentContext(
        userId,
      );

    const scenarioService =
      await getScenarioService({
        attempt: {
          ...attempt,

          assessmentMethod:
            attempt
              .assessmentMethod!,
        },

        serviceId,
      });

    const expectedPrimaryLevelId =
      scenarioService
        .expectedPrimaryLevel
        .sourceLevelKey;

    const expectedAdditionalLevelId =
      scenarioService
        .expectedAdditionalLevel
        ?.sourceLevelKey ??
      null;

    const validation =
      validateAssessmentAnswer({
        serviceId,

        selectedLevelId:
          answer
            .selectedLevelId,

        share:
          answer.share,

        additionalLevelId:
          answer
            .additionalLevelId,

        expectedPrimaryLevelId,

        expectedShare:
          scenarioService
            .expectedShare,

        expectedAdditionalLevelId,
      });

    /*
     * Wrong educational answer:
     * return feedback, but do not throw.
     */
    if (
      !validation.isValid
    ) {
      const validatedRows =
        await prisma
          .caseStudyAttemptServiceAnswer
          .findMany({
            where: {
              attemptId:
                attempt.id,

              validated:
                true,
            },

            include: {
              scenarioService: {
                include: {
                  serviceMethod: {
                    include: {
                      service:
                        true,
                    },
                  },
                },
              },
            },
          });

      return {
        validation,

        validatedServiceIds:
          validatedRows.map(
            (item) =>
              item
                .scenarioService
                .serviceMethod
                .service
                .id,
          ),

        nextServiceId:
          null,

        allServicesValidated:
          false,
      };
    }

    /*
     * The answer is now officially validated.
     */
    await prisma
      .caseStudyAttemptServiceAnswer
      .update({
        where: {
          attemptId_scenarioServiceId:
            {
              attemptId:
                attempt.id,

              scenarioServiceId:
                scenarioService.id,
            },
        },

        data: {
          validated:
            true,
        },
      });

    const [
      orderedServices,
      validatedRows,
    ] = await Promise.all([
      getOrderedAssessmentServices(
        attempt,
      ),

      prisma
        .caseStudyAttemptServiceAnswer
        .findMany({
          where: {
            attemptId:
              attempt.id,

            validated:
              true,
          },

          include: {
            scenarioService: {
              include: {
                serviceMethod: {
                  include: {
                    service:
                      true,
                  },
                },
              },
            },
          },
        }),
    ]);

    const validatedServiceIds =
      validatedRows.map(
        (item) =>
          item
            .scenarioService
            .serviceMethod
            .service
            .id,
      );

    const validatedSet =
      new Set(
        validatedServiceIds,
      );

    const allServicesValidated =
      orderedServices.length >
        0 &&
      orderedServices.every(
        (item) =>
          validatedSet.has(
            item
              .serviceMethod
              .service
              .id,
          ),
      );

    const nextService =
      allServicesValidated
        ? null
        : findNextIncompleteService({
            services:
              orderedServices,

            currentScenarioServiceId:
              scenarioService.id,

            validatedServiceIds:
              validatedSet,
          });

    /*
     * Save & Next also persists where the
     * learner should resume.
     */
    if (nextService) {
      await prisma
        .caseStudyAttempt
        .update({
          where: {
            id:
              attempt.id,
          },

          data: {
            lastVisitedStage:
              CaseStudyRouteStage
                .ASSESSMENT,

            activeScenarioServiceId:
              nextService.id,
          },
        });
    }

    return {
      validation: {
        isValid: true,
        errors: {},
      },

      validatedServiceIds,

      nextServiceId:
        nextService
          ?.serviceMethod
          .service
          .id ??
        null,

      allServicesValidated,
    };
  };

  export const submitCaseStudyAssessment =
  async (
    userId: string,
  ) => {
    const {
      attempt,
    } =
      await getActiveAssessmentContext(
        userId,
      );

    /*
     * These are exactly the services that
     * participate in the current Assessment:
     * selected Case Study services from
     * PRESENT technical domains.
     */
    const assessmentServices =
      await getOrderedAssessmentServices(
        attempt,
      );

    if (
      assessmentServices.length ===
      0
    ) {
      throw new CaseStudyAccessError(
        "No services are available for the current Assessment.",
      );
    }

    const validatedAnswers =
      await prisma
        .caseStudyAttemptServiceAnswer
        .findMany({
          where: {
            attemptId:
              attempt.id,

            validated:
              true,
          },

          select: {
            scenarioServiceId:
              true,
          },
        });

    const validatedScenarioServiceIds =
      new Set(
        validatedAnswers.map(
          (answer) =>
            answer.scenarioServiceId,
        ),
      );

    const allServicesValidated =
      assessmentServices.every(
        (service) =>
          validatedScenarioServiceIds.has(
            service.id,
          ),
      );

    if (!allServicesValidated) {
      throw new CaseStudyAccessError(
        "Complete and validate every service before submitting the Assessment.",
      );
    }

    const result =
      await calculateSriBaselineResult(
        userId,
      );

    await prisma
      .caseStudyAttempt
      .update({
        where: {
          id:
            attempt.id,
        },

        data: {
          assessmentCompleted:
            true,

          lastVisitedStage:
            CaseStudyRouteStage
              .RESULTS,

          baselineResult:
            result as unknown as
              Prisma.InputJsonValue,
        },
      });

    return {
      result:
        toPublicSriResult(
          result,
        ),
    };
  };