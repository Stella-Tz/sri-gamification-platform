// client/src/features/caseStudy/utils/setupValidation.utils.ts

import type {
  ExpectedSetupAnswers,
  SetupAnswers,
  TechnicalDomainName,
  ValidationResult,
} from "../types/caseStudy.types";

const addError = (
  errors: Record<string, string>,
  key: string,
  message: string,
) => {
  errors[key] = message;
};

const isValidYear = (value: string): boolean => {
  const numericValue = Number(value);

  return (
    Number.isInteger(numericValue) &&
    numericValue >= 1800 &&
    numericValue <= new Date().getFullYear()
  );
};

const isPositiveNumber = (value: string): boolean => {
  const numericValue = Number(value);

  return (
    Number.isFinite(numericValue) &&
    numericValue > 0
  );
};

const areNumbersEqual = (
  actual: string,
  expected: number,
): boolean => {
  return Number(actual) === expected;
};

export const validateRequiredSetupAnswers = (
  answers: SetupAnswers,
): ValidationResult => {
  const errors: Record<string, string> = {};

  const {
    buildingInformation,
    methodologySelection,
    domainPresence,
  } = answers;

  if (!buildingInformation.buildingType) {
    addError(
      errors,
      "buildingType",
      "Select the building type.",
    );
  }

  if (!buildingInformation.buildingUsage) {
    addError(
      errors,
      "buildingUsage",
      "Select the building usage.",
    );
  }

  if (!buildingInformation.country) {
    addError(
      errors,
      "country",
      "Select the building location.",
    );
  }

  if (!buildingInformation.climateZone) {
    addError(
      errors,
      "climateZone",
      "Climate zone could not be derived.",
    );
  }

  if (!buildingInformation.constructionYear.trim()) {
    addError(
      errors,
      "constructionYear",
      "Enter the year of construction.",
    );
  } else if (
    !isValidYear(
      buildingInformation.constructionYear,
    )
  ) {
    addError(
      errors,
      "constructionYear",
      "Enter a valid year of construction.",
    );
  }

  if (!buildingInformation.buildingState) {
    addError(
      errors,
      "buildingState",
      "Select the building state.",
    );
  }

  if (
    buildingInformation.buildingState ===
    "renovated"
  ) {
    if (
      !buildingInformation.renovationYear.trim()
    ) {
      addError(
        errors,
        "renovationYear",
        "Enter the renovation year.",
      );
    } else if (
      !isValidYear(
        buildingInformation.renovationYear,
      )
    ) {
      addError(
        errors,
        "renovationYear",
        "Enter a valid renovation year.",
      );
    } else if (
      isValidYear(
        buildingInformation.constructionYear,
      ) &&
      Number(
        buildingInformation.renovationYear,
      ) <
        Number(
          buildingInformation.constructionYear,
        )
    ) {
      addError(
        errors,
        "renovationYear",
        "Renovation year cannot be earlier than construction year.",
      );
    }
  }

  if (!buildingInformation.floorArea.trim()) {
    addError(
      errors,
      "floorArea",
      "Enter the total useful floor area.",
    );
  } else if (
    !isPositiveNumber(
      buildingInformation.floorArea,
    )
  ) {
    addError(
      errors,
      "floorArea",
      "Floor area must be a positive number.",
    );
  }

  if (
    !methodologySelection.assessmentMethod
  ) {
    addError(
      errors,
      "assessmentMethod",
      "Select the assessment method.",
    );
  }

  Object.entries(domainPresence).forEach(
    ([domain, value]) => {
      if (!value) {
        addError(
          errors,
          `domainPresence.${domain}`,
          "Select the domain presence status.",
        );
      }
    },
  );

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSetupAgainstScenario = (
  answers: SetupAnswers,
  expected: ExpectedSetupAnswers,
): ValidationResult => {
  const errors: Record<string, string> = {};

  const actualBuilding =
    answers.buildingInformation;

  if (
    expected.buildingType &&
    actualBuilding.buildingType &&
    actualBuilding.buildingType !==
      expected.buildingType
  ) {
    addError(
      errors,
      "buildingType",
      "This does not match the scenario.",
    );
  }

  if (
    expected.buildingUsage &&
    actualBuilding.buildingUsage &&
    actualBuilding.buildingUsage !==
      expected.buildingUsage
  ) {
    addError(
      errors,
      "buildingUsage",
      "This does not match the scenario.",
    );
  }

  if (
    expected.country &&
    actualBuilding.country &&
    actualBuilding.country !==
      expected.country
  ) {
    addError(
      errors,
      "country",
      "This does not match the scenario.",
    );
  }

  if (
    expected.constructionYear &&
    actualBuilding.constructionYear &&
    actualBuilding.constructionYear !==
      expected.constructionYear
  ) {
    addError(
      errors,
      "constructionYear",
      "This does not match the scenario.",
    );
  }

  if (
    expected.buildingState &&
    actualBuilding.buildingState &&
    actualBuilding.buildingState !==
      expected.buildingState
  ) {
    addError(
      errors,
      "buildingState",
      "This does not match the scenario.",
    );
  }

  if (
    expected.renovationYear &&
    actualBuilding.renovationYear &&
    actualBuilding.renovationYear !==
      expected.renovationYear
  ) {
    addError(
      errors,
      "renovationYear",
      "This does not match the scenario.",
    );
  }

  if (
    typeof expected.floorArea === "number" &&
    actualBuilding.floorArea &&
    !areNumbersEqual(
      actualBuilding.floorArea,
      expected.floorArea,
    )
  ) {
    addError(
      errors,
      "floorArea",
      "This does not match the scenario.",
    );
  }

  if (
    expected.assessmentMethod &&
    answers.methodologySelection
      .assessmentMethod &&
    answers.methodologySelection
      .assessmentMethod !==
      expected.assessmentMethod
  ) {
    addError(
      errors,
      "assessmentMethod",
      "This does not match the scenario.",
    );
  }

  Object.entries(
    expected.domainPresence ?? {},
  ).forEach(([domain, expectedValue]) => {
    const typedDomain =
      domain as TechnicalDomainName;

    const actualValue =
      answers.domainPresence[typedDomain];

    if (
      actualValue &&
      actualValue !== expectedValue
    ) {
      addError(
        errors,
        `domainPresence.${domain}`,
        "This does not match the building systems described in the scenario.",
      );
    }
  });

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSetupAnswers = (
  answers: SetupAnswers,
  expected: ExpectedSetupAnswers,
): ValidationResult => {
  const requiredValidation =
    validateRequiredSetupAnswers(answers);

  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  return validateSetupAgainstScenario(
    answers,
    expected,
  );
};