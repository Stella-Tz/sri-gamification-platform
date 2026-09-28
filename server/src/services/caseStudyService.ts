import {
  AssessmentMethod,
  BuildingState,
  BuildingType,
  BuildingUsage,
  CaseStudyRouteStage,
  ClimateZone,
  DomainPresence,
  Prisma,
} from "@prisma/client";

import prisma from "../prismaClient.js";

import {
  isCourseCompleted,
} from "./courseProgressService.js";

export const CASE_STUDY_ID =
  "case-study-1";
  
// -----------------------------------------------------------------------------
// DTOs
// -----------------------------------------------------------------------------

export type CaseStudySetupInput = {
  buildingInformation: {
    buildingType: string;
    buildingUsage: string;
    country: string;
    climateZone?: string;
    floorArea: string;
    constructionYear: string;
    buildingState: string;
    renovationYear: string;
  };

  methodologySelection: {
    assessmentMethod: string;
  };

  domainPresence:
    Record<string, string>;
};

export type CaseStudySetupAnswersDto = {
  buildingInformation: {
    buildingType: string;
    buildingUsage: string;
    country: string;
    climateZone: string;
    floorArea: string;
    constructionYear: string;
    buildingState: string;
    renovationYear: string;
  };

  methodologySelection: {
    assessmentMethod: string;
  };

  domainPresence:
    Record<string, string>;
};

export type CaseStudyJourneyStatusDto =
  | "not-started"
  | "setup-in-progress"
  | "assessment-not-started"
  | "assessment-in-progress"
  | "results-investigation-not-started"
  | "results-investigation-in-progress"
  | "improvement-analysis-not-started"
  | "improvement-analysis-in-progress"
  | "simulation-ready"
  | "completed";

export type CaseStudyStageDto =
  | "setup"
  | "assessment"
  | "results"
  | "guided-improvement-analysis"
  | "simulation-results";

export type CaseStudyProgressDto = {
  caseStudyId: string;

  activeAttemptId:
    | string
    | null;

  officialAttemptId:
    | string
    | null;

  lastVisitedStage:
    | string
    | null;

  setup: {
    answers:
      CaseStudySetupAnswersDto;

    completed: boolean;
  } | null;

  assessmentCompleted: boolean;

  assessmentStarted: boolean;

  resultsInvestigationStarted:
    boolean;

  guidedImprovementStarted:
    boolean;

  hasBaselineResult: boolean;

  resultsInvestigationCompleted:
    boolean;

  guidedImprovementCompleted:
    boolean;

  hasSimulationResult: boolean;

  hasOfficialSimulationResult:
  boolean;

  journeyStatus:
    CaseStudyJourneyStatusDto;

  nextStage:
    CaseStudyStageDto;

  allowedStages:
    CaseStudyStageDto[];

  isPracticeAttempt:
    boolean;

  startedAt:
    | string
    | null;

  completedAt:
    | string
    | null;

  officialCompletedAt:
    | string
    | null;

  updatedAt:
  | string
  | null;
};

// -----------------------------------------------------------------------------
// Errors / access
// -----------------------------------------------------------------------------

export class CaseStudyAccessError
  extends Error {
  constructor(message: string) {
    super(message);

    this.name =
      "CaseStudyAccessError";
  }
}

export const assertCaseStudyUnlocked =
  async (
    userId: string,
  ): Promise<void> => {
    const unlocked =
      await isCourseCompleted(
        userId,
      );

    if (!unlocked) {
      throw new CaseStudyAccessError(
        "Complete the Course before starting the Case Study.",
      );
    }
  };

// -----------------------------------------------------------------------------
// API <-> Prisma mappings
// -----------------------------------------------------------------------------

const mapBuildingTypeFromInput = (
  value: string,
): BuildingType | null => {
  switch (value) {
    case "residential":
      return BuildingType.RESIDENTIAL;

    case "non-residential":
      return BuildingType.NON_RESIDENTIAL;

    default:
      return null;
  }
};

const mapBuildingTypeToDto = (
  value:
    | BuildingType
    | null,
): string => {
  switch (value) {
    case BuildingType.RESIDENTIAL:
      return "residential";

    case BuildingType.NON_RESIDENTIAL:
      return "non-residential";

    default:
      return "";
  }
};

const mapBuildingUsageFromInput = (
  value: string,
): BuildingUsage | null => {
  const values:
    Record<string, BuildingUsage> = {
      "single-family-house":
        BuildingUsage
          .SINGLE_FAMILY_HOUSE,

      "small-multi-family-house":
        BuildingUsage
          .SMALL_MULTI_FAMILY_HOUSE,

      "large-multi-family-house":
        BuildingUsage
          .LARGE_MULTI_FAMILY_HOUSE,

      "residential-other":
        BuildingUsage
          .RESIDENTIAL_OTHER,

      office:
        BuildingUsage.OFFICE,

      "educational-buildings":
        BuildingUsage
          .EDUCATIONAL_BUILDINGS,

      healthcare:
        BuildingUsage.HEALTHCARE,

      "non-residential-other":
        BuildingUsage
          .NON_RESIDENTIAL_OTHER,
    };

  return values[value] ?? null;
};

