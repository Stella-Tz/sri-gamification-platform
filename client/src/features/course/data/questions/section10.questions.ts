// client/src/features/course/data/questions/section10.questions.ts

import type {
  CourseQuestion,
} from "../../course.types";

/*
 * Section 10 — Electric Vehicle Charging
 *
 * Questions focus on the concepts required to understand
 * the Electric Vehicle Charging domain and recognise its
 * smart-ready services and functionality levels in a later
 * SRI assessment.
 *
 * The quizzes do not require memorisation of service codes.
 * Service codes may appear as supporting context together
 * with the corresponding service title or concept.
 *
 * Questions focus primarily on:
 *
 * - the scope of the Electric Vehicle Charging domain,
 * - catalogue membership and service applicability,
 * - the distinction between the three EV services,
 * - and recognition of their functionality-level progressions.
 *
 * Contextual technical information that is not central to
 * the SRI assessment is not used as quiz material.
 *
 * Distractors use concepts and functionality levels that
 * exist in the SRI theory rather than invented terminology.
 *
 * Each lesson quiz uses only the questions assigned
 * to its corresponding lesson.
 *
 * The Electric Vehicle Charging Final Test uses the complete
 * question pool exported at the bottom of this file.
 */

/* -------------------------------------------------------------------------- */
/* Lesson 1 — Electric Vehicle Charging Overview                              */
/* -------------------------------------------------------------------------- */

