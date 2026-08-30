//client\src\features\theory\data\sections\mc\mcLessons.ts

import type { TheoryLesson } from "../../../types/theory.types";

/**
 * Source policy for the Monitoring and Control domain:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and are cross-checked against the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Monitoring and Control material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership and assessment conditions. These are
 *   cross-checked against the Final Report and SRI2MARKET where the supporting
 *   material clarifies their technical meaning.
 *
 * - Service purposes, technical context, detailed functionality-level
 *   explanations, examples and visual material are based primarily on the
 *   corresponding SRI2MARKET Monitoring and Control material and are
 *   cross-checked against the consolidated catalogue definitions.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - No technical applicability condition is defined for the eight Monitoring
 *   and Control services. Assessment or inspectability guidance is not
 *   represented as an applicability field.
 *
 * - "Always to be assessed" is an assessment rule and is not treated as a
 *   technical applicability condition. MC30 is marked "Always to be assessed"
 *   in the SRI Calculation Sheet v4.5.
 *
 * - The MC29 default impact-score note is verified against the Practical Guide
 *   and the SRI Calculation Sheet v4.5.
 */

import monitoringAndControlDomainOverviewImage from "../../../../../assets/theory/section-11/lesson-1/monitoring-and-control-domain-overview.png";

import {
  mc3ServiceBlock,
  mc4ServiceBlock,
  mc9ServiceBlock,
  mc13ServiceBlock,
  mc25ServiceBlock,
  mc28ServiceBlock,
  mc29ServiceBlock,
  mc30ServiceBlock,
} from "./mcServices";