const mapBuildingUsageToDto = (
  value:
    | BuildingUsage
    | null,
): string => {
  if (!value) {
    return "";
  }

  const values:
    Record<BuildingUsage, string> = {
      [BuildingUsage
        .SINGLE_FAMILY_HOUSE]:
        "single-family-house",

      [BuildingUsage
        .SMALL_MULTI_FAMILY_HOUSE]:
        "small-multi-family-house",

      [BuildingUsage
        .LARGE_MULTI_FAMILY_HOUSE]:
        "large-multi-family-house",

      [BuildingUsage
        .RESIDENTIAL_OTHER]:
        "residential-other",

      [BuildingUsage.OFFICE]:
        "office",

      [BuildingUsage
        .EDUCATIONAL_BUILDINGS]:
        "educational-buildings",

      [BuildingUsage.HEALTHCARE]:
        "healthcare",

      [BuildingUsage
        .NON_RESIDENTIAL_OTHER]:
        "non-residential-other",
    };

  return values[value];
};

const mapBuildingStateFromInput = (
  value: string,
): BuildingState | null => {
  switch (value) {
    case "original":
      return BuildingState.ORIGINAL;

    case "renovated":
      return BuildingState.RENOVATED;

    default:
      return null;
  }
};

const mapBuildingStateToDto = (
  value:
    | BuildingState
    | null,
): string => {
  switch (value) {
    case BuildingState.ORIGINAL:
      return "original";

    case BuildingState.RENOVATED:
      return "renovated";

    default:
      return "";
  }
};

const mapAssessmentMethodFromInput = (
  value: string,
): AssessmentMethod | null => {
  switch (value) {
    case "A":
      return AssessmentMethod.A;

    case "B":
      return AssessmentMethod.B;

    default:
      return null;
  }
};

const mapAssessmentMethodToDto = (
  value:
    | AssessmentMethod
    | null,
): string => {
  return value ?? "";
};

const mapDomainPresenceFromInput = (
  value: string,
): DomainPresence | null => {
  switch (value) {
    case "present":
      return DomainPresence.PRESENT;

    case "absent-mandatory":
      return DomainPresence
        .ABSENT_MANDATORY;

    case "absent-not-mandatory":
      return DomainPresence
        .ABSENT_NOT_MANDATORY;

    default:
      return null;
  }
};

const mapDomainPresenceToDto = (
  value: DomainPresence,
): string => {
  switch (value) {
    case DomainPresence.PRESENT:
      return "present";

    case DomainPresence
      .ABSENT_MANDATORY:
      return "absent-mandatory";

    case DomainPresence
      .ABSENT_NOT_MANDATORY:
      return "absent-not-mandatory";
  }
};

const mapClimateZoneToDto = (
  value:
    | ClimateZone
    | null,
): string => {
  switch (value) {
    case ClimateZone
      .NORTHERN_EUROPE:
      return "northern-europe";

    case ClimateZone
      .WESTERN_EUROPE:
      return "western-europe";

    case ClimateZone
      .SOUTHERN_EUROPE:
      return "southern-europe";

    case ClimateZone
      .NORTH_EASTERN_EUROPE:
      return "north-eastern-europe";

    case ClimateZone
      .SOUTH_EASTERN_EUROPE:
      return "south-eastern-europe";

    default:
      return "";
  }
};

const mapRouteStageToDto = (
  value:
    | CaseStudyRouteStage
    | null,
): string | null => {
  switch (value) {
    case CaseStudyRouteStage.SETUP:
      return "setup";

    case CaseStudyRouteStage
      .ASSESSMENT:
      return "assessment";

    case CaseStudyRouteStage.RESULTS:
      return "results";

    case CaseStudyRouteStage
      .GUIDED_IMPROVEMENT_ANALYSIS:
      return "guided-improvement-analysis";

    case CaseStudyRouteStage
      .SIMULATION_RESULTS:
      return "simulation-results";

    default:
      return null;
  }
};

// -----------------------------------------------------------------------------
// Parsing
// -----------------------------------------------------------------------------

const parseOptionalInteger = (
  value: string,
): number | null => {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return null;
  }

  const numericValue =
    Number(trimmed);

  return Number.isInteger(
    numericValue,
  )
    ? numericValue
    : null;
};

const parseFloorArea = (
  value: string,
): number | null => {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return null;
  }

  /*
   * Accept either:
   * 12450
   * 12,450
   * 12450.5
   * 12,450.5
   */
  const validFormat =
    /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(
      trimmed,
    );

  if (!validFormat) {
    return null;
  }

  const numericValue =
    Number(
      trimmed.replace(/,/g, ""),
    );

  return Number.isFinite(
    numericValue,
  )
    ? numericValue
    : null;
};

const normalizeFloorAreaInput = (
  value: string,
): string => {
  const parsed =
    parseFloorArea(value);

  return parsed === null
    ? value.trim()
    : String(parsed);
};

// -----------------------------------------------------------------------------
// Reference data
// -----------------------------------------------------------------------------

const findCountryFromInput =
  async (
    countryName: string,
  ) => {
    const trimmed =
      countryName.trim();

    if (!trimmed) {
      return null;
    }

    return prisma.sriCountry
      .findFirst({
        where: {
          name: {
            equals: trimmed,
            mode: "insensitive",
          },
        },
      });
  };

const getCanonicalDomains =
  async () => {
    return prisma
      .sriTechnicalDomain
      .findMany({
        orderBy: {
          order: "asc",
        },

        select: {
          id: true,
          name: true,
        },
      });
  };

  export type CaseStudySetupValidationResult = {
  isValid: boolean;

  errors:
    Record<string, string>;
};

export type CompleteCaseStudySetupResult = {
  validation:
    CaseStudySetupValidationResult;

  progress:
    CaseStudyProgressDto;
};

const addSetupError = (
  errors:
    Record<string, string>,

  key: string,
  message: string,
) => {
  errors[key] = message;
};

const isValidYear = (
  value: string,
): boolean => {
  const numericValue =
    Number(value);

  return (
    Number.isInteger(
      numericValue,
    ) &&
    numericValue >= 1800 &&
    numericValue <=
      new Date().getFullYear()
  );
};


