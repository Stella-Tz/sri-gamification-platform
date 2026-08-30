// client/src/features/course/data/questions/section08.questions.ts

import type { CourseQuestion } from "../../course.types";

/*
 * Section 8 — Dynamic Building Envelope
 *
 * Questions focus on the concepts required to understand
 * the Dynamic Building Envelope domain and recognise its
 * smart-ready services and functionality levels in a later
 * SRI assessment.
 *
 * The quizzes do not require memorisation of service codes.
 * Service codes may appear as supporting context together
 * with the corresponding service title or concept.
 *
 * Questions focus primarily on:
 *
 * - the role of the Dynamic Building Envelope domain,
 * - catalogue membership and service applicability,
 * - the distinction between control and reporting functions,
 * - functionality-level progression,
 * - and recognition of functionality levels from system behaviour.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Dynamic Building Envelope Final Test uses
 * the complete question pool exported below.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Dynamic Building Envelope Overview                              */
/* -------------------------------------------------------------------------- */

export const dynamicBuildingEnvelopeOverviewQuestions = [
  {
    id: "dynamic-envelope-question-01",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "dynamic-building-envelope-overview",

    prompt:
      "What distinguishes a dynamic building envelope from a conventional building envelope?",

    options: [
      {
        id: "option-a",
        text:
          "A conventional envelope adapts automatically, while a dynamic envelope remains mainly static.",
      },
      {
        id: "option-b",
        text:
          "A dynamic envelope is defined only by the presence of movable windows or shading devices.",
      },
      {
        id: "option-c",
        text:
          "A dynamic envelope adapts to internal and external conditions, while a conventional envelope is mainly static.",
      },
      {
        id: "option-d",
        text:
          "A dynamic envelope operates independently of changes in internal and external conditions.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Conventional building envelopes are mainly static. A dynamic building envelope adapts to changing internal and external conditions and seeks the most favourable option.",
  },

  {
    id: "dynamic-envelope-question-02",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "dynamic-building-envelope-overview",

    prompt:
      "Why should dynamic-envelope operation be integrated with the building's automatic control system?",

    options: [
      {
        id: "option-a",
        text:
          "Because its operation can significantly affect the energy consumed by HVAC and lighting systems.",
      },
      {
        id: "option-b",
        text:
          "Because dynamic-envelope elements must remain in one fixed position during normal operation.",
      },
      {
        id: "option-c",
        text:
          "Because automatic control is required only for reporting the position of envelope elements.",
      },
      {
        id: "option-d",
        text:
          "Because dynamic-envelope elements replace the building's HVAC and lighting systems.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Dynamic-envelope operation can significantly affect the energy consumed by HVAC and lighting systems. For this reason, the theory identifies integration with the building's automatic control system as important.",
  },

  {
    id: "dynamic-envelope-question-03",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "dynamic-building-envelope-overview",

    prompt:
      "How are Window Solar Shading Control (DE1), Window Open/Closed Control with HVAC (DE2), and Performance Reporting (DE4) distributed between Catalogues A and B?",

    options: [
      {
        id: "option-a",
        text:
          "DE1: A only · DE2: A & B · DE4: A & B",
      },
      {
        id: "option-b",
        text:
          "DE1: B only · DE2: B only · DE4: B only",
      },
      {
        id: "option-c",
        text:
          "DE1: A & B · DE2: A & B · DE4: A only",
      },
      {
        id: "option-d",
        text:
          "DE1: A & B · DE2: B only · DE4: A & B",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "Window Solar Shading Control (DE1) and Reporting Information Regarding Performance of Dynamic Building Envelope Systems (DE4) are included in Catalogues A and B. Window Open/Closed Control, Combined with HVAC System (DE2) is included only in Catalogue B.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — Window Solar Shading Control                                    */
/* -------------------------------------------------------------------------- */

export const windowSolarShadingControlQuestions = [
  {
    id: "dynamic-envelope-question-04",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "window-solar-shading-control",

    prompt:
      "A building has movable solar-shading devices that can be operated only manually. Which functionality level of Window Solar Shading Control (DE1) does this represent?",

    options: [
      {
        id: "option-a",
        text: "Level 0.",
      },
      {
        id: "option-b",
        text: "Level 1.",
      },
      {
        id: "option-c",
        text: "Level 2.",
      },
      {
        id: "option-d",
        text: "Level 3.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Manual operation of movable solar-shading devices corresponds to DE1 functionality Level 0.",
  },

  {
    id: "dynamic-envelope-question-05",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "window-solar-shading-control",

    prompt:
      "For Window Solar Shading Control (DE1), what distinguishes functionality Level 2 from Level 1?",

    options: [
      {
        id: "option-a",
        text:
          "Level 2 introduces predictive control based on weather forecasts.",
      },
      {
        id: "option-b",
        text:
          "Level 2 coordinates shading simultaneously with lighting and HVAC.",
      },
      {
        id: "option-c",
        text:
          "Level 1 has no shading devices, while Level 2 introduces manual shading.",
      },
      {
        id: "option-d",
        text:
          "Level 1 is motorised but manually controlled; Level 2 uses automatic sensor-based control.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "At DE1 Level 1, shading devices are motorised but operated through a manual switch. At Level 2, motorised shading is controlled automatically using sensor data.",
  },

  {
    id: "dynamic-envelope-question-06",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "window-solar-shading-control",

    prompt:
      "For Window Solar Shading Control (DE1), which capability characterises functionality Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "Predictive blind control using information such as weather forecasts.",
      },
      {
        id: "option-b",
        text:
          "Combined automatic control of solar shading, lighting and HVAC.",
      },
      {
        id: "option-c",
        text:
          "Automatic shading control based on sensor data without coordination with lighting or HVAC.",
      },
      {
        id: "option-d",
        text:
          "Motorised shading operated manually through a switch.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "DE1 Level 3 combines automatic control of motorised solar-shading devices with the lighting and HVAC systems of the space.",
  },

  {
    id: "dynamic-envelope-question-07",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "window-solar-shading-control",

    prompt:
      "For Window Solar Shading Control (DE1), which additional capability characterises functionality Level 4?",

    options: [
      {
        id: "option-a",
        text:
          "Automatic shading control based on current sensor data.",
      },
      {
        id: "option-b",
        text:
          "Manual control of motorised shading devices.",
      },
      {
        id: "option-c",
        text:
          "Predictive blind control using information such as weather forecasts.",
      },
      {
        id: "option-d",
        text:
          "Combined control of shading with lighting and HVAC without predictive control.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "DE1 Level 4 adds predictive blind control to the coordinated operation of shading, lighting and HVAC, using information such as weather forecasts.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — Window Open/Closed Control and HVAC                             */
/* -------------------------------------------------------------------------- */

export const windowOpenClosedControlAndHvacQuestions = [
  {
    id: "dynamic-envelope-question-08",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "window-open-closed-control-and-hvac",

    prompt:
      "A building has only fixed windows that cannot be opened. Which functionality level of Window Open/Closed Control, Combined with HVAC System (DE2) does this represent?",

    options: [
      {
        id: "option-a",
        text: "Level 0.",
      },
      {
        id: "option-b",
        text: "Level 1.",
      },
      {
        id: "option-c",
        text: "Level 2.",
      },
      {
        id: "option-d",
        text: "Level 3.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "DE2 functionality Level 0 includes manual window operation or a building with only fixed windows.",
  },

  {
    id: "dynamic-envelope-question-09",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "window-open-closed-control-and-hvac",

    prompt:
      "For Window Open/Closed Control, Combined with HVAC System (DE2), what happens at functionality Level 1 when an open window or external door is detected?",

    options: [
      {
        id: "option-a",
        text:
          "The window is automatically closed by a mechanical actuator.",
      },
      {
        id: "option-b",
        text:
          "The room HVAC system is shut down.",
      },
      {
        id: "option-c",
        text:
          "The system begins central coordination for natural night cooling.",
      },
      {
        id: "option-d",
        text:
          "The opening is reported without affecting HVAC operation.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "At DE2 Level 1, opening sensors or magnetic contacts communicate with the room HVAC control system. When an open window or external door is detected, the HVAC system is shut down.",
  },

  {
    id: "dynamic-envelope-question-10",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "window-open-closed-control-and-hvac",

    prompt:
      "For Window Open/Closed Control, Combined with HVAC System (DE2), which capability is added at functionality Level 2?",

    options: [
      {
        id: "option-a",
        text:
          "Central coordination of operable windows for natural night cooling.",
      },
      {
        id: "option-b",
        text:
          "Open/closed detection linked to HVAC shut-down only.",
      },
      {
        id: "option-c",
        text:
          "Automatic solar-shading control based on sensor data.",
      },
      {
        id: "option-d",
        text:
          "Automated mechanical window opening based on room-sensor data.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "DE2 Level 2 adds automated mechanical window opening based on room-sensor data to the Level 1 function. The supporting material also describes sensors for variables such as CO₂, humidity and temperature and the possible use of external weather information.",
  },

  {
    id: "dynamic-envelope-question-11",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "window-open-closed-control-and-hvac",

    prompt:
      "What characterises the highest functionality level of Window Open/Closed Control, Combined with HVAC System (DE2)?",

    options: [
      {
        id: "option-a",
        text:
          "Central coordination of operable windows, for example for free natural night cooling.",
      },
      {
        id: "option-b",
        text:
          "Open/closed detection linked to HVAC shut-down.",
      },
      {
        id: "option-c",
        text:
          "Automatic control of window shading based on solar-radiation data.",
      },
      {
        id: "option-d",
        text:
          "Automated window opening based on room-sensor data only.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "At DE2 Level 3, operable windows are coordinated centrally. One example is free natural night cooling using indoor- and outdoor-temperature information, with HVAC switched off when the windows are opened.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 4 — Dynamic Envelope Performance Reporting                         */
/* -------------------------------------------------------------------------- */

export const dynamicEnvelopePerformanceReportingQuestions = [
  {
    id: "dynamic-envelope-question-12",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "dynamic-envelope-performance-reporting",

    prompt:
      "Which of the following represents a reporting function rather than a control function within the Dynamic Building Envelope domain?",

    options: [
      {
        id: "option-a",
        text:
          "Automatically opening and closing windows based on room-sensor data.",
      },
      {
        id: "option-b",
        text:
          "Coordinating solar shading with lighting and HVAC.",
      },
      {
        id: "option-c",
        text:
          "Providing information about the position of dynamic-envelope elements and detected faults.",
      },
      {
        id: "option-d",
        text:
          "Predictively controlling blinds using weather forecasts.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Reporting information about the position and faults of dynamic-envelope elements is a DE4 reporting function. The other options describe control functions associated with DE1 or DE2.",
  },

  {
    id: "dynamic-envelope-question-13",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "dynamic-envelope-performance-reporting",

    prompt:
      "For Reporting Information Regarding Performance of Dynamic Building Envelope Systems (DE4), what information is provided at functionality Level 1?",

    options: [
      {
        id: "option-a",
        text:
          "Position, fault detection and predictive maintenance.",
      },
      {
        id: "option-b",
        text:
          "No information about the position or operation of dynamic-envelope elements.",
      },
      {
        id: "option-c",
        text:
          "The position of dynamic-envelope elements together with fault detection.",
      },
      {
        id: "option-d",
        text:
          "Position, predictive maintenance and real-time sensor data.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "At DE4 Level 1, the reporting system provides the position of dynamic-envelope elements, such as windows, shutters and awnings, and reports faults in those components.",
  },

  {
    id: "dynamic-envelope-question-14",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "dynamic-envelope-performance-reporting",

    prompt:
      "For Reporting Information Regarding Performance of Dynamic Building Envelope Systems (DE4), which capability is added at functionality Level 2?",

    options: [
      {
        id: "option-a",
        text:
          "Predictive maintenance is added to position reporting and fault detection.",
      },
      {
        id: "option-b",
        text:
          "Historical sensor data is added to real-time sensor information.",
      },
      {
        id: "option-c",
        text:
          "Automatic control of the position of dynamic-envelope elements.",
      },
      {
        id: "option-d",
        text:
          "Real-time sensor data is added without predictive maintenance.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "DE4 Level 2 adds predictive maintenance to position reporting and fault detection. The supporting material describes the use of analytical algorithms and sensor data to assess device condition and predict possible failures.",
  },

  {
    id: "dynamic-envelope-question-15",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "dynamic-envelope-performance-reporting",

    prompt:
      "For Reporting Information Regarding Performance of Dynamic Building Envelope Systems (DE4), what distinguishes functionality Level 4 from Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "Level 4 introduces real-time sensor data for the first time.",
      },
      {
        id: "option-b",
        text:
          "Level 4 adds historical sensor data to the real-time sensor information.",
      },
      {
        id: "option-c",
        text:
          "Level 4 replaces reporting with automatic control of envelope elements.",
      },
      {
        id: "option-d",
        text:
          "Level 4 removes predictive maintenance and retains only sensor information.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "DE4 Level 3 provides real-time sensor data in addition to the preceding functions. Level 4 retains those functions and also provides historical sensor data.",
  },

  {
  id: "dynamic-envelope-question-16",
    sectionId: "dynamic-building-envelope-domain",
    lessonId: "dynamic-envelope-performance-reporting",

    prompt:
      "For Reporting Information Regarding Performance of Dynamic Building Envelope Systems (DE4), which condition is required for the service to be applicable?",

    options: [
      {
        id: "option-a",
        text: "Operable windows are present.",
      },
      {
        id: "option-b",
        text: "Movable shades, screens or blinds are present.",
      },
      {
        id: "option-c",
        text: "Windows are coordinated with the HVAC system.",
      },
      {
        id: "option-d",
        text: "Automatic lighting control is present.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "DE4 is applicable only when movable shades, screens or blinds are present.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const dynamicBuildingEnvelopeQuestionsByLesson = {
  "dynamic-building-envelope-overview":
    dynamicBuildingEnvelopeOverviewQuestions,

  "window-solar-shading-control":
    windowSolarShadingControlQuestions,

  "window-open-closed-control-and-hvac":
    windowOpenClosedControlAndHvacQuestions,

  "dynamic-envelope-performance-reporting":
    dynamicEnvelopePerformanceReportingQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 8 question pool                                           */
/* -------------------------------------------------------------------------- */

export const dynamicBuildingEnvelopeQuestionPool = [
  ...dynamicBuildingEnvelopeOverviewQuestions,
  ...windowSolarShadingControlQuestions,
  ...windowOpenClosedControlAndHvacQuestions,
  ...dynamicEnvelopePerformanceReportingQuestions,
] satisfies readonly CourseQuestion[];