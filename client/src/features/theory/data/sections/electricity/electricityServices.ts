//client\src\features\theory\data\sections\electricity\electricityServices.ts

import type { TheoryServiceBlock } from "../../../types/theory.types";

/**
 * Source policy for the Electricity domain:
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Electricity material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership and applicability / assessment conditions.
 *   These are cross-checked against the Final Report and SRI2MARKET where the
 *   supporting material clarifies their technical meaning.
 *
 * - Service purposes, technical context, detailed functionality-level
 *   explanations, technical examples and service images are based primarily
 *   on the corresponding SRI2MARKET Electricity material and are cross-checked
 *   against the consolidated catalogue definitions.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - "Always to be assessed" is an assessment rule and is not presented as
 *   a technical applicability condition.
 *
 * - The applicability field is used only when the Calculation Sheet states a
 *   technical condition under which the service is applicable. Workbook notes
 *   that do not represent technical applicability conditions are not presented
 *   as lesson content.
 */

import e2Level0Image from "../../../../../assets/theory/section-9/services/e2/level-0.png";
import e2Level1Image from "../../../../../assets/theory/section-9/services/e2/level-1.png";
import e2Level2Image from "../../../../../assets/theory/section-9/services/e2/level-2.png";
import e2Level3Image from "../../../../../assets/theory/section-9/services/e2/level-3.png";
import e2Level4Image from "../../../../../assets/theory/section-9/services/e2/level-4.png";

import e3Level0Image from "../../../../../assets/theory/section-9/services/e3/level-0.png";
import e3Level1Image from "../../../../../assets/theory/section-9/services/e3/level-1.png";
import e3Level2Image from "../../../../../assets/theory/section-9/services/e3/level-2.png";
import e3Level3Image from "../../../../../assets/theory/section-9/services/e3/level-3.png";
import e3Level4Image from "../../../../../assets/theory/section-9/services/e3/level-4.png";

import e4Level0Image from "../../../../../assets/theory/section-9/services/e4/level-0.png";
import e4Level1Image from "../../../../../assets/theory/section-9/services/e4/level-1.png";
import e4Level2Image from "../../../../../assets/theory/section-9/services/e4/level-2.png";
import e4Level3Image from "../../../../../assets/theory/section-9/services/e4/level-3.png";

import e5Level0Image from "../../../../../assets/theory/section-9/services/e5/level-0.png";
import e5Level1Image from "../../../../../assets/theory/section-9/services/e5/level-1.png";
import e5Level2Image from "../../../../../assets/theory/section-9/services/e5/level-2.png";

import e8Level0Image from "../../../../../assets/theory/section-9/services/e8/level-0.png";
import e8Level1Image from "../../../../../assets/theory/section-9/services/e8/level-1.png";
import e8Level2Image from "../../../../../assets/theory/section-9/services/e8/level-2.png";
import e8Level3Image from "../../../../../assets/theory/section-9/services/e8/level-3.png";

import e11Level0Image from "../../../../../assets/theory/section-9/services/e11/level-0.png";
import e11Level1Image from "../../../../../assets/theory/section-9/services/e11/level-1.png";
import e11Level2Image from "../../../../../assets/theory/section-9/services/e11/level-2.png";
import e11Level3Image from "../../../../../assets/theory/section-9/services/e11/level-3.png";
import e11Level4Image from "../../../../../assets/theory/section-9/services/e11/level-4.png";

import e12Level0Image from "../../../../../assets/theory/section-9/services/e12/level-0.png";
import e12Level1Image from "../../../../../assets/theory/section-9/services/e12/level-1.png";
import e12Level2Image from "../../../../../assets/theory/section-9/services/e12/level-2.png";
import e12Level3Image from "../../../../../assets/theory/section-9/services/e12/level-3.png";
import e12Level4Image from "../../../../../assets/theory/section-9/services/e12/level-4.png";

