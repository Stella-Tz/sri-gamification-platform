// server/src/services/caseStudyDefinitionService.ts

import {
  BuildingUsage,
  CaseStudyMode,
} from "@prisma/client";

import prisma from "../prismaClient.js";

import {
  assertCaseStudyUnlocked,
  CASE_STUDY_ID,
  CaseStudyAccessError,
} from "./caseStudyService.js";

// -----------------------------------------------------------------------------
// Public DTO
// -----------------------------------------------------------------------------

export type CaseStudyScenarioSectionDto = {
  title: string;
  bullets: string[];
};

export type CaseStudyDefinitionDto = {
  id: string;
  order: number;

  title: string;
  description: string;

  mode:
    | "baseline"
    | "improvement";

  scenario: {
    generalBuildingInformation:
      CaseStudyScenarioSectionDto;

    methodologyContext:
      CaseStudyScenarioSectionDto;

    buildingSystemsAndTechnologies:
      CaseStudyScenarioSectionDto;
  };

  /*
   * Only learner-visible facts required by the
   * current presentation card are exposed here.
   *
   * Correct Setup answers such as buildingState,
   * expectedAssessmentMethod and expected domain
   * presence deliberately remain server-side.
   */
  buildingInformation: {
    buildingUsage: string;

    locationLabel: string;

    floorArea: number;

    constructionYear: number;

    renovationYear:
      | number
      | null;
  };
};

// -----------------------------------------------------------------------------
// Scenario parsing
// -----------------------------------------------------------------------------

const isRecord = (
  value: unknown,
): value is Record<
  string,
  unknown
> => {
  return (
    typeof value ===
      "object" &&
    value !== null &&
    !Array.isArray(
      value,
    )
  );
};

const parseScenarioSection = (
  value: unknown,
  sectionName: string,
): CaseStudyScenarioSectionDto => {
  if (!isRecord(value)) {
    throw new Error(
      `Case Study scenario section "${sectionName}" is invalid.`,
    );
  }

  const title =
    typeof value.title ===
      "string"
      ? value.title.trim()
      : "";

  /*
   * Current Case Study data uses bullets.
   *
   * The text fallback makes the API tolerant of
   * older seeded records that stored the same
   * presentation content as newline-separated text.
   */
  const bullets =
    Array.isArray(
      value.bullets,
    )
      ? value.bullets
          .filter(
            (
              item,
            ): item is string =>
              typeof item ===
              "string",
          )
          .map((item) =>
            item.trim(),
          )
          .filter(Boolean)
      : typeof value.text ===
          "string"
        ? value.text
            .split("\n")
            .map((item) =>
              item.trim(),
            )
            .filter(Boolean)
        : [];

  if (
    !title ||
    bullets.length === 0
  ) {
    throw new Error(
      `Case Study scenario section "${sectionName}" is incomplete.`,
    );
  }

  return {
    title,
    bullets,
  };
};

const parseScenario = (
  value: unknown,
): CaseStudyDefinitionDto["scenario"] => {
  if (!isRecord(value)) {
    throw new Error(
      "Case Study scenario is invalid.",
    );
  }

  return {
    generalBuildingInformation:
      parseScenarioSection(
        value
          .generalBuildingInformation,
        "generalBuildingInformation",
      ),

    methodologyContext:
      parseScenarioSection(
        value.methodologyContext,
        "methodologyContext",
      ),

    buildingSystemsAndTechnologies:
      parseScenarioSection(
        value
          .buildingSystemsAndTechnologies,
        "buildingSystemsAndTechnologies",
      ),
  };
};

// -----------------------------------------------------------------------------
// Prisma -> API mappings
// -----------------------------------------------------------------------------

const mapModeToDto = (
  value: CaseStudyMode,
): CaseStudyDefinitionDto["mode"] => {
  switch (value) {
    case CaseStudyMode.BASELINE:
      return "baseline";

    case CaseStudyMode.IMPROVEMENT:
      return "improvement";
  }
};

const mapBuildingUsageToDto = (
  value: BuildingUsage,
): string => {
  switch (value) {
    case BuildingUsage
      .SINGLE_FAMILY_HOUSE:
      return "single-family-house";

    case BuildingUsage
      .SMALL_MULTI_FAMILY_HOUSE:
      return "small-multi-family-house";

    case BuildingUsage
      .LARGE_MULTI_FAMILY_HOUSE:
      return "large-multi-family-house";

    case BuildingUsage
      .RESIDENTIAL_OTHER:
      return "residential-other";

    case BuildingUsage.OFFICE:
      /*
       * Preserve the current Setup presentation
       * value used by the existing scenario card.
       */
      return "office";

    case BuildingUsage
      .EDUCATIONAL_BUILDINGS:
      return "educational-buildings";

    case BuildingUsage.HEALTHCARE:
      return "healthcare";

    case BuildingUsage
      .NON_RESIDENTIAL_OTHER:
      return "non-residential-other";
  }
};

// -----------------------------------------------------------------------------
// Definition
// -----------------------------------------------------------------------------

export const getCaseStudyDefinition =
  async (
    userId: string,
  ): Promise<
    CaseStudyDefinitionDto
  > => {
    await assertCaseStudyUnlocked(
      userId,
    );

    const caseStudy =
      await prisma.caseStudy
        .findUnique({
          where: {
            id:
              CASE_STUDY_ID,
          },

          select: {
            id: true,
            order: true,

            title: true,
            description: true,

            mode: true,
            scenario: true,

            buildingUsage: true,

            locationLabel: true,

            floorArea: true,

            constructionYear:
              true,

            renovationYear:
              true,
          },
        });

    if (!caseStudy) {
      throw new CaseStudyAccessError(
        "Case Study was not found.",
      );
    }

    return {
      id:
        caseStudy.id,

      order:
        caseStudy.order,

      title:
        caseStudy.title,

      description:
        caseStudy.description,

      mode:
        mapModeToDto(
          caseStudy.mode,
        ),

      scenario:
        parseScenario(
          caseStudy.scenario,
        ),

      buildingInformation: {
        buildingUsage:
          mapBuildingUsageToDto(
            caseStudy
              .buildingUsage,
          ),

        locationLabel:
          caseStudy
            .locationLabel,

        floorArea:
          caseStudy.floorArea,

        constructionYear:
          caseStudy
            .constructionYear,

        renovationYear:
          caseStudy
            .renovationYear,
      },
    };
  };