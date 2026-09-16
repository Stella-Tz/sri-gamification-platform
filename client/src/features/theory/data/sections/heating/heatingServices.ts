// client/src/features/theory/data/sections/heating/heatingServices.ts

import type { TheoryServiceBlock } from "../../../types/theory.types";

import h1aLevel0Image from "../../../../../assets/theory/section-3/services/h1a/level-0.png";
import h1aLevel1Image from "../../../../../assets/theory/section-3/services/h1a/level-1.png";
import h1aLevel2Image from "../../../../../assets/theory/section-3/services/h1a/level-2.png";
import h1aLevel3Image from "../../../../../assets/theory/section-3/services/h1a/level-3.png";
import h1aLevel4Image from "../../../../../assets/theory/section-3/services/h1a/level-4.png";

import h1bLevel0Image from "../../../../../assets/theory/section-3/services/h1b/level-0.png";
import h1bLevel1Image from "../../../../../assets/theory/section-3/services/h1b/level-1.png";
import h1bLevel2Image from "../../../../../assets/theory/section-3/services/h1b/level-2.png";
import h1bLevel3Image from "../../../../../assets/theory/section-3/services/h1b/level-3.png";

import h1cBLevel0Image from "../../../../../assets/theory/section-3/services/h1c-catalogue-b/level-0.png";
import h1cBLevel1Image from "../../../../../assets/theory/section-3/services/h1c-catalogue-b/level-1.png";
import h1cBLevel2Image from "../../../../../assets/theory/section-3/services/h1c-catalogue-b/level-2.png";

import h1dLevel0Image from "../../../../../assets/theory/section-3/services/h1d/level-0.png";
import h1dLevel1Image from "../../../../../assets/theory/section-3/services/h1d/level-1.png";
import h1dLevel2Image from "../../../../../assets/theory/section-3/services/h1d/level-2.png";
import h1dLevel3Image from "../../../../../assets/theory/section-3/services/h1d/level-3.png";
import h1dLevel4Image from "../../../../../assets/theory/section-3/services/h1d/level-4.png";

import h2aLevel0Image from "../../../../../assets/theory/section-3/services/h2a/level-0.png";
import h2aLevel1Image from "../../../../../assets/theory/section-3/services/h2a/level-1.png";
import h2aLevel2Image from "../../../../../assets/theory/section-3/services/h2a/level-2.png";

import h2bLevel0Image from "../../../../../assets/theory/section-3/services/h2b/level-0.png";
import h2bLevel1Image from "../../../../../assets/theory/section-3/services/h2b/level-1.png";
import h2bLevel2Image from "../../../../../assets/theory/section-3/services/h2b/level-2.png";
import h2bLevel3Image from "../../../../../assets/theory/section-3/services/h2b/level-3.png";

import h2dLevel0Image from "../../../../../assets/theory/section-3/services/h2d/level-0.png";
import h2dLevel1Image from "../../../../../assets/theory/section-3/services/h2d/level-1.png";
import h2dLevel2Image from "../../../../../assets/theory/section-3/services/h2d/level-2.png";
import h2dLevel3Image from "../../../../../assets/theory/section-3/services/h2d/level-3.png";
import h2dLevel4Image from "../../../../../assets/theory/section-3/services/h2d/level-4.png";

import h1cALevel0Image from "../../../../../assets/theory/section-3/services/h1c-catalogue-a/level-0.png";
import h1cALevel1Image from "../../../../../assets/theory/section-3/services/h1c-catalogue-a/level-1.png";
import h1cALevel2Image from "../../../../../assets/theory/section-3/services/h1c-catalogue-a/level-2.png";

import h1fLevel0Image from "../../../../../assets/theory/section-3/services/h1f/level-0.png";
import h1fLevel1Image from "../../../../../assets/theory/section-3/services/h1f/level-1.png";
import h1fLevel2Image from "../../../../../assets/theory/section-3/services/h1f/level-2.png";
import h1fLevel3Image from "../../../../../assets/theory/section-3/services/h1f/level-3.png";

import h4Level0Image from "../../../../../assets/theory/section-3/services/h4/level-0.png";
import h4Level1Image from "../../../../../assets/theory/section-3/services/h4/level-1.png";
import h4Level2Image from "../../../../../assets/theory/section-3/services/h4/level-2.png";
import h4Level3Image from "../../../../../assets/theory/section-3/services/h4/level-3.png";
import h4Level4Image from "../../../../../assets/theory/section-3/services/h4/level-4.png";

