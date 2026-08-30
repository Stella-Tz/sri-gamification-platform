// client/src/features/course/data/questions/section09.questions.ts

import type { CourseQuestion } from "../../course.types";

/*
 * Section 9 — Electricity
 *
 * Questions focus on the concepts required to understand
 * the Electricity domain and recognise its smart-ready
 * services and functionality levels in a later SRI assessment.
 *
 * The quizzes do not require memorisation of service codes.
 * Service codes may appear as supporting context together
 * with the corresponding service title or concept.
 *
 * Questions focus primarily on:
 *
 * - the scope of the Electricity domain,
 * - catalogue membership and service applicability,
 * - the distinction between closely related services,
 * - functionality-level progression,
 * - and recognition of functionality levels from system behaviour.
 *
 * Contextual information that is not central to the SRI assessment
 * is not used as quiz material.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Electricity Final Test uses the complete
 * question pool exported at the bottom of this file.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Electricity Overview                                            */
/* -------------------------------------------------------------------------- */

export const electricityOverviewQuestions = [
  {
    id: "electricity-question-01",
    sectionId: "electricity-domain",
    lessonId: "electricity-overview",

    prompt:
      "Which set of functions is covered by the SRI Electricity domain?",

    options: [
    {
      id: "option-a",
      text:
        "Local-generation reporting, solar-shading control, heating control, lighting control, energy-storage reporting, ventilation control and electricity-consumption reporting.",
    },
    {
      id: "option-b",
      text:
        "Electricity-consumption reporting, daylight-based lighting control, local-generation reporting, cooling control, storage of locally generated electricity, window/HVAC control and ventilation control.",
    },
    {
      id: "option-c",
      text:
        "Local-generation reporting, storage of locally generated electricity, self-consumption optimisation, CHP control, (micro)grid operation, energy-storage reporting and electricity-consumption reporting.",
    },
    {
      id: "option-d",
      text:
        "Local-generation reporting, storage of locally generated electricity, electricity-consumption reporting, solar-shading control, heating control, ventilation control and dynamic-envelope reporting.",
    },
  ],

    correctOptionId: "option-c",

    explanation:
      "The Electricity domain covers reporting on local electricity generation, storage of locally generated electricity, self-consumption optimisation, CHP control, support of (micro)grid operation modes, reporting on energy storage and reporting on electricity consumption.",
  },

  {
    id: "electricity-question-02",
    sectionId: "electricity-domain",
    lessonId: "electricity-overview",

    prompt:
      "How can electricity storage support a building with local electricity generation?",

    options: [
      {
        id: "option-a",
        text:
          "It can store surplus locally generated electricity for later use.",
      },
      {
        id: "option-b",
        text:
          "It requires surplus locally generated electricity to be supplied immediately to the grid.",
      },
      {
        id: "option-c",
        text:
          "It prevents locally generated electricity from being used directly by the building.",
      },
      {
        id: "option-d",
        text:
          "It replaces the need to monitor electricity generation and consumption.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Storage can retain surplus locally generated electricity for later use, increasing the utilisation of on-site electricity generation.",
  },

  {
    id: "electricity-question-03",
    sectionId: "electricity-domain",
    lessonId: "electricity-overview",

    prompt:
      "How are the Electricity-domain services distributed between Catalogues A and B?",

    options: [
    {
      id: "option-a",
      text:
        "A & B: all seven Electricity-domain services · B only: none",
    },
    {
      id: "option-b",
      text:
        "A & B: self-consumption optimisation, CHP control and (micro)grid support · B only: local-generation reporting, storage of locally generated electricity, energy-storage reporting and electricity-consumption reporting",
    },
    {
      id: "option-c",
      text:
        "A & B: local-generation reporting and energy-storage reporting · B only: storage of locally generated electricity, self-consumption optimisation, CHP control, (micro)grid support and electricity-consumption reporting",
    },
    {
      id: "option-d",
      text:
        "A & B: local-generation reporting, storage of locally generated electricity, energy-storage reporting and electricity-consumption reporting · B only: self-consumption optimisation, CHP control and (micro)grid support",
    },
  ],
    correctOptionId: "option-d",

    explanation:
      "E2, E3, E11 and E12 are included in Catalogues A and B. E4, E5 and E8 are included only in Catalogue B.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — Local Electricity Generation Reporting                         */
/* -------------------------------------------------------------------------- */

export const localElectricityGenerationReportingQuestions = [
  {
    id: "electricity-question-04",
    sectionId: "electricity-domain",
    lessonId: "local-electricity-generation-reporting",

    prompt:
      "A building imports all of its electricity from the grid and has no on-site electricity-generation system. How should Reporting Information Regarding Local Electricity Generation (E2) be treated?",

    options: [
      {
        id: "option-a",
        text:
          "As Level 0, because no generation data are reported.",
      },
      {
        id: "option-b",
        text:
          "As Level 1, because electricity is supplied by the grid.",
      },
      {
        id: "option-c",
        text:
          "As not applicable, because the building has no local energy generation.",
      },
      {
        id: "option-d",
        text:
          "As applicable whenever electricity consumption can be monitored.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "E2 is applicable only when local energy generation is present.",
  },

  {
    id: "electricity-question-05",
    sectionId: "electricity-domain",
    lessonId: "local-electricity-generation-reporting",

    prompt:
      "What information is provided at Level 2 of local electricity-generation reporting (E2)?",

    options: [
      {
        id: "option-a",
        text:
          "Performance evaluation through forecasting or benchmarking.",
      },
      {
        id: "option-b",
        text:
          "Only current electricity-generation data.",
      },
      {
        id: "option-c",
        text:
          "Current generation values together with historical data.",
      },
      {
        id: "option-d",
        text:
          "Predictive management and fault detection.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "At E2 Level 2, current generation values and historical data are available. Forecasting or benchmarking appears at Level 3, while predictive management and fault detection are added at Level 4.",
  },

  {
    id: "electricity-question-06",
    sectionId: "electricity-domain",
    lessonId: "local-electricity-generation-reporting",

    prompt:
      "What is added at Level 4 of local electricity-generation reporting (E2) compared with Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "Current generation data become available for the first time.",
      },
      {
        id: "option-b",
        text:
          "Historical generation data are added to current values.",
      },
      {
        id: "option-c",
        text:
          "Performance evaluation through forecasting or benchmarking is introduced.",
      },
      {
        id: "option-d",
        text:
          "Predictive management and fault detection are added.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "E2 Level 3 already provides performance evaluation through forecasting, benchmarking, or both. Level 4 retains those functions and additionally provides predictive management and fault detection.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — Electricity Storage and Self-Consumption                       */
/* -------------------------------------------------------------------------- */

export const electricityStorageAndSelfConsumptionQuestions = [
  {
    id: "electricity-question-07",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-self-consumption",

    prompt:
      "A building uses one function to manage stored energy and another to shift electrical loads so that more locally generated renewable electricity can be used. Which mapping is correct?",

    options: [
      {
        id: "option-a",
        text:
          "Storage of (Locally Generated) Electricity (E3) manages stored energy, while Optimizing Self-Consumption of Locally Generated Electricity (E4) manages electricity consumption to improve self-consumption.",
      },
      {
        id: "option-b",
        text:
          "Optimizing Self-Consumption of Locally Generated Electricity (E4) manages stored energy, while Storage of (Locally Generated) Electricity (E3) manages electricity consumption to improve self-consumption.",
      },
      {
        id: "option-c",
        text:
          "Reporting Information Regarding Local Electricity Generation (E2) manages stored energy, while Reporting Information Regarding Energy Storage (E11) manages electricity consumption to improve self-consumption.",
      },
      {
        id: "option-d",
        text:
          "Support of (Micro)grid Operation Modes (E8) manages stored energy, while Control of Combined Heat and Power Plant (CHP) (E5) manages electricity consumption to improve self-consumption.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "E3 concerns the storage of locally generated electricity and operation of the storage controller. E4 concerns scheduling or automated management of electricity consumption to improve the use of locally generated renewable electricity.",
  },

  {
    id: "electricity-question-08",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-self-consumption",

    prompt:
      "Which capability characterises Level 2 of locally generated electricity storage (E3)?",

    options: [
      {
        id: "option-a",
        text:
          "Basic on-site electricity storage without grid-based control.",
      },
      {
        id: "option-b",
        text:
          "Optimisation of the use of locally generated electricity.",
      },
      {
        id: "option-c",
        text:
          "On-site energy storage controlled according to electricity-grid signals.",
      },
      {
        id: "option-d",
        text:
          "Optimised local-electricity use with the possibility to feed energy back into the grid.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "At E3 Level 2, the storage controller receives and processes electricity-grid signals, such as pricing or load-shifting signals.",
  },

  {
    id: "electricity-question-09",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-self-consumption",

    prompt:
      "What is added at Level 4 of locally generated electricity storage (E3) compared with Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "Control based on electricity-grid signals is introduced for the first time.",
      },
      {
        id: "option-b",
        text:
          "The possibility to feed stored energy back into the electricity grid.",
      },
      {
        id: "option-c",
        text:
          "Basic on-site electricity storage becomes available for the first time.",
      },
      {
        id: "option-d",
        text:
          "Optimisation of locally generated electricity is replaced by fixed scheduling.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "E3 Level 4 retains the Level 3 optimisation of locally generated electricity and additionally allows energy to be supplied back to the electricity grid.",
  },

  {
    id: "electricity-question-10",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-self-consumption",

    prompt:
      "What distinguishes Level 2 of self-consumption optimisation (E4) from Level 1?",

    options: [
      {
        id: "option-a",
        text:
          "Consumption is automatically adapted to current renewable-energy availability instead of relying only on scheduled operation.",
      },
      {
        id: "option-b",
        text:
          "Consumption is managed using current and predicted energy needs together with renewable-energy availability.",
      },
      {
        id: "option-c",
        text:
          "Consumption is no longer managed according to the availability of locally generated renewable electricity.",
      },
      {
        id: "option-d",
        text:
          "Stored electricity can be supplied back to the electricity grid according to grid signals.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "E4 Level 1 schedules electricity consumption. At Level 2, electricity consumption is automatically adapted to the current availability of renewable energy.",
  },

  {
    id: "electricity-question-11",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-self-consumption",

    prompt:
      "What distinguishes Level 3 of self-consumption optimisation (E4) from Level 2?",

    options: [
      {
        id: "option-a",
        text:
          "Level 3 returns to scheduled operation of electrical loads.",
      },
      {
        id: "option-b",
        text:
          "Level 3 continues to use only current renewable-energy availability.",
      },
      {
        id: "option-c",
        text:
          "Level 3 introduces storage control based on electricity-grid signals.",
      },
      {
        id: "option-d",
        text:
          "Level 3 uses current and predicted energy needs together with renewable-energy availability.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
  "E4 Level 3 extends the automated management of Level 2 by using current and predicted energy needs together with renewable-energy availability. Additional inputs such as weather and occupancy data can support these predictions.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 4 — CHP Control and (Micro)grid Operation                           */
/* -------------------------------------------------------------------------- */

export const chpControlAndMicrogridOperationQuestions = [
  {
    id: "electricity-question-12",
    sectionId: "electricity-domain",
    lessonId: "chp-control-and-microgrid-operation",

    prompt:
      "A CHP plant adjusts its runtime according to the fluctuating availability of renewable energy, and overproduction can be fed into the electricity grid. Grid signals are not yet used for its control. Which functionality level of Control of Combined Heat and Power Plant (CHP) (E5) does this represent?",

    options: [
      {
        id: "option-a",
        text: "Level 0",
      },
      {
        id: "option-b",
        text: "Level 1",
      },
      {
        id: "option-c",
        text: "Level 2",
      },
      {
        id: "option-d",
        text: "Not applicable",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "E5 Level 1 controls CHP runtime according to the fluctuating availability of renewable energy and allows overproduction to be fed into the grid. Level 2 additionally incorporates grid signals.",
  },

  {
    id: "electricity-question-13",
    sectionId: "electricity-domain",
    lessonId: "chp-control-and-microgrid-operation",

    prompt:
      "Which sequence correctly describes the progression of CHP control (E5)?",

    options: [
    {
      id: "option-a",
      text:
        "Scheduled runtime or current heat demand → renewable-energy availability → limited off-grid operation in island mode.",
    },
    {
      id: "option-b",
      text:
        "Scheduled runtime or current heat demand → storage control based on grid signals → optimisation of locally generated electricity.",
    },
    {
      id: "option-c",
      text:
        "Scheduled runtime or current heat demand → renewable-energy availability with grid feed-in → renewable-energy availability plus grid signals and control to optimise self-consumption.",
    },
    {
      id: "option-d",
      text:
        "Scheduled runtime or current heat demand → renewable-energy availability with grid feed-in → management of electricity consumption and supply within a (micro)grid.",
    },
  ],
    correctOptionId: "option-c",

    explanation:
      "E5 Level 0 already controls CHP operation according to scheduled runtime and/or current heat demand. Level 1 introduces control influenced by renewable-energy availability, with overproduction fed into the grid. Level 2 additionally uses grid signals and dynamic control to optimise renewable-energy self-consumption.",
  },

  {
    id: "electricity-question-14",
    sectionId: "electricity-domain",
    lessonId: "chp-control-and-microgrid-operation",

    prompt:
      "When is Support of (Micro)grid Operation Modes (E8) applicable?",

    options: [
      {
        id: "option-a",
        text:
          "When local energy storage is present.",
      },
      {
        id: "option-b",
        text:
          "Whenever local electricity generation exists, even without storage.",
      },
      {
        id: "option-c",
        text:
          "Only when a combined heat and power plant is present.",
      },
      {
        id: "option-d",
        text:
          "Only when appliance-level electricity monitoring is available.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "E8 is applicable only when local energy storage is present.",
  },

  {
    id: "electricity-question-15",
    sectionId: "electricity-domain",
    lessonId: "chp-control-and-microgrid-operation",

    prompt:
      "Which sequence correctly describes the progression of (micro)grid operation support (E8)?",

    options: [
      {
        id: "option-a",
        text:
          "No function → appliance-level monitoring → building-level benchmarking → personalised recommendations.",
      },
      {
        id: "option-b",
        text:
          "No function → grid-signal consumption management → island mode → electricity supply to neighbouring buildings.",
      },
      {
        id: "option-c",
        text:
          "No function → local-generation reporting → storage control based on grid signals → island mode.",
      },
      {
        id: "option-d",
        text:
          "No function → grid-signal consumption management → consumption and supply management → limited island-mode operation.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "E8 progresses from no (micro)grid function to grid-signal-based management of building electricity consumption, then to management of both consumption and electricity supply, and finally to the possibility of limited off-grid or island-mode operation.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 5 — Electricity Storage and Consumption Reporting                  */
/* -------------------------------------------------------------------------- */

export const electricityStorageAndConsumptionReportingQuestions = [
  {
    id: "electricity-question-16",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-consumption-reporting",

    prompt:
  "A system provides state-of-charge information, historical charging and discharging data, performance evaluation and fault detection. Which Electricity-domain service assesses these capabilities?",

    options: [
      {
        id: "option-a",
        text:
          "Storage of (Locally Generated) Electricity (E3)",
      },
      {
        id: "option-b",
        text:
          "Reporting Information Regarding Energy Storage (E11)",
      },
      {
        id: "option-c",
        text:
          "Reporting Information Regarding Electricity Consumption (E12)",
      },
      {
        id: "option-d",
        text:
          "Reporting Information Regarding Local Electricity Generation (E2)",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "E11 concerns information about the state and performance of an energy-storage system, including state-of-charge data, historical information, performance evaluation and, at the highest level, predictive management and fault detection.",
  },

  {
    id: "electricity-question-17",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-consumption-reporting",

    prompt:
      "What information is available at Level 2 of energy-storage reporting (E11)?",

    options: [
      {
        id: "option-a",
        text:
          "Performance evaluation through forecasting or benchmarking.",
      },
      {
        id: "option-b",
        text:
          "Only the current state of charge of the storage system.",
      },
      {
        id: "option-c",
        text:
          "Current state-of-charge values together with historical storage data.",
      },
      {
        id: "option-d",
        text:
          "Predictive management and fault detection.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "E11 Level 2 provides current state-of-charge information together with historical data. These data can be used to identify charging and discharging patterns and help users recognise operating problems.",
  },

  {
    id: "electricity-question-18",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-consumption-reporting",

    prompt:
      "What is added at Level 4 of energy-storage reporting (E11) compared with Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "Predictive management and fault detection.",
      },
      {
        id: "option-b",
        text:
          "Current state-of-charge information becomes available for the first time.",
      },
      {
        id: "option-c",
        text:
          "Historical storage data are added to current values.",
      },
      {
        id: "option-d",
        text:
          "Performance evaluation through forecasting or benchmarking is introduced.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "E11 Level 3 already includes performance evaluation through forecasting, benchmarking, or both. Level 4 retains these functions and additionally provides predictive management and fault detection.",
  },

  {
    id: "electricity-question-19",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-consumption-reporting",

    prompt:
      "What distinguishes Level 3 of electricity-consumption reporting (E12) from Level 2?",

    options: [
      {
        id: "option-a",
        text:
          "Level 3 introduces current electricity-consumption reporting at building level.",
      },
      {
        id: "option-b",
        text:
          "Level 3 moves real-time feedback or benchmarking from building level to appliance level.",
      },
      {
        id: "option-c",
        text:
          "Level 3 adds automated personalised recommendations to appliance-level information.",
      },
      {
        id: "option-d",
        text:
          "Level 3 replaces electricity-consumption reporting with information about energy storage.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "E12 Level 2 provides real-time feedback or benchmarking at building level. Level 3 provides real-time feedback or benchmarking at appliance level.",
  },

  {
    id: "electricity-question-20",
    sectionId: "electricity-domain",
    lessonId: "electricity-storage-and-consumption-reporting",

    prompt:
      "What is added at Level 4 of electricity-consumption reporting (E12) compared with Level 3?",

    options: [
      {
        id: "option-a",
        text:
          "Current electricity consumption is reported only at building level.",
      },
      {
        id: "option-b",
        text:
          "Benchmarking is removed and only appliance-level measurements remain.",
      },
      {
        id: "option-c",
        text:
          "Energy-storage operation is controlled according to electricity-grid signals.",
      },
      {
        id: "option-d",
        text:
          "Automated personalised recommendations for reducing electricity consumption.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "E12 Level 4 retains appliance-level feedback or benchmarking and additionally provides automated personalised recommendations using information such as consumption profiles, user preferences or benchmarking data.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const electricityQuestionsByLesson = {
  "electricity-overview":
    electricityOverviewQuestions,

  "local-electricity-generation-reporting":
    localElectricityGenerationReportingQuestions,

  "electricity-storage-and-self-consumption":
    electricityStorageAndSelfConsumptionQuestions,

  "chp-control-and-microgrid-operation":
    chpControlAndMicrogridOperationQuestions,

  "electricity-storage-and-consumption-reporting":
    electricityStorageAndConsumptionReportingQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 9 question pool                                           */
/* -------------------------------------------------------------------------- */

export const electricityQuestionPool = [
  ...electricityOverviewQuestions,
  ...localElectricityGenerationReportingQuestions,
  ...electricityStorageAndSelfConsumptionQuestions,
  ...chpControlAndMicrogridOperationQuestions,
  ...electricityStorageAndConsumptionReportingQuestions,
] satisfies readonly CourseQuestion[];