// client/src/features/course/data/questions/section01.questions.ts

import type {
  CourseQuestion,
} from "../../course.types";

/*
 * Section 1 — Introduction to SRI
 *
 * Questions focus on the core concepts needed before the learner
 * enters the SRI assessment framework:
 *
 * - why the SRI exists and what it communicates,
 * - what capabilities it assesses,
 * - how it differs from an energy-performance assessment,
 * - the distinction between smart readiness and smartness,
 * - and the three key functionalities of smart readiness.
 *
 * Distractors use concepts that already exist in the SRI theory
 * rather than invented terminology. Correct-answer positions are
 * intentionally non-patterned, and answer length is not used as
 * a design cue.
 *
 * The lesson quizzes use the questions associated with the
 * corresponding lesson. The Section 1 Final Test uses the
 * complete question pool exported at the bottom of this file.
 */

export const whatIsSriQuestions = [
  {
    id: "introduction-sri-question-01",
    sectionId: "introduction-to-sri",
    lessonId:
      "what-is-the-smart-readiness-indicator",

    prompt:
      "Why were a common definition of the Smart Readiness Indicator and a common calculation methodology established?",

    options: [
      {
        id: "option-a",
        text:
          "To determine the energy-performance class used in an energy-performance certificate.",
      },
      {
        id: "option-b",
        text:
          "To support consistent, transparent and comparable ratings of smart readiness across the European Union.",
      },
      {
        id: "option-c",
        text:
          "To prescribe the same smart-ready technologies for all buildings assessed under the scheme.",
      },
      {
        id: "option-d",
        text:
          "To replace the assessment of smart-ready services with measured in-use building performance.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "A common SRI definition and calculation methodology were established to support consistent, transparent and comparable ratings of smart readiness across the European Union.",
  },

  {
    id: "introduction-sri-question-02",
    sectionId: "introduction-to-sri",
    lessonId:
      "what-is-the-smart-readiness-indicator",

    prompt:
      "At the most general level, what is the Smart Readiness Indicator intended to rate and communicate?",

    options: [
      {
        id: "option-a",
        text:
          "The energy-performance class of a building or building unit.",
      },
      {
        id: "option-b",
        text:
          "The measured in-use performance of each technical building system.",
      },
      {
        id: "option-c",
        text:
          "The total number of smart-ready services listed in the selected catalogue.",
      },
      {
        id: "option-d",
        text:
          "The smart readiness of a building or building unit.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "The SRI is used within an optional common European Union scheme to rate and communicate the smart readiness of a building or building unit.",
  },

  {
    id: "introduction-sri-question-03",
    sectionId: "introduction-to-sri",
    lessonId:
      "what-is-the-smart-readiness-indicator",

    prompt:
      "Which statement best describes the building capabilities examined by the SRI assessment?",

    options: [
      {
        id: "option-a",
        text:
          "The capabilities to adapt operation to the needs of occupants and the grid and to improve energy efficiency and overall in-use performance.",
      },
      {
        id: "option-b",
        text:
          "The capability to maintain energy-efficiency performance and operation by adapting energy consumption.",
      },
      {
        id: "option-c",
        text:
          "The capability to adapt building operation to occupants' needs while supporting user-friendliness and healthy indoor conditions.",
      },
      {
        id: "option-d",
        text:
          "The capability to adapt the building's overall electricity demand to enable demand response in relation to the grid.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "The SRI assessment examines the broader capability of the building or building unit to adapt its operation to the needs of occupants and the grid and to improve its energy efficiency and overall in-use performance. The other options describe individual key functionalities rather than the overall assessment scope.",
  },

  {
    id: "introduction-sri-question-04",
    sectionId: "introduction-to-sri",
    lessonId:
      "what-is-the-smart-readiness-indicator",

    prompt:
      "How does the SRI relate to the assessment of a building's energy performance?",

    options: [
      {
        id: "option-a",
        text:
          "It provides the same information as an energy-performance certificate, but expresses it through smart readiness classes.",
      },
      {
        id: "option-b",
        text:
          "It determines energy performance from the functionality levels of smart-ready services instead of using an energy-performance assessment.",
      },
      {
        id: "option-c",
        text:
          "It complements energy-performance assessment but does not replace it.",
      },
      {
        id: "option-d",
        text:
          "It measures actual in-use energy performance, while an energy-performance certificate assesses smart readiness.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Smart readiness and energy performance are distinct aspects of a building. The SRI focuses on smart capabilities and complements, rather than replaces, energy-performance certificates and related assessment tools.",
  },
] satisfies readonly CourseQuestion[];

export const smartReadinessInBuildingsQuestions = [
  {
    id: "introduction-sri-question-05",
    sectionId: "introduction-to-sri",
    lessonId:
      "smart-readiness-in-buildings",

    prompt:
      "Which statement correctly distinguishes smart readiness from building smartness?",

    options: [
      {
        id: "option-a",
        text:
          "Smart readiness involves sensing, interpreting, communicating and actively responding to changing conditions, while smartness is the capability to implement smart functions and services.",
      },
      {
        id: "option-b",
        text:
          "Smart readiness and smartness both require the available smart-ready services to be actively operating during the assessment.",
      },
      {
        id: "option-c",
        text:
          "Smart readiness is the capability to implement smart functions and services, while smartness involves sensing, interpreting, communicating and actively responding to changing conditions.",
      },
      {
        id: "option-d",
        text:
          "Smart readiness describes a service's functionality level, while smartness describes the impact scores assigned to that functionality level.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Readiness refers to the capability of a technology, system or building to implement smart functions and services. Smartness is demonstrated when the building or its systems can sense, interpret, communicate and actively respond efficiently to changing conditions.",
  },

  {
    id: "introduction-sri-question-06",
    sectionId: "introduction-to-sri",
    lessonId:
      "smart-readiness-in-buildings",

    prompt:
      "Which list contains the three key functionalities used by the SRI methodology implemented in this course?",

    options: [
      {
        id: "option-a",
        text:
          "Energy performance and operation; Response to user needs; Energy flexibility.",
      },
      {
        id: "option-b",
        text:
          "Heating; Cooling; Monitoring and control.",
      },
      {
        id: "option-c",
        text:
          "Comfort; Convenience; Information to occupants.",
      },
      {
        id: "option-d",
        text:
          "Energy efficiency; Maintenance and fault prediction; Energy flexibility and storage.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "The detailed SRI methodology used in this course organises smart readiness around Energy performance and operation, Response to user needs, and Energy flexibility. The other options contain impact criteria or technical domains.",
  },

  {
    id: "introduction-sri-question-07",
    sectionId: "introduction-to-sri",
    lessonId:
      "smart-readiness-in-buildings",

    prompt:
      "What does the key functionality “Energy performance and operation” primarily concern?",

    options: [
      {
        id: "option-a",
        text:
          "Adapting building operation to occupants' needs while considering user-friendliness, healthy indoor conditions and information provision.",
      },
      {
        id: "option-b",
        text:
          "Adapting the building's overall electricity demand to enable participation in demand response in relation to the grid.",
      },
      {
        id: "option-c",
        text:
          "The provision of information about the building's operation to occupants.",
      },
      {
        id: "option-d",
        text:
          "Maintaining the building's energy-efficiency performance and operation by adapting its energy consumption.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "Energy performance and operation concerns the ability to maintain the building's energy-efficiency performance and operation by adapting its energy consumption, for example to make use of energy from renewable sources.",
  },

  {
    id: "introduction-sri-question-08",
    sectionId: "introduction-to-sri",
    lessonId:
      "smart-readiness-in-buildings",

    prompt:
      "What does the key functionality “Response to user needs” concern?",

    options: [
      {
        id: "option-a",
        text:
          "Maintaining energy-efficiency performance and operation by adapting the building's energy consumption.",
      },
      {
        id: "option-b",
        text:
          "Adapting building operation to occupants' needs while considering user-friendliness, healthy indoor conditions and information provision.",
      },
      {
        id: "option-c",
        text:
          "Adapting the building's overall electricity demand to enable participation in demand response in relation to the grid.",
      },
      {
        id: "option-d",
        text:
          "Organising smart-ready services into technical domains and assigning functionality levels to the services being assessed.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Response to user needs concerns adapting building operation to occupants' needs while considering user-friendliness, maintaining healthy indoor climate conditions and providing information about energy use.",
  },

  {
    id: "introduction-sri-question-09",
    sectionId: "introduction-to-sri",
    lessonId:
      "smart-readiness-in-buildings",

    prompt:
      "What does the key functionality “Energy flexibility” concern?",

    options: [
      {
        id: "option-a",
        text:
          "Maintaining energy-efficiency performance and operation by adapting the building's energy consumption.",
      },
      {
        id: "option-b",
        text:
          "The provision of information about the building's operation to occupants.",
      },
      {
        id: "option-c",
        text:
          "The flexibility of the building's overall electricity demand, including its ability to participate in demand response in relation to the grid.",
      },
      {
        id: "option-d",
        text:
          "Adapting building operation to occupants' needs while considering user-friendliness and healthy indoor conditions.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Energy flexibility concerns the flexibility of the building's overall electricity demand, including its ability to participate in active and passive, as well as implicit and explicit, demand response in relation to the grid.",
  },
] satisfies readonly CourseQuestion[];

/**
 * Questions grouped by the lesson that introduces
 * and explains the assessed concepts.
 */
export const introductionToSriQuestionsByLesson = {
  "what-is-the-smart-readiness-indicator":
    whatIsSriQuestions,

  "smart-readiness-in-buildings":
    smartReadinessInBuildingsQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/**
 * Complete Section 1 question pool.
 *
 * This pool is used by the Section 1 Final Test.
 */
export const introductionToSriQuestionPool = [
  ...whatIsSriQuestions,
  ...smartReadinessInBuildingsQuestions,
] satisfies readonly CourseQuestion[];
