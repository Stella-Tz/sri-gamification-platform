// client/src/features/theory/data/sections/cooling/coolingLessons.ts

import type { TheoryLesson } from "../../../types/theory.types";

/**
 * Source policy for the Cooling lessons:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and the official SRI methodology, and are cross-checked against
 *   the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / preconditions are cross-checked across the SRI Final
 *   Report, the SRI Calculation Sheet v4.5 and the corresponding SRI2MARKET
 *   Cooling material.
 *
 * - Domain context, service purposes, detailed functionality-level
 *   explanations, technical examples and visual material use SRI2MARKET as a
 *   supporting educational source, without overriding the consolidated
 *   catalogue structure.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the consolidated catalogue,
 *   practical guidance / triage logic and the technical meaning supported by
 *   the available sources.
 *
 * - Workbook notes that do not represent technical applicability conditions
 *   are not presented as lesson content.
 */

import coolingDomainOverviewImage from "../../../../../assets/theory/section-4/lesson-1/cooling-domain-overview.png";

import {
  c1aServiceBlock,
  c1bServiceBlock,
  c1cServiceBlock,
  c1dServiceBlock,
  c1fServiceBlock,
  c1gServiceBlock,
  c2aServiceBlock,
  c2bServiceBlock,
  c3ServiceBlock,
  c4ServiceBlock,
} from "./coolingServices";

