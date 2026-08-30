import type { TheoryLesson } from "../../../types/theory.types";

/**
 * Source policy for the Ventilation lessons:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and are cross-checked against the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / preconditions are cross-checked across the SRI Final
 *   Report, the SRI Calculation Sheet v4.5 and the corresponding SRI2MARKET
 *   Ventilation material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership, triage rules and service preconditions,
 *   while SRI2MARKET is used primarily for domain context, service purposes,
 *   detailed explanations, examples and visual material.
 *
 * - The Practical Guide v4.5 is used specifically for the explanation of the
 *   default domain-weighting methodology in the Ventilation overview.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - "Always to be assessed" is an assessment rule and is not presented as
 *   a technical applicability condition.
 */

import ventilationDomainOverviewImage from "../../../../../assets/theory/section-6/lesson-1/ventilation-domain-overview.png";

import {
  v1aServiceBlock,
  v1cServiceBlock,
  v2cServiceBlock,
  v2dServiceBlock,
  v3ServiceBlock,
  v6ServiceBlock,
} from "./ventilationServices";

export const ventilationLessons = [
  {
    id: "ventilation-overview",
    sectionId: "ventilation-domain",
    order: 1,
    title: "Ventilation Overview",
    question: "What does the Ventilation domain cover?",
    previousLessonId: "domestic-hot-water-performance-information",
    nextLessonId: "ventilation-air-flow-control",
    blocks: [
      {
        id: "ventilation-domain-introduction",
        type: "text",
        title: "The Ventilation domain",
        body:
          "Ventilation is one of the nine technical domains considered in the SRI methodology. Ventilation systems in buildings replace used indoor air with fresh air from outside.\n\nMechanical ventilation is commonly provided by ventilation units that include fans, motors, electronic controls and other devices, such as heat-recovery systems. These units are connected to the building through air inlets and outlets or ventilation ducts. Ventilation can also be provided through natural ventilation systems, for example through windows with trickle vents and dedicated shafts designed to create a chimney effect.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri2market-ventilation-overview",
        ],
      },
      {
        id: "ventilation-domain-overview-image",
        type: "image",
        title: "Ventilation domain overview",
        image: {
          id: "ventilation-domain-overview",
          src: ventilationDomainOverviewImage,
          alt: "Overview of the Ventilation domain.",
          caption: "Overview of the Ventilation domain.",
          info: "Source: SRI2MARKET, Ventilation Domain (V) Overview.",
          presentation: "wide",
        },
        sourceRefs: ["sri2market-ventilation-overview"],
      },
      {
        id: "controlled-ventilation-scope",
        type: "text",
        title: "Controlled ventilation in the SRI",
        body:
          "Controlled ventilation is ventilation for which air-flow rates are regulated according to settings selected by the user and/or other indoor-environment parameters, such as indoor air quality or thermal comfort.\n\nThe SRI triage process distinguishes between mechanical ventilation and controlled natural ventilation. Mechanical ventilation includes balanced ventilation, mechanical exhaust, mechanical supply and hybrid ventilation. Controlled natural ventilation includes systems such as the automated opening of windows or other dedicated ventilation openings. Manual control of openings is not considered controlled natural ventilation in the SRI triage process.",
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "ventilation-health-comfort-energy",
        type: "text",
        title: "Indoor air quality, health, comfort and energy demand",
        body:
          "Adequate ventilation is essential for the health and comfort of building occupants. Ventilation units consume more than 2% of all electricity in the European Union and are among the largest consumers of electricity inside buildings, after heating, cooling and lighting.\n\nVentilation rates also influence the heating and cooling energy demand of buildings. For the default domain weighting, the space-heating energy demand is divided between the Heating and Ventilation domains using the relative shares derived from the ventilation and transmission heat-loss coefficients. Although the auxiliary electricity demand of ventilation fans is identified as a component of controlled-ventilation energy demand, its contribution is currently neglected in the default weighting factors because sufficiently detailed data are not available.",
        sourceRefs: [
          "sri2market-ventilation-overview",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "ventilation-services-introduction",
        type: "text",
        title: "Smart-ready services for ventilation",
        body:
          "The Ventilation service catalogues include services for supply-air-flow control at room level, air-flow or pressure control at air-handler level, heat-recovery control for the prevention of overheating, supply-air-temperature control at air-handling-unit level, free cooling with a mechanical ventilation system, and reporting information regarding indoor air quality.\n\nThe following lessons present these services and their functionality levels.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-ventilation-v1a",
          "sri2market-ventilation-v1c",
          "sri2market-ventilation-v2c",
          "sri2market-ventilation-v2d",
          "sri2market-ventilation-v3",
          "sri2market-ventilation-v6",
        ],
      },
      {
        id: "ventilation-section-learning-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "ventilation-path-air-flow-control",
            title: "Air-flow control",
            description:
              "Supply-air-flow control at room level and air-flow or pressure control at air-handler level.",
            icon: "Wind",
            accent: "blue",
          },
          {
            id: "ventilation-path-air-temperature-control",
            title: "Air-temperature control",
            description:
              "Heat-recovery control for the prevention of overheating and supply-air-temperature setpoint control.",
            icon: "Thermometer",
            accent: "amber",
          },
          {
            id: "ventilation-path-free-cooling",
            title: "Free cooling",
            description:
              "Free-cooling control through a mechanical ventilation system.",
            icon: "Snowflake",
            accent: "cyan",
          },
          {
            id: "ventilation-path-iaq-information",
            title: "Indoor-air-quality information",
            description:
              "Real-time monitoring, historical information and warnings regarding indoor air quality.",
            icon: "AirVent",
            accent: "purple",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-ventilation-v1a",
          "sri2market-ventilation-v1c",
          "sri2market-ventilation-v2c",
          "sri2market-ventilation-v2d",
          "sri2market-ventilation-v3",
          "sri2market-ventilation-v6",
        ],
      },
      {
        id: "ventilation-overview-takeaway",
        type: "takeaway",
        body:
          "The Ventilation domain covers controlled ventilation services for air-flow control, air-temperature control, free cooling and reporting information regarding indoor air quality.",
        sourceRefs: ["sri-final-report-2020"],
      },
    ],
  },

  {
    id: "ventilation-air-flow-control",
    sectionId: "ventilation-domain",
    order: 2,
    title: "Ventilation Air-Flow Control",
    question: "How does the SRI assess ventilation air-flow control?",
    previousLessonId: "ventilation-overview",
    nextLessonId: "ventilation-air-temperature-control",
    blocks: [
      {
        id: "ventilation-air-flow-control-introduction",
        type: "text",
        title: "Air-flow control services",
        body:
          "This lesson examines the two services in the Ventilation Air Flow Control group: V1a and V1c.",
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "ventilation-air-flow-services-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "ventilation-room-air-flow-control",
            title: "Room-level air-flow control",
            description:
              "Supply-air-flow control at room level according to time, occupancy or indoor-air-quality demand.",
            icon: "Wind",
            accent: "blue",
          },
          {
            id: "ventilation-air-handler-control",
            title: "Air-handler flow and pressure control",
            description:
              "Air-flow or pressure control at air-handler level through staged or demand-based operation.",
            icon: "Gauge",
            accent: "cyan",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-ventilation-v1a",
          "sri2market-ventilation-v1c",
        ],
      },

      v1aServiceBlock,

      v1cServiceBlock,

      {
        id: "ventilation-v1a-v1c-difference-note",
        type: "note",
        title: "V1a and V1c assess different parts of the system",
        body:
          "V1a assesses supply-air-flow control at room level. V1c assesses air-flow or pressure control at air-handler level.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-ventilation-v1a",
          "sri2market-ventilation-v1c",
        ],
      },
      {
        id: "ventilation-air-flow-control-takeaway",
        type: "takeaway",
        body:
          "V1a progresses from no ventilation system or manual control to clock and occupancy control, then to central and local indoor-air-quality demand control at room level. V1c progresses from continuous operation to time-based and multi-stage control, then to demand-based air-flow or pressure control without and finally with pressure reset at air-handler level.",
        sourceRefs: [
          "sri2market-ventilation-v1a",
          "sri2market-ventilation-v1c",
        ],
      },
    ],
  },

  {
    id: "ventilation-air-temperature-control",
    sectionId: "ventilation-domain",
    order: 3,
    title: "Heat Recovery and Supply-Air-Temperature Control",
    question:
      "How does the SRI assess heat-recovery and supply-air-temperature control?",
    previousLessonId: "ventilation-air-flow-control",
    nextLessonId: "free-cooling-with-mechanical-ventilation",
    blocks: [
      {
        id: "ventilation-air-temperature-control-introduction",
        type: "text",
        title: "Air-temperature control services",
        body:
          "This lesson examines the two services in the Ventilation Air Temperature Control group: V2c and V2d.",
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "ventilation-air-temperature-services-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "ventilation-heat-recovery-control",
            title: "Heat-recovery control",
            description:
              "Control or bypass of heat recovery to prevent overheating.",
            icon: "RefreshCw",
            accent: "green",
          },
          {
            id: "ventilation-supply-air-temperature-control",
            title: "Supply-air-temperature control",
            description:
              "Determination of the supply-air-temperature setpoint at air-handling-unit level.",
            icon: "Thermometer",
            accent: "amber",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-ventilation-v2c",
          "sri2market-ventilation-v2d",
        ],
      },

      v2cServiceBlock,

      v2dServiceBlock,

      {
        id: "ventilation-v2c-v2d-difference-note",
        type: "note",
        title: "V2c and V2d assess different control functions",
        body:
          "V2c assesses heat-recovery control for the prevention of overheating. V2d assesses how the supply-air-temperature setpoint is determined at air-handling-unit level.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-ventilation-v2c",
          "sri2market-ventilation-v2d",
        ],
      },
      {
        id: "ventilation-air-temperature-control-takeaway",
        type: "takeaway",
        body:
          "V2c progresses from no overheating control to heat-recovery modulation or bypass based on extract-air sensors, multiple room-temperature sensors or predictive control. V2d progresses from no automatic control to a constant setpoint, outdoor-temperature compensation and load-dependent compensation.",
        sourceRefs: [
          "sri2market-ventilation-v2c",
          "sri2market-ventilation-v2d",
        ],
      },
    ],
  },

  {
    id: "free-cooling-with-mechanical-ventilation",
    sectionId: "ventilation-domain",
    order: 4,
    title: "Free Cooling with Mechanical Ventilation",
    question:
      "How does the SRI assess free cooling with a mechanical ventilation system?",
    previousLessonId: "ventilation-air-temperature-control",
    nextLessonId: "ventilation-indoor-air-quality-information",
    blocks: [
      {
        id: "ventilation-free-cooling-introduction",
        type: "text",
        title: "Free-cooling service",
        body:
          "This lesson examines V3, the service in the Ventilation Free Cooling group.",
        sourceRefs: ["sri-final-report-2020"],
      },

      v3ServiceBlock,

      {
        id: "ventilation-free-cooling-takeaway",
        type: "takeaway",
        body:
          "V3 progresses from no automatic control to night cooling, temperature-based modulation of outdoor and recirculated air, and H,x-directed control based on temperature and humidity.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-ventilation-v3",
        ],
      },
    ],
  },

  {
    id: "ventilation-indoor-air-quality-information",
    sectionId: "ventilation-domain",
    order: 5,
    title: "Indoor-Air-Quality Information",
    question:
      "How does the SRI assess the reporting of indoor-air-quality information?",
    previousLessonId: "free-cooling-with-mechanical-ventilation",
    nextLessonId: "lighting-overview",
    blocks: [
      {
        id: "ventilation-iaq-information-introduction",
        type: "text",
        title: "Indoor-air-quality information service",
        body:
          "This lesson examines V6, the Ventilation service for reporting information regarding indoor air quality.",
        sourceRefs: ["sri-final-report-2020"],
      },

      v6ServiceBlock,

      {
        id: "ventilation-iaq-information-takeaway",
        type: "takeaway",
        body:
          "V6 progresses from no indoor-air-quality information to real-time monitoring, historical information and warnings concerning maintenance needs or occupant actions.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-ventilation-v6",
        ],
      },
    ],
  },
] satisfies readonly TheoryLesson[];
