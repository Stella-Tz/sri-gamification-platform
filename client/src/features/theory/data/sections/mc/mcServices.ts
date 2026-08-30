//client\src\features\theory\data\sections\mc\mcServices.ts

import type { TheoryServiceBlock } from "../../../types/theory.types";

/**
 * Source policy for the Monitoring and Control services:
 *
 * - Domain and methodological statements are grounded in the Delegated
 *   Regulation and are cross-checked against the SRI Final Report.
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Monitoring and Control material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership and assessment conditions. These are
 *   cross-checked against the Final Report and SRI2MARKET where the supporting
 *   material clarifies their technical meaning.
 *
 * - Service purposes, technical context, detailed functionality-level
 *   explanations, examples and visual material are based primarily on the
 *   corresponding SRI2MARKET Monitoring and Control material and are
 *   cross-checked against the consolidated catalogue definitions.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - No technical applicability condition is defined for the eight Monitoring
 *   and Control services. Assessment or inspectability guidance is not
 *   represented as an applicability field.
 *
 * - "Always to be assessed" is an assessment rule and is not treated as a
 *   technical applicability condition. MC30 is marked "Always to be assessed"
 *   in the SRI Calculation Sheet v4.5.
 *
 * - The MC29 default impact-score note is verified against the Practical Guide
 *   and the SRI Calculation Sheet v4.5.
 */

import mc3Level0Image from "../../../../../assets/theory/section-11/services/mc3/level-0.png";
import mc3Level1Image from "../../../../../assets/theory/section-11/services/mc3/level-1.png";
import mc3Level2Image from "../../../../../assets/theory/section-11/services/mc3/level-2.png";
import mc3Level3Image from "../../../../../assets/theory/section-11/services/mc3/level-3.png";

import mc4Level0Image from "../../../../../assets/theory/section-11/services/mc4/level-0.png";
import mc4Level1Image from "../../../../../assets/theory/section-11/services/mc4/level-1.png";
import mc4Level2Image from "../../../../../assets/theory/section-11/services/mc4/level-2.png";
import mc4Level3Image from "../../../../../assets/theory/section-11/services/mc4/level-3.png";

import mc9Level0Image from "../../../../../assets/theory/section-11/services/mc9/level-0.png";
import mc9Level1Image from "../../../../../assets/theory/section-11/services/mc9/level-1.png";
import mc9Level2Image from "../../../../../assets/theory/section-11/services/mc9/level-2.png";

import mc13Level0Image from "../../../../../assets/theory/section-11/services/mc13/level-0.png";
import mc13Level1Image from "../../../../../assets/theory/section-11/services/mc13/level-1.png";
import mc13Level2Image from "../../../../../assets/theory/section-11/services/mc13/level-2.png";
import mc13Level3Image from "../../../../../assets/theory/section-11/services/mc13/level-3.png";

import mc25Level0Image from "../../../../../assets/theory/section-11/services/mc25/level-0.png";
import mc25Level1Image from "../../../../../assets/theory/section-11/services/mc25/level-1.png";
import mc25Level2Image from "../../../../../assets/theory/section-11/services/mc25/level-2.png";

import mc28Level0Image from "../../../../../assets/theory/section-11/services/mc28/level-0.png";
import mc28Level1Image from "../../../../../assets/theory/section-11/services/mc28/level-1.png";
import mc28Level2Image from "../../../../../assets/theory/section-11/services/mc28/level-2.png";

import mc29Level0Image from "../../../../../assets/theory/section-11/services/mc29/level-0.png";
import mc29Level1Image from "../../../../../assets/theory/section-11/services/mc29/level-1.png";
import mc29Level2Image from "../../../../../assets/theory/section-11/services/mc29/level-2.png";
import mc29Level3Image from "../../../../../assets/theory/section-11/services/mc29/level-3.png";
import mc29Level4Image from "../../../../../assets/theory/section-11/services/mc29/level-4.png";

import mc30Level0Image from "../../../../../assets/theory/section-11/services/mc30/level-0.png";
import mc30Level1Image from "../../../../../assets/theory/section-11/services/mc30/level-1.png";
import mc30Level2Image from "../../../../../assets/theory/section-11/services/mc30/level-2.png";
import mc30Level3Image from "../../../../../assets/theory/section-11/services/mc30/level-3.png";

