// client/src/features/caseStudy/data/sriServiceCatalogue.generated.ts

import type { SriService } from "../types/caseStudy.types";

// Static base SRI service catalogue exported from the v4.5 workbook.
// Service definitions and impact vectors correspond to Method B where
// the workbook exposes method-dependent A/B data.
// Method A differences are applied by the catalogue resolver.

export const sriServiceCatalogue: SriService[] = [
  {
    "id": "h-1a",
    "code": "H-1a",
    "domain": "Heating",
    "serviceGroup": "Heat control - demand side",
    "smartReadyService": "Heat emission control",
    "shortTitle": "Heat emission control",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "h-1a-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "h-1a-level-1",
        "level": 1,
        "officialDescription": "Central automatic control (e.g. central thermostat)"
      },
      {
        "id": "h-1a-level-2",
        "level": 2,
        "officialDescription": "Individual room control (e.g. thermostatic valves, or electronic controller)"
      },
      {
        "id": "h-1a-level-3",
        "level": 3,
        "officialDescription": "Individual room control with communication between controllers and to BACS"
      },
      {
        "id": "h-1a-level-4",
        "level": 4,
        "officialDescription": "Individual room control with communication and occupancy detection"
      }
    ],
    "impactScoresByLevel": {
      "h-1a-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1a-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1a-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1a-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      },
      "h-1a-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      }
    },
    "triageNote": "not relevant in case of TABS."
  },
  {
    "id": "h-1b",
    "code": "H-1b",
    "domain": "Heating",
    "serviceGroup": "Heat control - demand side",
    "smartReadyService": "Emission control for TABS (heating mode)",
    "shortTitle": "Emission control for TABS (heating mode)",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "h-1b-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "h-1b-level-1",
        "level": 1,
        "officialDescription": "Central automatic control"
      },
      {
        "id": "h-1b-level-2",
        "level": 2,
        "officialDescription": "Advanced central automatic control"
      },
      {
        "id": "h-1b-level-3",
        "level": 3,
        "officialDescription": "Advanced central automatic control with intermittent operation and/or room temperature feedback control"
      }
    ],
    "impactScoresByLevel": {
      "h-1b-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1b-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1b-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 2,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1b-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      }
    },
    "triageNote": "only relevant in case of TABS. Mostly restricted to non-residential buildings"
  },
  {
    "id": "h-1c",
    "code": "H-1c",
    "domain": "Heating",
    "serviceGroup": "Heat control - demand side",
    "smartReadyService": "Control of distribution fluid temperature (supply or return air flow or water flow) - Similar function can be applied to the control of direct electric heating networks",
    "shortTitle": "Control of distribution fluid temperature (supply or return air flow or water flow) - Similar function can be applied to the control of direct electric heating networks",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "h-1c-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "h-1c-level-1",
        "level": 1,
        "officialDescription": "Outside temperature compensated control"
      },
      {
        "id": "h-1c-level-2",
        "level": 2,
        "officialDescription": "Demand based control"
      }
    ],
    "impactScoresByLevel": {
      "h-1c-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1c-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1c-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Not applicable in case of individual heaters (e.g. stoves)"
  },
  {
    "id": "h-1d",
    "code": "H-1d",
    "domain": "Heating",
    "serviceGroup": "Heat control - demand side",
    "smartReadyService": "Control of distribution pumps in networks",
    "shortTitle": "Control of distribution pumps in networks",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "h-1d-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "h-1d-level-1",
        "level": 1,
        "officialDescription": "On off control"
      },
      {
        "id": "h-1d-level-2",
        "level": 2,
        "officialDescription": "Multi-Stage control"
      },
      {
        "id": "h-1d-level-3",
        "level": 3,
        "officialDescription": "Variable speed pump control (pump unit (internal) estimations)"
      },
      {
        "id": "h-1d-level-4",
        "level": 4,
        "officialDescription": "Variable speed pump control (external demand signal)"
      }
    ],
    "impactScoresByLevel": {
      "h-1d-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1d-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1d-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1d-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1d-level-4": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable for hydronic heating systems"
  },
  {
    "id": "h-1f",
    "code": "H-1f",
    "domain": "Heating",
    "serviceGroup": "Heat control - demand side",
    "smartReadyService": "Thermal Energy Storage (TES) for building heating (excluding TABS)",
    "shortTitle": "Thermal Energy Storage (TES) for building heating (excluding TABS)",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "h-1f-level-0",
        "level": 0,
        "officialDescription": "Continuous storage operation"
      },
      {
        "id": "h-1f-level-1",
        "level": 1,
        "officialDescription": "Time-scheduled storage operation"
      },
      {
        "id": "h-1f-level-2",
        "level": 2,
        "officialDescription": "Load prediction based storage operation"
      },
      {
        "id": "h-1f-level-3",
        "level": 3,
        "officialDescription": "Heat storage capable of flexible control through grid signals (e.g. DSM)"
      }
    ],
    "impactScoresByLevel": {
      "h-1f-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1f-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1f-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-1f-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case thermal energy storage is present."
  },
  {
    "id": "h-2a",
    "code": "H-2a",
    "domain": "Heating",
    "serviceGroup": "Control heat production facilities",
    "smartReadyService": "Heat generator control (all except heat pumps)",
    "shortTitle": "Heat generator control (all except heat pumps)",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],

    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "h-2a-level-0",
        "level": 0,
        "officialDescription": "Constant temperature control"
      },
      {
        "id": "h-2a-level-1",
        "level": 1,
        "officialDescription": "Variable temperature control depending on outdoor temperature"
      },
      {
        "id": "h-2a-level-2",
        "level": 2,
        "officialDescription": "Variable temperature control depending on the load (e.g. depending on supply water temperature set point)"
      }
    ],
    "impactScoresByLevel": {
      "h-2a-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2a-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2a-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of combustion heater or district heating"
  },
  {
    "id": "h-2b",
    "code": "H-2b",
    "domain": "Heating",
    "serviceGroup": "Control heat production facilities",
    "smartReadyService": "Heat generator control (for heat pumps)",
    "shortTitle": "Heat generator control (for heat pumps)",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "h-2b-level-0",
        "level": 0,
        "officialDescription": "On/Off-control of heat generator"
      },
      {
        "id": "h-2b-level-1",
        "level": 1,
        "officialDescription": "Multi-stage control of heat generator capacity depending on the load or demand (e.g. on/off of several compressors)"
      },
      {
        "id": "h-2b-level-2",
        "level": 2,
        "officialDescription": "Variable control of heat generator capacity depending on the load or demand (e.g. hot gas bypass, inverter frequency control)"
      },
      {
        "id": "h-2b-level-3",
        "level": 3,
        "officialDescription": "Variable control of heat generator capacity depending on the load AND external signals from grid"
      }
    ],
    "impactScoresByLevel": {
      "h-2b-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2b-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 1,
        "Comfort": 1,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2b-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 2,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2b-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 3,
        "Comfort": 2,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of heat pumps"
  },
  {
    "id": "h-2d",
    "code": "H-2d",
    "domain": "Heating",
    "serviceGroup": "Control heat production facilities",
    "smartReadyService": "Sequencing in case of different heat generators",
    "shortTitle": "Sequencing in case of different heat generators",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "h-2d-level-0",
        "level": 0,
        "officialDescription": "Priorities only based on running time"
      },
      {
        "id": "h-2d-level-1",
        "level": 1,
        "officialDescription": "Control according to fixed priority list: e.g. based on rated energy efficiency"
      },
      {
        "id": "h-2d-level-2",
        "level": 2,
        "officialDescription": "Control according to dynamic priority list (based on current energy efficiency, carbon emissions and capacity of generators, e.g. solar, geothermal heat, cogeneration plant, fossil fuels)"
      },
      {
        "id": "h-2d-level-3",
        "level": 3,
        "officialDescription": "Control according to dynamic priority list (based on current AND predicted load, energy efficiency, carbon emissions  and capacity of generators)"
      },
      {
        "id": "h-2d-level-4",
        "level": 4,
        "officialDescription": "Control according to dynamic priority list (based on current AND predicted load, energy efficiency, carbon emissions, capacity of generators AND external signals from grid)"
      }
    ],
    "impactScoresByLevel": {
      "h-2d-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2d-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2d-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2d-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-2d-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of multiple heat generators, mostly restricted to large buildings"
  },
  {
    "id": "h-3",
    "code": "H-3",
    "domain": "Heating",
    "serviceGroup": "Information to occupants and facility managers",
    "smartReadyService": "Report information regarding heating system performance",
    "shortTitle": "Report information regarding heating system performance",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "h-3-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "h-3-level-1",
        "level": 1,
        "officialDescription": "Central or remote reporting of current performance KPIs (e.g. temperatures, submetering energy usage)"
      },
      {
        "id": "h-3-level-2",
        "level": 2,
        "officialDescription": "Central or remote reporting of current performance KPIs and historical data"
      },
      {
        "id": "h-3-level-3",
        "level": 3,
        "officialDescription": "Central or remote reporting of performance evaluation including forecasting and/or benchmarking"
      },
      {
        "id": "h-3-level-4",
        "level": 4,
        "officialDescription": "Central or remote reporting of performance evaluation including forecasting and/or benchmarking; also including predictive management and fault detection"
      }
    ],
    "impactScoresByLevel": {
      "h-3-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-3-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "h-3-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 2
      },
      "h-3-level-3": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 3
      },
      "h-3-level-4": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 3,
        "Information to occupants": 3
      }
    }
  },
  {
    "id": "h-4",
    "code": "H-4",
    "domain": "Heating",
    "serviceGroup": "Flexibility and grid interaction",
    "smartReadyService": "Flexibility and grid interaction",
    "shortTitle": "Flexibility and grid interaction",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "h-4-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "h-4-level-1",
        "level": 1,
        "officialDescription": "Scheduled operation of heating system"
      },
      {
        "id": "h-4-level-2",
        "level": 2,
        "officialDescription": "Self-learning optimal control of heating system"
      },
      {
        "id": "h-4-level-3",
        "level": 3,
        "officialDescription": "Heating system capable of flexible control through grid signals (e.g. DSM)"
      },
      {
        "id": "h-4-level-4",
        "level": 4,
        "officialDescription": "Optimized control of  heating system based on local predictions and grid signals (e.g. through model predictive control)"
      }
    ],
    "impactScoresByLevel": {
      "h-4-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-4-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-4-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-4-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 3,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "h-4-level-4": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 3,
        "Comfort": 3,
        "Convenience": 3,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "methodologyNote": "The inspectability of the nature of the control algorithm would need to be facilitated"
  },
  {
    "id": "dhw-1a",
    "code": "DHW-1a",
    "domain": "Domestic hot water",
    "serviceGroup": "Control DHW production facilities",
    "smartReadyService": "Control of DHW storage charging (with direct electric heating or integrated electric heat pump)",
    "shortTitle": "Control of DHW storage charging (with direct electric heating or integrated electric heat pump)",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "dhw-1a-level-0",
        "level": 0,
        "officialDescription": "Automatic control on / off"
      },
      {
        "id": "dhw-1a-level-1",
        "level": 1,
        "officialDescription": "Automatic control on / off and scheduled charging enable"
      },
      {
        "id": "dhw-1a-level-2",
        "level": 2,
        "officialDescription": "Automatic control on / off and scheduled charging enable and multi-sensor storage management"
      },
      {
        "id": "dhw-1a-level-3",
        "level": 3,
        "officialDescription": "Automatic charging control based on local availability of renewables or information from electricity grid (DR, DSM)"
      }
    ],
    "impactScoresByLevel": {
      "dhw-1a-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1a-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1a-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1a-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of DHW storage with electric heating"
  },
  {
    "id": "dhw-1b",
    "code": "DHW-1b",
    "domain": "Domestic hot water",
    "serviceGroup": "Control DHW production facilities",
    "smartReadyService": "Control of DHW storage charging (using hot water generation)",
    "shortTitle": "Control of DHW storage charging (using hot water generation)",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "dhw-1b-level-0",
        "level": 0,
        "officialDescription": "Automatic control on / off"
      },
      {
        "id": "dhw-1b-level-1",
        "level": 1,
        "officialDescription": "Automatic control on / off and scheduled charging enable"
      },
      {
        "id": "dhw-1b-level-2",
        "level": 2,
        "officialDescription": "Automatic on/off control, scheduled charging enable and demand-based supply temperature control or multi-sensor storage management"
      },
      {
        "id": "dhw-1b-level-3",
        "level": 3,
        "officialDescription": "DHW production system capable of automatic charging control based on external signals (e.g. from district heating grid)"
      }
    ],
    "impactScoresByLevel": {
      "dhw-1b-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1b-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1b-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1b-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of DHW storage with non-electrical heat  generation"
  },
  {
    "id": "dhw-1d",
    "code": "DHW-1d",
    "domain": "Domestic hot water",
    "serviceGroup": "Control DHW production facilities",
    "smartReadyService": "Control of DHW storage charging (with solar collector and supplymentary heat generation)",
    "shortTitle": "Control of DHW storage charging (with solar collector and supplymentary heat generation)",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "dhw-1d-level-0",
        "level": 0,
        "officialDescription": "Manual selected control of solar energy or heat generation"
      },
      {
        "id": "dhw-1d-level-1",
        "level": 1,
        "officialDescription": "Automatic control of solar storage charge (Prio. 1) and supplementary storage charge"
      },
      {
        "id": "dhw-1d-level-2",
        "level": 2,
        "officialDescription": "Automatic control of solar storage charge (Prio. 1) and supplementary storage charge and demand-oriented supply or multi-sensor storage management"
      },
      {
        "id": "dhw-1d-level-3",
        "level": 3,
        "officialDescription": "Automatic control of solar storage charge (Prio. 1) and supplementary storage charge, demand-oriented supply and return temperature control and multi-sensor storage management"
      }
    ],
    "impactScoresByLevel": {
      "dhw-1d-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1d-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1d-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-1d-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of DHW storage with solar collector"
  },
  {
    "id": "dhw-2b",
    "code": "DHW-2b",
    "domain": "Domestic hot water",
    "serviceGroup": "Control DHW production facilities",
    "smartReadyService": "Sequencing in case of different DHW generators",
    "shortTitle": "Sequencing in case of different DHW generators",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "dhw-2b-level-0",
        "level": 0,
        "officialDescription": "Priorities only based on running time"
      },
      {
        "id": "dhw-2b-level-1",
        "level": 1,
        "officialDescription": "Control according to fixed priority list: e.g. based on rated energy efficiency"
      },
      {
        "id": "dhw-2b-level-2",
        "level": 2,
        "officialDescription": "Control according to dynamic priority list (based on current energy efficiency, carbon emissions and capacity of generators, e.g. solar, geothermal heat, cogeneration plant, fossil fuels)"
      },
      {
        "id": "dhw-2b-level-3",
        "level": 3,
        "officialDescription": "Control according to dynamic priority list (based on current AND predicted load, energy efficiency, carbon emissions  and capacity of generators)"
      },
      {
        "id": "dhw-2b-level-4",
        "level": 4,
        "officialDescription": "Control according to dynamic priority list (based on current AND predicted load, energy efficiency, carbon emissions, capacity of generators AND external signals from grid)"
      }
    ],
    "impactScoresByLevel": {
      "dhw-2b-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-2b-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-2b-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-2b-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-2b-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of multiple heat generators, mostly restricted to large buildings"
  },
  {
    "id": "dhw-3",
    "code": "DHW-3",
    "domain": "Domestic hot water",
    "serviceGroup": "Information to occupants and facility managers",
    "smartReadyService": "Report information regarding domestic hot water performance",
    "shortTitle": "Report information regarding domestic hot water performance",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "dhw-3-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "dhw-3-level-1",
        "level": 1,
        "officialDescription": "Indication of actual values (e.g. temperatures, submetering energy usage)"
      },
      {
        "id": "dhw-3-level-2",
        "level": 2,
        "officialDescription": "Actual values and historical data"
      },
      {
        "id": "dhw-3-level-3",
        "level": 3,
        "officialDescription": "Performance evaluation including forecasting and/or benchmarking"
      },
      {
        "id": "dhw-3-level-4",
        "level": 4,
        "officialDescription": "Performance evaluation including forecasting and/or benchmarking; also including predictive management and fault detection"
      }
    ],
    "impactScoresByLevel": {
      "dhw-3-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "dhw-3-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "dhw-3-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 2
      },
      "dhw-3-level-3": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 3
      },
      "dhw-3-level-4": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 3
      }
    }
  },
  {
    "id": "c-1a",
    "code": "C-1a",
    "domain": "Cooling",
    "serviceGroup": "Cooling control - demand side",
    "smartReadyService": "Cooling emission control",
    "shortTitle": "Cooling emission control",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "c-1a-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "c-1a-level-1",
        "level": 1,
        "officialDescription": "Central automatic control"
      },
      {
        "id": "c-1a-level-2",
        "level": 2,
        "officialDescription": "Individual room control"
      },
      {
        "id": "c-1a-level-3",
        "level": 3,
        "officialDescription": "Individual room control with communication between controllers and to BACS"
      },
      {
        "id": "c-1a-level-4",
        "level": 4,
        "officialDescription": "Individual room control with communication and occupancy detection"
      }
    ],
    "impactScoresByLevel": {
      "c-1a-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1a-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1a-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 2,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1a-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      },
      "c-1a-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case mechanical cooling systems are present"
  },
  {
    "id": "c-1b",
    "code": "C-1b",
    "domain": "Cooling",
    "serviceGroup": "Cooling control - demand side",
    "smartReadyService": "Emission control for TABS (cooling mode)",
    "shortTitle": "Emission control for TABS (cooling mode)",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "c-1b-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "c-1b-level-1",
        "level": 1,
        "officialDescription": "Central automatic control"
      },
      {
        "id": "c-1b-level-2",
        "level": 2,
        "officialDescription": "Advanced central automatic control"
      },
      {
        "id": "c-1b-level-3",
        "level": 3,
        "officialDescription": "Advanced central automatic control with intermittent operation and/or room temperature feedback control"
      }
    ],
    "impactScoresByLevel": {
      "c-1b-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1b-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1b-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1b-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      }
    },
    "applicabilityNote": "Only applicable in case mechanical cooling systems  based on TABS are present"
  },
  {
    "id": "c-1c",
    "code": "C-1c",
    "domain": "Cooling",
    "serviceGroup": "Cooling control - demand side",
    "smartReadyService": "Control of distribution network chilled water temperature (supply or return)",
    "shortTitle": "Control of distribution network chilled water temperature (supply or return)",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "c-1c-level-0",
        "level": 0,
        "officialDescription": "Constant temperature control"
      },
      {
        "id": "c-1c-level-1",
        "level": 1,
        "officialDescription": "Outside temperature compensated control"
      },
      {
        "id": "c-1c-level-2",
        "level": 2,
        "officialDescription": "Demand based control"
      }
    ],
    "impactScoresByLevel": {
      "c-1c-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1c-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1c-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case mechanical cooling systems  with hydronic distribution system are present"
  },
  {
    "id": "c-1d",
    "code": "C-1d",
    "domain": "Cooling",
    "serviceGroup": "Cooling control - demand side",
    "smartReadyService": "Control of distribution pumps in networks",
    "shortTitle": "Control of distribution pumps in networks",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "c-1d-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "c-1d-level-1",
        "level": 1,
        "officialDescription": "On off control"
      },
      {
        "id": "c-1d-level-2",
        "level": 2,
        "officialDescription": "Multi-Stage control"
      },
      {
        "id": "c-1d-level-3",
        "level": 3,
        "officialDescription": "Variable speed pump control (pump unit (internal) estimations)"
      },
      {
        "id": "c-1d-level-4",
        "level": 4,
        "officialDescription": "Variable speed pump control (external demand signal)"
      }
    ],
    "impactScoresByLevel": {
      "c-1d-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1d-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1d-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1d-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1d-level-4": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case mechanical cooling systems  with hydronic distribution system are present"
  },
  {
    "id": "c-1f",
    "code": "C-1f",
    "domain": "Cooling",
    "serviceGroup": "Cooling control - demand side",
    "smartReadyService": "Interlock: avoiding simultaneous heating and cooling in the same room",
    "shortTitle": "Interlock: avoiding simultaneous heating and cooling in the same room",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "c-1f-level-0",
        "level": 0,
        "officialDescription": "No interlock"
      },
      {
        "id": "c-1f-level-1",
        "level": 1,
        "officialDescription": "Partial interlock (minimising risk of simultanieus heating and cooling e.g. by sliding setpoints)"
      },
      {
        "id": "c-1f-level-2",
        "level": 2,
        "officialDescription": "Total interlock (control system ensures no  simultaneous heating and cooling can take place)"
      }
    ],
    "impactScoresByLevel": {
      "c-1f-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1f-level-1": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1f-level-2": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case mechanical cooling systems are present"
  },
  {
    "id": "c-1g",
    "code": "C-1g",
    "domain": "Cooling",
    "serviceGroup": "Cooling control - demand side",
    "smartReadyService": "Control of Thermal Energy Storage (TES) operation",
    "shortTitle": "Control of Thermal Energy Storage (TES) operation",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "c-1g-level-0",
        "level": 0,
        "officialDescription": "Continuous storage operation"
      },
      {
        "id": "c-1g-level-1",
        "level": 1,
        "officialDescription": "Time-scheduled storage operation"
      },
      {
        "id": "c-1g-level-2",
        "level": 2,
        "officialDescription": "Load prediction based storage operation"
      },
      {
        "id": "c-1g-level-3",
        "level": 3,
        "officialDescription": "Cold storage capable of flexible control through grid signals (e.g. DSM)"
      }
    ],
    "impactScoresByLevel": {
      "c-1g-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1g-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1g-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-1g-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case mechanical cooling systems are present ánd include TES systems"
  },
  {
    "id": "c-2a",
    "code": "C-2a",
    "domain": "Cooling",
    "serviceGroup": "Control cooling production facilities",
    "smartReadyService": "Generator control for cooling",
    "shortTitle": "Generator control for cooling",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "c-2a-level-0",
        "level": 0,
        "officialDescription": "On/Off-control of cooling production"
      },
      {
        "id": "c-2a-level-1",
        "level": 1,
        "officialDescription": "Multi-stage control of  cooling production capacity depending on the load or demand (e.g. on/off of several compressors)"
      },
      {
        "id": "c-2a-level-2",
        "level": 2,
        "officialDescription": "Variable control of  cooling production capacity depending on the load or demand (e.g. hot gas bypass, inverter frequency control)"
      },
      {
        "id": "c-2a-level-3",
        "level": 3,
        "officialDescription": "Variable control of  cooling production capacity depending on the load AND external signals from grid"
      }
    ],
    "impactScoresByLevel": {
      "c-2a-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-2a-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 1,
        "Comfort": 1,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-2a-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 2,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-2a-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 3,
        "Comfort": 2,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case mechanical cooling systems are present"
  },
  {
    "id": "c-2b",
    "code": "C-2b",
    "domain": "Cooling",
    "serviceGroup": "Control cooling production facilities",
    "smartReadyService": "Sequencing of different cooling generators",
    "shortTitle": "Sequencing of different cooling generators",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "c-2b-level-0",
        "level": 0,
        "officialDescription": "Priorities only based on running times"
      },
      {
        "id": "c-2b-level-1",
        "level": 1,
        "officialDescription": "Fixed sequencing based on loads only: e.g. depending on the generators characteristics such as absorption chiller vs. centrifugal chiller"
      },
      {
        "id": "c-2b-level-2",
        "level": 2,
        "officialDescription": "Dynamic priorities based on generator efficiency and characteristics (e.g. availability of free cooling)"
      },
      {
        "id": "c-2b-level-3",
        "level": 3,
        "officialDescription": "Load prediction based sequencing: the sequence is based on e.g. COP and available power of a device and the predicted required power"
      },
      {
        "id": "c-2b-level-4",
        "level": 4,
        "officialDescription": "Sequencing based on dynamic priority list, including external signals from grid"
      }
    ],
    "impactScoresByLevel": {
      "c-2b-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-2b-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-2b-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-2b-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-2b-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case multiple mechanical cooling systems are present"
  },
  {
    "id": "c-3",
    "code": "C-3",
    "domain": "Cooling",
    "serviceGroup": "Information to occupants and facility managers",
    "smartReadyService": "Report information regarding cooling system performance",
    "shortTitle": "Report information regarding cooling system performance",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "c-3-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "c-3-level-1",
        "level": 1,
        "officialDescription": "Central or remote reporting of current performance KPIs (e.g. temperatures, submetering energy usage)"
      },
      {
        "id": "c-3-level-2",
        "level": 2,
        "officialDescription": "Central or remote reporting of current performance KPIs and historical data"
      },
      {
        "id": "c-3-level-3",
        "level": 3,
        "officialDescription": "Central or remote reporting of performance evaluation including forecasting and/or benchmarking"
      },
      {
        "id": "c-3-level-4",
        "level": 4,
        "officialDescription": "Central or remote reporting of performance evaluation including forecasting and/or benchmarking; also including predictive management and fault detection"
      }
    ],
    "impactScoresByLevel": {
      "c-3-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-3-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "c-3-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 2
      },
      "c-3-level-3": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 3
      },
      "c-3-level-4": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 3,
        "Information to occupants": 3
      }
    },
    "applicabilityNote": "Only applicable in case mechanical cooling systems are present"
  },
  {
    "id": "c-4",
    "code": "C-4",
    "domain": "Cooling",
    "serviceGroup": "Flexibility and grid interaction",
    "smartReadyService": "Flexibility and grid interaction",
    "shortTitle": "Flexibility and grid interaction",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "c-4-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "c-4-level-1",
        "level": 1,
        "officialDescription": "Scheduled operation of cooling system"
      },
      {
        "id": "c-4-level-2",
        "level": 2,
        "officialDescription": "Self-learning optimal control of cooling system"
      },
      {
        "id": "c-4-level-3",
        "level": 3,
        "officialDescription": "Cooling system capable of flexible control through grid signals (e.g. DSM)"
      },
      {
        "id": "c-4-level-4",
        "level": 4,
        "officialDescription": "Optimized control of  cooling system based on local predictions and grid signals (e.g. through model predictive control)"
      }
    ],
    "impactScoresByLevel": {
      "c-4-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-4-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-4-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-4-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 3,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "c-4-level-4": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 3,
        "Comfort": 3,
        "Convenience": 3,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "methodologyNote": "The inspectability of the nature of the control algorithm would need to be facilitated"
  },
  {
    "id": "v-1a",
    "code": "V-1a",
    "domain": "Ventilation",
    "serviceGroup": "Air flow control",
    "smartReadyService": "Supply air flow control at the room level",
    "shortTitle": "Supply air flow control at the room level",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "v-1a-level-0",
        "level": 0,
        "officialDescription": "No ventilation system or manual control"
      },
      {
        "id": "v-1a-level-1",
        "level": 1,
        "officialDescription": "Clock control"
      },
      {
        "id": "v-1a-level-2",
        "level": 2,
        "officialDescription": "Occupancy detection control"
      },
      {
        "id": "v-1a-level-3",
        "level": 3,
        "officialDescription": "Central Demand Control based on air quality sensors (CO2, VOC, humidity, ...)"
      },
      {
        "id": "v-1a-level-4",
        "level": 4,
        "officialDescription": "Local Demand Control based on air quality sensors (CO2, VOC,...) with local flow from/to the zone regulated by dampers"
      }
    ],
    "impactScoresByLevel": {
      "v-1a-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-1a-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-1a-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-1a-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 3,
        "Convenience": 3,
        "Health, well-being and accessibility": 3,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-1a-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 3,
        "Convenience": 3,
        "Health, well-being and accessibility": 3,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Always to be assessed"
  },
  {
    "id": "v-1c",
    "code": "V-1c",
    "domain": "Ventilation",
    "serviceGroup": "Air flow control",
    "smartReadyService": "Air flow or pressure control at the air handler level",
    "shortTitle": "Air flow or pressure control at the air handler level",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "v-1c-level-0",
        "level": 0,
        "officialDescription": "No automatic control: Continuously supplies of air flow for a maximum load of all rooms"
      },
      {
        "id": "v-1c-level-1",
        "level": 1,
        "officialDescription": "On off time control: Continuously supplies of air flow for a maximum load of all rooms during nominal occupancy time"
      },
      {
        "id": "v-1c-level-2",
        "level": 2,
        "officialDescription": "Multi-stage control: To reduce the auxiliary energy demand of the fan"
      },
      {
        "id": "v-1c-level-3",
        "level": 3,
        "officialDescription": "Automatic flow or pressure control without pressure reset: Load dependent supplies of air flow for the demand of all connected rooms."
      },
      {
        "id": "v-1c-level-4",
        "level": 4,
        "officialDescription": "Automatic flow or pressure control with pressure reset: Load dependent supplies of air flow for the demand of all connected rooms (for variable air volume systems with VFD)."
      }
    ],
    "impactScoresByLevel": {
      "v-1c-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-1c-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-1c-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-1c-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-1c-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only in case of mechanical ventilation"
  },
  {
    "id": "v-2c",
    "code": "V-2c",
    "domain": "Ventilation",
    "serviceGroup": "Air temperature control",
    "smartReadyService": "Heat recovery control:\nprevention of overheating",
    "shortTitle": "Heat recovery control:\nprevention of overheating",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "v-2c-level-0",
        "level": 0,
        "officialDescription": "Without overheating control"
      },
      {
        "id": "v-2c-level-1",
        "level": 1,
        "officialDescription": "Modulate or bypass heat recovery based on sensors in air exhaust"
      },
      {
        "id": "v-2c-level-2",
        "level": 2,
        "officialDescription": "Modulate or bypass heat recovery based on multiple room temperature sensors or predictive control"
      }
    ],
    "impactScoresByLevel": {
      "v-2c-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-2c-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-2c-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only in case of mechanical ventilation with heat recovery"
  },
  {
    "id": "v-2d",
    "code": "V-2d",
    "domain": "Ventilation",
    "serviceGroup": "Air temperature control",
    "smartReadyService": "Supply air temperature control at the air handling unit level",
    "shortTitle": "Supply air temperature control at the air handling unit level",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "v-2d-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "v-2d-level-1",
        "level": 1,
        "officialDescription": "Constant setpoint: A control loop enables to control the supply air_x000D_\ntemperature, the setpoint is constant and can only be modified by a manual_x000D_\naction"
      },
      {
        "id": "v-2d-level-2",
        "level": 2,
        "officialDescription": "Variable set point with outdoor temperature compensation"
      },
      {
        "id": "v-2d-level-3",
        "level": 3,
        "officialDescription": "Variable set point with load dependant compensation. A control loop enables to control the supply air temperature. The setpoint is defined as a function of the loads in the room"
      }
    ],
    "impactScoresByLevel": {
      "v-2d-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-2d-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-2d-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-2d-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only in case of mechanical ventilation which supplies heating"
  },
  {
    "id": "v-3",
    "code": "V-3",
    "domain": "Ventilation",
    "serviceGroup": "Free cooling",
    "smartReadyService": "Free cooling with mechanical ventilation system",
    "shortTitle": "Free cooling with mechanical ventilation system",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "v-3-level-0",
        "level": 0,
        "officialDescription": "No automatic control"
      },
      {
        "id": "v-3-level-1",
        "level": 1,
        "officialDescription": "Night cooling"
      },
      {
        "id": "v-3-level-2",
        "level": 2,
        "officialDescription": "Free cooling: air flows modulated during all periods of time to minimize the amount of mechanical cooling"
      },
      {
        id: "v-3-level-3",
        level: 3,
        officialDescription:
          "H,x- directed control: The amount of outside air and recirculation air are modulated during all periods of time to minimize the amount of mechanical cooling. Calculation is performed on the basis of temperatures and humidity (enthalpy).",
      }
    ],
    "impactScoresByLevel": {
      "v-3-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-3-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 3,
        "Convenience": 2,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-3-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 3,
        "Convenience": 2,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-3-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 3,
        "Convenience": 2,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only in case of mechanical or hybrid ventilation"
  },
  {
    "id": "v-6",
    "code": "V-6",
    "domain": "Ventilation",
    "serviceGroup": "Feedback - Reporting information",
    "smartReadyService": "Reporting information regarding IAQ",
    "shortTitle": "Reporting information regarding IAQ",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "v-6-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "v-6-level-1",
        "level": 1,
        "officialDescription": "Air quality sensors (e.g. CO2) and real time autonomous monitoring"
      },
      {
        "id": "v-6-level-2",
        "level": 2,
        "officialDescription": "Real time monitoring & historical information of IAQ available to occupants"
      },
      {
        "id": "v-6-level-3",
        "level": 3,
        "officialDescription": "Real time monitoring & historical information of IAQ available to occupants + warning on maintenance needs or occupant actions (e.g. window opening)"
      }
    ],
    "impactScoresByLevel": {
      "v-6-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "v-6-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "v-6-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 3,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 2
      },
      "v-6-level-3": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 3,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 3
      }
    },
    "applicabilityNote": "Always to be assessed"
  },
  {
    "id": "l-1a",
    "code": "L-1a",
    "domain": "Lighting",
    "serviceGroup": "Artificial lighting control",
    "smartReadyService": "Occupancy control for indoor lighting",
    "shortTitle": "Occupancy control for indoor lighting",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "l-1a-level-0",
        "level": 0,
        "officialDescription": "Manual on/off switch"
      },
      {
        "id": "l-1a-level-1",
        "level": 1,
        "officialDescription": "Manual on/off switch + additional sweeping extinction signal"
      },
      {
        "id": "l-1a-level-2",
        "level": 2,
        "officialDescription": "Automatic detection (auto on / dimmed or auto off)"
      },
      {
        "id": "l-1a-level-3",
        "level": 3,
        "officialDescription": "Automatic detection (manual on / dimmed or auto off)"
      }
    ],
    "impactScoresByLevel": {
      "l-1a-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "l-1a-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "l-1a-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "l-1a-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Always to be assessed"
  },
  {
    "id": "l-2",
    "code": "L-2",
    "domain": "Lighting",
    "serviceGroup": "Control artificial lighting power based on daylight levels",
    "smartReadyService": "Control artificial lighting power based on daylight levels",
    "shortTitle": "Control artificial lighting power based on daylight levels",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "l-2-level-0",
        "level": 0,
        "officialDescription": "Manual (central)"
      },
      {
        "id": "l-2-level-1",
        "level": 1,
        "officialDescription": "Manual (per room / zone)"
      },
      {
        "id": "l-2-level-2",
        "level": 2,
        "officialDescription": "Automatic switching"
      },
      {
        "id": "l-2-level-3",
        "level": 3,
        "officialDescription": "Automatic dimming"
      },
      {
        "id": "l-2-level-4",
        "level": 4,
        "officialDescription": "Automatic dimming including scene-based light control (during time intervals, dynamic and\nadapted lighting scenes are set, for example, in terms of\nilluminance level, different correlated colour temperature (CCT)\nand the possibility to change the light distribution within the space\naccording to e. g. design, human needs, visual tasks)"
      }
    ],
    "impactScoresByLevel": {
      "l-2-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "l-2-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "l-2-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "l-2-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "l-2-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 3,
        "Convenience": 3,
        "Health, well-being and accessibility": 3,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Always to be assessed"
  },
  {
    "id": "de-1",
    "code": "DE-1",
    "domain": "Dynamic building envelope",
    "serviceGroup": "Window control",
    "smartReadyService": "Window solar shading control",
    "shortTitle": "Window solar shading control",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "de-1-level-0",
        "level": 0,
        "officialDescription": "No sun shading or only manual operation"
      },
      {
        "id": "de-1-level-1",
        "level": 1,
        "officialDescription": "Motorized operation with manual control"
      },
      {
        "id": "de-1-level-2",
        "level": 2,
        "officialDescription": "Motorized operation with automatic control based on sensor data"
      },
      {
        "id": "de-1-level-3",
        "level": 3,
        "officialDescription": "Combined light/blind/HVAC control"
      },
      {
        "id": "de-1-level-4",
        "level": 4,
        "officialDescription": "Predictive blind control (e.g. based on weather forecast)"
      }
    ],
    "impactScoresByLevel": {
      "de-1-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "de-1-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "de-1-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 2,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "de-1-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "de-1-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 3,
        "Convenience": 3,
        "Health, well-being and accessibility": 3,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case movable shades, screens or blinds are present"
  },
  {
    "id": "de-2",
    "code": "DE-2",
    "domain": "Dynamic building envelope",
    "serviceGroup": "Window control",
    "smartReadyService": "Window open/closed control, combined with HVAC system",
    "shortTitle": "Window open/closed control, combined with HVAC system",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "de-2-level-0",
        "level": 0,
        "officialDescription": "Manual operation or only fixed windows"
      },
      {
        "id": "de-2-level-1",
        "level": 1,
        "officialDescription": "Open/closed detection to shut down heating or cooling systems"
      },
      {
        "id": "de-2-level-2",
        "level": 2,
        "officialDescription": "Level 1 + Automised mechanical window opening based on room sensor data"
      },
      {
        "id": "de-2-level-3",
        "level": 3,
        "officialDescription": "Level 2 + Centralized coordination of operable windows, e.g. to control free natural night cooling"
      }
    ],
    "impactScoresByLevel": {
      "de-2-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "de-2-level-1": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "de-2-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "de-2-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    }
  },
  {
    "id": "de-4",
    "code": "DE-4",
    "domain": "Dynamic building envelope",
    "serviceGroup": "Feedback - Reporting information",
    "smartReadyService": "Reporting information regarding performance of dynamic building envelope systems",
    "shortTitle": "Reporting information regarding performance of dynamic building envelope systems",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "de-4-level-0",
        "level": 0,
        "officialDescription": "No reporting"
      },
      {
        "id": "de-4-level-1",
        "level": 1,
        "officialDescription": "Position of each product & fault detection"
      },
      {
        "id": "de-4-level-2",
        "level": 2,
        "officialDescription": "Position of each product, fault detection & predictive maintenance"
      },
      {
        "id": "de-4-level-3",
        "level": 3,
        "officialDescription": "Position of each product, fault detection, predictive maintenance, real-time sensor data (wind, lux, temperature…)"
      },
      {
        "id": "de-4-level-4",
        "level": 4,
        "officialDescription": "Position of each product, fault detection, predictive maintenance, real-time & historical sensor data (wind, lux, temperature…)"
      }
    ],
    "impactScoresByLevel": {
      "de-4-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "de-4-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "de-4-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 2
      },
      "de-4-level-3": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 3
      },
      "de-4-level-4": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 3
      }
    },
    "applicabilityNote": "Only applicable in case movable shades, screens or blinds are present"
  },
  {
    "id": "e-2",
    "code": "E-2",
    "domain": "Electricity",
    "serviceGroup": "Feedback - Reporting information",
    "smartReadyService": "Reporting information regarding local electricity generation",
    "shortTitle": "Reporting information regarding local electricity generation",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "e-2-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "e-2-level-1",
        "level": 1,
        "officialDescription": "Current generation data available"
      },
      {
        "id": "e-2-level-2",
        "level": 2,
        "officialDescription": "Actual values and historical data"
      },
      {
        "id": "e-2-level-3",
        "level": 3,
        "officialDescription": "Performance evaluation including forecasting and/or benchmarking"
      },
      {
        "id": "e-2-level-4",
        "level": 4,
        "officialDescription": "Performance evaluation including forecasting and/or benchmarking; also including predictive management and fault detection"
      }
    ],
    "impactScoresByLevel": {
      "e-2-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-2-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "e-2-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 2
      },
      "e-2-level-3": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 3
      },
      "e-2-level-4": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 3
      }
    },
    "applicabilityNote": "Only applicable in case of local energy generation"
  },
  {
    "id": "e-3",
    "code": "E-3",
    "domain": "Electricity",
    "serviceGroup": "DER - Storage",
    "smartReadyService": "Storage of (locally generated) electricity",
    "shortTitle": "Storage of (locally generated) electricity",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "e-3-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "e-3-level-1",
        "level": 1,
        "officialDescription": "On site storage of electricity (e.g. electric battery)"
      },
      {
        "id": "e-3-level-2",
        "level": 2,
        "officialDescription": "On site storage of energy (e.g. electric battery or thermal storage) with controller based on grid signals"
      },
      {
        "id": "e-3-level-3",
        "level": 3,
        "officialDescription": "On site storage of energy (e.g. electric battery or thermal storage) with controller optimising the use of locally generated electricity"
      },
      {
        "id": "e-3-level-4",
        "level": 4,
        "officialDescription": "On site storage of energy (e.g. electric battery or thermal storage) with controller optimising the use of locally generated electricity and possibility to feed back into the grid"
      }
    ],
    "impactScoresByLevel": {
      "e-3-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-3-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-3-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-3-level-3": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-3-level-4": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of local energy generation"
  },
  {
    "id": "e-4",
    "code": "E-4",
    "domain": "Electricity",
    "serviceGroup": "DER- Optimization",
    "smartReadyService": "Optimizing self-consumption of locally generated electricity",
    "shortTitle": "Optimizing self-consumption of locally generated electricity",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "e-4-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "e-4-level-1",
        "level": 1,
        "officialDescription": "Scheduling electricity consumption (plug loads, white goods, etc.)"
      },
      {
        "id": "e-4-level-2",
        "level": 2,
        "officialDescription": "Automated management of local electricity consumption based on current renewable energy availability"
      },
      {
        "id": "e-4-level-3",
        "level": 3,
        "officialDescription": "Automated management of local electricity consumption based on current and predicted energy needs and renewable energy availability"
      }
    ],
    "impactScoresByLevel": {
      "e-4-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-4-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-4-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-4-level-3": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of local energy generation"
  },
  {
    "id": "e-5",
    "code": "E-5",
    "domain": "Electricity",
    "serviceGroup": "DER - Generation Control",
    "smartReadyService": "Control of combined heat and power plant (CHP)",
    "shortTitle": "Control of combined heat and power plant (CHP)",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "e-5-level-0",
        "level": 0,
        "officialDescription": "CHP control based on scheduled runtime management and/or current heat energy demand"
      },
      {
        "id": "e-5-level-1",
        "level": 1,
        "officialDescription": "CHP runtime control influenced by the fluctuating availability of RES; overproduction will be fed into the grid"
      },
      {
        "id": "e-5-level-2",
        "level": 2,
        "officialDescription": "CHP runtime control influenced by the fluctuating availability of RES and grid signals; dynamic charging and runtime control to optimise self-consumption of renewables"
      }
    ],
    "impactScoresByLevel": {
      "e-5-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-5-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-5-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of CHP"
  },
  {
    "id": "e-8",
    "code": "E-8",
    "domain": "Electricity",
    "serviceGroup": "DSM- Storage",
    "smartReadyService": "Support of (micro)grid operation modes",
    "shortTitle": "Support of (micro)grid operation modes",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "e-8-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "e-8-level-1",
        "level": 1,
        "officialDescription": "Automated management of (building-level) electricity consumption based on grid signals"
      },
      {
        "id": "e-8-level-2",
        "level": 2,
        "officialDescription": "Automated management of (building-level) electricity consumption and electricity supply to neighbouring buildings (microgrid) or grid"
      },
      {
        "id": "e-8-level-3",
        "level": 3,
        "officialDescription": "Automated management of (building-level) electricity consumption and supply, with potential to continue limited off-grid operation (island mode)"
      }
    ],
    "impactScoresByLevel": {
      "e-8-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-8-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-8-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-8-level-3": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 3,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only applicable in case of local energy storage"
  },
  {
    "id": "e-11",
    "code": "E-11",
    "domain": "Electricity",
    "serviceGroup": "Feedback - Reporting information",
    "smartReadyService": "Reporting information regarding energy storage",
    "shortTitle": "Reporting information regarding energy storage",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "e-11-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "e-11-level-1",
        "level": 1,
        "officialDescription": "Current state of charge (SOC) data available"
      },
      {
        "id": "e-11-level-2",
        "level": 2,
        "officialDescription": "Actual values and historical data"
      },
      {
        "id": "e-11-level-3",
        "level": 3,
        "officialDescription": "Performance evaluation including forecasting and/or benchmarking"
      },
      {
        "id": "e-11-level-4",
        "level": 4,
        "officialDescription": "Performance evaluation including forecasting and/or benchmarking; also including predictive management and fault detection"
      }
    ],
    "impactScoresByLevel": {
      "e-11-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-11-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "e-11-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 2
      },
      "e-11-level-3": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 3
      },
      "e-11-level-4": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 3
      }
    },
    "applicabilityNote": "Only applicable in case of local energy storage"
  },
  {
    "id": "e-12",
    "code": "E-12",
    "domain": "Electricity",
    "serviceGroup": "Feedback - Reporting information",
    "smartReadyService": "Reporting information regarding electricity consumption",
    "shortTitle": "Reporting information regarding electricity consumption",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "e-12-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "e-12-level-1",
        "level": 1,
        "officialDescription": "reporting on current electricity consumption on building level"
      },
      {
        "id": "e-12-level-2",
        "level": 2,
        "officialDescription": "real-time feedback or benchmarking on building level"
      },
      {
        "id": "e-12-level-3",
        "level": 3,
        "officialDescription": "real-time feedback or benchmarking on appliance level"
      },
      {
        "id": "e-12-level-4",
        "level": 4,
        "officialDescription": "real-time feedback or benchmarking on appliance level with automated personalized recommendations"
      }
    ],
    "impactScoresByLevel": {
      "e-12-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "e-12-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 1
      },
      "e-12-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 2
      },
      "e-12-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 3
      },
      "e-12-level-4": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 3
      }
    },
    "applicabilityNote": "Always to be assessed"
  },
  {
    "id": "ev-15",
    "code": "EV-15",
    "domain": "Electric vehicle charging",
    "serviceGroup": "EV Charging",
    "smartReadyService": "EV Charging Capacity",
    "shortTitle": "EV Charging Capacity",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "ev-15-level-0",
        "level": 0,
        "officialDescription": "not present"
      },
      {
        "id": "ev-15-level-1",
        "level": 1,
        "officialDescription": "ducting (or simple power plug) available"
      },
      {
        "id": "ev-15-level-2",
        "level": 2,
        "officialDescription": "0-9% of parking spaces has recharging points"
      },
      {
        "id": "ev-15-level-3",
        "level": 3,
        "officialDescription": "10-50% or parking spaces has recharging point"
      },
      {
        "id": "ev-15-level-4",
        "level": 4,
        "officialDescription": ">50% of parking spaces has recharging point"
      }
    ],
    "impactScoresByLevel": {
      "ev-15-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "ev-15-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "ev-15-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "ev-15-level-3": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 3,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "ev-15-level-4": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 3,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only to be assessed if parking spots available on site"
  },
  {
    "id": "ev-16",
    "code": "EV-16",
    "domain": "Electric vehicle charging",
    "serviceGroup": "EV Charging - Grid",
    "smartReadyService": "EV Charging Grid balancing",
    "shortTitle": "EV Charging Grid balancing",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "ev-16-level-0",
        "level": 0,
        "officialDescription": "Not present (uncontrolled charging)"
      },
      {
        "id": "ev-16-level-1",
        "level": 1,
        "officialDescription": "1-way controlled charging (e.g. including desired departure time and grid signals for optimization)"
      },
      {
        "id": "ev-16-level-2",
        "level": 2,
        "officialDescription": "2-way controlled charging (e.g. including desired departure time and grid signals for optimization)"
      }
    ],
    "impactScoresByLevel": {
      "ev-16-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": -2,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "ev-16-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "ev-16-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Only to be assessed if EV charging available on site"
  },
  {
    "id": "ev-17",
    "code": "EV-17",
    "domain": "Electric vehicle charging",
    "serviceGroup": "EV Charging - connectivity",
    "smartReadyService": "EV charging information and connectivity",
    "shortTitle": "EV charging information and connectivity",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 0,
    "functionalityLevels": [
      {
        "id": "ev-17-level-0",
        "level": 0,
        "officialDescription": "No information available"
      },
      {
        "id": "ev-17-level-1",
        "level": 1,
        "officialDescription": "Reporting information on EV charging status to occupant"
      },
      {
        "id": "ev-17-level-2",
        "level": 2,
        "officialDescription": "Reporting information on EV charging status to occupant AND automatic identification and authorizition of the driver to the charging station (ISO 15118 compliant)"
      }
    ],
    "impactScoresByLevel": {
      "ev-17-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "ev-17-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 2
      },
      "ev-17-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 3
      }
    },
    "applicabilityNote": "Only to be assessed if EV charging available on site"
  },
  {
    "id": "mc-3",
    "code": "MC-3",
    "domain": "Monitoring and control",
    "serviceGroup": "HVAC interaction control",
    "smartReadyService": "Run time management of HVAC systems",
    "shortTitle": "Run time management of HVAC systems",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "mc-3-level-0",
        "level": 0,
        "officialDescription": "Manual setting"
      },
      {
        "id": "mc-3-level-1",
        "level": 1,
        "officialDescription": "Runtime setting of heating and cooling plants following a predefined time schedule"
      },
      {
        "id": "mc-3-level-2",
        "level": 2,
        "officialDescription": "Heating and cooling plant on/off control based on building loads"
      },
      {
        "id": "mc-3-level-3",
        "level": 3,
        "officialDescription": "Heating and cooling plant on/off control based on predictive control or grid signals"
      }
    ],
    "impactScoresByLevel": {
      "mc-3-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-3-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 1,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-3-level-2": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 1,
        "Comfort": 2,
        "Convenience": 2,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-3-level-3": {
        "Energy efficiency": 3,
        "Energy flexibility and storage": 2,
        "Comfort": 2,
        "Convenience": 3,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    }
  },
  {
    "id": "mc-4",
    "code": "MC-4",
    "domain": "Monitoring and control",
    "serviceGroup": "Fault detection",
    "smartReadyService": "Detecting faults of technical building systems and providing support to the diagnosis of these faults",
    "shortTitle": "Detecting faults of technical building systems and providing support to the diagnosis of these faults",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "mc-4-level-0",
        "level": 0,
        "officialDescription": "No central indication of detected faults and alarms"
      },
      {
        "id": "mc-4-level-1",
        "level": 1,
        "officialDescription": "With central indication of detected faults and alarms for at least 2 relevant TBS"
      },
      {
        "id": "mc-4-level-2",
        "level": 2,
        "officialDescription": "With central indication of detected faults and alarms for all relevant TBS"
      },
      {
        "id": "mc-4-level-3",
        "level": 3,
        "officialDescription": "With central indication of detected faults and alarms for all relevant TBS, including diagnosing functions"
      }
    ],
    "impactScoresByLevel": {
      "mc-4-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-4-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 1,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "mc-4-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 2,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 2
      },
      "mc-4-level-3": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 3,
        "Health, well-being and accessibility": 3,
        "Maintenance and fault prediction": 3,
        "Information to occupants": 3
      }
    }
  },
  {
    "id": "mc-9",
    "code": "MC-9",
    "domain": "Monitoring and control",
    "serviceGroup": "TBS interaction control",
    "smartReadyService": "Occupancy detection: connected services",
    "shortTitle": "Occupancy detection: connected services",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "mc-9-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "mc-9-level-1",
        "level": 1,
        "officialDescription": "Occupancy detection for individual functions, e.g. lighting"
      },
      {
        "id": "mc-9-level-2",
        "level": 2,
        "officialDescription": "Centralised occupant detection which feeds in to several TBS such as lighting and heating"
      }
    ],
    "impactScoresByLevel": {
      "mc-9-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-9-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      },
      "mc-9-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 1,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 0
      }
    }
  },
  {
    "id": "mc-13",
    "code": "MC-13",
    "domain": "Monitoring and control",
    "serviceGroup": "Feedback - Reporting information",
    "smartReadyService": "Central reporting of TBS performance and energy use",
    "shortTitle": "Central reporting of TBS performance and energy use",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "mc-13-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "mc-13-level-1",
        "level": 1,
        "officialDescription": "Central or remote reporting of realtime energy use per energy carrier"
      },
      {
        "id": "mc-13-level-2",
        "level": 2,
        "officialDescription": "Central or remote reporting of realtime energy use per energy carrier, combining TBS of at least 2 domains in one interface"
      },
      {
        "id": "mc-13-level-3",
        "level": 3,
        "officialDescription": "Central or remote reporting of realtime energy use per energy carrier, combining TBS of all main domains in one interface"
      }
    ],
    "impactScoresByLevel": {
      "mc-13-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-13-level-1": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 1
      },
      "mc-13-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 2,
        "Information to occupants": 2
      },
      "mc-13-level-3": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 3,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 3,
        "Information to occupants": 3
      }
    }
  },
  {
    "id": "mc-25",
    "code": "MC-25",
    "domain": "Monitoring and control",
    "serviceGroup": "Smart Grid Integration",
    "smartReadyService": "Smart Grid Integration",
    "shortTitle": "Smart Grid Integration",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "mc-25-level-0",
        "level": 0,
        "officialDescription": "None - No harmonization between grid and TBS; building is operated independently from the grid load"
      },
      {
        "id": "mc-25-level-1",
        "level": 1,
        "officialDescription": "Demand side management possible for (some) individual TBS, but not coordinated over various domains"
      },
      {
        "id": "mc-25-level-2",
        "level": 2,
        "officialDescription": "Coordinated demand side management of multiple TBS"
      }
    ],
    "impactScoresByLevel": {
      "mc-25-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-25-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-25-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 3,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      }
    },
    "methodologyNote": "The inspectability of the nature of the control algorithm would need to be facilitated for level 2. Service 7.5 in EN15232-1-17. Average impacts derived from multiple simulations to produce BACS factors in EN15232."
  },
  {
    "id": "mc-28",
    "code": "MC-28",
    "domain": "Monitoring and control",
    "serviceGroup": "Feedback - Reporting information",
    "smartReadyService": "Reporting information regarding demand side management performance and operation",
    "shortTitle": "Reporting information regarding demand side management performance and operation",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "mc-28-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "mc-28-level-1",
        "level": 1,
        "officialDescription": "Reporting information on current DSM status, including managed energy flows"
      },
      {
        "id": "mc-28-level-2",
        "level": 2,
        "officialDescription": "Reporting information on currenthistorical and predicted DSM status, including managed energy flows"
      }
    ],
    "impactScoresByLevel": {
      "mc-28-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-28-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 2
      },
      "mc-28-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 3
      }
    }
  },
  {
    "id": "mc-29",
    "code": "MC-29",
    "domain": "Monitoring and control",
    "serviceGroup": "Override control",
    "smartReadyService": "Override of DSM control",
    "shortTitle": "Override of DSM control",
    "includedInOfficialMethods": [
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "mc-29-level-0",
        "level": 0,
        "officialDescription": "No DSM control"
      },
      {
        "id": "mc-29-level-1",
        "level": 1,
        "officialDescription": "DSM control without the possibility to override this control by the building user (occupant or facility manager)"
      },
      {
        "id": "mc-29-level-2",
        "level": 2,
        "officialDescription": "Manual override and reactivation of DSM control by the building user"
      },
      {
        "id": "mc-29-level-3",
        "level": 3,
        "officialDescription": "Scheduled override of DSM control (and reactivation) by the building user"
      },
      {
        "id": "mc-29-level-4",
        "level": 4,
        "officialDescription": "Scheduled override of DSM control and reactivation with optimised control"
      }
    ],
    "impactScoresByLevel": {
      "mc-29-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-29-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 3,
        "Comfort": -2,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": -1,
        "Information to occupants": -2
      },
      "mc-29-level-2": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-29-level-3": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 1,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      },
      "mc-29-level-4": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 2,
        "Comfort": 0,
        "Convenience": 3,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      }
    }
  },
  {
    "id": "mc-30",
    "code": "MC-30",
    "domain": "Monitoring and control",
    "serviceGroup": "Single platform that allows automated control & coordination between TBS + optimization of energy flow based on occupancy, weather and grid signals",
    "smartReadyService": "Single platform that allows automated control & coordination between TBS + optimization of energy flow based on occupancy, weather and grid signals",
    "shortTitle": "Single platform that allows automated control & coordination between TBS + optimization of energy flow based on occupancy, weather and grid signals",
    "includedInOfficialMethods": [
      "A",
      "B"
    ],
    "triageValue": 1,
    "functionalityLevels": [
      {
        "id": "mc-30-level-0",
        "level": 0,
        "officialDescription": "None"
      },
      {
        "id": "mc-30-level-1",
        "level": 1,
        "officialDescription": "Single platform that allows manual control of multiple TBS"
      },
      {
        "id": "mc-30-level-2",
        "level": 2,
        "officialDescription": "Single platform that allows automated control & coordination between TBS"
      },
      {
        "id": "mc-30-level-3",
        "level": 3,
        "officialDescription": "Single platform that allows automated control & coordination between TBS + optimization of energy flow based on occupancy, weather and grid signals"
      }
    ],
    "impactScoresByLevel": {
      "mc-30-level-0": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 0,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 0,
        "Information to occupants": 0
      },
      "mc-30-level-1": {
        "Energy efficiency": 0,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 1,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      },
      "mc-30-level-2": {
        "Energy efficiency": 1,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 2,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      },
      "mc-30-level-3": {
        "Energy efficiency": 2,
        "Energy flexibility and storage": 0,
        "Comfort": 0,
        "Convenience": 3,
        "Health, well-being and accessibility": 0,
        "Maintenance and fault prediction": 1,
        "Information to occupants": 0
      }
    },
    "applicabilityNote": "Always to be assessed"
  }
];
