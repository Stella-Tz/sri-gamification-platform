//client\src\features\theory\data\sections\ev\evServices.ts

import type { TheoryServiceBlock } from "../../../types/theory.types";

/**
 * Source policy for the Electric Vehicle Charging services:
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Electric Vehicle Charging material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership and applicability / assessment conditions.
 *   These are cross-checked against the Final Report and SRI2MARKET where the
 *   supporting material clarifies their technical meaning.
 *
 * - Service purposes, technical context, detailed functionality-level
 *   explanations, technical examples and service images are based primarily
 *   on the corresponding SRI2MARKET Electric Vehicle Charging material and are
 *   cross-checked against the consolidated catalogue definitions.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - The applicability field is used only when the Calculation Sheet states a
 *   technical condition under which the service is assessed.
 */

import ev15Level0Image from "../../../../../assets/theory/section-10/services/ev15/level-0.png";
import ev15Level1Image from "../../../../../assets/theory/section-10/services/ev15/level-1.png";
import ev15Level2Image from "../../../../../assets/theory/section-10/services/ev15/level-2.png";
import ev15Level3Image from "../../../../../assets/theory/section-10/services/ev15/level-3.png";
import ev15Level4Image from "../../../../../assets/theory/section-10/services/ev15/level-4.png";

import ev16Level0Image from "../../../../../assets/theory/section-10/services/ev16/level-0.png";
import ev16Level1Image from "../../../../../assets/theory/section-10/services/ev16/level-1.png";
import ev16Level2Image from "../../../../../assets/theory/section-10/services/ev16/level-2.png";

import ev17Level0Image from "../../../../../assets/theory/section-10/services/ev17/level-0.png";
import ev17Level1Image from "../../../../../assets/theory/section-10/services/ev17/level-1.png";
import ev17Level2Image from "../../../../../assets/theory/section-10/services/ev17/level-2.png";

/**
 * EV15 — EV Charging Capacity
 *
 * Included in Catalogues A and B.
 * Applicable only when parking spaces are available on site.
 */
