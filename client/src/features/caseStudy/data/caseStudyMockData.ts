// client/src/features/caseStudy/data/caseStudyMockData.ts

import type {
  CaseStudyDetails,
  CaseStudyOverviewItem,
} from "../types/caseStudy.types";


const generalBuildingInformationBullets = [
  "Located in Athens, Greece, this large contemporary office building extends across a total useful floor area of 12,450 m².",
  "Its open-plan workspaces, meeting rooms and shared support areas accommodate a varied daily routine, from focused individual work to meetings and collaborative activities.",
  "The building was completed in 2015 and underwent significant energy-related upgrades in 2018, including upgrades to its technical building systems. The case study examines its current configuration and the technical systems that support comfort, indoor environmental quality and everyday operation.",
];

const methodologyContextBullets = [
  "The assessment uses the complete detailed catalogue of smart-ready services rather than the reduced service list used for a simplified assessment.",
  "For this simulated assessment, the applicable implementation context does not designate any absent technical domain as mandatory.",
];

const buildingSystemsAndTechnologiesBullets = [
  "Space heating is provided throughout the assessed building by a central hydronic system with heat emitters other than Thermally Activated Building Systems (TABS), a distribution network and distribution pumps.",
  "Mechanical cooling is provided throughout the assessed building through cooling emitters other than Thermally Activated Building Systems (TABS), connected to a central hydronic chilled-water distribution network.",
  "Domestic hot water is produced by two different central non-electric heat generators, stored in a common DHW storage tank and distributed throughout the building.",
  "Mechanical ventilation with heat recovery serves the entire assessed net surface floor area.",
  "Artificial lighting is installed throughout the occupied spaces, including open-plan offices, meeting rooms and support areas.",
  "Rooftop photovoltaic panels provide local electricity generation, and a small on-site battery stores part of the locally generated electricity.",
  "The building includes controllable non-critical electrical loads.",
  "A central BMS is connected to selected technical building systems.",
  "The façade has non-operable windows and fixed external shading; no movable shades, screens or blinds and no other controllable dynamic-envelope elements are installed.",
  "No on-site parking is available at the building, and no on-site electric-vehicle charging infrastructure is installed.",
];

