// client/src/features/theory/data/theorySources.ts

import type { TheorySource } from "../types/theory.types";

export const theorySources = [
  {
    id: "sri-final-report-2020",
    title:
      "Final Report on the Technical Support to the Development of a Smart Readiness Indicator for Buildings",
    shortTitle: "SRI Final Report",
    year: 2020,
    type: "technical-report",
    description:
      "European Commission technical support report used for the development and explanation of the Smart Readiness Indicator methodology, including service triage, the treatment of absent services and the calculation structure.",
  },
  {
    id: "delegated-regulation-2020-2155",
    title: "Commission Delegated Regulation (EU) 2020/2155",
    shortTitle: "Delegated Regulation (EU) 2020/2155",
    year: 2020,
    type: "eu-regulation",
    description:
      "EU regulation establishing an optional common European Union scheme for rating the smart readiness of buildings.",
  },
  {
    id: "implementing-regulation-2020-2156",
    title: "Commission Implementing Regulation (EU) 2020/2156",
    shortTitle: "Implementing Regulation (EU) 2020/2156",
    year: 2020,
    type: "eu-regulation",
    description:
      "EU regulation detailing the technical modalities for the effective implementation of the optional common Union scheme for rating the smart readiness of buildings, including provisions on qualified or accredited experts and SRI certificates.",
  },
  {
    id: "sri-practical-guide-v45",
    title: "Practical Guide SRI Calculation Framework v4.5",
    shortTitle: "Practical Guide v4.5",
    year: 2023,
    type: "practical-guide",
    description:
      "Practical guide for the SRI calculation framework, used for domain-state selection, service applicability, functionality-level entry, partial implementation, weighting and calculation-related sections.",
  },
  {
    id: "sri-calculation-sheet-v45",
    title: "SRI Calculation Sheet v4.5",
    shortTitle: "SRI Calculation Sheet v4.5",
    year: 2023,
    type: "other-official-source",
    description:
      "SRI calculation workbook implementing the assessment and calculation structure. It is used to verify catalogue membership, domain states, service-level triage, service applicability, functionality-level inputs and inclusion in the maximum obtainable score. In the technical-domain lessons, it is not used as the source of service purposes, detailed functionality-level explanations or examples.",
  },
  {
    id: "sri2market-service-catalogue",
    title: "SRI2MARKET — Smart-Ready Service Catalogue",
    shortTitle: "SRI2MARKET Service Catalogue",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material explaining the smart-ready service catalogues, Methods A and B, the nine technical domains, functionality levels and the H-1a service example.",
  },
  {
    id: "sri2market-results",
    title: "SRI2MARKET — SRI Results",
    shortTitle: "SRI2MARKET Results",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material presenting the total SRI result, the scores for the three key functionalities and the detailed result matrix by technical domain and impact criterion.",
  },

  // Section 3 — Heating

  {
    id: "sri2market-heating-overview",
    title: "SRI2MARKET Heating Domain Overview",
    shortTitle: "SRI2MARKET Heating Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material introducing the Heating domain, its energy context and examples of smart heating control.",
  },
  {
    id: "sri2market-heating-h1a",
    title: "SRI2MARKET Heating Service H1a — Heat Emission Control",
    shortTitle: "SRI2MARKET H1a",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the purpose, applicability and functionality levels of heat emission control for heat emitters other than TABS.",
  },
  {
    id: "sri2market-heating-h1b",
    title: "SRI2MARKET Heating Service H1b — Heat Emission Control for TABS",
    shortTitle: "SRI2MARKET H1b",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the purpose and functionality levels of heat emission control for Thermally Activated Building Systems in heating mode.",
  },
  {
    id: "sri2market-heating-h1c-a",
    title:
      "SRI2MARKET Heating Service H1c, Catalogue A — Storage and Shifting of Thermal Energy",
    shortTitle: "SRI2MARKET H1c Catalogue A",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing thermal-energy storage and shifting in Catalogue A.",
  },
  {
    id: "sri2market-heating-h1c-b",
    title:
      "SRI2MARKET Heating Service H1c, Catalogue B — Distribution Fluid Temperature Control",
    shortTitle: "SRI2MARKET H1c Catalogue B",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the control of distribution-fluid temperature in Catalogue B.",
  },
  {
    id: "sri2market-heating-h1d",
    title:
      "SRI2MARKET Heating Service H1d — Control of Distribution Pumps in Networks",
    shortTitle: "SRI2MARKET H1d",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the purpose and functionality levels of distribution-pump control.",
  },
  {
    id: "sri2market-heating-h1f",
    title:
      "SRI2MARKET Heating Service H1f — Thermal Energy Storage for Building Heating",
    shortTitle: "SRI2MARKET H1f",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing thermal-energy storage operation for building heating, excluding TABS.",
  },
  {
    id: "sri2market-heating-h2a",
    title:
      "SRI2MARKET Heating Service H2a — Heat Generator Control Except Heat Pumps",
    shortTitle: "SRI2MARKET H2a",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing temperature control for heat generators other than heat pumps.",
  },
  {
    id: "sri2market-heating-h2b",
    title:
      "SRI2MARKET Heating Service H2b — Heat Generator Control for Heat Pumps",
    shortTitle: "SRI2MARKET H2b",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing capacity control for heat pumps.",
  },
  {
    id: "sri2market-heating-h2d",
    title:
      "SRI2MARKET Heating Service H2d — Sequencing of Different Heat Generators",
    shortTitle: "SRI2MARKET H2d",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the operating priority and sequencing of systems with multiple different heat generators.",
  },
  {
    id: "sri2market-heating-h3",
    title:
      "SRI2MARKET Heating Service H3 — Provision of Information Regarding Heating-System Performance",
    shortTitle: "SRI2MARKET H3",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing heating-system performance reporting, evaluation, forecasting, benchmarking, predictive management and fault detection.",
  },
  {
    id: "sri2market-heating-h4",
    title:
      "SRI2MARKET Heating Service H4 — Flexibility and Interaction with the Electricity Grid",
    shortTitle: "SRI2MARKET H4",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing flexible heating-system operation and interaction with electricity-grid signals.",
  },

  // Section 4 — Cooling

  {
    id: "sri2market-cooling-overview",
    title: "SRI2MARKET Cooling Domain Overview",
    shortTitle: "SRI2MARKET Cooling Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material introducing the Cooling domain, its energy context, cooling-supply approaches and examples of smart cooling control.",
  },
  {
    id: "sri2market-cooling-c1a",
    title: "SRI2MARKET Cooling Service C1a — Cooling Emission Control",
    shortTitle: "SRI2MARKET C1a",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing cooling-emission control for cooling emitters other than Thermally Activated Building Systems.",
  },
  {
    id: "sri2market-cooling-c1b",
    title:
      "SRI2MARKET Cooling Service C1b — Emission Control for TABS in Cooling Mode",
    shortTitle: "SRI2MARKET C1b",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing emission control for Thermally Activated Building Systems in cooling mode.",
  },
  {
    id: "sri2market-cooling-c1c",
    title:
      "SRI2MARKET Cooling Service C1c — Control of Cooling-Water Temperature in the Distribution Network",
    shortTitle: "SRI2MARKET C1c",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing control of chilled-water temperature in the supply or return flow of the cooling distribution network.",
  },
  {
    id: "sri2market-cooling-c1d",
    title:
      "SRI2MARKET Cooling Service C1d — Control of Distribution Pumps in Networks",
    shortTitle: "SRI2MARKET C1d",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the control of distribution pumps in cooling networks.",
  },
  {
    id: "sri2market-cooling-c1f",
    title:
      "SRI2MARKET Cooling Service C1f — Interlock: Avoiding Simultaneous Heating and Cooling",
    shortTitle: "SRI2MARKET C1f",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing partial and total interlock used to prevent simultaneous heating and cooling in the same room.",
  },
  {
    id: "sri2market-cooling-c1g",
    title:
      "SRI2MARKET Cooling Service C1g — Control of Thermal Energy Storage Operation",
    shortTitle: "SRI2MARKET C1g",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the operation and charging control of thermal energy storage in the Cooling domain.",
  },
  {
    id: "sri2market-cooling-c2a",
    title: "SRI2MARKET Cooling Service C2a — Cooling Generator Control",
    shortTitle: "SRI2MARKET C2a",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing capacity control for cooling production according to load, demand and electricity-grid signals.",
  },
  {
    id: "sri2market-cooling-c2b",
    title:
      "SRI2MARKET Cooling Service C2b — Sequencing of Different Cooling Generators",
    shortTitle: "SRI2MARKET C2b",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the priority and sequencing of systems with multiple cooling generators.",
  },
  {
    id: "sri2market-cooling-c3",
    title:
      "SRI2MARKET Cooling Service C3 — Provision of Information Regarding Cooling-System Performance",
    shortTitle: "SRI2MARKET C3",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing cooling-system performance reporting, historical data, forecasting, benchmarking, predictive management and fault detection.",
  },
  {
    id: "sri2market-cooling-c4",
    title:
      "SRI2MARKET Cooling Service C4 — Flexibility and Interaction with the Electricity Grid",
    shortTitle: "SRI2MARKET C4",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing flexible cooling-system operation and interaction with electricity-grid signals.",
  },
  // Section 5 — Domestic Hot Water

  {
    id: "sri2market-dhw-overview",
    title: "SRI2MARKET Domestic Hot Water Domain Overview",
    shortTitle: "SRI2MARKET DHW Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material introducing the Domestic Hot Water domain, its household-energy context and the role of controls and scheduled charging.",
  },
  {
    id: "sri2market-dhw-dhw1a",
    title:
      "SRI2MARKET Domestic Hot Water Service DHW1a — Control of DHW Storage Charging with Direct Electric Heating or an Integrated Electric Heat Pump",
    shortTitle: "SRI2MARKET DHW1a",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the purpose and functionality levels of DHW storage charging with direct electric heating or an integrated electric heat pump.",
  },
  {
    id: "sri2market-dhw-dhw1b-a",
    title:
      "SRI2MARKET Domestic Hot Water Service DHW1b, Catalogue A — Control of DHW Storage Charging",
    shortTitle: "SRI2MARKET DHW1b Catalogue A",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the Catalogue A version of DHW1b, including the availability of hot-water storage vessels and charging control based on external signals.",
  },
  {
    id: "sri2market-dhw-dhw1b-b",
    title:
      "SRI2MARKET Domestic Hot Water Service DHW1b, Catalogue B — Control of DHW Storage Charging Using Hot-Water Generation",
    shortTitle: "SRI2MARKET DHW1b Catalogue B",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the Catalogue B version of DHW1b, from automatic on/off control to charging control based on external signals.",
  },
  {
    id: "sri2market-dhw-dhw1d",
    title:
      "SRI2MARKET Domestic Hot Water Service DHW1d — Control of DHW Storage Charging with a Solar Collector and Supplementary Heat Generation",
    shortTitle: "SRI2MARKET DHW1d",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing solar-priority DHW storage charging, supplementary charging, demand-oriented temperature control and multi-sensor storage management.",
  },
  {
    id: "sri2market-dhw-dhw2b",
    title:
      "SRI2MARKET Domestic Hot Water Service DHW2b — Sequencing of Different DHW Generators",
    shortTitle: "SRI2MARKET DHW2b",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing operating priorities for systems with multiple different DHW generators.",
  },
  {
    id: "sri2market-dhw-dhw3",
    title:
      "SRI2MARKET Domestic Hot Water Service DHW3 — Provision of Information Regarding Domestic Hot Water Performance",
    shortTitle: "SRI2MARKET DHW3",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing DHW performance reporting, historical data, forecasting, benchmarking, predictive management and fault detection.",
  },

  // Section 6 — Ventilation

  {
    id: "sri2market-ventilation-overview",
    title: "SRI2MARKET Ventilation Domain Overview",
    shortTitle: "SRI2MARKET Ventilation Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material introducing mechanical and natural ventilation, ventilation-unit electricity use, indoor-air quality, occupant health and comfort, and the effect of ventilation rates on heating and cooling demand.",
  },
  {
    id: "sri2market-ventilation-v1a",
    title:
      "SRI2MARKET Ventilation Service V1a — Supply Air Flow Control at Room Level",
    shortTitle: "SRI2MARKET V1a",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing room-level supply-air-flow control from no ventilation system or manual control to clock, occupancy and indoor-air-quality demand control.",
  },
  {
    id: "sri2market-ventilation-v1c",
    title:
      "SRI2MARKET Ventilation Service V1c — Air Flow or Pressure Control at Air-Handler Level",
    shortTitle: "SRI2MARKET V1c",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing air-handler-level air-flow or pressure control from continuous operation to time-based, multi-stage and demand-based control with or without pressure reset.",
  },
  {
    id: "sri2market-ventilation-v2c",
    title:
      "SRI2MARKET Ventilation Service V2c — Heat Recovery Control: Prevention of Overheating",
    shortTitle: "SRI2MARKET V2c",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing heat-recovery modulation or bypass based on extract-air temperature sensors, multiple room-temperature sensors or predictive control.",
  },
  {
    id: "sri2market-ventilation-v2d",
    title:
      "SRI2MARKET Ventilation Service V2d — Supply Air Temperature Control at Air-Handling-Unit Level",
    shortTitle: "SRI2MARKET V2d",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing supply-air-temperature control using a constant setpoint, outdoor-temperature compensation and load-dependent compensation.",
  },
  {
    id: "sri2market-ventilation-v3",
    title:
      "SRI2MARKET Ventilation Service V3 — Free Cooling with Mechanical Ventilation System",
    shortTitle: "SRI2MARKET V3",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing no automatic control, night cooling, temperature-based free cooling and H,x-directed control based on temperature and humidity.",
  },
  {
    id: "sri2market-ventilation-v6",
    title:
      "SRI2MARKET Ventilation Service V6 — Provision of Information Regarding Indoor Air Quality",
    shortTitle: "SRI2MARKET V6",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing indoor-air-quality sensors, real-time monitoring, historical information and warnings concerning maintenance needs or occupant actions.",
  },

  // Section 7 — Lighting

  {
    id: "sri2market-lighting-overview",
    title: "SRI2MARKET Lighting Domain Overview",
    shortTitle: "SRI2MARKET Lighting Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material introducing the Lighting domain, the share of lighting in building energy consumption, and the role of lighting-control systems in energy efficiency and occupant comfort.",
  },
  {
    id: "sri2market-lighting-l1a",
    title:
      "SRI2MARKET Lighting Service L1a — Occupancy Control for Indoor Lighting",
    shortTitle: "SRI2MARKET L1a",
    type: "sri2market-material",
    description:
     "SRI2MARKET educational material describing the purpose, room-level scope, functionality levels and examples of occupancy control for indoor lighting.",
  },
  {
    id: "sri2market-lighting-l2",
    title:
      "SRI2MARKET Lighting Service L2 — Control of Artificial Lighting Power Based on Daylight Levels",
    shortTitle: "SRI2MARKET L2",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the purpose and functionality levels of artificial-lighting control based on daylight, from central manual control to automatic dimming with scene-based light control.",
  },

  // Section 8 — Dynamic Building Envelope

  {
    id: "sri2market-dynamic-envelope-overview",
    title: "SRI2MARKET Dynamic Building Envelope Domain Overview",
    shortTitle: "SRI2MARKET Dynamic Envelope Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material introducing the role of the building envelope, the distinction between conventional and dynamic envelopes, and the relationship of dynamic-envelope operation with lighting, HVAC energy use and occupant comfort.",
  },
  {
    id: "sri2market-dynamic-envelope-de1",
    title:
      "SRI2MARKET Dynamic Building Envelope Service DE1 — Window Solar Shading Control",
    shortTitle: "SRI2MARKET DE1",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the purpose, functionality levels and examples of window solar-shading control, from no shading or manual operation to coordinated and predictive control.",
  },
  {
    id: "sri2market-dynamic-envelope-de2",
    title:
      "SRI2MARKET Dynamic Building Envelope Service DE2 — Window Open/Closed Control, Combined with HVAC System",
    shortTitle: "SRI2MARKET DE2",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing window open/closed detection, HVAC shut-down, automated mechanical window operation based on room-sensor data, and central coordination for free natural night cooling.",
  },
  {
    id: "sri2market-dynamic-envelope-de4",
    title:
      "SRI2MARKET Dynamic Building Envelope Service DE4 — Provision of Information Regarding the Performance of Dynamic Building Envelope Systems",
    shortTitle: "SRI2MARKET DE4",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing reporting of dynamic-envelope element position, fault detection, predictive maintenance, and real-time and historical sensor data.",
  },

  // Section 9 — Electricity

  {
    id: "sri2market-electricity-overview",
    title: "SRI2MARKET Electricity Domain Overview",
    shortTitle: "SRI2MARKET Electricity Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material introducing the Electricity domain, the emissions context of fossil-fuel-based electricity generation, the integration of renewable electricity generation, energy storage and smart electricity-consumption control.",
  },
  {
    id: "sri2market-electricity-e2",
    title:
      "SRI2MARKET Electricity Service E2 — Provision of Information Regarding Local Electricity Generation",
    shortTitle: "SRI2MARKET E2",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing local electricity-generation monitoring, current and historical production data, performance evaluation, forecasting, benchmarking, predictive management and fault detection.",
  },
  {
    id: "sri2market-electricity-e3",
    title:
      "SRI2MARKET Electricity Service E3 — Storage of (Locally Generated) Electricity",
    shortTitle: "SRI2MARKET E3",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing on-site electricity and energy storage, grid-signal-based storage control, optimisation of locally generated electricity and grid feed-in capability.",
  },
  {
    id: "sri2market-electricity-e4",
    title:
      "SRI2MARKET Electricity Service E4 — Optimisation of Self-Consumption of Locally Generated Electricity",
    shortTitle: "SRI2MARKET E4",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing scheduled and automated electricity-consumption management according to current and predicted energy needs and renewable-energy availability.",
  },
  {
    id: "sri2market-electricity-e5",
    title:
      "SRI2MARKET Electricity Service E5 — Control of Combined Heat and Power Plant (CHP)",
    shortTitle: "SRI2MARKET E5",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing CHP runtime control according to schedules, thermal-energy demand, renewable-energy availability and electricity-grid signals.",
  },
  {
    id: "sri2market-electricity-e8",
    title:
      "SRI2MARKET Electricity Service E8 — Support for (Micro)grid Operation",
    shortTitle: "SRI2MARKET E8",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing grid-signal-based management of building electricity consumption, electricity supply to neighbouring buildings or the grid, and limited island-mode operation.",
  },
  {
    id: "sri2market-electricity-e11",
    title:
      "SRI2MARKET Electricity Service E11 — Provision of Information Regarding Energy Storage",
    shortTitle: "SRI2MARKET E11",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing state-of-charge reporting, current and historical storage data, forecasting, benchmarking, predictive management and fault detection.",
  },
  {
    id: "sri2market-electricity-e12",
    title:
      "SRI2MARKET Electricity Service E12 — Provision of Information Regarding Electricity Consumption",
    shortTitle: "SRI2MARKET E12",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing building- and appliance-level electricity-consumption reporting, real-time feedback, benchmarking and automated personalised recommendations.",
  },


  // Section 10 — Electric Vehicle Charging

  {
    id: "sri2market-ev-overview",
    title: "SRI2MARKET Electric Vehicle Charging Domain Overview",
    shortTitle: "SRI2MARKET EV Charging Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material covering the Electric Vehicle Charging domain, the role of electric vehicles in transport decarbonisation, and the use of vehicle batteries together with on-site renewable-electricity generation and the provision of grid-balancing services.",
  },
  {
    id: "sri2market-ev-ev15",
    title:
      "SRI2MARKET Electric Vehicle Charging Service EV15 — EV Charging Capacity",
    shortTitle: "SRI2MARKET EV15",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material covering the EV charging levels described by the Society of Automotive Engineers, charging-power ranges, charging-cable types, possible charging locations, and the EV15 functionality levels from no charging availability to recharging points for more than 50% of parking spaces.",
  },
  {
    id: "sri2market-ev-ev16",
    title:
      "SRI2MARKET Electric Vehicle Charging Service EV16 — Electricity Grid Balancing through Electric Vehicle Charging",
    shortTitle: "SRI2MARKET EV16",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material covering smart charging, communication signals, ISO 15118 and OCPP, uncontrolled charging, one-way controlled charging, two-way controlled charging and Vehicle-to-Grid operation.",
  },
  {
    id: "sri2market-ev-ev17",
    title:
      "SRI2MARKET Electric Vehicle Charging Service EV17 — EV Charging Information and Connectivity",
    shortTitle: "SRI2MARKET EV17",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material covering vehicle displays, charging indicators, telematics, 4G and 5G connectivity, charging information, ISO 15118 and OCPP, encrypted communication, automatic driver identification and authorisation, and Plug & Charge functionality.",
  },


  // Section 11 — Monitoring and Control

  {
    id: "sri2market-mc-overview",
    title: "SRI2MARKET Monitoring and Control Domain Overview",
    shortTitle: "SRI2MARKET Monitoring and Control Overview",
    type: "sri2market-material",
    description:
      "SRI2MARKET overview material introducing Monitoring and Control as one of the nine SRI technical domains and describing the use of equipment, tools and methods to monitor and control technical building systems.",
  },
  {
    id: "sri2market-mc-mc3",
    title:
      "SRI2MARKET Monitoring and Control Service MC3 — Run Time Management of HVAC Systems",
    shortTitle: "SRI2MARKET MC3",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing HVAC run time management, the sensors and control equipment used, and the functionality levels from manual settings to scheduled, load-based and predictive or grid-signal-based control.",
  },
  {
    id: "sri2market-mc-mc4",
    title:
      "SRI2MARKET Monitoring and Control Service MC4 — Detecting Faults of Technical Building Systems and Providing Support to the Diagnosis of These Faults",
    shortTitle: "SRI2MARKET MC4",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing central fault and alarm indication for technical building systems, the use of sensors and meters, data analysis and diagnostic support.",
  },
  {
    id: "sri2market-mc-mc9",
    title:
      "SRI2MARKET Monitoring and Control Service MC9 — Occupancy Detection: Connected Services",
    shortTitle: "SRI2MARKET MC9",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing occupancy sensors and the functionality levels from no detection to occupancy detection for individual functions and centralised detection connected to several technical building systems.",
  },
  {
    id: "sri2market-mc-mc13",
    title:
      "SRI2MARKET Monitoring and Control Service MC13 — Central Reporting of TBS Performance and Energy Use",
    shortTitle: "SRI2MARKET MC13",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing central or remote real-time reporting per energy carrier and the combination of technical building systems from two or all main domains in one interface.",
  },
  {
    id: "sri2market-mc-mc25",
    title:
      "SRI2MARKET Monitoring and Control Service MC25 — Smart Grid Integration",
    shortTitle: "SRI2MARKET MC25",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing the adaptation of energy demand to grid conditions and the functionality levels from no harmonisation to individual and coordinated demand-side management.",
  },
  {
    id: "sri2market-mc-mc28",
    title:
      "SRI2MARKET Monitoring and Control Service MC28 — Reporting Information Regarding Demand Side Management Performance and Operation",
    shortTitle: "SRI2MARKET MC28",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing information about DSM actions and impacts, current managed energy flows, and current, historical and predicted DSM status.",
  },
  {
    id: "sri2market-mc-mc29",
    title:
      "SRI2MARKET Monitoring and Control Service MC29 — Override of DSM Control",
    shortTitle: "SRI2MARKET MC29",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing user override and reactivation of DSM control, from no override to manual, scheduled and optimised control.",
  },
  {
    id: "sri2market-mc-mc30",
    title:
      "SRI2MARKET Monitoring and Control Service MC30 — Single Platform that Allows Automated Control & Coordination Between TBS + Optimization of Energy Flow Based on Occupancy, Weather and Grid Signals",
    shortTitle: "SRI2MARKET MC30",
    type: "sri2market-material",
    description:
      "SRI2MARKET educational material describing a single platform for manual and automated control and coordination between technical building systems and optimisation based on occupancy, weather and electricity-grid signals.",
  },

] satisfies readonly TheorySource[];
