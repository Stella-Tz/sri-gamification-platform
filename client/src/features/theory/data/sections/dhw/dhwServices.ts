// client/src/features/theory/data/sections/dhw/dhwServices.ts

import type { TheoryServiceBlock } from "../../../types/theory.types";

/**
 * Source policy for the Domestic Hot Water domain:
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / preconditions are cross-checked across the SRI Final
 *   Report, the SRI Calculation Sheet v4.5 and the corresponding SRI2MARKET
 *   Domestic Hot Water material.
 *
 * - The Delegated Regulation provides the normative methodological framework.
 *   The consolidated Final Report and the SRI Calculation Sheet v4.5 provide
 *   the main technical references for the catalogue structure and assessment
 *   implementation, while SRI2MARKET is used as a supporting source for
 *   service purposes, detailed technical explanations, examples and visual
 *   material.
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
 *   are not presented as service applicability.
 */

import dhw1aLevel0Image from "../../../../../assets/theory/section-5/services/dhw1a/level-0.png";
import dhw1aLevel1Image from "../../../../../assets/theory/section-5/services/dhw1a/level-1.png";
import dhw1aLevel2Image from "../../../../../assets/theory/section-5/services/dhw1a/level-2.png";
import dhw1aLevel3Image from "../../../../../assets/theory/section-5/services/dhw1a/level-3.png";

import dhw1bALevel0Image from "../../../../../assets/theory/section-5/services/dhw1b-catalogue-a/level-0.png";
import dhw1bALevel1Image from "../../../../../assets/theory/section-5/services/dhw1b-catalogue-a/level-1.png";
import dhw1bALevel2Image from "../../../../../assets/theory/section-5/services/dhw1b-catalogue-a/level-2.png";

import dhw1bBLevel0Image from "../../../../../assets/theory/section-5/services/dhw1b-catalogue-b/level-0.png";
import dhw1bBLevel1Image from "../../../../../assets/theory/section-5/services/dhw1b-catalogue-b/level-1.png";
import dhw1bBLevel2Image from "../../../../../assets/theory/section-5/services/dhw1b-catalogue-b/level-2.png";
import dhw1bBLevel3Image from "../../../../../assets/theory/section-5/services/dhw1b-catalogue-b/level-3.png";

import dhw1dLevel0Image from "../../../../../assets/theory/section-5/services/dhw1d/level-0.png";
import dhw1dLevel1Image from "../../../../../assets/theory/section-5/services/dhw1d/level-1.png";
import dhw1dLevel2Image from "../../../../../assets/theory/section-5/services/dhw1d/level-2.png";
import dhw1dLevel3Image from "../../../../../assets/theory/section-5/services/dhw1d/level-3.png";

import dhw2bLevel0Image from "../../../../../assets/theory/section-5/services/dhw2b/level-0.png";
import dhw2bLevel1Image from "../../../../../assets/theory/section-5/services/dhw2b/level-1.png";
import dhw2bLevel2Image from "../../../../../assets/theory/section-5/services/dhw2b/level-2.png";
import dhw2bLevel3Image from "../../../../../assets/theory/section-5/services/dhw2b/level-3.png";
import dhw2bLevel4Image from "../../../../../assets/theory/section-5/services/dhw2b/level-4.png";

import dhw3Level0Image from "../../../../../assets/theory/section-5/services/dhw3/level-0.png";
import dhw3Level1Image from "../../../../../assets/theory/section-5/services/dhw3/level-1.png";
import dhw3Level2Image from "../../../../../assets/theory/section-5/services/dhw3/level-2.png";
import dhw3Level3Image from "../../../../../assets/theory/section-5/services/dhw3/level-3.png";
import dhw3Level4Image from "../../../../../assets/theory/section-5/services/dhw3/level-4.png";

/**
 * DHW1a — Control of DHW Storage Charging
 *
 * Included in Catalogues A and B.
 * Applies to DHW storage with electric heating.
 */