export const e2ServiceBlock = {
  id: "electricity-service-e2",
  type: "service",
  serviceCode: "E2",
  title: "Reporting Information Regarding Local Electricity Generation",
  catalogue: "catalogues-a-and-b",
  applicability: "Applicable only in case of local energy generation.",
  description:
    "Local electricity-generation installations can be monitored with energy-monitoring systems. Measuring equipment is placed at a suitable point in the installation and records electricity generation together with information related to the operating condition of the generator. The equipment is commonly wireless and combined with software. The software is commonly cloud-based, includes visualisation functions, and can make the data accessible through a web or mobile application.",
  purpose:
    "The purpose of this service is to provide consumers with a detailed overview of local electricity generation, so that its use can be increased and maintenance needs can be identified.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-electricity-e2",
  ],
  info: "Image source: SRI2MARKET, Electricity service E2.",
  levels: [
    {
      id: "electricity-e2-level-0",
      level: 0,
      title: "None",
      description:
        "No reporting function is available for local electricity generation.",
      image: {
        id: "electricity-e2-level-0-image",
        src: e2Level0Image,
        alt: "Local electricity generation without a reporting function.",
      },
    },
    {
      id: "electricity-e2-level-1",
      level: 1,
      title: "Current generation data available",
      description:
        "Electricity-generation data are collected using electricity meters. The data are then visualised through real-time dashboards or other visualisation methods.",
      image: {
        id: "electricity-e2-level-1-image",
        src: e2Level1Image,
        alt: "Dashboard displaying current local electricity-generation data.",
      },
    },
    {
      id: "electricity-e2-level-2",
      level: 2,
      title: "Actual values and historical data",
      description:
        "Data are collected using meters as at Level 1. They are also stored and can be retrieved. Users can access current values and historical data through a user interface. This makes it possible to identify patterns and trends and obtain a clearer view of system use and operation.",
      image: {
        id: "electricity-e2-level-2-image",
        src: e2Level2Image,
        alt:
          "Interface presenting current and historical local electricity-generation data.",
      },
    },
    {
      id: "electricity-e2-level-3",
      level: 3,
      title:
        "Performance evaluation including forecasting and/or benchmarking",
      description:
        "The data are analysed using statistical models for forecasting. Equipment installed in the generation system and additional meters or sensors can collect further information, such as weather data, which can be supplied to monitoring systems. The performance of the local generation system can also be compared with industry reference values for benchmarking.",
      image: {
        id: "electricity-e2-level-3-image",
        src: e2Level3Image,
        alt:
          "Local generation performance evaluated through forecasting or benchmarking.",
      },
    },
    {
      id: "electricity-e2-level-4",
      level: 4,
      title:
        "Performance evaluation including forecasting and/or benchmarking; also including predictive management and fault detection",
      description:
        "Software provides the Level 3 functions and additionally supports predictive management and fault detection. Faults can be detected by comparing values received from meters and sensors with the values expected during fault-free operation. Alert mechanisms can also be integrated.",
      image: {
        id: "electricity-e2-level-4-image",
        src: e2Level4Image,
        alt:
          "Local electricity-generation monitoring with predictive management, fault detection and alerts.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

export const e3ServiceBlock = {
  id: "electricity-service-e3",
  type: "service",
  serviceCode: "E3",
  title: "Storage of (Locally Generated) Electricity",
  catalogue: "catalogues-a-and-b",
  applicability: "Applicable only in case of local energy generation.",
  description:
    "Storage methods include lithium-ion, lead-acid and flow batteries, compressed-air storage and thermal energy storage. With compressed-air storage, air is stored in compressed form and released later. With thermal storage, energy can be stored as thermal energy in a medium such as water. Grid-connected controllers can use electricity-pricing and demand-response signals, battery state of charge and electricity-generation data. Communication between the grid and a battery can use technologies and protocols such as DNP3, MQTT, IEC 61850 and OpenADR.",
  purpose:
    "When locally generated electricity at a given time is higher than current demand, storage ensures that the surplus is not wasted. The stored electricity can be used during periods of high electricity prices. Use of the surplus energy can provide environmental and economic benefits.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-electricity-e3",
  ],
  info: "Image source: SRI2MARKET, Electricity service E3.",
  levels: [
    {
      id: "electricity-e3-level-0",
      level: 0,
      title: "None",
      description: "No electricity storage is available.",
      image: {
        id: "electricity-e3-level-0-image",
        src: e3Level0Image,
        alt: "Local electricity generation without electricity storage.",
      },
    },
    {
      id: "electricity-e3-level-1",
      level: 1,
      title: "On site storage of electricity (e.g. electric battery)",
      description:
        "Surplus electricity charges an on-site storage system, commonly an electric battery, for later use. The stored electricity can be used when local electricity generation is lower than current demand. Batteries connected to solar panels require a charge controller or power-conditioning unit so that the generated electricity can be converted into a suitable form for use.",
      image: {
        id: "electricity-e3-level-1-image",
        src: e3Level1Image,
        alt: "Solar panels charging an on-site electric battery for later use.",
      },
    },
    {
      id: "electricity-e3-level-2",
      level: 2,
      title:
        "On site storage of energy (e.g. electric battery or thermal storage) with controller based on grid signals",
      description:
        "The storage system is connected to the electricity grid and can receive signals from it. The battery and controller must be compatible with the signals and able to process them through an appropriate communication protocol. The signals commonly concern electricity pricing or periods when load shifting is required. The controller operates according to the received signals and its settings.",
      image: {
        id: "electricity-e3-level-2-image",
        src: e3Level2Image,
        alt:
          "On-site energy storage controlled according to electricity-grid signals.",
      },
    },
    {
      id: "electricity-e3-level-3",
      level: 3,
      title:
        "On site storage of energy (e.g. electric battery or thermal storage) with controller optimising the use of locally generated electricity",
      description:
        "The controller uses an integrated algorithm and data such as building energy demand, grid peak periods, electricity consumption, battery capacity and electricity generation. Its primary objective is the effective use of locally generated electricity by aligning consumption with periods of high generation through load shifting. Decisions use historical data, current conditions and grid signals to determine when current generation should be used, when it should be stored in the battery, or when stored energy should be used.",
      image: {
        id: "electricity-e3-level-3-image",
        src: e3Level3Image,
        alt:
          "Storage controller using generation, demand and battery data to optimise local electricity use.",
      },
    },
    {
      id: "electricity-e3-level-4",
      level: 4,
      title:
        "On site storage of energy (e.g. electric battery or thermal storage) with controller optimising the use of locally generated electricity and possibility to feed back into the grid",
      description:
        "The system provides the functionality of Level 3 and can additionally supply energy back to the electricity grid. Controllers interact with the grid and allow bidirectional energy flow between the battery and the grid according to received signals, including requests for electricity supply.",
      image: {
        id: "electricity-e3-level-4-image",
        src: e3Level4Image,
        alt:
          "On-site storage optimising local electricity use and feeding electricity back into the grid.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

export const e4ServiceBlock = {
  id: "electricity-service-e4",
  type: "service",
  serviceCode: "E4",
  title: "Optimizing Self-Consumption of Locally Generated Electricity",
  catalogue: "catalogue-b",
  applicability: "Applicable only in case of local energy generation.",
  description:
    "Improving the use of locally generated renewable electricity requires monitoring of electricity-consumption and generation patterns. Device operation can be scheduled for periods of high local generation using timers and smart-home automation systems. Energy storage can also be used. Self-consumption optimisation algorithms can automatically adjust electrical loads and energy storage.",
  purpose:
    "The aim of this service is to improve the use of locally generated energy from renewable sources. Optimising self-consumption reduces dependence on the electricity grid, particularly during peak periods, and increases the use of renewable energy.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-electricity-e4",
  ],
  info: "Image source: SRI2MARKET, Electricity service E4.",
  levels: [
    {
      id: "electricity-e4-level-0",
      level: 0,
      title: "None",
      description:
        "Self-consumption of locally generated electricity is not optimised.",
      image: {
        id: "electricity-e4-level-0-image",
        src: e4Level0Image,
        alt:
          "Locally generated electricity used without self-consumption optimisation.",
      },
    },
    {
      id: "electricity-e4-level-1",
      level: 1,
      title:
        "Scheduling electricity consumption (plug loads, white goods, etc.)",
      description:
        "Devices are scheduled to operate during periods when local generation is available and/or electricity from the grid is expected to have a low price. Programmable smart plugs can be used to schedule when connected devices switch on or off.",
      image: {
        id: "electricity-e4-level-1-image",
        src: e4Level1Image,
        alt:
          "Building devices scheduled to operate during periods of local electricity generation.",
      },
    },
    {
      id: "electricity-e4-level-2",
      level: 2,
      title:
        "Automated management of local electricity consumption based on current renewable energy availability",
      description:
        "Electricity consumption is adapted to the current availability of renewable energy. The energy source is monitored so that its availability is known in real time, and automation is used to activate different devices.",
      image: {
        id: "electricity-e4-level-2-image",
        src: e4Level2Image,
        alt:
          "Automated device operation based on current renewable-electricity availability.",
      },
    },
    {
      id: "electricity-e4-level-3",
      level: 3,
      title:
        "Automated management of local electricity consumption based on current and predicted energy needs and renewable energy availability",
      description:
        "Meters record building electricity consumption and electricity generation. An automatic controller is connected to building devices and configured to respond to the measurements by switching selected devices on or off. Smart plugs and smart appliances are used. The controller includes, or communicates with, an algorithm that processes additional information from sensors, including weather and occupancy data, and predicts the building's energy needs.",
      image: {
        id: "electricity-e4-level-3-image",
        src: e4Level3Image,
        alt:
          "Automatic controller using consumption, generation, weather and occupancy data to optimise self-consumption.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

export const e5ServiceBlock = {
  id: "electricity-service-e5",
  type: "service",
  serviceCode: "E5",
  title: "Control of Combined Heat and Power Plant (CHP)",
  catalogue: "catalogue-b",
  applicability: "Applicable only in case of CHP.",
  description:
    "A combined heat and power plant produces electricity and heat and is commonly used in large buildings such as hospitals and commercial facilities. Fuel is used to generate electricity, and heat produced as a by-product is captured for useful heating instead of being released as waste heat.",
  purpose:
    "CHP systems generate electricity while capturing waste heat for heating. Appropriate control can improve system performance. CHP control also provides energy flexibility and convenience because electricity and heat requirements are met by one controlled source.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-electricity-e5",
  ],
  info: "Image source: SRI2MARKET, Electricity service E5.",
  levels: [
    {
      id: "electricity-e5-level-0",
      level: 0,
      title:
        "CHP control based on scheduled runtime management and/or current heat energy demand",
      description:
        "CHP operation is based on predefined operating periods and/or monitoring of the current heat-energy demand. Timers switch CHP operation on or off during predefined time intervals, commonly according to predetermined needs and operating requirements.",
      image: {
        id: "electricity-e5-level-0-image",
        src: e5Level0Image,
        alt:
          "Combined heat and power plant controlled according to a schedule or current heat demand.",
      },
    },
    {
      id: "electricity-e5-level-1",
      level: 1,
      title:
        "CHP runtime control influenced by the fluctuating availability of RES; overproduction will be fed into the grid",
      description:
        "CHP operation is adapted to the fluctuating availability of local renewable energy sources. Any electricity overproduction is fed into the electricity grid.",
      image: {
        id: "electricity-e5-level-1-image",
        src: e5Level1Image,
        alt:
          "CHP runtime adjusted according to renewable-energy availability with electricity supplied to the grid.",
      },
    },
    {
      id: "electricity-e5-level-2",
      level: 2,
      title:
        "CHP runtime control influenced by the fluctuating availability of RES and grid signals; dynamic charging and runtime control to optimise self-consumption of renewables",
      description:
        "The CHP plant operates as at Level 1, while its runtime is additionally influenced by electricity-grid signals. Dynamic charging and runtime control are coordinated with on-site renewable-energy generation in order to optimise the self-consumption of renewable energy.",
      image: {
        id: "electricity-e5-level-2-image",
        src: e5Level2Image,
        alt:
          "CHP control coordinated with renewable-energy availability and electricity-grid signals.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

export const e8ServiceBlock = {
  id: "electricity-service-e8",
  type: "service",
  serviceCode: "E8",
  title: "Support of (Micro)grid Operation Modes",
  catalogue: "catalogue-b",
  applicability: "Applicable only in case of local energy storage.",
  description:
    "A microgrid is a small-scale network that operates independently or in connection with the electricity grid. Buildings can contribute to the grid or a microgrid by integrating renewable-energy use, providing stored energy when required, or continuing to operate independently from the electricity grid, for example during a power interruption.",
  purpose:
    "Support of (micro)grid operation provides flexibility in electricity demand and supply because it enables switching between electricity from the grid and locally generated electricity.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-electricity-e8",
  ],
  info: "Image source: SRI2MARKET, Electricity service E8.",
  levels: [
    {
      id: "electricity-e8-level-0",
      level: 0,
      title: "None",
      description: "No (micro)grid operation function is available.",
      image: {
        id: "electricity-e8-level-0-image",
        src: e8Level0Image,
        alt:
          "Electricity-grid connection without a microgrid operation function.",
      },
    },
    {
      id: "electricity-e8-level-1",
      level: 1,
      title:
        "Automated management of (building-level) electricity consumption based on grid signals",
      description:
        "Communication is required between the electricity grid and the building. Automatic control adapts electricity consumption according to the exchanged information. A central controller controls some or all building subsystems, such as lighting, appliances and air conditioning, so that operation of selected systems and devices can be shifted when required.",
      image: {
        id: "electricity-e8-level-1-image",
        src: e8Level1Image,
        alt:
          "Central building controller adapting electricity consumption according to grid signals.",
      },
    },
    {
      id: "electricity-e8-level-2",
      level: 2,
      title:
        "Automated management of (building-level) electricity consumption and electricity supply to neighbouring buildings (microgrid) or grid",
      description:
        "Neighbouring buildings can form a microgrid and share surplus locally generated electricity from solar panels or other sources. The same principle extends to the wider electricity grid, where surplus locally generated electricity can be supplied to the grid when required. Meters, sensors and communication protocols are used.",
      image: {
        id: "electricity-e8-level-2-image",
        src: e8Level2Image,
        alt:
          "Neighbouring buildings sharing locally generated electricity through a microgrid or supplying the wider grid.",
      },
    },
    {
      id: "electricity-e8-level-3",
      level: 3,
      title:
        "Automated management of (building-level) electricity consumption and supply, with potential to continue limited off-grid operation (island mode)",
      description:
        "The system operates as at the preceding levels and can additionally operate independently from the electricity grid for a defined period.",
      image: {
        id: "electricity-e8-level-3-image",
        src: e8Level3Image,
        alt:
          "Building or microgrid continuing limited operation independently from the electricity grid.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

export const e11ServiceBlock = {
  id: "electricity-service-e11",
  type: "service",
  serviceCode: "E11",
  title: "Reporting Information Regarding Energy Storage",
  catalogue: "catalogues-a-and-b",
  applicability: "Applicable only in case of local energy storage.",
  description:
    "Access to energy-storage information supports monitoring of the correct operation of the storage system and its charging and discharging patterns. The information can be used for timely maintenance and to improve use of the storage system.",
  purpose:
    "Providing information about energy storage supplies detailed data that can be used to optimise storage operation. The information can also enable early fault detection, supporting maintenance, cost reduction and reduced downtime.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-electricity-e11",
  ],
  info: "Image source: SRI2MARKET, Electricity service E11.",
  levels: [
    {
      id: "electricity-e11-level-0",
      level: 0,
      title: "None",
      description:
        "No information is provided about the energy-storage system.",
      image: {
        id: "electricity-e11-level-0-image",
        src: e11Level0Image,
        alt:
          "Energy-storage system without status or performance information.",
      },
    },
    {
      id: "electricity-e11-level-1",
      level: 1,
      title: "Current state of charge (SOC) data available",
      description:
        "State of charge refers to the amount of energy stored in the storage system. It can be determined using different methods, such as voltage or current measurement for a lithium-ion battery, through a battery-management system and monitoring devices. The collected data are available so that the user can see the current battery-energy level.",
      image: {
        id: "electricity-e11-level-1-image",
        src: e11Level1Image,
        alt:
          "Battery-monitoring interface displaying current state of charge.",
      },
    },
    {
      id: "electricity-e11-level-2",
      level: 2,
      title: "Actual values and historical data",
      description:
        "Actual values are real-time state-of-charge measurements that provide information about the current condition of the system. Historical data are records collected over a defined period. Many systems provide a mobile application through which the user can access battery information. Current and historical data can be used to identify charging and discharging patterns, help users recognise operating faults, and improve battery use.",
      image: {
        id: "electricity-e11-level-2-image",
        src: e11Level2Image,
        alt:
          "Energy-storage dashboard showing current and historical charging and discharging data.",
      },
    },
    {
      id: "electricity-e11-level-3",
      level: 3,
      title:
        "Performance evaluation including forecasting and/or benchmarking",
      description:
        "Algorithms are integrated to evaluate storage-system performance. Benchmarking can compare system performance with industry reference values. A forecasting algorithm can also provide information about the future condition of the storage system, enabling users to adjust its operation.",
      image: {
        id: "electricity-e11-level-3-image",
        src: e11Level3Image,
        alt:
          "Storage-system performance evaluated through forecasting or benchmarking.",
      },
    },
    {
      id: "electricity-e11-level-4",
      level: 4,
      title:
        "Performance evaluation including forecasting and/or benchmarking; also including predictive management and fault detection",
      description:
        "Software provides the Level 3 functions and supports predictive management using forecasting and historical data. It can also detect faults in battery operation and provide early warnings through an integrated alert mechanism.",
      image: {
        id: "electricity-e11-level-4-image",
        src: e11Level4Image,
        alt:
          "Energy-storage monitoring with predictive management, fault detection and alerts.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

export const e12ServiceBlock = {
  id: "electricity-service-e12",
  type: "service",
  serviceCode: "E12",
  title: "Reporting Information Regarding Electricity Consumption",
  catalogue: "catalogues-a-and-b",
  description:
    "This service concerns the ability of the system to inform users about electricity consumption.",
  purpose:
    "Providing information about electricity consumption supplies detailed data that can be used to identify patterns and optimise electricity use, thereby increasing energy efficiency.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-electricity-e12",
  ],
  info: "Image source: SRI2MARKET, Electricity service E12.",
  levels: [
    {
      id: "electricity-e12-level-0",
      level: 0,
      title: "None",
      description:
        "No electricity-consumption information is provided.",
      image: {
        id: "electricity-e12-level-0-image",
        src: e12Level0Image,
        alt:
          "Electricity consumption without information being provided to users.",
      },
    },
    {
      id: "electricity-e12-level-1",
      level: 1,
      title:
        "Reporting on current electricity consumption on building level",
      description:
        "A suitable meter in the building's electrical circuit informs users about current electricity consumption. The meter can have a display and/or be connected to a mobile application or software platform that visualises the measurements.",
      image: {
        id: "electricity-e12-level-1-image",
        src: e12Level1Image,
        alt:
          "Building-level display of current electricity consumption.",
      },
    },
    {
      id: "electricity-e12-level-2",
      level: 2,
      title:
        "Real-time feedback or benchmarking on building level",
      description:
        "Meter data are sent to a suitable platform or mobile application to provide feedback or benchmarking. Current consumption can be compared with the building's usual consumption or with the average consumption of buildings of the same type. A user application can display the data.",
      image: {
        id: "electricity-e12-level-2-image",
        src: e12Level2Image,
        alt:
          "Building-level electricity-consumption feedback or benchmarking.",
      },
    },
    {
      id: "electricity-e12-level-3",
      level: 3,
      title:
        "Real-time feedback or benchmarking on appliance level",
      description:
        "Smart plugs monitor the electricity consumption of each appliance connected to them, enabling separate monitoring at appliance level.",
      image: {
        id: "electricity-e12-level-3-image",
        src: e12Level3Image,
        alt:
          "Appliance-level electricity-consumption monitoring using smart plugs.",
      },
    },
    {
      id: "electricity-e12-level-4",
      level: 4,
      title:
        "Real-time feedback or benchmarking on appliance level with automated personalized recommendations",
      description:
        "The monitoring system provides the functions of the preceding levels and also provides recommendations. Machine-learning algorithms can learn the user's consumption profile, use other data such as user preferences or benchmarking data, and provide recommendations for reducing electricity consumption.",
      image: {
        id: "electricity-e12-level-4-image",
        src: e12Level4Image,
        alt:
          "Appliance-level electricity information with automated personalized recommendations.",
      },
    },
  ],
} satisfies TheoryServiceBlock;