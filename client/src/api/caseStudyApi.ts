import {
  apiClient,
} from "./apiClient";

import type {
  CaseStudyDefinition,
  ServiceAnswer,
  SetupAnswers,
} from "../features/caseStudy/types/caseStudy.types";

import type {
  CaseStudyResultsPublicResult,
} from "../features/caseStudy/results/caseStudyResults.types";

import type {
  CaseStudyProgress,
} from "../features/caseStudy/progress/caseStudyProgress.types";

import type {
  CaseStudyAssessmentData,
} from "../features/caseStudy/assessment/caseStudyAssessment.types";

import type {
  CompleteCaseStudySetupResult,
} from "../features/caseStudy/setup/caseStudySetup.types";

// -----------------------------------------------------------------------------
// Setup API types
// -----------------------------------------------------------------------------

type CaseStudySetupApiAnswers = {
  buildingInformation: {
    buildingType: string;
    buildingUsage: string;
    country: string;
    climateZone: string;
    floorArea: string;
    constructionYear: string;
    buildingState: string;
    renovationYear: string;
  };

  methodologySelection: {
    assessmentMethod: string;
  };

  domainPresence:
    Record<string, string>;
};


type CaseStudyDefinitionResponse = {
  definition:
    CaseStudyDefinition;
};

type CaseStudyProgressResponse = {
  progress:
    CaseStudyProgress;
};

type SaveSetupResponse = {
  progress:
    CaseStudyProgress;
};


// -----------------------------------------------------------------------------
// Assessment API types
// -----------------------------------------------------------------------------




type GetAssessmentResponse = {
  assessment:
    CaseStudyAssessmentData;
};

type AssessmentValidationResult = {
  isValid: boolean;

  errors:
    Record<string, string>;
};

type ValidateAssessmentAnswerResponse = {
  validation:
    AssessmentValidationResult;

  validatedServiceIds:
    string[];

  nextServiceId:
    | string
    | null;

  allServicesValidated:
    boolean;
};

type SetActiveAssessmentServiceResponse = {
  selectedServiceId:
    string;
};

type SaveAssessmentAnswerResponse = {
  serviceId: string;
  validated: boolean;
};

type SubmitAssessmentResponse = {
  result:
    CaseStudyResultsPublicResult;

  progress:
    CaseStudyProgress;
};

// -----------------------------------------------------------------------------
// Mapping
// -----------------------------------------------------------------------------

const toSetupApiAnswers = (
  answers:
    SetupAnswers,
): CaseStudySetupApiAnswers => {
  return {
    buildingInformation: {
      buildingType:
        answers
          .buildingInformation
          .buildingType,

      buildingUsage:
        answers
          .buildingInformation
          .buildingUsage,

      country:
        answers
          .buildingInformation
          .country,

      climateZone:
        answers
          .buildingInformation
          .climateZone ??
        "",

      floorArea:
        answers
          .buildingInformation
          .floorArea,

      constructionYear:
        answers
          .buildingInformation
          .constructionYear,

      buildingState:
        answers
          .buildingInformation
          .buildingState,

      renovationYear:
        answers
          .buildingInformation
          .renovationYear,
    },

    methodologySelection: {
      assessmentMethod:
        answers
          .methodologySelection
          .assessmentMethod,
    },

    domainPresence: {
      ...answers
        .domainPresence,
    } as Record<
      string,
      string
    >,
  };
};

const toAssessmentApiAnswer = (
  answer:
    ServiceAnswer,
) => {
  return {
    selectedLevelId:
      answer.selectedLevelId,

    share:
      answer.share,

    ...(
      answer
        .additionalLevelId
        ? {
            additionalLevelId:
              answer
                .additionalLevelId,
          }
        : {}
    ),
  };
};

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export const caseStudyApi = {

  // ---------------------------------------------------------------------------
  // Definition
  // ---------------------------------------------------------------------------

  async getDefinition():
    Promise<
      CaseStudyDefinition
    > {
    const response =
      await apiClient<
        CaseStudyDefinitionResponse
      >(
        "/case-study/definition",
      );

    return response.definition;
  },


  // ---------------------------------------------------------------------------
  // Progress / Setup
  // ---------------------------------------------------------------------------

  async getProgress():
    Promise<
      CaseStudyProgress
    > {
    const response =
      await apiClient<
        CaseStudyProgressResponse
      >(
        "/case-study/progress",
      );

    return response.progress;
  },

  async saveSetupDraft(
    answers:
      SetupAnswers,
  ): Promise<
    CaseStudyProgress
  > {
    const response =
      await apiClient<
        SaveSetupResponse
      >(
        "/case-study/setup",
        {
          method:
            "PUT",

          body:
            JSON.stringify({
              answers:
                toSetupApiAnswers(
                  answers,
                ),
            }),
        },
      );

    return response.progress;
  },

  async completeSetup(
    answers:
      SetupAnswers,
  ): Promise<
    CompleteCaseStudySetupResult
  > {
    return apiClient<
      CompleteCaseStudySetupResult
    >(
      "/case-study/setup/complete",
      {
        method:
          "POST",

        body:
          JSON.stringify({
            answers:
              toSetupApiAnswers(
                answers,
              ),
          }),
      },
    );
  },

  // ---------------------------------------------------------------------------
  // Assessment
  // ---------------------------------------------------------------------------

  async getAssessment():
    Promise<
      CaseStudyAssessmentData
    > {
    const response =
      await apiClient<
        GetAssessmentResponse
      >(
        "/case-study/assessment",
      );

    return response.assessment;
  },

  async setActiveAssessmentService(
    serviceId: string,
  ): Promise<
    SetActiveAssessmentServiceResponse
  > {
    return apiClient<
      SetActiveAssessmentServiceResponse
    >(
      "/case-study/assessment/active-service",
      {
        method:
          "PUT",

        body:
          JSON.stringify({
            serviceId,
          }),
      },
    );
  },

  async saveAssessmentAnswer(
    answer:
      ServiceAnswer,
  ): Promise<
    SaveAssessmentAnswerResponse
  > {
    return apiClient<
      SaveAssessmentAnswerResponse
    >(
      `/case-study/assessment/answers/${encodeURIComponent(
        answer.serviceId,
      )}`,
      {
        method:
          "PUT",

        body:
          JSON.stringify({
            answer:
              toAssessmentApiAnswer(
                answer,
              ),
          }),
      },
    );
  },

  async validateAssessmentAnswer(
    answer:
      ServiceAnswer,
  ): Promise<
    ValidateAssessmentAnswerResponse
  > {
    return apiClient<
      ValidateAssessmentAnswerResponse
    >(
      `/case-study/assessment/answers/${encodeURIComponent(
        answer.serviceId,
      )}/validate`,
      {
        method:
          "POST",

        body:
          JSON.stringify({
            answer:
              toAssessmentApiAnswer(
                answer,
              ),
          }),
      },
    );
  },

  async submitAssessment():
    Promise<
      SubmitAssessmentResponse
    > {
    return apiClient<
      SubmitAssessmentResponse
    >(
      "/case-study/assessment/submit",
      {
        method:
          "POST",
      },
    );
  },

  async startPracticeAgain():
    Promise<
      CaseStudyProgress
    > {
    const response =
      await apiClient<{
        progress:
          CaseStudyProgress;
      }>(
        "/case-study/practice-again",
        {
          method:
            "POST",
        },
      );

    return response.progress;
  },
};

