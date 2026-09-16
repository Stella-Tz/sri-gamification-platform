// client/src/features/theory/data/sections/cooling/coolingServices.ts

import type { TheoryServiceBlock } from "../../../types/theory.types";

/**
 * Source policy for the Cooling domain:
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / preconditions are cross-checked across the SRI Final
 *   Report, the SRI Calculation Sheet v4.5 and the corresponding SRI2MARKET
 *   Cooling material.
 *
 * - The Delegated Regulation and official SRI methodology provide the
 *   normative methodological framework. The consolidated Final Report and
 *   Calculation Sheet v4.5 anchor the catalogue structure and assessment
 *   data, while SRI2MARKET is used for service purposes, detailed technical
 *   explanations, examples and visual material.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the consolidated catalogue,
 *   practical guidance / triage logic and the technical meaning described in
 *   the supporting material.
 *
 * - Workbook notes that do not represent technical applicability conditions
 *   are not presented as service applicability.
 */

import c1aLevel0Image from "../../../../../assets/theory/section-4/services/c1a/level-0.png";
import c1aLevel1Image from "../../../../../assets/theory/section-4/services/c1a/level-1.png";
import c1aLevel2Image from "../../../../../assets/theory/section-4/services/c1a/level-2.png";
import c1aLevel3Image from "../../../../../assets/theory/section-4/services/c1a/level-3.png";
import c1aLevel4Image from "../../../../../assets/theory/section-4/services/c1a/level-4.png";

import c1bLevel0Image from "../../../../../assets/theory/section-4/services/c1b/level-0.png";
import c1bLevel1Image from "../../../../../assets/theory/section-4/services/c1b/level-1.png";
import c1bLevel2Image from "../../../../../assets/theory/section-4/services/c1b/level-2.png";
import c1bLevel3Image from "../../../../../assets/theory/section-4/services/c1b/level-3.png";

import c1cLevel0Image from "../../../../../assets/theory/section-4/services/c1c/level-0.png";
import c1cLevel1Image from "../../../../../assets/theory/section-4/services/c1c/level-1.png";
import c1cLevel2Image from "../../../../../assets/theory/section-4/services/c1c/level-2.png";

import c1dLevel0Image from "../../../../../assets/theory/section-4/services/c1d/level-0.png";
import c1dLevel1Image from "../../../../../assets/theory/section-4/services/c1d/level-1.png";
import c1dLevel2Image from "../../../../../assets/theory/section-4/services/c1d/level-2.png";
import c1dLevel3Image from "../../../../../assets/theory/section-4/services/c1d/level-3.png";
import c1dLevel4Image from "../../../../../assets/theory/section-4/services/c1d/level-4.png";

import c1fLevel0Image from "../../../../../assets/theory/section-4/services/c1f/level-0.png";
import c1fLevel1Image from "../../../../../assets/theory/section-4/services/c1f/level-1.png";
import c1fLevel2Image from "../../../../../assets/theory/section-4/services/c1f/level-2.png";

import c1gLevel0Image from "../../../../../assets/theory/section-4/services/c1g/level-0.png";
import c1gLevel1Image from "../../../../../assets/theory/section-4/services/c1g/level-1.png";
import c1gLevel2Image from "../../../../../assets/theory/section-4/services/c1g/level-2.png";
import c1gLevel3Image from "../../../../../assets/theory/section-4/services/c1g/level-3.png";

import c2aLevel0Image from "../../../../../assets/theory/section-4/services/c2a/level-0.png";
import c2aLevel1Image from "../../../../../assets/theory/section-4/services/c2a/level-1.png";
import c2aLevel2Image from "../../../../../assets/theory/section-4/services/c2a/level-2.png";
import c2aLevel3Image from "../../../../../assets/theory/section-4/services/c2a/level-3.png";