import h3Level0Image from "../../../../../assets/theory/section-3/services/h3/level-0.png";
import h3Level1Image from "../../../../../assets/theory/section-3/services/h3/level-1.png";
import h3Level2Image from "../../../../../assets/theory/section-3/services/h3/level-2.png";
import h3Level3Image from "../../../../../assets/theory/section-3/services/h3/level-3.png";
import h3Level4Image from "../../../../../assets/theory/section-3/services/h3/level-4.png";

/**
 * H1a — Heat Emission Control
 *
 * Included in Catalogues A and B.
 * Applies to heat emitters other than Thermally Activated
 * Building Systems (TABS).
 */
export const h1aServiceBlock = {
  id: "heating-service-h1a",
  type: "service",
  serviceCode: "H-1a",
  title: "Heat Emission Control",
  catalogue: "catalogues-a-and-b",
  applicability:
    "Applies to heat emitters other than Thermally Activated Building Systems (TABS).",
  purpose:
    "The purpose of this service is to regulate the heat supplied at room level, preferably by applying the control function to the heat emitter.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h1a",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H1a",
  levels: [
    {
      id: "heating-h1a-level-0",
      level: 0,
      title: "No automatic room-temperature control",
      description:
        "Room temperature is not controlled automatically. The heat emitter is operated manually through the controls connected to the equipment.",
      image: {
        id: "heating-h1a-level-0-image",
        src: h1aLevel0Image,
        alt:
          "Manual heat-emission control without automatic room-temperature control.",
      },
      examples: [
        "A radiator with a manually adjusted non-thermostatic valve.",
        "A fireplace in which the fuel is supplied manually.",
        "An electric room heater without a thermostat.",
      ],
    },
    {
      id: "heating-h1a-level-1",
      level: 1,
      title: "Central automatic control",
      description:
        "One or more rooms are controlled indirectly by a central automatic controller acting on heat distribution or heat generation. The controller uses a common reference setting and does not respond separately to the local demand of each room.",
      image: {
        id: "heating-h1a-level-1-image",
        src: h1aLevel1Image,
        alt:
          "Central automatic heating control serving several rooms without individual room control.",
      },
      examples: [
        "A central control that regulates a hot-water heating installation as a whole.",
        "A central electronic controller for a hot-water heating installation.",
        "A central electronic controller for an electric heating installation.",
      ],
    },
    {
      id: "heating-h1a-level-2",
      level: 2,
      title:
        "Individual room control without communication with BACS",
      description:
        "The heat supplied to each room is controlled by a function acting specifically for that room. The room controller does not exchange information with the Building Automation and Control System or with systems outside the room.",
      image: {
        id: "heating-h1a-level-2-image",
        src: h1aLevel2Image,
        alt:
          "Individual room heating control without communication with BACS.",
      },
      examples: [
        "A thermostatic valve installed on an individual radiator.",
        "A non-communicating electronic controller installed at room level.",
      ],
    },
    {
      id: "heating-h1a-level-3",
      level: 3,
      title:
        "Individual room control with communication between controllers and BACS",
      description:
        "The heat supplied to each room is controlled individually. The room controller also exchanges information with the Building Automation and Control System or with other systems outside the room. This communication allows the exchange of setpoints, demand and other status information; in addition, control of the distribution and generation systems keeps operating time to a minimum and setpoints at their optimal values.",
      image: {
        id: "heating-h1a-level-3-image",
        src: h1aLevel3Image,
        alt:
          "Individual room heating control communicating with BACS.",
      },
    },
    {
      id: "heating-h1a-level-4",
      level: 4,
      title:
        "Individual room control with BACS communication and presence detection",
      description:
        "The heat supplied to each room is controlled individually, the controller communicates with BACS, and presence detection is included in the control function. Presence-detection control is usually not applied to slow-response heat-emission systems with relatively high thermal mass, such as floor heating or wall heating.",
      image: {
        id: "heating-h1a-level-4-image",
        src: h1aLevel4Image,
        alt:
          "Individual room heating control with BACS communication and presence detection.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H1b — Emission Control for TABS in Heating Mode
 *
 * Included in Catalogue B.
 * Applies only to Thermally Activated Building Systems.
 *
 * The Final Report Method B catalogue (Annex F, Table 72) and the
 * SRI Calculation Sheet v4.5 both define this service through
 * Levels 0–3, with Level 3 combining intermittent operation and/or
 * room-temperature feedback control. The SRI2MARKET fact sheet's
 * summary page additionally lists a "Level 4" description, but its
 * own impact-scoring table evaluates only Levels 0–3, matching the
 * consolidated catalogue used here.
 */
export const h1bServiceBlock = {
  id: "heating-service-h1b",
  type: "service",
  serviceCode: "H-1b",
  title: "Emission Control for TABS — Heating Mode",
  catalogue: "catalogue-b",
  applicability:
    "Applies only to Thermally Activated Building Systems (TABS) in heating mode. This service is mostly restricted to non-residential buildings.",
  purpose:
    "The purpose of this service is to regulate the heat supplied at room level, preferably by applying the control function to the heat emitter.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h1b",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H1b",
  levels: [
    {
      id: "heating-h1b-level-0",
      level: 0,
      title: "No automatic room-temperature control",
      description:
        "There is no automatic control of room temperature. Heat emission from the TABS is controlled manually through the actuators connected to the equipment.",
      image: {
        id: "heating-h1b-level-0-image",
        src: h1bLevel0Image,
        alt:
          "TABS heating without automatic room-temperature control.",
      },
    },
    {
      id: "heating-h1b-level-1",
      level: 1,
      title: "Central automatic control",
      description:
        "The heat supplied to the TABS zone is regulated by a central automatic controller using a common reference temperature. The control does not act specifically for each individual room.",
      image: {
        id: "heating-h1b-level-1-image",
        src: h1bLevel1Image,
        alt:
          "Central automatic control of a TABS heating zone.",
      },
      examples: [
        "Supply-water temperature control based on the outside temperature.",
      ],
    },
    {
      id: "heating-h1b-level-2",
      level: 2,
      title: "Advanced central automatic control",
      description:
        "The heat supplied to the TABS zone is controlled centrally. The control aims to maintain the indoor temperature within a comfort range while minimising energy demand.",
      image: {
        id: "heating-h1b-level-2-image",
        src: h1bLevel2Image,
        alt:
          "Advanced central automatic control of a TABS heating zone.",
      },
    },
    {
      id: "heating-h1b-level-3",
      level: 3,
      title:
        "Advanced central automatic control with intermittent operation and/or room-temperature feedback control",
      description:
        "The heat supplied to the TABS zone is controlled centrally to maintain the indoor temperature within a comfort range while minimising energy demand. In addition, the control includes intermittent operation, room-temperature feedback control, or both. Intermittent operation can switch the circulation pump off at regular intervals to save electricity. Room-temperature feedback can correct the supply-water temperature in response to variations in internal heat gains.",
      image: {
        id: "heating-h1b-level-3-image",
        src: h1bLevel3Image,
        alt:
          "Advanced TABS control with intermittent operation or room-temperature feedback.",
      },
      examples: [
        "Supply-water temperature control based on the outside temperature combined with intermittent circulation-pump operation.",
        "Supply-water temperature control based on the outside temperature combined with room-temperature feedback.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H1c — Control of Distribution-Fluid Temperature
 *
 * Catalogue B version. The code H1c is catalogue-specific: the SRI
 * Calculation Sheet v4.5 selects this definition or the Catalogue A
 * definition (storage and shifting of thermal energy) dynamically
 * from the same row, depending on the assessment method selected by
 * the assessor.
 */
export const h1cCatalogueBServiceBlock = {
  id: "heating-service-h1c-catalogue-b",
  type: "service",
  serviceCode: "H-1c",
  title: "Control of Distribution-Fluid Temperature",
  catalogue: "catalogue-b",
  description:
    "Control of the distribution-fluid temperature in the supply or return flow of air or water.",
  applicability:
    "Not applicable to individual heaters, such as stoves.",
  purpose:
    "The purpose of this service is to reduce the temperature of the distribution fluid, either in the supply or return flow. A similar control function can also be applied to direct electric heating networks.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h1c-b",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H1c, Catalogue B (Levels 1–2); Level 0 original illustration generated for this thesis using OpenAI, based on the H1c Catalogue B service description.",
  levels: [
    {
      id: "heating-h1c-b-level-0",
      level: 0,
      title: "No automatic control",
      description:
        "The distribution-fluid temperature is not controlled automatically.",
      image: {
        id: "heating-h1c-b-level-0-image",
        src: h1cBLevel0Image,
        alt:
          "Grey prohibition symbol representing the absence of automatic distribution-fluid temperature control.",
      },
    },
    {
      id: "heating-h1c-b-level-1",
      level: 1,
      title: "Outside-temperature-compensated control",
      description:
        "The average temperature of the distributed water is reduced according to the outside temperature.",
      image: {
        id: "heating-h1c-b-level-1-image",
        src: h1cBLevel1Image,
        alt:
          "Distribution-fluid temperature adjusted according to the outside temperature.",
      },
      examples: [
        "An electronic controller that adjusts the distribution temperature using the measured outside temperature.",
      ],
    },
    {
      id: "heating-h1c-b-level-2",
      level: 2,
      title: "Demand-based control",
      description:
        "The average temperature of the distributed water is reduced based on indoor-temperature measurements.",
      image: {
        id: "heating-h1c-b-level-2-image",
        src: h1cBLevel2Image,
        alt:
          "Demand-based distribution-fluid temperature control using indoor-temperature measurements.",
      },
      examples: [
        "A controller that adjusts the distribution temperature using indoor-temperature measurements.",
        "A controller that uses indoor-temperature measurements to select comfort or economy operation.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H1d — Control of Distribution Pumps in Networks
 *
 * Included in Catalogue B.
 */
export const h1dServiceBlock = {
  id: "heating-service-h1d",
  type: "service",
  serviceCode: "H-1d",
  title: "Control of Distribution Pumps in Networks",
  catalogue: "catalogue-b",
  description:
    "This service concerns pumps used to circulate and distribute heating fluid. The controlled pumps may be installed at different levels of the heating distribution network.",
  applicability:
    "Only applicable to hydronic heating systems.",
  purpose:
    "The purpose of this service is to reduce the auxiliary energy demand of pumps by applying control functions to their operation.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h1d",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H1d (Levels 1–4); Level 0 original illustration generated for this thesis using OpenAI, based on the H1d service description.",
  levels: [
    {
      id: "heating-h1d-level-0",
      level: 0,
      title: "No automatic control",
      description:
        "The distribution pump is not controlled automatically.",
      image: {
        id: "heating-h1d-level-0-image",
        src: h1dLevel0Image,
        alt:
          "Heating distribution pump without automatic control.",
      },
    },
    {
      id: "heating-h1d-level-1",
      level: 1,
      title: "On/off control",
      description:
        "The pump switches on and off automatically. When it is operating, it runs at maximum speed.",
      image: {
        id: "heating-h1d-level-1-image",
        src: h1dLevel1Image,
        alt:
          "Heating distribution pump using automatic on-off control.",
      },
    },
    {
      id: "heating-h1d-level-2",
      level: 2,
      title: "Multi-stage control",
      description:
        "The pump switches on and off automatically. When it is operating, it can run at different fixed-speed stages.",
      image: {
        id: "heating-h1d-level-2-image",
        src: h1dLevel2Image,
        alt:
          "Heating distribution pump operating at different fixed-speed stages.",
      },
    },
    {
      id: "heating-h1d-level-3",
      level: 3,
      title: "Variable-speed pump control (pump unit internal estimations)",
      description:
        "The pump switches on and off automatically and can operate at different speeds based on a fixed or variable differential-pressure setpoint.",
      image: {
        id: "heating-h1d-level-3-image",
        src: h1dLevel3Image,
        alt:
          "Variable-speed distribution pump controlled according to differential pressure.",
      },
    },
    {
      id: "heating-h1d-level-4",
      level: 4,
      title: "Variable-speed pump control following an external demand signal",
      description:
        "The pump switches on and off automatically and can operate at different speeds based on fixed or variable differential pressure while following an external demand signal.",
      image: {
        id: "heating-h1d-level-4-image",
        src: h1dLevel4Image,
        alt:
          "Advanced variable-speed distribution pump following an external demand signal.",
      },
      examples: [
        "An external demand signal based on hydraulic requirements.",
        "An external demand signal based on temperature difference.",
        "An external demand signal based on energy optimisation.",
        "An external demand signal based on the assessed heating demand.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H2a — Heat Generator Control
 *
 * Applies to heat generators other than heat pumps.
 * Included in Catalogues A and B.
 */
export const h2aServiceBlock = {
  id: "heating-service-h2a",
  type: "service",
  serviceCode: "H-2a",
  title: "Heat Generator Control — All Except Heat Pumps",
  catalogue: "catalogues-a-and-b",
  applicability:
    "Only applicable to combustion heaters or district-heating systems. Heat pumps are covered by H2b.",
  purpose:
    "The purpose of this service is to reduce the operating temperature of the heat generator by applying the control function to the generator.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h2a",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H2a",
  levels: [
    {
      id: "heating-h2a-level-0",
      level: 0,
      title: "Constant-temperature control",
      description:
        "The generator temperature is maintained at a predefined constant value within a specified range of variation.",
      image: {
        id: "heating-h2a-level-0-image",
        src: h2aLevel0Image,
        alt:
          "Heat generator operating with constant-temperature control.",
      },
    },
    {
      id: "heating-h2a-level-1",
      level: 1,
      title:
        "Variable-temperature control according to outside temperature",
      description:
        "The generator temperature is adjusted according to the outside temperature.",
      image: {
        id: "heating-h2a-level-1-image",
        src: h2aLevel1Image,
        alt:
          "Heat-generator temperature adjusted according to the outside temperature.",
      },
      examples: [
        "An electronic controller installed at generator level that adjusts the generator temperature according to the outside temperature.",
      ],
    },
    {
      id: "heating-h2a-level-2",
      level: 2,
      title:
        "Variable-temperature control according to load",
      description:
        "The generator temperature is adjusted according to the system load, for example through the supply-water temperature setpoint.",
      image: {
        id: "heating-h2a-level-2-image",
        src: h2aLevel2Image,
        alt:
          "Heat-generator temperature adjusted according to the heating-system load.",
      },
      examples: [
        "A control at generator level that adjusts the generator temperature according to the supply-water temperature setpoint.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H2b — Heat Generator Control
 *
 * Applies only to heat pumps.
 * Included in Catalogues A and B.
 */
export const h2bServiceBlock = {
  id: "heating-service-h2b",
  type: "service",
  serviceCode: "H-2b",
  title: "Heat Generator Control for Heat Pumps",
  catalogue: "catalogues-a-and-b",
  applicability:
    "Applies only to heat pumps.",
  purpose:
    "The purpose of this service is to maximise the efficiency of the heat generator by applying the control function to the heat pump.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h2b",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H2b",
  levels: [
    {
      id: "heating-h2b-level-0",
      level: 0,
      title: "On/off heat-generator control",
      description:
        "The compressor or compressors switch on and off automatically. When operating, they run at maximum speed.",
      image: {
        id: "heating-h2b-level-0-image",
        src: h2bLevel0Image,
        alt:
          "Heat pump operating with automatic on-off compressor control.",
      },
    },
    {
      id: "heating-h2b-level-1",
      level: 1,
      title:
        "Multi-stage capacity control according to load or demand",
      description:
        "The compressor or compressors switch on and off automatically. When operating, the heat pump can provide different capacity levels through fixed operating stages.",
      image: {
        id: "heating-h2b-level-1-image",
        src: h2bLevel1Image,
        alt:
          "Heat pump using multiple fixed capacity stages according to load or demand.",
      },
      examples: [
        "Different compressors are switched on or off according to the heating load or demand.",
      ],
    },
    {
      id: "heating-h2b-level-2",
      level: 2,
      title:
        "Variable-capacity control according to load or demand",
      description:
        "The compressor or compressors switch on and off automatically. When operating, their capacity can vary according to the heating load or demand.",
      image: {
        id: "heating-h2b-level-2-image",
        src: h2bLevel2Image,
        alt:
          "Heat pump with variable-capacity control according to load or demand.",
      },
      examples: [
        "Hot-gas bypass is adjusted according to the load or demand.",
        "Inverter-frequency control adjusts compressor operation according to the load or demand.",
      ],
    },
    {
      id: "heating-h2b-level-3",
      level: 3,
      title:
        "Variable-capacity control according to load and electricity-grid signals",
      description:
        "The heat-generator capacity is controlled according to the heating load and external signals received from the electricity grid.",
      image: {
        id: "heating-h2b-level-3-image",
        src: h2bLevel3Image,
        alt:
          "Heat-pump capacity controlled according to heating load and external electricity-grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H2d — Sequencing of Different Heat Generators
 *
 * Applies only to systems with multiple heat generators.
 * Included only in Catalogue B.
 */
export const h2dServiceBlock = {
  id: "heating-service-h2d",
  type: "service",
  serviceCode: "H-2d",
  title: "Sequencing of Different Heat Generators",
  catalogue: "catalogue-b",
  applicability:
    "Only applicable to heating systems with multiple heat generators. This service is mostly restricted to large buildings.",
  purpose:
    "The purpose of this service is to determine the operating priority of different heat generators by applying the control function to one or more generators.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h2d",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H2d",
  levels: [
    {
      id: "heating-h2d-level-0",
      level: 0,
      title: "Priorities based only on operating time",
      description:
        "Each generator is assigned a priority intended to balance the operating time of the generators.",
      image: {
        id: "heating-h2d-level-0-image",
        src: h2dLevel0Image,
        alt:
          "Multiple heat generators sequenced according to their operating time.",
      },
    },
    {
      id: "heating-h2d-level-1",
      level: 1,
      title: "Control according to a fixed priority list",
      description:
        "Each generator is assigned a fixed priority. The priority can, for example, be based on the generator’s rated energy efficiency.",
      image: {
        id: "heating-h2d-level-1-image",
        src: h2dLevel1Image,
        alt:
          "Multiple heat generators controlled according to a fixed priority list.",
      },
    },
    {
      id: "heating-h2d-level-2",
      level: 2,
      title:
        "Dynamic priority based on current operating conditions",
      description:
        "Each generator is assigned a dynamic, load-based priority that takes account of current energy efficiency, carbon-dioxide emissions and generator capacity.",
      image: {
        id: "heating-h2d-level-2-image",
        src: h2dLevel2Image,
        alt:
          "Different heat generators assigned dynamic priorities according to current operating conditions.",
      },
      examples: [
        "The dynamic priority list can include solar, geothermal, combined heat and power, and fossil-fuel heat generators.",
      ],
    },
    {
      id: "heating-h2d-level-3",
      level: 3,
      title:
        "Dynamic priority based on current and predicted load",
      description:
        "Each generator is assigned a dynamic priority based on current and predicted load, energy efficiency, carbon-dioxide emissions and generator capacity.",
      image: {
        id: "heating-h2d-level-3-image",
        src: h2dLevel3Image,
        alt:
          "Heat generators dynamically sequenced according to current and predicted heating load.",
      },
    },
    {
      id: "heating-h2d-level-4",
      level: 4,
      title:
        "Dynamic priority including electricity-grid signals",
      description:
        "Each generator is assigned a dynamic priority based on current and predicted load, energy efficiency, carbon-dioxide emissions, generator capacity and external signals from the electricity grid.",
      image: {
        id: "heating-h2d-level-4-image",
        src: h2dLevel4Image,
        alt:
          "Heat generators dynamically sequenced using operating conditions and electricity-grid signals.",
      },
    },
  ],
  
} satisfies TheoryServiceBlock;

/**
 * H1c — Storage and Shifting of Thermal Energy
 *
 * Catalogue A version. The code H1c is catalogue-specific: the SRI
 * Calculation Sheet v4.5 selects this definition or the Catalogue B
 * definition (control of distribution-fluid temperature) dynamically
 * from the same row, depending on the assessment method selected by
 * the assessor.
 */
export const h1cCatalogueAServiceBlock = {
  id: "heating-service-h1c-catalogue-a",
  type: "service",
  serviceCode: "H-1c",
  title: "Storage and Shifting of Thermal Energy",
  catalogue: "catalogue-a",
  applicability:
    "Not applicable to individual heaters, such as stoves.",
  purpose:
    "The purpose of this service is to manage the charging of thermal-energy storage systems.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h1c-a",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H1c, Catalogue A (Levels 1–2); Level 0 original illustration generated for this thesis using OpenAI, based on the H1c Catalogue A service description.",
  levels: [
    {
      id: "heating-h1c-a-level-0",
      level: 0,
      title: "None",
      description:
        "No hot-water storage vessel is available for the heating installation.",
      image: {
        id: "heating-h1c-a-level-0-image",
        src: h1cALevel0Image,
        alt:
          "Grey prohibition symbol representing the absence of a hot-water storage vessel.",
      },
    },
    {
      id: "heating-h1c-a-level-1",
      level: 1,
      title: "Hot-water storage vessels available",
      description:
        "Hot-water storage vessels are connected to the heating installation. They are controlled through internal settings or signals without communication with BACS or the electricity grid.",
      image: {
        id: "heating-h1c-a-level-1-image",
        src: h1cALevel1Image,
        alt:
          "Hot-water storage vessel controlled through internal settings without communication with BACS or the grid.",
      },
      examples: [
        "Hot-water storage remains enabled continuously.",
        "Hot-water storage operates during periods defined by one or more schedules.",
      ],
    },
    {
      id: "heating-h1c-a-level-2",
      level: 2,
      title:
        "Hot-water storage vessels controlled based on external signals from BACS or the grid",
      description:
        "Hot-water storage vessels are connected to the heating installation and controlled through external signals from BACS or the electricity grid.",
      image: {
        id: "heating-h1c-a-level-2-image",
        src: h1cALevel2Image,
        alt:
          "Hot-water storage vessel controlled through external signals from BACS or the electricity grid.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H1f — Thermal Energy Storage for Building Heating
 *
 * Excludes Thermally Activated Building Systems.
 * Included only in Catalogue B.
 */
export const h1fServiceBlock = {
  id: "heating-service-h1f",
  type: "service",
  serviceCode: "H-1f",
  title: "Thermal Energy Storage for Building Heating — Excluding TABS",
  catalogue: "catalogue-b",
  applicability:
    "Only applicable where thermal-energy storage for building heating is present. Thermally Activated Building Systems (TABS) are excluded.",
  purpose:
    "The purpose of this service is to manage the charging of thermal-energy storage systems.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h1f",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H1f",
  levels: [
    {
      id: "heating-h1f-level-0",
      level: 0,
      title: "Continuous storage operation",
      description:
        "Thermal-energy storage operates continuously.",
      image: {
        id: "heating-h1f-level-0-image",
        src: h1fLevel0Image,
        alt:
          "Thermal-energy storage operating continuously.",
      },
    },
    {
      id: "heating-h1f-level-1",
      level: 1,
      title: "Time-scheduled storage operation",
      description:
        "Thermal-energy storage operates during periods defined by one or more schedules.",
      image: {
        id: "heating-h1f-level-1-image",
        src: h1fLevel1Image,
        alt:
          "Thermal-energy storage operating according to a schedule.",
      },
    },
    {
      id: "heating-h1f-level-2",
      level: 2,
      title: "Load prediction based storage operation",
      description:
        "Thermal-energy storage remains available, but its state of charge is reduced when storage is not needed according to the predicted load.",
      image: {
        id: "heating-h1f-level-2-image",
        src: h1fLevel2Image,
        alt:
          "Thermal-energy storage controlled according to predicted heating load.",
      },
    },
    {
      id: "heating-h1f-level-3",
      level: 3,
      title:
        "Heat storage capable of flexible control through grid signals",
      description:
        "Thermal-energy storage remains available, but charging is prioritised according to signals received from the electricity grid.",
      image: {
        id: "heating-h1f-level-3-image",
        src: h1fLevel3Image,
        alt:
          "Thermal-energy storage charging prioritised according to electricity-grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H4 — Flexibility and Interaction with the Electricity Grid
 *
 * Included only in Catalogue B.
 */
export const h4ServiceBlock = {
  id: "heating-service-h4",
  type: "service",
  serviceCode: "H-4",
  title: "Flexibility and Interaction with the Electricity Grid",
  catalogue: "catalogue-b",
  purpose:
    "The purpose of this service is to provide flexibility services to the electricity grid or interact with it by applying control to one or more subsystems or components of the heating system. Effects on indoor comfort conditions should be minimised.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h4",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H4 (Levels 1–4); Level 0 original illustration generated for this thesis using OpenAI, based on the H4 service description.",
  levels: [
    {
      id: "heating-h4-level-0",
      level: 0,
      title: "No automatic control",
      description:
        "The heating system does not automatically adapt its operation for interaction with the electricity grid.",
      image: {
        id: "heating-h4-level-0-image",
        src: h4Level0Image,
        alt:
          "Grey prohibition symbol representing the absence of automatic control for electricity-grid interaction.",
      },
    },
    {
      id: "heating-h4-level-1",
      level: 1,
      title: "Scheduled operation of the heating system",
      description:
        "Heating-system operation can be scheduled to prioritise specific times that may be indirectly associated with external grid signals.",
      image: {
        id: "heating-h4-level-1-image",
        src: h4Level1Image,
        alt:
          "Heating-system operation controlled through a predefined schedule.",
      },
    },
    {
      id: "heating-h4-level-2",
      level: 2,
      title:
        "Self-learning optimal control of the heating system",
      description:
        "Heating-system operation can be used to characterise the thermal response of the building or building unit. This information can then support adaptation of heating operation to external grid signals.",
      image: {
        id: "heating-h4-level-2-image",
        src: h4Level2Image,
        alt:
          "Self-learning heating control using information about the building thermal response.",
      },
    },
    {
      id: "heating-h4-level-3",
      level: 3,
      title:
        "Flexible control through electricity-grid signals",
      description:
        "Heating-system operation can be modified in response to external signals from the electricity grid.",
      image: {
        id: "heating-h4-level-3-image",
        src: h4Level3Image,
        alt:
          "Heating system adapting its operation to external electricity-grid signals.",
      },
    },
    {
      id: "heating-h4-level-4",
      level: 4,
      title:
        "Optimised control based on local forecasts and electricity-grid signals",
      description:
        "Heating-system operation can be modified using external grid signals and the predicted performance of the heating system.",
      image: {
        id: "heating-h4-level-4-image",
        src: h4Level4Image,
        alt:
          "Heating-system control based on local forecasts, predicted performance and electricity-grid signals.",
      },
      examples: [
        "Model predictive control using local forecasts and electricity-grid signals.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * H3 — Provision of Information Regarding
 * Heating-System Performance
 *
 * Included in Catalogues A and B.
 */
export const h3ServiceBlock = {
  id: "heating-service-h3",
  type: "service",
  serviceCode: "H-3",
  title: "Provision of Information Regarding Heating-System Performance",
  catalogue: "catalogues-a-and-b",
  purpose:
    "The purpose of this service is to inform building occupants and facility managers about the performance of the heating system.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-heating-h3",
  ],
  info:
    "Image sources: SRI2MARKET, Heating service H3 (Levels 1–4); Level 0 original illustration generated for this thesis using OpenAI, based on the H3 service description.",
  levels: [
    {
      id: "heating-h3-level-0",
      level: 0,
      title: "None",
      description:
        "No information about the performance of the heating system is reported.",
      image: {
        id: "heating-h3-level-0-image",
        src: h3Level0Image,
        alt:
          "Grey prohibition symbol representing the absence of heating-system performance reporting.",
      },
    },
    {
      id: "heating-h3-level-1",
      level: 1,
      title: "Reporting of current performance indicators",
      description:
        "Current performance indicators are reported centrally or remotely.",
      image: {
        id: "heating-h3-level-1-image",
        src: h3Level1Image,
        alt:
          "Heating-system display reporting current performance information.",
      },
      examples: [
        "Current temperature information.",
        "Submetered energy-consumption information.",
      ],
    },
    {
      id: "heating-h3-level-2",
      level: 2,
      title:
        "Reporting of current performance indicators and historical data",
      description:
        "Current performance indicators and historical data are reported centrally or remotely.",
      image: {
        id: "heating-h3-level-2-image",
        src: h3Level2Image,
        alt:
          "Remote interface displaying current and historical heating-system performance data.",
      },
    },
    {
      id: "heating-h3-level-3",
      level: 3,
      title:
        "Performance evaluation with forecasting or benchmarking",
      description:
        "Central or remote reporting supports performance evaluation and includes forecasting, benchmarking, or both.",
      image: {
        id: "heating-h3-level-3-image",
        src: h3Level3Image,
        alt:
          "Heating-system performance data being evaluated for forecasting or benchmarking.",
      },
    },
    {
      id: "heating-h3-level-4",
      level: 4,
      title:
        "Performance evaluation with predictive management and fault detection",
      description:
        "Central or remote reporting supports performance evaluation and includes forecasting or benchmarking, as well as predictive management and fault detection.",
      image: {
        id: "heating-h3-level-4-image",
        src: h3Level4Image,
        alt:
          "Heating-system performance evaluation including predictive management and fault detection.",
      },
    },
  ],
} satisfies TheoryServiceBlock;