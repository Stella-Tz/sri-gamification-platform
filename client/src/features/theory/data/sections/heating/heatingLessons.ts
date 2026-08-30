// client/src/features/theory/data/sections/heating/heatingLessons.ts

import type { TheoryLesson } from "../../../types/theory.types";

import heatingDomainOverviewImage from "../../../../../assets/theory/section-3/lesson-1/heating-domain-overview.png";

import {
  h1aServiceBlock,
  h1bServiceBlock,
  h1cCatalogueAServiceBlock,
  h1cCatalogueBServiceBlock,
  h1dServiceBlock,
  h1fServiceBlock,
  h2aServiceBlock,
  h2bServiceBlock,
  h2dServiceBlock,
  h3ServiceBlock,
  h4ServiceBlock,
} from "./heatingServices";

export const heatingLessons = [
  {
    id: "heating-overview",
    sectionId: "heating-domain",
    order: 1,
    title: "Heating Overview",
    question: "What does the Heating domain cover?",
    previousLessonId: "understanding-sri-results",
    nextLessonId: "heat-emission-and-distribution-control",
    blocks: [
      {
        id: "heating-domain-introduction",
        type: "text",
        title: "The Heating domain",
        body:
          "Heating is one of the nine technical domains considered in the SRI methodology.\n\nA technical domain is a collection of smart-ready services that together form an integrated and consistent part of the services expected from a building or building unit. The Heating domain contains the smart-ready services associated with the building’s heating system.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "heating-in-buildings",
        type: "text",
        title: "Heating in buildings",
        body:
  "Heating refers to the energy required to heat buildings, including residential buildings and service-sector buildings such as schools, hospitals and offices.\n\nEnergy used for heating and cooling in buildings and industry represents around 50% of the European Union’s annual energy consumption. Making the sector smarter, more efficient and more sustainable can contribute to reducing energy imports, energy dependency, costs and emissions.",
        sourceRefs: ["sri2market-heating-overview"],
      },
      {
        id: "heating-domain-overview-image",
        type: "image",
        title: "Heating domain overview",
        image: {
          id: "heating-domain-overview",
          src: heatingDomainOverviewImage,
          alt:
            "Overview of the Heating domain and examples of smart heating control.",
          caption:
            "Overview of the Heating domain and examples of smart heating control.",
          info: "Source: SRI2MARKET, Heating Domain (H) Overview.",
        },
        sourceRefs: ["sri2market-heating-overview"],
      },
      {
        id: "smart-heating-control",
        type: "text",
        title: "Smart heating control",
        body:
          "Smart heating control systems can act, for example, on the settings for the desired indoor-temperature levels in a building and on the operating schedule of the heating system.\n\nSome advanced systems use algorithms and artificial intelligence to learn from users’ habits. They can also take into account other parameters, such as window openings and occupancy of the spaces, in order to minimise energy waste.",
        sourceRefs: ["sri2market-heating-overview"],
      },
      {
        id: "smart-heating-controls-note",
        type: "note",
        title: "Smart heating controls",
        body:
          "Smart control systems, such as digital thermostats, can contribute to energy savings of up to 15%. These systems can also allow consumers to monitor their energy use more easily, adjust their consumption and benefit from periods with lower energy prices.",
        sourceRefs: ["sri2market-heating-overview"],
      },
      {
        id: "heating-services-introduction",
        type: "text",
        title: "What the Heating services cover",
        body:
          "The Heating services included in the SRI catalogues cover different parts and functions of the heating system: heat emission and room-level control, heat distribution, heat generation, thermal energy storage, flexibility and interaction with the electricity grid, and reporting of heating-system performance.\n\nThe following lessons examine these parts of the Heating domain through their corresponding smart-ready services and functionality levels.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-heating-h1a",
          "sri2market-heating-h1b",
          "sri2market-heating-h1c-a",
          "sri2market-heating-h1c-b",
          "sri2market-heating-h1d",
          "sri2market-heating-h1f",
          "sri2market-heating-h2a",
          "sri2market-heating-h2b",
          "sri2market-heating-h2d",
          "sri2market-heating-h3",
          "sri2market-heating-h4",
        ],
      },
      {
        id: "heating-section-learning-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "heating-path-emission",
            title: "Heat emission",
            description:
              "Control of the heat supplied at room or heating-zone level.",
            icon: "Thermometer",
            accent: "blue",
          },
          {
            id: "heating-path-distribution",
            title: "Heat distribution",
            description:
              "Control of distribution-fluid temperature and distribution pumps.",
            icon: "Route",
            accent: "cyan",
          },
          {
            id: "heating-path-generation",
            title: "Heat generation",
            description:
              "Control and sequencing of heat generators.",
            icon: "Flame",
            accent: "amber",
          },
          {
            id: "heating-path-storage",
            title: "Storage and flexibility",
            description:
              "Thermal energy storage and interaction with the electricity grid.",
            icon: "Cylinder",
            accent: "green",
          },
          {
            id: "heating-path-reporting",
            title: "Performance reporting",
            description:
              "Reporting and evaluation of heating-system performance.",
            icon: "ChartNoAxesCombined",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-heating-h1a",
          "sri2market-heating-h1b",
          "sri2market-heating-h1c-a",
          "sri2market-heating-h1c-b",
          "sri2market-heating-h1d",
          "sri2market-heating-h1f",
          "sri2market-heating-h2a",
          "sri2market-heating-h2b",
          "sri2market-heating-h2d",
          "sri2market-heating-h3",
          "sri2market-heating-h4",
        ],
      },
      {
        id: "heating-overview-takeaway",
        type: "takeaway",
        body:
          "The Heating domain covers smart-ready services related to heat emission, distribution, generation and thermal energy storage, as well as flexibility and interaction with the electricity grid and reporting of heating-system performance.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-heating-h1a",
          "sri2market-heating-h1b",
          "sri2market-heating-h1c-a",
          "sri2market-heating-h1c-b",
          "sri2market-heating-h1d",
          "sri2market-heating-h1f",
          "sri2market-heating-h2a",
          "sri2market-heating-h2b",
          "sri2market-heating-h2d",
          "sri2market-heating-h3",
          "sri2market-heating-h4",
        ],
      },
    ],
  },

  {
    id: "heat-emission-and-distribution-control",
    sectionId: "heating-domain",
    order: 2,
    title: "Heat Emission and Distribution Control",
    question: "How are heat emission and distribution controlled?",
    previousLessonId: "heating-overview",
    nextLessonId: "heat-generation-control",
    blocks: [
      {
        id: "heat-emission-distribution-introduction",
        type: "text",
        title: "Heat emission and distribution",
        body:
          "This lesson examines the Heating services related to heat emission and heat distribution within a building.\n\nThese services cover the control of heat supplied at room level, heat emission control for Thermally Activated Building Systems in heating mode, control of the distribution-fluid temperature, and control of distribution pumps in heating networks.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-heating-h1a",
          "sri2market-heating-h1b",
          "sri2market-heating-h1c-b",
          "sri2market-heating-h1d",
        ],
      },
      {
        id: "heat-emission-distribution-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "heat-emission-control",
            title: "Heat emission",
            description:
              "Control of the heat supplied at room level.",
            icon: "Thermometer",
            accent: "blue",
          },
          {
            id: "tabs-emission-control",
            title: "TABS control",
            description:
              "Heat emission control for TABS in heating mode.",
            icon: "Layers3",
            accent: "cyan",
          },
          {
            id: "distribution-temperature-control",
            title: "Distribution temperature",
            description:
              "Control of distribution-fluid temperature in the supply or return flow.",
            icon: "Thermometer",
            accent: "purple",
          },
          {
            id: "distribution-pump-control",
            title: "Distribution pumps",
            description:
              "Control of distribution-pump operation in heating networks.",
            icon: "RefreshCw",
            accent: "green",
          },
        ],
        sourceRefs: [
          "sri2market-heating-h1a",
          "sri2market-heating-h1b",
          "sri2market-heating-h1c-b",
          "sri2market-heating-h1d",
        ],
      },

      h1aServiceBlock,

      h1bServiceBlock,

      h1cCatalogueBServiceBlock,

      {
        id: "h1c-catalogue-specific-note",
        type: "note",
        title: "H1c is catalogue-specific",
        body:
          "The code H1c is catalogue-specific. In Catalogue A, H1c concerns the storage and shifting of thermal energy through hot-water storage vessels, and is covered in the lesson “Thermal Energy Storage and Grid Interaction”. In Catalogue B, H1c concerns control of the distribution-fluid temperature in the supply or return flow of air or water, as presented in this lesson. Only the definition corresponding to the selected service catalogue is used in a given assessment.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-heating-h1c-a",
          "sri2market-heating-h1c-b",
        ],
      },

      h1dServiceBlock,

      {
        id: "heat-emission-distribution-takeaway",
        type: "takeaway",
        body:
          "The services in this lesson cover heat emission at room or zone level, control of the distribution-fluid temperature and control of pumps in heating distribution networks.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-heating-h1a",
          "sri2market-heating-h1b",
          "sri2market-heating-h1c-b",
          "sri2market-heating-h1d",
        ],
      },
    ],
  },

  {
    id: "heat-generation-control",
    sectionId: "heating-domain",
    order: 3,
    title: "Heat Generation Control",
    question: "How does the SRI assess heat generation control?",
    previousLessonId: "heat-emission-and-distribution-control",
    nextLessonId: "thermal-energy-storage-and-grid-interaction",
    blocks: [
      {
        id: "heat-generation-introduction",
        type: "text",
        title: "Control of heat generation",
        body:
          "This lesson examines the Heating services related to the control and coordinated operation of heat generators.\n\nH2a concerns generator-temperature control for heat generators other than heat pumps and is applicable to combustion heaters or district-heating systems. H2b concerns capacity control for heat pumps. H2d concerns the operating sequence of different heat generators in systems that contain more than one generator.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-heating-h2a",
          "sri2market-heating-h2b",
          "sri2market-heating-h2d",
        ],
      },
      {
        id: "heat-generation-services-overview",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "generator-temperature-control",
            title: "Generator temperature",
            description:
              "Temperature control for heat generators other than heat pumps.",
            icon: "Thermometer",
            accent: "blue",
          },
          {
            id: "heat-pump-capacity-control",
            title: "Heat-pump capacity",
            description:
              "Capacity control for heat pumps according to load, demand or grid signals.",
            icon: "Gauge",
            accent: "cyan",
          },
          {
            id: "generator-sequencing",
            title: "Generator sequencing",
            description:
              "Operating priority for systems with multiple heat generators.",
            icon: "ListOrdered",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri2market-heating-h2a",
          "sri2market-heating-h2b",
          "sri2market-heating-h2d",
        ],
      },

      h2aServiceBlock,

      h2bServiceBlock,

      h2dServiceBlock,

      {
        id: "h2d-priority-rule-note",
        type: "note",
        title: "How generator priority is applied",
        body:
          "H2d applies when the heating system contains multiple heat generators. In the heating-system triage, multiple generators can include generators using the same energy source or generators forming a hybrid system. A generator in the priority list operates only when the generators with higher priority are operating at full load.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-heating-h2d",
        ],
      },

      {
        id: "heat-generation-takeaway",
        type: "takeaway",
        body:
          "Heat-generation control is assessed through generator-temperature control, heat-pump capacity control and, where multiple heat generators are present, the sequencing of their operation.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-heating-h2a",
          "sri2market-heating-h2b",
          "sri2market-heating-h2d",
        ],
      },
    ],
  },

  {
    id: "thermal-energy-storage-and-grid-interaction",
    sectionId: "heating-domain",
    order: 4,
    title: "Thermal Energy Storage and Grid Interaction",
    question:
      "How does the SRI assess thermal-energy storage and interaction with the electricity grid?",
    previousLessonId: "heat-generation-control",
    nextLessonId: "heating-system-performance-reporting",
    blocks: [
      {
        id: "thermal-storage-grid-introduction",
        type: "text",
        title: "Thermal-energy storage and grid interaction",
        body:
          "This lesson examines the Heating services related to thermal-energy storage and interaction with the electricity grid.\n\nIn Catalogue A, H1c concerns the availability and control of hot-water storage vessels. In Catalogue B, H1f concerns the operation and charging of thermal-energy storage for building heating, excluding Thermally Activated Building Systems (TABS). Catalogue B also includes H4, which concerns the ability of the heating system to adapt its operation to schedules, learned thermal response, forecasts and electricity-grid signals.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-heating-h1c-a",
          "sri2market-heating-h1f",
          "sri2market-heating-h4",
        ],
      },
      {
        id: "thermal-storage-grid-services-overview",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "hot-water-storage",
            title: "Hot-water storage",
            description:
              "Availability and control of hot-water storage vessels.",
            icon: "Cylinder",
            accent: "blue",
          },
          {
            id: "thermal-storage-operation",
            title: "Storage operation",
            description:
              "Operation and charging of thermal-energy storage for building heating.",
            icon: "Cylinder",
            accent: "cyan",
          },
          {
            id: "grid-interaction",
            title: "Grid interaction",
            description:
              "Adaptation of heating-system operation to forecasts and electricity-grid signals.",
            icon: "UtilityPole",
            accent: "green",
          },
        ],
        sourceRefs: [
          "sri2market-heating-h1c-a",
          "sri2market-heating-h1f",
          "sri2market-heating-h4",
        ],
      },

      h1cCatalogueAServiceBlock,

      h1fServiceBlock,

      {
        id: "thermal-storage-catalogues-note",
        type: "note",
        title: "Thermal Storage in Catalogues A and B",
        body:
          "Catalogue A assesses thermal-energy storage through H1c, which considers the availability and control of hot-water storage vessels. Catalogue B assesses thermal-energy storage through H1f, which considers the operation and charging of thermal-energy storage for building heating and excludes TABS. These services belong to different catalogues and are not both assessed in the same standard Method A or Method B assessment.",
        sourceRefs: [
          "sri-calculation-sheet-v45",
          "sri2market-heating-h1c-a",
          "sri2market-heating-h1f",
        ],
      },

      h4ServiceBlock,

      {
        id: "thermal-storage-grid-takeaway",
        type: "takeaway",
        body:
          "Depending on the selected catalogue, thermal-energy storage is assessed through H1c in Catalogue A or H1f in Catalogue B. Catalogue B additionally assesses the heating system’s flexibility and interaction with the electricity grid through H4.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-heating-h1c-a",
          "sri2market-heating-h1f",
          "sri2market-heating-h4",
        ],
      },
    ],
  },

  {
    id: "heating-system-performance-reporting",
    sectionId: "heating-domain",
    order: 5,
    title: "Heating-System Performance Reporting",
    question:
      "How does the SRI assess the reporting and evaluation of heating-system performance?",
    previousLessonId: "thermal-energy-storage-and-grid-interaction",
    nextLessonId: "cooling-overview",
    blocks: [
      {
        id: "heating-performance-reporting-introduction",
        type: "text",
        title: "Information about heating-system performance",
        body:
          "This lesson examines the SRI service related to the reporting and evaluation of heating-system performance.\n\nThe service considers whether performance information is unavailable, limited to current indicators, extended with historical data, or further processed to support performance evaluation, forecasting, benchmarking, predictive management and fault detection.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-heating-h3",
        ],
      },

      h3ServiceBlock,

      {
        id: "heating-performance-reporting-takeaway",
        type: "takeaway",
        body:
          "Heating-system performance reporting progresses from no reporting to current and historical information, and then to performance evaluation with forecasting, benchmarking, predictive management and fault detection.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-heating-h3",
        ],
      },
    ],
  },
] satisfies readonly TheoryLesson[];