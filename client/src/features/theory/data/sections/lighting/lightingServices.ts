import type { TheoryServiceBlock } from "../../../types/theory.types";

/**
 * Source policy for the Lighting domain:
 *
 * - Service codes, service titles, catalogue membership, functionality levels
 *   and applicability / assessment conditions are cross-checked across the
 *   SRI Final Report, the SRI Calculation Sheet v4.5 and the corresponding
 *   SRI2MARKET Lighting material.
 *
 * - The SRI Calculation Sheet v4.5 provides the main operational reference for
 *   the current catalogue membership and assessment conditions. These are
 *   cross-checked against the Final Report and SRI2MARKET where the supporting
 *   material clarifies their technical meaning.
 *
 * - Service purposes, detailed functionality-level explanations, technical
 *   examples and service images are based primarily on the corresponding
 *   SRI2MARKET Lighting material and are cross-checked against the
 *   consolidated catalogue definitions.
 *
 * - No single source is copied mechanically when wording differs. Apparent
 *   inconsistencies are resolved by comparing the catalogue structure,
 *   operational assessment conditions and the technical meaning supported by
 *   the available sources.
 *
 * - The Calculation Sheet lists both Lighting services as "Always to be
 *   assessed". This is an assessment rule and is not presented as a technical
 *   applicability condition.
 */

import l1aLevel0Image from "../../../../../assets/theory/section-7/services/l1a/level-0.png";
import l1aLevel1Image from "../../../../../assets/theory/section-7/services/l1a/level-1.png";
import l1aLevel2Image from "../../../../../assets/theory/section-7/services/l1a/level-2.png";
import l1aLevel3Image from "../../../../../assets/theory/section-7/services/l1a/level-3.png";

import l2Level0Image from "../../../../../assets/theory/section-7/services/l2/level-0.png";
import l2Level1Image from "../../../../../assets/theory/section-7/services/l2/level-1.png";
import l2Level2Image from "../../../../../assets/theory/section-7/services/l2/level-2.png";
import l2Level3Image from "../../../../../assets/theory/section-7/services/l2/level-3.png";
import l2Level4Image from "../../../../../assets/theory/section-7/services/l2/level-4.png";

/**
 * L1a — Occupancy Control for Indoor Lighting
 *
 * Included in Catalogues A and B.
 */
export const l1aServiceBlock = {
  id: "lighting-service-l1a",
  type: "service",
  serviceCode: "L1a",
  title: "Occupancy Control for Indoor Lighting",
  catalogue: "catalogues-a-and-b",
  purpose:
    "The purpose of this service is to control the electrical energy consumption of the lighting system in order to prevent luminaires from being switched on when spaces are unoccupied. The control function is applied to luminaires at room level.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-lighting-l1a",
  ],
  info: "Image source: SRI2MARKET, Lighting service L1a.",
  levels: [
    {
      id: "lighting-l1a-level-0",
      level: 0,
      title: "Manual on/off switch",
      description:
        "Lighting control is entirely manual. Luminaires are switched on and off using the on/off switches in the room.",
      image: {
        id: "lighting-l1a-level-0-image",
        src: l1aLevel0Image,
        alt: "Manual room switch used to turn indoor luminaires on and off.",
      },
    },
    {
      id: "lighting-l1a-level-1",
      level: 1,
      title:
        "Manual on/off switch with an additional sweeping extinction signal",
      description:
        "Luminaires are switched on and off using manual room switches. In addition, the lighting system includes at least one automatic switch-off function that operates at least once per day.",
      image: {
        id: "lighting-l1a-level-1-image",
        src: l1aLevel1Image,
        alt:
          "Manual room lighting control combined with an additional automatic switch-off function.",
      },
      examples: [
        "In tertiary buildings, the automatic switch-off can be scheduled to switch off all luminaires in the afternoon when no users are present in the building.",
        "A timer can be used so that luminaires switch off automatically after a defined period.",
      ],
    },
    {
      id: "lighting-l1a-level-2",
      level: 2,
      title: "Automatic detection (auto on / dimmed or auto off)",
      description:
        "Automatic detection is used. The service can be implemented either through automatic switch-on followed by dimming and automatic switch-off, or through automatic switch-on followed by automatic switch-off.",
      image: {
        id: "lighting-l1a-level-2-image",
        src: l1aLevel2Image,
        alt:
          "Occupancy detection used for automatic switch-on, dimming or switch-off of indoor lighting.",
      },
      examples: [
        "With automatic switch-on and dimming, the control system switches the lights on when the area is occupied, reduces their brightness 10 minutes after occupants leave the zone, and switches them off completely 20 minutes after the last occupant leaves.",
        "With automatic switch-on and automatic switch-off, the control system switches the lights on when the area is occupied and switches them off completely 10 minutes after all occupants leave the zone.",
      ],
    },
    {
      id: "lighting-l1a-level-3",
      level: 3,
      title: "Automatic detection (manual on / dimmed or auto off)",
      description:
        "Lighting is switched on manually or through partial automatic activation based on presence detection. If it is not switched off manually, the control system dims the lighting or switches it off automatically according to occupancy, and all luminaires are switched off 20 minutes after the room is last occupied.",
      image: {
        id: "lighting-l1a-level-3-image",
        src: l1aLevel3Image,
        alt:
          "Presence detection combined with manual switch-on, dimming or automatic switch-off.",
      },
    },
  ],
} satisfies TheoryServiceBlock;