export const mcLessons = [
  {
    id: "monitoring-and-control-overview",
    sectionId: "monitoring-and-control-domain",
    order: 1,
    title: "Monitoring and Control Overview",
    question:
      "Which smart-ready services are included in the Monitoring and Control domain?",
    previousLessonId: "ev-charging-information-and-connectivity",
    nextLessonId: "occupancy-detection-and-central-reporting",
    blocks: [
      {
        id: "monitoring-control-domain-introduction",
        type: "text",
        title: "The Monitoring and Control domain",
        body: "Monitoring and Control is one of the nine technical domains covered by the SRI. It refers to the use of equipment, tools and methods to monitor and control the operation of technical building systems. In this context, the operation of the systems is regulated and their robust operation is ensured.\n\nThe Monitoring and Control domain contains eight services in Catalogue B. Three of these services — Central Reporting of TBS Performance and Energy Use (MC13), Smart Grid Integration (MC25), and the Single Platform service (MC30) — are also included in Catalogue A. The eight services are: Run Time Management of HVAC Systems (MC3); Detecting Faults of Technical Building Systems and Providing Support to the Diagnosis of These Faults (MC4); Occupancy Detection: Connected Services (MC9); Central Reporting of TBS Performance and Energy Use (MC13); Smart Grid Integration (MC25); Reporting Information Regarding Demand Side Management Performance and Operation (MC28); Override of DSM Control (MC29); and a Single Platform that Allows Automated Control and Coordination Between TBS with Energy-Flow Optimization Based on Occupancy, Weather and Grid Signals (MC30).",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri2market-mc-overview",
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "monitoring-control-domain-overview-image",
        type: "image",
        title: "Monitoring and Control domain overview",
        image: {
          id: "monitoring-control-domain-overview",
          src: monitoringAndControlDomainOverviewImage,
          alt: "Overview of the Monitoring and Control domain.",
          caption: "Overview of the Monitoring and Control domain.",
          info: "Image source: SRI2MARKET, Monitoring and Control (MC) Domain Overview.",
          presentation: "wide",
        },
        sourceRefs: ["sri2market-mc-overview"],
      },
      {
        id: "monitoring-control-section-learning-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "monitoring-control-path-occupancy-reporting",
            title: "Occupancy detection and central reporting",
            description:
              "Occupancy detection connected to multiple TBS and central reporting of TBS performance and energy use.",
            icon: "Radar",
            accent: "blue",
          },
          {
            id: "monitoring-control-path-runtime-coordination",
            title: "HVAC run-time management and system coordination",
            description:
              "HVAC run-time management and coordination of multiple technical building systems through a single platform.",
            icon: "Workflow",
            accent: "cyan",
          },
          {
            id: "monitoring-control-path-fault-detection",
            title: "Fault detection and diagnostic support",
            description:
              "Central indication of detected faults and alarms across relevant TBS, with diagnostic support.",
            icon: "TriangleAlert",
            accent: "amber",
          },
          {
            id: "monitoring-control-path-dsm-grid",
            title: "DSM and smart-grid interaction",
            description:
              "Smart-grid integration, reporting of DSM performance and operation, and user override of DSM control.",
            icon: "Network",
            accent: "green",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-mc-mc3",
          "sri2market-mc-mc4",
          "sri2market-mc-mc9",
          "sri2market-mc-mc13",
          "sri2market-mc-mc25",
          "sri2market-mc-mc28",
          "sri2market-mc-mc29",
          "sri2market-mc-mc30",
        ],
      },
      {
        id: "monitoring-control-dsm-redistribution-note",
        type: "note",
        title: "Demand-side management services",
        body: "During consolidation of the SRI methodology, services from the former Demand-Side Management domain were redistributed to the domains most closely related to each service. Services that manage interactions or harmonisation between technical building systems and the grid were included in Monitoring and Control. The dedicated Demand-Side Management domain was therefore removed, without reducing the importance of demand-side management and grid control in the SRI methodology.",
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "monitoring-control-overview-takeaway",
        type: "takeaway",
        body: "The Monitoring and Control domain contains eight services covering HVAC run time management, fault detection and diagnosis, occupancy detection, central reporting, smart-grid integration, DSM reporting, DSM override, and control and coordination of TBS through a single platform.",
        sourceRefs: ["sri-final-report-2020", "sri-calculation-sheet-v45"],
      },
    ],
  },

  {
    id: "occupancy-detection-and-central-reporting",
    sectionId: "monitoring-and-control-domain",
    order: 2,
    title: "Occupancy Detection and Central Reporting",
    question:
      "How do the MC9 and MC13 functionality levels represent occupancy detection and central reporting?",
    previousLessonId: "monitoring-and-control-overview",
    nextLessonId: "hvac-runtime-management-and-system-coordination",
    blocks: [
      {
        id: "monitoring-control-occupancy-reporting-introduction",
        type: "text",
        title: "Services covered in this lesson",
        body: "This lesson covers Occupancy Detection: Connected Services (MC9) and Central Reporting of TBS Performance and Energy Use (MC13).",
        sourceRefs: ["sri-final-report-2020", "sri-calculation-sheet-v45"],
      },
      {
        id: "monitoring-control-occupancy-reporting-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "monitoring-control-occupancy-detection",
            title: "Occupancy detection",
            description:
              "Occupancy detection connected to and supplying information to multiple technical building systems.",
            icon: "Radar",
            accent: "blue",
          },
          {
            id: "monitoring-control-central-reporting",
            title: "Central reporting",
            description:
              "Central or remote reporting of technical building system performance and energy use.",
            icon: "ChartNoAxesCombined",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-mc-mc9",
          "sri2market-mc-mc13",
        ],
      },
      mc9ServiceBlock,
      mc13ServiceBlock,
      {
        id: "monitoring-control-occupancy-reporting-takeaway",
        type: "takeaway",
        body: "MC9 ranges from no occupancy detection to centralised occupancy detection that supplies several TBS. MC13 ranges from no reporting to central or remote real-time reporting per energy carrier that combines TBS from all main domains in one interface.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-mc-mc9",
          "sri2market-mc-mc13",
        ],
      },
    ],
  },

  {
    id: "hvac-runtime-management-and-system-coordination",
    sectionId: "monitoring-and-control-domain",
    order: 3,
    title: "HVAC Run Time Management and System Coordination",
    question:
      "How do the MC3 and MC30 functionality levels represent HVAC run time management and coordination between TBS?",
    previousLessonId: "occupancy-detection-and-central-reporting",
    nextLessonId: "fault-detection-and-diagnostic-support",
    blocks: [
      {
        id: "monitoring-control-runtime-coordination-introduction",
        type: "text",
        title: "Services covered in this lesson",
        body: "This lesson covers Run Time Management of HVAC Systems (MC3) and the Single Platform that Allows Automated Control and Coordination Between TBS with Energy-Flow Optimization Based on Occupancy, Weather and Grid Signals (MC30).",
        sourceRefs: ["sri-final-report-2020", "sri-calculation-sheet-v45"],
      },
      {
        id: "monitoring-control-runtime-coordination-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "monitoring-control-hvac-runtime",
            title: "HVAC run-time management",
            description:
              "Management of HVAC operating times through manual settings, predictive control or grid signals.",
            icon: "Timer",
            accent: "cyan",
          },
          {
            id: "monitoring-control-system-coordination",
            title: "System coordination",
            description:
              "Automated control and coordination of multiple technical building systems through a single platform.",
            icon: "Workflow",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-mc-mc3",
          "sri2market-mc-mc30",
        ],
      },
      mc3ServiceBlock,
      mc30ServiceBlock,
      {
        id: "monitoring-control-runtime-coordination-takeaway",
        type: "takeaway",
        body: "MC3 ranges from manual HVAC settings to on/off control based on predictive control or grid signals. MC30 ranges from no single platform to automated control and coordination between TBS with energy-flow optimization based on occupancy, weather and grid signals.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-mc-mc3",
          "sri2market-mc-mc30",
        ],
      },
    ],
  },

  {
    id: "fault-detection-and-diagnostic-support",
    sectionId: "monitoring-and-control-domain",
    order: 4,
    title: "Fault Detection and Diagnostic Support",
    question:
      "How do the MC4 functionality levels represent central fault indication and diagnostic support?",
    previousLessonId: "hvac-runtime-management-and-system-coordination",
    nextLessonId: "demand-side-management-and-smart-grid-interaction",
    blocks: [
      mc4ServiceBlock,
      {
        id: "monitoring-control-fault-detection-takeaway",
        type: "takeaway",
        body: "MC4 ranges from no central indication of detected faults and alarms to central indication for all relevant TBS with diagnosing functions.",
        sourceRefs: ["sri-final-report-2020", "sri2market-mc-mc4"],
      },
    ],
  },

  {
    id: "demand-side-management-and-smart-grid-interaction",
    sectionId: "monitoring-and-control-domain",
    order: 5,
    title: "Demand-Side Management and Smart-Grid Interaction",
    question:
      "How do MC25, MC28 and MC29 represent smart-grid integration, DSM reporting and DSM override?",
    previousLessonId: "fault-detection-and-diagnostic-support",
    nextLessonId: null,
    blocks: [
      {
        id: "monitoring-control-dsm-introduction",
        type: "text",
        title: "Services covered in this lesson",
        body: "This lesson covers Smart Grid Integration (MC25), Reporting Information Regarding Demand Side Management Performance and Operation (MC28), and Override of DSM Control (MC29).",
        sourceRefs: ["sri-final-report-2020", "sri-calculation-sheet-v45"],
      },
      {
        id: "monitoring-control-dsm-services-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "monitoring-control-smart-grid-integration",
            title: "Smart-grid integration",
            description:
              "Harmonisation and coordinated demand-side management between technical building systems and the grid.",
            icon: "Network",
            accent: "green",
          },
          {
            id: "monitoring-control-dsm-reporting",
            title: "DSM performance reporting",
            description:
              "Current, historical and predicted information about DSM performance, operation and managed energy flows.",
            icon: "ChartNoAxesCombined",
            accent: "blue",
          },
          {
            id: "monitoring-control-dsm-override",
            title: "DSM control override",
            description:
              "Manual or scheduled override of DSM control, with reactivation and, at the highest level, reactivation with optimised control.",
            icon: "ToggleRight",
            accent: "amber",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-mc-mc25",
          "sri2market-mc-mc28",
          "sri2market-mc-mc29",
        ],
      },
      mc25ServiceBlock,
      mc28ServiceBlock,
      mc29ServiceBlock,
      {
        id: "monitoring-control-mc29-negative-scores-note",
        type: "note",
        title: "Impact scoring at MC29 Level 1",
        body:
          "At MC29 Level 1, DSM control without the possibility of user override receives negative impact scores for Comfort (-2), Maintenance and fault prediction (-1), and Information to occupants (-2). For these impact criteria, the absence of an override possibility is scored worse than no DSM control.",
        sourceRefs: ["sri-practical-guide-v45", "sri-calculation-sheet-v45"],
      },
      {
        id: "monitoring-control-dsm-takeaway",
        type: "takeaway",
        body: "MC25 ranges from no harmonisation between the grid and TBS to coordinated DSM of multiple TBS. MC28 ranges from no information to current, historical and predicted DSM information, including managed energy flows. MC29 ranges from no DSM control to scheduled override and reactivation with optimised control.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-mc-mc25",
          "sri2market-mc-mc28",
          "sri2market-mc-mc29",
        ],
      },
    ],
  },
] satisfies readonly TheoryLesson[];