export const coolingLessons = [
  {
    id: "cooling-overview",
    sectionId: "cooling-domain",
    order: 1,
    title: "Cooling Overview",
    question: "What does the Cooling domain cover?",
    previousLessonId: "heating-system-performance-reporting",
    nextLessonId: "cooling-emission-and-distribution-control",
    blocks: [
      {
        id: "cooling-domain-introduction",
        type: "text",
        title: "The Cooling domain",
        body:
          "Cooling is one of the nine technical domains considered in the SRI methodology.\n\nA technical domain is a collection of smart-ready services that together form an integrated and consistent part of the services expected from a building or building unit. The Cooling domain contains the smart-ready services associated with the building's cooling system.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "cooling-in-buildings",
        type: "text",
        title: "Cooling in buildings",
        body:
          "Cooling refers to the energy required to cool buildings, including residential buildings and service-sector buildings such as schools, hospitals and offices.\n\nEnergy used for heating and cooling in buildings and industry represents around 50% of the European Union’s annual energy consumption. Making the sector smarter, more efficient and more sustainable can contribute to reducing energy imports, energy dependency, costs and emissions.\n\nCooling may be produced locally in individual rooms by separate cooling units, centrally for a whole building, or through district-cooling systems in dense urban areas.",
        sourceRefs: ["sri2market-cooling-overview"],
      },
      {
        id: "cooling-domain-overview-image",
        type: "image",
        title: "Cooling domain overview",
        image: {
          id: "cooling-domain-overview",
          src: coolingDomainOverviewImage,
          alt:
            "Overview of the Cooling domain and examples of smart cooling control.",
          caption:
            "Overview of the Cooling domain and examples of smart cooling control.",
          info: "Source: SRI2MARKET, Cooling Domain (C) Overview.",
        },
        sourceRefs: ["sri2market-cooling-overview"],
      },
      {
        id: "smart-cooling-control",
        type: "text",
        title: "Smart cooling control",
        body:
          "Smart cooling-control systems can save energy by adapting the operation of the cooling system to the actual temperature in a room.\n\nDepending on the service and system configuration, more advanced cooling-control systems can include occupancy detection, predefined schedules, self-learning control, local predictions or responses to electricity-grid signals.",
        sourceRefs: [
          "sri2market-cooling-overview",
          "sri2market-cooling-c1a",
          "sri2market-cooling-c4",
        ],
      },
      {
        id: "cooling-services-introduction",
        type: "text",
        title: "What the Cooling services cover",
        body:
          "The following lessons present the Cooling smart-ready services and their corresponding functionality levels.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c1a",
          "sri2market-cooling-c1b",
          "sri2market-cooling-c1c",
          "sri2market-cooling-c1d",
          "sri2market-cooling-c1f",
          "sri2market-cooling-c1g",
          "sri2market-cooling-c2a",
          "sri2market-cooling-c2b",
          "sri2market-cooling-c3",
          "sri2market-cooling-c4",
        ],
      },
      {
        id: "cooling-section-learning-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "cooling-path-emission",
            title: "Cooling emission",
            description:
              "Control of the heat removed at room or cooling-zone level.",
            icon: "Thermometer",
            accent: "blue",
          },
          {
            id: "cooling-path-distribution",
            title: "Cooling distribution",
            description:
              "Control of chilled-water temperature and distribution-pump operation.",
            icon: "Route",
            accent: "cyan",
          },
          {
            id: "cooling-path-interlock",
            title: "Heating-cooling interlock",
            description:
              "Prevention of simultaneous heating and cooling in the same room.",
            icon: "CircleSlash2",
            accent: "purple",
          },
          {
            id: "cooling-path-generation",
            title: "Cooling generation",
            description:
              "Capacity control and sequencing of cooling generators.",
            icon: "Snowflake",
            accent: "amber",
          },
          {
            id: "cooling-path-storage",
            title: "Storage and flexibility",
            description:
              "Thermal energy storage and interaction with the electricity grid.",
            icon: "Cylinder",
            accent: "green",
          },
          {
            id: "cooling-path-reporting",
            title: "Performance reporting",
            description:
              "Reporting and evaluation of cooling-system performance.",
            icon: "ChartNoAxesCombined",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c1a",
          "sri2market-cooling-c1b",
          "sri2market-cooling-c1c",
          "sri2market-cooling-c1d",
          "sri2market-cooling-c1f",
          "sri2market-cooling-c1g",
          "sri2market-cooling-c2a",
          "sri2market-cooling-c2b",
          "sri2market-cooling-c3",
          "sri2market-cooling-c4",
        ],
      },
      {
        id: "cooling-overview-takeaway",
        type: "takeaway",
        body:
          "The Cooling domain assesses how cooling is emitted, distributed, generated, stored, coordinated with heating, adapted to electricity-grid conditions and monitored through performance information.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c1a",
          "sri2market-cooling-c1b",
          "sri2market-cooling-c1c",
          "sri2market-cooling-c1d",
          "sri2market-cooling-c1f",
          "sri2market-cooling-c1g",
          "sri2market-cooling-c2a",
          "sri2market-cooling-c2b",
          "sri2market-cooling-c3",
          "sri2market-cooling-c4",
        ],
      },
    ],
  },

  {
    id: "cooling-emission-and-distribution-control",
    sectionId: "cooling-domain",
    order: 2,
    title: "Cooling Emission, Distribution and Interlock Control",
    question:
      "How are cooling emission, distribution and heating-cooling interlock assessed?",
    previousLessonId: "cooling-overview",
    nextLessonId: "cooling-generation-control",
    blocks: [
      {
        id: "cooling-emission-distribution-introduction",
        type: "text",
        title: "Cooling emission, distribution and interlock",
        body:
          "This lesson examines cooling-emission control, chilled-water distribution control and the interlock used to avoid simultaneous heating and cooling in the same room.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c1a",
          "sri2market-cooling-c1b",
          "sri2market-cooling-c1c",
          "sri2market-cooling-c1d",
          "sri2market-cooling-c1f",
        ],
      },
      {
        id: "cooling-emission-distribution-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "cooling-emission-control",
            title: "Cooling emission",
            description:
              "Control of the heat removed at room level.",
            icon: "Thermometer",
            accent: "blue",
          },
          {
            id: "tabs-cooling-control",
            title: "TABS control",
            description:
              "Cooling-emission control for TABS in cooling mode.",
            icon: "Layers3",
            accent: "cyan",
          },
          {
            id: "cooling-water-temperature-control",
            title: "Distribution temperature",
            description:
              "Control of chilled-water temperature in the supply or return flow.",
            icon: "Thermometer",
            accent: "purple",
          },
          {
            id: "cooling-pump-control",
            title: "Distribution pumps",
            description:
              "Control of distribution-pump operation in cooling networks.",
            icon: "RefreshCw",
            accent: "green",
          },
          {
            id: "heating-cooling-interlock",
            title: "Heating-cooling interlock",
            description:
              "Prevention of simultaneous heating and cooling in the same room.",
            icon: "CircleSlash2",
            accent: "amber",
          },
        ],
        sourceRefs: [
          "sri2market-cooling-c1a",
          "sri2market-cooling-c1b",
          "sri2market-cooling-c1c",
          "sri2market-cooling-c1d",
          "sri2market-cooling-c1f",
        ],
      },

      c1aServiceBlock,

      c1bServiceBlock,

      c1cServiceBlock,

      c1dServiceBlock,

      c1fServiceBlock,

      {
        id: "cooling-emission-distribution-takeaway",
        type: "takeaway",
        body:
          "Cooling-emission services regulate heat removal at room or TABS-zone level, distribution services regulate chilled-water temperature and pump operation, and the interlock reduces or prevents simultaneous heating and cooling in the same room, depending on the functionality level.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c1a",
          "sri2market-cooling-c1b",
          "sri2market-cooling-c1c",
          "sri2market-cooling-c1d",
          "sri2market-cooling-c1f",
        ],
      },
    ],
  },

  {
    id: "cooling-generation-control",
    sectionId: "cooling-domain",
    order: 3,
    title: "Cooling Generation Control",
    question: "How does the SRI assess cooling generation control?",
    previousLessonId: "cooling-emission-and-distribution-control",
    nextLessonId: "cooling-storage-and-grid-interaction",
    blocks: [
      {
        id: "cooling-generation-introduction",
        type: "text",
        title: "Control of cooling generation",
        body:
          "This lesson examines the Cooling services related to the control and coordinated operation of cooling generators.\n\nC2a concerns the control of cooling-production capacity. C2b concerns the operating sequence of different cooling generators in systems that contain more than one generator.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c2a",
          "sri2market-cooling-c2b",
        ],
      },
      {
        id: "cooling-generation-services-overview",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "cooling-capacity-control",
            title: "Generator capacity",
            description:
              "Control of cooling-production capacity according to load, demand or grid signals.",
            icon: "Gauge",
            accent: "cyan",
          },
          {
            id: "cooling-generator-sequencing",
            title: "Generator sequencing",
            description:
              "Operating priority for systems with several cooling generators.",
            icon: "ListOrdered",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri2market-cooling-c2a",
          "sri2market-cooling-c2b",
        ],
      },

      c2aServiceBlock,

      c2bServiceBlock,

      {
        id: "c2b-priority-rule-note",
        type: "note",
        title: "Priority-list operation",
        body:
          "In the priority-list implementation described for this service, a cooling generator operates only when the generators with higher priority are operating at full load.",
        sourceRefs: [
          "sri2market-cooling-c2b",
        ],
      },

      {
        id: "cooling-generation-takeaway",
        type: "takeaway",
        body:
          "Cooling-generation control is assessed through control of cooling-production capacity and, where several generators are present, the sequencing of their operation.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c2a",
          "sri2market-cooling-c2b",
        ],
      },
    ],
  },

  {
    id: "cooling-storage-and-grid-interaction",
    sectionId: "cooling-domain",
    order: 4,
    title: "Thermal Energy Storage and Grid Interaction",
    question:
      "How does the SRI assess cooling storage and interaction with the electricity grid?",
    previousLessonId: "cooling-generation-control",
    nextLessonId: "cooling-system-performance-reporting",
    blocks: [
      {
        id: "cooling-storage-grid-introduction",
        type: "text",
        title: "Cooling storage and grid interaction",
        body:
          "This lesson examines two Cooling services related to thermal energy storage and interaction with the electricity grid.\n\nC1g concerns the operation and charging of thermal energy storage used for cooling. C4 concerns the ability of one or more cooling-system components or subsystems to adapt their operation for flexibility services or interaction with the electricity grid.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c1g",
          "sri2market-cooling-c4",
        ],
      },
      {
        id: "cooling-storage-grid-services-overview",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "cooling-storage-operation",
            title: "Storage operation",
            description:
              "Control of thermal energy storage charging and operation.",
            icon: "Cylinder",
            accent: "cyan",
          },
          {
            id: "cooling-grid-interaction",
            title: "Grid interaction",
            description:
              "Adaptation of cooling-system operation to predictions and electricity-grid signals.",
            icon: "UtilityPole",
            accent: "green",
          },
        ],
        sourceRefs: [
          "sri2market-cooling-c1g",
          "sri2market-cooling-c4",
        ],
      },
      c1gServiceBlock,

      {
        id: "c1g-tabs-not-tes-note",
        type: "note",
        variant: "info",
        title: "TABS and thermal energy storage",
        body:
          "For service C1g, Thermally Activated Building Systems (TABS) are not considered Thermal Energy Storage (TES) systems.",
        sourceRefs: ["sri2market-cooling-c1g"],
      },

      c4ServiceBlock,

      {
        id: "cooling-storage-grid-takeaway",
        type: "takeaway",
        body:
          "Cooling-storage control progresses from continuous operation to time-scheduled operation, load-prediction-based control and grid-responsive charging. C4 additionally assesses how one or more subsystems or components of the cooling system can provide flexibility through scheduled operation, self-learning control, electricity-grid signals and local predictions.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c1g",
          "sri2market-cooling-c4",
        ],
      },
    ],
  },

  {
    id: "cooling-system-performance-reporting",
    sectionId: "cooling-domain",
    order: 5,
    title: "Cooling-System Performance Reporting",
    question:
      "How does the SRI assess the reporting and evaluation of cooling-system performance?",
    previousLessonId: "cooling-storage-and-grid-interaction",
    nextLessonId: "domestic-hot-water-overview",
    blocks: [
      {
        id: "cooling-performance-reporting-introduction",
        type: "text",
        title: "Information about cooling-system performance",
        body:
          "This lesson examines the SRI service related to the reporting and evaluation of cooling-system performance.\n\nThe service considers whether performance information is unavailable, limited to current indicators, extended with historical data, or further processed for performance evaluation with forecasting and/or benchmarking. At the highest functionality level, predictive management and fault detection are also included.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c3",
        ],
      },

      c3ServiceBlock,

      {
        id: "cooling-performance-reporting-takeaway",
        type: "takeaway",
        body:
          "Cooling-system performance reporting progresses from no reporting to current and historical information, then to performance evaluation with forecasting and/or benchmarking, and finally to performance evaluation that also includes predictive management and fault detection.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-cooling-c3",
        ],
      },
    ],
  },
] satisfies readonly TheoryLesson[];