const validateSetupForCompletion =
  async (
    answers:
      CaseStudySetupInput,
  ): Promise<
    CaseStudySetupValidationResult
  > => {
    const [
      caseStudy,
      country,
      domains,
    ] = await Promise.all([
      prisma.caseStudy.findUnique({
        where: {
          id: CASE_STUDY_ID,
        },

        include: {
          country: true,

          expectedDomainPresence: {
            include: {
              domain: true,
            },
          },
        },
      }),

      findCountryFromInput(
        answers
          .buildingInformation
          .country,
      ),

      getCanonicalDomains(),
    ]);

    if (!caseStudy) {
      throw new CaseStudyAccessError(
        "Case Study was not found.",
      );
    }

    const errors:
      Record<string, string> =
        {};

    const buildingInformation =
      answers.buildingInformation;

    const methodologySelection =
      answers.methodologySelection;

    const buildingType =
      mapBuildingTypeFromInput(
        buildingInformation
          .buildingType,
      );

    const buildingUsage =
      mapBuildingUsageFromInput(
        buildingInformation
          .buildingUsage,
      );

    const buildingState =
      mapBuildingStateFromInput(
        buildingInformation
          .buildingState,
      );

    const assessmentMethod =
      mapAssessmentMethodFromInput(
        methodologySelection
          .assessmentMethod,
      );

    const floorArea =
      parseFloorArea(
        buildingInformation.floorArea,
      );

    /*
     * Required-field validation.
     * These messages intentionally match
     * the current frontend behaviour.
     */
    if (!buildingType) {
      addSetupError(
        errors,
        "buildingType",
        "Select the building type.",
      );
    }

    if (!buildingUsage) {
      addSetupError(
        errors,
        "buildingUsage",
        "Select the building usage.",
      );
    }

    if (
      !buildingInformation
        .country
        .trim()
    ) {
      addSetupError(
        errors,
        "country",
        "Select the building location.",
      );
    }

    /*
     * Climate zone is derived from
     * SriCountry, not accepted from
     * the browser.
     */
    if (
      buildingInformation
        .country
        .trim() &&
      !country
    ) {
      addSetupError(
        errors,
        "climateZone",
        "Climate zone could not be derived.",
      );
    }

    if (
      !buildingInformation
        .constructionYear
        .trim()
    ) {
      addSetupError(
        errors,
        "constructionYear",
        "Enter the year of construction.",
      );
    } else if (
      !isValidYear(
        buildingInformation
          .constructionYear,
      )
    ) {
      addSetupError(
        errors,
        "constructionYear",
        "Enter a valid year of construction.",
      );
    }

    if (!buildingState) {
      addSetupError(
        errors,
        "buildingState",
        "Select the building state.",
      );
    }

    if (
      buildingState ===
      BuildingState.RENOVATED
    ) {
      if (
        !buildingInformation
          .renovationYear
          .trim()
      ) {
        addSetupError(
          errors,
          "renovationYear",
          "Enter the renovation year.",
        );
      } else if (
        !isValidYear(
          buildingInformation
            .renovationYear,
        )
      ) {
        addSetupError(
          errors,
          "renovationYear",
          "Enter a valid renovation year.",
        );
      } else if (
        isValidYear(
          buildingInformation
            .constructionYear,
        ) &&
        Number(
          buildingInformation
            .renovationYear,
        ) <
          Number(
            buildingInformation
              .constructionYear,
          )
      ) {
        addSetupError(
          errors,
          "renovationYear",
          "Renovation year cannot be earlier than construction year.",
        );
      }
    }

    if (
      !buildingInformation
        .floorArea
        .trim()
    ) {
      addSetupError(
        errors,
        "floorArea",
        "Enter the total useful floor area.",
      );
    } else if (
      floorArea === null ||
      floorArea <= 0
    ) {
      addSetupError(
        errors,
        "floorArea",
        "Floor area must be a positive number.",
      );
    }

    if (!assessmentMethod) {
      addSetupError(
        errors,
        "assessmentMethod",
        "Select the assessment method.",
      );
    }

    domains.forEach(
      (domain) => {
        const value =
          answers.domainPresence[
            domain.name
          ] ?? "";

        if (
          !mapDomainPresenceFromInput(
            value,
          )
        ) {
          addSetupError(
            errors,
            `domainPresence.${domain.name}`,
            "Select the domain presence status.",
          );
        }
      },
    );

    /*
     * Just like the frontend, do not
     * check scenario correctness until
     * required validation succeeds.
     */
    if (
      Object.keys(errors)
        .length > 0
    ) {
      return {
        isValid: false,
        errors,
      };
    }

    /*
     * Scenario validation.
     *
     * The expected values now come from
     * canonical database records rather
     * than frontend expectedSetupAnswers.
     */

    if (
      buildingType !==
      caseStudy.buildingType
    ) {
      addSetupError(
        errors,
        "buildingType",
        "This does not match the scenario.",
      );
    }

    if (
      buildingUsage !==
      caseStudy.buildingUsage
    ) {
      addSetupError(
        errors,
        "buildingUsage",
        "This does not match the scenario.",
      );
    }

    if (
      buildingInformation.country !==
      caseStudy.country.name
    ) {
      addSetupError(
        errors,
        "country",
        "This does not match the scenario.",
      );
    }

    if (
      buildingInformation
        .constructionYear
        .trim() !==
      String(
        caseStudy
          .constructionYear,
      )
    ) {
      addSetupError(
        errors,
        "constructionYear",
        "This does not match the scenario.",
      );
    }

    if (
      buildingState !==
      caseStudy.buildingState
    ) {
      addSetupError(
        errors,
        "buildingState",
        "This does not match the scenario.",
      );
    }

    if (
      caseStudy.renovationYear !==
        null &&
      buildingInformation
        .renovationYear
        .trim() !==
        String(
          caseStudy
            .renovationYear,
        )
    ) {
      addSetupError(
        errors,
        "renovationYear",
        "This does not match the scenario.",
      );
    }

    if (
      floorArea !==
      caseStudy.floorArea
    ) {
      addSetupError(
        errors,
        "floorArea",
        "This does not match the scenario.",
      );
    }

    if (
      assessmentMethod !==
      caseStudy
        .expectedAssessmentMethod
    ) {
      addSetupError(
        errors,
        "assessmentMethod",
        "This does not match the scenario.",
      );
    }

    caseStudy
      .expectedDomainPresence
      .forEach(
        (expected) => {
          const actual =
            mapDomainPresenceFromInput(
              answers
                .domainPresence[
                  expected
                    .domain
                    .name
                ] ?? "",
            );

          if (
            actual !==
            expected.status
          ) {
            addSetupError(
              errors,
              `domainPresence.${expected.domain.name}`,
              "This does not match the building systems described in the scenario.",
            );
          }
        },
      );

    return {
      isValid:
        Object.keys(errors)
          .length === 0,

      errors,
    };
  };

