// client/src/features/caseStudy/data/sriMethodSpecificServiceData.ts

import type {
  ImpactCriterionName,
  OfficialAssessmentMethod,
  SriService,
} from "../types/caseStudy.types";

type SriMethodSpecificServiceOverride =
  Partial<
    Pick<
      SriService,
      | "serviceGroup"
      | "smartReadyService"
      | "shortTitle"
      | "functionalityLevels"
      | "impactScoresByLevel"
    >
  >;

const ZERO_IMPACTS: Readonly<
  Record<
    ImpactCriterionName,
    number
  >
> = {
  "Energy efficiency": 0,

  "Maintenance and fault prediction":
    0,

  Comfort: 0,
  Convenience: 0,

  "Health, well-being and accessibility":
    0,

  "Information to occupants": 0,

  "Energy flexibility and storage":
    0,
};

/**
 * Method A service-data overrides.
 *
 * The generated service catalogue contains
 * the Method B service definitions and
 * impact-score vectors where the official
 * v4.5 workbook exposes catalogue-dependent
 * data.
 *
 * Method-dependent service definitions:
 *
 * - H-1c:
 *   service group, service name,
 *   functionality levels and impact scores.
 *
 * - DHW-1a:
 *   Method A includes functionality
 *   levels 0–2 only.
 *
 * - DHW-1b:
 *   service group, service name,
 *   functionality levels and impact scores.
 *
 * Source:
 * SRI3_calculation-sheet_v4.5.xlsx
 * - overview_of_services
 * - H domain sheet
 * - DHW domain sheet
 */
const METHOD_A_SERVICE_OVERRIDES:
  Readonly<
    Record<
      string,
      SriMethodSpecificServiceOverride
    >
  > = {
    /**
     * H-1c — Method A
     *
     * In Catalogue B this code represents
     * control of the heating-distribution
     * fluid temperature.
     *
     * In Catalogue A the workbook assigns
     * the same code to storage and shifting
     * of thermal energy.
     */
    "h-1c": {
      serviceGroup:
        "Control heat production facilities",

      smartReadyService:
        "Storage and shifting of thermal energy",

      shortTitle:
        "Storage and shifting of thermal energy",

      functionalityLevels: [
        {
          id: "h-1c-level-0",
          level: 0,
          officialDescription:
            "None",
        },
        {
          id: "h-1c-level-1",
          level: 1,
          officialDescription:
            "HW storage vessels available",
        },
        {
          id: "h-1c-level-2",
          level: 2,
          officialDescription:
            "HW storage vessels controlled based on external signals (from BACS or grid)",
        },
      ],

      impactScoresByLevel: {
        "h-1c-level-0": {
          ...ZERO_IMPACTS,
        },

        "h-1c-level-1": {
          ...ZERO_IMPACTS,

          "Energy flexibility and storage":
            1,
        },

        "h-1c-level-2": {
          ...ZERO_IMPACTS,

          "Energy flexibility and storage":
            2,
        },
      },
    },

    /**
     * DHW-1a — Method A
     *
     * The service definition and impact
     * scores for levels 0–2 are identical
     * to Method B.
     *
     * Functionality level 3 is not included
     * in Catalogue A.
     */
    "dhw-1a": {
      functionalityLevels: [
        {
          id: "dhw-1a-level-0",
          level: 0,
          officialDescription:
            "Automatic control on / off",
        },
        {
          id: "dhw-1a-level-1",
          level: 1,
          officialDescription:
            "Automatic control on / off and scheduled charging enable",
        },
        {
          id: "dhw-1a-level-2",
          level: 2,
          officialDescription:
            "Automatic control on / off and scheduled charging enable and multi-sensor storage management",
        },
      ],

      impactScoresByLevel: {
        "dhw-1a-level-0": {
          ...ZERO_IMPACTS,
        },

        "dhw-1a-level-1": {
          ...ZERO_IMPACTS,

          "Energy efficiency": 1,

          "Energy flexibility and storage":
            1,

          Convenience: 1,
        },

        "dhw-1a-level-2": {
          ...ZERO_IMPACTS,

          "Energy efficiency": 2,

          "Energy flexibility and storage":
            2,

          Convenience: 2,
        },
      },
    },

    /**
     * DHW-1b — Method A
     *
     * Catalogue A uses a different service
     * group, service name and functionality-
     * level structure.
     *
     * Only levels 0–2 are included.
     */
    "dhw-1b": {
      serviceGroup:
        "Flexibility DHW production facilities",

      smartReadyService:
        "Control of DHW storage charging",

      shortTitle:
        "Control of DHW storage charging",

      functionalityLevels: [
        {
          id: "dhw-1b-level-0",
          level: 0,
          officialDescription:
            "None",
        },
        {
          id: "dhw-1b-level-1",
          level: 1,
          officialDescription:
            "HW storage vessels available",
        },
        {
          id: "dhw-1b-level-2",
          level: 2,
          officialDescription:
            "Automatic charging control based on local availability of renewables or information from electricity grid (DR, DSM)",
        },
      ],

      impactScoresByLevel: {
        "dhw-1b-level-0": {
          ...ZERO_IMPACTS,
        },

        "dhw-1b-level-1": {
          ...ZERO_IMPACTS,

          "Energy flexibility and storage":
            1,

          Convenience: 1,
        },

        "dhw-1b-level-2": {
          ...ZERO_IMPACTS,

          "Energy flexibility and storage":
            3,

          Convenience: 2,
        },
      },
    },
  };

/**
 * Returns the complete service definition
 * for the selected official assessment
 * method.
 *
 * Method B uses the generated base catalogue.
 *
 * Method A applies the official
 * method-specific overrides where required.
 */
export const resolveSriServiceForAssessmentMethod = (
  service: SriService,

  assessmentMethod:
    OfficialAssessmentMethod,
): SriService => {
  if (assessmentMethod === "B") {
    return service;
  }

  const override =
    METHOD_A_SERVICE_OVERRIDES[
      service.id
    ];

  if (!override) {
    return service;
  }

  return {
    ...service,
    ...override,
  };
};