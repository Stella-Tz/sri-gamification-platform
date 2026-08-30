// client/src/features/caseStudy/utils/caseStudyScenarioValidation.utils.ts

import type {
  CaseStudySelectedService,
  ServiceAnswer,
} from "../types/caseStudy.types";

const findExpectedAnswer = (
  answer: ServiceAnswer,
  selectedServices: CaseStudySelectedService[],
) => {
  return selectedServices.find(
    (service) =>
      service.serviceId === answer.serviceId,
  )?.expectedAnswer;
};

export const validateAssessmentServiceAnswer = (
  answer: ServiceAnswer,
  selectedServices: CaseStudySelectedService[],
): Record<string, string> => {
  const errors: Record<string, string> = {};

  const expected = findExpectedAnswer(
    answer,
    selectedServices,
  );

  if (!expected) {
    throw new Error(
      `Expected answer was not found for service "${answer.serviceId}".`,
    );
  }

  if (!answer.selectedLevelId) {
    errors.selectedLevelId =
      "Please select the main functionality level before continuing.";

    return errors;
  }

  if (
    answer.selectedLevelId !==
    expected.selectedLevelId
  ) {
    errors.selectedLevelId =
      "This functionality level does not match the service capability described in the scenario.";

    return errors;
  }

  if (
    !Number.isFinite(answer.share) ||
    answer.share < 0 ||
    answer.share > 100
  ) {
    errors.share =
      "The share of the main functionality level must be between 0% and 100%.";

    return errors;
  }

  if (answer.share !== expected.share) {
    errors.share =
      "This functionality level share does not match the percentage of the building's net surface area described in the scenario.";

    return errors;
  }

  if (expected.share < 100) {
    if (!expected.additionalLevelId) {
      throw new Error(
        `Expected answer for service "${answer.serviceId}" ` +
          `requires an additional functionality level.`,
      );
    }

    if (!answer.additionalLevelId) {
      errors.additionalLevelId =
        "Please select the additional functionality level for the remaining net surface area.";

      return errors;
    }

    if (
      answer.additionalLevelId !==
      expected.additionalLevelId
    ) {
      errors.additionalLevelId =
        "This additional functionality level does not match the remaining net surface area described in the scenario.";

      return errors;
    }
  }

  if (
    expected.share === 100 &&
    answer.additionalLevelId
  ) {
    errors.additionalLevelId =
      "No additional functionality level is needed when the main functionality level applies to 100% of the building's net surface area.";

    return errors;
  }

  return errors;
};

export const isAssessmentServiceAnswerCorrect = (
  answer: ServiceAnswer,
  selectedServices: CaseStudySelectedService[],
): boolean => {
  return (
    Object.keys(
      validateAssessmentServiceAnswer(
        answer,
        selectedServices,
      ),
    ).length === 0
  );
};