// -----------------------------------------------------------------------------
// Attempts
// -----------------------------------------------------------------------------

const getOrCreateActiveAttempt =
  async (
    userId: string,
  ) => {
    const progress =
      await prisma
        .userCaseStudyProgress
        .upsert({
          where: {
            userId_caseStudyId: {
              userId,
              caseStudyId:
                CASE_STUDY_ID,
            },
          },

          update: {},

          create: {
            userId,

            caseStudyId:
              CASE_STUDY_ID,
          },
        });

    if (
      progress.activeAttemptId
    ) {
      const activeAttempt =
        await prisma
          .caseStudyAttempt
          .findFirst({
            where: {
              id:
                progress
                  .activeAttemptId,

              progressId:
                progress.id,
            },
          });

      if (activeAttempt) {
        return activeAttempt;
      }
    }

    const activeAttempt =
      await prisma
        .caseStudyAttempt
        .create({
          data: {
            progressId:
              progress.id,

            lastVisitedStage:
              CaseStudyRouteStage
                .SETUP,
          },
        });

    await prisma
      .userCaseStudyProgress
      .update({
        where: {
          id: progress.id,
        },

        data: {
          activeAttemptId:
            activeAttempt.id,
        },
      });

    return activeAttempt;
  };

const hasDerivedProgress =
  async (
    attemptId: string,
  ): Promise<boolean> => {
    const attempt =
      await prisma
        .caseStudyAttempt
        .findUnique({
          where: {
            id: attemptId,
          },

          select: {
            assessmentCompleted:
              true,

            activeScenarioServiceId:
              true,

            baselineResult: true,

            resultsInvestigation:
              true,

            guidedImprovement:
              true,

            simulationResult:
              true,

            _count: {
              select: {
                serviceAnswers:
                  true,
              },
            },
          },
        });

    if (!attempt) {
      return false;
    }

    return (
      attempt
        .assessmentCompleted ||
      attempt
        .activeScenarioServiceId !==
        null ||
      attempt.baselineResult !==
        null ||
      attempt
        .resultsInvestigation !==
        null ||
      attempt.guidedImprovement !==
        null ||
      attempt.simulationResult !==
        null ||
      attempt._count
        .serviceAnswers > 0
    );
  };

// -----------------------------------------------------------------------------
// Setup DTO
// -----------------------------------------------------------------------------

const buildSetupAnswersDto =
  async (
    attemptId: string,
  ): Promise<
    CaseStudySetupAnswersDto
  > => {
    const [
      attempt,
      domains,
    ] = await Promise.all([
      prisma
        .caseStudyAttempt
        .findUnique({
          where: {
            id: attemptId,
          },

          include: {
            country: true,

            domainPresence: {
              include: {
                domain: true,
              },
            },
          },
        }),

      getCanonicalDomains(),
    ]);

    if (!attempt) {
      throw new Error(
        "Case Study attempt was not found.",
      );
    }

    const domainPresence:
      Record<string, string> =
        {};

    domains.forEach(
      (domain) => {
        domainPresence[
          domain.name
        ] = "";
      },
    );

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

    return {
      buildingInformation: {
        buildingType:
          mapBuildingTypeToDto(
            attempt.buildingType,
          ),

        buildingUsage:
          mapBuildingUsageToDto(
            attempt.buildingUsage,
          ),

        country:
          attempt.country
            ?.name ?? "",

        /*
         * Climate zone is derived from
         * SriCountry. It is not trusted
         * from the browser.
         */
        climateZone:
          mapClimateZoneToDto(
            attempt.country
              ?.climateZone ??
              null,
          ),

        floorArea:
          attempt.floorArea ===
          null
            ? ""
            : String(
                attempt.floorArea,
              ),

        constructionYear:
          attempt
            .constructionYear ===
          null
            ? ""
            : String(
                attempt
                  .constructionYear,
              ),

        buildingState:
          mapBuildingStateToDto(
            attempt.buildingState,
          ),

        renovationYear:
          attempt
            .renovationYear ===
          null
            ? ""
            : String(
                attempt
                  .renovationYear,
              ),
      },

      methodologySelection: {
        assessmentMethod:
          mapAssessmentMethodToDto(
            attempt
              .assessmentMethod,
          ),
      },

      domainPresence,
    };
  };

