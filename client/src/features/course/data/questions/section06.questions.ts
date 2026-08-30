// client/src/features/course/data/questions/section06.questions.ts

import type { CourseQuestion } from "../../course.types";

/*
 * Section 6 — Ventilation
 *
 * Questions focus on the concepts required to understand
 * the Ventilation domain and recognise its smart-ready
 * services in a later SRI assessment.
 *
 * The quizzes do not require memorisation of service codes.
 * Service codes may appear as supporting context together
 * with the corresponding service concept or title.
 *
 * Questions focus primarily on:
 *
 * - the scope of controlled ventilation,
 * - service applicability,
 * - the technical distinction between related services,
 * - functionality-level progression,
 * - and recognition of functionality levels from system evidence.
 *
 * Distractors are based, wherever possible, on real functions,
 * applicability conditions or functionality levels introduced
 * in the Ventilation theory.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Ventilation Final Test uses the complete
 * question pool exported at the bottom of this file.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Ventilation Overview                                            */
/* -------------------------------------------------------------------------- */

export const ventilationOverviewQuestions = [
  {
    id: "ventilation-question-01",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-overview",

    prompt:
      "What does controlled ventilation mean within the SRI methodology?",

    options: [
      {
        id: "option-a",
        text:
          "Ventilation produced whenever windows are opened manually by occupants.",
      },
      {
        id: "option-b",
        text:
          "Mechanical ventilation operating continuously at maximum air flow.",
      },
      {
        id: "option-c",
        text:
          "Ventilation whose air-flow rates are regulated according to user settings or indoor-environment parameters.",
      },
      {
        id: "option-d",
        text:
          "Ventilation whose air-flow rate is regulated only according to outdoor temperature.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Controlled ventilation has regulated air-flow rates based on settings selected by the user and/or indoor-environment parameters such as indoor air quality or thermal comfort.",
  },

  {
    id: "ventilation-question-02",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-overview",

    prompt:
      "Which example is considered controlled natural ventilation in the SRI triage process?",

    options: [
      {
        id: "option-a",
        text:
          "The automated opening of windows or other dedicated ventilation openings.",
      },
      {
        id: "option-b",
        text:
          "A window opened manually by an occupant.",
      },
      {
        id: "option-c",
        text:
          "A continuously operating mechanical exhaust fan.",
      },
      {
        id: "option-d",
        text:
          "An air-handling unit operating continuously at maximum air flow.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Controlled natural ventilation includes automated windows or other dedicated ventilation openings. Manual control of openings is not considered controlled natural ventilation in the SRI triage process.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — Ventilation Air-Flow Control                                    */
/* -------------------------------------------------------------------------- */

export const ventilationAirFlowControlQuestions = [
  {
    id: "ventilation-question-03",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-flow-control",

    prompt:
      "A central ventilation fan serving several rooms adjusts its operation according to the combined air-flow demand from those rooms. Which SRI Ventilation service assesses this control function?",

    options: [
      {
        id: "option-a",
        text: "Supply Air Flow Control at Room Level (V1a).",
      },
      {
        id: "option-b",
        text: "Air Flow or Pressure Control at Air-Handler Level (V1c).",
      },
      {
        id: "option-c",
        text: "Heat Recovery Control: Prevention of Overheating (V2c).",
      },
      {
        id: "option-d",
        text: "Supply Air Temperature Control at Air-Handling-Unit Level (V2d).",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "V1c assesses air-flow or pressure control at air-handling-unit level. V1a instead concerns supply-air-flow control at room level.",
  },

  {
    id: "ventilation-question-04",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-flow-control",

    prompt:
      "For Supply Air Flow Control at Room Level (V1a), a ventilation system changes its operation according to whether the space is occupied. Which functionality level does this represent?",

    options: [
      { id: "option-a", text: "Level 1." },
      { id: "option-b", text: "Level 2." },
      { id: "option-c", text: "Level 3." },
      { id: "option-d", text: "Level 4." },
    ],

    correctOptionId: "option-b",

    explanation:
      "V1a Level 2 uses occupancy to control ventilation. Level 1 uses a time schedule, while Levels 3 and 4 introduce indoor-air-quality-based demand control.",
  },

  {
    id: "ventilation-question-05",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-flow-control",

    prompt:
      "For Supply Air Flow Control at Room Level (V1a), the system already uses central demand control based on indoor-air-quality sensors. What additional capability characterises the next functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Local indoor-air-quality demand control with zone flow regulated by dampers.",
      },
      {
        id: "option-b",
        text:
          "Operation according to a fixed time schedule.",
      },
      {
        id: "option-c",
        text:
          "Operation according to occupancy detection.",
      },
      {
        id: "option-d",
        text:
          "Air-handler pressure control with pressure reset.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "V1a Level 3 provides central demand control based on indoor-air-quality sensors. Level 4 advances to local demand control, with the local flow to or from each zone regulated by dampers.",
  },

  {
    id: "ventilation-question-06",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-flow-control",

    prompt:
      "For the service Air Flow or Pressure Control at Air-Handler Level (V1c), when is the service applicable?",

    options: [
      {
        id: "option-a",
        text:
          "Only when mechanical ventilation includes heat recovery.",
      },
      {
        id: "option-b",
        text:
          "Only when mechanical or hybrid ventilation is used for free cooling.",
      },
      {
        id: "option-c",
        text:
          "Only when mechanical ventilation supplies heating.",
      },
      {
        id: "option-d",
        text:
          "When mechanical ventilation is present.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "V1c applies in the case of mechanical ventilation. Heat recovery, mechanical ventilation supplying heating and mechanical or hybrid ventilation are preconditions associated with other Ventilation services.",
  },

  {
    id: "ventilation-question-07",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-flow-control",

    prompt:
      "For Air Flow or Pressure Control at Air-Handler Level (V1c), an air-handling-unit fan follows room air-flow demand and pressure-reset or critical-zone control is applied in a variable-air-volume system with variable-frequency drives. Which functionality level does this represent?",

    options: [
      { id: "option-a", text: "Level 1." },
      { id: "option-b", text: "Level 2." },
      { id: "option-c", text: "Level 3." },
      { id: "option-d", text: "Level 4." },
    ],

    correctOptionId: "option-d",

    explanation:
      "V1c Level 4 combines demand-based air-flow or pressure control with pressure-reset or critical-zone control. Level 3 uses demand-based control without pressure reset.",
  },
  ] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — Heat Recovery & Supply-Air-Temperature Control                  */
/* -------------------------------------------------------------------------- */

export const ventilationAirTemperatureControlQuestions = [
  {
    id: "ventilation-question-08",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-temperature-control",

    prompt:
      "For the service Supply Air Temperature Control at Air-Handling-Unit Level (V2d), when is the service applicable?",

    options: [
      {
        id: "option-a",
        text:
          "When mechanical ventilation with heat recovery is present.",
      },
      {
        id: "option-b",
        text:
          "When mechanical ventilation supplies heating.",
      },
      {
        id: "option-c",
        text:
          "Whenever mechanical ventilation is present.",
      },
      {
        id: "option-d",
        text:
          "When mechanical or hybrid ventilation is available for free cooling.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "V2d applies when mechanical ventilation supplies heating. The service assesses control of the supply-air-temperature setpoint at air-handling-unit level.",
  },

  {
    id: "ventilation-question-09",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-temperature-control",

    prompt:
      "For the Ventilation overheating-prevention control service (V2c), which system condition is required for the service to be applicable?",

    options: [
      {
        id: "option-a",
        text: "Mechanical ventilation with heat recovery.",
      },
      {
        id: "option-b",
        text: "Mechanical ventilation that supplies heating.",
      },
      {
        id: "option-c",
        text: "Mechanical ventilation of any type.",
      },
      {
        id: "option-d",
        text: "Mechanical or hybrid ventilation used for free cooling.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "V2c is applicable when mechanical ventilation with heat recovery is present. Its control function acts on the heat-recovery unit to prevent overheating.",
  },

  {
    id: "ventilation-question-10",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-temperature-control",

    prompt:
      "For Heat Recovery Control: Prevention of Overheating (V2c), which statement correctly distinguishes Level 1 from Level 2?",

    options: [
      {
        id: "option-a",
        text:
          "Level 1 uses temperature sensors in the extract air, while Level 2 uses temperature information from several rooms or predictive control.",
      },
      {
        id: "option-b",
        text:
          "Level 1 uses temperature information from several rooms or predictive control, while Level 2 uses temperature sensors only in the extract air.",
      },
      {
        id: "option-c",
        text:
          "Level 1 provides no overheating control, while Level 2 uses temperature sensors only in the extract air.",
      },
      {
        id: "option-d",
        text:
          "Level 1 provides no overheating control, while Level 2 uses temperature information from several rooms or predictive control.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "V2c Level 1 bases overheating control on temperature sensors in the extract air. Level 2 advances to temperature information from several rooms or predictive control.",
  },

  {
    id: "ventilation-question-11",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-air-temperature-control",

    prompt:
      "For Supply Air Temperature Control at Air-Handling-Unit Level (V2d), an integrated control system collects temperatures or actuator positions from different spaces and adjusts the supply-air-temperature setpoint according to room loads. Which functionality level does this represent?",

    options: [
      { id: "option-a", text: "Level 0." },
      { id: "option-b", text: "Level 1." },
      { id: "option-c", text: "Level 2." },
      { id: "option-d", text: "Level 3." },
    ],

    correctOptionId: "option-d",

    explanation:
      "At V2d Level 3, the supply-air-temperature setpoint is determined according to room loads using information collected from different spaces by an integrated control system.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 4 — Free Cooling with Mechanical Ventilation                        */
/* -------------------------------------------------------------------------- */

export const freeCoolingWithMechanicalVentilationQuestions = [
  {
    id: "ventilation-question-12",
    sectionId: "ventilation-domain",
    lessonId: "free-cooling-with-mechanical-ventilation",

    prompt:
      "Which condition is required for the service Free Cooling with Mechanical Ventilation System (V3) to be applicable?",

    options: [
      {
        id: "option-a",
        text:
          "Mechanical ventilation with heat recovery.",
      },
      {
        id: "option-b",
        text:
          "Mechanical or hybrid ventilation.",
      },
      {
        id: "option-c",
        text:
          "Mechanical ventilation that supplies heating.",
      },
      {
        id: "option-d",
        text:
          "Controlled natural ventilation based only on automated window openings.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "V3 applies in the case of mechanical or hybrid ventilation. Heat recovery and mechanical ventilation supplying heating are preconditions associated with V2c and V2d respectively.",
  },

  {
    id: "ventilation-question-13",
    sectionId: "ventilation-domain",
    lessonId: "free-cooling-with-mechanical-ventilation",

    prompt:
      "For Free Cooling with Mechanical Ventilation System (V3), during an unoccupied period, a ventilation system sets outdoor air to its maximum when the room temperature is above the comfort-period setpoint and the room-to-outdoor temperature difference exceeds a specified limit. Which functionality level does this describe?",

    options: [
      {
        id: "option-a",
        text:
          "Level 0 — no automatic control.",
      },
      {
        id: "option-b",
        text:
          "Level 2 — temperature-based free cooling during all time periods.",
      },
      {
        id: "option-c",
        text:
          "Level 1 — night cooling.",
      },
      {
        id: "option-d",
        text:
          "Level 3 — H,x-directed control based on temperature and humidity.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "V3 Level 1 is night cooling. Outdoor air is set to its maximum during an unoccupied period when the room temperature is above the comfort-period setpoint and the room-to-outdoor temperature difference exceeds a specified limit.",
  },

  {
    id: "ventilation-question-14",
    sectionId: "ventilation-domain",
    lessonId: "free-cooling-with-mechanical-ventilation",

    prompt:
      "For Free Cooling with Mechanical Ventilation System (V3), Levels 2 and 3 both modulate outdoor and recirculated air during all time periods to reduce the need for mechanical cooling. What distinguishes Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "It uses night cooling during unoccupied periods.",
      },
      {
        id: "option-b",
        text:
          "It uses outdoor-temperature compensation for a variable setpoint.",
      },
      {
        id: "option-c",
        text:
          "Its calculation uses temperature alone for air-flow modulation.",
      },
      {
        id: "option-d",
        text:
          "Its calculation uses temperature and humidity (enthalpy) for air-flow modulation.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "V3 Level 2 modulates outdoor and recirculated air on the basis of temperature. Level 3 retains this modulation but uses H,x-directed control based on temperature and humidity (enthalpy).",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 5 — Indoor-Air-Quality Information                                  */
/* -------------------------------------------------------------------------- */

export const ventilationIndoorAirQualityInformationQuestions = [
  {
    id: "ventilation-question-15",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-indoor-air-quality-information",

    prompt:
      "For Reporting Information Regarding Indoor Air Quality (V6), what characterises Level 1 compared with Level 0?",

    options: [
      {
        id: "option-a",
        text:
          "Current performance indicators from air-quality sensors are reported centrally or remotely with autonomous real-time monitoring.",
      },
      {
        id: "option-b",
        text:
          "Real-time monitoring is combined with historical indoor-air-quality information available to occupants.",
      },
      {
        id: "option-c",
        text:
          "Real-time and historical information are combined with warnings concerning maintenance needs or occupant actions.",
      },
      {
        id: "option-d",
        text:
          "No indoor-air-quality information is provided.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "V6 Level 1 introduces current indoor-air-quality information from air-quality sensors with autonomous real-time monitoring. Historical information appears at Level 2 and warnings at Level 3.",
  },

  {
    id: "ventilation-question-16",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-indoor-air-quality-information",

    prompt:
      "For Reporting Information Regarding Indoor Air Quality (V6), occupants can access both real-time indoor-air-quality monitoring and historical information, but the system does not yet provide warnings concerning maintenance needs or occupant actions. Which functionality level does this represent?",

    options: [
      { id: "option-a", text: "Level 0." },
      { id: "option-b", text: "Level 1." },
      { id: "option-c", text: "Level 2." },
      { id: "option-d", text: "Level 3." },
    ],

    correctOptionId: "option-c",

    explanation:
      "V6 Level 2 provides real-time monitoring together with historical indoor-air-quality information. Warnings concerning maintenance needs or occupant actions are introduced at Level 3.",
  },

  {
    id: "ventilation-question-17",
    sectionId: "ventilation-domain",
    lessonId: "ventilation-indoor-air-quality-information",

    prompt:
      "For Reporting Information Regarding Indoor Air Quality (V6), a system already provides occupants with real-time and historical indoor-air-quality information. What additional capability characterises Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "Automatic modulation of the heat-recovery unit.",
      },
      {
        id: "option-b",
        text:
          "Warnings concerning maintenance needs or occupant actions.",
      },
      {
        id: "option-c",
        text:
          "Pressure reset for variable-air-volume systems.",
      },
      {
        id: "option-d",
        text:
          "Load-dependent control of the supply-air-temperature setpoint.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "V6 Level 3 retains real-time and historical indoor-air-quality information and adds warnings concerning maintenance needs or occupant actions, such as opening a window.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const ventilationQuestionsByLesson = {
  "ventilation-overview":
    ventilationOverviewQuestions,

  "ventilation-air-flow-control":
    ventilationAirFlowControlQuestions,

  "ventilation-air-temperature-control":
    ventilationAirTemperatureControlQuestions,

  "free-cooling-with-mechanical-ventilation":
    freeCoolingWithMechanicalVentilationQuestions,

  "ventilation-indoor-air-quality-information":
    ventilationIndoorAirQualityInformationQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 6 question pool                                           */
/* -------------------------------------------------------------------------- */

export const ventilationQuestionPool = [
  ...ventilationOverviewQuestions,
  ...ventilationAirFlowControlQuestions,
  ...ventilationAirTemperatureControlQuestions,
  ...freeCoolingWithMechanicalVentilationQuestions,
  ...ventilationIndoorAirQualityInformationQuestions,
] satisfies readonly CourseQuestion[];