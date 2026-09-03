// client/src/features/caseStudy/setup/caseStudySetup.types.ts

import type {
  CaseStudyProgress,
} from "../progress/caseStudyProgress.types";

export type CaseStudySetupValidation = {
  isValid: boolean;

  errors:
    Record<string, string>;
};

export type CompleteCaseStudySetupResult = {
  validation:
    CaseStudySetupValidation;

  progress:
    CaseStudyProgress;
};