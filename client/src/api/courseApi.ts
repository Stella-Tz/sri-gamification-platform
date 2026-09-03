// client/src/api/courseApi.ts

import {
  apiClient,
} from "./apiClient";

import type {
  FinalTestAnswerResult,
  FinalTestAnswerSubmission,
  FinalTestState,
  LessonQuizAnswerResult,
  LessonQuizCompletionAnswer,
  LessonQuizData,
  UserCourseProgress,
} from "../features/course/course.types";


// -----------------------------------------------------------------------------
// API response wrappers
// -----------------------------------------------------------------------------

type ProgressResponse = {
  progress:
    UserCourseProgress;
};

type LessonQuizResponse = {
  quiz:
    LessonQuizData;
};

type LessonQuizAnswerResponse = {
  result:
    LessonQuizAnswerResult;
};

type FinalTestResponse = {
  attempt:
    FinalTestState;
};

type FinalTestAnswerResponse = {
  result:
    FinalTestAnswerResult;

  progress:
    | UserCourseProgress
    | null;
};

// -----------------------------------------------------------------------------
// Course API
// -----------------------------------------------------------------------------

export const courseApi = {
  async getProgress():
    Promise<UserCourseProgress> {
    const response =
      await apiClient<
        ProgressResponse
      >(
        "/course/progress",
      );

    return response.progress;
  },

  async completeLesson(
    lessonStepId: string,
  ): Promise<UserCourseProgress> {
    const response =
      await apiClient<
        ProgressResponse
      >(
        `/course/lessons/${lessonStepId}/complete`,
        {
          method:
            "POST",
        },
      );

    return response.progress;
  },

  async getLessonQuiz(
    quizStepId: string,
  ): Promise<LessonQuizData> {
    const response =
      await apiClient<
        LessonQuizResponse
      >(
        `/course/quizzes/${quizStepId}`,
      );

    return response.quiz;
  },

  async validateLessonQuizAnswer(
    input: {
      quizStepId: string;
      questionId: string;
      selectedOptionId: string;
    },
  ): Promise<
    LessonQuizAnswerResult
  > {
    const response =
      await apiClient<
        LessonQuizAnswerResponse
      >(
        `/course/quizzes/${input.quizStepId}/answer`,
        {
          method:
            "POST",

          body:
            JSON.stringify({
              questionId:
                input.questionId,

              selectedOptionId:
                input.selectedOptionId,
            }),
        },
      );

    return response.result;
  },

  async completeLessonQuiz(
    input: {
      quizStepId: string;

      answers:
        LessonQuizCompletionAnswer[];
    },
  ): Promise<UserCourseProgress> {
    const response =
      await apiClient<
        ProgressResponse
      >(
        `/course/quizzes/${input.quizStepId}/complete`,
        {
          method:
            "POST",

          body:
            JSON.stringify({
              answers:
                input.answers,
            }),
        },
      );

    return response.progress;
  },

  async startFinalTest(
    finalTestStepId: string,
  ): Promise<FinalTestState> {
    const response =
      await apiClient<
        FinalTestResponse
      >(
        `/course/final-tests/${finalTestStepId}/start`,
        {
          method:
            "POST",
        },
      );

    return response.attempt;
  },

  async getFinalTestAttempt(
    attemptId: string,
  ): Promise<FinalTestState> {
    const response =
      await apiClient<
        FinalTestResponse
      >(
        `/course/final-tests/attempts/${attemptId}`,
      );

    return response.attempt;
  },

  async submitFinalTestAnswer(
    input: {
      attemptId: string;
      questionId: string;
      selectedOptionId: string;
    },
  ): Promise<
    FinalTestAnswerSubmission
  > {
    return apiClient<
      FinalTestAnswerResponse
    >(
      `/course/final-tests/attempts/${input.attemptId}/answer`,
      {
        method:
          "POST",

        body:
          JSON.stringify({
            questionId:
              input.questionId,

            selectedOptionId:
              input.selectedOptionId,
          }),
      },
    );
  },

  async resetProgress():
    Promise<UserCourseProgress> {
    const response =
      await apiClient<
        ProgressResponse
      >(
        "/course/progress/reset",
        {
          method:
            "POST",
        },
      );

    return response.progress;
  },
};
