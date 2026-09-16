import type { TheoryServiceBlock } from "../../../types/theory.types";

/**
 * Source policy for the Dynamic Building Envelope domain:
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Dynamic Building Envelope material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership and assessment conditions. These are
 *   cross-checked against the Final Report and SRI2MARKET where the supporting
 *   material clarifies their technical meaning.
 *
 * - Service purposes, detailed functionality-level explanations, technical
 *   examples and service images are based primarily on the corresponding
 *   SRI2MARKET Dynamic Building Envelope material and are cross-checked
 *   against the consolidated catalogue definitions.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - The applicability field is used only when the Calculation Sheet states a
 *   technical condition under which the service is applicable.
 */

import de1Level0Image from "../../../../../assets/theory/section-8/services/de1/level-0.png";
import de1Level1Image from "../../../../../assets/theory/section-8/services/de1/level-1.png";
import de1Level2Image from "../../../../../assets/theory/section-8/services/de1/level-2.png";
import de1Level3Image from "../../../../../assets/theory/section-8/services/de1/level-3.png";
import de1Level4Image from "../../../../../assets/theory/section-8/services/de1/level-4.png";

import de2Level0Image from "../../../../../assets/theory/section-8/services/de2/level-0.png";
import de2Level1Image from "../../../../../assets/theory/section-8/services/de2/level-1.png";
import de2Level2Image from "../../../../../assets/theory/section-8/services/de2/level-2.png";
import de2Level3Image from "../../../../../assets/theory/section-8/services/de2/level-3.png";

import de4Level0Image from "../../../../../assets/theory/section-8/services/de4/level-0.png";
import de4Level1Image from "../../../../../assets/theory/section-8/services/de4/level-1.png";
import de4Level2Image from "../../../../../assets/theory/section-8/services/de4/level-2.png";
import de4Level3Image from "../../../../../assets/theory/section-8/services/de4/level-3.png";
import de4Level4Image from "../../../../../assets/theory/section-8/services/de4/level-4.png";

/**
 * DE1 — Window Solar Shading Control
 *
 * Included in Catalogues A and B.
 * Applicable only when movable shades, screens or blinds are present.
 */