import c2bLevel0Image from "../../../../../assets/theory/section-4/services/c2b/level-0.png";
import c2bLevel1Image from "../../../../../assets/theory/section-4/services/c2b/level-1.png";
import c2bLevel2Image from "../../../../../assets/theory/section-4/services/c2b/level-2.png";
import c2bLevel3Image from "../../../../../assets/theory/section-4/services/c2b/level-3.png";
import c2bLevel4Image from "../../../../../assets/theory/section-4/services/c2b/level-4.png";

import c3Level0Image from "../../../../../assets/theory/section-4/services/c3/level-0.png";
import c3Level1Image from "../../../../../assets/theory/section-4/services/c3/level-1.png";
import c3Level2Image from "../../../../../assets/theory/section-4/services/c3/level-2.png";
import c3Level3Image from "../../../../../assets/theory/section-4/services/c3/level-3.png";
import c3Level4Image from "../../../../../assets/theory/section-4/services/c3/level-4.png";

import c4Level0Image from "../../../../../assets/theory/section-4/services/c4/level-0.png";
import c4Level1Image from "../../../../../assets/theory/section-4/services/c4/level-1.png";
import c4Level2Image from "../../../../../assets/theory/section-4/services/c4/level-2.png";
import c4Level3Image from "../../../../../assets/theory/section-4/services/c4/level-3.png";
import c4Level4Image from "../../../../../assets/theory/section-4/services/c4/level-4.png";

/**
 * C1a — Cooling Emission Control
 *
 * Included in Catalogues A and B.
 * Applies to cooling emitters other than TABS.
 */