const areSetupValuesEqual = (
  left:
    CaseStudySetupAnswersDto,

  right:
    CaseStudySetupAnswersDto,
): boolean => {
  return (
    JSON.stringify(left) ===
    JSON.stringify(right)
  );
};

const isStoredStepCompleted = (
    value:
      | Prisma.JsonValue
      | null,
  ): boolean => {
    if (
      !value ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      return false;
    }

    return (
      (
        value as {
          completed?: unknown;
        }
      ).completed === true
    );
  };

const isStoredInteractionCompleted = (
  value:
    | Prisma.JsonValue
    | null,
): boolean => {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  return (
    (
      value as {
        completed?: unknown;
      }
    ).completed === true
  );
};

type CaseStudyJourneySource = {
  activeAttempt:
    | {
        setupCompleted: boolean;

        assessmentCompleted:
          boolean;

        activeScenarioServiceId:
          string | null;

        baselineResult:
          Prisma.JsonValue | null;

        resultsInvestigation:
          Prisma.JsonValue | null;

        guidedImprovement:
          Prisma.JsonValue | null;

        simulationResult:
          Prisma.JsonValue | null;
      }
    | null;

  officialAttemptId:
    | string
    | null;

  activeAttemptId:
    | string
    | null;

  officialSimulationResult:
    Prisma.JsonValue | null;
};

const getCaseStudyJourneyStatus = (
  source:
    CaseStudyJourneySource,
): CaseStudyJourneyStatusDto => {
  const attempt =
    source.activeAttempt;

  if (!attempt) {
    return "not-started";
  }

  if (
    !attempt.setupCompleted
  ) {
    return "setup-in-progress";
  }

  const assessmentStarted =
    attempt
      .activeScenarioServiceId !==
      null;

  if (
    !assessmentStarted &&
    !attempt
      .assessmentCompleted
  ) {
    return "assessment-not-started";
  }

  if (
    !attempt
      .assessmentCompleted ||
    attempt
      .baselineResult ===
      null
  ) {
    return "assessment-in-progress";
  }

  if (
    attempt
      .resultsInvestigation ===
    null
  ) {
    return "results-investigation-not-started";
  }

  if (
    !isStoredInteractionCompleted(
      attempt
        .resultsInvestigation,
    )
  ) {
    return "results-investigation-in-progress";
  }

  if (
    attempt
      .guidedImprovement ===
    null
  ) {
    return "improvement-analysis-not-started";
  }

  if (
    !isStoredInteractionCompleted(
      attempt
        .guidedImprovement,
    )
  ) {
    return "improvement-analysis-in-progress";
  }

  if (
    attempt
      .simulationResult ===
    null
  ) {
    return "simulation-ready";
  }

  return "completed";
};

const getNextCaseStudyStage = (
  status:
    CaseStudyJourneyStatusDto,
): CaseStudyStageDto => {
  switch (status) {
    case "not-started":
    case "setup-in-progress":
      return "setup";

    case "assessment-not-started":
    case "assessment-in-progress":
      return "assessment";

    case "results-investigation-not-started":
    case "results-investigation-in-progress":
      return "results";

    case "improvement-analysis-not-started":
    case "improvement-analysis-in-progress":
    case "simulation-ready":
      return "guided-improvement-analysis";

    case "completed":
      return "simulation-results";
  }
};

const getAllowedCaseStudyStages = (
  source:
    CaseStudyJourneySource,
): CaseStudyStageDto[] => {
  const allowed:
    CaseStudyStageDto[] = [
      "setup",
    ];

  const attempt =
    source.activeAttempt;

  if (!attempt) {
    return allowed;
  }

  if (
    attempt.setupCompleted
  ) {
    allowed.push(
      "assessment",
    );
  }

  const assessmentCompleted =
    attempt.setupCompleted &&
    attempt
      .assessmentCompleted &&
    attempt
      .baselineResult !==
      null;

  if (
    assessmentCompleted
  ) {
    allowed.push(
      "results",
    );
  }

  const resultsCompleted =
    assessmentCompleted &&
    isStoredInteractionCompleted(
      attempt
        .resultsInvestigation,
    );

  if (
    resultsCompleted
  ) {
    allowed.push(
      "guided-improvement-analysis",
    );
  }

  /*
   * Simulation Results can be reviewed either
   * from the current completed attempt or from
   * the permanent official attempt.
   */
  if (
    attempt
      .simulationResult !==
      null ||
    source
      .officialSimulationResult !==
      null
  ) {
    allowed.push(
      "simulation-results",
    );
  }

  return allowed;
};

// -----------------------------------------------------------------------------
// Progress
// -----------------------------------------------------------------------------