export const electricVehicleChargingOverviewQuestions = [
  {
    id: "electric-vehicle-charging-question-01",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "electric-vehicle-charging-overview",

    prompt:
      "Which set of smart-ready services belongs to the Electric Vehicle Charging domain?",

    options: [
      {
        id: "option-a",
        text:
          "Heating control, cooling control and lighting control.",
      },
      {
        id: "option-b",
        text:
          "Local-generation reporting, storage of locally generated electricity and self-consumption optimisation.",
      },
      {
        id: "option-c",
        text:
          "Charging capacity, charging grid balancing, and charging information and connectivity.",
      },
      {
        id: "option-d",
        text:
          "Energy-storage reporting, electricity-consumption reporting and (micro)grid operation.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "The Electric Vehicle Charging domain contains three smart-ready services: EV Charging Capacity, EV Charging Grid Balancing, and EV Charging Information and Connectivity.",
  },

  {
    id: "electric-vehicle-charging-question-02",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "electric-vehicle-charging-overview",

    prompt:
      "How do the applicability conditions differ between EV Charging Capacity (EV15), EV Charging Grid Balancing (EV16), and EV Charging Information and Connectivity (EV17)?",

    options: [
      {
        id: "option-a",
        text:
          "EV15 requires on-site parking, while EV16 and EV17 require at least one on-site parking space with a recharging point.",
      },
      {
        id: "option-b",
        text:
          "EV15 requires at least one recharging point, while EV16 and EV17 require only on-site parking.",
      },
      {
        id: "option-c",
        text:
          "All three services are applicable whenever public parking is available near the building.",
      },
      {
        id: "option-d",
        text:
          "All three services require more than 50% of the on-site parking spaces to have recharging points.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "EV15 is applicable when parking is available on site. EV16 and EV17 are applicable when at least one on-site parking space provides a recharging point. Public parking is not considered on-site parking.",
  },

  {
    id: "electric-vehicle-charging-question-03",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "electric-vehicle-charging-overview",

    prompt:
      "How are EV Charging Capacity (EV15), EV Charging Grid Balancing (EV16), and EV Charging Information and Connectivity (EV17) included in the SRI catalogues?",

    options: [
      {
        id: "option-a",
        text:
          "EV15 is included in A and B, while EV16 and EV17 are included only in B.",
      },
      {
        id: "option-b",
        text:
          "EV15 is included only in B, while EV16 and EV17 are included in A and B.",
      },
      {
        id: "option-c",
        text:
          "EV15 and EV16 are included in A and B, while EV17 is included only in B.",
      },
      {
        id: "option-d",
        text:
          "EV15, EV16 and EV17 are all included in both Catalogues A and B.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "EV Charging Capacity (EV15), EV Charging Grid Balancing (EV16), and EV Charging Information and Connectivity (EV17) are all included in Catalogues A and B.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 2 — EV Charging Capacity                                            */
/* -------------------------------------------------------------------------- */

export const evChargingCapacityQuestions = [
  {
    id: "electric-vehicle-charging-question-04",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-capacity",

    prompt:
      "What do the SRI functionality levels of EV Charging Capacity (EV15) assess?",

    options: [
    {
      id: "option-a",
      text:
        "They distinguish uncontrolled, one-way controlled and two-way controlled charging.",
    },
    {
      id: "option-b",
      text:
        "They assess the availability of electric-vehicle charging infrastructure at the building.",
    },
    {
      id: "option-c",
      text:
        "They distinguish no charging information, charging-status information, and automatic identification and authorisation.",
    },
    {
      id: "option-d",
      text:
        "They describe technical EV charging classifications such as charging levels, power characteristics and cable types.",
    },
  ],

    correctOptionId: "option-b",

    explanation:
      "EV15 functionality levels assess the availability of EV charging infrastructure at the building. Technical EV charging levels, power characteristics and cable classifications are separate classifications and must not be confused with the SRI functionality levels.",
  },

  {
    id: "electric-vehicle-charging-question-05",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-capacity",

    prompt:
      "Which charging provision corresponds to Level 1 of EV Charging Capacity (EV15)?",

    options: [
      {
        id: "option-a",
        text:
          "No electric-vehicle charging availability is present.",
      },
      {
        id: "option-b",
        text:
          "Recharging points are provided for 0–9% of the parking spaces.",
      },
      {
        id: "option-c",
        text:
          "Ducting or a simple power plug is available.",
      },
      {
        id: "option-d",
        text:
          "Recharging points are provided for more than 50% of the parking spaces.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "EV15 Level 1 corresponds to ducting or a simple power plug being available. Percentage-based recharging-point coverage begins at Level 2.",
  },

  {
    id: "electric-vehicle-charging-question-06",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-capacity",

    prompt:
      "Recharging points are installed at 30% of a building's on-site parking spaces. Which functionality level of EV Charging Capacity (EV15) does this represent?",

    options: [
      {
        id: "option-a",
        text: "Level 1",
      },
      {
        id: "option-b",
        text: "Level 2",
      },
      {
        id: "option-c",
        text: "Level 3",
      },
      {
        id: "option-d",
        text: "Level 4",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "EV15 Level 3 applies when 10–50% of the building's parking spaces are equipped with recharging points.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 3 — EV Charging Grid Balancing                                      */
/* -------------------------------------------------------------------------- */

export const evChargingGridBalancingQuestions = [
  {
    id: "electric-vehicle-charging-question-07",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-grid-balancing",

    prompt:
      "What characterises Level 0 of EV Charging Grid Balancing (EV16)?",

    options: [
      {
        id: "option-a",
        text:
          "Charging is uncontrolled and no control signals are applied to the charging process.",
      },
      {
        id: "option-b",
        text:
          "Charging is one-way controlled using grid signals and the desired departure time.",
      },
      {
        id: "option-c",
        text:
          "Charging is two-way controlled and the vehicle can provide electricity to the grid.",
      },
      {
        id: "option-d",
        text:
          "Charging-status information is reported to the occupant.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "At EV16 Level 0, charging is uncontrolled and no control signals are applied to the charging of the vehicle.",
  },

  {
    id: "electric-vehicle-charging-question-08",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-grid-balancing",

    prompt:
      "How does one-way controlled charging at Level 1 of EV Charging Grid Balancing (EV16) operate?",

    options: [
      {
        id: "option-a",
        text:
          "Charging remains uncontrolled and no control signals are applied.",
      },
      {
        id: "option-b",
        text:
          "Electricity flows from the grid to the vehicle, while communication signals can be used to optimise charging.",
      },
      {
        id: "option-c",
        text:
          "Energy flows in both directions so that the vehicle can supply electricity to the grid.",
      },
      {
        id: "option-d",
        text:
          "Charging-status information is combined with automatic driver identification and authorisation.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "At EV16 Level 1, electricity flows from the grid to the electric vehicle. Charging can be optimised using communication signals such as renewable-energy availability, electricity pricing, electricity demand and desired departure time.",
  },

  {
    id: "electric-vehicle-charging-question-09",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-grid-balancing",

    prompt:
      "What distinguishes Level 2 from Level 1 in EV Charging Grid Balancing (EV16)?",

    options: [
      {
        id: "option-a",
        text:
          "Ducting or a simple power plug becomes available for EV charging.",
      },
      {
        id: "option-b",
        text:
          "Charging-status information is reported to the occupant.",
      },
      {
        id: "option-c",
        text:
          "Charging becomes one-way controlled using communication signals.",
      },
      {
        id: "option-d",
        text:
          "Charging becomes two-way controlled, allowing the vehicle to provide electricity to the grid.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "EV16 Level 2 represents two-way controlled charging, also referred to as Vehicle-to-Grid or V2G. Energy can flow in both directions, allowing the vehicle to provide electricity to the grid when beneficial.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Lesson 4 — EV Charging Information and Connectivity                       */
/* -------------------------------------------------------------------------- */

export const evChargingInformationAndConnectivityQuestions = [
  {
    id: "electric-vehicle-charging-question-10",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-information-and-connectivity",

    prompt:
      "An on-site charging point provides charging-status information and automatic identification and authorisation of the driver. Its charging process is also one-way controlled using communication signals. For EV Charging Information and Connectivity (EV17) and EV Charging Grid Balancing (EV16), which combination of functionality levels is represented?",

    options: [
      {
        id: "option-a",
        text: "EV17 Level 2 and EV16 Level 1.",
      },
      {
        id: "option-b",
        text: "EV17 Level 1 and EV16 Level 2.",
      },
      {
        id: "option-c",
        text: "EV17 Level 2 and EV16 Level 0.",
      },
      {
        id: "option-d",
        text: "EV17 Level 0 and EV16 Level 1.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "EV17 Level 2 combines charging-status information with automatic identification and authorisation of the driver. EV16 Level 1 represents one-way controlled charging using communication signals.",
  },

  {
    id: "electric-vehicle-charging-question-11",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-information-and-connectivity",

    prompt:
      "What is provided at Level 1 of EV Charging Information and Connectivity (EV17)?",

    options: [
      {
        id: "option-a",
        text:
          "Charging-status information is reported to the occupant.",
      },
      {
        id: "option-b",
        text:
          "No charging information is available.",
      },
      {
        id: "option-c",
        text:
          "Charging-status information is combined with automatic driver identification and authorisation.",
      },
      {
        id: "option-d",
        text:
          "Two-way Vehicle-to-Grid energy flow is provided.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "At EV17 Level 1, information about EV charging status is reported to the occupant, for example through indicators at the recharging point or connected applications.",
  },

  {
    id: "electric-vehicle-charging-question-12",
    sectionId: "electric-vehicle-charging-domain",
    lessonId: "ev-charging-information-and-connectivity",

    prompt:
      "What is added at Level 2 of EV Charging Information and Connectivity (EV17) compared with Level 1?",

    options: [
      {
        id: "option-a",
        text:
          "Recharging points are provided for 0–9% of the parking spaces.",
      },
      {
        id: "option-b",
        text:
          "Automatic identification and authorisation of the driver at the charging station are added.",
      },
      {
        id: "option-c",
        text:
          "Charging becomes one-way controlled according to communication signals.",
      },
      {
        id: "option-d",
        text:
          "Recharging points are provided for more than 50% of the parking spaces.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "EV17 Level 2 retains charging-status information and adds automatic identification and authorisation of the driver at the charging station through an ISO 15118-compliant connection.",
  },
] satisfies readonly CourseQuestion[];

/* -------------------------------------------------------------------------- */
/* Questions grouped by lesson                                                */
/* -------------------------------------------------------------------------- */

export const electricVehicleChargingQuestionsByLesson = {
  "electric-vehicle-charging-overview":
    electricVehicleChargingOverviewQuestions,

  "ev-charging-capacity":
    evChargingCapacityQuestions,

  "ev-charging-grid-balancing":
    evChargingGridBalancingQuestions,

  "ev-charging-information-and-connectivity":
    evChargingInformationAndConnectivityQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/* -------------------------------------------------------------------------- */
/* Complete Section 10 question pool                                          */
/* -------------------------------------------------------------------------- */

export const electricVehicleChargingQuestionPool = [
  ...electricVehicleChargingOverviewQuestions,
  ...evChargingCapacityQuestions,
  ...evChargingGridBalancingQuestions,
  ...evChargingInformationAndConnectivityQuestions,
] satisfies readonly CourseQuestion[];