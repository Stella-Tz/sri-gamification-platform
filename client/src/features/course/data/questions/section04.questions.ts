// client/src/features/course/data/questions/section04.questions.ts

import type { CourseQuestion } from "../../course.types";

/*
 * Section 4 — Cooling
 *
 * Questions focus on the main concepts required to understand
 * the Cooling domain and its smart-ready services.
 *
 * The quizzes do not require memorisation of service codes.
 * They focus on:
 * - what is assessed,
 * - when a service is relevant,
 * - and what distinguishes its functionality levels.
 *
 * Distractors are based, wherever possible, on real functions,
 * inputs or functionality levels introduced in the theory.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Cooling Final Test uses the complete question
 * pool exported at the bottom of this file.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Cooling Overview                                                */
/* -------------------------------------------------------------------------- */

export const coolingOverviewQuestions = [
  {
    id: "cooling-question-01",
    sectionId: "cooling-domain",
    lessonId: "cooling-overview",

    prompt:
      "Which set contains only functions assessed within the SRI Cooling domain?",

    options: [
      {
        id: "option-a",
        text:
          "Emission control, DHW storage, generator sequencing and performance reporting.",
      },
      {
        id: "option-b",
        text:
          "Pump control, ventilation heat recovery, thermal storage and grid interaction.",
      },
      {
        id: "option-c",
        text:
          "Emission control, pump control, generator sequencing and performance reporting.",
      },
      {
        id: "option-d",
        text:
          "Chilled-water control, lighting control, thermal storage and generator capacity.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "The Cooling domain includes services for cooling emission and distribution, cooling generation, thermal-energy storage, heating-cooling coordination, flexibility and cooling-system performance reporting.",
  },

  {
    id: "cooling-question-02",
    sectionId: "cooling-domain",
    lessonId: "cooling-overview",

    prompt:
      "What does the SRI Cooling-domain assessment primarily examine?",

    options: [
      {
        id: "option-a",
        text:
          "How cooling is produced locally, centrally or through district cooling.",
      },
      {
        id: "option-b",
        text:
          "Which Cooling services are included, without considering their functionality levels.",
      },
      {
        id: "option-c",
        text:
          "The assessed Cooling services and their corresponding functionality levels.",
      },
      {
        id: "option-d",
        text:
          "Whether mechanical cooling is present, without considering its control functions.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "The Cooling domain is assessed through the relevant smart-ready services and the functionality level identified for each service to be assessed.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — Cooling Emission, Distribution and Interlock Control            */
/* -------------------------------------------------------------------------- */

export const coolingEmissionAndDistributionQuestions = [
  {
    id: "cooling-question-03",
    sectionId: "cooling-domain",
    lessonId:
      "cooling-emission-and-distribution-control",

    prompt:
      "For Emission Control for TABS — Cooling Mode (C1b), a TABS cooling system already uses advanced central automatic control. What distinguishes the next functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Individual room control with BACS communication.",
      },
      {
        id: "option-b",
        text:
          "Intermittent operation and/or room-temperature feedback control.",
      },
      {
        id: "option-c",
        text:
          "Variable-speed pump control using an external demand signal.",
      },
      {
        id: "option-d",
        text:
          "Cooling-generator sequencing based on load prediction.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "For TABS cooling, advanced central automatic control is followed by a functionality level that adds intermittent operation, room-temperature feedback control, or both.",
  },

  {
    id: "cooling-question-04",
    sectionId: "cooling-domain",
    lessonId:
      "cooling-emission-and-distribution-control",

    prompt:
      "For Cooling Emission Control (C1a), a room has individual cooling-emission control, but the room controller does not communicate with BACS or other systems outside the room. Which functionality level does this represent?",

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
      "Level 2 provides individual room control without communication. Communication between the room controller and BACS or other systems outside the room is introduced at Level 3, while occupancy detection is added at Level 4.",
  },

  {
    id: "cooling-question-05",
    sectionId: "cooling-domain",
    lessonId:
      "cooling-emission-and-distribution-control",

    prompt:
      "For Control of Distribution-Network Chilled-Water Temperature (Supply or Return) (C1c), the chilled-water temperature is adjusted using indoor-temperature measurements. Which control approach does this represent?",

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
          "Constant-temperature control.",
      },
      {
        id: "option-d",
        text:
          "Variable-speed pump control based on differential pressure.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Demand-based control adjusts the chilled-water temperature according to cooling demand using indoor-temperature measurements. Outside-temperature-compensated control instead uses outside temperature.",
  },

  {
    id: "cooling-question-06",
    sectionId: "cooling-domain",
    lessonId:
      "cooling-emission-and-distribution-control",

    prompt:
      "For Control of Distribution Pumps in Networks (C1d), which statement correctly distinguishes the two highest functionality levels?",

    options: [
      {
        id: "option-a",
        text:
          "The lower of the two uses internal pump-unit estimations, while the highest follows an external demand signal.",
      },
      {
        id: "option-b",
        text:
          "The lower of the two follows an external demand signal, while the highest uses internal pump-unit estimations.",
      },
      {
        id: "option-c",
        text:
          "The lower of the two uses fixed-speed staging, while the highest uses internal pump-unit estimations.",
      },
      {
        id: "option-d",
        text:
          "The lower of the two uses automatic on/off control, while the highest uses fixed-speed staging.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "The two highest functionality levels both use variable-speed pump control. The lower of the two relies on internal pump-unit estimations, while the highest follows an external demand signal.",
  },

  {
    id: "cooling-question-07",
    sectionId: "cooling-domain",
    lessonId:
      "cooling-emission-and-distribution-control",

    prompt:
      "For heating-cooling interlock (C1f), which statement correctly distinguishes partial interlock from total interlock?",

    options: [
      {
        id: "option-a",
        text:
          "Partial interlock prevents simultaneous operation; total interlock only reduces the risk.",
      },
      {
        id: "option-b",
        text:
          "Partial interlock reduces the risk; total interlock prevents simultaneous operation.",
      },
      {
        id: "option-c",
        text:
          "Partial interlock means independent control; total interlock uses sliding setpoints.",
      },
      {
        id: "option-d",
        text:
          "Partial interlock uses sliding setpoints; total interlock keeps the systems independent.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Partial interlock minimises the risk of simultaneous heating and cooling, for example through sliding setpoints. Total interlock ensures that heating and cooling cannot take place simultaneously in the same room.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — Cooling Generation Control                                      */
/* -------------------------------------------------------------------------- */

export const coolingGenerationControlQuestions = [
  {
    id: "cooling-question-08",
    sectionId: "cooling-domain",
    lessonId: "cooling-generation-control",

    prompt:
      "Which two aspects of cooling generation are assessed within the SRI Cooling domain?",

    options: [
      {
        id: "option-a",
        text:
          "Emission control and distribution-pump control.",
      },
      {
        id: "option-b",
        text:
          "Thermal-storage control and grid interaction.",
      },
      {
        id: "option-c",
        text:
          "Cooling-capacity control and generator sequencing.",
      },
      {
        id: "option-d",
        text:
          "Performance reporting and heating-cooling interlock.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Cooling-generation assessment considers both control of cooling-production capacity and the sequencing of different cooling generators when multiple generators are present.",
  },

  {
    id: "cooling-question-09",
    sectionId: "cooling-domain",
    lessonId: "cooling-generation-control",

    prompt:
      "For Generator Control for Cooling (C2a), a cooling generator already varies its production capacity according to cooling load or demand. What additional feature characterises the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Generator running times.",
      },
      {
        id: "option-b",
        text:
          "External electricity-grid signals.",
      },
      {
        id: "option-c",
        text:
          "Outside-temperature measurements.",
      },
      {
        id: "option-d",
        text:
          "Historical performance data.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "At the highest generator-capacity control level, variable capacity still responds to cooling load or demand and can additionally respond to external signals from the electricity grid.",
  },

  {
    id: "cooling-question-10",
    sectionId: "cooling-domain",
    lessonId: "cooling-generation-control",

    prompt:
      "A cooling installation has several production units. The assessment examines the control logic used to decide which unit should operate first under changing conditions. Which SRI Cooling service is being assessed?",

    options: [
      {
        id: "option-a",
        text:
          "Generator Control for Cooling (C2a).",
      },
      {
        id: "option-b",
        text:
          "Sequencing of Different Cooling Generators (C2b).",
      },
      {
        id: "option-c",
        text:
          "Control of Thermal Energy Storage (TES) Operation (C1g).",
      },
      {
        id: "option-d",
        text:
          "Provision of Information Regarding Cooling-System Performance (C3).",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Sequencing of Different Cooling Generators (C2b) assesses how the operating priority of multiple cooling generators is determined.",
  },

  {
    id: "cooling-question-11",
    sectionId: "cooling-domain",
    lessonId: "cooling-generation-control",

    prompt:
      "For Sequencing of Different Cooling Generators (C2b), a cooling-generator sequencing system already uses load prediction. What additional feature distinguishes the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "External electricity-grid signals.",
      },
      {
        id: "option-b",
        text:
          "A fixed priority sequence.",
      },
      {
        id: "option-c",
        text:
          "Generator running-time balance.",
      },
      {
        id: "option-d",
        text:
          "Free-cooling availability.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "After load-prediction-based sequencing, the highest functionality level uses a dynamic priority list that also takes external electricity-grid signals into account.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 4 — Thermal Energy Storage and Grid Interaction                     */
/* -------------------------------------------------------------------------- */

export const coolingStorageAndGridInteractionQuestions = [
  {
    id: "cooling-question-12",
    sectionId: "cooling-domain",
    lessonId: "cooling-storage-and-grid-interaction",

    prompt:
      "For Control of Thermal Energy Storage (TES) Operation (C1g), a mechanical cooling system uses TABS but has no separate TES system. How should this service be treated in the Cooling assessment?",

    options: [
      {
        id: "option-a",
        text:
          "It is applicable because TABS are treated as Thermal Energy Storage for this service.",
      },
      {
        id: "option-b",
        text:
          "It is not applicable because TABS are not considered Thermal Energy Storage for this service.",
      },
      {
        id: "option-c",
        text:
          "It is applicable because hydronic cooling distribution is sufficient.",
      },
      {
        id: "option-d",
        text:
          "It is applicable whenever more than one cooling generator is present.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Control of Thermal Energy Storage (TES) Operation (C1g) is applicable when mechanical cooling includes a Thermal Energy Storage system. TABS are not considered Thermal Energy Storage for this service.",
  },

  {
    id: "cooling-question-13",
    sectionId: "cooling-domain",
    lessonId:
      "cooling-storage-and-grid-interaction",

    prompt:
      "For Control of Thermal Energy Storage (TES) Operation (C1g), cooling storage already operates according to predicted cooling load. What additional feature characterises the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "A predefined operating schedule.",
      },
      {
        id: "option-b",
        text:
          "Electricity-grid signals.",
      },
      {
        id: "option-c",
        text:
          "Continuous storage operation.",
      },
      {
        id: "option-d",
        text:
          "Outside-temperature compensation.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "At the highest storage-control functionality level, charging is prioritised according to signals received from the electricity grid.",
  },

  {
    id: "cooling-question-14",
    sectionId: "cooling-domain",
    lessonId: "cooling-storage-and-grid-interaction",

    prompt:
      "A cooling controller can modify the operation of one or more cooling-system components in response to external signals while aiming to minimise effects on indoor comfort. Which SRI Cooling service is being assessed?",

    options: [
      {
        id: "option-a",
        text:
          "Provision of Information Regarding Cooling-System Performance (C3).",
      },
      {
        id: "option-b",
        text:
          "Interlock: Avoiding Simultaneous Heating and Cooling in the Same Room (C1f).",
      },
      {
        id: "option-c",
        text:
          "Sequencing of Different Cooling Generators (C2b).",
      },
      {
        id: "option-d",
        text:
          "Flexibility and Interaction with the Electricity Grid (C4).",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "Cooling flexibility and grid interaction assesses whether one or more cooling-system components or subsystems can adapt their operation to provide flexibility services or interact with the electricity grid while minimising effects on indoor comfort.",
  },

  {
    id: "cooling-question-15",
    sectionId: "cooling-domain",
    lessonId:
      "cooling-storage-and-grid-interaction",

    prompt:
      "For Flexibility and Interaction with the Electricity Grid (C4), a cooling system can already modify its operation in response to electricity-grid signals. What additional capability characterises the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Current KPIs and historical data.",
      },
      {
        id: "option-b",
        text:
          "A predefined operating schedule.",
      },
      {
        id: "option-c",
        text:
          "Local predictions and predicted system performance.",
      },
      {
        id: "option-d",
        text:
          "An external pump-demand signal.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "At the highest functionality level, cooling-system operation uses external electricity-grid signals together with local predictions and predicted system performance.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 5 — Cooling-System Performance Reporting                            */
/* -------------------------------------------------------------------------- */

export const coolingSystemPerformanceReportingQuestions = [
  {
    id: "cooling-question-16",
    sectionId: "cooling-domain",
    lessonId: "cooling-system-performance-reporting",

    prompt:
      "For Provision of Information Regarding Cooling-System Performance (C3), a reporting system provides current performance indicators and historical data, but does not yet evaluate them through forecasting or benchmarking. Which functionality level does this represent?",

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
    id: "cooling-question-17",
    sectionId: "cooling-domain",
    lessonId:
      "cooling-system-performance-reporting",

    prompt:
      "For Provision of Information Regarding Cooling-System Performance (C3), a reporting system already supports performance evaluation with forecasting or benchmarking. What additional capabilities distinguish the highest functionality level?",

    options: [
      {
        id: "option-a",
        text:
          "Current KPIs and historical data.",
      },
      {
        id: "option-b",
        text:
          "Predictive management and fault detection.",
      },
      {
        id: "option-c",
        text:
          "Generator efficiency and characteristics.",
      },
      {
        id: "option-d",
        text:
          "Local predictions and grid signals.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "The highest reporting functionality level retains performance evaluation with forecasting or benchmarking and additionally includes predictive management and fault detection.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const coolingQuestionsByLesson = {
  "cooling-overview":
    coolingOverviewQuestions,

  "cooling-emission-and-distribution-control":
    coolingEmissionAndDistributionQuestions,

  "cooling-generation-control":
    coolingGenerationControlQuestions,

  "cooling-storage-and-grid-interaction":
    coolingStorageAndGridInteractionQuestions,

  "cooling-system-performance-reporting":
    coolingSystemPerformanceReportingQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 4 question pool                                           */
/* -------------------------------------------------------------------------- */

export const coolingQuestionPool = [
  ...coolingOverviewQuestions,
  ...coolingEmissionAndDistributionQuestions,
  ...coolingGenerationControlQuestions,
  ...coolingStorageAndGridInteractionQuestions,
  ...coolingSystemPerformanceReportingQuestions,
] satisfies readonly CourseQuestion[];