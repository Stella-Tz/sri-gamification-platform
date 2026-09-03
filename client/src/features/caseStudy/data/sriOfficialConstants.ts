// client/src/features/caseStudy/data/sriOfficialConstants.ts

import type {
  ImpactCriterionName,
  TechnicalDomainName,
} from "../types/caseStudy.types";

/**
 * Official SRI Technical Domains
 *
 * Used by the frontend only for stable
 * presentation ordering and form rendering.
 */
export const sriTechnicalDomainNames = [
  "Heating",
  "Cooling",
  "Domestic hot water",
  "Ventilation",
  "Lighting",
  "Dynamic building envelope",
  "Electricity",
  "Electric vehicle charging",
  "Monitoring and control",
] as const satisfies readonly TechnicalDomainName[];

/**
 * Official SRI Impact Criteria
 *
 * Used by the frontend only for stable
 * presentation ordering.
 */
export const sriImpactCriterionNames = [
  "Energy efficiency",
  "Maintenance and fault prediction",
  "Comfort",
  "Convenience",
  "Health, well-being and accessibility",
  "Information to occupants",
  "Energy flexibility and storage",
] as const satisfies readonly ImpactCriterionName[];