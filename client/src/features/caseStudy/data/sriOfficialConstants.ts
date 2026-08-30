// client/src/features/caseStudy/data/sriOfficialConstants.ts

import type {
  DomainPresence,
  DomainPresenceValue,
  ImpactCriterionName,
  KeyFunctionalityName,
  TechnicalDomainName,
} from "../types/caseStudy.types";

/**
 * Official SRI Technical Domains
 *
 * Source:
 * SRI Methodology
 * SRI Calculation Sheet v4.5
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

/**
 * Official SRI Key Functionalities
 */
export const sriKeyFunctionalityNames = [
  "Energy performance and operation",
  "Response to user needs",
  "Energy flexibility",
] as const satisfies readonly KeyFunctionalityName[];

/**
 * Official relationship:
 *
 * Key Functionality
 *        ↓
 * Impact Criteria
 */
export const impactCriteriaByKeyFunctionality: Record<
  KeyFunctionalityName,
  ImpactCriterionName[]
> = {
  "Energy performance and operation": [
    "Energy efficiency",
    "Maintenance and fault prediction",
  ],

  "Response to user needs": [
    "Comfort",
    "Convenience",
    "Health, well-being and accessibility",
    "Information to occupants",
  ],

  "Energy flexibility": [
    "Energy flexibility and storage",
  ],
};

/**
 * Reverse lookup:
 *
 * Impact Criterion
 *        ↓
 * Key Functionality
 */
export const keyFunctionalityByImpactCriterion: Record<
  ImpactCriterionName,
  KeyFunctionalityName
> = {
  "Energy efficiency":
    "Energy performance and operation",

  "Maintenance and fault prediction":
    "Energy performance and operation",

  Comfort:
    "Response to user needs",

  Convenience:
    "Response to user needs",

  "Health, well-being and accessibility":
    "Response to user needs",

  "Information to occupants":
    "Response to user needs",

  "Energy flexibility and storage":
    "Energy flexibility",
};

/**
 * Official SRI spreadsheet values:
 *
 * 0 = absent-not-mandatory
 * 1 = present
 * 2 = absent-mandatory
 */
export const domainPresenceToOfficialValue: Record<
  DomainPresence,
  DomainPresenceValue
> = {
  "absent-not-mandatory": 0,
  present: 1,
  "absent-mandatory": 2,
};

export const officialValueToDomainPresence: Record<
  DomainPresenceValue,
  DomainPresence
> = {
  0: "absent-not-mandatory",
  1: "present",
  2: "absent-mandatory",
};

export const domainPresenceValues:
  DomainPresenceValue[] = [
    0,
    1,
    2,
  ];

export const domainPresenceOptions:
  DomainPresence[] = [
    "absent-not-mandatory",
    "present",
    "absent-mandatory",
  ];