export const de1ServiceBlock = {
  id: "dynamic-envelope-service-de1",
  type: "service",
  serviceCode: "DE-1",
  title: "Window Solar Shading Control",
  catalogue: "catalogues-a-and-b",
  applicability:
    "Applicable only when movable shades, screens or blinds are present.",
  purpose:
    "The purpose of this service is to assess how solar-shading devices on the glazed surfaces of the building are controlled. Solar shading controls the amount of solar heat and daylight entering the building and can therefore affect energy performance and occupant comfort.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dynamic-envelope-de1",
  ],
  info:
    "Image source: SRI2MARKET, Dynamic Building Envelope service DE1.",
  levels: [
    {
      id: "dynamic-envelope-de1-level-0",
      level: 0,
      title: "No sun shading or only manual operation",
      description:
        "The glazed surfaces either have no shading devices, or the shading devices can be operated only manually.",
      image: {
        id: "dynamic-envelope-de1-level-0-image",
        src: de1Level0Image,
        alt:
          "Window shading operated manually using a chain, belt or manual awning mechanism.",
      },
      examples: [
        "Manual arms for awnings.",
        "A roller-shutter belt.",
        "A blind bottom chain.",
      ],
    },
    {
      id: "dynamic-envelope-de1-level-1",
      level: 1,
      title: "Motorized operation with manual control",
      description:
        "Shading elements, such as awnings, blinds or shutters, are equipped with a motor for opening and closing. The motor is operated through a manual switch.",
      image: {
        id: "dynamic-envelope-de1-level-1-image",
        src: de1Level1Image,
        alt:
          "Motorised window shading operated manually through a wall switch.",
      },
    },
    {
      id: "dynamic-envelope-de1-level-2",
      level: 2,
      title:
        "Motorized operation with automatic control based on sensor data",
      description:
        "Shading elements are motorised and their opening or closing is controlled automatically using data received from sensors.",
      image: {
        id: "dynamic-envelope-de1-level-2-image",
        src: de1Level2Image,
        alt:
          "Motorised solar shading controlled automatically using solar-radiation or wind-sensor data.",
      },
      examples: [
        "An awning opens when the solar radiation measured by a sensor exceeds a defined threshold.",
        "An awning retracts when a wind sensor detects excessive wind.",
      ],
    },
    {
      id: "dynamic-envelope-de1-level-3",
      level: 3,
      title: "Combined light/blind/HVAC control",
      description:
        "Motorised solar-shading devices are controlled automatically in coordination with the lighting and HVAC systems of the space. This coordinated control can improve thermal and visual comfort and reduce energy consumption for heating, cooling and lighting.",
      image: {
        id: "dynamic-envelope-de1-level-3-image",
        src: de1Level3Image,
        alt:
          "Coordinated control of solar shading, artificial lighting and HVAC systems.",
      },
      examples: [
        "When heating or lighting is required, the control favours the entry of daylight and solar radiation into the room.",
        "When cooling is required, the control prevents overheating by blocking direct solar radiation.",
        "On clear days, venetian blinds can diffuse daylight into the room and reduce the demand for artificial lighting.",
      ],
    },
    {
      id: "dynamic-envelope-de1-level-4",
      level: 4,
      title: "Predictive blind control (e.g. based on weather forecast)",
      description:
        "The system integrates the simultaneous control of HVAC, electric lighting and the position of solar-shading devices in a room with predictive control that uses weather forecasts. The predictive model accounts for uncertainty by using weather forecasts so that indoor temperature, CO₂ and illuminance remain within defined comfort limits.",
      image: {
        id: "dynamic-envelope-de1-level-4-image",
        src: de1Level4Image,
        alt:
          "Predictive control coordinating shading, lighting and HVAC using weather-forecast data.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * DE2 — Window Open/Closed Control, Combined with HVAC System
 *
 * Included in Catalogue B.
 * The calculation sheet does not state an additional technical applicability
 * condition for this service, so no applicability field is shown.
 */
export const de2ServiceBlock = {
  id: "dynamic-envelope-service-de2",
  type: "service",
  serviceCode: "DE-2",
  title: "Window Open/Closed Control, Combined with HVAC System",
  catalogue: "catalogue-b",
  purpose:
    "The purpose of this service is to assess the availability of a system that controls the opening and closing of windows in combination with the building's HVAC systems.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dynamic-envelope-de2",
  ],
  info:
    "Image source: SRI2MARKET, Dynamic Building Envelope service DE2.",
  levels: [
    {
      id: "dynamic-envelope-de2-level-0",
      level: 0,
      title: "Manual operation or only fixed windows",
      description:
        "Windows can be opened or closed only manually by building users, or the windows are fixed and cannot be opened.",
      image: {
        id: "dynamic-envelope-de2-level-0-image",
        src: de2Level0Image,
        alt: "A window opened manually by a building user.",
      },
    },
    {
      id: "dynamic-envelope-de2-level-1",
      level: 1,
      title:
        "Open/closed detection to shut down heating or cooling systems",
      description:
        "Windows and/or external doors have opening sensors or magnetic contacts that communicate with the room HVAC control system. When the system detects that they are open, it shuts down the HVAC system to save energy.",
      image: {
        id: "dynamic-envelope-de2-level-1-image",
        src: de2Level1Image,
        alt:
          "An opening sensor on a window communicating with the room HVAC control system.",
      },
    },
    {
      id: "dynamic-envelope-de2-level-2",
      level: 2,
      title:
        "Level 1 + automated mechanical window opening based on room-sensor data",
      description:
        "In addition to the Level 1 function, a system automatically opens and closes the windows using a sensor installed in the room. The sensor can measure variables such as CO₂, humidity and temperature, and the system can also monitor external weather data through online services. These data are used to automate window opening or closing and to activate or deactivate HVAC operation according to the Level 1 logic.",
      image: {
        id: "dynamic-envelope-de2-level-2-image",
        src: de2Level2Image,
        alt:
          "Automated windows controlled using room-sensor and external-weather data and coordinated with HVAC operation.",
      },
    },
    {
      id: "dynamic-envelope-de2-level-3",
      level: 3,
      title:
        "Level 2 + centralized coordination of operable windows, e.g. to control free natural night cooling",
      description:
        "In addition to the Level 2 functions, operable windows are coordinated centrally. For free natural night cooling, window sensors are combined with indoor- and outdoor-temperature sensors so that the windows can be opened or closed automatically according to time and the temperature difference between the inside and outside of the building. When a window opens, the HVAC system is shut down and the room can be cooled by outdoor air instead of air conditioning.",
      image: {
        id: "dynamic-envelope-de2-level-3-image",
        src: de2Level3Image,
        alt:
          "Central control coordinating operable windows for free natural night cooling.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * DE4 — Reporting Information Regarding Performance of Dynamic Building
 * Envelope Systems
 *
 * Included in Catalogues A and B.
 * Applicable only when movable shades, screens or blinds are present.
 */
export const de4ServiceBlock = {
  id: "dynamic-envelope-service-de4",
  type: "service",
  serviceCode: "DE-4",
  title:
    "Reporting Information Regarding Performance of Dynamic Building Envelope Systems",
  catalogue: "catalogues-a-and-b",
  applicability:
    "Applicable only when movable shades, screens or blinds are present.",
  purpose:
    "The purpose of this service is to provide information regarding the performance of dynamic building-envelope systems.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-dynamic-envelope-de4",
  ],
  info:
    "Image source: SRI2MARKET, Dynamic Building Envelope service DE4.",
  levels: [
    {
      id: "dynamic-envelope-de4-level-0",
      level: 0,
      title: "No reporting",
      description:
        "No information is provided about the position or operation of dynamic building-envelope elements.",
      image: {
        id: "dynamic-envelope-de4-level-0-image",
        src: de4Level0Image,
        alt:
          "Dynamic building-envelope elements without status or performance reporting.",
      },
      examples: [
        "No information is provided about whether windows are open or closed.",
        "No information is provided about whether shutters are raised or lowered.",
        "No information is provided about whether awnings are deployed or retracted.",
      ],
    },
    {
      id: "dynamic-envelope-de4-level-1",
      level: 1,
      title: "Position of each product & fault detection",
      description:
        "The building has a system that reports the position of dynamic envelope elements, such as windows, shutters and awnings, and reports faults in these components.",
      image: {
        id: "dynamic-envelope-de4-level-1-image",
        src: de4Level1Image,
        alt:
          "A reporting system showing the position of dynamic envelope elements and detected faults.",
      },
      examples: [
        "A window is reported as open or closed.",
        "A shutter is reported as raised or lowered.",
        "An awning is reported as deployed or retracted.",
      ],
    },
    {
      id: "dynamic-envelope-de4-level-2",
      level: 2,
      title:
        "Position of each product, fault detection & predictive maintenance",
      description:
        "The system reports the position of dynamic envelope elements and detects faults in their operation. It also provides predictive maintenance by using analytical algorithms and sensor data to check device condition, predict possible failures or defects, and estimate the time remaining before equipment failure.",
      image: {
        id: "dynamic-envelope-de4-level-2-image",
        src: de4Level2Image,
        alt:
          "A reporting system combining envelope-element position, fault detection and predictive maintenance.",
      },
    },
    {
      id: "dynamic-envelope-de4-level-3",
      level: 3,
      title:
        "Position of each product, fault detection, predictive maintenance, real-time sensor data (wind, lux, temperature…)",
      description:
        "The reporting system includes the Level 2 functions and also provides real-time sensor data, such as wind, illuminance or temperature, in relation to the dynamic behaviour of the envelope.",
      image: {
        id: "dynamic-envelope-de4-level-3-image",
        src: de4Level3Image,
        alt:
          "A reporting system combining dynamic-envelope status, fault information, predictive maintenance and real-time sensor data.",
      },
    },
    {
      id: "dynamic-envelope-de4-level-4",
      level: 4,
      title:
        "Position of each product, fault detection, predictive maintenance, real-time & historical sensor data (wind, lux, temperature…)",
      description:
        "The reporting system includes position reporting, fault detection and predictive maintenance, and also provides real-time and historical sensor data, such as wind, illuminance or temperature, in relation to the dynamic behaviour of the envelope.",
      image: {
        id: "dynamic-envelope-de4-level-4-image",
        src: de4Level4Image,
        alt:
          "A reporting system combining dynamic-envelope status with real-time and historical sensor data.",
      },
    },
  ],
} satisfies TheoryServiceBlock;