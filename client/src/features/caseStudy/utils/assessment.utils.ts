// client/src/features/caseStudy/utils/assessment.utils.ts

import type {
  CaseStudySelectedService,
  ExpectedServiceAnswer,
  ServiceAnswer,
  SriService,
} from "../types/caseStudy.types";

import { createDefaultServiceAnswer } from "./caseStudyInitialState.utils";

export const getSelectedService = (
  services: SriService[],
  selectedServiceId: string,
): SriService | null => {
  return (
    services.find(
      (service) =>
        service.id === selectedServiceId,
    ) ?? null
  );
};

export const getServiceAnswer = (
  service: SriService,
  answers: Record<string, ServiceAnswer>,
): ServiceAnswer => {
  return (
    answers[service.id] ??
    createDefaultServiceAnswer(service.id)
  );
};

export const isServiceCompleted = (
  service: SriService,
  answers: Record<string, ServiceAnswer>,
): boolean => {
  const answer = answers[service.id];

  if (!answer) {
    return false;
  }

  if (!answer.selectedLevelId) {
    return false;
  }

  if (
    !Number.isInteger(answer.share) ||
    answer.share < 0 ||
    answer.share > 100
  ) {
    return false;
  }

  if (
    answer.share < 100 &&
    !answer.additionalLevelId
  ) {
    return false;
  }

  if (
    answer.share === 100 &&
    answer.additionalLevelId
  ) {
    return false;
  }

  return true;
};

export const mapSelectedServicesToCatalogue = (
  selectedServices: CaseStudySelectedService[],
  catalogue: SriService[],
): SriService[] => {
  return selectedServices.map(
    (selectedService) => {
      const service = catalogue.find(
        (catalogueService) =>
          catalogueService.id ===
          selectedService.serviceId,
      );

      if (!service) {
        throw new Error(
          `Service "${selectedService.serviceId}" ` +
            `was not found in the selected SRI catalogue.`,
        );
      }

      return service;
    },
  );
};

export const getExpectedAnswerForService = (
  selectedServices: CaseStudySelectedService[],
  serviceId: string,
): ExpectedServiceAnswer | null => {
  return (
    selectedServices.find(
      (selectedService) =>
        selectedService.serviceId ===
        serviceId,
    )?.expectedAnswer ?? null
  );
};