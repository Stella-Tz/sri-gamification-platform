// client/src/features/theory/data/theorySections.ts

import type { TheorySection } from "../types/theory.types";

export const theorySections = [
  {
    id: "introduction-to-sri",
    order: 1,
    title: "Introduction to the Smart Readiness Indicator",
    shortTitle: "Introduction to SRI",
    description:
      "Learn why the Smart Readiness Indicator was introduced and what smart readiness means at a general level.",
    learningGoal:
      "By the end of this section, you will be able to explain why the SRI was introduced, what smart readiness means, which three key functionalities organise the concept, and why the SRI complements but does not replace energy performance assessment.",
    lessonIds: [
      "what-is-the-smart-readiness-indicator",
      "smart-readiness-in-buildings",
    ],
  },
  {
    id: "sri-assessment-framework",
    order: 2,
    title: "The SRI Assessment Framework",
    shortTitle: "Assessment Framework",
    description:
      "Understand how the SRI assessment framework is organised: smart-ready services, service catalogues, service relevance and applicability, functionality levels, impact criteria, technical domains, weighting factors and results.",
    learningGoal:
      "By the end of this section, you will understand how the SRI assessment framework is organised. You will be able to explain how the set of services to be assessed is determined by the selected service catalogue, technical domain status and service-specific applicability conditions; distinguish Not applicable from functionality level 0; and describe how functionality levels, impact criteria, technical domains and weighting factors are used to derive SRI scores and results.",
    lessonIds: [
      "sri-assessment-framework-overview",
      "functionality-levels",
      "impact-criteria",
      "from-assessment-to-score",
      "understanding-sri-results",
    ],
  },
  {
    id: "heating-domain",
    order: 3,
    title: "Heating",
    shortTitle: "Heating",
    description:
      "Explore the smart-ready services of the Heating domain, including heat emission, distribution, generation, thermal energy storage, electricity-grid interaction and heating-system performance reporting.",
    learningGoal:
      "By the end of this section, you will be able to explain how the SRI evaluates smart-ready heating services related to heat emission, distribution, generation, thermal energy storage, flexibility and interaction with the electricity grid, and heating-system performance reporting.",
    lessonIds: [
      "heating-overview",
      "heat-emission-and-distribution-control",
      "heat-generation-control",
      "thermal-energy-storage-and-grid-interaction",
      "heating-system-performance-reporting",
    ],
  },
  {
    id: "cooling-domain",
    order: 4,
    title: "Cooling",
    shortTitle: "Cooling",
    description:
      "Explore the smart-ready services of the Cooling domain, including cooling emission, distribution, generation, thermal energy storage, prevention of simultaneous heating and cooling, electricity-grid interaction and cooling-system performance reporting.",
    learningGoal:
      "By the end of this section, you will be able to explain how the SRI evaluates smart-ready cooling services related to cooling emission, distribution, generation, thermal energy storage, prevention of simultaneous heating and cooling, flexibility and interaction with the electricity grid, and cooling-system performance reporting.",
    lessonIds: [
      "cooling-overview",
      "cooling-emission-and-distribution-control",
      "cooling-generation-control",
      "cooling-storage-and-grid-interaction",
      "cooling-system-performance-reporting",
    ],
  },
  {
    id: "domestic-hot-water-domain",
    order: 5,
    title: "Domestic Hot Water",
    shortTitle: "Domestic Hot Water",
    description:
      "Explore the smart-ready services of the Domestic Hot Water domain, including storage-charging control for different system configurations, sequencing of multiple DHW generators and reporting of DHW-system performance.",
    learningGoal:
      "By the end of this section, you will be able to explain how the SRI evaluates domestic hot water storage charging for electric, non-electric and solar-assisted systems, how different DHW generators are sequenced when several generators are present, and how DHW performance information progresses from current indicators to forecasting, benchmarking, predictive management and fault detection.",
    lessonIds: [
      "domestic-hot-water-overview",
      "dhw-storage-charging-control",
      "dhw-generator-sequencing",
      "domestic-hot-water-performance-information",
    ],
  },
  {
    id: "ventilation-domain",
    order: 6,
    title: "Ventilation",
    shortTitle: "Ventilation",
    description:
      "Explore the smart-ready services of the Ventilation domain, including supply-air-flow control at room level, air-flow or pressure control at air-handling-unit level, heat-recovery overheating prevention, supply-air-temperature control, free cooling and indoor-air-quality reporting.",
    learningGoal:
      "By the end of this section, you will be able to explain how the SRI evaluates supply-air-flow control at room level, air-flow or pressure control at air-handling-unit level, heat-recovery control for the prevention of overheating, supply-air-temperature control at air-handling-unit level, free cooling with mechanical ventilation, and the reporting of indoor-air-quality information.",
    lessonIds: [
      "ventilation-overview",
      "ventilation-air-flow-control",
      "ventilation-air-temperature-control",
      "free-cooling-with-mechanical-ventilation",
      "ventilation-indoor-air-quality-information",
    ],
  },
  {
    id: "lighting-domain",
    order: 7,
    title: "Lighting",
    shortTitle: "Lighting",
    description:
      "Explore the smart-ready services of the Lighting domain, including occupancy control for indoor lighting and control of artificial-lighting power based on daylight levels.",
    learningGoal:
      "By the end of this section, you will be able to explain how the SRI evaluates room-level occupancy control for indoor lighting and control of artificial-lighting power based on daylight levels, and distinguish the functionality levels from manual control to automatic detection, switching, dimming and scene-based light control.",
    lessonIds: [
      "lighting-overview",
      "occupancy-control-for-indoor-lighting",
      "daylight-based-lighting-control",
    ],
  },
  {
    id: "dynamic-building-envelope-domain",
    order: 8,
    title: "Dynamic Building Envelope",
    shortTitle: "Dynamic Envelope",
    description:
      "Explore the smart-ready services of the Dynamic Building Envelope domain, including window solar-shading control, window open/closed control combined with HVAC, and reporting information regarding the performance of dynamic building-envelope systems.",
    learningGoal:
      "By the end of this section, you will be able to explain how the SRI evaluates window solar-shading control from manual to predictive operation, how window opening and closing can be coordinated with HVAC systems and natural night cooling, and how dynamic building-envelope systems report element position, faults, predictive-maintenance information and sensor data.",
    lessonIds: [
      "dynamic-building-envelope-overview",
      "window-solar-shading-control",
      "window-open-closed-control-and-hvac",
      "dynamic-envelope-performance-reporting",
    ],
  },
  {
    id: "electricity-domain",
    order: 9,
    title: "Electricity",
    shortTitle: "Electricity",
    description:
      "Explore the smart-ready services of the Electricity domain, including local electricity-generation reporting, energy storage, optimisation of self-consumption, CHP control, microgrid operation, and reporting of energy-storage and electricity-consumption information.",
    learningGoal:
      "By the end of this section, you will be able to explain how the SRI evaluates information about local electricity generation, the storage and on-site use of locally generated electricity, the control of combined heat and power plants, support for microgrid operation, and the reporting of energy-storage and electricity-consumption information.",
    lessonIds: [
      "electricity-overview",
      "local-electricity-generation-reporting",
      "electricity-storage-and-self-consumption",
      "chp-control-and-microgrid-operation",
      "electricity-storage-and-consumption-reporting",
    ],
  },
  {
    id: "electric-vehicle-charging-domain",
    order: 10,
    title: "Electric Vehicle Charging",
    shortTitle: "EV Charging",
    description:
      "Explore the three smart-ready services of the Electric Vehicle Charging domain: EV charging capacity, grid balancing through controlled charging, and EV charging information and connectivity.",
    learningGoal:
      "By the end of this section, you will be able to describe the functionality levels of EV15, EV16 and EV17; distinguish technical EV charging levels from SRI functionality levels; explain uncontrolled, one-way controlled and two-way controlled charging; and identify the conditions under which each service is applicable.",
    lessonIds: [
      "electric-vehicle-charging-overview",
      "ev-charging-capacity",
      "ev-charging-grid-balancing",
      "ev-charging-information-and-connectivity",
    ],
  },
  {
    id: "monitoring-and-control-domain",
    order: 11,
    title: "Monitoring and Control",
    shortTitle: "Monitoring and Control",
    description:
      "Explore the eight smart-ready services of the Monitoring and Control domain: HVAC run time management, fault detection and diagnostic support, occupancy detection, central reporting, smart-grid integration, DSM reporting, DSM override, and automated control and coordination between TBS through a single platform.",
    learningGoal:
      "By the end of this section, you will be able to describe the functionality levels of MC3, MC4, MC9, MC13, MC25, MC28, MC29 and MC30; identify the catalogue or catalogues in which each service is included; and explain the purpose and technical context of each service.",
    lessonIds: [
      "monitoring-and-control-overview",
      "occupancy-detection-and-central-reporting",
      "hvac-runtime-management-and-system-coordination",
      "fault-detection-and-diagnostic-support",
      "demand-side-management-and-smart-grid-interaction",
    ],
  },
] satisfies readonly TheorySection[];
