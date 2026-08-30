// client/src/features/caseStudy/utils/caseStudyInitialState.utils.ts

import type {
  DomainPresence,
  ServiceAnswer,
  SriService,
  TechnicalDomainName,
} from "../types/caseStudy.types";

export const createEmptyDomainPresence = (
  domains: TechnicalDomainName[],
): Record<TechnicalDomainName, DomainPresence | ""> => {
  return domains.reduce(
    (accumulator, domain) => {
      accumulator[domain] = "";
      return accumulator;
    },
    {} as Record<TechnicalDomainName, DomainPresence | "">,
  );
};

export const createDefaultServiceAnswer = (
  serviceId: string,
): ServiceAnswer => {
  return {
    serviceId,
    selectedLevelId: "",
    share: 100,
  };
};

export const createDefaultServiceAnswers = (
  services: SriService[],
): Record<string, ServiceAnswer> => {
  return services.reduce<Record<string, ServiceAnswer>>(
    (accumulator, service) => {
      accumulator[service.id] = createDefaultServiceAnswer(service.id);
      return accumulator;
    },
    {},
  );
};