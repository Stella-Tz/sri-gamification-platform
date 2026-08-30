// client/src/features/course/data/questions/section05.questions.ts

import type { CourseQuestion } from "../../course.types";

/*
 * Section 5 — Domestic Hot Water
 *
 * Questions focus on the concepts required to understand
 * the Domestic Hot Water domain and recognise its
 * smart-ready services in a later SRI assessment.
 *
 * The quizzes do not require memorisation of service codes.
 * Service codes may appear as context where they help distinguish
 * catalogue-specific definitions, but the questions focus on:
 *
 * - what is assessed,
 * - when a service is applicable,
 * - how functionality levels progress,
 * - and which capabilities distinguish neighbouring levels.
 *
 * Distractors are based, wherever possible, on real functions,
 * inputs or functionality levels introduced in the theory.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Domestic Hot Water Final Test uses the complete
 * question pool exported at the bottom of this file.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Domestic Hot Water Overview                                     */
/* -------------------------------------------------------------------------- */

export const domesticHotWaterOverviewQuestions = [
  {
    id: "domestic-hot-water-question-01",
    sectionId: "domestic-hot-water-domain",
    lessonId: "domestic-hot-water-overview",

    prompt:
      "Which set contains the main functions assessed within the SRI Domestic Hot Water domain?",

    options: [
      {
        id: "option-a",
        text:
          "Storage charging, ventilation airflow control and performance reporting.",
      },
      {
        id: "option-b",
        text:
          "Cooling emission control, generator sequencing and performance reporting.",
      },
      {
        id: "option-c",
        text:
          "Storage charging, generator sequencing and performance reporting.",
      },
      {
        id: "option-d",
        text:
          "Storage charging, lighting control and electric-vehicle charging.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "The Domestic Hot Water domain covers smart-ready services for storage-charging control, the sequencing of different domestic hot water generators, and the reporting and evaluation of system performance.",
  },

  {
    id: "domestic-hot-water-question-02",
    sectionId: "domestic-hot-water-domain",
    lessonId: "domestic-hot-water-overview",

    prompt:
      "Which control approach allows domestic hot water storage charging to respond directly to changing energy-system conditions?",

    options: [
      {
        id: "option-a",
        text:
          "Charging according to a fixed time schedule.",
      },
      {
        id: "option-b",
        text:
          "Automatic on/off control based on stored-water temperature.",
      },
      {
        id: "option-c",
        text:
          "Multi-sensor management of the remaining storage capacity.",
      },
      {
        id: "option-d",
        text:
          "Charging coordinated with local renewable availability or external energy-network signals.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "Charging can respond directly to changing energy-system conditions when its priority is coordinated with local renewable-energy availability or external energy-network signals.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — DHW Storage Charging Control                                    */
/* -------------------------------------------------------------------------- */

export const dhwStorageChargingControlQuestions = [
  {
    id: "domestic-hot-water-question-03",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-storage-charging-control",

    prompt:
      "A domestic hot water storage vessel is heated electrically. Which SRI storage-charging service is relevant to assess?",

    options: [
      {
        id: "option-a",
        text:
          "Control of DHW Storage Charging with a Solar Collector and Supplementary Heat Generation (DHW1d).",
      },
      {
        id: "option-b",
        text:
          "Control of DHW Storage Charging with Direct Electric Heating or an Integrated Electric Heat Pump (DHW1a).",
      },
      {
        id: "option-c",
        text:
          "Control of DHW Storage Charging Using Hot-Water Generation (DHW1b).",
      },
      {
        id: "option-d",
        text:
          "Sequencing in Case of Different Domestic Hot Water Generators (DHW2b).",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "DHW1a applies when domestic hot water storage with electric heating is present, including direct electric heating or an integrated electric heat pump.",
  },

  {
    id: "domestic-hot-water-question-04",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-storage-charging-control",

    prompt:
      "In Catalogue B, electric domestic hot water storage already uses scheduled charging and multi-sensor storage management. What additional capability marks the next functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Charging control based on local renewables or electricity-grid information.",
      },
      {
        id: "option-b",
        text:
          "Demand-based supply-temperature control with information provided to the heat generator.",
      },
      {
        id: "option-c",
        text:
          "Solar-priority charging with supplementary heat generation.",
      },
      {
        id: "option-d",
        text:
          "A fixed priority list for multiple heat generators.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "In Catalogue B, DHW1a Level 3 adds automatic charging control based on local renewable-energy availability or information from the electricity grid. Catalogue A uses only Levels 0–2.",
  },

  {
    id: "domestic-hot-water-question-05",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-storage-charging-control",

    prompt:
      "For the DHW storage-charging service used with non-electrical heat generation (DHW1b), how do Catalogue A and Catalogue B differ?",

    options: [
      {
        id: "option-a",
        text:
          "Catalogue A uses electric-storage levels; Catalogue B uses solar-assisted charging levels.",
      },
      {
        id: "option-b",
        text:
          "Catalogue A uses generator-priority levels; Catalogue B uses performance-reporting levels.",
      },
      {
        id: "option-c",
        text:
          "Catalogue A assesses storage availability and external-signal control; Catalogue B uses a detailed charging-control progression.",
      },
      {
        id: "option-d",
        text:
          "Catalogue A and Catalogue B use the same storage-charging functionality sequence.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Catalogue A assesses whether domestic hot water storage is available and whether it can respond to external signals. Catalogue B instead uses a detailed progression from automatic on/off control through scheduling, demand-based or multi-sensor control, and finally external-signal-based charging.",
  },

  {
    id: "domestic-hot-water-question-06",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-storage-charging-control",

    prompt:
      "In Catalogue B, domestic hot water storage charging using hot-water generation already uses automatic on/off control and a charging schedule. What additional capability characterises the next functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Solar-priority charging with supplementary heat generation.",
      },
      {
        id: "option-b",
        text:
          "Demand-based supply-temperature control or multi-sensor storage management.",
      },
      {
        id: "option-c",
        text:
          "Charging control based on local renewables or electricity-grid information.",
      },
      {
        id: "option-d",
        text:
          "A fixed priority list for multiple domestic hot water generators.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "At DHW1b Catalogue B Level 2, scheduled charging is combined with either demand-based supply-temperature control or multi-sensor storage management.",
  },

  {
    id: "domestic-hot-water-question-07",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-storage-charging-control",

    prompt:
      "For Control of DHW Storage Charging with a Solar Collector and Supplementary Heat Generation (DHW1d), solar charging has priority and the system uses demand-oriented supply- and return-temperature control together with multi-sensor storage management. Which functionality level does this represent?",

    options: [
      { id: "option-a", text: "Level 0." },
      { id: "option-b", text: "Level 1." },
      { id: "option-c", text: "Level 2." },
      { id: "option-d", text: "Level 3." },
    ],

    correctOptionId: "option-d",

    explanation:
      "Level 3 combines solar-priority charging with demand-oriented supply- and return-temperature control and multi-sensor storage management.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — Sequencing of Different DHW Generators                          */
/* -------------------------------------------------------------------------- */

export const dhwGeneratorSequencingQuestions = [
  {
    id: "domestic-hot-water-question-08",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-generator-sequencing",

    prompt:
      "A domestic hot water system can produce heat using several different heat-generating units. The assessment examines the control logic used to decide which unit should operate first as conditions change. Which SRI Domestic Hot Water service is being assessed?",

    options: [
      {
        id: "option-a",
        text:
          "Control of DHW Storage Charging with Direct Electric Heating or an Integrated Electric Heat Pump (DHW1a).",
      },
      {
        id: "option-b",
        text:
          "Control of DHW Storage Charging Using Hot-Water Generation (DHW1b).",
      },
      {
        id: "option-c",
        text:
          "Sequencing in Case of Different Domestic Hot Water Generators (DHW2b).",
      },
      {
        id: "option-d",
        text:
          "Report Information Regarding Domestic Hot Water Performance (DHW3).",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "DHW2b assesses how the operating priority of domestic hot water heat generators is determined when multiple heat generators are present.",
  },

  {
    id: "domestic-hot-water-question-09",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-generator-sequencing",

    prompt:
      "A generator-sequencing system currently sets priorities only to balance generator operating times. What characterises the next functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Dynamic priorities based on current efficiency, emissions and capacity.",
      },
      {
        id: "option-b",
        text:
          "Dynamic priorities that also use current and predicted load.",
      },
      {
        id: "option-c",
        text:
          "A fixed priority list, for example based on rated energy efficiency.",
      },
      {
        id: "option-d",
        text:
          "Dynamic priorities that also include electricity-grid signals.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "After operating-time-based priorities, the next functionality level uses a fixed priority list, for example one based on the rated energy efficiency of the generators.",
  },

  {
    id: "domestic-hot-water-question-10",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-generator-sequencing",

    prompt:
      "A generator-sequencing system already uses dynamic priorities based on current energy efficiency, carbon-dioxide emissions and generator capacity. What additional factor distinguishes the next functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "A fixed priority list based on rated energy efficiency.",
      },
      {
        id: "option-b",
        text:
          "Current and predicted domestic hot water load.",
      },
      {
        id: "option-c",
        text:
          "External electricity-grid signals.",
      },
      {
        id: "option-d",
        text:
          "Generator operating-time balancing.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "The next functionality level adds load prediction: generator priority considers both current and predicted load together with energy efficiency, carbon-dioxide emissions and generator capacity.",
  },

  {
    id: "domestic-hot-water-question-11",
    sectionId: "domestic-hot-water-domain",
    lessonId: "dhw-generator-sequencing",

    prompt:
      "A generator-sequencing system already considers current and predicted load, energy efficiency, carbon-dioxide emissions and generator capacity. What additional input characterises the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Historical domestic hot water performance data.",
      },
      {
        id: "option-b",
        text:
          "Multi-sensor estimates of storage capacity.",
      },
      {
        id: "option-c",
        text:
          "Solar-priority storage charging.",
      },
      {
        id: "option-d",
        text:
          "External electricity-grid signals.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "At the highest DHW generator-sequencing functionality level, the dynamic priority calculation additionally considers external signals from the electricity grid.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 4 — Domestic Hot Water Performance Information                      */
/* -------------------------------------------------------------------------- */

export const domesticHotWaterPerformanceInformationQuestions = [
  {
    id: "domestic-hot-water-question-12",
    sectionId: "domestic-hot-water-domain",
    lessonId: "domestic-hot-water-performance-information",

    prompt:
      "For Report Information Regarding Domestic Hot Water Performance (DHW3), a reporting system provides current performance indicators and historical data, but does not yet evaluate them through forecasting or benchmarking. Which functionality level does this represent?",

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
    id: "domestic-hot-water-question-13",
    sectionId: "domestic-hot-water-domain",
    lessonId: "domestic-hot-water-performance-information",

    prompt:
      "A domestic hot water reporting system already supports performance evaluation with forecasting or benchmarking. What is added at the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Historical performance data.",
      },
      {
        id: "option-b",
        text:
          "Dynamic generator sequencing.",
      },
      {
        id: "option-c",
        text:
          "Predictive management and fault detection.",
      },
      {
        id: "option-d",
        text:
          "Multi-sensor storage management.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "The highest DHW3 functionality level retains performance evaluation with forecasting or benchmarking and additionally includes predictive management and fault detection.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const domesticHotWaterQuestionsByLesson = {
  "domestic-hot-water-overview":
    domesticHotWaterOverviewQuestions,

  "dhw-storage-charging-control":
    dhwStorageChargingControlQuestions,

  "dhw-generator-sequencing":
    dhwGeneratorSequencingQuestions,

  "domestic-hot-water-performance-information":
    domesticHotWaterPerformanceInformationQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 5 question pool                                           */
/* -------------------------------------------------------------------------- */

export const domesticHotWaterQuestionPool = [
  ...domesticHotWaterOverviewQuestions,
  ...dhwStorageChargingControlQuestions,
  ...dhwGeneratorSequencingQuestions,
  ...domesticHotWaterPerformanceInformationQuestions,
] satisfies readonly CourseQuestion[];