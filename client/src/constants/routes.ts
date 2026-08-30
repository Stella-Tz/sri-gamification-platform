// client/src/constants/routes.ts

export const ROUTES = {
  landing: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  courses: "/courses",
  caseStudy: "/case-study",
  theory: "/theory",
  glossary: "/glossary",
} as const;

/*
 * Theory Library routes
 *
 * These routes provide free navigation through
 * the reference library and use TheoryLessonPage.
 */
export const THEORY_ROUTES = {
  home: "/theory",

  lessonPath:
    "/theory/sections/:sectionId/lessons/:lessonId",

  lesson: (
    sectionId: string,
    lessonId: string,
  ) =>
    `/theory/sections/${sectionId}/lessons/${lessonId}`,
} as const;

/*
 * Guided Course routes
 *
 * These routes are completely separate from the
 * Theory Library and use the Course pages.
 */
export const COURSE_ROUTES = {
  home: "/courses",

  lessonPath:
    "/courses/:sectionId/lessons/:lessonId",

  quizPath:
    "/courses/:sectionId/quizzes/:quizId",

  finalTestPath:
    "/courses/:sectionId/final-test/:finalTestId",

  lesson: (
    sectionId: string,
    lessonId: string,
  ) =>
    `/courses/${sectionId}/lessons/${lessonId}`,

  quiz: (
    sectionId: string,
    quizId: string,
  ) =>
    `/courses/${sectionId}/quizzes/${quizId}`,

  finalTest: (
    sectionId: string,
    finalTestId: string,
  ) =>
    `/courses/${sectionId}/final-test/${finalTestId}`,
} as const;

export const CASE_STUDY_ROUTES = {
  home: "/case-study",

  setup: "/case-study/setup",

  assessment:
    "/case-study/assessment",

  results:
    "/case-study/results",

  guidedImprovementAnalysis:
    "/case-study/guided-improvement-analysis",

  simulationResults:
    "/case-study/simulation-results",
} as const;