// client/src/features/course/data/questions/section11.questions.ts

import type {
  CourseQuestion,
} from "../../course.types";

/*
 * Section 11 — Monitoring and Control
 *
 * Questions focus on the concepts required to understand
 * the Monitoring and Control domain and recognise its
 * smart-ready services and functionality levels in a later
 * SRI assessment.
 *
 * The quizzes do not require memorisation of service codes.
 * Service codes may appear as supporting context together
 * with the corresponding service title or concept.
 *
 * Questions focus primarily on:
 *
 * - the scope and catalogue structure of the Monitoring
 *   and Control domain,
 * - the distinction between neighbouring MC services,
 * - recognition of their functionality-level progressions,
 * - DSM and smart-grid interaction,
 * - and the special MC29 Level 1 impact-score case.
 *
 * Contextual technical information that is not central to
 * understanding the SRI assessment is not used as quiz
 * material.
 *
 * Distractors use real functionality levels or concepts
 * from the SRI theory rather than invented terminology.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Monitoring and Control Final Test uses the complete
 * question pool exported at the bottom of this file.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Monitoring and Control Overview                                 */
/* -------------------------------------------------------------------------- */

export const monitoringAndControlOverviewQuestions = [
  {
    id: "monitoring-control-question-01",
    sectionId: "monitoring-and-control-domain",
    lessonId: "monitoring-and-control-overview",

    prompt:
      "What does the Monitoring and Control domain primarily address?",

    options: [
      {
        id: "option-a",
        text:
          "The availability of electric-vehicle charging infrastructure at the building.",
      },
      {
        id: "option-b",
        text:
          "The control of movable shading and other dynamic-envelope elements.",
      },
      {
        id: "option-c",
        text:
          "Supervising and regulating the operation of technical building systems.",
      },
      {
        id: "option-d",
        text:
          "The control and reporting of local electricity generation and storage.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Monitoring and Control concerns the use of equipment, tools and methods to monitor and control the operation of technical building systems and support their robust operation.",
  },

  {
    id: "monitoring-control-question-02",
    sectionId: "monitoring-and-control-domain",
    lessonId: "monitoring-and-control-overview",

    prompt:
      "Which group contains only services from the Monitoring and Control domain?",

    options: [
      {
        id: "option-a",
        text:
          "HVAC run-time management, fault detection, occupancy detection and central TBS reporting.",
      },
      {
        id: "option-b",
        text:
          "Cooling generation control, daylight control, DHW storage control and EV charging capacity.",
      },
      {
        id: "option-c",
        text:
          "Dynamic-envelope control, ventilation heat recovery, local electricity generation and EV charging information.",
      },
      {
        id: "option-d",
        text:
          "Heating storage control, ventilation airflow control, lighting control and EV Charging Grid Balancing.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Monitoring and Control includes HVAC run-time management, fault detection, connected occupancy detection and central TBS reporting, together with smart-grid, DSM and cross-system coordination services.",
  },

  {
    id: "monitoring-control-question-03",
    sectionId: "monitoring-and-control-domain",
    lessonId: "monitoring-and-control-overview",

    prompt:
      "Which Monitoring and Control services are also included in Catalogue A?",

    options: [
      {
        id: "option-a",
        text:
          "HVAC Run Time Management, Fault Detection and Occupancy Detection.",
      },
      {
        id: "option-b",
        text:
          "Central Reporting, Smart Grid Integration and the Single Platform service.",
      },
      {
        id: "option-c",
        text:
          "Smart Grid Integration, DSM Reporting and DSM Override.",
      },
      {
        id: "option-d",
        text:
          "Occupancy Detection, Central Reporting and DSM Reporting.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "All eight Monitoring and Control services are included in Catalogue B. Central Reporting of TBS Performance and Energy Use (MC13), Smart Grid Integration (MC25), and the Single Platform service (MC30) are also included in Catalogue A.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — Occupancy Detection and Central Reporting                       */
/* -------------------------------------------------------------------------- */

export const occupancyDetectionAndCentralReportingQuestions = [
  {
    id: "monitoring-control-question-04",
    sectionId: "monitoring-and-control-domain",
    lessonId: "occupancy-detection-and-central-reporting",

    prompt:
      "For Occupancy Detection: Connected Services (MC9) and Central Reporting of TBS Performance and Energy Use (MC13), a building uses centralised occupancy detection that supplies several technical building systems and provides real-time energy-use reporting per energy carrier from at least two technical domains in one interface. Which combination of functionality levels is represented?",

    options: [
      {
        id: "option-a",
        text: "MC9 Level 2 and MC13 Level 2.",
      },
      {
        id: "option-b",
        text: "MC9 Level 1 and MC13 Level 2.",
      },
      {
        id: "option-c",
        text: "MC9 Level 2 and MC13 Level 3.",
      },
      {
        id: "option-d",
        text: "MC9 Level 1 and MC13 Level 1.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "MC9 Level 2 uses centralised occupancy detection that supplies several TBS. MC13 Level 2 provides real-time energy-use reporting per energy carrier and combines TBS from at least two technical domains in one interface.",
  },

  {
    id: "monitoring-control-question-05",
    sectionId: "monitoring-and-control-domain",
    lessonId: "occupancy-detection-and-central-reporting",

    prompt:
      "What distinguishes Level 2 from Level 1 in Occupancy Detection: Connected Services (MC9)?",

    options: [
      {
        id: "option-a",
        text:
          "Level 2 applies occupancy detection to an individual function such as lighting.",
      },
      {
        id: "option-b",
        text:
          "Level 2 provides real-time energy-use reporting per energy carrier.",
      },
      {
        id: "option-c",
        text:
          "Level 2 provides central fault indication for all relevant TBS.",
      },
      {
        id: "option-d",
        text:
          "Level 2 uses centralised occupancy detection that supplies several TBS.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "MC9 Level 1 applies occupancy detection to individual functions. At Level 2, centralised occupancy detection supplies several TBS and supports a coordinated response.",
  },

  {
    id: "monitoring-control-question-06",
    sectionId: "monitoring-and-control-domain",
    lessonId: "occupancy-detection-and-central-reporting",

    prompt:
      "What distinguishes Level 2 from Level 1 in Central Reporting of TBS Performance and Energy Use (MC13)?",

    options: [
      {
        id: "option-a",
        text:
          "Central or remote real-time reporting of energy use per energy carrier.",
      },
      {
        id: "option-b",
        text:
          "Real-time reporting per energy carrier combining all main technical domains.",
      },
      {
        id: "option-c",
        text:
          "Real-time reporting per energy carrier combining at least two technical domains.",
      },
      {
        id: "option-d",
        text:
          "Current DSM-status reporting including managed energy flows.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "MC13 Level 2 provides central or remote real-time energy-use reporting per energy carrier and combines TBS from at least two technical domains in one interface.",
  },

  {
    id: "monitoring-control-question-07",
    sectionId: "monitoring-and-control-domain",
    lessonId: "occupancy-detection-and-central-reporting",

    prompt:
      "What distinguishes Level 3 from Level 2 in Central Reporting of TBS Performance and Energy Use (MC13)?",

    options: [
      {
        id: "option-a",
        text:
          "Level 3 combines TBS from all main technical domains in one reporting interface.",
      },
      {
        id: "option-b",
        text:
          "Level 3 combines TBS from at least two technical domains in one reporting interface.",
      },
      {
        id: "option-c",
        text:
          "Level 3 reports current, historical and predicted DSM status.",
      },
      {
        id: "option-d",
        text:
          "Level 3 adds diagnostic functions for all relevant TBS.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "MC13 Level 2 combines TBS from at least two domains in one interface. Level 3 extends the central or remote reporting to TBS from all main technical domains.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — HVAC Run Time Management and System Coordination                */
/* -------------------------------------------------------------------------- */

export const hvacRuntimeManagementAndSystemCoordinationQuestions = [
  {
    id: "monitoring-control-question-08",
    sectionId: "monitoring-and-control-domain",
    lessonId: "hvac-runtime-management-and-system-coordination",

    prompt:
      "For Run Time Management of HVAC Systems (MC3) and the Single Platform service (MC30), a building switches heating and cooling plants on or off according to building loads, while a single platform automatically controls and coordinates multiple technical building systems. Which combination of functionality levels is represented?",

    options: [
      {
        id: "option-a",
        text: "MC3 Level 2 and MC30 Level 2.",
      },
      {
        id: "option-b",
        text: "MC3 Level 1 and MC30 Level 2.",
      },
      {
        id: "option-c",
        text: "MC3 Level 2 and MC30 Level 1.",
      },
      {
        id: "option-d",
        text: "MC3 Level 3 and MC30 Level 3.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "MC3 Level 2 bases heating and cooling plant on/off control on building loads. MC30 Level 2 provides automated control and coordination between multiple TBS through a single platform.",
  },

  {
    id: "monitoring-control-question-09",
    sectionId: "monitoring-and-control-domain",
    lessonId: "hvac-runtime-management-and-system-coordination",

    prompt:
      "How is HVAC operation controlled at Level 2 of Run Time Management of HVAC Systems (MC3)?",

    options: [
      {
        id: "option-a",
        text:
          "HVAC settings are defined and changed manually.",
      },
      {
        id: "option-b",
        text:
          "Heating and cooling plant on/off control is based on building loads.",
      },
      {
        id: "option-c",
        text:
          "Heating and cooling operation follows a predefined time schedule.",
      },
      {
        id: "option-d",
        text:
          "Heating and cooling plant on/off control is based on predictive control or grid signals.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "At MC3 Level 2, the on/off operation of heating and cooling plants is based on the loads required by the building.",
  },

  {
    id: "monitoring-control-question-10",
    sectionId: "monitoring-and-control-domain",
    lessonId: "hvac-runtime-management-and-system-coordination",

    prompt:
      "Which capability represents Level 3 of Run Time Management of HVAC Systems (MC3)?",

    options: [
      {
        id: "option-a",
        text:
          "Manual definition and adjustment of HVAC settings.",
      },
      {
        id: "option-b",
        text:
          "Heating and cooling operation based on a predefined time schedule.",
      },
      {
        id: "option-c",
        text:
          "Heating and cooling plant on/off control based on building loads.",
      },
      {
        id: "option-d",
        text:
          "Plant on/off control is based on predictive control or electricity-grid signals.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "MC3 Level 3 uses predictive control or electricity-grid signals for heating and cooling plant on/off control. Predictive control can use historical and current data to determine an appropriate control strategy.",
  },

  {
    id: "monitoring-control-question-12",
    sectionId: "monitoring-and-control-domain",
    lessonId: "hvac-runtime-management-and-system-coordination",

    prompt:
      "What distinguishes Level 2 from Level 1 in the Single Platform service (MC30)?",

    options: [
      {
        id: "option-a",
        text:
          "Level 2 provides manual control of multiple TBS through one platform.",
      },
      {
        id: "option-b",
        text:
          "Level 2 provides automated control and coordination between TBS through the platform.",
      },
      {
        id: "option-c",
        text:
          "Level 2 adds energy-flow optimisation based on occupancy, weather and grid signals.",
      },
      {
        id: "option-d",
        text:
          "Level 2 provides coordinated demand-side management of multiple TBS.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "MC30 Level 1 provides manual control of multiple TBS through a single platform. Level 2 introduces automated control and coordination between the connected TBS.",
  },

  {
    id: "monitoring-control-question-11",
    sectionId: "monitoring-and-control-domain",
    lessonId: "hvac-runtime-management-and-system-coordination",

    prompt:
      "What is added at Level 3 compared with Level 2 in the Single Platform service (MC30)?",

    options: [
      {
        id: "option-a",
        text:
          "Energy-flow optimisation based on occupancy, weather and electricity-grid signals.",
      },
      {
        id: "option-b",
        text:
          "Manual control of multiple TBS through a single platform.",
      },
      {
        id: "option-c",
        text:
          "Automated control and coordination between TBS without energy-flow optimisation.",
      },
      {
        id: "option-d",
        text:
          "Coordinated demand-side management of multiple TBS.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "MC30 Level 2 provides automated control and coordination between TBS. Level 3 retains that functionality and adds energy-flow optimisation based on occupancy, weather and grid signals.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 4 — Fault Detection and Diagnostic Support                          */
/* -------------------------------------------------------------------------- */

export const faultDetectionAndDiagnosticSupportQuestions = [
  {
    id: "monitoring-control-question-13",
    sectionId: "monitoring-and-control-domain",
    lessonId: "fault-detection-and-diagnostic-support",

    prompt:
      "A building has no central indication of detected faults and alarms. Which functionality level of Fault Detection and Diagnostic Support (MC4) does this represent?",

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
        text: "Level 3",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "MC4 Level 0 corresponds to the absence of central indication of detected faults and alarms.",
  },

  {
    id: "monitoring-control-question-14",
    sectionId: "monitoring-and-control-domain",
    lessonId: "fault-detection-and-diagnostic-support",

    prompt:
      "What is the difference between Levels 1 and 2 of Fault Detection and Diagnostic Support (MC4)?",

    options: [
      {
        id: "option-a",
        text:
          "Level 1 covers all relevant TBS; Level 2 adds diagnosing functions.",
      },
      {
        id: "option-b",
        text:
          "Level 1 covers at least two relevant TBS; Level 2 covers all relevant TBS.",
      },
      {
        id: "option-c",
        text:
          "Level 1 has no central indication; Level 2 covers at least two relevant TBS.",
      },
      {
        id: "option-d",
        text:
          "Level 1 reports current DSM status; Level 2 adds historical DSM information.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "MC4 Level 1 provides central indication of detected faults and alarms for at least two relevant TBS. Level 2 extends this coverage to all relevant TBS.",
  },

  {
    id: "monitoring-control-question-15",
    sectionId: "monitoring-and-control-domain",
    lessonId: "fault-detection-and-diagnostic-support",

    prompt:
      "What additional capability is provided at Level 3 of Fault Detection and Diagnostic Support (MC4)?",

    options: [
      {
        id: "option-a",
        text:
          "Central fault indication for at least two relevant TBS.",
      },
      {
        id: "option-b",
        text:
          "Occupancy information supplied to several technical building systems.",
      },
      {
        id: "option-c",
        text:
          "Real-time energy-use reporting per energy carrier.",
      },
      {
        id: "option-d",
        text:
          "Diagnostic analysis that provides likely causes or sources of detected faults.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "MC4 Level 3 retains central fault indication for all relevant TBS and adds diagnosing functions that provide information about the most likely causes or sources of detected faults.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 5 — Demand-Side Management and Smart-Grid Interaction               */
/* -------------------------------------------------------------------------- */

export const demandSideManagementAndSmartGridInteractionQuestions = [
  {
    id: "monitoring-control-question-16",
    sectionId: "monitoring-and-control-domain",
    lessonId: "demand-side-management-and-smart-grid-interaction",

    prompt:
      "What distinguishes Level 2 from Level 1 in Smart Grid Integration (MC25)?",

    options: [
      {
        id: "option-a",
        text:
          "Demand-side management is performed independently by individual TBS.",
      },
      {
        id: "option-b",
        text:
          "Demand-side management is coordinated across multiple technical building systems.",
      },
      {
        id: "option-c",
        text:
          "The building operates independently from the electricity-grid load.",
      },
      {
        id: "option-d",
        text:
          "Current, historical and predicted DSM information is reported.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "MC25 Level 1 allows DSM for individual TBS without coordination across different domains. Level 2 introduces coordinated demand-side management of multiple TBS.",
  },

  {
    id: "monitoring-control-question-17",
    sectionId: "monitoring-and-control-domain",
    lessonId: "demand-side-management-and-smart-grid-interaction",

    prompt:
      "What information is provided at Level 2 of Reporting Information Regarding Demand Side Management Performance and Operation (MC28)?",

    options: [
      {
        id: "option-a",
        text:
          "Current, historical and predicted DSM-status information, including managed energy flows.",
      },
      {
        id: "option-b",
        text:
          "Only current DSM-status information, including managed energy flows.",
      },
      {
        id: "option-c",
        text:
          "No information about DSM performance or operation.",
      },
      {
        id: "option-d",
        text:
          "Scheduled override and reactivation of DSM control by the user.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "MC28 Level 2 provides information on current, historical and predicted DSM status, including managed energy flows. The reporting can also identify patterns, trends and unusual events.",
  },

  {
    id: "monitoring-control-question-18",
    sectionId: "monitoring-and-control-domain",
    lessonId: "demand-side-management-and-smart-grid-interaction",

    prompt:
      "What characterises Level 1 of Override of DSM Control (MC29)?",

    options: [
      {
        id: "option-a",
        text:
          "There is no DSM control.",
      },
      {
        id: "option-b",
        text:
          "The user can manually override and reactivate DSM control.",
      },
      {
        id: "option-c",
        text:
          "DSM control operates without a user-override function.",
      },
      {
        id: "option-d",
        text:
          "DSM override and reactivation follow a predefined schedule.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "At MC29 Level 1, DSM control operates without a user-override function, although intervention may still be possible in an emergency.",
  },

  {
    id: "monitoring-control-question-19",
    sectionId: "monitoring-and-control-domain",
    lessonId: "demand-side-management-and-smart-grid-interaction",

    prompt:
      "Which sequence correctly describes Levels 2, 3 and 4 of Override of DSM Control (MC29)?",

    options: [
      {
        id: "option-a",
        text:
          "Manual override and reactivation → DSM control without user override → scheduled override and reactivation with optimised control.",
      },
      {
        id: "option-b",
        text:
          "Scheduled override and reactivation → manual override and reactivation → scheduled override and reactivation with optimised control.",
      },
      {
        id: "option-c",
        text:
          "Manual override and reactivation → scheduled override and reactivation with optimised control → scheduled override and reactivation.",
      },
      {
        id: "option-d",
        text:
          "Manual override and reactivation → scheduled override and reactivation → scheduled override and reactivation with optimised control.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "MC29 progresses from manual override and reactivation at Level 2, to scheduled override and reactivation at Level 3, and then to scheduled override and reactivation with optimised control at Level 4.",
  },

  {
    id: "monitoring-control-question-20",
    sectionId: "monitoring-and-control-domain",
    lessonId: "demand-side-management-and-smart-grid-interaction",

    prompt:
      "Why is Level 1 of Override of DSM Control (MC29) a special case in impact scoring?",

    options: [
      {
        id: "option-a",
        text:
          "Because some Level 1 impact scores are negative, making them lower than the corresponding Level 0 scores.",
      },
      {
        id: "option-b",
        text:
          "Because Energy flexibility is the only impact criterion with a negative Level 1 score.",
      },
      {
        id: "option-c",
        text:
          "Because all seven impact criteria receive negative scores at Level 1.",
      },
      {
        id: "option-d",
        text:
          "Because Level 1 and Level 0 receive identical scores for every impact criterion.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "At MC29 Level 1, negative impact scores are assigned to Comfort (-2), Maintenance and fault prediction (-1), and Information to occupants (-2). For these criteria, DSM control without user override is scored worse than having no DSM control.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const monitoringAndControlQuestionsByLesson = {
  "monitoring-and-control-overview":
    monitoringAndControlOverviewQuestions,

  "occupancy-detection-and-central-reporting":
    occupancyDetectionAndCentralReportingQuestions,

  "hvac-runtime-management-and-system-coordination":
    hvacRuntimeManagementAndSystemCoordinationQuestions,

  "fault-detection-and-diagnostic-support":
    faultDetectionAndDiagnosticSupportQuestions,

  "demand-side-management-and-smart-grid-interaction":
    demandSideManagementAndSmartGridInteractionQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 11 question pool                                          */
/* -------------------------------------------------------------------------- */

export const monitoringAndControlQuestionPool = [
  ...monitoringAndControlOverviewQuestions,
  ...occupancyDetectionAndCentralReportingQuestions,
  ...hvacRuntimeManagementAndSystemCoordinationQuestions,
  ...faultDetectionAndDiagnosticSupportQuestions,
  ...demandSideManagementAndSmartGridInteractionQuestions,
] satisfies readonly CourseQuestion[];