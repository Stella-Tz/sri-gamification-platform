import type { TheoryServiceBlock } from "../../../types/theory.types";

/**
 * Source policy for the Ventilation domain:
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / preconditions are cross-checked across the SRI Final
 *   Report, the SRI Calculation Sheet v4.5 and the corresponding SRI2MARKET
 *   Ventilation material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership, triage rules and service preconditions.
 *   These are cross-checked against the Final Report and SRI2MARKET where the
 *   supporting material clarifies their technical meaning.
 *
 * - Service purposes, detailed functionality-level explanations, technical
 *   examples and service images are based primarily on the corresponding
 *   SRI2MARKET Ventilation material and are cross-checked against the
 *   consolidated catalogue definitions.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - "Always to be assessed" is an assessment rule and is not presented as
 *   a technical applicability condition.
 */

import v1aLevel0Image from "../../../../../assets/theory/section-6/services/v1a/level-0.png";
import v1aLevel1Image from "../../../../../assets/theory/section-6/services/v1a/level-1.png";
import v1aLevel2Image from "../../../../../assets/theory/section-6/services/v1a/level-2.png";
import v1aLevel3Image from "../../../../../assets/theory/section-6/services/v1a/level-3.png";
import v1aLevel4Image from "../../../../../assets/theory/section-6/services/v1a/level-4.png";

import v1cLevel0Image from "../../../../../assets/theory/section-6/services/v1c/level-0.png";
import v1cLevel1Image from "../../../../../assets/theory/section-6/services/v1c/level-1.png";
import v1cLevel2Image from "../../../../../assets/theory/section-6/services/v1c/level-2.png";
import v1cLevel3Image from "../../../../../assets/theory/section-6/services/v1c/level-3.png";
import v1cLevel4Image from "../../../../../assets/theory/section-6/services/v1c/level-4.png";

import v2cLevel0Image from "../../../../../assets/theory/section-6/services/v2c/level-0.png";
import v2cLevel1Image from "../../../../../assets/theory/section-6/services/v2c/level-1.png";
import v2cLevel2Image from "../../../../../assets/theory/section-6/services/v2c/level-2.png";

import v2dLevel0Image from "../../../../../assets/theory/section-6/services/v2d/level-0.png";
import v2dLevel1Image from "../../../../../assets/theory/section-6/services/v2d/level-1.png";
import v2dLevel2Image from "../../../../../assets/theory/section-6/services/v2d/level-2.png";
import v2dLevel3Image from "../../../../../assets/theory/section-6/services/v2d/level-3.png";

import v3Level0Image from "../../../../../assets/theory/section-6/services/v3/level-0.png";
import v3Level1Image from "../../../../../assets/theory/section-6/services/v3/level-1.png";
import v3Level2Image from "../../../../../assets/theory/section-6/services/v3/level-2.png";
import v3Level3Image from "../../../../../assets/theory/section-6/services/v3/level-3.png";

import v6Level0Image from "../../../../../assets/theory/section-6/services/v6/level-0.png";
import v6Level1Image from "../../../../../assets/theory/section-6/services/v6/level-1.png";
import v6Level2Image from "../../../../../assets/theory/section-6/services/v6/level-2.png";
import v6Level3Image from "../../../../../assets/theory/section-6/services/v6/level-3.png";

/**
 * V1a — Supply Air Flow Control at Room Level
 *
 * Included in Catalogues A and B.
 * The calculation framework lists this service as always to be assessed;
 * this is an assessment rule, not a technical applicability condition.
 */
