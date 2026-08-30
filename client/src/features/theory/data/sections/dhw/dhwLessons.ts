// client/src/features/theory/data/sections/dhw/dhwLessons.ts

import type { TheoryLesson } from "../../../types/theory.types";

/**
 * Source policy for the Domestic Hot Water lessons:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and are cross-checked against the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / preconditions are cross-checked across the SRI Final
 *   Report, the SRI Calculation Sheet v4.5 and the corresponding SRI2MARKET
 *   Domestic Hot Water material.
 *
 * - The consolidated Final Report and the SRI Calculation Sheet v4.5 provide
 *   the main technical references for the catalogue structure and assessment
 *   implementation, while SRI2MARKET is used as a supporting source for
 *   domain context, service purposes, detailed technical explanations,
 *   examples and visual material.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   assessment preconditions and the technical meaning supported by the
 *   available sources.
 *
 * - Catalogue-specific differences are preserved explicitly. DHW1a is included
 *   in both catalogues but Level 3 applies only in Catalogue B, while DHW1b is
 *   represented separately because Catalogue A and Catalogue B define different
 *   functionality-level sequences.
 *
 * - Workbook notes that do not represent technical applicability conditions
 *   are not presented as lesson content.
 */

import dhwDomainOverviewImage from "../../../../../assets/theory/section-5/lesson-1/dhw-domain-overview.png";

import {
  dhw1aServiceBlock,
  dhw1bCatalogueAServiceBlock,
  dhw1bCatalogueBServiceBlock,
  dhw1dServiceBlock,
  dhw2bServiceBlock,
  dhw3ServiceBlock,
} from "./dhwServices";

