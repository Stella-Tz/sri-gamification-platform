//client\src\features\theory\data\sections\electricity\electricityLessons.ts

import type { TheoryLesson } from "../../../types/theory.types";

/**
 * Source policy for the Electricity lessons:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and are cross-checked against the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Electricity material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership and applicability / assessment conditions,
 *   while SRI2MARKET is used primarily for domain context, service purposes,
 *   detailed explanations, technical examples and visual material.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - "Always to be assessed" is an assessment rule and is not presented as
 *   a technical applicability condition.
 *
 * - Workbook notes that do not represent technical applicability conditions
 *   are not presented as lesson content.
 */

import electricityDomainOverviewImage from "../../../../../assets/theory/section-9/lesson-1/electricity-domain-overview.png";

import {
  e2ServiceBlock,
  e3ServiceBlock,
  e4ServiceBlock,
  e5ServiceBlock,
  e8ServiceBlock,
  e11ServiceBlock,
  e12ServiceBlock,
} from "./electricityServices";

export const electricityLessons = [
  {
    id: "electricity-overview",
    sectionId: "electricity-domain",
    order: 1,
    title: "Electricity Overview",
    question:
      "Which smart-ready services are included in the Electricity domain?",
    previousLessonId: "dynamic-envelope-performance-reporting",
    nextLessonId: "local-electricity-generation-reporting",
    blocks: [
      {
        id: "electricity-domain-introduction",
        type: "text",
        title: "The Electricity domain",
        body:
          "Electricity is one of the nine technical domains covered by the SRI. Electricity generation is a major source of pollution when it is based on the combustion of fossil fuels such as natural gas, coal or lignite, which release pollutants and greenhouse gases into the atmosphere. Current and expected climate-change policies provide financial support for the transition to renewable energy sources or increase the cost of carbon.\n\nIntroducing electricity generation from renewable sources into a building's technical systems can reduce the cost of electricity consumption and increase the value of the building. Energy-storage solutions can increase the utilisation of on-site electricity-generation systems and, as a result, improve the return on the corresponding investments.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri2market-electricity-overview",
        ],
      },
      {
        id: "electricity-domain-overview-image",
        type: "image",
        title: "Electricity domain overview",
        image: {
          id: "electricity-domain-overview",
          src: electricityDomainOverviewImage,
          alt: "Overview of the SRI Electricity domain.",
          caption: "Overview of the Electricity domain.",
          info:
            "Image source: SRI2MARKET, Electricity Domain (E) Overview.",
          presentation: "wide",
        },
        sourceRefs: ["sri2market-electricity-overview"],
      },
      {
        id: "electricity-services-introduction",
        type: "text",
        title: "Smart-ready services in the Electricity domain",
        body:
          "The Electricity domain contains seven services. E2 concerns information about local electricity generation. E3 concerns storage of locally generated electricity, and E4 concerns optimisation of its self-consumption. E5 concerns control of a combined heat and power plant. E8 concerns support of (micro)grid operation modes. E11 concerns information about energy storage, and E12 concerns information about electricity consumption.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "electricity-section-learning-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "electricity-path-generation-reporting",
            title: "E2 · Local generation information",
            description:
              "Current and historical generation data, performance evaluation, forecasting, benchmarking and fault detection.",
            icon: "ChartNoAxesCombined",
            accent: "amber",
          },
          {
            id: "electricity-path-storage-self-consumption",
            title: "E3–E4 · Storage and self-consumption",
            description:
              "On-site energy storage and management of electricity consumption according to renewable-energy availability.",
            icon: "BatteryCharging",
            accent: "green",
          },
          {
            id: "electricity-path-chp-microgrid",
            title: "E5 & E8 · CHP and (micro)grid operation",
            description:
              "CHP runtime control and automated management of electricity consumption and supply.",
            icon: "Network",
            accent: "purple",
          },
          {
            id: "electricity-path-storage-consumption-reporting",
            title: "E11–E12 · Storage and consumption information",
            description:
              "Information about energy-storage operation and electricity consumption at building or appliance level.",
            icon: "ChartNoAxesCombined",
            accent: "blue",
          },
        ],
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "electricity-overview-takeaway",
        type: "takeaway",
        body:
          "The Electricity domain covers reporting on local electricity generation, storage of locally generated electricity, self-consumption optimisation, CHP control, support of (micro)grid operation modes, reporting on energy storage and reporting on electricity consumption.",
        sourceRefs: ["sri-final-report-2020"],
      },
    ],
  },

  {
    id: "local-electricity-generation-reporting",
    sectionId: "electricity-domain",
    order: 2,
    title: "Local Electricity Generation Reporting",
    question:
      "How is information about local electricity generation provided?",
    previousLessonId: "electricity-overview",
    nextLessonId: "electricity-storage-and-self-consumption",
    blocks: [
      {
        id: "electricity-e2-introduction",
        type: "text",
        title: "Information about local electricity generation",
        body:
          "E2 concerns the provision of information about local electricity generation.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e2",
        ],
      },

      e2ServiceBlock,

      {
        id: "electricity-e2-takeaway",
        type: "takeaway",
        body:
          "E2 progresses from no reporting to current generation data, then to actual values and historical data, performance evaluation through forecasting, benchmarking, or both, and finally predictive management with fault detection.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e2",
        ],
      },
    ],
  },

  {
    id: "electricity-storage-and-self-consumption",
    sectionId: "electricity-domain",
    order: 3,
    title: "Electricity Storage and Self-Consumption",
    question:
      "How are locally generated electricity storage and self-consumption managed?",
    previousLessonId: "local-electricity-generation-reporting",
    nextLessonId: "chp-control-and-microgrid-operation",
    blocks: [
      {
        id: "electricity-storage-self-consumption-introduction",
        type: "text",
        title: "Storage and self-consumption",
        body:
          "E3 concerns the storage of locally generated electricity and the operation of the storage controller. E4 concerns scheduling or automated management of local electricity consumption according to renewable-energy availability and current or predicted energy needs.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e3",
          "sri2market-electricity-e4",
        ],
      },
      {
        id: "electricity-storage-self-consumption-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "electricity-storage-control",
            title: "Electricity storage",
            description:
              "Storage of locally generated electricity and control of storage-system operation.",
            icon: "BatteryCharging",
            accent: "green",
          },
          {
            id: "electricity-self-consumption-control",
            title: "Self-consumption optimisation",
            description:
              "Management of electricity consumption according to renewable-energy availability and energy needs.",
            icon: "RefreshCw",
            accent: "amber",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e3",
          "sri2market-electricity-e4",
        ],
      },

      e3ServiceBlock,

      e4ServiceBlock,

      {
        id: "electricity-storage-self-consumption-takeaway",
        type: "takeaway",
        body:
          "E3 progresses from no storage to on-site storage, control based on grid signals, optimisation of locally generated electricity and, at the highest level, the possibility to feed energy back into the grid. E4 progresses from no optimisation to scheduled consumption, automated management based on current renewable-energy availability, and management based on current and predicted energy needs and renewable-energy availability.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e3",
          "sri2market-electricity-e4",
        ],
      },
    ],
  },

  {
    id: "chp-control-and-microgrid-operation",
    sectionId: "electricity-domain",
    order: 4,
    title: "CHP Control and (Micro)grid Operation",
    question:
      "How are CHP runtime and building electricity exchange with the grid or a microgrid controlled?",
    previousLessonId: "electricity-storage-and-self-consumption",
    nextLessonId: "electricity-storage-and-consumption-reporting",
    blocks: [
      {
        id: "electricity-chp-microgrid-introduction",
        type: "text",
        title: "CHP control and (micro)grid operation",
        body:
          "E5 concerns control of combined heat and power plant runtime according to schedules, heat demand, renewable-energy availability and grid signals. E8 concerns support of (micro)grid operation through automated management of building electricity consumption and supply, including exchange with neighbouring buildings or the electricity grid and limited off-grid operation.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e5",
          "sri2market-electricity-e8",
        ],
      },
      {
        id: "electricity-chp-microgrid-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "electricity-chp-runtime-control",
            title: "CHP runtime control",
            description:
              "Control of CHP operation according to schedules, heat demand, renewable-energy availability and grid signals.",
            icon: "Gauge",
            accent: "amber",
          },
          {
            id: "electricity-microgrid-operation",
            title: "(Micro)grid operation",
            description:
              "Automated management of electricity consumption, supply and exchange with buildings or the grid.",
            icon: "Network",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e5",
          "sri2market-electricity-e8",
        ],
      },

      e5ServiceBlock,

      e8ServiceBlock,

      {
        id: "electricity-chp-microgrid-takeaway",
        type: "takeaway",
        body:
          "E5 progresses from CHP control based on scheduled runtime or current heat demand to runtime influenced by renewable-energy availability, with overproduction fed into the grid, and then to control additionally influenced by grid signals, with dynamic charging and runtime control to optimise renewable-energy self-consumption. E8 progresses from no (micro)grid operation to grid-signal-based management of building electricity consumption, management of electricity consumption and supply to neighbouring buildings or the grid, and limited off-grid operation in island mode.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e5",
          "sri2market-electricity-e8",
        ],
      },
    ],
  },

  {
    id: "electricity-storage-and-consumption-reporting",
    sectionId: "electricity-domain",
    order: 5,
    title: "Electricity Storage and Consumption Reporting",
    question:
      "How is information about energy storage and electricity consumption provided?",
    previousLessonId: "chp-control-and-microgrid-operation",
    nextLessonId: "electric-vehicle-charging-overview",
    blocks: [
      {
        id: "electricity-reporting-introduction",
        type: "text",
        title: "Storage and consumption information",
        body:
          "E11 concerns information about the state and performance of an energy-storage system. E12 concerns information about electricity consumption at building and appliance level.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e11",
          "sri2market-electricity-e12",
        ],
      },
      {
        id: "electricity-storage-consumption-reporting-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "electricity-storage-information",
            title: "Storage information",
            description:
              "Information about storage state, historical operation, performance and faults.",
            icon: "BatteryCharging",
            accent: "green",
          },
          {
            id: "electricity-consumption-information",
            title: "Consumption information",
            description:
              "Electricity-consumption information at building or appliance level.",
            icon: "ChartNoAxesCombined",
            accent: "blue",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e11",
          "sri2market-electricity-e12",
        ],
      },

      e11ServiceBlock,

      e12ServiceBlock,

      {
        id: "electricity-reporting-takeaway",
        type: "takeaway",
        body:
          "E11 progresses from no information to current state-of-charge data, then to actual values and historical data, performance evaluation through forecasting, benchmarking, or both, and finally predictive management with fault detection. E12 progresses from no information to current building-level electricity-consumption reporting, then to real-time feedback or benchmarking at building and appliance level, and finally to automated personalized recommendations.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-electricity-e11",
          "sri2market-electricity-e12",
        ],
      },
    ],
  },
] satisfies readonly TheoryLesson[];