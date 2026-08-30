// client/src/features/caseStudy/utils/serviceCatalogue.utils.ts

import { getSriServicesForAssessmentMethod } from "../data/sriServiceCatalogue";

import { sriTechnicalDomainNames } from "../data/sriOfficialConstants";

import type {
  FunctionalityLevel,
  OfficialAssessmentMethod,
  SriService,
  TechnicalDomainName,
} from "../types/caseStudy.types";

/**
 * Returns the fully resolved official catalogue
 * for the selected assessment method.
 */
export const getServiceCatalogueByMethod = (
  assessmentMethod: OfficialAssessmentMethod,
): SriService[] => {
  return getSriServicesForAssessmentMethod(assessmentMethod);
};

/**
 * Returns the services of one technical domain
 * from an already resolved catalogue.
 */
export const getServicesForDomain = (
  services: SriService[],
  domain: TechnicalDomainName,
): SriService[] => {
  return services.filter(
    (service) => service.domain === domain,
  );
};

export const getVisibleServicesForDomain = (
  services: SriService[],
  domain: TechnicalDomainName,
  maxVisible = 5,
): SriService[] => {
  return getServicesForDomain(
    services,
    domain,
  ).slice(0, maxVisible);
};

/**
 * Finds a service inside the already resolved
 * Method A or Method B catalogue.
 */
export const getServiceById = (
  services: readonly SriService[],
  serviceId: string,
) => {
  return services.find(
    (service) =>
      service.id === serviceId,
  );
};

export const getServicesByIds = (
  services: SriService[],
  serviceIds: string[],
): SriService[] => {
  return serviceIds
    .map((serviceId) =>
      getServiceById(services, serviceId),
    )
    .filter(
      (service): service is SriService =>
        service != null,
    );
};

export const groupCatalogueServicesByDomain = (
  services: SriService[],
): Record<TechnicalDomainName, SriService[]> => {
  const servicesByDomain =
    sriTechnicalDomainNames.reduce(
      (accumulator, domain) => {
        accumulator[domain] = [];
        return accumulator;
      },
      {} as Record<
        TechnicalDomainName,
        SriService[]
      >,
    );

  services.forEach((service) => {
    servicesByDomain[service.domain].push(
      service,
    );
  });

  return servicesByDomain;
};

export const getMaximumFunctionalityLevel = (
  service: SriService,
): FunctionalityLevel => {
  const [firstLevel, ...remainingLevels] =
    service.functionalityLevels;

  if (!firstLevel) {
    throw new Error(
      `Service ${service.code} has no functionality levels.`,
    );
  }

  return remainingLevels.reduce(
    (maximum, level) =>
      level.level > maximum.level
        ? level
        : maximum,
    firstLevel,
  );
};

export const getFunctionalityLevelById = (
  service: SriService,
  levelId: string,
): FunctionalityLevel | null => {
  return (
    service.functionalityLevels.find(
      (level) => level.id === levelId,
    ) ?? null
  );
};

export const getFunctionalityLevelByNumber = (
  service: SriService,
  levelNumber: number,
): FunctionalityLevel | null => {
  return (
    service.functionalityLevels.find(
      (level) => level.level === levelNumber,
    ) ?? null
  );
};