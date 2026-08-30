// client/src/features/caseStudy/data/sriServiceCatalogue.ts

import type {
  ImpactCriterionName,
  OfficialAssessmentMethod,
  SriService,
  TechnicalDomainName,
} from "../types/caseStudy.types";

import {
  sriImpactCriterionNames,
  sriTechnicalDomainNames,
} from "./sriOfficialConstants";

import {
  resolveSriServiceForAssessmentMethod,
} from "./sriMethodSpecificServiceData";

import {
  sriServiceCatalogue as generatedSriServiceCatalogue,
} from "./sriServiceCatalogue.generated";

const officialMethods:
  OfficialAssessmentMethod[] = [
    "A",
    "B",
  ];

const assertValidSriServiceCatalogue = (
  services: SriService[],
): void => {
  const serviceIds =
    new Set<string>();

  services.forEach((service) => {
    if (serviceIds.has(service.id)) {
      throw new Error(
        `Duplicate SRI service id: ${service.id}`,
      );
    }

    serviceIds.add(service.id);

    if (
      !sriTechnicalDomainNames.includes(
        service.domain,
      )
    ) {
      throw new Error(
        `Invalid technical domain "${service.domain}" ` +
          `in service ${service.code}`,
      );
    }

    service.includedInOfficialMethods.forEach(
      (method) => {
        if (
          !officialMethods.includes(
            method,
          )
        ) {
          throw new Error(
            `Invalid official assessment method "${method}" ` +
              `in service ${service.code}`,
          );
        }
      },
    );

    if (
      service.functionalityLevels
        .length === 0
    ) {
      throw new Error(
        `Service ${service.code} has no functionality levels`,
      );
    }

    service.functionalityLevels.forEach(
      (level) => {
        if (
          !level.officialDescription.trim()
        ) {
          throw new Error(
            `Missing official description for ` +
              `${service.code}, level ${level.level}`,
          );
        }

        const impactScores =
          service.impactScoresByLevel[
            level.id
          ];

        if (!impactScores) {
          throw new Error(
            `Missing impact scores for ` +
              `${service.code}, level ${level.level}`,
          );
        }

        Object.keys(
          impactScores,
        ).forEach(
          (impactCriterion) => {
            if (
              !sriImpactCriterionNames.includes(
                impactCriterion as
                  ImpactCriterionName,
              )
            ) {
              throw new Error(
                `Invalid impact criterion ` +
                  `"${impactCriterion}" in service ${service.code}`,
              );
            }
          },
        );
      },
    );
  });
};

/**
 * Base catalogue generated from the
 * official workbook.
 *
 * The generated catalogue contains the
 * Method B definitions wherever the
 * official workbook distinguishes between
 * Method A and Method B.
 *
 * Method A differences are applied through
 * resolveSriServiceForAssessmentMethod().
 */
export const sriServiceCatalogue:
  SriService[] = [
    ...generatedSriServiceCatalogue,
  ];

/**
 * Filters the base catalogue by official
 * assessment method and applies the
 * corresponding method-specific overrides.
 */
const resolveOfficialSriServiceCatalogue = (
  assessmentMethod:
    OfficialAssessmentMethod,
): SriService[] => {
  return sriServiceCatalogue
    .filter((service) =>
      service.includedInOfficialMethods.includes(
        assessmentMethod,
      ),
    )
    .map((service) =>
      resolveSriServiceForAssessmentMethod(
        service,
        assessmentMethod,
      ),
    );
};

/**
 * Validate the generated base catalogue
 * when this module loads.
 */
assertValidSriServiceCatalogue(
  sriServiceCatalogue,
);

/**
 * Validate the fully resolved Method A
 * and Method B catalogues.
 */
officialMethods.forEach(
  (assessmentMethod) => {
    const resolvedCatalogue =
      resolveOfficialSriServiceCatalogue(
        assessmentMethod,
      );

    assertValidSriServiceCatalogue(
      resolvedCatalogue,
    );
  },
);

/**
 * Raw lookup in the generated base catalogue.
 *
 * Assessment runtime code should normally use
 * the fully resolved catalogue returned by
 * getSriServicesForAssessmentMethod().
 */
export const getSriServiceById = (
  serviceId: string,
): SriService | null => {
  return (
    sriServiceCatalogue.find(
      (service) =>
        service.id === serviceId,
    ) ?? null
  );
};

/**
 * Raw lookup by service code in the generated
 * base catalogue.
 *
 * Assessment runtime code should normally use
 * the fully resolved catalogue returned by
 * getSriServicesForAssessmentMethod().
 */
export const getSriServiceByCode = (
  serviceCode: string,
): SriService | null => {
  const normalizedServiceCode =
    serviceCode
      .trim()
      .toLowerCase();

  return (
    sriServiceCatalogue.find(
      (service) =>
        service.code
          .trim()
          .toLowerCase() ===
        normalizedServiceCode,
    ) ?? null
  );
};

/**
 * Raw lookup by technical domain in the
 * generated base catalogue.
 *
 * Assessment runtime code should normally
 * filter the already resolved catalogue.
 */
export const getSriServicesByDomain = (
  domain: TechnicalDomainName,
): SriService[] => {
  return sriServiceCatalogue.filter(
    (service) =>
      service.domain === domain,
  );
};

/**
 * Returns the fully resolved service catalogue
 * for the selected official assessment method.
 *
 * Method A:
 * - uses the simplified official service catalogue;
 * - applies the official Method A service definitions;
 * - applies the Method A functionality levels;
 * - applies the Method A impact-score vectors.
 *
 * Method B:
 * - uses the detailed official service catalogue;
 * - retains the generated base definitions.
 */
export const getSriServicesForAssessmentMethod = (
  method: OfficialAssessmentMethod,
): SriService[] => {
  return resolveOfficialSriServiceCatalogue(
    method,
  );
};

export const getImpactCriteriaForService = (
  service: SriService,
): ImpactCriterionName[] => {
  const usedImpactCriteria =
    new Set<ImpactCriterionName>();

  Object.values(
    service.impactScoresByLevel,
  ).forEach((impactScores) => {
    Object.entries(
      impactScores,
    ).forEach(
      ([
        impactCriterion,
        score,
      ]) => {
        if (
          typeof score === "number" &&
          Number.isFinite(score) &&
          score !== 0
        ) {
          usedImpactCriteria.add(
            impactCriterion as
              ImpactCriterionName,
          );
        }
      },
    );
  });

  return sriImpactCriterionNames.filter(
    (impactCriterion) =>
      usedImpactCriteria.has(
        impactCriterion,
      ),
  );
};