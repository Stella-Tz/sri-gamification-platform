import type { TheoryLesson } from "../../../types/theory.types";

/**
 * Source policy for the Dynamic Building Envelope lessons:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and are cross-checked against the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Dynamic Building Envelope material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership and assessment conditions, while
 *   SRI2MARKET is used primarily for domain context, service purposes,
 *   detailed explanations, examples and visual material.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 */

import dynamicBuildingEnvelopeDomainOverviewImage from "../../../../../assets/theory/section-8/lesson-1/dynamic-building-envelope-domain-overview.png";

import {
  de1ServiceBlock,
  de2ServiceBlock,
  de4ServiceBlock,
} from "./deServices";

export const deLessons = [
  {
    id: "dynamic-building-envelope-overview",
    sectionId: "dynamic-building-envelope-domain",
    order: 1,
    title: "Dynamic Building Envelope Overview",
    question: "What does the Dynamic Building Envelope domain cover?",
    previousLessonId: "daylight-based-lighting-control",
    nextLessonId: "window-solar-shading-control",
    blocks: [
      {
        id: "dynamic-envelope-domain-introduction",
        type: "text",
        title: "The Dynamic Building Envelope domain",
        body:
          "The Dynamic Building Envelope is one of the nine technical domains considered in the SRI methodology. The domain evaluates smart-ready services related to the control and reporting of dynamic elements of the building envelope.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "dynamic-envelope-energy-context",
        type: "text",
        title: "From a conventional to a dynamic building envelope",
        body:
          "Buildings account for approximately 37% of final energy consumption in the European Union. The building envelope is the building's first energy-control layer and has two basic functions: protection and climate control.\n\nConventional building envelopes are mainly static. A dynamic building envelope adapts to external and internal conditions and seeks the most favourable option. Because its operation can significantly affect the energy consumed by HVAC and lighting systems, dynamic-envelope operation should be integrated with the building's automatic control system.\n\nA dynamic envelope that responds directly to changing conditions can increase the use of daylight, reduce artificial-lighting consumption, extend lamp life, reduce HVAC energy consumption, improve occupants' thermal and visual comfort and reduce CO₂ emissions.",
        sourceRefs: ["sri2market-dynamic-envelope-overview"],
      },
      {
        id: "dynamic-envelope-domain-overview-image",
        type: "image",
        title: "Dynamic Building Envelope domain overview",
        image: {
          id: "dynamic-building-envelope-domain-overview",
          src: dynamicBuildingEnvelopeDomainOverviewImage,
          alt: "Overview of the Dynamic Building Envelope domain.",
          caption: "Overview of the Dynamic Building Envelope domain.",
          info:
            "Image source: SRI2MARKET, Dynamic Building Envelope Domain (DE) Overview.",
          presentation: "wide",
        },
        sourceRefs: ["sri2market-dynamic-envelope-overview"],
      },
      {
        id: "dynamic-envelope-services-introduction",
        type: "text",
        title: "Smart-ready services for the dynamic building envelope",
        body:
          "Across the default Dynamic Building Envelope service catalogues, three services are defined. DE1 assesses window solar-shading control and is included in Catalogues A and B. DE2 assesses window open/closed control in combination with the HVAC system and is included only in Catalogue B. DE4 assesses the reporting of information regarding the performance of dynamic building-envelope systems and is included in Catalogues A and B. The following lessons present these services and their functionality levels.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-dynamic-envelope-de1",
          "sri2market-dynamic-envelope-de2",
          "sri2market-dynamic-envelope-de4",
        ],
      },
      {
        id: "dynamic-envelope-section-learning-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "dynamic-envelope-path-solar-shading",
            title: "Solar-shading control",
            description:
              "Control of movable shading devices on glazed building surfaces.",
            icon: "SunDim",
            accent: "amber",
          },
          {
            id: "dynamic-envelope-path-window-hvac",
            title: "Window and HVAC coordination",
            description:
              "Control of window opening and closing in combination with HVAC operation.",
            icon: "Workflow",
            accent: "blue",
          },
          {
            id: "dynamic-envelope-path-reporting",
            title: "Performance reporting",
            description:
              "Reporting of element position, faults, predictive-maintenance information and sensor data.",
            icon: "ChartNoAxesCombined",
            accent: "green",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dynamic-envelope-de1",
          "sri2market-dynamic-envelope-de2",
          "sri2market-dynamic-envelope-de4",
        ],
      },
      {
        id: "dynamic-envelope-overview-takeaway",
        type: "takeaway",
        body:
          "The Dynamic Building Envelope domain covers window solar-shading control, window open/closed control combined with HVAC, and reporting information regarding the performance of dynamic building-envelope systems.",
        sourceRefs: ["sri-final-report-2020"],
      },
    ],
  },

  {
    id: "window-solar-shading-control",
    sectionId: "dynamic-building-envelope-domain",
    order: 2,
    title: "Window Solar Shading Control",
    question: "How does the SRI assess window solar-shading control?",
    previousLessonId: "dynamic-building-envelope-overview",
    nextLessonId: "window-open-closed-control-and-hvac",
    blocks: [
      {
        id: "dynamic-envelope-de1-introduction",
        type: "text",
        title: "Solar shading of glazed surfaces",
        body:
          "Solar shading is the term used for systems that control the amount of solar heat and daylight entering a building. Solar radiation provides natural light and heat, which can reduce the need for artificial lighting and heating. Excessive solar radiation, however, can cause overheating that has to be addressed through cooling and can also cause glare and other forms of visual discomfort.\n\nDE1 assesses how the solar-shading devices of the building's glazed surfaces are controlled.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dynamic-envelope-de1",
        ],
      },

      de1ServiceBlock,

      {
        id: "dynamic-envelope-de1-takeaway",
        type: "takeaway",
        body:
          "DE1 progresses from no solar shading or manual operation to motorised manual control, automatic control based on sensor data, combined light/blind/HVAC control and predictive blind control based, for example, on weather forecasts.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dynamic-envelope-de1",
        ],
      },
    ],
  },

  {
    id: "window-open-closed-control-and-hvac",
    sectionId: "dynamic-building-envelope-domain",
    order: 3,
    title: "Window Open/Closed Control and HVAC",
    question:
      "How does the SRI assess window opening and closing in combination with HVAC?",
    previousLessonId: "window-solar-shading-control",
    nextLessonId: "dynamic-envelope-performance-reporting",
    blocks: [
      {
        id: "dynamic-envelope-de2-introduction",
        type: "text",
        title: "Operable windows and HVAC systems",
        body:
          "Building users open and close operable windows to obtain fresh air according to their comfort needs, including thermal sensations and odours. User behaviour in operating windows is variable, while the effect of opening or closing windows can be substantial.\n\nStrategies that integrate operable windows with HVAC systems can reduce energy use, while natural-ventilation scenarios without mechanical cooling can offer particularly favourable energy performance. DE2 therefore assesses the availability of a system that controls window opening and closing in combination with the building's HVAC systems.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dynamic-envelope-de2",
        ],
      },

      de2ServiceBlock,

      {
        id: "dynamic-envelope-de2-takeaway",
        type: "takeaway",
        body:
          "DE2 progresses from manual operation or fixed windows to open/closed detection linked to HVAC shut-down, automated mechanical window operation based on room-sensor data and central coordination of operable windows, for example for free natural night cooling.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dynamic-envelope-de2",
        ],
      },
    ],
  },

  {
    id: "dynamic-envelope-performance-reporting",
    sectionId: "dynamic-building-envelope-domain",
    order: 4,
    title: "Dynamic Envelope Performance Reporting",
    question:
      "How does the SRI assess reporting information for dynamic building-envelope systems?",
    previousLessonId: "window-open-closed-control-and-hvac",
    nextLessonId: "electricity-overview",
    blocks: [
      {
        id: "dynamic-envelope-de4-introduction",
        type: "text",
        title: "Reporting information for dynamic-envelope systems",
        body:
          "A reporting system can support the production and analysis of data, the comparison of data for trend analysis, the display of data evolution, the creation of specific and customised reports, and the management and monitoring of key performance indicators. Information can be processed for selected periods or in real time, allowing it to be available when it is generated.",
        sourceRefs: ["sri2market-dynamic-envelope-de4"],
      },

      de4ServiceBlock,

      {
        id: "dynamic-envelope-control-reporting-note",
        type: "note",
        title: "Control and reporting are assessed separately",
        body:
          "DE1 and DE2 assess control functions. DE4 assesses the reporting of position, fault, predictive-maintenance and sensor information for dynamic building-envelope systems.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dynamic-envelope-de1",
          "sri2market-dynamic-envelope-de2",
          "sri2market-dynamic-envelope-de4",
        ],
      },
      {
        id: "dynamic-envelope-de4-takeaway",
        type: "takeaway",
        body:
          "DE4 progresses from no reporting to position reporting and fault detection, predictive maintenance, real-time sensor data and, at the highest level, real-time and historical sensor data.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-dynamic-envelope-de4",
        ],
      },
    ],
  },
] satisfies readonly TheoryLesson[];