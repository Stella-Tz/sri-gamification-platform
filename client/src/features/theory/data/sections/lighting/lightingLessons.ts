import type { TheoryLesson } from "../../../types/theory.types";

/**
 * Source policy for the Lighting lessons:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and are cross-checked against the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Lighting material.
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
 *
 * - "Always to be assessed" is an assessment rule and is not presented as
 *   a technical applicability condition.
 */

import lightingDomainOverviewImage from "../../../../../assets/theory/section-7/lesson-1/lighting-domain-overview.png";

import { l1aServiceBlock, l2ServiceBlock } from "./lightingServices";

export const lightingLessons = [
  {
    id: "lighting-overview",
    sectionId: "lighting-domain",
    order: 1,
    title: "Lighting Overview",
    question: "What does the Lighting domain cover?",
    previousLessonId: "ventilation-indoor-air-quality-information",
    nextLessonId: "occupancy-control-for-indoor-lighting",
    blocks: [
      {
        id: "lighting-domain-introduction",
        type: "text",
        title: "The Lighting domain",
        body:
          "Lighting is one of the nine technical domains considered in the SRI methodology. The Lighting domain evaluates smart-ready services concerned with the control of indoor artificial lighting.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "lighting-energy-context",
        type: "text",
        title: "Lighting and building energy use",
        body:
          "Buildings account for approximately 37% of final energy consumption in the European Union. Lighting represents 4.1% of household energy consumption in a country such as Spain, while in non-residential buildings it can account for 15–45% of the building's total energy consumption, depending on the building use, including offices, hospitals and schools. Lighting control is therefore a fundamental aspect of building energy efficiency, especially in tertiary-sector buildings.\n\nLighting-control systems for active lighting reduction can go beyond a traditional on/off switch. They allow the light in a space to be adapted to different situations, supporting improved comfort and optimised energy consumption.",
        sourceRefs: ["sri2market-lighting-overview"],
      },
      {
        id: "lighting-domain-overview-image",
        type: "image",
        title: "Lighting domain overview",
        image: {
          id: "lighting-domain-overview",
          src: lightingDomainOverviewImage,
          alt: "Overview of the Lighting domain.",
          caption: "Overview of the Lighting domain.",
          info: "Source: SRI2MARKET, Lighting Domain (L) Overview.",
          presentation: "wide",
        },
        sourceRefs: ["sri2market-lighting-overview"],
      },
      {
        id: "lighting-services-introduction",
        type: "text",
        title: "Smart-ready services for lighting",
        body:
          "Across Catalogues A and B, the Lighting domain contains two smart-ready services. L1a assesses occupancy control for indoor lighting at room level and is included in both catalogues. L2 assesses control of artificial-lighting power based on daylight levels and is included only in Catalogue B. The following lessons present these services and their functionality levels.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
          "sri2market-lighting-l1a",
          "sri2market-lighting-l2",
        ],
      },
      {
        id: "lighting-section-learning-path",
        type: "path",
        showArrows: false,
        steps: [
          {
            id: "lighting-path-occupancy-control",
            title: "Occupancy control",
            description:
              "Room-level control of indoor lighting according to the presence or absence of occupants.",
            icon: "Users",
            accent: "blue",
          },
          {
            id: "lighting-path-daylight-control",
            title: "Daylight-based control",
            description:
              "Control of artificial-lighting power according to the daylight available in the space.",
            icon: "Sun",
            accent: "amber",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-lighting-l1a",
          "sri2market-lighting-l2",
        ],
      },
      {
        id: "lighting-overview-takeaway",
        type: "takeaway",
        body:
          "The Lighting domain covers occupancy control for indoor lighting and control of artificial-lighting power based on daylight levels.",
        sourceRefs: ["sri-final-report-2020"],
      },
    ],
  },

  {
    id: "occupancy-control-for-indoor-lighting",
    sectionId: "lighting-domain",
    order: 2,
    title: "Occupancy Control for Indoor Lighting",
    question: "How does the SRI assess occupancy control for indoor lighting?",
    previousLessonId: "lighting-overview",
    nextLessonId: "daylight-based-lighting-control",
    blocks: [
      {
        id: "lighting-l1a-introduction",
        type: "text",
        title: "Occupancy-control service",
        body:
          "This lesson examines L1a, the Lighting service for occupancy control of indoor lighting.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-lighting-l1a",
        ],
      },
      {
        id: "lighting-l1a-occupant-behaviour",
        type: "note",
        title: "Observed patterns in manual lighting use",
        body:
          "Field studies of manual lighting use in tertiary-sector buildings, specifically schools and offices, found that the probability of switching on the luminaires in a space is related to the minimum illuminance of the work area. Lights tend to be switched on when users enter the space and switched off when they leave. When lighting is on, generally either all or none of the luminaires in the room are on.",
        sourceRefs: ["sri2market-lighting-l1a"],
      },

      l1aServiceBlock,

      {
        id: "lighting-l1a-takeaway",
        type: "takeaway",
        body:
  "L1a progresses from manual room-level switching to manual switching with an additional automatic switch-off function. Level 2 introduces occupancy detection with automatic switch-on and subsequent dimming or automatic switch-off, while Level 3 uses manual or partial automatic switch-on with occupancy-based dimming or automatic switch-off.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-lighting-l1a",
        ],
      },
    ],
  },

  {
    id: "daylight-based-lighting-control",
    sectionId: "lighting-domain",
    order: 3,
    title: "Daylight-Based Lighting Control",
    question:
      "How does the SRI assess artificial-lighting control based on daylight levels?",
    previousLessonId: "occupancy-control-for-indoor-lighting",
    nextLessonId: "dynamic-building-envelope-overview",
    blocks: [
      {
        id: "lighting-l2-introduction",
        type: "text",
        title: "Daylight-based lighting service",
        body:
          "This lesson examines L2, the Lighting service for controlling artificial-lighting power based on daylight levels.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-lighting-l2",
        ],
      },

      l2ServiceBlock,

      {
        id: "lighting-l1a-l2-difference-note",
        type: "note",
        title: "L1a and L2 assess different control functions",
        body:
          "L1a assesses occupancy control for indoor lighting. L2 assesses control of artificial-lighting power based on daylight levels.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-lighting-l1a",
          "sri2market-lighting-l2",
        ],
      },
      {
        id: "lighting-l2-takeaway",
        type: "takeaway",
        body:
          "L2 progresses from central manual control to room- or zone-level manual control, automatic switching, automatic dimming and automatic dimming with scene-based light control.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri2market-lighting-l2",
        ],
      },
    ],
  },
] satisfies readonly TheoryLesson[];
