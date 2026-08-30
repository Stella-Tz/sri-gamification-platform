//client\src\features\theory\data\sections\ev\evLessons.ts

import type { TheoryLesson } from "../../../types/theory.types";

/**
 * Source policy for the Electric Vehicle Charging lessons:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and are cross-checked against the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Electric Vehicle Charging material.
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
 * - Workbook notes that do not represent technical applicability conditions
 *   are not presented as lesson content.
 */

import electricVehicleChargingDomainOverviewImage from "../../../../../assets/theory/section-10/lesson-1/electric-vehicle-charging-domain-overview.png";

import {
  ev15ServiceBlock,
  ev16ServiceBlock,
  ev17ServiceBlock,
} from "./evServices";

export const evLessons = [
  {
    id: "electric-vehicle-charging-overview",
    sectionId: "electric-vehicle-charging-domain",
    order: 1,
    title: "Electric Vehicle Charging Overview",
    question:
      "Which smart-ready services are included in the Electric Vehicle Charging domain?",
    previousLessonId: "electricity-storage-and-consumption-reporting",
    nextLessonId: "ev-charging-capacity",
    blocks: [
      {
        id: "electric-vehicle-charging-domain-introduction",
        type: "text",
        title: "The Electric Vehicle Charging domain",
        body: "Electric vehicle charging is one of the nine technical domains covered by the SRI. Electric vehicles play an important role in the decarbonisation of transport. Their use is expected to continue increasing, making them a cost-effective alternative to vehicles with internal-combustion engines.\n\nVehicle batteries can also be used together with on-site electricity generation from renewable energy sources and to provide grid-balancing services.\n\nThe Electric Vehicle Charging domain contains three smart-ready services: EV Charging Capacity (EV15), EV Charging Grid Balancing (EV16), and EV Charging Information and Connectivity (EV17).",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri2market-ev-overview",
        ],
      },
      {
        id: "electric-vehicle-charging-domain-overview-image",
        type: "image",
        title: "Electric Vehicle Charging domain overview",
        image: {
          id: "electric-vehicle-charging-domain-overview",
          src: electricVehicleChargingDomainOverviewImage,
          alt: "Overview of the Electric Vehicle Charging domain.",
          caption: "Overview of the Electric Vehicle Charging domain.",
          info: "Image source: SRI2MARKET, Electric Vehicle Charging (EV) Domain Overview.",
          presentation: "wide",
        },
        sourceRefs: ["sri2market-ev-overview"],
      },
      {
        id: "electric-vehicle-charging-section-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "electric-vehicle-charging-capacity-path",
            title: "EV15 · Charging capacity",
            description:
              "Ducting, a simple power plug, or recharging points for a proportion of the parking spaces.",
            icon: "PlugZap",
            accent: "blue",
          },
          {
            id: "electric-vehicle-charging-grid-balancing-path",
            title: "EV16 · Grid balancing",
            description:
              "Uncontrolled, one-way controlled, and two-way controlled charging.",
            icon: "UtilityPole",
            accent: "green",
          },
          {
            id: "electric-vehicle-charging-information-path",
            title: "EV17 · Information and connectivity",
            description:
              "Charging-status information and automatic identification and authorisation.",
            icon: "Smartphone",
            accent: "purple",
          },
        ],
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "electric-vehicle-charging-applicability-note",
        type: "note",
        title: "Applicability of the EV services",
        body: "EV15 is applicable only when parking is available on site. For residential buildings, on-site parking may include a driveway, garage or dedicated parking space in a car park. For non-residential buildings, it may include garages, parking lots or dedicated parking spaces in a car park. Public parking is not considered on-site parking.\n\nEV16 and EV17 are applicable only when at least one on-site parking space provides a recharging point.",
        sourceRefs: ["sri-final-report-2020", "sri-calculation-sheet-v45"],
      },
      {
        id: "electric-vehicle-charging-overview-takeaway",
        type: "takeaway",
        body: "The Electric Vehicle Charging domain contains services for charging capacity, grid balancing, and charging information and connectivity.",
        sourceRefs: ["sri-final-report-2020"],
      },
    ],
  },

  {
    id: "ev-charging-capacity",
    sectionId: "electric-vehicle-charging-domain",
    order: 2,
    title: "EV Charging Capacity",
    question:
      "How is electric-vehicle charging capacity represented by the EV15 functionality levels?",
    previousLessonId: "electric-vehicle-charging-overview",
    nextLessonId: "ev-charging-grid-balancing",
    blocks: [
      {
        id: "electric-vehicle-charging-levels-context",
        type: "text",
        title: "EV charging levels and SRI functionality levels",
        body:
          "Technical classifications of electric-vehicle charging may describe charging levels, power characteristics and cable types. These classifications must not be confused with the functionality levels used by the SRI.\n\nEV15 does not assess these technical charging classifications. It assesses the availability of electric-vehicle charging infrastructure at the building, progressing from no charging availability to ducting or a simple power plug and then to recharging points for increasing proportions of the on-site parking spaces.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-ev-ev15",
        ],
      },

      ev15ServiceBlock,

      {
        id: "electric-vehicle-charging-ev15-takeaway",
        type: "takeaway",
        body:
          "EV15 functionality levels describe charging availability at the building, not the technical charging levels, power characteristics or cable classifications used to describe electric-vehicle charging.",
        sourceRefs: ["sri-final-report-2020", "sri2market-ev-ev15"],
      },
    ],
  },

  {
    id: "ev-charging-grid-balancing",
    sectionId: "electric-vehicle-charging-domain",
    order: 3,
    title: "EV Charging Grid Balancing",
    question:
      "How do the EV16 functionality levels distinguish uncontrolled, one-way controlled and two-way controlled charging?",
    previousLessonId: "ev-charging-capacity",
    nextLessonId: "ev-charging-information-and-connectivity",
    blocks: [
      {
        id: "electric-vehicle-charging-ev16-context",
        type: "text",
        title: "Smart charging and grid conditions",
        body: "In smart charging, the electrical power supplied to the vehicle battery is adjusted dynamically on the basis of communication signals.\n\nThe charging process can be adjusted automatically to reduce grid overload, use electricity from renewable energy sources, or shift charging to off-peak periods when electricity costs are lower. Different communication protocols and standards are used according to the level of communication and the information exchanged, including ISO 15118 and OCPP.\n\nAppropriate charging control can allow the vehicle to be charged when electricity prices are low and/or when charging will not place a significant additional load on the electricity grid.",
        sourceRefs: ["sri2market-ev-ev16"],
      },

      ev16ServiceBlock,

      {
        id: "electric-vehicle-charging-ev16-takeaway",
        type: "takeaway",
        body: "EV16 progresses from uncontrolled charging to one-way controlled charging and then to two-way controlled charging.",
        sourceRefs: ["sri-final-report-2020", "sri2market-ev-ev16"],
      },
    ],
  },

  {
    id: "ev-charging-information-and-connectivity",
    sectionId: "electric-vehicle-charging-domain",
    order: 4,
    title: "EV Charging Information and Connectivity",
    question:
      "How do the EV17 functionality levels represent charging information, identification and authorisation?",
    previousLessonId: "ev-charging-grid-balancing",
    nextLessonId: "monitoring-and-control-overview",
    blocks: [
      {
        id: "electric-vehicle-charging-ev17-context",
        type: "text",
        title: "Charging information and communication",
        body: "Information can be obtained from the vehicle display and from indicators that show the battery-charging status. In some vehicles, telematics can be used to monitor and receive information about energy consumption and vehicle charging. A mobile modem may provide an Internet connection.\n\nAvailable information can include battery level and capacity, charging status, charging start and stop times, and location. Communication protocols such as ISO 15118 and OCPP are used to exchange charging information. ISO 15118 supports secure information exchange between the electric vehicle and the charging station.",
        sourceRefs: ["sri2market-ev-ev17"],
      },

      ev17ServiceBlock,

      {
        id: "electric-vehicle-charging-ev17-takeaway",
        type: "takeaway",
        body: "EV17 progresses from no information to charging-status information and then to charging-status information combined with automatic driver identification and authorisation.",
        sourceRefs: ["sri-final-report-2020", "sri2market-ev-ev17"],
      },
    ],
  },
] satisfies readonly TheoryLesson[];