export const dhwLessons = [
  {
    id: "domestic-hot-water-overview",
    sectionId: "domestic-hot-water-domain",
    order: 1,
    title: "Domestic Hot Water Overview",
    question: "What does the Domestic Hot Water domain cover?",
    previousLessonId: "cooling-system-performance-reporting",
    nextLessonId: "dhw-storage-charging-control",
    blocks: [
      {
        id: "dhw-domain-introduction",
        type: "text",
        title: "The Domestic Hot Water domain",
        body:
          "Domestic hot water is one of the nine technical domains considered in the SRI methodology.\n\nA technical domain is a collection of smart-ready services that together form an integrated and consistent part of the services expected from a building or building unit. The Domestic Hot Water domain contains the smart-ready services associated with the building's domestic hot water system.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "dhw-in-buildings",
        type: "text",
        title: "Domestic hot water in buildings",
        body:
          "In 2020, households accounted for approximately 27% of final energy consumption in the European Union. Reducing domestic energy consumption is therefore an important contribution to achieving climate objectives.\n\nDomestic hot water accounts for around 15% of household energy consumption in the European Union. A large part of this consumption is associated with the frequency of use and occupants' habits. Improving domestic hot water performance through control systems, scheduled charging and other measures can reduce building energy use, energy bills and the carbon footprint.",
        sourceRefs: ["sri2market-dhw-overview"],
      },
      {
        id: "dhw-domain-overview-image",
        type: "image",
        title: "Domestic Hot Water domain overview",
        image: {
          id: "dhw-domain-overview",
          src: dhwDomainOverviewImage,
          alt:
            "Overview of the Domestic Hot Water domain.",
          caption:
            "Overview of the Domestic Hot Water domain.",
          info:
            "Source: SRI2MARKET, Domestic Hot Water Domain (DHW) Overview.",
          presentation: "wide",
        },
        sourceRefs: ["sri2market-dhw-overview"],
      },
      {
        id: "dhw-storage-flexibility-note",
        type: "note",
        title: "Domestic hot water storage and energy flexibility",
        body:
          "When their charging is suitably controlled, domestic hot water storage tanks can support energy flexibility and demand-response operation. Charging can be coordinated with local renewable-energy availability or external energy-network signals.",
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "dhw-services-introduction",
        type: "text",
        title: "What the Domestic Hot Water services cover",
        body:
          "The following lessons present the Domestic Hot Water smart-ready services and their corresponding functionality levels.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "dhw-section-learning-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "dhw-path-storage-charging",
            title: "Storage charging control",
            description:
              "Control of domestic hot water storage charging for electric, non-electric and solar-assisted systems.",
            icon: "Cylinder",
            accent: "blue",
          },
          {
            id: "dhw-path-generator-sequencing",
            title: "Generator sequencing",
            description:
              "Operating priority for systems with multiple domestic hot water generators.",
            icon: "ListOrdered",
            accent: "amber",
          },
          {
            id: "dhw-path-performance-information",
            title: "Performance information",
            description:
              "Reporting and evaluation of domestic hot water system performance.",
            icon: "ChartNoAxesCombined",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dhw-dhw1a",
          "sri2market-dhw-dhw1b-a",
          "sri2market-dhw-dhw1b-b",
          "sri2market-dhw-dhw1d",
          "sri2market-dhw-dhw2b",
          "sri2market-dhw-dhw3",
        ],
      },
      {
        id: "dhw-overview-takeaway",
        type: "takeaway",
        body:
          "The Domestic Hot Water domain covers smart-ready services for storage-charging control, the sequencing of different domestic hot water generators and the reporting and evaluation of system performance.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dhw-dhw1a",
          "sri2market-dhw-dhw1b-a",
          "sri2market-dhw-dhw1b-b",
          "sri2market-dhw-dhw1d",
          "sri2market-dhw-dhw2b",
          "sri2market-dhw-dhw3",
        ],
      },
    ],
  },

  {
    id: "dhw-storage-charging-control",
    sectionId: "domestic-hot-water-domain",
    order: 2,
    title: "DHW Storage Charging Control",
    question:
      "How does the SRI assess domestic hot water storage charging?",
    previousLessonId: "domestic-hot-water-overview",
    nextLessonId: "dhw-generator-sequencing",
    blocks: [
      {
        id: "dhw-storage-charging-introduction",
        type: "text",
        title: "Control of domestic hot water storage charging",
        body:
          "This lesson examines the Domestic Hot Water services related to storage charging.\n\nWhich storage-charging services are applicable depends on the system configuration. DHW1a applies to storage with electric heating; it is included in both catalogues, but Level 3 applies only in Catalogue B. DHW1b has different functionality-level sequences in Catalogue A and Catalogue B. DHW1d concerns storage charging with a solar collector and supplementary heat generation and is applicable when domestic hot water storage with a solar collector is present.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-dhw-dhw1a",
          "sri2market-dhw-dhw1b-a",
          "sri2market-dhw-dhw1b-b",
          "sri2market-dhw-dhw1d",
        ],
      },
      {
        id: "dhw-storage-charging-services-overview",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "dhw-electric-storage-charging",
            title: "Electric storage charging",
            description:
              "Storage charging with direct electric heating or an integrated electric heat pump.",
            icon: "Zap",
            accent: "amber",
          },
          {
            id: "dhw-catalogue-a-storage",
            title: "Catalogue A storage control",
            description:
              "Availability of storage vessels and control through internal or external signals.",
            icon: "Cylinder",
            accent: "blue",
          },
          {
            id: "dhw-hot-water-generation",
            title: "Hot-water generation",
            description:
              "Storage charging through non-electrical hot-water generation.",
            icon: "Flame",
            accent: "cyan",
          },
          {
            id: "dhw-solar-storage-charging",
            title: "Solar-assisted charging",
            description:
              "Solar-priority storage charging with supplementary heat generation.",
            icon: "Sun",
            accent: "green",
          },
        ],
        sourceRefs: [
          "sri2market-dhw-dhw1a",
          "sri2market-dhw-dhw1b-a",
          "sri2market-dhw-dhw1b-b",
          "sri2market-dhw-dhw1d",
        ],
      },

      dhw1aServiceBlock,

      dhw1bCatalogueAServiceBlock,

      dhw1bCatalogueBServiceBlock,

      {
        id: "dhw1b-catalogue-difference-note",
        type: "note",
        title: "DHW1b differs between the catalogues",
        body:
          "The DHW1b functionality-level sequence differs between Catalogue A and Catalogue B. In Catalogue A, DHW1b assesses whether domestic hot water storage vessels are available and whether their charging is controlled through internal settings or external signals. In Catalogue B, DHW1b assesses storage charging through hot-water generation using automatic on/off control, scheduling, demand-based supply-temperature control, multi-sensor storage management and external signals. These are alternative catalogue-specific definitions of the same service code, not two separate services assessed together.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dhw-dhw1b-a",
          "sri2market-dhw-dhw1b-b",
        ],
      },

      dhw1dServiceBlock,

      {
        id: "dhw-storage-charging-takeaway",
        type: "takeaway",
        body:
          "The applicability of domestic hot water storage-charging services depends on the system configuration. These services assess functions such as scheduling, multi-sensor storage management, solar priority and charging control based on external signals.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-dhw-dhw1a",
          "sri2market-dhw-dhw1b-a",
          "sri2market-dhw-dhw1b-b",
          "sri2market-dhw-dhw1d",
        ],
      },
    ],
  },

  {
    id: "dhw-generator-sequencing",
    sectionId: "domestic-hot-water-domain",
    order: 3,
    title: "Sequencing of Different DHW Generators",
    question:
      "How does the SRI assess the sequencing of different domestic hot water generators?",
    previousLessonId: "dhw-storage-charging-control",
    nextLessonId: "domestic-hot-water-performance-information",
    blocks: [
      {
        id: "dhw-generator-sequencing-introduction",
        type: "text",
        title: "Operating priority of different generators",
        body:
          "This lesson examines DHW2b, the Domestic Hot Water service for systems that contain multiple heat generators.\n\nThe service determines the operating priority of the generators. Its functionality levels progress from priorities based on operating time to fixed and dynamic priority lists that can take account of current and predicted load, energy efficiency, carbon-dioxide emissions, generator capacity and electricity-grid signals.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-dhw-dhw2b",
        ],
      },

      dhw2bServiceBlock,

      {
        id: "dhw-generator-sequencing-takeaway",
        type: "takeaway",
        body:
         "DHW generator sequencing applies when multiple heat generators are present and progresses from operating-time priorities to dynamic sequencing based on operating conditions, load prediction and electricity-grid signals.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-dhw-dhw2b",
        ],
      },
    ],
  },

  {
    id: "domestic-hot-water-performance-information",
    sectionId: "domestic-hot-water-domain",
    order: 4,
    title: "Domestic Hot Water Performance Information",
    question:
      "How does the SRI assess the reporting and evaluation of domestic hot water performance?",
    previousLessonId: "dhw-generator-sequencing",
    nextLessonId: "ventilation-overview",
    blocks: [
      {
        id: "dhw-performance-information-introduction",
        type: "text",
        title: "Information about domestic hot water performance",
        body:
          "This lesson examines DHW3, the SRI service related to the reporting and evaluation of domestic hot water performance.\n\nThe service considers whether performance information is unavailable, limited to current indicators, extended with historical data, or further processed for performance evaluation with forecasting and/or benchmarking. At the highest functionality level, predictive management and fault detection are also included.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dhw-dhw3",
        ],
      },

      dhw3ServiceBlock,

      {
        id: "dhw-performance-information-takeaway",
        type: "takeaway",
        body:
          "Domestic hot water performance information progresses from no reporting to current and historical information, then to performance evaluation with forecasting and/or benchmarking, and finally to performance evaluation that also includes predictive management and fault detection.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dhw-dhw3",
        ],
      },
    ],
  },
] satisfies readonly TheoryLesson[];