export const getCaseStudyProgress =
  async (
    userId: string,
  ): Promise<
    CaseStudyProgressDto
  > => {
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
            activeAttempt: true,
            officialAttempt: true,
          },
        });

    if (!progress) {
      return {
        caseStudyId:
          CASE_STUDY_ID,

        activeAttemptId:
          null,

        officialAttemptId:
          null,

        lastVisitedStage:
          null,

        setup:
          null,

        assessmentStarted:
          false,

        assessmentCompleted:
          false,

        hasBaselineResult:
          false,

        resultsInvestigationStarted:
          false,

        resultsInvestigationCompleted:
          false,

        guidedImprovementStarted:
          false,

        guidedImprovementCompleted:
          false,

        hasSimulationResult:
          false,

        hasOfficialSimulationResult:
          false,

        journeyStatus:
          "not-started",

        nextStage:
          "setup",

        allowedStages: [
          "setup",
        ],

        isPracticeAttempt:
          false,

        startedAt:
          null,

        completedAt:
          null,

        officialCompletedAt:
          null,

        updatedAt:
          null,
      };
    }

    const setupAnswers =
      progress.activeAttemptId
        ? await buildSetupAnswersDto(
            progress
              .activeAttemptId,
          )
        : null;

    const journeySource:
      CaseStudyJourneySource = {
      activeAttempt:
        progress.activeAttempt,

      activeAttemptId:
        progress.activeAttemptId,

      officialAttemptId:
        progress.officialAttemptId,

      officialSimulationResult:
        progress
          .officialAttempt
          ?.simulationResult ??
        null,
    };

    const journeyStatus =
      getCaseStudyJourneyStatus(
        journeySource,
      );

    const nextStage =
      getNextCaseStudyStage(
        journeyStatus,
      );

    const allowedStages =
      getAllowedCaseStudyStages(
        journeySource,
      );

    const isPracticeAttempt =
      progress
        .officialAttemptId !==
        null &&
      progress
        .activeAttemptId !==
        null &&
      progress
        .activeAttemptId !==
        progress
          .officialAttemptId;

    return {
      caseStudyId:
        progress.caseStudyId,

      activeAttemptId:
        progress.activeAttemptId,

      officialAttemptId:
        progress.officialAttemptId,

      lastVisitedStage:
        mapRouteStageToDto(
          progress.activeAttempt
            ?.lastVisitedStage ??
            null,
        ),

      setup:
        progress.activeAttempt &&
        setupAnswers
          ? {
              answers:
                setupAnswers,

              completed:
                progress
                  .activeAttempt
                  .setupCompleted,
            }
          : null,

      assessmentCompleted:
        progress.activeAttempt
          ?.assessmentCompleted ??
        false,

      hasBaselineResult:
        progress.activeAttempt
          ?.baselineResult != null,

      resultsInvestigationCompleted:
        isStoredStepCompleted(
          progress.activeAttempt
            ?.resultsInvestigation ??
            null,
        ),

      guidedImprovementCompleted:
        isStoredStepCompleted(
          progress.activeAttempt
            ?.guidedImprovement ??
            null,
        ),

      hasSimulationResult:
        progress.activeAttempt
          ?.simulationResult != null,

      hasOfficialSimulationResult:
        progress.officialAttempt
          ?.simulationResult != null,

      assessmentStarted:
        progress.activeAttempt
          ?.activeScenarioServiceId !=
        null,

      resultsInvestigationStarted:
        progress.activeAttempt
          ?.resultsInvestigation !=
        null,

      guidedImprovementStarted:
        progress.activeAttempt
          ?.guidedImprovement !=
        null,

      startedAt:
        progress.activeAttempt
          ?.startedAt
          .toISOString() ??
        null,

      completedAt:
        progress.activeAttempt
          ?.completedAt
          ?.toISOString() ??
        null,

      officialCompletedAt:
        progress.officialAttempt
          ?.completedAt
          ?.toISOString() ??
        null,

      updatedAt:
        progress.updatedAt
          .toISOString(),

      journeyStatus,

      nextStage,

      allowedStages,

      isPracticeAttempt,
    };
  };

// -----------------------------------------------------------------------------
// Setup draft
// -----------------------------------------------------------------------------