/** MC3 — Included only in Catalogue B. */
export const mc3ServiceBlock = {
  id: "monitoring-control-service-mc3",
  type: "service",
  serviceCode: "MC3",
  title: "Run Time Management of HVAC Systems",
  catalogue: "catalogue-b",
  description:
    "In HVAC systems, run time management refers to the real-time control and optimisation of system operation. Devices that can be used include temperature sensors for measuring indoor temperature, thermostats that allow predefined temperature setpoints, sensors that monitor air flow, CO₂ sensors for ventilation operation, simple timers and energy meters that measure HVAC energy consumption. These components can form part of a Building Automation and Control System (BACS), which automates and controls building systems, such as HVAC and lighting, through a central control system.",
  purpose:
    "HVAC systems may operate inefficiently, resulting in unnecessary energy consumption, higher energy bills and a significant carbon footprint. Inadequately regulated HVAC operation may also cause discomfort and health problems for building occupants. Run time management techniques can improve energy efficiency, comfort and occupant well-being.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-mc-mc3",
  ],
  info: "Image source: SRI2MARKET, Monitoring and Control service MC3.",
  levels: [
    {
      id: "monitoring-control-mc3-level-0",
      level: 0,
      title: "Manual setting",
      description: "HVAC settings are defined and changed manually.",
      image: {
        id: "monitoring-control-mc3-level-0-image",
        src: mc3Level0Image,
        alt: "Manual adjustment of an HVAC setting.",
      },
    },
    {
      id: "monitoring-control-mc3-level-1",
      level: 1,
      title:
        "Runtime setting of heating and cooling plants following a predefined time schedule",
      description:
        "The operation of the heating and cooling systems, including on/off actions and temperature-setpoint settings, is based on a predefined schedule. Timers can be used so that control settings vary according to the day or time of day. The building can also be divided into zones with different occupancy patterns, allowing a different predefined schedule to be applied to each zone.",
      image: {
        id: "monitoring-control-mc3-level-1-image",
        src: mc3Level1Image,
        alt: "Heating and cooling operation following a predefined time schedule.",
      },
    },
    {
      id: "monitoring-control-mc3-level-2",
      level: 2,
      title:
        "Heating and cooling plant on/off control based on building loads",
      description:
        "Building load refers to the energy required to heat and cool a building and is also referred to as thermal load. HVAC control aims to match the heat output of the plant to the required load.",
      image: {
        id: "monitoring-control-mc3-level-2-image",
        src: mc3Level2Image,
        alt: "Heating and cooling plant control based on building loads.",
      },
    },
    {
      id: "monitoring-control-mc3-level-3",
      level: 3,
      title:
        "Heating and cooling plant on/off control based on predictive control or grid signals",
      description:
        "Predictive control uses historical and current data concerning all, or at least a representative part, of the factors that can affect heating and cooling operation and energy consumption. An optimiser uses these data to predict the future state of the system from its current state and then determines the control strategy that minimises the expected cost of reaching the desired future state. On/off control may also be based on electricity-grid signals.",
      image: {
        id: "monitoring-control-mc3-level-3-image",
        src: mc3Level3Image,
        alt: "Heating and cooling plant control based on predictive control or grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/** MC4 — Included only in Catalogue B. */
export const mc4ServiceBlock = {
  id: "monitoring-control-service-mc4",
  type: "service",
  serviceCode: "MC4",
  title:
    "Detecting Faults of Technical Building Systems and Providing Support to the Diagnosis of These Faults",
  catalogue: "catalogue-b",
  description:
    "Technical Building Systems (TBS) include systems for lighting, heating, cooling and domestic hot water. Fault-detection and diagnostic technology can be integrated to support their robust operation. Sensors and meters record operating data from individual components, including temperature, pressure and energy consumption, depending on the system and the monitoring requirements. The data can be stored locally or remotely using cloud-based technology and analysed through predefined threshold comparisons or statistical algorithms to provide a holistic view of the individual system components.",
  purpose:
    "Operating faults in technical building systems can lead to unhealthy indoor conditions and higher costs. This service concerns the early detection of faults and the provision of diagnostic information about them.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-mc-mc4",
  ],
  info: "Image source: SRI2MARKET, Monitoring and Control service MC4.",
  levels: [
    {
      id: "monitoring-control-mc4-level-0",
      level: 0,
      title: "No central indication of detected faults and alarms",
      description:
        "There is no central indication of detected faults and alarms.",
      image: {
        id: "monitoring-control-mc4-level-0-image",
        src: mc4Level0Image,
        alt: "No central indication of detected faults and alarms.",
      },
    },
    {
      id: "monitoring-control-mc4-level-1",
      level: 1,
      title:
        "With central indication of detected faults and alarms for at least 2 relevant TBS",
      description:
        "Meters are used to obtain measurements from at least two relevant TBS. Using the recorded data, a building management system can detect faults and trigger alarms.",
      image: {
        id: "monitoring-control-mc4-level-1-image",
        src: mc4Level1Image,
        alt: "Central indication of faults and alarms for at least two relevant TBS.",
      },
    },
    {
      id: "monitoring-control-mc4-level-2",
      level: 2,
      title:
        "With central indication of detected faults and alarms for all relevant TBS",
      description:
        "Meters are used to obtain measurements from all relevant TBS. Using the recorded data, a building management system can detect faults and trigger alarms.",
      image: {
        id: "monitoring-control-mc4-level-2-image",
        src: mc4Level2Image,
        alt: "Central indication of faults and alarms for all relevant TBS.",
      },
    },
    {
      id: "monitoring-control-mc4-level-3",
      level: 3,
      title:
        "With central indication of detected faults and alarms for all relevant TBS, including diagnosing functions",
      description:
        "This level provides the same functionality as Level 2. In addition to alarms, the system can perform diagnostic analysis and provide users with information about the most likely causes or sources of the faults.",
      image: {
        id: "monitoring-control-mc4-level-3-image",
        src: mc4Level3Image,
        alt: "Central fault and alarm indication with diagnostic functions.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/** MC9 — Included only in Catalogue B. */
export const mc9ServiceBlock = {
  id: "monitoring-control-service-mc9",
  type: "service",
  serviceCode: "MC9",
  title: "Occupancy Detection: Connected Services",
  catalogue: "catalogue-b",
  description:
    "Occupancy detection is based on suitable sensors. Common occupancy sensors include passive infrared sensors that use infrared radiation produced by movement and body heat, video-based sensors, and microwave-based sensors that emit microwaves and detect occupancy from their reflection. Combined with other building data, occupancy data can be used to make predictions that improve future energy use and comfort.",
  purpose:
    "Occupancy detection enables the automated adjustment of lighting, heating and cooling. It improves energy efficiency by reducing unnecessary energy consumption during unoccupied periods or in unoccupied building spaces.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-mc-mc9",
  ],
  info: "Image source: SRI2MARKET, Monitoring and Control service MC9.",
  levels: [
    {
      id: "monitoring-control-mc9-level-0",
      level: 0,
      title: "None",
      description: "There is no mechanism for occupancy detection.",
      image: {
        id: "monitoring-control-mc9-level-0-image",
        src: mc9Level0Image,
        alt: "No occupancy-detection mechanism.",
      },
    },
    {
      id: "monitoring-control-mc9-level-1",
      level: 1,
      title: "Occupancy detection for individual functions, e.g. lighting",
      description:
        "Occupancy detection affects specific functions, such as lighting or heating. Each function is activated or adjusted according to occupancy.",
      image: {
        id: "monitoring-control-mc9-level-1-image",
        src: mc9Level1Image,
        alt: "Occupancy detection for an individual building function.",
      },
    },
    {
      id: "monitoring-control-mc9-level-2",
      level: 2,
      title:
        "Centralised occupant detection which feeds in to several TBS such as lighting and heating",
      description:
        "A central system collects occupancy data from several sensors. The data are processed and analysed by the system and are used to adjust the operation of several systems, such as lighting, heating and ventilation. A central controller using occupancy data from several building spaces provides a coordinated response.",
      image: {
        id: "monitoring-control-mc9-level-2-image",
        src: mc9Level2Image,
        alt: "Centralised occupancy detection connected to several TBS.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/** MC13 — Included in Catalogues A and B. */
export const mc13ServiceBlock = {
  id: "monitoring-control-service-mc13",
  type: "service",
  serviceCode: "MC13",
  title: "Central Reporting of TBS Performance and Energy Use",
  catalogue: "catalogues-a-and-b",
  description:
    "The service concerns a central system that monitors and reports the operation and performance of individual systems and the energy they consume in a building. Reporting methods can identify trends and patterns in both performance and energy use. A benchmarking mechanism can also be incorporated.",
  purpose:
    "Central reporting of TBS performance and energy use can lead to improved energy efficiency, convenience and cost-effective maintenance.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-mc-mc13",
  ],
  info:
    "Image sources: SRI2MARKET, Monitoring and Control service MC13 (Levels 1–3); Level 0 original illustration generated for this thesis using OpenAI, based on the MC13 service description.",
  levels: [
    {
      id: "monitoring-control-mc13-level-0",
      level: 0,
      title: "None",
      description: "There is no reporting functionality.",
      image: {
        id: "monitoring-control-mc13-level-0-image",
        src: mc13Level0Image,
        alt: "No central or remote reporting functionality.",
      },
    },
    {
      id: "monitoring-control-mc13-level-1",
      level: 1,
      title:
        "Central or remote reporting of realtime energy use per energy carrier",
      description:
        "Central or remote reporting provides real-time energy-use information per energy carrier, such as electricity, natural gas or heat from district heating.",
      image: {
        id: "monitoring-control-mc13-level-1-image",
        src: mc13Level1Image,
        alt: "Real-time energy-use reporting per energy carrier.",
      },
    },
    {
      id: "monitoring-control-mc13-level-2",
      level: 2,
      title:
        "Central or remote reporting of realtime energy use per energy carrier, combining TBS of at least 2 domains in one interface",
      description:
        "As in Level 1, data from energy carriers are collected and processed. At this level, one reporting interface is required for at least two technical domains.",
      image: {
        id: "monitoring-control-mc13-level-2-image",
        src: mc13Level2Image,
        alt: "One reporting interface combining TBS from at least two domains.",
      },
    },
    {
      id: "monitoring-control-mc13-level-3",
      level: 3,
      title:
        "Central or remote reporting of realtime energy use per energy carrier, combining TBS of all main domains in one interface",
      description:
        "As in Level 2, but data from all main technical domains are reported through one interface.",
      image: {
        id: "monitoring-control-mc13-level-3-image",
        src: mc13Level3Image,
        alt: "One reporting interface combining TBS from all main domains.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/** MC25 — Included in Catalogues A and B. */
export const mc25ServiceBlock = {
  id: "monitoring-control-service-mc25",
  type: "service",
  serviceCode: "MC25",
  title: "Smart Grid Integration",
  catalogue: "catalogues-a-and-b",
  description:
    "Smart-grid integration concerns functionality that can adapt energy demand to the needs and conditions of the grid. Demand Side Management (DSM) contributes to balancing supply and demand by shifting consumption to periods of lower demand, outside peak periods, and by maximising the use of renewable energy sources.",
  purpose:
    "Smart-grid-integration functionality can help generate revenue from demand flexibility, either by taking advantage of dynamic prices or by providing balancing services to the electricity grid.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-mc-mc25",
  ],
  info: "Image source: SRI2MARKET, Monitoring and Control service MC25.",
  levels: [
    {
      id: "monitoring-control-mc25-level-0",
      level: 0,
      title:
        "None - No harmonization between grid and TBS; building is operated independently from the grid load",
      description:
        "There is no harmonisation between the electricity grid and the TBS, and the building is operated independently from the grid load.",
      image: {
        id: "monitoring-control-mc25-level-0-image",
        src: mc25Level0Image,
        alt: "No harmonisation between the electricity grid and TBS.",
      },
    },
    {
      id: "monitoring-control-mc25-level-1",
      level: 1,
      title:
        "Demand side management possible for (some) individual TBS, but not coordinated over various domains",
      description:
        "Demand-side management concerns individual TBS, such as HVAC systems, lighting or other TBS. Each individual system manages the signals it receives from the grid separately.",
      image: {
        id: "monitoring-control-mc25-level-1-image",
        src: mc25Level1Image,
        alt: "Demand-side management for individual TBS without coordination across domains.",
      },
    },
    {
      id: "monitoring-control-mc25-level-2",
      level: 2,
      title: "Coordinated demand side management of multiple TBS",
      description:
        "The demand-side management of multiple TBS is coordinated. This coordination can be provided in different ways, for example through BACS or Internet of Things platforms.",
      image: {
        id: "monitoring-control-mc25-level-2-image",
        src: mc25Level2Image,
        alt: "Coordinated demand-side management of multiple TBS.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/** MC28 — Included only in Catalogue B. */
export const mc28ServiceBlock = {
  id: "monitoring-control-service-mc28",
  type: "service",
  serviceCode: "MC28",
  title:
    "Reporting Information Regarding Demand Side Management Performance and Operation",
  catalogue: "catalogue-b",
  description:
    "Performance and operation reporting for demand-side management provides users with an overall view of the effectiveness of the related actions and operations.",
  purpose:
    "The purpose of this functionality is to provide information about Demand Side Management (DSM) actions and their impacts.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-mc-mc28",
  ],
  info:
  "Image sources: SRI2MARKET, Monitoring and Control service MC28 (Levels 1–2); Level 0 original illustration generated for this thesis using OpenAI, based on the MC28 service description.",
  levels: [
    {
      id: "monitoring-control-mc28-level-0",
      level: 0,
      title: "None",
      description: "No information is provided.",
      image: {
        id: "monitoring-control-mc28-level-0-image",
        src: mc28Level0Image,
        alt: "No information about DSM performance and operation.",
      },
    },
    {
      id: "monitoring-control-mc28-level-1",
      level: 1,
      title:
        "Reporting information on current DSM status, including managed energy flows",
      description:
        "DSM actions and their impacts are quantified and visualised. Reports can include information about load shifting, the use of energy from renewable energy sources, reduction of the environmental footprint, and cost reductions achieved through demand-side management.",
      image: {
        id: "monitoring-control-mc28-level-1-image",
        src: mc28Level1Image,
        alt: "Information about current DSM status and managed energy flows.",
      },
    },
    {
      id: "monitoring-control-mc28-level-2",
      level: 2,
      title:
        "Reporting information on current, historical and predicted DSM status, including managed energy flows",
      description:
        "Data can be analysed using statistical and machine-learning algorithms. Information about patterns, trends and unusual events can be provided. Integrated alert systems can also be included to report unexpected system behaviour.",
      image: {
        id: "monitoring-control-mc28-level-2-image",
        src: mc28Level2Image,
        alt: "Current, historical and predicted DSM information with managed energy flows.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/** MC29 — Included only in Catalogue B. */
export const mc29ServiceBlock = {
  id: "monitoring-control-service-mc29",
  type: "service",
  serviceCode: "MC29",
  title: "Override of DSM Control",
  catalogue: "catalogue-b",
  description:
    "Automated DSM settings may not always align with user preferences, for example regarding temperature setpoints, and emergency situations may also occur.",
  purpose:
    "The service concerns the ability of building users to override DSM settings when they wish to do so.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-mc-mc29",
  ],
  info: "Image source: SRI2MARKET, Monitoring and Control service MC29.",
  levels: [
    {
      id: "monitoring-control-mc29-level-0",
      level: 0,
      title: "No DSM control",
      description: "There is no DSM control.",
      image: {
        id: "monitoring-control-mc29-level-0-image",
        src: mc29Level0Image,
        alt: "No DSM control.",
      },
    },
    {
      id: "monitoring-control-mc29-level-1",
      level: 1,
      title:
        "DSM control without the possibility to override this control by the building user (occupant or facility manager)",
      description:
        "Users cannot intervene in or override DSM operation and settings, except possibly in an emergency. Demand-response signals, such as load reduction or load shifting during peak-demand periods, are imposed without user override.",
      image: {
        id: "monitoring-control-mc29-level-1-image",
        src: mc29Level1Image,
        alt: "DSM control without user override.",
      },
    },
    {
      id: "monitoring-control-mc29-level-2",
      level: 2,
      title:
        "Manual override and reactivation of DSM control by the building user",
      description:
        "DSM can be activated and deactivated manually through user interfaces, mobile applications or another mechanism that provides access to the DSM system.",
      image: {
        id: "monitoring-control-mc29-level-2-image",
        src: mc29Level2Image,
        alt: "Manual override and reactivation of DSM control.",
      },
    },
    {
      id: "monitoring-control-mc29-level-3",
      level: 3,
      title:
        "Scheduled override of DSM control (and reactivation) by the building user",
      description:
        "Override or intervention is based on predefined schedules. Users can select specific periods during the day or week in which DSM control is overridden, using a dashboard, mobile application or another available interface.",
      image: {
        id: "monitoring-control-mc29-level-3-image",
        src: mc29Level3Image,
        alt: "Scheduled override and reactivation of DSM control.",
      },
    },
    {
      id: "monitoring-control-mc29-level-4",
      level: 4,
      title:
        "Scheduled override of DSM control and reactivation with optimised control",
      description:
        "DSM settings can be overridden according to a schedule. A function monitors DSM actions to optimise their impact and takes user preferences into account so that optimised on/off control can be performed or suitable operating schedules can be determined.",
      image: {
        id: "monitoring-control-mc29-level-4-image",
        src: mc29Level4Image,
        alt: "Scheduled DSM override and reactivation with optimised control.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/** MC30 — Included in Catalogues A and B. */
export const mc30ServiceBlock = {
  id: "monitoring-control-service-mc30",
  type: "service",
  serviceCode: "MC30",
  title:
    "Single Platform that Allows Automated Control & Coordination Between TBS + Optimization of Energy Flow Based on Occupancy, Weather and Grid Signals",
  catalogue: "catalogues-a-and-b",
  purpose:
    "The service concerns a single platform for controlling and coordinating the building's TBS, with higher functionality including automated coordination and energy-flow optimisation based on occupancy, weather and electricity-grid signals.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-mc-mc30",
  ],
  info: "Image source: SRI2MARKET, Monitoring and Control service MC30.",
  levels: [
    {
      id: "monitoring-control-mc30-level-0",
      level: 0,
      title: "None",
      description:
        "There is no single platform for coordinating all TBS.",
      image: {
        id: "monitoring-control-mc30-level-0-image",
        src: mc30Level0Image,
        alt: "No single platform for coordinating TBS.",
      },
    },
    {
      id: "monitoring-control-mc30-level-1",
      level: 1,
      title: "Single platform that allows manual control of multiple TBS",
      description:
        "Separate TBS are connected to one platform that provides a unified overview of the operation of each component. Data are obtained through sensors according to the device being monitored and are transmitted to the platform through wired or wireless connections. Users can access unified data through mobile applications, dashboards or web portals and can manually control the operation of each connected TBS.",
      image: {
        id: "monitoring-control-mc30-level-1-image",
        src: mc30Level1Image,
        alt: "Single platform for manual control of multiple TBS.",
      },
    },
    {
      id: "monitoring-control-mc30-level-2",
      level: 2,
      title:
        "Single platform that allows automated control & coordination between TBS",
      description:
        "A single platform ensures the coordinated operation of all TBS.",
      image: {
        id: "monitoring-control-mc30-level-2-image",
        src: mc30Level2Image,
        alt: "Single platform for automated control and coordination between TBS.",
      },
    },
    {
      id: "monitoring-control-mc30-level-3",
      level: 3,
      title:
        "Single platform that allows automated control & coordination between TBS + optimization of energy flow based on occupancy, weather and grid signals",
      description:
        "The system operates in the same way as Level 2. In addition, it uses data such as occupancy, weather, including temperature and humidity, and grid signals to optimise all TBS operations.",
      image: {
        id: "monitoring-control-mc30-level-3-image",
        src: mc30Level3Image,
        alt: "Single platform with automated coordination and energy-flow optimisation.",
      },
    },
  ],
} satisfies TheoryServiceBlock;
