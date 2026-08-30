// client/src/features/caseStudy/data/sriMethodWeightings.ts

import type {
  BuildingType,
  ClimateZone,
  ImpactCriterionName,
  OfficialAssessmentMethod,
  TechnicalDomainName,
} from "../types/caseStudy.types";

import {
  getSriWeight,
  sriImpactCriterionWeightings,
} from "./sriWeightings";

/**
 * The generated matrices in
 * sriWeightings.ts contain the effective
 * default values exposed by the v4.5
 * workbook for the Method B catalogue.
 *
 * The workbook exposes different effective
 * matrices for Comfort and Health when
 * Catalogue A is selected.
 *
 * This does not represent a separate
 * Method A weighting methodology.
 *
 * The differences result from the
 * catalogue-specific domain–impact
 * combinations with non-zero scores.
 */
const METHOD_A_COMFORT_WEIGHTS: Readonly<
  Record<
    TechnicalDomainName,
    number
  >
> = {
  Heating: 0.2,
  Cooling: 0.2,

  "Domestic hot water": 0,

  Ventilation: 0.2,
  Lighting: 0.2,

  "Dynamic building envelope":
    0.2,

  Electricity: 0,

  "Electric vehicle charging":
    0,

  "Monitoring and control": 0,
};

const METHOD_A_HEALTH_WEIGHTS: Readonly<
  Record<
    TechnicalDomainName,
    number
  >
> = {
  Heating: 0.25,
  Cooling: 0.25,

  "Domestic hot water": 0,

  Ventilation: 0.25,
  Lighting: 0,

  "Dynamic building envelope":
    0.25,

  Electricity: 0,

  "Electric vehicle charging":
    0,

  "Monitoring and control": 0,
};

export const getOfficialSriWeight = ({
  assessmentMethod,
  buildingType,
  climateZone,
  domain,
  impactCriterion,
}: {
  assessmentMethod:
    OfficialAssessmentMethod;

  buildingType: BuildingType;
  climateZone: ClimateZone;

  domain: TechnicalDomainName;

  impactCriterion:
    ImpactCriterionName;
}): number => {
  if (assessmentMethod === "A") {
    if (
      impactCriterion ===
      "Comfort"
    ) {
      return METHOD_A_COMFORT_WEIGHTS[
        domain
      ];
    }

    if (
      impactCriterion ===
      "Health, well-being and accessibility"
    ) {
      return METHOD_A_HEALTH_WEIGHTS[
        domain
      ];
    }
  }

  /*
   * All other official default domain
   * weights are identical in Methods A/B.
   */
  return getSriWeight({
    buildingType,
    climateZone,
    domain,
    impactCriterion,
  });
};

export const getOfficialImpactCriterionWeight = (
  impactCriterion:
    ImpactCriterionName,
): number => {
  return sriImpactCriterionWeightings[
    impactCriterion
  ];
};