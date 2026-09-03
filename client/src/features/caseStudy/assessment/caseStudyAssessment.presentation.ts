import type {
  CaseStudyAssessmentServiceData,
} from "./caseStudyAssessment.types";

import type {
  TechnicalDomainName,
} from "../types/caseStudy.types";

export type CaseStudyAssessmentService =
  Omit<
    CaseStudyAssessmentServiceData,
    "serviceId" | "domain"
  > & {
    id: string;

    domain:
      TechnicalDomainName;
  };

const technicalDomains:
  readonly TechnicalDomainName[] = [
    "Heating",
    "Cooling",
    "Domestic hot water",
    "Ventilation",
    "Lighting",
    "Dynamic building envelope",
    "Electricity",
    "Electric vehicle charging",
    "Monitoring and control",
  ];

const isTechnicalDomainName = (
  value: string,
): value is TechnicalDomainName => {
  return technicalDomains.includes(
    value as TechnicalDomainName,
  );
};

export const toCaseStudyAssessmentService = (
  service:
    CaseStudyAssessmentServiceData,
): CaseStudyAssessmentService => {
  if (
    !isTechnicalDomainName(
      service.domain,
    )
  ) {
    throw new Error(
      `Unsupported SRI technical domain "${service.domain}".`,
    );
  }

  return {
    ...service,

    id:
      service.serviceId,

    domain:
      service.domain,
  };
};

export const groupCaseStudyAssessmentServicesByDomain =
  (
    services:
      readonly CaseStudyAssessmentService[],
  ): Record<
    TechnicalDomainName,
    CaseStudyAssessmentService[]
  > => {
    const grouped:
      Record<
        TechnicalDomainName,
        CaseStudyAssessmentService[]
      > = {
        Heating: [],
        Cooling: [],
        "Domestic hot water": [],
        Ventilation: [],
        Lighting: [],
        "Dynamic building envelope": [],
        Electricity: [],
        "Electric vehicle charging": [],
        "Monitoring and control": [],
      };

    services.forEach(
      (service) => {
        grouped[
          service.domain
        ].push(
          service,
        );
      },
    );

    return grouped;
  };