export const saveSetupDraft =
  async (
    userId: string,

    answers:
      CaseStudySetupInput,
  ): Promise<
    CaseStudyProgressDto
  > => {
    await assertCaseStudyUnlocked(
      userId,
    );

    const caseStudy =
      await prisma.caseStudy
        .findUnique({
          where: {
            id: CASE_STUDY_ID,
          },

          select: {
            id: true,
          },
        });

    if (!caseStudy) {
      throw new CaseStudyAccessError(
        "Case Study was not found.",
      );
    }

    const [
      activeAttempt,
      country,
      domains,
    ] = await Promise.all([
      getOrCreateActiveAttempt(
        userId,
      ),

      findCountryFromInput(
        answers
          .buildingInformation
          .country,
      ),

      getCanonicalDomains(),
    ]);

    const currentAnswers =
      await buildSetupAnswersDto(
        activeAttempt.id,
      );

    /*
     * Build the same complete domain
     * object used by the frontend.
     */
    const incomingDomainPresence:
      Record<string, string> =
        {};

    domains.forEach(
      (domain) => {
        incomingDomainPresence[
          domain.name
        ] =
          answers.domainPresence[
            domain.name
          ] ?? "";
      },
    );

    const incomingAnswers:
      CaseStudySetupAnswersDto = {
      buildingInformation: {
        buildingType:
          answers
            .buildingInformation
            .buildingType,

        buildingUsage:
          answers
            .buildingInformation
            .buildingUsage,

        country:
          country?.name ?? "",

        climateZone:
          mapClimateZoneToDto(
            country
              ?.climateZone ??
              null,
          ),

        floorArea:
          normalizeFloorAreaInput(
            answers
              .buildingInformation
              .floorArea,
          ),

        constructionYear:
          answers
            .buildingInformation
            .constructionYear,

        buildingState:
          answers
            .buildingInformation
            .buildingState,

        renovationYear:
          answers
            .buildingInformation
            .renovationYear,
      },

      methodologySelection: {
        assessmentMethod:
          answers
            .methodologySelection
            .assessmentMethod,
      },

      domainPresence:
        incomingDomainPresence,
    };

    const answersUnchanged =
      areSetupValuesEqual(
        currentAnswers,
        incomingAnswers,
      );

    /*
     * Same protection that already
     * exists in the frontend:
     *
     * visiting a completed Setup and
     * temporarily editing a field must
     * not invalidate Assessment/Results.
     */
    const protectDerivedProgress =
      activeAttempt
        .setupCompleted &&
      !answersUnchanged &&
      await hasDerivedProgress(
        activeAttempt.id,
      );

    if (
      protectDerivedProgress
    ) {
      await prisma
        .caseStudyAttempt
        .update({
          where: {
            id:
              activeAttempt.id,
          },

          data: {
            lastVisitedStage:
              CaseStudyRouteStage
                .SETUP,
          },
        });

      const progress =
        await getCaseStudyProgress(
          userId,
        );

      if (!progress) {
        throw new Error(
          "Case Study progress was not found after saving the Setup draft.",
        );
      }

      return progress;
    }

    /*
     * Empty domain choices are not stored.
     * The relation contains only values
     * the user has actually selected.
     */
    const domainRows =
      domains.flatMap(
        (domain) => {
          const status =
            mapDomainPresenceFromInput(
              answers
                .domainPresence[
                  domain.name
                ] ?? "",
            );

          if (!status) {
            return [];
          }

          return [
            {
              attemptId:
                activeAttempt.id,

              domainId:
                domain.id,

              status,
            },
          ];
        },
      );

    await prisma.$transaction(
      async (tx) => {
        await tx
          .caseStudyAttempt
          .update({
            where: {
              id:
                activeAttempt.id,
            },

            data: {
              lastVisitedStage:
                CaseStudyRouteStage
                  .SETUP,

              buildingType:
                mapBuildingTypeFromInput(
                  answers
                    .buildingInformation
                    .buildingType,
                ),

              buildingUsage:
                mapBuildingUsageFromInput(
                  answers
                    .buildingInformation
                    .buildingUsage,
                ),

              /*
               * countryId is canonical.
               * Climate zone will always be
               * derived from SriCountry.
               */
              countryId:
                country?.id ??
                null,

              floorArea:
                parseFloorArea(
                  answers
                    .buildingInformation
                    .floorArea,
                ),

              constructionYear:
                parseOptionalInteger(
                  answers
                    .buildingInformation
                    .constructionYear,
                ),

              buildingState:
                mapBuildingStateFromInput(
                  answers
                    .buildingInformation
                    .buildingState,
                ),

              renovationYear:
                parseOptionalInteger(
                  answers
                    .buildingInformation
                    .renovationYear,
                ),

              assessmentMethod:
                mapAssessmentMethodFromInput(
                  answers
                    .methodologySelection
                    .assessmentMethod,
                ),

              /*
               * Changing a draft after a
               * completed Setup makes it
               * incomplete again only when
               * no dependent progress exists.
               */
              setupCompleted:
                answersUnchanged
                  ? activeAttempt
                      .setupCompleted
                  : false,
            },
          });

        await tx
          .caseStudyAttemptDomainPresence
          .deleteMany({
            where: {
              attemptId:
                activeAttempt.id,
            },
          });

        if (
          domainRows.length > 0
        ) {
          await tx
            .caseStudyAttemptDomainPresence
            .createMany({
              data:
                domainRows,
            });
        }
      },
    );

    const progress =
      await getCaseStudyProgress(
        userId,
      );

    if (!progress) {
      throw new Error(
        "Case Study progress was not found after saving the Setup draft.",
      );
    }

    return progress;
  };

