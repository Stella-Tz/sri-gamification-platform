// client/src/features/course/data/questions/section03.questions.ts

import type { CourseQuestion } from "../../course.types";

/*
 * Section 3 — Heating
 *
 * Questions focus on the main concepts required to understand
 * the Heating domain and its smart-ready services.
 *
 * The quizzes do not require memorisation of service codes.
 * They focus on:
 * - what is assessed,
 * - when a service is relevant,
 * - and what distinguishes its functionality levels.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Heating Final Test uses the complete question
 * pool exported at the bottom of this file.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Heating Overview                                                */
/* -------------------------------------------------------------------------- */

export const heatingOverviewQuestions = [
  {
    id: "heating-question-01",
    sectionId: "heating-domain",
    lessonId: "heating-overview",

    prompt:
      "Which option best describes the full scope of functions covered by the SRI Heating domain?",

    options: [
      {
        id: "option-a",
        text:
          "Heat emission, distribution and generation, including room-level control, distribution-pump control and generator sequencing.",
      },
      {
        id: "option-b",
        text:
          "Heat emission, distribution, generation, thermal-energy storage, grid interaction and heating-system performance reporting.",
      },
      {
        id: "option-c",
        text:
          "Heat emission and distribution, including room-level control, distribution-fluid temperature control and distribution-pump control.",
      },
      {
        id: "option-d",
        text:
          "Heat generation, thermal-energy storage and grid interaction, including heat-pump capacity control and generator sequencing.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "The Heating domain covers smart-ready services related to heat emission, distribution, generation and thermal-energy storage, as well as flexibility and interaction with the electricity grid and reporting of heating-system performance.",
  },

  {
    id: "heating-question-02",
    sectionId: "heating-domain",
    lessonId: "heating-overview",

    prompt:
      "What does the SRI Heating-domain assessment primarily examine?",

    options: [
    {
      id: "option-a",
      text:
        "The general parts of the heating system, such as emission, distribution and generation.",
    },
    {
      id: "option-b",
      text:
        "Examples of smart heating control, such as schedules, occupancy and window openings.",
    },
    {
      id: "option-c",
      text:
        "The relevant smart-ready Heating services and the functionality levels at which they are implemented.",
    },
    {
      id: "option-d",
      text:
        "The smart-ready Heating services included in the assessment, independently of their functionality levels.",
    },
  ],

    correctOptionId: "option-c",

    explanation:
      "The Heating domain is assessed through its relevant smart-ready services and their functionality levels. Each functionality level represents a different degree of smart readiness and is associated with impact scores used in the SRI calculation.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — Heat Emission and Distribution Control                          */
/* -------------------------------------------------------------------------- */

export const heatEmissionAndDistributionQuestions = [
  {
    id: "heating-question-03",
    sectionId: "heating-domain",
    lessonId: "heat-emission-and-distribution-control",

    prompt:
      "Which statement correctly compares the functionality progressions used for heat emitters other than TABS and for TABS operating in heating mode within the SRI Heating domain?",

    options: [
      {
        id: "option-a",
        text:
          "Heat emitters other than TABS progress through individual room control and BACS communication, while TABS use central and advanced central control and can add intermittent operation or room-temperature feedback.",
      },
      {
        id: "option-b",
        text:
          "Heat emitters other than TABS use central and advanced central control with intermittent operation or room-temperature feedback, while TABS progress through individual room control and BACS communication.",
      },
      {
        id: "option-c",
        text:
          "Both heat emitters other than TABS and TABS use the same progression from individual room control to BACS communication and presence detection.",
      },
      {
        id: "option-d",
        text:
          "Both heat emitters other than TABS and TABS use the same progression from central automatic control to advanced central control with intermittent operation or room-temperature feedback.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Heat Emission Control (H1a) uses a room-level progression that advances to BACS communication and presence detection. Emission Control for TABS — Heating Mode (H1b) follows a separate central-control progression whose highest level adds intermittent operation, room-temperature feedback control, or both.",
  },

  {
    id: "heating-question-04",
    sectionId: "heating-domain",
    lessonId: "heat-emission-and-distribution-control",

    prompt:
      "For Heat Emission Control (H1a), a room has individual heat-emission control, but the room controller does not communicate with BACS or other systems outside the room. Which functionality level does this represent?",

    options: [
      {
        id: "option-a",
        text: "Level 1.",
      },
      {
        id: "option-b",
        text: "Level 2.",
      },
      {
        id: "option-c",
        text: "Level 3.",
      },
      {
        id: "option-d",
        text: "Level 4.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Level 2 provides individual room control without communication. Communication between the room controller and BACS or other systems outside the room is introduced at Level 3, while presence detection is added at Level 4.",
  },

  {
    id: "heating-question-05",
    sectionId: "heating-domain",
    lessonId: "heat-emission-and-distribution-control",

    prompt:
      "For Emission Control for TABS — Heating Mode (H1b), a TABS zone already uses advanced central automatic control to maintain indoor temperature within the comfort range while minimising energy demand. What additional capability characterises the highest functionality level in the consolidated catalogue?",

    options: [
      {
        id: "option-a",
        text:
          "Central automatic control based on a common reference temperature.",
      },
      {
        id: "option-b",
        text:
          "Intermittent operation, room-temperature feedback control, or both.",
      },
      {
        id: "option-c",
        text:
          "Demand-based distribution-fluid temperature control using indoor-temperature measurements.",
      },
      {
        id: "option-d",
        text:
          "Individual room control with BACS communication and presence detection.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "For TABS operating in heating mode, the consolidated progression reaches advanced central automatic control at Level 2. The highest functionality level adds intermittent operation, room-temperature feedback control, or both.",
  },

  {
    id: "heating-question-06",
    sectionId: "heating-domain",
    lessonId: "heat-emission-and-distribution-control",

    prompt:
      "For Control of Distribution-Fluid Temperature (H1c, Catalogue B), the distribution-fluid temperature is adjusted using indoor-temperature measurements. Which control approach does this represent?",

    options: [
      {
        id: "option-a",
        text:
          "Demand-based control.",
      },
      {
        id: "option-b",
        text:
          "Outside-temperature-compensated control.",
      },
      {
        id: "option-c",
        text:
          "No automatic distribution-fluid temperature control.",
      },
      {
        id: "option-d",
        text:
          "Variable-speed pump control based on differential pressure.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Demand-based control adjusts the distribution-fluid temperature using indoor-temperature measurements. Outside-temperature-compensated control instead uses outside temperature.",
  },

  {
    id: "heating-question-07",
    sectionId: "heating-domain",
    lessonId: "heat-emission-and-distribution-control",

    prompt:
      "For Control of Distribution Pumps in Networks (H1d), a heating distribution pump operates at variable speed based on a fixed or variable differential-pressure setpoint, without following an external demand signal. Which functionality level does this represent?",

    options: [
      {
        id: "option-a",
        text: "Level 1.",
      },
      {
        id: "option-b",
        text: "Level 2.",
      },
      {
        id: "option-c",
        text: "Level 3.",
      },
      {
        id: "option-d",
        text: "Level 4.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Level 3 uses variable-speed pump control based on a fixed or variable differential-pressure setpoint. At Level 4, the pump additionally follows an external demand signal.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — Heat Generation Control                                         */
/* -------------------------------------------------------------------------- */

export const heatGenerationControlQuestions = [
  {
    id: "heating-question-08",
    sectionId: "heating-domain",
    lessonId: "heat-generation-control",

    prompt:
      "For Heat Generator Control — All Except Heat Pumps (H2a) and Heat Generator Control for Heat Pumps (H2b), which statement correctly describes what each service assesses?",

    options: [
      {
        id: "option-a",
        text:
          "H2a assesses generator-temperature control for combustion heaters or district-heating systems, while H2b assesses capacity control for heat pumps.",
      },
      {
        id: "option-b",
        text:
          "H2a assesses distribution-fluid temperature for combustion heaters or district-heating systems, while H2b assesses distribution-pump speed for heat pumps.",
      },
      {
        id: "option-c",
        text:
          "H2a assesses thermal-energy storage for combustion heaters or district-heating systems, while H2b assesses grid interaction for heat pumps.",
      },
      {
        id: "option-d",
        text:
          "H2a assesses performance reporting for combustion heaters or district-heating systems, while H2b assesses generator sequencing for heat pumps.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Heat Generator Control — All Except Heat Pumps (H2a) assesses generator-temperature control for combustion heaters or district-heating systems, while Heat Generator Control for Heat Pumps (H2b) assesses heat-pump capacity control.",
  },

  {
    id: "heating-question-09",
    sectionId: "heating-domain",
    lessonId: "heat-generation-control",

    prompt:
      "For Heat Generator Control for Heat Pumps (H2b), a heat pump already uses variable-capacity control according to heating load or demand. What additional feature characterises the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Outside temperature.",
      },
      {
        id: "option-b",
        text:
          "External signals from the electricity grid.",
      },
      {
        id: "option-c",
        text:
          "A fixed priority list for different heat generators.",
      },
      {
        id: "option-d",
        text:
          "The accumulated operating time of different heat generators.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "At the highest heat-pump functionality level, variable-capacity control responds to the heating load and also to external signals from the electricity grid.",
  },

  {
    id: "heating-question-10",
    sectionId: "heating-domain",
    lessonId: "heat-generation-control",

    prompt:
      "A heating installation can produce heat using several different units. The assessment examines the control logic used to decide which unit should operate first as conditions change. Which SRI Heating service is being assessed?",

    options: [
      {
        id: "option-a",
        text:
          "Heat Generator Control — All Except Heat Pumps (H2a).",
      },
      {
        id: "option-b",
        text:
          "Heat Generator Control for Heat Pumps (H2b).",
      },
      {
        id: "option-c",
        text:
          "Sequencing of Different Heat Generators (H2d).",
      },
      {
        id: "option-d",
        text:
          "Provision of Information Regarding Heating-System Performance (H3).",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Sequencing of Different Heat Generators (H2d) assesses how the operating priority of multiple heat generators is determined.",
  },

  {
    id: "heating-question-11",
    sectionId: "heating-domain",
    lessonId: "heat-generation-control",

    prompt:
      "For Sequencing of Different Heat Generators (H2d), a heating system already uses a dynamic priority based on current and predicted load, energy efficiency, carbon-dioxide emissions and generator capacity. What additional feature characterises the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Priorities based only on the accumulated operating time of the generators.",
      },
      {
        id: "option-b",
        text:
          "A fixed priority list, for example based on rated energy efficiency.",
      },
      {
        id: "option-c",
        text:
          "External signals from the electricity grid.",
      },
      {
        id: "option-d",
        text:
          "A dynamic priority based on current operating conditions without predicted load.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "At Level 3, generator sequencing uses a dynamic priority based on current and predicted load, energy efficiency, carbon-dioxide emissions and generator capacity. The highest functionality level retains these factors and additionally includes external signals from the electricity grid.",
  },

  {
    id: "heating-question-12",
    sectionId: "heating-domain",
    lessonId: "heat-generation-control",

    prompt:
      "For Heat Generator Control — All Except Heat Pumps (H2a), a combustion heater or district-heating system already adjusts generator temperature according to outside temperature. What distinguishes the next higher functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "The generator is maintained at a predefined constant temperature.",
      },
      {
        id: "option-b",
        text:
          "The generator temperature is adjusted according to the system load.",
      },
      {
        id: "option-c",
        text:
          "Heat-pump capacity is controlled through multiple fixed stages according to load or demand.",
      },
      {
        id: "option-d",
        text:
          "Different heat generators are controlled according to a fixed priority list.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "For combustion heaters or district-heating systems covered by this service, control progresses from constant-temperature control to adjustment according to outside temperature and then to adjustment according to the system load.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 4 — Thermal Energy Storage and Grid Interaction                     */
/* -------------------------------------------------------------------------- */

export const thermalStorageAndGridInteractionQuestions = [
  {
    id: "heating-question-13",
    sectionId: "heating-domain",
    lessonId: "thermal-energy-storage-and-grid-interaction",

    prompt:
      "How does thermal-energy storage differ between Storage and Shifting of Thermal Energy (H1c, Catalogue A) and Thermal Energy Storage for Building Heating (H1f, Catalogue B)?",

    options: [
      {
        id: "option-a",
        text:
          "Catalogue A assesses the operation and charging of thermal-energy storage for building heating, while Catalogue B assesses only the availability of hot-water storage vessels.",
      },
      {
        id: "option-b",
        text:
          "Both catalogues assess thermal-energy storage only through the availability and control of hot-water storage vessels.",
      },
      {
        id: "option-c",
        text:
          "Both catalogues assess thermal-energy storage through operation and charging based on schedules, load prediction and grid signals.",
      },
      {
        id: "option-d",
        text:
          "Catalogue A considers the availability and control of hot-water storage vessels, while Catalogue B assesses the operation and charging of thermal-energy storage for building heating, excluding TABS.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "Catalogue A assesses thermal-energy storage through the availability and control of hot-water storage vessels. Catalogue B instead assesses the operation and charging of thermal-energy storage for building heating, excluding TABS.",
  },

  {
    id: "heating-question-14",
    sectionId: "heating-domain",
    lessonId: "thermal-energy-storage-and-grid-interaction",

    prompt:
      "For Storage and Shifting of Thermal Energy (H1c, Catalogue A), what distinguishes the higher functionality from simply having hot-water storage tanks available?",

    options: [
      {
        id: "option-a",
        text:
          "The storage vessels can be controlled through external signals from BACS or the electricity grid.",
      },
      {
        id: "option-b",
        text:
          "The storage vessels are controlled through internal settings or signals without communication with BACS or the electricity grid.",
      },
      {
        id: "option-c",
        text:
          "No hot-water storage vessel is available for the heating installation.",
      },
      {
        id: "option-d",
        text:
          "The hot-water storage operates continuously or during periods defined by one or more schedules without external communication.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "At the higher Catalogue A functionality level, the hot-water storage vessels are controlled through external signals from BACS or the electricity grid.",
  },

  {
    id: "heating-question-15",
    sectionId: "heating-domain",
    lessonId: "thermal-energy-storage-and-grid-interaction",

    prompt:
      "For Thermal Energy Storage for Building Heating (H1f, Catalogue B), storage already operates according to predicted heating load. What additional capability characterises the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Continuous storage operation.",
      },
      {
        id: "option-b",
        text:
          "Storage operation during periods defined by one or more schedules.",
      },
      {
        id: "option-c",
        text:
          "Charging is prioritised according to signals received from the electricity grid.",
      },
      {
        id: "option-d",
        text:
          "The state of charge is reduced when storage is not needed according to the predicted load.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "After load-prediction-based operation, the highest functionality level adds flexible charging control according to signals received from the electricity grid.",
  },

  {
    id: "heating-question-16",
    sectionId: "heating-domain",
    lessonId: "thermal-energy-storage-and-grid-interaction",

    prompt:
      "For Flexibility and Interaction with the Electricity Grid (H4), a heating system can already modify its operation in response to electricity-grid signals. What additional capability characterises the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "A predefined operating schedule.",
      },
      {
        id: "option-b",
        text:
          "Self-learning control based on the building's thermal response.",
      },
      {
        id: "option-c",
        text:
          "Local forecasts and predicted heating-system performance.",
      },
      {
        id: "option-d",
        text:
          "An external distribution-pump demand signal.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "At the highest functionality level, heating-system operation combines electricity-grid signals with local forecasts and predicted heating-system performance.",
},
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 5 — Heating-System Performance Reporting                            */
/* -------------------------------------------------------------------------- */

export const heatingSystemPerformanceReportingQuestions = [
  {
    id: "heating-question-17",
    sectionId: "heating-domain",
    lessonId: "heating-system-performance-reporting",

    prompt:
      "For Provision of Information Regarding Heating-System Performance (H3), a reporting system provides current performance indicators and historical data, but does not yet evaluate them through forecasting or benchmarking. Which functionality level does this represent?",

    options: [
      {
        id: "option-a",
        text: "Level 1.",
      },
      {
        id: "option-b",
        text: "Level 2.",
      },
      {
        id: "option-c",
        text: "Level 3.",
      },
      {
        id: "option-d",
        text: "Level 4.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Level 2 reports current performance indicators together with historical data. Performance evaluation with forecasting or benchmarking is introduced at Level 3.",
  },

  {
    id: "heating-question-18",
    sectionId: "heating-domain",
    lessonId: "heating-system-performance-reporting",

    prompt:
      "Which sequence correctly represents increasing smart readiness for Provision of Information Regarding Heating-System Performance (H3)?",

    options: [
      {
        id: "option-a",
        text:
          "No reporting → current performance indicators → current indicators with historical data → performance evaluation with forecasting or benchmarking → performance evaluation with forecasting or benchmarking plus predictive management and fault detection.",
      },
      {
        id: "option-b",
        text:
          "No reporting → current indicators with historical data → current performance indicators → performance evaluation with forecasting or benchmarking → performance evaluation with forecasting or benchmarking plus predictive management and fault detection.",
      },
      {
        id: "option-c",
        text:
          "No reporting → current performance indicators → performance evaluation with forecasting or benchmarking → current indicators with historical data → performance evaluation with forecasting or benchmarking plus predictive management and fault detection.",
      },
      {
        id: "option-d",
        text:
          "No reporting → current performance indicators → current indicators with historical data → performance evaluation with forecasting or benchmarking plus predictive management and fault detection → performance evaluation with forecasting or benchmarking.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Heating-system performance reporting progresses from no reporting to current indicators and historical data, then to performance evaluation with forecasting or benchmarking, and finally to performance evaluation that also includes predictive management and fault detection.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const heatingQuestionsByLesson = {
  "heating-overview":
    heatingOverviewQuestions,

  "heat-emission-and-distribution-control":
    heatEmissionAndDistributionQuestions,

  "heat-generation-control":
    heatGenerationControlQuestions,

  "thermal-energy-storage-and-grid-interaction":
    thermalStorageAndGridInteractionQuestions,

  "heating-system-performance-reporting":
    heatingSystemPerformanceReportingQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 3 question pool                                           */
/* -------------------------------------------------------------------------- */

export const heatingQuestionPool = [
  ...heatingOverviewQuestions,
  ...heatEmissionAndDistributionQuestions,
  ...heatGenerationControlQuestions,
  ...thermalStorageAndGridInteractionQuestions,
  ...heatingSystemPerformanceReportingQuestions,
] satisfies readonly CourseQuestion[];