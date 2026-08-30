// client/src/features/course/data/questions/section02.questions.ts

import type {
  CourseQuestion,
} from "../../course.types";

/*
 * Section 2 — The SRI Assessment Framework
 *
 * Questions focus on the concepts the learner needs in order to
 * understand and later perform an SRI assessment:
 *
 * - technology-neutral smart-ready services and service catalogues,
 * - Methods A and B,
 * - functionality levels and partial implementation,
 * - impact criteria and their relation to technical domains,
 * - relevance, applicability and functionality level 0,
 * - the calculation chain and weighting logic,
 * - and the interpretation of SRI results and certificate content.
 *
 * Distractors use concepts, categories and distinctions already
 * present in the verified SRI theory rather than invented terminology.
 * Correct-answer positions are intentionally non-patterned. Answer
 * length is allowed to differ naturally when the source-supported
 * concept itself requires a longer formulation.
 *
 * Each lesson quiz uses only the questions assigned to its lesson.
 * The Section 2 Final Test uses the complete pool exported below.
 */

export const sriAssessmentFrameworkOverviewQuestions = [
  {
    id: "assessment-framework-question-01",
    sectionId: "sri-assessment-framework",
    lessonId: "sri-assessment-framework-overview",

    prompt:
      "What does it mean that the SRI methodology is technology-neutral?",

    options: [
      {
        id: "option-a",
        text:
          "It evaluates the energy-performance class instead of the functional capability provided by smart-ready services.",
      },
      {
        id: "option-b",
        text:
          "It assesses only services that interact directly with the electricity grid, regardless of the technical domain.",
      },
      {
        id: "option-c",
        text:
          "It assesses the functional capability provided by a service rather than prescribing a particular technological solution.",
      },
      {
        id: "option-d",
        text:
          "It assigns the same functionality level to services that use the same smart-ready technology.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "The SRI assesses the functional capability provided by a smart-ready service. It does not prescribe a particular technology or technical solution.",
  },

  {
    id: "assessment-framework-question-02",
    sectionId: "sri-assessment-framework",
    lessonId: "sri-assessment-framework-overview",

    prompt:
      "Which set of information is defined by a smart-ready service catalogue?",

    options: [
      {
        id: "option-a",
        text:
          "The services considered in the calculation, their available functionality levels and the corresponding individual impact scores.",
      },
      {
        id: "option-b",
        text:
          "The nine technical domains, the seven impact criteria and the three key functionalities used to structure the methodology.",
      },
      {
        id: "option-c",
        text:
          "The smart readiness class ranges, the certificate validity period and the information included in the certificate.",
      },
      {
        id: "option-d",
        text:
          "The technical-domain weighting factors, the impact-criterion weighting factors and the climatic zone used in the calculation.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "A smart-ready service catalogue defines the smart-ready services considered in the calculation, the functionality levels available for each service and the corresponding individual impact scores.",
  },

  {
    id: "assessment-framework-question-03",
    sectionId: "sri-assessment-framework",
    lessonId: "sri-assessment-framework-overview",

    prompt:
      "How do Method A and Method B differ within the supporting SRI assessment framework?",

    options: [
      {
        id: "option-a",
        text:
          "Method A uses the detailed 54-service catalogue, while Method B uses the simplified 27-service catalogue.",
      },
      {
        id: "option-b",
        text:
          "Method A uses only functionality levels, while Method B uses only impact-criterion scores.",
      },
      {
        id: "option-c",
        text:
          "Method A uses the three key functionalities, while Method B uses the nine technical domains instead.",
      },
      {
        id: "option-d",
        text:
          "Method A uses a simplified 27-service catalogue, while Method B uses a detailed 54-service catalogue.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "Method A contains a simplified list of 27 smart-ready services, while Method B contains the detailed list of 54 services. Both methods follow the same general calculation logic.",
  },
] satisfies readonly CourseQuestion[];

export const functionalityLevelsQuestions = [
  {
    id: "assessment-framework-question-04",
    sectionId: "sri-assessment-framework",
    lessonId: "functionality-levels",

    prompt:
      "What does a functionality level describe in an SRI assessment?",

    options: [
      {
        id: "option-a",
        text:
          "The key impact that a smart-ready service is designed to achieve.",
      },
      {
        id: "option-b",
        text:
          "The level of smart readiness of a specific smart-ready service.",
      },
      {
        id: "option-c",
        text:
          "The importance assigned to a technical domain or impact criterion in the calculation.",
      },
      {
        id: "option-d",
        text:
          "The overall smart readiness rating of the building or building unit.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "A functionality level describes the level of smart readiness of a specific smart-ready service. The selected level determines the predefined impact scores used in the calculation.",
  },

  {
    id: "assessment-framework-question-05",
    sectionId: "sri-assessment-framework",
    lessonId: "functionality-levels",

    prompt:
      "Why are functionality levels described as ordinal and service-specific?",

    options: [
      {
        id: "option-a",
        text:
          "They express the net surface floor-area share assigned to each implementation of a service rather than an ordering of smart readiness.",
      },
      {
        id: "option-b",
        text:
          "They order functionality within each service, but neither equal spacing nor direct comparison between different services should be assumed.",
      },
      {
        id: "option-c",
        text:
          "They are the individual impact scores assigned to each functionality level for the seven impact criteria.",
      },
      {
        id: "option-d",
        text:
          "They are technical-domain weighting factors used to express the influence of each domain on an impact criterion.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Functionality-level numbers indicate an ordered progression within the same service. They do not represent equal numerical distances, and the meaning of a level depends on the service being assessed.",
  },

  {
    id: "assessment-framework-question-06",
    sectionId: "sri-assessment-framework",
    lessonId: "functionality-levels",

    prompt:
      "Which option in the supporting SRI calculation framework can explicitly represent partial implementation of one service at two different functionality levels?",

    options: [
      {
        id: "option-a",
        text:
          "Mark the service Not applicable whenever its functionality level differs between parts of the building.",
      },
      {
        id: "option-b",
        text:
          "Select the highest functionality level that applies to the entire surface area of the building.",
      },
      {
        id: "option-c",
        text:
          "Indicate one functionality level that applies to the most relevant share of the building.",
      },
      {
        id: "option-d",
        text:
          "Split the service between up to two functionality levels and assign shares using net surface floor area.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "The current calculation framework can represent partial implementation through an optional split between up to two functionality levels. The share assigned to each level is determined using the building's net surface floor area.",
  },
] satisfies readonly CourseQuestion[];

export const impactCriteriaQuestions = [
  {
    id: "assessment-framework-question-07",
    sectionId: "sri-assessment-framework",
    lessonId: "impact-criteria",

    prompt:
      "What does an SRI impact criterion describe?",

    options: [
      {
        id: "option-a",
        text:
          "A collection of smart-ready services that together realise a consistent area of building operation.",
      },
      {
        id: "option-b",
        text:
          "The level of smart readiness of an individual smart-ready service.",
      },
      {
        id: "option-c",
        text:
          "A key impact that smart-ready services are designed to achieve.",
      },
      {
        id: "option-d",
        text:
          "A parameter expressing the importance of a technical domain or impact criterion in the calculation.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "An impact criterion describes a key impact that smart-ready services are designed to achieve. The SRI uses seven impact criteria to organise the expected contributions of smart-ready services.",
  },

  {
    id: "assessment-framework-question-08",
    sectionId: "sri-assessment-framework",
    lessonId: "impact-criteria",

    prompt:
      "Which statement correctly groups the seven impact criteria under the three key functionalities?",

    options: [
      {
        id: "option-a",
        text:
          "Energy performance and operation: Energy efficiency, Maintenance and fault prediction; Response to user needs: Comfort, Convenience, Health, well-being and accessibility, Information to occupants; Energy flexibility: Energy flexibility and storage.",
      },
      {
        id: "option-b",
        text:
          "Energy performance and operation: Energy efficiency, Comfort; Response to user needs: Maintenance and fault prediction, Convenience, Health, well-being and accessibility, Information to occupants; Energy flexibility: Energy flexibility and storage.",
      },
      {
        id: "option-c",
        text:
          "Energy performance and operation: Energy efficiency, Maintenance and fault prediction, Energy flexibility and storage; Response to user needs: Comfort, Convenience, Health, well-being and accessibility; Energy flexibility: Information to occupants.",
      },
      {
        id: "option-d",
        text:
          "Energy performance and operation: Energy efficiency, Information to occupants; Response to user needs: Comfort, Convenience, Maintenance and fault prediction, Health, well-being and accessibility; Energy flexibility: Energy flexibility and storage.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Energy performance and operation includes Energy efficiency and Maintenance and fault prediction; Response to user needs includes Comfort, Convenience, Health, well-being and accessibility, and Information to occupants; Energy flexibility includes Energy flexibility and storage.",
  },

  {
    id: "assessment-framework-question-09",
    sectionId: "sri-assessment-framework",
    lessonId: "impact-criteria",

    prompt:
      "How do technical domains and impact criteria differ in the SRI methodology?",

    options: [
      {
        id: "option-a",
        text:
          "Technical domains define the functionality levels of services, while impact criteria define the service catalogues used by Member States.",
      },
      {
        id: "option-b",
        text:
          "Technical domains describe the expected types of impact, while impact criteria organise services by areas of building operation.",
      },
      {
        id: "option-c",
        text:
          "Technical domains define the smart readiness classes, while impact criteria define the functionality levels of individual services.",
      },
      {
        id: "option-d",
        text:
          "Technical domains organise services by areas of building operation, while impact criteria describe the expected types of impact.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "Each service belongs to one technical domain, which represents an area of building operation. Its functionality levels may contribute to several impact criteria, which describe the expected effects of the service.",
  },

  {
    id: "assessment-framework-question-10",
    sectionId: "sri-assessment-framework",
    lessonId: "impact-criteria",

    prompt:
      "What do the predefined impact scores assigned to functionality levels represent?",

    options: [
      {
        id: "option-a",
        text:
          "Ordinal scoring values representing the expected contribution of a functionality level to the impact criteria.",
      },
      {
        id: "option-b",
        text:
          "Normalised domain-by-impact scores comparing achieved and maximum obtainable domain values.",
      },
      {
        id: "option-c",
        text:
          "Net surface floor-area shares used to represent partial implementation at more than one functionality level.",
      },
      {
        id: "option-d",
        text:
          "Technical-domain weighting factors expressing each domain's influence on an impact criterion.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "The predefined impact scores are ordinal scoring values used in the SRI calculation. They represent expected contributions to the impact criteria and are not measured physical performance or percentages of energy savings.",
  },

  {
    id: "assessment-framework-question-11",
    sectionId: "sri-assessment-framework",
    lessonId: "impact-criteria",

    prompt:
      "Which statement correctly distinguishes the impact criteria Comfort and Convenience?",

    options: [
      {
        id: "option-a",
        text:
          "Comfort concerns energy flexibility and storage, while Convenience concerns occupants' perception of thermal, acoustic and visual conditions.",
      },
      {
        id: "option-b",
        text:
          "Comfort concerns maintenance and fault prediction, while Convenience concerns information about building operation provided to occupants.",
      },
      {
        id: "option-c",
        text:
          "Comfort concerns occupants' perception of the physical indoor environment, while Convenience concerns the extent to which services make life easier for occupants.",
      },
      {
        id: "option-d",
        text:
          "Comfort concerns information about building operation provided to occupants, while Convenience concerns maintenance and fault prediction.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Comfort concerns occupants' conscious and unconscious perception of the physical indoor environment, including thermal, acoustic and visual aspects. Convenience concerns the extent to which services make life easier for occupants, for example by reducing manual interactions required to control technical building systems.",
  },
] satisfies readonly CourseQuestion[];

export const fromAssessmentToScoreQuestions = [
  {
    id: "assessment-framework-question-12",
    sectionId: "sri-assessment-framework",
    lessonId: "from-assessment-to-score",

    prompt:
      "What is the difference between a service that is Not applicable and a service assessed at functionality level 0?",

    options: [
      {
        id: "option-a",
        text:
          "Not applicable means no functionality level is assessed; Level 0 is the lowest defined functionality level of a service that is assessed.",
      },
      {
        id: "option-b",
        text:
          "Not applicable means Level 0 is assigned automatically; Level 0 then remains part of the functionality-level assessment.",
      },
      {
        id: "option-c",
        text:
          "Not applicable and Level 0 both mean that the service has no assessed functionality and is omitted from the calculation.",
      },
      {
        id: "option-d",
        text:
          "Not applicable is the lowest functionality level, while Level 0 is used only for services in absent mandatory domains.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "Not applicable means that the service is not assessed and no functionality level is assigned. Level 0 is an assessed functionality level for a service implemented at its lowest defined level of smart readiness.",
  },

  {
    id: "assessment-framework-question-13",
    sectionId: "sri-assessment-framework",
    lessonId: "from-assessment-to-score",

    prompt:
      "Which statement correctly describes a technical domain that is absent but mandatory in the supporting SRI calculation framework?",

    options: [
      {
        id: "option-a",
        text:
          "The domain is treated as present, so its services are assessed at Level 0 and contribute to both achieved and maximum obtainable scores.",
      },
      {
        id: "option-b",
        text:
          "No installed functionality is assessed, but relevant services may remain in the maximum obtainable score under the applicable assessment rules.",
      },
      {
        id: "option-c",
        text:
          "The domain is treated as absent and not mandatory, so its services are omitted from both achieved and maximum obtainable scores.",
      },
      {
        id: "option-d",
        text:
          "Its services are assigned their maximum functionality levels for both achieved and maximum obtainable scores.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "When a domain is absent but mandatory, no installed functionality is available to assess. Relevant services may still be taken into account in the maximum obtainable score according to the applicable assessment rules.",
  },

  {
    id: "assessment-framework-question-14",
    sectionId: "sri-assessment-framework",
    lessonId: "from-assessment-to-score",

    prompt:
      "Which sequence correctly describes the main SRI calculation flow after functionality levels have been linked to their predefined impact scores?",

    options: [
      {
        id: "option-a",
        text:
          "Impact-criterion scores → domain-impact scores → technical-domain weighting → key-functionality scores → total SRI score.",
      },
      {
        id: "option-b",
        text:
          "Domain-impact scores → key-functionality scores → technical-domain weighting → impact-criterion scores → total SRI score.",
      },
      {
        id: "option-c",
        text:
          "Domain-impact scores → technical-domain weighting → impact-criterion scores → key-functionality scores → total SRI score.",
      },
      {
        id: "option-d",
        text:
          "Technical-domain weighting → domain-impact scores → key-functionality scores → impact-criterion scores → total SRI score.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Service impact scores are aggregated into achieved and maximum obtainable domain-impact scores. Technical-domain weighting is then used to derive impact-criterion scores, which are aggregated into key-functionality scores and finally into the total SRI score.",
  },

  {
    id: "assessment-framework-question-15",
    sectionId: "sri-assessment-framework",
    lessonId: "from-assessment-to-score",

    prompt:
      "How is the smart readiness score for an impact criterion obtained?",

    options: [
      {
        id: "option-a",
        text:
          "By comparing the unweighted achieved domain-impact total with the unweighted maximum obtainable domain-impact total.",
      },
      {
        id: "option-b",
        text:
          "By comparing the weighted achieved domain-impact total with the corresponding weighted maximum obtainable domain-impact total.",
      },
      {
        id: "option-c",
        text:
          "By calculating a weighted average of the already normalised domain-by-impact percentages.",
      },
      {
        id: "option-d",
        text:
          "By selecting the highest normalised domain-by-impact percentage among the technical domains.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "Technical-domain weighting factors are applied separately to the achieved and maximum obtainable domain-impact contributions. The impact-criterion score compares the resulting weighted achieved total with the corresponding weighted maximum obtainable total.",
  },

  {
    id: "assessment-framework-question-16",
    sectionId: "sri-assessment-framework",
    lessonId: "from-assessment-to-score",

    prompt:
      "What does the total SRI percentage express?",

    options: [
      {
        id: "option-a",
        text:
          "The proportion of services in the selected smart-ready service catalogue that are present in the building.",
      },
      {
        id: "option-b",
        text:
          "The average of the functionality-level numbers selected for the smart-ready services included in the assessment.",
      },
      {
        id: "option-c",
        text:
          "The ratio between achieved and maximum obtainable scores for one technical-domain and impact-criterion combination.",
      },
      {
        id: "option-d",
        text:
          "The ratio between the building's smart readiness and the maximum smart readiness it could reach.",
      },
    ],

    correctOptionId: "option-d",

    explanation:
      "The total SRI percentage expresses the achieved smart readiness of the building or building unit relative to the maximum obtainable smart readiness for that assessment.",
  },
] satisfies readonly CourseQuestion[];

export const understandingSriResultsQuestions = [
  {
    id: "assessment-framework-question-17",
    sectionId: "sri-assessment-framework",
    lessonId: "understanding-sri-results",

    prompt:
      "How do the smart readiness class and the total smart readiness score differ?",

    options: [
      {
        id: "option-a",
        text:
          "The class provides the overall rating through one of seven classes, while the total score may provide the corresponding numerical percentage.",
      },
      {
        id: "option-b",
        text:
          "The class is the percentage for each impact criterion, while the total score is the rating assigned to each technical domain.",
      },
      {
        id: "option-c",
        text:
          "The class is the detailed domain-by-impact result, while the total score contains only the three key-functionality scores.",
      },
      {
        id: "option-d",
        text:
          "The class reports the building's energy-performance class, while the total score reports its smart readiness class.",
      },
    ],

    correctOptionId: "option-a",

    explanation:
      "The smart readiness class provides the overall rating through one of seven classes. The total score may also be included to provide the numerical percentage associated with the result.",
  },

  {
    id: "assessment-framework-question-18",
    sectionId: "sri-assessment-framework",
    lessonId: "understanding-sri-results",

    prompt:
      "What additional information is provided by disaggregated SRI results?",

    options: [
      {
        id: "option-a",
        text:
          "They replace the total SRI result with the functionality level selected for every individual smart-ready service.",
      },
      {
        id: "option-b",
        text:
          "They show only which technical domains were present, absent but mandatory, or absent and not mandatory.",
      },
      {
        id: "option-c",
        text:
          "They show how smart readiness is distributed across key functionalities, impact criteria and technical domains.",
      },
      {
        id: "option-d",
        text:
          "They replace the smart readiness class with the energy-performance class from the building's energy-performance certificate.",
      },
    ],

    correctOptionId: "option-c",

    explanation:
      "Disaggregated scores provide a more detailed smart readiness profile across the three key functionalities, the impact criteria and, where presented, technical domains or domain-by-impact combinations.",
  },

  {
    id: "assessment-framework-question-19",
    sectionId: "sri-assessment-framework",
    lessonId: "understanding-sri-results",

    prompt:
      "Which result information is included in the SRI certificate under the methodology implemented in this course?",

    options: [
      {
        id: "option-a",
        text:
          "The total smart readiness score, the score of every technical domain and every selected service functionality level, all as mandatory certificate information.",
      },
      {
        id: "option-b",
        text:
          "The smart readiness class, the three key-functionality scores and the score for each impact criterion.",
      },
      {
        id: "option-c",
        text:
          "The energy-performance class, the nine technical-domain scores and the functionality level of every assessed service.",
      },
      {
        id: "option-d",
        text:
          "Only the smart readiness class and the total smart readiness score, without scores for key functionalities or impact criteria.",
      },
    ],

    correctOptionId: "option-b",

    explanation:
      "The certificate includes the smart readiness class, the scores for the three key functionalities and the score for each impact criterion. The total score and the domain-by-impact breakdown may also be included optionally.",
  },
] satisfies readonly CourseQuestion[];

/**
 * Section 2 questions grouped by the lesson
 * that introduces the assessed concepts.
 */
export const assessmentFrameworkQuestionsByLesson = {
  "sri-assessment-framework-overview":
    sriAssessmentFrameworkOverviewQuestions,

  "functionality-levels":
    functionalityLevelsQuestions,

  "impact-criteria":
    impactCriteriaQuestions,

  "from-assessment-to-score":
    fromAssessmentToScoreQuestions,

  "understanding-sri-results":
    understandingSriResultsQuestions,
} satisfies Record<
  string,
  readonly CourseQuestion[]
>;

/**
 * Complete Section 2 question pool.
 *
 * The Section 2 Final Test uses this full pool.
 */
export const assessmentFrameworkQuestionPool = [
  ...sriAssessmentFrameworkOverviewQuestions,
  ...functionalityLevelsQuestions,
  ...impactCriteriaQuestions,
  ...fromAssessmentToScoreQuestions,
  ...understandingSriResultsQuestions,
] satisfies readonly CourseQuestion[];
