// client/src/features/course/data/questions/section07.questions.ts

import type { CourseQuestion } from "../../course.types";

/*
 * Section 7 — Lighting
 *
 * Questions focus on the concepts required to understand
 * the Lighting domain and recognise its smart-ready services
 * and functionality levels in a later SRI assessment.
 *
 * The quizzes do not require memorisation of service codes.
 * Service codes may appear as supporting context together
 * with the corresponding service title or concept.
 *
 * Questions focus primarily on:
 *
 * - the scope of the Lighting domain,
 * - catalogue membership of the two Lighting services,
 * - the distinction between occupancy-based and daylight-based control,
 * - functionality-level progression,
 * - and recognition of functionality levels from control behaviour.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Lighting Final Test uses the complete
 * question pool exported at the bottom of this file.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Lighting Overview                                               */
/* -------------------------------------------------------------------------- */

export const lightingOverviewQuestions = [
  {
    id: "lighting-question-01",
    sectionId: "lighting-domain",
    lessonId: "lighting-overview",

    prompt:
      "Which control functions are covered by the SRI Lighting domain?",

    options: [
      {
        id: "option-a",
        text:
          "Only occupancy control for indoor lighting.",
      },
      {
        id: "option-b",
        text:
          "Only control of artificial-lighting power based on daylight levels.",
      },
      {
        id: "option-c",
        text:
          "Occupancy-based indoor-lighting control and daylight-based artificial-lighting control.",
      },
      {
        id: "option-d",
        text:
          "Only manual lighting control at central or room level.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "The Lighting domain covers occupancy control for indoor lighting and control of artificial-lighting power according to available daylight.",
  },

  {
    id: "lighting-question-02",
    sectionId: "lighting-domain",
    lessonId: "lighting-overview",

    prompt:
      "How are Occupancy Control for Indoor Lighting (L1a) and Control Artificial Lighting Power Based on Daylight Levels (L2) distributed between Catalogues A and B?",

    options: [
      {
        id: "option-a",
        text:
          "L1a is included only in Catalogue A, while L2 is included in both catalogues.",
      },
      {
        id: "option-b",
        text:
          "L1a is included in both Catalogues A and B, while L2 is included only in Catalogue B.",
      },
      {
        id: "option-c",
        text:
          "Both services are included only in Catalogue A.",
      },
      {
        id: "option-d",
        text:
          "Both services are included only in Catalogue B.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Occupancy Control for Indoor Lighting (L1a) is included in both Catalogues A and B. Control Artificial Lighting Power Based on Daylight Levels (L2) is included only in Catalogue B.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — Occupancy Control for Indoor Lighting                           */
/* -------------------------------------------------------------------------- */

export const occupancyControlForIndoorLightingQuestions = [
  {
    id: "lighting-question-03",
    sectionId: "lighting-domain",
    lessonId: "occupancy-control-for-indoor-lighting",

    prompt:
      "A lighting-control function aims to prevent unnecessary lighting use when a space is unoccupied. Which statement correctly identifies this function within the SRI Lighting domain?",

    options: [
      {
        id: "option-a",
        text:
          "It is Occupancy Control for Indoor Lighting (L1a), because the control responds to occupancy.",
      },
      {
        id: "option-b",
        text:
          "It is Occupancy Control for Indoor Lighting (L1a), because the control responds to available daylight.",
      },
      {
        id: "option-c",
        text:
          "It is Control Artificial Lighting Power Based on Daylight Levels (L2), because the control responds to occupancy.",
      },
      {
        id: "option-d",
        text:
          "It is Control Artificial Lighting Power Based on Daylight Levels (L2), because the control responds to available daylight.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Occupancy Control for Indoor Lighting (L1a) concerns room-level lighting control in relation to occupancy, with the aim of avoiding unnecessary lighting use when spaces are unoccupied.",
  },

  {
    id: "lighting-question-04",
    sectionId: "lighting-domain",
    lessonId:
      "occupancy-control-for-indoor-lighting",

    prompt:
      "For Occupancy Control for Indoor Lighting (L1a), a room still uses manual on/off switches, but the lighting system also includes an automatic switch-off function that operates at least once per day. Which functionality level matches this behaviour?",

    options: [
      {
        id: "option-a",
        text:
          "Level 0 — manual on/off switching only.",
      },
      {
        id: "option-b",
        text:
          "Level 1 — manual on/off switching with an additional automatic switch-off function.",
      },
      {
        id: "option-c",
        text:
          "Level 2 — automatic detection with automatic switch-on.",
      },
      {
        id: "option-d",
        text:
          "Level 3 — manual or partial automatic switch-on with occupancy-based dimming or automatic switch-off.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "L1a Level 1 retains manual room-level on/off switches and adds at least one automatic switch-off function that operates at least once per day.",
  },

  {
    id: "lighting-question-05",
    sectionId: "lighting-domain",
    lessonId:
      "occupancy-control-for-indoor-lighting",

    prompt:
      "For Occupancy Control for Indoor Lighting (L1a), what is the main distinction between functionality Levels 2 and 3?",

    options: [
      {
        id: "option-a",
        text:
          "Level 2 is based on daylight, while Level 3 is based on occupancy.",
      },
      {
        id: "option-b",
        text:
          "Level 2 uses only manual switching, while Level 3 introduces the first automatic switch-off function.",
      },
      {
        id: "option-c",
        text:
          "Level 2 controls the whole building centrally, while Level 3 provides control by room or zone.",
      },
      {
        id: "option-d",
        text:
          "Level 2 uses automatic switch-on, while Level 3 uses manual or partial automatic switch-on.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "At L1a Level 2, occupancy detection is combined with automatic switch-on. At Level 3, switch-on is manual or partially automatic, while occupancy information is used for dimming or automatic switch-off.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — Daylight-Based Lighting Control                                 */
/* -------------------------------------------------------------------------- */

export const daylightBasedLightingControlQuestions = [
  {
    id: "lighting-question-06",
    sectionId: "lighting-domain",
    lessonId: "daylight-based-lighting-control",

    prompt:
      "A room remains occupied throughout the day. As more daylight becomes available, the lighting-control system reduces the use of artificial lighting. Which statement correctly identifies this function within the SRI Lighting domain?",

    options: [
      {
        id: "option-a",
        text:
          "It is Occupancy Control for Indoor Lighting (L1a), because the control responds to occupancy.",
      },
      {
        id: "option-b",
        text:
          "It is Control Artificial Lighting Power Based on Daylight Levels (L2), because the control responds to available daylight.",
      },
      {
        id: "option-c",
        text:
          "It is Occupancy Control for Indoor Lighting (L1a), because the control responds to available daylight.",
      },
      {
        id: "option-d",
        text:
          "It is Control Artificial Lighting Power Based on Daylight Levels (L2), because the control responds to occupancy.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "L2 controls artificial-lighting power according to the daylight available in the space. L1a instead concerns lighting control in relation to occupancy.",
  },

  {
    id: "lighting-question-07",
    sectionId: "lighting-domain",
    lessonId: "daylight-based-lighting-control",

    prompt:
      "For daylight-based artificial-lighting control (L2), a building currently uses one central manual switch for all lighting. What is the next improvement in the functionality progression?",

    options: [
      {
        id: "option-a",
        text:
          "Automatic switching according to available daylight.",
      },
      {
        id: "option-b",
        text:
          "Automatic dimming according to available daylight.",
      },
      {
        id: "option-c",
        text:
          "Occupancy detection with automatic switch-on.",
      },
      {
        id: "option-d",
        text:
          "Separate manual control by room or zone.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "For daylight-based artificial-lighting control, the progression moves from one central manual control to separate manual control by room or zone. Automatic daylight-based switching and dimming appear at later functionality levels.",
  },

  {
    id: "lighting-question-08",
    sectionId: "lighting-domain",
    lessonId:
      "daylight-based-lighting-control",

    prompt:
      "For daylight-based artificial-lighting control (L2), a lighting system automatically switches luminaires off when daylight is sufficient to meet the minimum lighting requirements and switches them on when daylight is insufficient. Which functionality level matches this behaviour?",

    options: [
      {
        id: "option-a",
        text:
          "Level 1 — manual control per room or zone.",
      },
      {
        id: "option-b",
        text:
          "Level 2 — automatic switching.",
      },
      {
        id: "option-c",
        text:
          "Level 3 — automatic dimming.",
      },
      {
        id: "option-d",
        text:
          "Level 4 — automatic dimming with scene-based light control.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "At L2 Level 2, luminaires switch off automatically when sufficient daylight is available to meet the minimum lighting requirements and switch on when daylight is insufficient.",
  },

  {
    id: "lighting-question-09",
    sectionId: "lighting-domain",
    lessonId: "daylight-based-lighting-control",

    prompt:
      "For Control Artificial Lighting Power Based on Daylight Levels (L2), both Levels 2 and 3 respond automatically to changes in available daylight. What additional control behaviour distinguishes Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "Luminaire brightness can vary as daylight changes, rather than relying only on automatic on/off control.",
      },
      {
        id: "option-b",
        text:
          "Lighting is controlled manually through separate switches for each room or zone.",
      },
      {
        id: "option-c",
        text:
          "All building lighting is managed through one central manual control.",
      },
      {
        id: "option-d",
        text:
          "Lighting is controlled according to occupancy rather than available daylight.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "At L2 Level 2, artificial lighting is switched automatically according to whether daylight is sufficient. Level 3 adds automatic dimming, allowing luminaire brightness to vary as the amount of daylight changes.",
  },

  {
    id: "lighting-question-10",
    sectionId: "lighting-domain",
    lessonId:
      "daylight-based-lighting-control",

    prompt:
      "For daylight-based artificial-lighting control (L2), a lighting system already provides automatic dimming. Which additional capability characterises Level 4?",

    options: [
      {
        id: "option-a",
        text:
          "Scene-based control of illuminance, correlated colour temperature and light distribution.",
      },
      {
        id: "option-b",
        text:
          "A return to manual control through one central building switch.",
      },
      {
        id: "option-c",
        text:
          "Automatic switch-off based only on room occupancy.",
      },
      {
        id: "option-d",
        text:
          "Manual control available separately by room or zone.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "L2 Level 4 combines automatic dimming with scene-based light control. Dynamic and adapted lighting scenes can include changes in illuminance level, correlated colour temperature and light distribution according to design, human needs and visual tasks.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const lightingQuestionsByLesson = {
  "lighting-overview":
    lightingOverviewQuestions,

  "occupancy-control-for-indoor-lighting":
    occupancyControlForIndoorLightingQuestions,

  "daylight-based-lighting-control":
    daylightBasedLightingControlQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 7 question pool                                           */
/* -------------------------------------------------------------------------- */

export const lightingQuestionPool = [
  ...lightingOverviewQuestions,
  ...occupancyControlForIndoorLightingQuestions,
  ...daylightBasedLightingControlQuestions,
] satisfies readonly CourseQuestion[];