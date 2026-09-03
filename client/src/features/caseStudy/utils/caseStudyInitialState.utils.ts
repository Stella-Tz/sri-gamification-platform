// client/src/features/caseStudy/utils/caseStudyInitialState.utils.ts

import type {
  DomainPresence,
  ServiceAnswer,
  TechnicalDomainName,
} from "../types/caseStudy.types";

export const createEmptyDomainPresence = (
  domains: TechnicalDomainName[],
): Record<
  TechnicalDomainName,
  DomainPresence | ""
> => {
  return domains.reduce(
    (
      accumulator,
      domain,
    ) => {
      accumulator[domain] = "";

      return accumulator;
    },
    {} as Record<
      TechnicalDomainName,
      DomainPresence | ""
    >,
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