export const ev15ServiceBlock = {
  id: "electric-vehicle-charging-service-ev15",
  type: "service",
  serviceCode: "EV15",
  title: "EV Charging Capacity",
  catalogue: "catalogues-a-and-b",
  applicability: "Applicable only when parking spaces are available on site.",
  purpose:
    "The service covers the availability of electric-vehicle charging capacity at the building.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ev-ev15",
  ],
  info: "Image source: SRI2MARKET, Electric Vehicle Charging service EV15.",
  levels: [
    {
      id: "electric-vehicle-charging-ev15-level-0",
      level: 0,
      title: "Not present",
      description:
        "No electric-vehicle charging availability is present.",
      image: {
        id: "electric-vehicle-charging-ev15-level-0-image",
        src: ev15Level0Image,
        alt: "No electric-vehicle charging point available.",
      },
    },
    {
      id: "electric-vehicle-charging-ev15-level-1",
      level: 1,
      title: "Ducting (or simple power plug) available",
      description:
        "The building has ducting or only a simple power plug available for electric-vehicle charging.",
      image: {
        id: "electric-vehicle-charging-ev15-level-1-image",
        src: ev15Level1Image,
        alt: "Ducting or a simple power plug available for electric-vehicle charging.",
      },
    },
    {
      id: "electric-vehicle-charging-ev15-level-2",
      level: 2,
      title: "0–9% of parking spaces have a recharging point",
      description:
        "This level applies when 0–9% of the building's parking spaces are equipped with recharging points.",
      image: {
        id: "electric-vehicle-charging-ev15-level-2-image",
        src: ev15Level2Image,
        alt: "Recharging points installed at zero to nine percent of the parking spaces.",
      },
    },
    {
      id: "electric-vehicle-charging-ev15-level-3",
      level: 3,
      title: "10–50% of parking spaces have a recharging point",
      description:
        "This level applies when 10–50% of the building's parking spaces are equipped with recharging points.",
      image: {
        id: "electric-vehicle-charging-ev15-level-3-image",
        src: ev15Level3Image,
        alt: "Recharging points installed at ten to fifty percent of the parking spaces.",
      },
    },
    {
      id: "electric-vehicle-charging-ev15-level-4",
      level: 4,
      title: ">50% of parking spaces have a recharging point",
      description:
        "This level applies when more than 50% of the building's parking spaces are equipped with recharging points.",
      image: {
        id: "electric-vehicle-charging-ev15-level-4-image",
        src: ev15Level4Image,
        alt: "Recharging points installed at more than fifty percent of the parking spaces.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * EV16 — EV Charging Grid Balancing
 *
 * Included in Catalogues A and B.
 * Applicable only when EV charging is available on site.
 */
export const ev16ServiceBlock = {
  id: "electric-vehicle-charging-service-ev16",
  type: "service",
  serviceCode: "EV16",
  title: "EV Charging Grid Balancing",
  catalogue: "catalogues-a-and-b",
  applicability: "Applicable only when EV charging is available on site.",
  purpose:
    "The purpose of this service is to coordinate charging operations with electricity-grid conditions.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ev-ev16",
  ],
  info: "Image source: SRI2MARKET, Electric Vehicle Charging service EV16.",
  levels: [
    {
      id: "electric-vehicle-charging-ev16-level-0",
      level: 0,
      title: "Not present (uncontrolled charging)",
      description:
        "No control signals are applied to the charging of the vehicle.",
      image: {
        id: "electric-vehicle-charging-ev16-level-0-image",
        src: ev16Level0Image,
        alt: "Electric-vehicle charging without control signals.",
      },
    },
    {
      id: "electric-vehicle-charging-ev16-level-1",
      level: 1,
      title:
        "1-way controlled charging (e.g. including desired departure time and grid signals for optimization)",
      description:
        "Electrical energy flows from the grid to the electric vehicle. Charging optimisation is based on communication signals that include information about renewable-energy availability, electricity pricing and electricity demand. The charging process is adapted to these data without worsening the user experience.",
      image: {
        id: "electric-vehicle-charging-ev16-level-1-image",
        src: ev16Level1Image,
        alt: "One-way controlled electric-vehicle charging using communication signals.",
      },
    },
    {
      id: "electric-vehicle-charging-ev16-level-2",
      level: 2,
      title:
        "2-way controlled charging (e.g. including desired departure time and grid signals for optimization)",
      description:
        "Two-way controlled charging is also referred to as Vehicle-to-Grid, or V2G. Energy can flow in both directions, allowing the vehicle to provide electricity to the grid when this is beneficial. The vehicle acts as an energy-storage system that serves the grid when electricity demand is high.",
      image: {
        id: "electric-vehicle-charging-ev16-level-2-image",
        src: ev16Level2Image,
        alt: "Two-way Vehicle-to-Grid charging between an electric vehicle and the electricity grid.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * EV17 — EV Charging Information and Connectivity
 *
 * Included in Catalogues A and B.
 * Applicable only when EV charging is available on site.
 */
export const ev17ServiceBlock = {
  id: "electric-vehicle-charging-service-ev17",
  type: "service",
  serviceCode: "EV17",
  title: "EV Charging Information and Connectivity",
  catalogue: "catalogues-a-and-b",
  applicability: "Applicable only when EV charging is available on site.",
  purpose:
    "The service provides access to information related to vehicle charging status and supports a secure connection between the vehicle and the charging station.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-ev-ev17",
  ],
  info: "Image source: SRI2MARKET, Electric Vehicle Charging service EV17.",
  levels: [
    {
      id: "electric-vehicle-charging-ev17-level-0",
      level: 0,
      title: "No information available",
      description: "No charging information is provided to the user.",
      image: {
        id: "electric-vehicle-charging-ev17-level-0-image",
        src: ev17Level0Image,
        alt: "Electric-vehicle charging without information provided to the user.",
      },
    },
    {
      id: "electric-vehicle-charging-ev17-level-1",
      level: 1,
      title: "Reporting information on EV charging status to the occupant",
      description:
        "Information about the status of the electric vehicle can be provided through indicators at the recharging point or through applications connected to the vehicle.",
      image: {
        id: "electric-vehicle-charging-ev17-level-1-image",
        src: ev17Level1Image,
        alt: "Charging-status information displayed at a recharging point or in a connected application.",
      },
    },
    {
      id: "electric-vehicle-charging-ev17-level-2",
      level: 2,
      title:
        "Reporting information on EV charging status to the occupant and automatic identification and authorization of the driver at the charging station (ISO 15118 compliant)",
      description:
        "ISO 15118 is a communication-protocol standard designed for electric vehicles. It defines a secure method for exchanging information between the charging station and the vehicle. The charging station can provide information about the charging process, including energy consumption and charging rate. ISO 15118 also enables automatic identification and authorisation of the driver through the Plug & Charge function.",
      image: {
        id: "electric-vehicle-charging-ev17-level-2-image",
        src: ev17Level2Image,
        alt: "Automatic identification and authorisation at an ISO 15118-compliant charging station.",
      },
    },
  ],
} satisfies TheoryServiceBlock;