export const c1aServiceBlock = {
  id: "cooling-service-c1a",
  type: "service",
  serviceCode: "C-1a",
  title: "Cooling Emission Control",
  catalogue: "catalogues-a-and-b",
  applicability:
    "Applicable only when mechanical cooling is provided through cooling emitters other than Thermally Activated Building Systems (TABS).",
  purpose:
    "The purpose of this service is to regulate the heat removed at room level, preferably by applying the control function to the cooling emitter.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c1a",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C1a",
  levels: [
    {
      id: "cooling-c1a-level-0",
      level: 0,
      title: "No automatic room-temperature control",
      description:
        "Room temperature is not controlled automatically. The cooling emitter is operated manually through the controls connected to the equipment.",
      image: {
        id: "cooling-c1a-level-0-image",
        src: c1aLevel0Image,
        alt:
          "Manual cooling-emission control without automatic room-temperature control.",
      },
      examples: [
        "A hydronic cooling system with a manually operated non-thermostatic valve.",
        "An electric room-cooling unit without a thermostat.",
      ],
    },
    {
      id: "cooling-c1a-level-1",
      level: 1,
      title: "Central automatic control",
      description:
        "One or more rooms are controlled indirectly by a central automatic controller acting on cooling distribution or production. The controller uses a common reference setting and does not respond separately to the local demand of each room.",
      image: {
        id: "cooling-c1a-level-1-image",
        src: c1aLevel1Image,
        alt:
          "Central automatic cooling control serving several rooms without individual room control.",
      },
      examples: [
        "A chilled-water installation controlled centrally by a non-communicating electronic controller.",
        "An electric cooling installation controlled centrally by a non-communicating electronic controller.",
      ],
    },
    {
      id: "cooling-c1a-level-2",
      level: 2,
      title:
        "Individual room control without communication with BACS",
      description:
        "The heat removed from each room is controlled by a function acting specifically for that room. The room controller does not exchange information with the Building Automation and Control System or with systems outside the room.",
      image: {
        id: "cooling-c1a-level-2-image",
        src: c1aLevel2Image,
        alt:
          "Individual room cooling control without communication with BACS.",
      },
      examples: [
        "A non-communicating electronic cooling controller installed at room level.",
      ],
    },
    {
      id: "cooling-c1a-level-3",
      level: 3,
      title:
        "Individual room control with communication between controllers and BACS",
      description:
        "The heat removed from each room is controlled individually. The room controller exchanges setpoints, demand information and status information with the Building Automation and Control System or with other systems outside the room. This information can be used by distribution and generator control to keep operating time to a minimum and optimise setpoints.",
      image: {
        id: "cooling-c1a-level-3-image",
        src: c1aLevel3Image,
        alt:
          "Individual room cooling control communicating with BACS.",
      },
    },
    {
      id: "cooling-c1a-level-4",
      level: 4,
      title:
        "Individual room control with BACS communication and occupancy detection",
      description:
        "The heat removed from each room is controlled individually, the controller communicates with BACS, and occupancy detection is included in the control function. Occupancy-detection control is usually not applied to slow-response cooling-emission systems with relatively high thermal mass, such as chilled beams.",
      image: {
        id: "cooling-c1a-level-4-image",
        src: c1aLevel4Image,
        alt:
          "Individual room cooling control with BACS communication and occupancy detection.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C1b — Emission Control for TABS in Cooling Mode
 *
 * Included in Catalogue B.
 * The consolidated SRI Final Report represents this service through
 * Levels 0–3.
 */
export const c1bServiceBlock = {
  id: "cooling-service-c1b",
  type: "service",
  serviceCode: "C-1b",
  title: "Emission Control for TABS — Cooling Mode",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only when mechanical cooling systems based on Thermally Activated Building Systems (TABS) are present and operate in cooling mode.",
  purpose:
    "The purpose of this service is to regulate the heat removed at room level, preferably by applying the control function to the cooling emitter.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c1b",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C1b",
  levels: [
    {
      id: "cooling-c1b-level-0",
      level: 0,
      title: "No automatic room-temperature control",
      description:
        "There is no automatic control of room temperature. Cooling emission from the TABS is controlled manually through the actuators connected to the equipment.",
      image: {
        id: "cooling-c1b-level-0-image",
        src: c1bLevel0Image,
        alt:
          "TABS cooling without automatic room-temperature control.",
      },
    },
    {
      id: "cooling-c1b-level-1",
      level: 1,
      title: "Central automatic control",
      description:
        "The heat removed from the TABS zone is regulated by a central automatic controller using a common reference temperature. The control does not act specifically for each individual room.",
      image: {
        id: "cooling-c1b-level-1-image",
        src: c1bLevel1Image,
        alt:
          "Central automatic control of a TABS cooling zone.",
      },
      examples: [
        "Supply-water temperature control based on the outside temperature.",
      ],
    },
    {
      id: "cooling-c1b-level-2",
      level: 2,
      title: "Advanced central automatic control",
      description:
        "The heat removed from the TABS zone is controlled centrally. The control aims to maintain the indoor temperature within a comfort range while minimising energy demand.",
      image: {
        id: "cooling-c1b-level-2-image",
        src: c1bLevel2Image,
        alt:
          "Advanced central automatic control of a TABS cooling zone.",
      },
    },
    {
      id: "cooling-c1b-level-3",
      level: 3,
      title:
        "Advanced central automatic control with intermittent operation and/or room-temperature feedback control",
      description:
        "The heat removed from the TABS zone is controlled centrally to maintain the indoor temperature within a comfort range while minimising energy demand. In addition, the control includes intermittent operation, room-temperature feedback control, or both. Intermittent operation can switch the circulation pump off at regular intervals to save electricity. Room-temperature feedback can correct the supply-water temperature in response to variations in internal heat gains.",
      image: {
        id: "cooling-c1b-level-3-image",
        src: c1bLevel3Image,
        alt:
          "Advanced TABS cooling control with intermittent operation or room-temperature feedback.",
      },
      examples: [
        "Supply-water temperature control based on the outside temperature and room-temperature feedback, combined with pulse-width modulation for intermittent operation.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C1c — Control of Distribution-Network Chilled-Water Temperature
 *
 * Included in Catalogue B.
 */
export const c1cServiceBlock = {
  id: "cooling-service-c1c",
  type: "service",
  serviceCode: "C-1c",
  title:
    "Control of Distribution-Network Chilled-Water Temperature (Supply or Return)",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only when mechanical cooling systems with a hydronic distribution system are present.",
  description:
    "Control of chilled-water temperature in the supply or return flow of the cooling distribution network.",
  purpose:
    "The purpose of this service is to regulate the distribution-water temperature, preferably by applying the control function to the cooling generator.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c1c",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C1c (Levels 1–2); Level 0 original illustration generated for this thesis using OpenAI, based on the C1c service description.",
  levels: [
    {
      id: "cooling-c1c-level-0",
      level: 0,
      title: "Constant-temperature control",
      description:
        "The chilled-water temperature in the distribution network is maintained at a constant value.",
      image: {
        id: "cooling-c1c-level-0-image",
        src: c1cLevel0Image,
        alt:
          "Cooling-water distribution temperature maintained at a constant value.",
      },
    },
    {
      id: "cooling-c1c-level-1",
      level: 1,
      title: "Outside-temperature-compensated control",
      description:
        "The chilled-water temperature setpoint is adjusted according to the outside temperature.",
      image: {
        id: "cooling-c1c-level-1-image",
        src: c1cLevel1Image,
        alt:
          "Cooling-water distribution temperature adjusted according to the outside temperature.",
      },
      examples: [
        "An electronic controller that adjusts the distribution-water temperature using the measured outside temperature.",
      ],
    },
    {
      id: "cooling-c1c-level-2",
      level: 2,
      title: "Demand-based control",
      description:
        "The chilled-water temperature setpoint is adjusted according to cooling demand, using indoor-temperature measurements.",
      image: {
        id: "cooling-c1c-level-2-image",
        src: c1cLevel2Image,
        alt:
          "Demand-based cooling-water temperature control using indoor-temperature measurements.",
      },
      examples: [
        "A controller that adjusts the distribution-water temperature using indoor-temperature measurements.",
        "A controller that uses indoor-temperature measurements to select comfort or economy operation.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C1d — Control of Distribution Pumps in Networks
 *
 * Included in Catalogue B.
 */
export const c1dServiceBlock = {
  id: "cooling-service-c1d",
  type: "service",
  serviceCode: "C-1d",
  title: "Control of Distribution Pumps in Networks",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only when mechanical cooling systems with a hydronic distribution system are present.",
  description:
    "Control of pumps used in cooling distribution networks. The controlled pumps may be installed at different levels of the network.",
  purpose:
    "The purpose of this service is to reduce the auxiliary energy demand of pumps by applying control functions to their operation.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c1d",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C1d (Levels 1–4); Level 0 original illustration generated for this thesis using OpenAI, based on the C1d service description.",
  levels: [
    {
      id: "cooling-c1d-level-0",
      level: 0,
      title: "No automatic control",
      description:
        "The distribution pump is not controlled automatically. Only protective functions may be present.",
      image: {
        id: "cooling-c1d-level-0-image",
        src: c1dLevel0Image,
        alt:
          "Cooling distribution pump without automatic control.",
      },
    },
    {
      id: "cooling-c1d-level-1",
      level: 1,
      title: "On/off control",
      description:
        "The pump switches on and off automatically. When it is operating, it runs at maximum speed.",
      image: {
        id: "cooling-c1d-level-1-image",
        src: c1dLevel1Image,
        alt:
          "Cooling distribution pump using automatic on-off control.",
      },
    },
    {
      id: "cooling-c1d-level-2",
      level: 2,
      title: "Multi-stage control",
      description:
        "The pump switches on and off automatically. When it is operating, it can run at different fixed-speed stages.",
      image: {
        id: "cooling-c1d-level-2-image",
        src: c1dLevel2Image,
        alt:
          "Cooling distribution pump operating at different fixed-speed stages.",
      },
    },
    {
      id: "cooling-c1d-level-3",
      level: 3,
      title:
        "Variable-speed pump control based on internal pump-unit estimations",
      description:
        "The pump switches on and off automatically and can operate at different speeds based on a fixed or variable differential-pressure setpoint. The control is based on internal estimations made by the pump unit.",
      image: {
        id: "cooling-c1d-level-3-image",
        src: c1dLevel3Image,
        alt:
          "Variable-speed cooling distribution pump controlled according to differential pressure.",
      },
    },
    {
      id: "cooling-c1d-level-4",
      level: 4,
      title:
        "Variable-speed pump control using an external demand signal",
      description:
        "The pump switches on and off automatically and can operate at different speeds based on fixed or variable differential pressure while following an external demand signal.",
      image: {
        id: "cooling-c1d-level-4-image",
        src: c1dLevel4Image,
        alt:
          "Variable-speed cooling distribution pump following an external demand signal.",
      },
      examples: [
        "An external demand signal based on hydraulic requirements.",
        "An external demand signal based on temperature difference.",
        "An external demand signal based on energy optimisation.",
        "An external demand signal based on demand assessment for reducing the pumps' auxiliary-energy demand.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C1f — Interlock: Avoiding Simultaneous Heating and Cooling in the Same Room
 *
 * Included in Catalogue B.
 */
export const c1fServiceBlock = {
  id: "cooling-service-c1f",
  type: "service",
  serviceCode: "C-1f",
  title: "Interlock: Avoiding Simultaneous Heating and Cooling in the Same Room",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only when mechanical cooling systems are present.",
  purpose:
    "The purpose of this service is to avoid simultaneous heating and cooling in the same room.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c1f",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C1f (Levels 1–2); Level 0 original illustration generated for this thesis using OpenAI, based on the C1f service description.",
  levels: [
    {
      id: "cooling-c1f-level-0",
      level: 0,
      title: "No interlock",
      description:
        "The heating and cooling systems are controlled independently.",
      image: {
        id: "cooling-c1f-level-0-image",
        src: c1fLevel0Image,
        alt:
          "Heating and cooling systems operating without interlock.",
      },
    },
    {
      id: "cooling-c1f-level-1",
      level: 1,
      title: "Partial interlock",
      description:
        "The risk of simultaneous heating and cooling is minimised, for example through sliding setpoints.",
      image: {
        id: "cooling-c1f-level-1-image",
        src: c1fLevel1Image,
        alt:
          "Partial interlock minimising the risk of simultaneous heating and cooling.",
      },
      examples: [
        "When one supply-air temperature serves several rooms while room-level emission is controlled separately, the central supply-air setpoints can be adjusted to reduce the probability of simultaneous heating and cooling.",
      ],
    },
    {
      id: "cooling-c1f-level-2",
      level: 2,
      title: "Total interlock",
      description:
        "The control system ensures that heating and cooling cannot take place at the same time in the same room.",
      image: {
        id: "cooling-c1f-level-2-image",
        src: c1fLevel2Image,
        alt:
          "Total interlock preventing simultaneous heating and cooling in the same room.",
      },
      examples: [
        "The hydraulic design or a complete changeover at supply level makes simultaneous heating and cooling impossible.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C1g — Control of Thermal Energy Storage Operation
 *
 * Included in Catalogue B.
 */
export const c1gServiceBlock = {
  id: "cooling-service-c1g",
  type: "service",
  serviceCode: "C-1g",
  title: "Control of Thermal Energy Storage (TES) Operation",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only when mechanical cooling systems are present and include a Thermal Energy Storage (TES) system.",
  purpose:
    "The purpose of this service is to manage the charging of thermal energy storage systems used for cooling.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c1g",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C1g",
  levels: [
    {
      id: "cooling-c1g-level-0",
      level: 0,
      title: "Continuous storage operation",
      description:
        "The cooling-storage system operates continuously.",
      image: {
        id: "cooling-c1g-level-0-image",
        src: c1gLevel0Image,
        alt:
          "Cooling thermal-energy storage operating continuously.",
      },
    },
    {
      id: "cooling-c1g-level-1",
      level: 1,
      title: "Time-scheduled storage operation",
      description:
        "The cooling-storage system operates during periods defined by one or more schedules.",
      image: {
        id: "cooling-c1g-level-1-image",
        src: c1gLevel1Image,
        alt:
          "Cooling thermal-energy storage operating according to a schedule.",
      },
    },
    {
      id: "cooling-c1g-level-2",
      level: 2,
      title: "Storage operation based on load prediction",
      description:
        "The cooling-storage system operates continuously, but its state of charge is reduced when storage is not needed according to the predicted load.",
      image: {
        id: "cooling-c1g-level-2-image",
        src: c1gLevel2Image,
        alt:
          "Cooling thermal-energy storage controlled according to predicted cooling load.",
      },
    },
    {
      id: "cooling-c1g-level-3",
      level: 3,
      title:
        "Cold storage capable of flexible control through grid signals",
      description:
        "The cooling-storage system operates continuously, but charging is prioritised according to signals received from the electricity grid.",
      image: {
        id: "cooling-c1g-level-3-image",
        src: c1gLevel3Image,
        alt:
          "Cooling thermal-energy storage charging prioritised according to electricity-grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C2a — Generator Control for Cooling
 *
 * Included in Catalogues A and B.
 */
export const c2aServiceBlock = {
  id: "cooling-service-c2a",
  type: "service",
  serviceCode: "C-2a",
  title: "Generator Control for Cooling",
  catalogue: "catalogues-a-and-b",
  applicability:
    "Applicable only when mechanical cooling systems are present.",
  purpose:
    "The purpose of this service is to maximise the performance of the cooling generator by applying the control function to the generator.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c2a",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C2a",
  levels: [
    {
      id: "cooling-c2a-level-0",
      level: 0,
      title: "On/off control of cooling production",
      description:
        "The compressor or compressors switch on and off automatically. When operating, they run at maximum speed.",
      image: {
        id: "cooling-c2a-level-0-image",
        src: c2aLevel0Image,
        alt:
          "Cooling production using automatic on-off compressor control.",
      },
    },
    {
      id: "cooling-c2a-level-1",
      level: 1,
      title:
        "Multi-stage cooling-production capacity control according to load or demand",
      description:
        "The compressor or compressors switch on and off automatically. When operating, cooling-production capacity can be provided through several fixed stages according to load or demand.",
      image: {
        id: "cooling-c2a-level-1-image",
        src: c2aLevel1Image,
        alt:
          "Cooling production using multiple fixed capacity stages according to load or demand.",
      },
      examples: [
        "Different compressors are switched on or off according to the cooling load or demand.",
      ],
    },
    {
      id: "cooling-c2a-level-2",
      level: 2,
      title:
        "Variable cooling-production capacity control according to load or demand",
      description:
        "The compressor or compressors switch on and off automatically. When operating, their capacity can vary according to the cooling load or demand.",
      image: {
        id: "cooling-c2a-level-2-image",
        src: c2aLevel2Image,
        alt:
          "Cooling production with variable-capacity control according to load or demand.",
      },
      examples: [
        "Hot-gas bypass is adjusted according to the load or demand.",
        "Inverter-frequency control adjusts compressor operation according to the load or demand.",
      ],
    },
    {
      id: "cooling-c2a-level-3",
      level: 3,
      title:
        "Variable capacity control according to load and electricity-grid signals",
      description:
        "The compressor or compressors switch on and off automatically. When operating, their capacity can vary according to the cooling load or demand and can additionally respond to external signals from the electricity grid.",
      image: {
        id: "cooling-c2a-level-3-image",
        src: c2aLevel3Image,
        alt:
          "Cooling-production capacity controlled according to cooling load and external electricity-grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C2b — Sequencing of Different Cooling Generators
 *
 * Included in Catalogue B.
 */
export const c2bServiceBlock = {
  id: "cooling-service-c2b",
  type: "service",
  serviceCode: "C-2b",
  title: "Sequencing of Different Cooling Generators",
  catalogue: "catalogue-b",
  applicability:
    "Applicable only when multiple cooling generators are present.",
  purpose:
    "The purpose of this service is to determine the operating priority of different cooling generators by applying the control function to one or more generators.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c2b",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C2b",
  levels: [
    {
      id: "cooling-c2b-level-0",
      level: 0,
      title: "Priorities based only on running times",
      description:
        "Each cooling generator is assigned a priority that aims to equalise the generators' operating times.",
      image: {
        id: "cooling-c2b-level-0-image",
        src: c2bLevel0Image,
        alt:
          "Cooling-generator priorities based only on operating times.",
      },
    },
    {
      id: "cooling-c2b-level-1",
      level: 1,
      title: "Fixed sequencing based on loads only",
      description:
        "Each cooling generator is assigned a fixed operating priority. The sequence is based on the load and may distinguish between different generator characteristics.",
      image: {
        id: "cooling-c2b-level-1-image",
        src: c2bLevel1Image,
        alt:
          "Fixed operating sequence for multiple cooling generators.",
      },
      examples: [
        "A fixed sequence distinguishes between an absorption chiller and a centrifugal chiller according to their characteristics.",
      ],
    },
    {
      id: "cooling-c2b-level-2",
      level: 2,
      title:
        "Dynamic priorities based on generator performance and characteristics",
      description:
        "The priority of each cooling generator is adjusted dynamically according to its current efficiency and characteristics.",
      image: {
        id: "cooling-c2b-level-2-image",
        src: c2bLevel2Image,
        alt:
          "Dynamic priority control based on cooling-generator performance and characteristics.",
      },
      examples: [
        "The dynamic priority takes account of the availability of free cooling.",
      ],
    },
    {
      id: "cooling-c2b-level-3",
      level: 3,
      title: "Sequencing based on load prediction",
      description:
        "The operating sequence is determined using the predicted cooling load and generator information.",
      image: {
        id: "cooling-c2b-level-3-image",
        src: c2bLevel3Image,
        alt:
          "Cooling-generator sequencing based on predicted cooling load.",
      },
      examples: [
        "The sequence uses the coefficient of performance, the available power of a device and the predicted required power.",
      ],
    },
    {
      id: "cooling-c2b-level-4",
      level: 4,
      title:
        "Dynamic-priority sequencing including electricity-grid signals",
      description:
        "The operating sequence is determined using a dynamic priority list that also takes external signals from the electricity grid into account.",
      image: {
        id: "cooling-c2b-level-4-image",
        src: c2bLevel4Image,
        alt:
          "Dynamic cooling-generator sequencing including external electricity-grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C3 — Provision of Information Regarding Cooling-System Performance
 *
 * Included in Catalogues A and B.
 */
export const c3ServiceBlock = {
  id: "cooling-service-c3",
  type: "service",
  serviceCode: "C-3",
  title: "Provision of Information Regarding Cooling-System Performance",
  catalogue: "catalogues-a-and-b",
  applicability:
    "Applicable only when mechanical cooling systems are present.",
  purpose:
    "The purpose of this service is to inform building occupants and facility managers about the performance of the cooling system.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c3",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C3 (Levels 1–4); Level 0 original illustration generated for this thesis using OpenAI, based on the C3 service description.",
  levels: [
    {
      id: "cooling-c3-level-0",
      level: 0,
      title: "None",
      description:
        "No information about the performance of the cooling system is reported.",
      image: {
        id: "cooling-c3-level-0-image",
        src: c3Level0Image,
        alt:
          "Grey prohibition symbol representing the absence of cooling-system performance reporting.",
      },
    },
    {
      id: "cooling-c3-level-1",
      level: 1,
      title: "Reporting of current performance indicators",
      description:
        "Current performance indicators are reported centrally or remotely.",
      image: {
        id: "cooling-c3-level-1-image",
        src: c3Level1Image,
        alt:
          "Cooling-system display reporting current performance information.",
      },
      examples: [
        "Current temperature information.",
        "Submetered energy-consumption information.",
      ],
    },
    {
      id: "cooling-c3-level-2",
      level: 2,
      title:
        "Reporting of current performance indicators and historical data",
      description:
        "Current performance indicators and historical data are reported centrally or remotely.",
      image: {
        id: "cooling-c3-level-2-image",
        src: c3Level2Image,
        alt:
          "Remote interface displaying current and historical cooling-system performance data.",
      },
    },
    {
      id: "cooling-c3-level-3",
      level: 3,
      title:
        "Performance evaluation including forecasting and/or benchmarking",
      description:
        "Central or remote reporting supports performance evaluation and includes forecasting, benchmarking, or both.",
      image: {
        id: "cooling-c3-level-3-image",
        src: c3Level3Image,
        alt:
          "Cooling-system performance data being evaluated for forecasting or benchmarking.",
      },
    },
    {
      id: "cooling-c3-level-4",
      level: 4,
      title:
        "Performance evaluation with forecasting and/or benchmarking, predictive management and fault detection",
      description:
        "Central or remote reporting supports performance evaluation and includes forecasting or benchmarking, as well as predictive management and fault detection.",
      image: {
        id: "cooling-c3-level-4-image",
        src: c3Level4Image,
        alt:
          "Cooling-system performance evaluation including predictive management and fault detection.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * C4 — Flexibility and Interaction with the Electricity Grid
 *
 * Included in Catalogues A and B.
 */
export const c4ServiceBlock = {
  id: "cooling-service-c4",
  type: "service",
  serviceCode: "C-4",
  title: "Flexibility and Interaction with the Electricity Grid",
  catalogue: "catalogues-a-and-b",
  purpose:
    "The purpose of this service is to provide flexibility services to the electricity grid or interact with it by applying control to one or more subsystems or components of the cooling system. Effects on indoor comfort conditions should be minimised.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-cooling-c4",
  ],
  info:
    "Image sources: SRI2MARKET, Cooling service C4 (Levels 1–4); Level 0 original illustration generated for this thesis using OpenAI, based on the C4 service description.",
  levels: [
    {
      id: "cooling-c4-level-0",
      level: 0,
      title: "No automatic control",
      description:
        "No automatic control is provided for this service.",
      image: {
        id: "cooling-c4-level-0-image",
        src: c4Level0Image,
        alt:
          "Grey prohibition symbol representing the absence of automatic cooling control for electricity-grid interaction.",
      },
    },
    {
      id: "cooling-c4-level-1",
      level: 1,
      title: "Scheduled operation of the cooling system",
      description:
        "Cooling-system operation can be scheduled to prioritise specific times that may be indirectly associated with external grid signals.",
      image: {
        id: "cooling-c4-level-1-image",
        src: c4Level1Image,
        alt:
          "Cooling-system operation controlled through a predefined schedule.",
      },
    },
    {
      id: "cooling-c4-level-2",
      level: 2,
      title: "Self-learning optimal control of the cooling system",
      description:
        "Cooling-system operation can be used to characterise the thermal response of the building or building unit. This information can then support adaptation of cooling operation to external grid signals.",
      image: {
        id: "cooling-c4-level-2-image",
        src: c4Level2Image,
        alt:
          "Self-learning cooling control using information about the building thermal response.",
      },
    },
    {
      id: "cooling-c4-level-3",
      level: 3,
      title: "Flexible control through electricity-grid signals",
      description:
        "Cooling-system operation can be modified in response to external signals from the electricity grid.",
      image: {
        id: "cooling-c4-level-3-image",
        src: c4Level3Image,
        alt:
          "Cooling system adapting its operation to external electricity-grid signals.",
      },
      examples: [
        "Demand-side management using an external electricity-grid signal.",
      ],
    },
    {
      id: "cooling-c4-level-4",
      level: 4,
      title:
        "Optimised control based on local predictions and electricity-grid signals",
      description:
        "Cooling-system operation can be modified using external grid signals and the predicted performance of the cooling system.",
      image: {
        id: "cooling-c4-level-4-image",
        src: c4Level4Image,
        alt:
          "Cooling-system control based on local predictions, predicted performance and electricity-grid signals.",
      },
      examples: [
        "Model predictive control using local predictions and electricity-grid signals.",
      ],
    },
  ],
} satisfies TheoryServiceBlock;