export const completeSetup =
  async (
    userId: string,

    answers:
      CaseStudySetupInput,
  ): Promise<
    CompleteCaseStudySetupResult
  > => {
    /*
     * First persist the submitted values
     * as a draft.
     *
     * If this is a completed Setup with
     * dependent progress, saveSetupDraft
     * already protects the old validated
     * values.
     */
    const draftProgress =
      await saveSetupDraft(
        userId,
        answers,
      );

    const validation =
      await validateSetupForCompletion(
        answers,
      );

    /*
     * A wrong educational answer is not
     * an HTTP/API error.
     */
    if (!validation.isValid) {
      return {
        validation,
        progress:
          draftProgress,
      };
    }

    const progressRecord =
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
          },
        });

    const activeAttempt =
      progressRecord
        ?.activeAttempt ??
      null;

    if (
      !progressRecord ||
      !activeAttempt
    ) {
      throw new Error(
        "Active Case Study attempt was not found.",
      );
    }

    const [
      country,
      domains,
    ] = await Promise.all([
      findCountryFromInput(
        answers
          .buildingInformation
          .country,
      ),

      getCanonicalDomains(),
    ]);

    /*
     * Validation has already succeeded,
     * therefore a canonical country must
     * exist.
     */
    if (!country) {
      throw new Error(
        "Validated Case Study country was not found.",
      );
    }

    const currentAnswers =
      await buildSetupAnswersDto(
        activeAttempt.id,
      );

    const incomingDomainPresence:
      Record<string, string> =
        {};

    domains.forEach(
      (domain) => {
        incomingDomainPresence[
          domain.name
        ] =
          answers.domainPresence[
            domain.name
          ] ?? "";
      },
    );

    const incomingAnswers:
      CaseStudySetupAnswersDto = {
      buildingInformation: {
        buildingType:
          answers
            .buildingInformation
            .buildingType,

        buildingUsage:
          answers
            .buildingInformation
            .buildingUsage,

        country:
          country.name,

        climateZone:
          mapClimateZoneToDto(
            country.climateZone,
          ),

        floorArea:
          normalizeFloorAreaInput(
            answers
              .buildingInformation
              .floorArea,
          ),

        constructionYear:
          answers
            .buildingInformation
            .constructionYear,

        buildingState:
          answers
            .buildingInformation
            .buildingState,

        renovationYear:
          answers
            .buildingInformation
            .renovationYear,
      },

      methodologySelection: {
        assessmentMethod:
          answers
            .methodologySelection
            .assessmentMethod,
      },

      domainPresence:
        incomingDomainPresence,
    };

    const answersChanged =
      !areSetupValuesEqual(
        currentAnswers,
        incomingAnswers,
      );

    /*
     * Never mutate the permanent official
     * attempt.
     *
     * In the normal UI this situation will
     * later be handled by Practice Again,
     * which creates a new active attempt.
     */
    if (
      answersChanged &&
      progressRecord
        .officialAttemptId ===
        activeAttempt.id
    ) {
      throw new CaseStudyAccessError(
        "Start a new practice attempt before changing the completed Case Study.",
      );
    }

    const domainRows =
      domains.map(
        (domain) => {
          const status =
            mapDomainPresenceFromInput(
              answers
                .domainPresence[
                  domain.name
                ] ?? "",
            );

          if (!status) {
            throw new Error(
              `Validated domain "${domain.name}" has no presence status.`,
            );
          }

          return {
            attemptId:
              activeAttempt.id,

            domainId:
              domain.id,

            status,
          };
        },
      );

    const buildingType =
      mapBuildingTypeFromInput(
        answers
          .buildingInformation
          .buildingType,
      );

    const buildingUsage =
      mapBuildingUsageFromInput(
        answers
          .buildingInformation
          .buildingUsage,
      );

    const buildingState =
      mapBuildingStateFromInput(
        answers
          .buildingInformation
          .buildingState,
      );

    const assessmentMethod =
      mapAssessmentMethodFromInput(
        answers
          .methodologySelection
          .assessmentMethod,
      );
    
    const floorArea =
      parseFloorArea(
        answers
          .buildingInformation
          .floorArea,
      );

    if (
      !buildingType ||
      !buildingUsage ||
      !buildingState ||
      !assessmentMethod ||
      floorArea === null ||
      floorArea <= 0
    ) {
      throw new Error(
        "Validated Setup values could not be resolved.",
      );
    }

    await prisma.$transaction(
      async (tx) => {
        await tx
          .caseStudyAttempt
          .update({
            where: {
              id:
                activeAttempt.id,
            },

            data: {
              lastVisitedStage:
                CaseStudyRouteStage
                  .ASSESSMENT,

              buildingType,

              buildingUsage,

              countryId:
                country.id,

              floorArea,

              constructionYear:
                Number(
                  answers
                    .buildingInformation
                    .constructionYear,
                ),

              buildingState,

              renovationYear:
                answers
                  .buildingInformation
                  .renovationYear
                  .trim()
                  ? Number(
                      answers
                        .buildingInformation
                        .renovationYear,
                    )
                  : null,

              assessmentMethod,

              setupCompleted:
                true,

              /*
               * Exactly like the current
               * frontend:
               *
               * only a genuinely changed
               * validated Setup invalidates
               * downstream work.
               */
              ...(
                answersChanged
                  ? {
                      assessmentCompleted:
                        false,

                      activeScenarioServiceId:
                        null,

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
                    }
                  : {}
              ),
            },
          });

        /*
         * The validated Setup always owns
         * the complete canonical domain
         * presence set.
         */
        await tx
          .caseStudyAttemptDomainPresence
          .deleteMany({
            where: {
              attemptId:
                activeAttempt.id,
            },
          });

        await tx
          .caseStudyAttemptDomainPresence
          .createMany({
            data:
              domainRows,
          });

        /*
         * Service answers depend on the
         * Setup and must be discarded when
         * the validated Setup changes.
         */
        if (answersChanged) {
          await tx
            .caseStudyAttemptServiceAnswer
            .deleteMany({
              where: {
                attemptId:
                  activeAttempt.id,
              },
            });
        }
      },
    );

    const progress =
      await getCaseStudyProgress(
        userId,
      );

    if (!progress) {
      throw new Error(
        "Case Study progress was not found after completing Setup.",
      );
    }

    return {
      validation: {
        isValid: true,
        errors: {},
      },

      progress,
    };
  };

export const startNewCaseStudyPracticeAttempt =
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

          select: {
            id: true,

            officialAttemptId:
              true,

            activeAttemptId:
              true,
          },
        });

    if (
      !progress ||
      !progress
        .officialAttemptId
    ) {
      throw new CaseStudyAccessError(
        "Complete the Case Study before starting a new practice attempt.",
      );
    }

    await prisma.$transaction(
      async (tx) => {
        /*
         * We keep exactly one permanent attempt:
         * the first official completion.
         *
         * Any older non-official practice attempt
         * is disposable and can be removed.
         */
        await tx
          .caseStudyAttempt
          .deleteMany({
            where: {
              progressId:
                progress.id,

              id: {
                not:
                  progress
                    .officialAttemptId!,
              },
            },
          });

        /*
         * Start a completely fresh practice
         * attempt from Building Information.
         *
         * All Setup / Assessment / Results /
         * Guided / Simulation fields use their
         * normal null/default values.
         */
        const newAttempt =
          await tx
            .caseStudyAttempt
            .create({
              data: {
                progressId:
                  progress.id,

                lastVisitedStage:
                  CaseStudyRouteStage
                    .SETUP,
              },
            });

        /*
         * Point only the ACTIVE attempt to the
         * new practice.
         *
         * officialAttemptId is deliberately
         * left untouched.
         */
        await tx
          .userCaseStudyProgress
          .update({
            where: {
              id:
                progress.id,
            },

            data: {
              activeAttemptId:
                newAttempt.id,
            },
          });
      },
    );

    return getCaseStudyProgress(
      userId,
    );
  };