/**
 * L2 — Control Artificial Lighting Power Based on Daylight Levels
 *
 * Included in Catalogue B.
 */
export const l2ServiceBlock = {
  id: "lighting-service-l2",
  type: "service",
  serviceCode: "L2",
  title: "Control Artificial Lighting Power Based on Daylight Levels",
  catalogue: "catalogue-b",
  purpose:
    "The purpose of this service is to control the electrical energy consumption of the lighting system in order to prevent luminaires from being switched on, or to adjust their brightness, according to the daylight available in the rooms, thereby making use of daylight as a freely available natural resource.",
  sourceRefs: [
    "sri-final-report-2020",
    "sri-calculation-sheet-v45",
    "sri2market-lighting-l2",
  ],
  info: "Image source: SRI2MARKET, Lighting service L2.",
  levels: [
    {
      id: "lighting-l2-level-0",
      level: 0,
      title: "Manual control at central level",
      description:
        "A single central control or switch manages the lighting of the whole building. No manual switches are provided in individual rooms or zones.",
      image: {
        id: "lighting-l2-level-0-image",
        src: l2Level0Image,
        alt:
          "One central manual control used to manage the lighting of the whole building.",
      },
    },
    {
      id: "lighting-l2-level-1",
      level: 1,
      title: "Manual control per room or zone",
      description:
        "Manual control is available for switching off luminaires separately by room or zone.",
      image: {
        id: "lighting-l2-level-1-image",
        src: l2Level1Image,
        alt:
          "Separate manual lighting controls for individual rooms or lighting zones.",
      },
    },
    {
      id: "lighting-l2-level-2",
      level: 2,
      title: "Automatic switching",
      description:
        "Luminaires are switched off automatically when sufficient daylight is available to meet the minimum lighting requirements, and they are switched on when daylight is not sufficient.",
      image: {
        id: "lighting-l2-level-2-image",
        src: l2Level2Image,
        alt:
          "Daylight sensor used to switch artificial lighting automatically on or off.",
      },
    },
    {
      id: "lighting-l2-level-3",
      level: 3,
      title: "Automatic dimming",
      description:
        "Luminaires are dimmed and eventually switched off completely when daylight is available. They switch on again and their brightness increases when the amount of daylight decreases.",
      image: {
        id: "lighting-l2-level-3-image",
        src: l2Level3Image,
        alt:
          "Artificial lighting dimmed automatically according to the amount of available daylight.",
      },
    },
    {
      id: "lighting-l2-level-4",
      level: 4,
      title: "Automatic dimming including scene-based light control",
      description:
        "Automatic dimming is combined with scene-based light control. During time intervals, dynamic and adapted lighting scenes are set, for example in terms of illuminance level, different correlated colour temperature (CCT), and the possibility of changing the light distribution within the space according to design, human needs and visual tasks.",
      image: {
        id: "lighting-l2-level-4-image",
        src: l2Level4Image,
        alt:
          "Scene-based lighting control used to adjust illuminance, correlated colour temperature and light distribution.",
      },
    },
  ],
} satisfies TheoryServiceBlock;