export const caseStudyMockData: CaseStudyDetails[] = [
  {
    id: "case-study-1",
    order: 1,
    title: "Office Building — Athens, Greece",
    description:
      "Baseline SRI assessment for a renovated office building in the Southern Europe climate zone.",
    mode: "baseline",

    scenario: {
      generalBuildingInformation: {
        title: "General Building Information",
        bullets:
          generalBuildingInformationBullets,
      },

      methodologyContext: {
        title: "Methodology Context",
        bullets:
          methodologyContextBullets,
      },

      buildingSystemsAndTechnologies: {
        title:
          "Building Systems and Technologies",
        bullets:
          buildingSystemsAndTechnologiesBullets,
      },
    },

    buildingInformation: {
      buildingType: "non-residential",
      buildingUsage: "office",
      locationLabel: "Athens, Greece",
      country: "Greece",
      climateZone: "southern-europe",
      floorArea: 12450,
      constructionYear: "2015",
      buildingState: "renovated",
      renovationYear: "2018",
    },

    expectedSetupAnswers: {
      buildingType: "non-residential",
      buildingUsage: "office",
      country: "Greece",
      constructionYear: "2015",
      buildingState: "renovated",
      renovationYear: "2018",
      floorArea: 12450,
      assessmentMethod: "B",
      domainPresence: {
        Heating: "present",
        Cooling: "present",
        "Domestic hot water": "present",
        Ventilation: "present",
        Lighting: "present",
        "Dynamic building envelope": "absent-not-mandatory",
        Electricity: "present",
        "Electric vehicle charging": "absent-not-mandatory",
        "Monitoring and control": "present",
      },
    },

    selectedServices: [
      {
        serviceId: "h-1a",
        scenarioEvidence: [
          "The building's heat emitters are controlled automatically by one central controller using a common reference temperature for groups of rooms, without considering the local heating demand of individual rooms.",
          "This central automatic heat-emission control applies to 100% of the assessed net surface floor area served by the heating system.",
          "Thermostatic valves on the heating emitters and room-level electronic heating controllers are not installed; therefore there is no room-level heating-control communication with the BACS and no occupancy-based heating-emission control.",
        ],
        expectedAnswer: {
          selectedLevelId: "h-1a-level-1",
          share: 100,
        },
      },

      {
        serviceId: "h-1c",
        scenarioEvidence: [
          "The hydronic heating distribution network uses an electronic controller that automatically resets the supply-water temperature according to the measured outdoor air temperature.",
          "This control strategy applies to 100% of the assessed net surface floor area served by the heating system.",
          "The distribution-water temperature is not reset based on indoor-temperature measurements.",
        ],
        expectedAnswer: {
          selectedLevelId: "h-1c-level-1",
          share: 100,
        },
      },

      {
        serviceId: "h-1d",
        scenarioEvidence: [
          "All heating distribution pumps switch automatically and use variable-speed operation.",
          "While operating, each pump varies its speed based on a fixed or variable differential-pressure setpoint using internal estimations within the pump unit.",
          "This pump-control configuration applies to the heating distribution network serving 100% of the assessed net surface floor area.",
          "The pumps are not limited to fixed-speed on/off or fixed multi-stage operation, and they do not follow any external demand signal.",
        ],
        expectedAnswer: {
          selectedLevelId: "h-1d-level-3",
          share: 100,
        },
      },

      {
        serviceId: "h-3",
        scenarioEvidence: [
          "The BMS shows the heating system's current operating temperatures and submetered energy use.",
          "Earlier heating readings and energy-use records are also stored and can be reviewed through the BMS.",
          "This reporting functionality covers the heating system serving 100% of the assessed net surface floor area.",
          "The heating-performance reporting function does not include forecasting, benchmarking, predictive management or fault-detection analysis based on heating-performance data.",
        ],
        expectedAnswer: {
          selectedLevelId: "h-3-level-2",
          share: 100,
        },
      },

      {
        serviceId: "h-4",
        scenarioEvidence: [
          "The heating system operates automatically according to fixed, predefined daily and weekly schedules.",
          "This scheduled operating strategy applies to the heating system serving 100% of the assessed net surface floor area.",
          "The schedule does not self-learn or optimise itself from observed building operation.",
          "Heating operation is not modified in response to electricity-grid or DSM signals, and no optimised control based on local predictions and grid signals is used.",
        ],
        expectedAnswer: {
          selectedLevelId: "h-4-level-1",
          share: 100,
        },
      },

      {
        serviceId: "c-1a",
        scenarioEvidence: [
          "Meeting rooms covering 30% of the building's net surface floor area have individual electronic room controllers that automatically regulate cooling emission in each room.",
          "These room controllers communicate with one another and with the BACS.",
          "Occupancy detection is not used to modify cooling emission in the meeting rooms.",
          "The remaining 70% of the building's net surface floor area has its cooling emission regulated centrally using a common reference temperature for groups of rooms, without considering the local cooling demand of individual rooms.",
          "The remaining areas do not have individual room cooling controllers, controller-to-BACS communication or occupancy-based cooling-emission control.",
        ],
        expectedAnswer: {
          selectedLevelId: "c-1a-level-3",
          share: 30,
          additionalLevelId: "c-1a-level-1",
        },
      },

      {
        serviceId: "c-1c",
        scenarioEvidence: [
          "The chilled-water distribution network has automatic control of the supply-water temperature.",
          "The chilled-water temperature setpoint is adjusted according to cooling demand using indoor-temperature measurements from the served zones.",
          "This control strategy applies to 100% of the assessed net surface floor area served by the cooling system.",
          "The chilled-water setpoint is neither kept constant nor determined only from the outdoor air temperature.",
        ],
        expectedAnswer: {
          selectedLevelId: "c-1c-level-2",
          share: 100,
        },
      },

      {
        serviceId: "c-1f",
        scenarioEvidence: [
          "The heating and cooling systems are coordinated using sliding setpoints, which minimises the risk of simultaneous heating and cooling in the same room.",
          "This coordination strategy applies to 100% of the net surface floor area served by both heating and cooling.",
          "The heating and cooling systems are therefore not controlled completely independently.",
          "The control system does not enforce a total interlock; simultaneous heating and cooling is not made impossible under every operating condition.",
        ],
        expectedAnswer: {
          selectedLevelId: "c-1f-level-1",
          share: 100,
        },
      },

      {
        serviceId: "c-3",
        scenarioEvidence: [
          "The BMS shows the cooling system's current operating temperatures and submetered energy use.",
          "This reporting functionality covers the cooling system serving 100% of the assessed net surface floor area.",
          "Earlier cooling readings and energy-use records are not retained by this reporting function.",
          "The cooling-performance reporting function does not include forecasting, benchmarking, predictive management or fault-detection analysis based on cooling-performance data.",
        ],
        expectedAnswer: {
          selectedLevelId: "c-3-level-1",
          share: 100,
        },
      },

      {
        serviceId: "dhw-1b",
        scenarioEvidence: [
          "Charging of the central DHW storage tank is switched on and off automatically according to the stored-water temperature.",
          "Charging is enabled during predefined time periods and prevented outside those periods.",
          "In addition, the supply-water temperature setpoint is adjusted according to current DHW demand.",
          "This is the only DHW storage-charging configuration implemented in the assessed building; no alternative charging functionality is used elsewhere.",
          "No external network signal, such as a district-heating signal, is used to control DHW storage charging.",
        ],
        expectedAnswer: {
          selectedLevelId: "dhw-1b-level-2",
          share: 100,
        },
      },

      {
        serviceId: "dhw-2b",
        scenarioEvidence: [
          "The central DHW plant has two different non-electric heat generators connected to the common DHW storage system.",
          "The order in which the two DHW generators are enabled is predefined and remains unchanged, and is based on their rated energy efficiency.",
          "This is the only DHW generator-sequencing configuration implemented in the assessed building; no alternative sequencing functionality is used elsewhere.",
          "The priority order is not determined only by balancing generator running hours.",
          "This order does not change according to current or predicted load, current energy efficiency, carbon emissions, available generator capacity or external grid signals.",
        ],
        expectedAnswer: {
          selectedLevelId: "dhw-2b-level-1",
          share: 100,
        },
      },

      {
        serviceId: "dhw-3",
        scenarioEvidence: [
          "The BMS displays current DHW performance values, including storage and supply temperatures and submetered DHW energy use.",
          "This is the only DHW performance-reporting configuration implemented in the assessed building; no alternative reporting functionality is used elsewhere.",
          "Historical DHW performance data is not stored or available through the reporting function.",
          "The system does not provide forecasting, benchmarking, predictive management or DHW-system fault detection.",
        ],
        expectedAnswer: {
          selectedLevelId: "dhw-3-level-1",
          share: 100,
        },
      },

      {
        serviceId: "v-1a",
        scenarioEvidence: [
          "Supply airflow is controlled automatically at room level in every mechanically ventilated occupied space.",
          "Occupancy detectors determine whether each served room is occupied, and the supply airflow is adjusted accordingly.",
          "This occupancy-based airflow-control strategy applies to 100% of the net surface floor area served by mechanical ventilation.",
          "Supply airflow is not controlled only by a clock schedule.",
          "Indoor-air-quality sensors are not used for central or local demand control, and no local airflow regulation based on CO₂, VOC or humidity measurements is implemented.",
        ],
        expectedAnswer: {
          selectedLevelId: "v-1a-level-2",
          share: 100,
        },
      },

      {
        serviceId: "v-2c",
        scenarioEvidence: [
          "The mechanical ventilation system includes heat recovery with automatic overheating prevention.",
          "Heat recovery is modulated or bypassed according to a temperature sensor in the extract-air stream.",
          "This heat-recovery control strategy applies to 100% of the net surface floor area served by the relevant ventilation system.",
          "The control does not use temperature measurements from multiple rooms and does not use predictive control.",
        ],
        expectedAnswer: {
          selectedLevelId: "v-2c-level-1",
          share: 100,
        },
      },

      {
        serviceId: "v-3",
        scenarioEvidence: [
          "During unoccupied periods, the mechanical ventilation system automatically increases the outdoor-air flow to its maximum value.",
          "This operation is enabled only when the room temperature is above the comfort-period setpoint and the difference between room and outdoor temperature exceeds a predefined threshold.",
          "This strategy applies to 100% of the net surface floor area served by the relevant ventilation system.",
          "Outdoor-air and recirculation-air flows are not modulated during all operating periods to minimise mechanical cooling.",
          "Humidity or enthalpy is not used to determine the free-cooling airflow rates.",
        ],
        expectedAnswer: {
          selectedLevelId: "v-3-level-1",
          share: 100,
        },
      },

      {
        serviceId: "v-6",
        scenarioEvidence: [
          "Indoor-air-quality readings, including CO₂, are collected automatically throughout the occupied areas and shown as live values.",
          "Occupants can view the latest readings and review values recorded during earlier periods.",
          "This IAQ reporting functionality applies to 100% of the assessed net surface floor area served by mechanical ventilation.",
          "The system does not issue warnings about maintenance needs or actions that occupants should take in response to the indoor-air-quality readings.",
        ],
        expectedAnswer: {
          selectedLevelId: "v-6-level-2",
          share: 100,
        },
      },

      {
        serviceId: "l-1a",
        scenarioEvidence: [
          "Occupancy detection controls the indoor lighting in all assessed occupied spaces.",
          "All luminaires in each occupied space switch on automatically when occupancy is detected.",
          "After a space becomes unoccupied, the lights are automatically dimmed and then switched off.",
          "This occupancy-control configuration applies to 100% of the building's assessed net surface floor area.",
          "Neither manual switch-on nor partial automatic switch-on is used for this occupancy-control configuration.",
        ],
        expectedAnswer: {
          selectedLevelId: "l-1a-level-2",
          share: 100,
        },
      },

      {
        serviceId: "l-2",
        scenarioEvidence: [
          "In open-plan office areas covering 60% of the building's net surface floor area, the luminaires progressively reduce their light output as daylight increases and can switch off completely when daylight is sufficient; as daylight falls, they switch on again and increase their output.",
          "Scene-based lighting control is not available in these open-plan office areas.",
          "The remaining 40% of the building's net surface floor area has no automatic daylight-based lighting control; in these areas, daylight-related lighting adjustments can only be made manually from a single central control.",
          "No separate manual daylight-control function is available per room or zone in the remaining areas.",
          "Daylight levels do not trigger automatic switching or automatic dimming in these areas.",
        ],
        expectedAnswer: {
          selectedLevelId: "l-2-level-3",
          share: 60,
          additionalLevelId: "l-2-level-0",
        },
      },

      {
        serviceId: "e-2",
        scenarioEvidence: [
          "Rooftop photovoltaic panels generate electricity locally at the building.",
          "The monitoring platform displays the current photovoltaic electricity generation.",
          "This is the only local-generation reporting configuration implemented in the assessed building; no alternative reporting functionality is used elsewhere.",
          "Historical generation data is not stored or displayed, and the platform does not provide forecasting, benchmarking, predictive management or fault detection for local generation.",
        ],
        expectedAnswer: {
          selectedLevelId: "e-2-level-1",
          share: 100,
        },
      },

      {
        serviceId: "e-3",
        scenarioEvidence: [
          "When rooftop photovoltaic generation exceeds the building's current electricity demand, the surplus electricity charges the small on-site battery for later use within the building.",
          "This is the only storage-control configuration implemented in the assessed building; no alternative storage functionality is used elsewhere.",
          "The battery controller does not respond to electricity-grid signals.",
          "The battery controller does not optimise battery charging or discharging to increase the use of locally generated electricity, and stored electricity cannot be fed back into the grid.",
        ],
        expectedAnswer: {
          selectedLevelId: "e-3-level-1",
          share: 100,
        },
      },

      {
        serviceId: "e-4",
        scenarioEvidence: [
          "The building has controllable non-critical plug-load circuits serving shared office printers and selected kitchenette appliances.",
          "The operation of these loads is automatically activated or shifted according to the current output of the photovoltaic system rather than only through a fixed time schedule.",
          "This is the only self-consumption control configuration implemented in the assessed building; no alternative functionality is used elsewhere.",
          "The control logic does not use predicted building energy needs or predicted renewable-energy availability.",
        ],
        expectedAnswer: {
          selectedLevelId: "e-4-level-2",
          share: 100,
        },
      },

      {
        serviceId: "mc-3",
        scenarioEvidence: [
          "The heating and cooling plants are switched on and off according to fixed, predefined operating schedules.",
          "This runtime-management strategy applies to the HVAC plants serving 100% of the assessed net surface floor area.",
          "Plant operation is not adjusted automatically according to the actual heating or cooling loads of the building.",
          "Predictive control and electricity-grid signals are not used to determine HVAC plant start and stop times.",
        ],
        expectedAnswer: {
          selectedLevelId: "mc-3-level-1",
          share: 100,
        },
      },

      {
        serviceId: "mc-4",
        scenarioEvidence: [
          "The central monitoring platform receives and centrally displays detected fault and alarm signals from the heating and cooling systems.",
          "Fault and alarm information from the ventilation, DHW and lighting systems is not shown on this central display.",
          "This is the only central fault-and-alarm configuration implemented in the assessed building; no alternative configuration is used elsewhere.",
          "The platform displays the reported faults and alarms but does not identify their probable causes or sources.",
        ],
        expectedAnswer: {
          selectedLevelId: "mc-4-level-1",
          share: 100,
        },
      },

      {
        serviceId: "mc-13",
        scenarioEvidence: [
          "The BMS shows live energy-use readings, with each energy carrier used by the building displayed separately.",
          "A single BMS view brings together the live energy information for the heating, cooling and electricity systems.",
          "This is the building's only interface that combines energy-use information from multiple technical domains.",
          "The same interface does not combine all main technical domains; ventilation, DHW and lighting are not included.",
        ],
        expectedAnswer: {
          selectedLevelId: "mc-13-level-2",
          share: 100,
        },
      },
    ],
  },
];

export const caseStudyOverviewMockData: CaseStudyOverviewItem[] =
  caseStudyMockData.map((caseStudy) => ({
    id: caseStudy.id,
    order: caseStudy.order,
    title: caseStudy.title,
    description: caseStudy.description,
    status: caseStudy.order === 1 ? "available" : "locked",
  }));