export const v1aServiceBlock = {
  id: "ventilation-service-v1a",
  type: "service",
  serviceCode: "V1a",
  title: "Supply Air Flow Control at Room Level",
  catalogue: "catalogues-a-and-b",
  purpose:
    "The purpose of this service is to regulate the air flow supplied at room level. The control function is applied to the fan, preferably at room level.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ventilation-v1a",
  ],
  info: "Image source: SRI2MARKET, Ventilation service V1a.",
  levels: [
    {
      id: "ventilation-v1a-level-0",
      level: 0,
      title: "No ventilation system or manual control",
      description:
        "No ventilation system is present, or the system operates continuously or is controlled by a manual switch.",
      image: {
        id: "ventilation-v1a-level-0-image",
        src: v1aLevel0Image,
        alt:
          "No ventilation system, continuous ventilation operation or manual ventilation control.",
      },
    },
    {
      id: "ventilation-v1a-level-1",
      level: 1,
      title: "Clock control",
      description:
        "The system operates according to a given time schedule.",
      image: {
        id: "ventilation-v1a-level-1-image",
        src: v1aLevel1Image,
        alt: "Ventilation system controlled according to a time schedule.",
      },
    },
    {
      id: "ventilation-v1a-level-2",
      level: 2,
      title: "Occupancy detection control",
      description: "The system operates according to occupancy.",
      image: {
        id: "ventilation-v1a-level-2-image",
        src: v1aLevel2Image,
        alt: "Occupancy detection used to control room-level ventilation.",
      },
    },
    {
      id: "ventilation-v1a-level-3",
      level: 3,
      title:
        "Central demand control based on air-quality sensors (CO₂, VOC, humidity, …)",
      description:
        "The system operates according to indoor air quality.",
      image: {
        id: "ventilation-v1a-level-3-image",
        src: v1aLevel3Image,
        alt: "Central demand control using indoor-air-quality sensors.",
      },
    },
    {
      id: "ventilation-v1a-level-4",
      level: 4,
      title:
        "Local demand control based on air-quality sensors (CO₂, VOC, …), with local flow from or to the zone regulated by dampers",
      description:
        "The system operates according to the local indoor air quality.",
      image: {
        id: "ventilation-v1a-level-4-image",
        src: v1aLevel4Image,
        alt:
          "Local demand control using indoor-air-quality sensors and zone dampers.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * V1c — Air Flow or Pressure Control at Air-Handler Level
 *
 * Included in Catalogue B.
 * Applies only in the case of mechanical ventilation.
 */
export const v1cServiceBlock = {
  id: "ventilation-service-v1c",
  type: "service",
  serviceCode: "V1c",
  title: "Air Flow or Pressure Control at Air-Handler Level",
  catalogue: "catalogue-b",
  applicability: "Applicable only in the case of mechanical ventilation.",
  purpose:
    "The purpose of this service is to regulate air flow at the air-handling-unit level. The control function is applied to the air-handling unit.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ventilation-v1c",
  ],
  info: "Image source: SRI2MARKET, Ventilation service V1c.",
  levels: [
    {
      id: "ventilation-v1c-level-0",
      level: 0,
      title:
        "No automatic control: continuous air-flow supply for the maximum load of all rooms",
      description:
        "The system operates continuously and provides air flow for the maximum load of all rooms.",
      image: {
        id: "ventilation-v1c-level-0-image",
        src: v1cLevel0Image,
        alt:
          "Air-handling unit operating continuously for the maximum load of all rooms.",
      },
    },
    {
      id: "ventilation-v1c-level-1",
      level: 1,
      title:
        "On/Off Time Control: Continuous Air-Flow Supply for the Maximum Load of All Rooms During Nominal Occupancy Time",
      description:
        "The air-handling-unit fan is controlled through a time-based on/off mechanism. During nominal occupancy time, fan pressure is at its maximum.",
      image: {
        id: "ventilation-v1c-level-1-image",
        src: v1cLevel1Image,
        alt: "Time-based on/off control of an air-handling-unit fan.",
      },
    },
    {
      id: "ventilation-v1c-level-2",
      level: 2,
      title:
        "Multi-stage control to reduce the auxiliary energy demand of the fan",
      description:
        "The fan is controlled through multiple stages. When it is operating, fan pressure can vary according to predefined stages.",
      image: {
        id: "ventilation-v1c-level-2-image",
        src: v1cLevel2Image,
        alt:
          "Air-handling-unit fan controlled through predefined operating stages.",
      },
    },
    {
      id: "ventilation-v1c-level-3",
      level: 3,
      title:
        "Automatic flow or pressure control without pressure reset: load-dependent air-flow supply for the demand of all connected rooms",
      description:
        "The fan is controlled according to the air-flow demand from the rooms. Pressure-reset or critical-zone control is not applied.",
      image: {
        id: "ventilation-v1c-level-3-image",
        src: v1cLevel3Image,
        alt:
          "Automatic fan control based on room air-flow demand without pressure reset.",
      },
    },
    {
      id: "ventilation-v1c-level-4",
      level: 4,
      title:
        "Automatic Flow or Pressure Control with Pressure Reset: Load-Dependent Air-Flow Supply for the Demand of All Connected Rooms (for Variable-Air-Volume Systems with Variable-Frequency Drives)",
      description:
        "The fan is controlled according to the air-flow demand from the rooms. Pressure-reset or critical-zone control is applied. This level concerns variable-air-volume systems with variable-frequency drives.",
      image: {
        id: "ventilation-v1c-level-4-image",
        src: v1cLevel4Image,
        alt:
          "Automatic fan control with pressure reset in a variable-air-volume system.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * V2c — Heat Recovery Control: Prevention of Overheating
 *
 * Included in Catalogue B.
 * Applies only in the case of mechanical ventilation with heat recovery.
 */
export const v2cServiceBlock = {
  id: "ventilation-service-v2c",
  type: "service",
  serviceCode: "V2c",
  title: "Heat Recovery Control: Prevention of Overheating",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only in the case of mechanical ventilation with heat recovery.",
  purpose:
    "The purpose of this service is to prevent overheating in the heat-recovery unit. The control function is applied to the heat-recovery unit.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ventilation-v2c",
  ],
  info: "Image source: SRI2MARKET, Ventilation service V2c.",
  levels: [
    {
      id: "ventilation-v2c-level-0",
      level: 0,
      title: "Without Overheating Control",
      description: "No overheating control is provided.",
      image: {
        id: "ventilation-v2c-level-0-image",
        src: v2cLevel0Image,
        alt: "Heat-recovery system without overheating control.",
      },
    },
    {
      id: "ventilation-v2c-level-1",
      level: 1,
      title:
        "Modulate or Bypass Heat Recovery Based on Sensors in Air Exhaust",
      description:
        "Heat recovery is modulated or bypassed. Overheating control is applied on the basis of temperature sensors in the extract air.",
      image: {
        id: "ventilation-v2c-level-1-image",
        src: v2cLevel1Image,
        alt: "Heat-recovery control using extract-air temperature sensors.",
      },
    },
    {
      id: "ventilation-v2c-level-2",
      level: 2,
      title:
        "Modulate or Bypass Heat Recovery Based on Multiple Room-Temperature Sensors or Predictive Control",
      description:
        "Heat recovery is modulated or bypassed on the basis of temperature sensors in several rooms or predictive control.",
      image: {
        id: "ventilation-v2c-level-2-image",
        src: v2cLevel2Image,
        alt:
          "Heat-recovery control using multiple room-temperature sensors or predictive control.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * V2d — Supply Air Temperature Control at Air-Handling-Unit Level
 *
 * Included in Catalogue B.
 * Applies only when mechanical ventilation supplies heating.
 */
export const v2dServiceBlock = {
  id: "ventilation-service-v2d",
  type: "service",
  serviceCode: "V2d",
  title: "Supply Air Temperature Control at Air-Handling-Unit Level",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only in the case of mechanical ventilation that supplies heating.",
  purpose:
    "The purpose of this service is to determine the supply-air-temperature setpoint at air-handling-unit level. The control function is preferably applied at air-handling-unit level.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ventilation-v2d",
  ],
  info: "Image source: SRI2MARKET, Ventilation service V2d.",
  levels: [
    {
      id: "ventilation-v2d-level-0",
      level: 0,
      title: "No automatic control",
      description: "No automatic control is provided.",
      image: {
        id: "ventilation-v2d-level-0-image",
        src: v2dLevel0Image,
        alt: "Supply-air-temperature control without automatic control.",
      },
    },
    {
      id: "ventilation-v2d-level-1",
      level: 1,
      title: "Constant setpoint",
      description:
        "A control loop controls the supply-air temperature. The setpoint is constant and can be modified only manually.",
      image: {
        id: "ventilation-v2d-level-1-image",
        src: v2dLevel1Image,
        alt: "Supply-air-temperature control using a constant setpoint.",
      },
    },
    {
      id: "ventilation-v2d-level-2",
      level: 2,
      title: "Variable setpoint with outdoor-temperature compensation",
      description:
        "A control loop controls the supply-air temperature. The setpoint is a simple function of the outdoor temperature, for example a linear function.",
      image: {
        id: "ventilation-v2d-level-2-image",
        src: v2dLevel2Image,
        alt:
          "Supply-air-temperature setpoint compensated according to outdoor temperature.",
      },
    },
    {
      id: "ventilation-v2d-level-3",
      level: 3,
      title: "Variable setpoint with load-dependent compensation",
      description:
        "A control loop controls the supply-air temperature. The setpoint is defined as a function of room loads. In practice, this can only be achieved through an integrated control system that collects temperatures or actuator positions from the different spaces.",
      image: {
        id: "ventilation-v2d-level-3-image",
        src: v2dLevel3Image,
        alt:
          "Supply-air-temperature setpoint adjusted according to room loads.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * V3 — Free Cooling with Mechanical Ventilation System
 *
 * Included in Catalogue B.
 * Applies only in the case of mechanical or hybrid ventilation.
 */
export const v3ServiceBlock = {
  id: "ventilation-service-v3",
  type: "service",
  serviceCode: "V3",
  title: "Free Cooling with Mechanical Ventilation System",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only in the case of mechanical or hybrid ventilation.",
  purpose:
  "The purpose of this service is to use mechanical ventilation for free cooling in order to reduce the need for mechanical cooling. The control function is applied to the mechanical ventilation system.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ventilation-v3",
  ],
  info: "Image source: SRI2MARKET, Ventilation service V3.",
  levels: [
    {
      id: "ventilation-v3-level-0",
      level: 0,
      title: "No automatic control",
      description: "No automatic control is provided.",
      image: {
        id: "ventilation-v3-level-0-image",
        src: v3Level0Image,
        alt:
          "Mechanical ventilation system without automatic free-cooling control.",
      },
    },
    {
      id: "ventilation-v3-level-1",
      level: 1,
      title: "Night cooling",
      description:
        "The amount of outdoor air is set to its maximum during the unoccupied period, provided that the room temperature is above the setpoint for the comfort period and that the difference between room temperature and outdoor temperature is above a specified limit.",
      image: {
        id: "ventilation-v3-level-1-image",
        src: v3Level1Image,
        alt:
          "Mechanical ventilation used for night cooling during an unoccupied period.",
      },
    },
    {
      id: "ventilation-v3-level-2",
      level: 2,
      title:
        "Free cooling: air flows modulated during all time periods to minimise mechanical cooling",
      description:
        "The amounts of outdoor air and recirculated air are modulated during all time periods to minimise the amount of mechanical cooling. The calculation is based on temperatures.",
      image: {
        id: "ventilation-v3-level-2-image",
        src: v3Level2Image,
        alt:
          "Outdoor and recirculated air flows modulated according to temperature.",
      },
    },
    {
      id: "ventilation-v3-level-3",
      level: 3,
      title: "H,x-directed control",
      description:
        "The amounts of outdoor air and recirculated air are modulated during all time periods to minimise the amount of mechanical cooling. The calculation is based on temperature and humidity (enthalpy).",
      image: {
        id: "ventilation-v3-level-3-image",
        src: v3Level3Image,
        alt: "Free-cooling control based on temperature and humidity.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * V6 — Reporting Information Regarding Indoor Air Quality
 *
 * Included in Catalogues A and B.
 * The calculation framework lists this service as always to be assessed;
 * this is an assessment rule, not a technical applicability condition.
 */
export const v6ServiceBlock = {
  id: "ventilation-service-v6",
  type: "service",
  serviceCode: "V6",
  title: "Reporting Information Regarding Indoor Air Quality",
  catalogue: "catalogues-a-and-b",
  purpose:
    "The purpose of this service is to inform building occupants and facility managers about the performance of the mechanical ventilation system in relation to indoor-air-quality parameters.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ventilation-v6",
  ],
  info:
    "Image sources: SRI2MARKET, Ventilation service V6 (Levels 1–3); Level 0 original illustration generated for this thesis using OpenAI, based on the V6 service description.",
  levels: [
    {
      id: "ventilation-v6-level-0",
      level: 0,
      title: "None",
      description:
        "No information regarding indoor air quality is provided.",
      image: {
        id: "ventilation-v6-level-0-image",
        src: v6Level0Image,
        alt: "No indoor-air-quality information is provided.",
      },
    },
    {
      id: "ventilation-v6-level-1",
      level: 1,
      title:
        "Air-quality sensors, such as CO₂ sensors, and autonomous real-time monitoring",
      description:
        "Current performance indicators from air-quality sensors, such as CO₂ sensors, are reported centrally or remotely, with autonomous monitoring in real time.",
      image: {
        id: "ventilation-v6-level-1-image",
        src: v6Level1Image,
        alt:
          "Air-quality sensor providing current indoor-air-quality information.",
      },
    },
    {
      id: "ventilation-v6-level-2",
      level: 2,
      title:
        "Real-time monitoring and historical indoor-air-quality information available to occupants",
      description:
        "Real-time monitoring and historical indoor-air-quality information are available to occupants.",
      image: {
        id: "ventilation-v6-level-2-image",
        src: v6Level2Image,
        alt:
          "Current and historical indoor-air-quality information available to occupants.",
      },
    },
    {
      id: "ventilation-v6-level-3",
      level: 3,
      title:
        "Real-time and historical indoor-air-quality information with warnings concerning maintenance needs or occupant actions",
      description:
        "Real-time monitoring and historical indoor-air-quality information are available to occupants, together with warnings concerning maintenance needs or occupant actions, such as opening a window.",
      image: {
        id: "ventilation-v6-level-3-image",
        src: v6Level3Image,
        alt:
          "Indoor-air-quality information with maintenance or occupant-action warnings.",
      },
    },
  ],
} satisfies TheoryServiceBlock;