export const dhw1aServiceBlock = {
  id: "dhw-service-dhw1a",
  type: "service",
  serviceCode: "DHW1a",
  title:
    "Control of DHW Storage Charging with Direct Electric Heating or an Integrated Electric Heat Pump",
  catalogue: "catalogues-a-and-b",
  description:
    "DHW1a is included in both Catalogue A and Catalogue B. Catalogue A uses functionality Levels 0–2, while Catalogue B uses the same Levels 0–2 and adds Level 3.",
  applicability:
    "Applicable only when domestic hot water storage with electric heating is present.",
  purpose:
    "The purpose of this service is to reduce the average domestic hot water storage temperature, preferably by applying the control function to storage charging.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dhw-dhw1a",
  ],
  info:
    "Image sources: SRI2MARKET, Domestic Hot Water service DHW1a",
  levels: [
    {
      id: "dhw-dhw1a-level-0",
      level: 0,
      title: "Automatic on/off control",
      description:
        "The storage is switched on and off automatically according to the temperature of the stored water.",
      image: {
        id: "dhw-dhw1a-level-0-image",
        src: dhw1aLevel0Image,
        alt:
          "Domestic hot water storage using automatic on-off control based on stored-water temperature.",
      },
    },
    {
      id: "dhw-dhw1a-level-1",
      level: 1,
      title: "Automatic on/off control with scheduled charging available",
      description:
        "Domestic hot water storage charging is enabled during specified periods and prevented during the remaining periods.",
      image: {
        id: "dhw-dhw1a-level-1-image",
        src: dhw1aLevel1Image,
        alt:
          "Domestic hot water storage charging enabled according to a time schedule.",
      },
    },
    {
      id: "dhw-dhw1a-level-2",
      level: 2,
      title:
        "Automatic on/off control with scheduled charging and multi-sensor storage management",
      description:
        "Domestic hot water storage charging is enabled during specified periods and prevented during the remaining periods. In addition, multi-sensor detection determines the remaining thermal capacity of the storage vessel, avoiding premature recharging.",
      image: {
        id: "dhw-dhw1a-level-2-image",
        src: dhw1aLevel2Image,
        alt:
          "Domestic hot water storage managed through scheduled charging and multiple storage sensors.",
      },
    },
    {
      id: "dhw-dhw1a-level-3",
      level: 3,
      title:
        "Automatic charging control based on local renewable availability or electricity-grid information (DR, DSM)",
      description:
        "This functionality level applies only in Catalogue B. Automatic charging control uses the local availability of renewable energy or information from the electricity grid. Domestic hot water storage charging is continuously enabled, but charging is prioritised according to the signals received.",
      image: {
        id: "dhw-dhw1a-level-3-image",
        src: dhw1aLevel3Image,
        alt:
          "Domestic hot water storage charging prioritised according to renewable-energy availability or electricity-grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * DHW1b — Control of DHW Storage Charging
 *
 * Catalogue A version.
 * The Catalogue A functionality levels are kept separate from
 * the Catalogue B functionality levels.
 */
export const dhw1bCatalogueAServiceBlock = {
  id: "dhw-service-dhw1b-catalogue-a",
  type: "service",
  serviceCode: "DHW1b",
  title: "Control of DHW Storage Charging",
  catalogue: "catalogue-a",
  applicability:
    "Applicable only when domestic hot water storage with non-electrical heat generation is present.",
  purpose:
    "The purpose of this service is to reduce the average domestic hot water storage temperature, preferably by applying the control function to storage charging.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dhw-dhw1b-a",
  ],
  info:
  "Image sources: SRI2MARKET, Domestic Hot Water service DHW1b, Catalogue A (Levels 1–2); Level 0 original illustration generated for this thesis using OpenAI, based on the DHW1b Catalogue A service description.",
  levels: [
    {
      id: "dhw-dhw1b-a-level-0",
      level: 0,
      title: "None",
      description: "No functionality is available.",
      image: {
        id: "dhw-dhw1b-a-level-0-image",
        src: dhw1bALevel0Image,
        alt:
          "Grey prohibition symbol representing Level 0: no domestic hot water storage-charging functionality.",
      },
    },
    {
      id: "dhw-dhw1b-a-level-1",
      level: 1,
      title: "Domestic hot water storage vessels available",
      description:
        "Storage vessels are connected to the domestic hot water installation. They are controlled through internal settings or signals without communication with BACS or the energy grid.",
      image: {
        id: "dhw-dhw1b-a-level-1-image",
        src: dhw1bALevel1Image,
        alt:
          "Domestic hot water storage controlled locally without communication with BACS or the grid.",
      },
      examples: [
        "Domestic hot water storage remains enabled continuously.",
        "Domestic hot water storage operates during periods defined by one or more schedules.",
      ],
    },
    {
      id: "dhw-dhw1b-a-level-2",
      level: 2,
      title:
        "Automatic Charging Control Based on Local Availability of Renewables or Information from the Electricity Grid (DR, DSM)",
      description:
        "Storage vessels are connected to the domestic hot water installation and controlled according to external signals, with communication to BACS or the energy grid.",
      image: {
        id: "dhw-dhw1b-a-level-2-image",
        src: dhw1bALevel2Image,
        alt:
          "Domestic hot water storage controlled through external signals from BACS, local renewable generation or the electricity grid.",
      },
      examples: [
        "Control based on renewable energy produced on site.",
        "Control based on demand-response information from the electricity grid.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * DHW1b — Control of DHW Storage Charging
 *
 * Catalogue B version.
 * Applies to DHW storage with non-electrical heat generation.
 */
export const dhw1bCatalogueBServiceBlock = {
  id: "dhw-service-dhw1b-catalogue-b",
  type: "service",
  serviceCode: "DHW1b",
  title: "Control of DHW Storage Charging Using Hot-Water Generation",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only when domestic hot water storage with non-electrical heat generation is present.",
  purpose:
    "The purpose of this service is to reduce the average domestic hot water storage temperature, preferably by applying the control function to storage charging.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dhw-dhw1b-b",
  ],
  info:
    "Image sources: SRI2MARKET, Domestic Hot Water service DHW1b, Catalogue B",
  levels: [
    {
      id: "dhw-dhw1b-b-level-0",
      level: 0,
      title: "Automatic on/off control",
      description:
        "The storage is switched on and off automatically according to the temperature of the stored water.",
      image: {
        id: "dhw-dhw1b-b-level-0-image",
        src: dhw1bBLevel0Image,
        alt:
          "Domestic hot water storage using automatic on-off control based on stored-water temperature.",
      },
    },
    {
      id: "dhw-dhw1b-b-level-1",
      level: 1,
      title: "Automatic on/off control with scheduled charging available",
      description:
        "Domestic hot water storage charging is enabled during specified periods and prevented during the remaining periods.",
      image: {
        id: "dhw-dhw1b-b-level-1-image",
        src: dhw1bBLevel1Image,
        alt:
          "Domestic hot water storage charging enabled according to a time schedule.",
      },
    },
    {
      id: "dhw-dhw1b-b-level-2",
      level: 2,
      title:
        "Automatic On/Off Control, Scheduled Charging Enable and Demand-Based Supply-Temperature Control or Multi-Sensor Storage Management",
      description:
        "Domestic hot water storage charging is enabled during specified periods and prevented during the remaining periods. In addition, either demand-based supply-temperature control is applied, with supply-water temperature information provided to the heat generator, or multi-sensor detection determines the remaining thermal capacity of the storage vessel and avoids premature recharging.",
      image: {
        id: "dhw-dhw1b-b-level-2-image",
        src: dhw1bBLevel2Image,
        alt:
          "Domestic hot water storage using scheduled charging, storage sensors or supply-temperature information.",
      },
    },
    {
      id: "dhw-dhw1b-b-level-3",
      level: 3,
      title:
        "Domestic hot water production system capable of automatic charging control based on external signals",
      description:
        "The domestic hot water production system can control storage charging automatically based on external signals. Domestic hot water storage charging is continuously enabled, but charging is prioritised according to the signals received.",
      image: {
        id: "dhw-dhw1b-b-level-3-image",
        src: dhw1bBLevel3Image,
        alt:
          "Domestic hot water storage charging controlled according to an external energy-network signal.",
      },
      examples: [
        "Automatic charging control based on a signal from a district-heating network.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * DHW1d — Control of DHW Storage Charging
 *
 * Included in Catalogue B.
 * Applies to DHW storage with a solar collector.
 */
export const dhw1dServiceBlock = {
  id: "dhw-service-dhw1d",
  type: "service",
  serviceCode: "DHW1d",
  title:
    "Control of DHW Storage Charging with a Solar Collector and Supplementary Heat Generation",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only when domestic hot water storage with a solar collector is present.",
  purpose:
    "The purpose of this service is to maximise domestic hot water storage charging through solar collectors, preferably by applying the control function to storage charging.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dhw-dhw1d",
  ],
  info:
    "Image sources: SRI2MARKET, Domestic Hot Water service DHW1d",
  levels: [
    {
      id: "dhw-dhw1d-level-0",
      level: 0,
      title: "Manual Selected Control of Solar Energy or Heat Generation",
      description:
        "Solar energy or heat generation is controlled manually.",
      image: {
        id: "dhw-dhw1d-level-0-image",
        src: dhw1dLevel0Image,
        alt:
          "Solar-assisted domestic hot water system using manual control.",
      },
    },
    {
      id: "dhw-dhw1d-level-1",
      level: 1,
      title:
        "Automatic control of solar storage charging (priority 1) and supplementary storage charging",
      description:
        "Domestic hot water storage charging is always enabled, with solar charging prioritised over supplementary charging.",
      image: {
        id: "dhw-dhw1d-level-1-image",
        src: dhw1dLevel1Image,
        alt:
          "Domestic hot water storage charged automatically with priority given to solar energy.",
      },
    },
    {
      id: "dhw-dhw1d-level-2",
      level: 2,
      title:
        "Automatic Control of Solar Storage Charge (Priority 1) and Supplementary Storage Charge and Demand-Oriented Supply or Multi-Sensor Storage Management",
      description:
        "Domestic hot water storage charging is always enabled, with solar charging prioritised over supplementary charging. In addition, either demand-oriented supply-temperature control is applied, with supply-water temperature information provided to the heat generator, or multi-sensor detection determines the remaining thermal capacity of the storage vessel and avoids premature recharging.",
      image: {
        id: "dhw-dhw1d-level-2-image",
        src: dhw1dLevel2Image,
        alt:
          "Solar-assisted domestic hot water storage using demand-oriented supply or multiple storage sensors.",
      },
    },
    {
      id: "dhw-dhw1d-level-3",
      level: 3,
      title:
        "Automatic Control of Solar Storage Charge (Priority 1) and Supplementary Storage Charge, Demand-Oriented Supply- and Return-Temperature Control and Multi-Sensor Storage Management",
      description:
        "Domestic hot water storage charging is always enabled, with solar charging prioritised over supplementary charging. Demand-oriented control is applied to the supply- and return-water temperatures, while multi-sensor detection determines the remaining thermal capacity of the storage vessel and avoids premature recharging.",
      image: {
        id: "dhw-dhw1d-level-3-image",
        src: dhw1dLevel3Image,
        alt:
          "Solar-assisted domestic hot water storage using multiple sensors and supply- and return-temperature information.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * DHW2b — Sequencing of Different DHW Generators
 *
 * Included in Catalogue B.
 * Applies only to systems with more than one heat generator.
 */
export const dhw2bServiceBlock = {
  id: "dhw-service-dhw2b",
  type: "service",
  serviceCode: "DHW2b",
  title: "Sequencing in Case of Different Domestic Hot Water Generators",
  catalogue: "catalogue-b",
  description:
   "In the priority-list implementation described for this service, a generator operates only when the generators with higher priority are operating at full load.",
  applicability:
    "Applicable only when multiple heat generators are present. This service is mostly restricted to large buildings.",
  purpose:
    "The purpose of this service is to determine the operating priority of different heat generators by applying the control function to one or more generators.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dhw-dhw2b",
  ],
  info:
    "Image sources: SRI2MARKET, Domestic Hot Water service DHW2b",
  levels: [
    {
      id: "dhw-dhw2b-level-0",
      level: 0,
      title: "Priorities based only on operating time",
      description:
        "Each generator is assigned a priority intended to balance the operating times of the generators.",
      image: {
        id: "dhw-dhw2b-level-0-image",
        src: dhw2bLevel0Image,
        alt:
          "Multiple domestic hot water generators sequenced according to their operating time.",
      },
    },
    {
      id: "dhw-dhw2b-level-1",
      level: 1,
      title:
        "Control according to a fixed priority list, for example based on rated energy efficiency",
      description:
        "Each generator is assigned a fixed operating priority. The priority list may, for example, be based on rated energy efficiency.",
      image: {
        id: "dhw-dhw2b-level-1-image",
        src: dhw2bLevel1Image,
        alt:
          "Multiple domestic hot water generators controlled according to a fixed priority list.",
      },
    },
    {
      id: "dhw-dhw2b-level-2",
      level: 2,
      title:
        "Control according to a dynamic priority list based on current energy efficiency, carbon-dioxide emissions and generator capacity",
      description:
        "Each generator is assigned a dynamic, load-based priority that takes account of current energy efficiency, carbon-dioxide emissions and generator capacity.",
      image: {
        id: "dhw-dhw2b-level-2-image",
        src: dhw2bLevel2Image,
        alt:
          "Different domestic hot water generators assigned dynamic priorities according to current operating conditions.",
      },
      examples: [
        "The priority can take account of the available capacity of solar, geothermal, combined heat and power, or fossil-fuel generators.",
      ],
    },
    {
      id: "dhw-dhw2b-level-3",
      level: 3,
      title:
        "Control according to a dynamic priority list based on current and predicted load, energy efficiency, carbon-dioxide emissions and generator capacity",
      description:
        "Each generator is assigned a dynamic priority based on the current and predicted load, energy efficiency, carbon-dioxide emissions and generator capacity.",
      image: {
        id: "dhw-dhw2b-level-3-image",
        src: dhw2bLevel3Image,
        alt:
          "Domestic hot water generators dynamically sequenced according to current and predicted load.",
      },
    },
    {
      id: "dhw-dhw2b-level-4",
      level: 4,
      title:
        "Control according to a dynamic priority list based on current and predicted load, energy efficiency, carbon-dioxide emissions, generator capacity and external electricity-grid signals",
      description:
        "Each generator is assigned a dynamic priority based on current and predicted load, energy efficiency, carbon-dioxide emissions, generator capacity and external signals from the electricity grid.",
      image: {
        id: "dhw-dhw2b-level-4-image",
        src: dhw2bLevel4Image,
        alt:
          "Domestic hot water generators dynamically sequenced using operating conditions and electricity-grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * DHW3 — Reporting Information Regarding DHW Performance
 *
 * Included in Catalogues A and B.
 */
export const dhw3ServiceBlock = {
  id: "dhw-service-dhw3",
  type: "service",
  serviceCode: "DHW3",
  title: "Report Information Regarding Domestic Hot Water Performance",
  catalogue: "catalogues-a-and-b",
  purpose:
    "The purpose of this service is to inform building occupants and facility managers about the performance of the domestic hot water system.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dhw-dhw3",
  ],
  info:
  "Image sources: SRI2MARKET, Domestic Hot Water service DHW3 (Levels 1–4); Level 0 original illustration generated for this thesis using OpenAI, based on the DHW3 service description.",
  levels: [
    {
      id: "dhw-dhw3-level-0",
      level: 0,
      title: "None",
      description:
        "No information about the performance of the domestic hot water system is reported.",
      image: {
        id: "dhw-dhw3-level-0-image",
        src: dhw3Level0Image,
        alt:
          "Grey prohibition symbol representing the absence of domestic hot water performance reporting.",
      },
    },
    {
      id: "dhw-dhw3-level-1",
      level: 1,
      title:
        "Indication of Actual Values (e.g. Temperatures, Submetering Energy Usage)",
      description:
        "Current performance indicators are reported centrally or remotely.",
      image: {
        id: "dhw-dhw3-level-1-image",
        src: dhw3Level1Image,
        alt:
          "Domestic hot water system display reporting current performance indicators.",
      },
      examples: [
        "Current temperature information.",
        "Submetered energy-consumption information.",
      ],
    },
    {
      id: "dhw-dhw3-level-2",
      level: 2,
      title:
        "Actual Values and Historical Data",
      description:
        "Current performance indicators and historical data are reported centrally or remotely.",
      image: {
        id: "dhw-dhw3-level-2-image",
        src: dhw3Level2Image,
        alt:
          "Remote interface displaying current and historical domestic hot water performance data.",
      },
    },
    {
      id: "dhw-dhw3-level-3",
      level: 3,
      title:
        "Performance Evaluation Including Forecasting and/or Benchmarking",
      description:
        "Central or remote reporting supports performance evaluation and includes forecasting, benchmarking, or both.",
      image: {
        id: "dhw-dhw3-level-3-image",
        src: dhw3Level3Image,
        alt:
          "Domestic hot water performance data evaluated for forecasting or benchmarking.",
      },
    },
    {
      id: "dhw-dhw3-level-4",
      level: 4,
      title:
        "Performance Evaluation Including Forecasting and/or Benchmarking; Also Including Predictive Management and Fault Detection",
      description:
        "Central or remote reporting supports performance evaluation and includes forecasting, benchmarking, or both, as well as predictive management and fault detection.",
      image: {
        id: "dhw-dhw3-level-4-image",
        src: dhw3Level4Image,
        alt:
          "Domestic hot water performance evaluation including predictive management and fault detection.",
      },
    },
  ],
} satisfies TheoryServiceBlock;
