// client/src/features/caseStudy/utils/domainPresence.utils.ts

import type {
  DomainPresence,
  TechnicalDomainName,
} from "../types/caseStudy.types";

const getDomainsByPresence = (
  domainPresence: Record<TechnicalDomainName, DomainPresence | "">,
  targetPresence: DomainPresence,
): TechnicalDomainName[] => {
  return Object.entries(domainPresence)
    .filter(([, value]) => value === targetPresence)
    .map(([domain]) => domain as TechnicalDomainName);
};

export const getPresentDomains = (
  domainPresence: Record<TechnicalDomainName, DomainPresence | "">,
): TechnicalDomainName[] => {
  return getDomainsByPresence(domainPresence, "present");
};

export const getAbsentMandatoryDomains = (
  domainPresence: Record<TechnicalDomainName, DomainPresence | "">,
): TechnicalDomainName[] => {
  return getDomainsByPresence(domainPresence, "absent-mandatory");
};

export const getAbsentNotMandatoryDomains = (
  domainPresence: Record<TechnicalDomainName, DomainPresence | "">,
): TechnicalDomainName[] => {
  return getDomainsByPresence(domainPresence, "absent-not-mandatory");
};

export const isDomainPresent = (
  domainPresence: Record<TechnicalDomainName, DomainPresence | "">,
  domain: TechnicalDomainName,
): boolean => {
  return domainPresence[domain] === "present";
};

export const isDomainMandatoryButMissing = (
  domainPresence: Record<TechnicalDomainName, DomainPresence | "">,
  domain: TechnicalDomainName,
): boolean => {
  return domainPresence[domain] === "absent-mandatory";
};