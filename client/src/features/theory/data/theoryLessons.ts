// client/src/features/theory/data/theoryLessons.ts

import type { TheoryLesson } from "../types/theory.types";

import expectedAdvantagesSmartTechnologiesImage from "../../../assets/theory/section-1/lesson-1/expected-advantages-smart-technologies.png";
import threeKeyFunctionalitiesImage from "../../../assets/theory/section-1/lesson-2/3_key_functionalities.png";

import domainsStructuringSriCatalogueImage from "../../../assets/theory/section-2/lesson-1/domains-structuring-sri-catalogue.png";
import functionalityLevelsHeatEmissionControlImage from "../../../assets/theory/section-2/lesson-2/functionality-levels-heat-emission-control.png";
import sevenImpactCategoriesSriImage from "../../../assets/theory/section-2/lesson-3/seven-impact-categories-sri.png";

import triageProcessImage from "../../../assets/theory/section-2/lesson-4/triage-process.png";
import serviceRelevanceWithinDomainImage from "../../../assets/theory/section-2/lesson-4/service-relevance-within-domain.png";
import normalisationDomainScoreImage from "../../../assets/theory/section-2/lesson-4/normalisation-domain-score.png";
import impactScoresMatrixImage from "../../../assets/theory/section-2/lesson-4/impact-scores-matrix.png";
import domainScoreServiceScoresImage from "../../../assets/theory/section-2/lesson-4/domain-score-service-scores.png";
import weightingFactorMixedApproachImage from "../../../assets/theory/section-2/lesson-4/weighting-factor-mixed-approach.png";

import smartReadinessClassScaleImage from "../../../assets/theory/section-2/lesson-5/smart-readiness-class-scale.png";
import sriResultsSummaryExampleImage from "../../../assets/theory/section-2/lesson-5/sri-results-summary-example.png";
import sriResultsMatrixExampleImage from "../../../assets/theory/section-2/lesson-5/sri-results-matrix-example.png";

import { heatingLessons } from "./sections/heating/heatingLessons";
import { coolingLessons } from "./sections/cooling/coolingLessons";
import { dhwLessons } from "./sections/dhw/dhwLessons";
import { ventilationLessons } from "./sections/ventilation/ventilationLessons";
import { lightingLessons } from "./sections/lighting/lightingLessons";
import { deLessons } from "./sections/de/deLessons";
import { electricityLessons } from "./sections/electricity/electricityLessons";
import { evLessons } from "./sections/ev/evLessons";
import { mcLessons } from "./sections/mc/mcLessons";

export const theoryLessons = [
  {
    id: "what-is-the-smart-readiness-indicator",
    sectionId: "introduction-to-sri",
    order: 1,
    title: "Smart Readiness Indicator (SRI)",
    question: "Why is a common indicator for smart readiness needed?",
    previousLessonId: null,
    nextLessonId: "smart-readiness-in-buildings",
    blocks: [
      {
        id: "why-smart-readiness-is-needed",
        type: "text",
        title: "Why smart readiness is needed",
        body: "Smart technologies in buildings can be a cost-effective means of supporting healthier and more comfortable indoor conditions, reducing energy use and carbon impact, and facilitating the integration of renewable energy sources into future energy systems. To support consistent, transparent and comparable ratings of smart readiness across the European Union, a common definition of the Smart Readiness Indicator and a common calculation methodology were established.",
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
        ],
      },
      {
        id: "expected-advantages-smart-technologies",
        type: "image",
        title: "Expected advantages of smart technologies",
        image: {
          id: "expected-advantages-smart-technologies",
          src: expectedAdvantagesSmartTechnologiesImage,
          alt: "Expected advantages of smart technologies in buildings",
          caption:
            "Figure 1 – Expected advantages of smart technologies in buildings",
          info: "Source: SRI Final Report, Figure 1, Summary p. 3.",
        },
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "what-sri-communicates",
        type: "text",
        title: "What the SRI communicates",
        body:
          "The Smart Readiness Indicator is used within an optional common European Union scheme to rate and communicate the smart readiness of a building or building unit. It can be applied to both existing buildings and new building projects across the building types covered by the scheme.\n\nThe assessment examines the capabilities of the building or building unit to adapt its operation to the needs of occupants and the grid and to improve its energy efficiency and overall in-use performance. The SRI also helps make the added value of building smartness more tangible for building users, owners, tenants and smart service providers.",
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
        ],
      },
      {
        id: "sri-and-energy-performance-note",
        type: "note",
        title: "SRI and energy performance",
        body:
          "The SRI does not provide an energy-performance rating for a building. Smart readiness and energy performance are distinct aspects of a building, although smart-ready capabilities can support improvements in energy performance. The SRI therefore complements, rather than replaces, energy performance certificates and other tools that assess aspects such as energy performance or sustainability.",
        sourceRefs: ["delegated-regulation-2020-2155"],
      },
      {
        id: "lesson-1-key-takeaway",
        type: "takeaway",
        title: "Key takeaway",
        body: "The SRI provides a common way to rate and communicate the smart readiness of buildings and building units. It focuses on their smart capabilities and complements, rather than replaces, the assessment of energy performance.",
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
        ],
      },
    ],
  },
  {
    id: "smart-readiness-in-buildings",
    sectionId: "introduction-to-sri",
    order: 2,
    title: "Smart Readiness in Buildings",
    question: "What makes a building smart-ready?",
    previousLessonId: "what-is-the-smart-readiness-indicator",
    nextLessonId: "sri-assessment-framework-overview",
    blocks: [
      {
        id: "smart-readiness-definition",
        type: "text",
        title: "Building smartness and smart readiness",
        body: "A building demonstrates smartness when the building or its systems can sense, interpret, communicate and actively respond in an efficient manner to changing conditions. These conditions may relate to the operation of technical building systems, the external environment, including energy grids, or the needs of building occupants. Readiness refers to the capability of a technology, system or building to implement smart functions and services. For example, a controllable heat pump can be smart-ready without yet being smart if it is not connected to a controller or does not provide a configuration interface. Within the SRI methodology, smart readiness reflects the capabilities of a building or building unit to adapt its operation to the needs of occupants and the grid and to improve its energy efficiency and overall in-use performance.",
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
        ],
      },
      {
        id: "key-functionalities-intro",
        type: "text",
        title: "Three key functionalities",
        body: "The SRI organises smart readiness around three key functionalities. Energy performance and operation concerns the ability to maintain the building's energy efficiency performance and operation by adapting its energy consumption, for example to make use of energy from renewable sources. Response to user needs concerns the ability to adapt the building's operation to occupants' needs while considering user-friendliness, maintaining healthy indoor climate conditions and providing information about energy use. Energy flexibility concerns the flexibility of the building's overall electricity demand, including its ability to enable participation in active and passive, as well as implicit and explicit, demand response in relation to the grid, for example through demand-side flexibility and load shifting.",
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
        ],
      },
      {
        id: "three-key-functionalities-image",
        type: "image",
        title: "Key functionalities of smart readiness",
        image: {
          id: "three-key-functionalities",
          src: threeKeyFunctionalitiesImage,
          alt: "Three key functionalities of smart readiness: energy performance and operation, response to user needs, and energy flexibility",
          info: "Adapted from: Practical Guide SRI Calculation Framework v4.5, Figure 1 — upper part showing the three key functionalities of smart readiness.",
        },
        sourceRefs: [
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "assessment-framework-preview",
        type: "text",
        title: "From smart readiness to assessment",
        body: "The SRI methodology considers smart-ready services that are present in a building or building unit, planned at the design stage, or otherwise relevant to it. Within the selected service catalogue, a triage process is used to adapt the assessment to the specific building, taking account of the status of the relevant technical domains and service-specific applicability conditions. Services that are not relevant or applicable do not require a functionality-level assessment, while the methodology defines how such cases are treated in the calculation.\n\nFor each service to be assessed, the corresponding functionality level is identified. The services are organised into technical domains and evaluated in relation to impact criteria, while weighting factors are used to calculate the smart readiness scores. These elements and the calculation process are explained in the next section.",
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "lesson-2-key-takeaway",
        type: "takeaway",
        title: "Key takeaway",
        body: "Smart readiness reflects the capabilities that allow a building and its systems to respond to changing conditions and adapt their operation to the needs of occupants and the grid. The SRI considers these capabilities through three key functionalities: energy performance and operation, response to user needs, and energy flexibility.",
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
        ],
      },
    ],
  },
  {
    id: "sri-assessment-framework-overview",
    sectionId: "sri-assessment-framework",
    order: 1,
    title: "The SRI Assessment Framework",
    question: "What does the SRI assessment framework evaluate?",
    previousLessonId: "smart-readiness-in-buildings",
    nextLessonId: "functionality-levels",
    blocks: [
      {
        id: "methodology-structure",
        type: "text",
        title: "Methodology structure",
        body: "The Smart Readiness Indicator uses a structured multi-criteria framework to assess the smart readiness of a building or building unit. The assessment considers smart-ready services that are present, planned at the design stage or relevant to the particular building or building unit.\n\nWithin the selected smart-ready service catalogue, a triage process adapts the assessment to the specific building, taking account of the status of the relevant technical domains and service-specific applicability conditions. Services that are not relevant or applicable do not require a functionality-level assessment, while the methodology defines how such cases are treated in the calculation. For each service to be assessed, the corresponding functionality level is identified.\n\nA smart-ready service is a function or an aggregation of functions provided by one or more technical components or systems. It makes use of smart-ready technologies and orchestrates them into higher-level functions. The methodology is technology-neutral: it assesses the functional capability provided by a service rather than prescribing a particular technological solution.\n\nThe services are organised into technical domains, and each functionality level is associated with individual scores for the impact criteria. These elements are combined through the calculation methodology to produce an overall smart readiness score and rating, together with disaggregated smart readiness scores across technical domains, impact criteria and key functionalities.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "sri-methodology-overview-path",
        type: "path",
        steps: [
          {
            id: "smart-ready-services",
            title: "Smart-ready services",
            description:
              "Identify the services to be assessed.",
            icon: "ListChecks",
            accent: "purple",
          },
          {
            id: "functionality-levels",
            title: "Functionality levels",
            description:
              "Determine the level of each assessed service.",
            icon: "SlidersHorizontal",
            accent: "blue",
          },
          {
            id: "impact-scores",
            title: "Impact scores",
            description:
              "Link each level to its predefined impact scores.",
            icon: "Link2",
            accent: "amber",
          },
          {
            id: "domain-scores",
            title: "Domain scores",
            description:
              "Calculate achieved and maximum scores by domain and impact criterion.",
            icon: "Calculator",
            accent: "green",
          },
          {
            id: "weighting-factors",
            title: "Weighting factors",
            description:
              "Apply weighting factors to aggregate the scores.",
            icon: "Scale",
            accent: "purple",
          },
          {
            id: "sri-result",
            title: "SRI result",
            description:
              "Derive the overall score, rating and disaggregated scores.",
            icon: "Gauge",
            accent: "blue",
          },
        ],
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "service-catalogue",
        type: "text",
        title: "Smart-ready service catalogue",
        body: "The smart-ready services used in an assessment are defined in a smart-ready service catalogue. The catalogue specifies the services considered in the calculation, the functionality levels available for each service and the corresponding individual scores for the impact criteria.\n\nMember States implementing the SRI scheme make at least one smart-ready service catalogue available as the basis for identifying and assessing services. They may also provide several catalogues, for example for different building types. The definition and any subsequent update of the catalogues should reflect the current state of the art of smart-ready technologies.",
        sourceRefs: ["delegated-regulation-2020-2155"],
      },
      {
        id: "method-a-method-b-intro",
        type: "text",
        title: "Methods A and B",
        body: "Two consolidated service catalogues are available in the SRI calculation framework: Method A and Method B. Method A contains a simplified list of smart-ready services, while Method B contains the detailed list.\n\nBoth methods follow the same general calculation logic: the services to be assessed are identified, their functionality levels are determined and the corresponding impact scores are used in the calculation.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-practical-guide-v45",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "method-a-method-b-cards",
        type: "cards",
        variant: "method",
        cards: [
          {
            id: "method-a",
            title: "Method A",
            eyebrow: "Simplified catalogue · 27 services",
            description:
              "Mainly oriented towards small buildings with low complexity and generally requiring less assessment effort and expertise.",
            accent: "blue",
          },
          {
            id: "method-b",
            title: "Method B",
            eyebrow: "Detailed catalogue · 54 services",
            description:
              "Mainly oriented towards buildings with higher complexity and supporting a more detailed assessment.",
            accent: "green",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "sri-practical-guide-v45",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "method-c-worth-knowing",
        type: "note",
        title: "Possible future Method C",
        body: "A possible future Method C would be based on measured in-use building performance. This concept is distinct from the possible automation of Methods A and B, in which technical building systems could report their functionality levels automatically. Method C would go further by quantifying the actual performance of a building during use. It would require suitable benchmarks to determine how outcomes such as energy savings, demand-side flexibility and comfort improvements are delivered. Method C is not part of the current service-catalogue calculation framework and is presented only as a possible future evolution of the SRI.",
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "technical-domains",
        type: "text",
        title: "Technical domains",
        body: "The smart-ready services are structured into nine technical domains. Each domain groups services that work together within one coherent area of building operation, such as heating or lighting. The nine domains are heating, cooling, domestic hot water, ventilation, lighting, dynamic building envelope, electricity, electric vehicle charging, and monitoring and control.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "domains-structuring-sri-catalogue",
        type: "image",
        title: "Domains structuring the catalogue",
        image: {
          id: "domains-structuring-sri-catalogue",
          src: domainsStructuringSriCatalogueImage,
          alt: "The nine technical domains structuring the SRI service catalogue",
          caption: "Figure 7 – Domains structuring the SRI catalogue",
          info: "Source: SRI Final Report, Figure 7, Summary p. 18.",
        },
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "lesson-1-key-takeaway",
        type: "takeaway",
        title: "Key takeaway",
        body: "The SRI assesses the functional capabilities provided by smart-ready services rather than prescribing particular technologies. The services are defined in catalogues, organised into technical domains, assessed through functionality levels and associated with impact scores that contribute to the smart readiness results.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
    ],
  },
  {
    id: "functionality-levels",
    sectionId: "sri-assessment-framework",
    order: 2,
    title: "Functionality Levels",
    question: "How does the SRI show that a service is more or less smart?",
    previousLessonId: "sri-assessment-framework-overview",
    nextLessonId: "impact-criteria",
    blocks: [
      {
        id: "service-smartness",
        type: "text",
        title: "Service smartness",
        body: "Each smart-ready service can be implemented at different functionality levels. A functionality level describes the level of smart readiness of a specific smart-ready service. In the consolidated service catalogues for Methods A and B, each service is described through two to five functionality levels.\n\nA higher functionality level reflects a smarter implementation of the same service and generally provides more beneficial impacts to building users or to the energy grid than a lower functionality level.\n\nThe smart-ready service catalogue defines the available functionality levels for each service and the corresponding individual scores for the impact criteria. During an assessment, the corresponding functionality level is selected for each assessed service. Each selected functionality level determines which predefined impact scores are used in the calculation.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "functionality-levels-heat-emission-control",
        type: "image",
        title: "Functionality level example",
        image: {
          id: "functionality-levels-heat-emission-control",
          src: functionalityLevelsHeatEmissionControlImage,
          alt: "Example table showing the functionality levels and impact scores of the heat emission control service",
          caption: "Functionality levels for one smart-ready service",
          info: "Source: SRI2MARKET, smart-ready service catalogue example H-1a, heat emission control.",
        },
        sourceRefs: ["sri2market-service-catalogue"],
      },
      {
        id: "reading-the-functionality-level-example",
        type: "text",
        title: "Reading the example",
        body: "The example shows the different functionality levels defined for the heat emission control service. As the level increases, the implementation of the service becomes smarter. Each level is also associated with individual scores for the impact criteria, representing the expected contribution of that service level to the impacts considered by the SRI. The impact criteria are explained in the next lesson.",
        sourceRefs: [
          "sri2market-service-catalogue",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "ordinal-functionality-levels",
        type: "text",
        title: "Ordinal functionality levels",
        body: "Functionality levels are expressed as ordinal numbers. They indicate an order from a less smart to a smarter implementation of the same service, but they do not represent exact or equal numerical distances between levels.\n\nThe level numbers cannot be directly compared quantitatively from one service to another. Each service has its own functionality-level descriptions, and the meaning of a particular level depends on the service being assessed.",
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "partial-implementation-note",
        type: "note",
        title: "Partial implementation",
        body: "A service may not meet the same functionality level throughout an entire building. By default, the selected functionality level is assumed to apply to the whole building. The highest functionality level that applies to the entire surface area should therefore normally be selected. Alternatively, the functionality level that applies to the most relevant share of the building may be indicated.\n\nPartial implementation may also be represented through an optional split between up to two functionality levels for the same service. The share assigned to each functionality level is determined using the building's net surface floor area. The current calculation framework accommodates a maximum of two functionality levels per service.",
        sourceRefs: [
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "lesson-2-key-takeaway",
        type: "takeaway",
        title: "Key takeaway",
        body: "Functionality levels describe how smartly a specific service is implemented. They are ordinal and service-specific, and each selected functionality level determines which predefined impact scores are used in the SRI calculation. Where implementation varies across the building, up to two functionality levels can be represented using shares of the net surface floor area.",
        sourceRefs: [
          "sri-final-report-2020",
          "sri-practical-guide-v45",
          "sri-calculation-sheet-v45",
        ],
      },
    ],
  },
  {
    id: "impact-criteria",
    sectionId: "sri-assessment-framework",
    order: 3,
    title: "Impact Criteria",
    question: "What kinds of impacts does the SRI consider?",
    previousLessonId: "functionality-levels",
    nextLessonId: "from-assessment-to-score",
    blocks: [
      {
        id: "impact-criteria-introduction",
        type: "text",
        title: "Impact criteria",
        body: "Smart-ready services may contribute to several expected impacts on the building, its occupants and the energy system. The SRI uses seven impact criteria to organise these different types of contribution.\n\nAn impact criterion describes a key impact that smart-ready services are designed to achieve. The criteria provide a common structure for relating smart-ready services and their functionality levels to their expected effects.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "impact-criteria-grouping",
        type: "text",
        title: "Grouping of impact criteria",
        body: "The seven impact criteria are distributed across the three key functionalities of smart readiness. Energy performance and operation is associated with energy efficiency and maintenance and fault prediction. Response to user needs is associated with comfort, convenience, health, well-being and accessibility, and information to occupants. Energy flexibility is associated with energy flexibility and storage.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "seven-impact-categories-image",
        type: "image",
        title: "Seven impact criteria",
        image: {
          id: "seven-impact-categories-sri",
          src: sevenImpactCategoriesSriImage,
          alt: "The seven impact criteria of the Smart Readiness Indicator grouped under the three key functionalities",
          caption: "Figure 1 – Seven impact categories of the SRI",
          info: "Source: Practical Guide SRI Calculation Framework v4.5, Figure 1, p. 6.",
        },
        sourceRefs: ["sri-practical-guide-v45"],
      },
      {
        id: "impact-criteria-explanations",
        type: "cards",
        variant: "impact-details",
        title: "What each impact criterion describes",
        cards: [
          {
            id: "energy-efficiency-description",
            title: "Energy efficiency",
            description:
              "This criterion refers to the impacts of smart-ready services on energy-saving capabilities. It considers the contribution made by smart-ready technologies, for example through better control of room-temperature settings, rather than the building's overall energy performance.",
            accent: "amber",
          },
          {
            id: "maintenance-description",
            title: "Maintenance and fault prediction",
            description:
              "This criterion refers to automated fault detection and diagnosis and their potential to improve the maintenance and operation of technical building systems, including by identifying inefficient operation.",
            accent: "green",
          },
          {
            id: "comfort-description",
            title: "Comfort",
            description:
              "This criterion refers to the impacts of services on occupants' conscious and unconscious perception of the physical indoor environment, including thermal comfort, acoustic comfort and visual performance, such as sufficient lighting without glare.",
            accent: "blue",
          },
          {
            id: "convenience-description",
            title: "Convenience",
            description:
              "This criterion refers to the extent to which services make life easier for occupants, for example by reducing the manual interactions required to control technical building systems.",
            accent: "purple",
          },
          {
            id: "health-description",
            title: "Health, well-being and accessibility",
            description:
              "This criterion refers to the impacts of smart-ready services on occupants' health, well-being and accessibility. For example, smarter controls may improve indoor air quality compared with traditional controls, thereby supporting occupants' well-being and health.",
            accent: "rose",
          },
          {
            id: "information-description",
            title: "Information to occupants",
            description:
              "This criterion refers to the impacts of services on the provision of information about the building's operation to occupants.",
            accent: "cyan",
          },
          {
            id: "flexibility-description",
            title: "Energy flexibility and storage",
            description:
              "This criterion refers to the impacts of services on the building's energy-flexibility potential, including the ability to store energy and shift loads in time. Its scope is not limited to electricity grids and also includes flexibility offered to district heating and cooling grids.",
            accent: "green",
          },
        ],
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
        ],
      },
      {
        id: "impact-criteria-and-service-scores",
        type: "text",
        title: "Impact criteria and service scores",
        body: "For each functionality level of a smart-ready service, the service catalogue assigns corresponding individual scores for the impact criteria. These scores represent the expected contribution of that functionality level to each criterion. These predefined impact scores are ordinal scoring values used in the SRI calculation; they do not represent measured physical performance or percentages of energy savings or other impacts.\n\nEach smart-ready service is organised within one technical domain, while its functionality levels may be assigned scores for several impact criteria. Technical domains and impact criteria therefore form two distinct dimensions of the SRI methodology: technical domains organise services according to areas of building operation, while impact criteria describe the types of expected impact considered in the assessment.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "lesson-3-key-takeaway",
        type: "takeaway",
        title: "Key takeaway",
        body: "The SRI uses seven impact criteria to describe the expected contributions of smart-ready services. Each impact criterion belongs to one of the three key functionalities, while the services themselves are organised within technical domains.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
    ],
  },
  {
    id: "from-assessment-to-score",
    sectionId: "sri-assessment-framework",
    order: 4,
    title: "From Assessment to Score",
    question: "How does the SRI assessment become a score?",
    previousLessonId: "impact-criteria",
    nextLessonId: "understanding-sri-results",
    blocks: [
      {
        id: "calculation-process",
        type: "text",
        title: "Calculation process",
        body: "The SRI score is not produced from a single answer. It is built step by step from the assessment of smart-ready services. For each service to be assessed, the assessor determines the corresponding functionality level. That level is linked to predefined impact scores, which are then aggregated and weighted through the structure of technical domains, impact criteria and key functionalities.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "assessment-steps",
        type: "stepsGrid",
        steps: [
          {
            id: "identify-applicable-services",
            title: "Identify services to be assessed",
            description:
              "Identify which smart-ready services are to be assessed for the building or building unit.",
            icon: "ListChecks",
            accent: "purple",
          },
          {
            id: "select-functionality-levels",
            title: "Select functionality levels",
            description:
              "Select the corresponding functionality level for each service to be assessed.",
            icon: "SlidersHorizontal",
            accent: "blue",
          },
          {
            id: "link-levels-to-impact-scores",
            title: "Link levels to impact scores",
            description:
              "Link each selected functionality level to the corresponding impact scores.",
            icon: "Link2",
            accent: "amber",
          },
          {
            id: "calculate-domain-scores",
            title: "Calculate domain impact scores",
            description:
              "Aggregate service impact scores to obtain the achieved and maximum obtainable scores for each technical domain and impact criterion.",
            icon: "Calculator",
            accent: "green",
          },
          {
            id: "apply-weighting-factors",
            title: "Apply weighting factors",
            description:
              "Apply technical-domain weighting factors to derive impact-criterion scores, then aggregate the results into key-functionality and total SRI scores.",
            icon: "Scale",
            accent: "purple",
          },
          {
            id: "derive-sri-results",
            title: "Derive SRI results",
            description:
              "Derive the total and disaggregated smart readiness scores.",
            icon: "Gauge",
            accent: "blue",
          },
        ],
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "step-1-identify-applicable-services",
        type: "text",
        title: "Step 1:\u00A0\u00A0Identify services to be assessed",
        body: "The first step is to identify which smart-ready services need to be assessed for the building or building unit. This depends on the selected service catalogue, the status of the relevant technical domains and any applicability conditions defined for the individual services.\n\nSome services are applicable only when a particular technical system or component is present. For example, a service related to domestic hot water storage requires a storage vessel, while a service related to heat-recovery control requires a heat-recovery system. Other services may not be relevant because of the building's design, use, climate or site-specific conditions.\n\nA service that is Not applicable is not assessed and is not assigned a functionality level. This is different from functionality level 0: Level 0 is an assessed functionality level for a service that is applicable, but is implemented at the lowest defined level of smart readiness.\n\nIn the following example, service E is not considered relevant and is therefore not assessed.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-practical-guide-v45",
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "triage-process",
        type: "image",
        title: "Triage process",
        image: {
          id: "triage-process",
          src: triageProcessImage,
          alt: "Figure 14 showing the triage process where service E is not considered relevant for the building and is not inspected",
          caption: "Figure 14 – Visualisation of triage process",
          info: "Source: SRI Final Report, Figure 14, Summary p. 24.",
        },
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "treatment-of-absent-services",
        type: "text",
        title: "How absent services are treated",
        body: "The triage process adapts the assessment to the specific building context. Some services may not be relevant or applicable to the building and can therefore be omitted, while other services may be absent but still remain relevant to the assessment and the maximum obtainable score.\n\nThe treatment of an absent or Not applicable service depends on the status of the relevant technical domain, the service-specific applicability conditions and the applicable assessment rules. This allows the assessment to reflect the specific conditions of the building without unfairly penalising it for services that are not relevant.",
        sourceRefs: [
          "sri-final-report-2020",
          "delegated-regulation-2020-2155",
          "sri-practical-guide-v45",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "domains-present-note",
        type: "note",
        title: "Domain status",
        body: "A technical domain may be present, absent but mandatory, or absent and not mandatory.\n\nWhen a domain is present, the services that require assessment are evaluated according to their functionality levels.\n\nWhen a domain is absent and not mandatory, its services are not assessed and do not contribute to the maximum obtainable score.\n\nWhen a domain is absent but mandatory, no installed functionality is available to assess, but relevant services may still be taken into account in the maximum obtainable score according to the applicable assessment rules.\n\nWhether an absent domain is considered mandatory depends on the applicable assessment context and implementation rules.",
        sourceRefs: [
          "sri-practical-guide-v45",
          "sri-final-report-2020",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "step-2-select-functionality-levels",
        type: "text",
        title: "Step 2:\u00A0\u00A0Select functionality levels",
        body: "For each smart-ready service to be assessed, the assessor identifies the corresponding functionality level. This may be determined through inspection, technical documentation, available building information, or other assessment procedures depending on the applicable implementation pathway.\n\nThe following visual shows services within an applicable technical domain being scored according to their selected functionality levels.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-practical-guide-v45",
          "sri-final-report-2020",
        ],
      },
      {
        id: "service-scoring",
        type: "image",
        title: "Service scoring",
        image: {
          id: "service-relevance-within-domain",
          src: serviceRelevanceWithinDomainImage,
          alt: "Edited visual showing applicable services within a technical domain being scored according to their selected functionality levels",
          caption:
            "Edited visual based on Figure 16 – Summary of the calculation method",
          info: "Adapted from: SRI Final Report, Figure 16, Summary p. 26.",
        },
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "assessment-note",
        type: "note",
        title: "Assessment scheme",
        body: "In a formal SRI scheme, an assessment used to issue an SRI certificate must be carried out by a qualified or accredited expert in accordance with the applicable national requirements. In this learning platform, users work through a simulated assessment to understand and apply the methodology; it does not constitute an official SRI certification assessment.",
        sourceRefs: ["implementing-regulation-2020-2156"],
      },
      {
        id: "step-3-link-levels-to-impact-scores",
        type: "text",
        title: "Step 3:\u00A0\u00A0Link levels to impact scores",
        body: "Once the functionality level of a smart-ready service is selected, the service catalogue links that level to individual scores for the impact criteria. These scores represent the expected contribution of that functionality level to impact criteria such as energy efficiency, comfort, information to occupants and energy flexibility and storage.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-practical-guide-v45",
          "sri-final-report-2020",
        ],
      },
      {
        id: "impact-scores-matrix",
        type: "image",
        title: "Impact scores",
        image: {
          id: "impact-scores-matrix",
          src: impactScoresMatrixImage,
          alt: "Figure 9 showing a matrix of impact scores for the seven impact criteria and functionality levels",
          caption:
            "Figure 9 – Matrix displaying the impact scores for the seven impact categories",
          info: "Source: SRI Final Report, Figure 9, Summary p. 20.",
        },
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "negative-impact-scores",
        type: "note",
        title: "Negative impact scores",
        body:
          "Impact scores may be positive, zero or negative. Negative values are used when a particular functionality level is considered to have an adverse effect on a specific impact criterion. In the predefined SRI scoring matrix, EV-16 receives a score of −2 for Energy flexibility and storage at functionality level 0, because uncontrolled electric-vehicle charging is considered worse for energy flexibility than having no electric-vehicle charging at all. MC-29 receives negative scores at functionality level 1 for Comfort (−2), Maintenance and fault prediction (−1), and Information to occupants (−2), because demand-side management without a user override is considered worse for those impact criteria than having no demand-side management control.",
        sourceRefs: [
          "sri-practical-guide-v45",
          "sri-calculation-sheet-v45",
        ],
      },
      {
        id: "step-4-calculate-domain-scores",
        type: "text",
        title: "Step 4:\u00A0\u00A0Calculate domain impact scores",
        body: "The predefined impact scores of the services are aggregated within each technical domain for every impact criterion to obtain an achieved domain impact score. A corresponding maximum obtainable domain impact score is also determined for the same domain and impact criterion. Their ratio may be expressed as a normalised domain-by-impact score.\n\nThe calculation framework adapts the maximum obtainable score to the building context, so the benchmark is not necessarily the theoretical maximum of the complete service catalogue.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "domain-score-service-scores",
        type: "image",
        title: "Domain scoring",
        image: {
          id: "domain-score-service-scores",
          src: domainScoreServiceScoresImage,
          alt: "Figure 11 showing how a domain score is based on the individual service scores relevant to that domain",
          caption:
            "Figure 11 – Domain score based on individual service scores",
          info: "Source: SRI Final Report, Figure 11, Summary p. 21.",
        },
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "normalisation-domain-score",
        type: "image",
        title: "Normalised domain score",
        image: {
          id: "normalisation-domain-score",
          src: normalisationDomainScoreImage,
          alt: "Figure 15 showing the normalisation of a domain score using the achieved score and maximum obtainable score",
          caption: "Figure 15 – Normalisation of the domain score",
          info: "Source: SRI Final Report, Figure 15, Summary p. 25.",
        },
        sourceRefs: ["sri-final-report-2020"],
      },
      {
        id: "step-5-apply-weighting-factors",
        type: "text",
        title: "Step 5:\u00A0\u00A0Apply weighting factors",
        body: "Technical-domain weighting factors are applied separately for each impact criterion to the achieved and maximum obtainable domain impact scores. The smart readiness score for an impact criterion is obtained by comparing the weighted achieved total with the corresponding weighted maximum obtainable total. For each impact criterion, the technical-domain weighting factors sum to 100%.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-practical-guide-v45",
          "sri-final-report-2020",
        ],
      },
      {
        id: "weighting-levels-note",
        type: "note",
        title: "Weighting and aggregation",
        body:
          "Weighting is used at successive levels of the SRI methodology. First, technical-domain weighting factors are used in calculating the score for each impact criterion by weighting the achieved and maximum obtainable contributions of the technical domains. The resulting impact-criterion scores are then aggregated through the relevant weighting factors to derive scores for the three key functionalities. The key-functionality scores are then combined through the relevant weighting factors to derive the total SRI score.\n\nIn the calculation framework used here, equal overall weights are assigned to the three key functionalities, and the relevant impact criteria within each key functionality receive equal shares. These are default weighting choices used in this framework rather than universally fixed values of the SRI methodology.\n\nFor technical-domain weighting, the standard mixed approach combines fixed weights, equally distributed weights and weights based on the climatic zone's energy balance. Weighting factors may be adapted within the applicable implementation framework to reflect relevant conditions such as building type and climate.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
        ],
      },
      {
        id: "weighting-factor-mixed-approach",
        type: "image",
        title: "Weighting approach",
        image: {
          id: "weighting-factor-mixed-approach",
          src: weightingFactorMixedApproachImage,
          alt: "Figure 7 showing the mixed approach for weighting factors with fixed weights, equal weights and energy balance weights",
          caption: "Figure 7 – Summary of the weighting factor mixed approach",
          info: "Source: Smart Readiness Indicator (SRI) Tutorial SRI Calculation Sheet v4.5, p. 17.",
        },
        sourceRefs: ["sri-practical-guide-v45"],
      },
      {
        id: "step-6-derive-sri-results",
        type: "text",
        title: "Step 6:\u00A0\u00A0Derive SRI results",
        body: "The calculation produces a smart readiness score for each impact criterion from the weighted achieved and maximum obtainable contributions. These scores are then aggregated into scores for the three key functionalities: energy performance and operation, response to user needs and energy flexibility, and into the total SRI score. Domain-by-impact percentages may also be presented as disaggregated results.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-practical-guide-v45",
          "sri-final-report-2020",
        ],
      },
      {
        id: "score-meaning",
        type: "text",
        title: "What the percentage means",
        body: "The total SRI percentage expresses the achieved smart readiness of the building or building unit relative to the maximum obtainable smart readiness for that assessment. A higher percentage indicates that the building is closer to that maximum.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "lesson-4-key-takeaway",
        type: "takeaway",
        title: "Key takeaway",
        body: "The SRI score is built through a multi-criteria calculation process. The assessment first identifies which services need to be assessed and distinguishes Not applicable from functionality level 0. A functionality level is then determined for each service that is assessed and linked to predefined impact scores.\n\nServices that are not relevant may be omitted so that they do not unfairly affect the result. However, some services that are not assessed may still remain relevant to the maximum obtainable score according to the technical domain status and the applicable assessment rules.\n\nService impact scores are aggregated into achieved and maximum obtainable scores for each technical domain and impact criterion. Technical-domain weighting is then used to derive the impact-criterion scores, which are further aggregated into key-functionality scores and the total SRI score. Normalised domain-by-impact scores may also be presented as disaggregated results.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
          "sri-practical-guide-v45",
          "sri-calculation-sheet-v45",
        ],
      },
    ],
  },
  {
    id: "understanding-sri-results",
    sectionId: "sri-assessment-framework",
    order: 5,
    title: "Understanding SRI Results",
    question: "How are SRI results communicated?",
    previousLessonId: "from-assessment-to-score",
    nextLessonId: "heating-overview",
    blocks: [
      {
        id: "result-as-summary-and-breakdown",
        type: "text",
        title: "Result as summary and breakdown",
        body: "The SRI communicates smart readiness at several levels. At the most aggregated level, the smart readiness class provides an overall indication for the building or building unit. More detailed scores show how smart readiness is distributed across the three key functionalities, the impact criteria and the technical domains.\n\nThe overall class provides a concise result, while the disaggregated scores provide more detailed information about different areas of building operation and different types of impact.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "smart-readiness-class-and-score",
        type: "text",
        title: "Smart readiness class and total score",
        body: "The smart readiness rating is expressed through seven smart readiness classes, ranging from the highest to the lowest level of smart readiness. Each class corresponds to a defined range of total smart readiness scores.\n\nThe smart readiness class is included in the SRI certificate. The total smart readiness score may also be included, providing the percentage associated with the result. The class therefore provides the overall rating, while the total score can provide additional numerical detail.",
        sourceRefs: ["delegated-regulation-2020-2155"],
      },
      {
        id: "smart-readiness-class-scale",
        type: "image",
        title: "Smart readiness class scale",
        image: {
          id: "smart-readiness-class-scale",
          src: smartReadinessClassScaleImage,
          alt: "Scale showing the seven smart readiness class ranges from 90–100% to less than 20%",
          caption: "Smart readiness class ranges",
          info: "Based on: Commission Delegated Regulation (EU) 2020/2155, Annex VIII.",
        },
        sourceRefs: ["delegated-regulation-2020-2155"],
      },
      {
        id: "results-by-key-functionality",
        type: "text",
        title: "Results by key functionality",
        body: "The SRI results include scores for the three key functionalities of smart readiness: energy performance and operation, response to user needs, and energy flexibility. These scores show how the building's smart readiness is distributed across the three main purposes addressed by the SRI.\n\nThe following example presents a total SRI result together with the three key-functionality scores. It therefore shows both the aggregated result and its breakdown across the three key functionalities.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "sri-results-summary-example",
        type: "image",
        title: "Overall result and key functionality scores",
        image: {
          id: "sri-results-summary-example",
          src: sriResultsSummaryExampleImage,
          alt: "Example showing a total SRI score and scores for the three key functionalities",
          caption:
            "Example of total SRI result and scores by key functionality",
          info: "Source: SRI2MARKET, SRI Results.",
        },
        sourceRefs: ["sri2market-results"],
      },
      {
        id: "detailed-result-breakdown",
        type: "text",
        title: "Detailed result breakdown",
        body: "Beyond the overall class and the scores for the three key functionalities, SRI results include a smart readiness score for each impact criterion. Scores for each technical domain and impact criterion may also be presented as an optional, more detailed breakdown.\n\nThis breakdown follows the structure of the SRI methodology. Smart-ready services are organised within technical domains, while their functionality levels are associated with scores for the impact criteria. Presenting results across both dimensions shows how different areas of building operation and different types of impact contribute to the assessment.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "sri-results-matrix-example",
        type: "image",
        title: "Scores by domain and impact criterion",
        image: {
          id: "sri-results-matrix-example",
          src: sriResultsMatrixExampleImage,
          alt: "Detailed SRI result matrix showing scores by technical domain and impact criterion",
          caption:
            "Example of SRI scores by technical domain and impact criterion",
          info: "Source: SRI2MARKET, SRI Results.",
          presentation: "wide",
        },
        sourceRefs: ["sri2market-results"],
      },
      {
        id: "why-detailed-results-matter",
        type: "text",
        title: "Why detailed results matter",
        body: "Detailed results allow the SRI to be read not only as an overall class, but also as a profile across key functionalities, impact criteria and technical domains.\n\nThe disaggregated scores can support further analysis by showing the areas in which smart readiness is higher or lower. These areas can then be examined in greater detail when considering possible improvements.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
      {
        id: "certificate-information",
        type: "text",
        title: "Certificate information",
        body: "The SRI certificate includes a unique certificate identifier, its date of issue and date of expiry, and informational text explaining the scope of the SRI, particularly in relation to energy performance certificates. It also provides general information about the building or building unit, including its type, surface area, year of construction and, where relevant, renovation, and location. Where available, the energy performance class from a valid energy performance certificate is also included.\n\nThe certificate includes the smart readiness class, the scores for the three key functionalities and the score for each impact criterion. The total smart readiness score and the scores for each technical domain and impact criterion may be included optionally.\n\nWhere possible, the certificate includes available information on connectivity, interoperability, cybersecurity and data protection, including relevant information on conformity with commonly agreed standards and related risks. It may also include recommendations for improving smart readiness, taking account of the building's heritage value where relevant, and additional information about assumptions used in the calculation.",
        sourceRefs: ["delegated-regulation-2020-2155"],
      },
      {
        id: "result-context-note",
        type: "note",
        title: "Result context",
        body: "The certificate reflects the smart readiness of the building or building unit at the date of issuance. Its validity may not exceed ten years. Where a significant change to the building or its systems would have affected the initial smart readiness assessment, a new certificate is recommended.\n\nAs noted earlier, the SRI should be read together with, rather than instead of, energy performance information.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "implementing-regulation-2020-2156",
        ],
      },
      {
        id: "lesson-5-key-takeaway",
        type: "takeaway",
        title: "Key takeaway",
        body: "SRI results communicate smart readiness at several levels. The smart readiness class provides the overall rating, while the total score may provide the corresponding percentage. Scores for the three key functionalities and the impact criteria, together with optional scores by technical domain and impact criterion, provide a more detailed view of the building's smart readiness profile.",
        sourceRefs: [
          "delegated-regulation-2020-2155",
          "sri-final-report-2020",
        ],
      },
    ],
  },
  ...heatingLessons,
  ...coolingLessons,
  ...dhwLessons,
  ...ventilationLessons,
  ...lightingLessons,
  ...deLessons,
  ...electricityLessons,
  ...evLessons,
  ...mcLessons,
] satisfies readonly TheoryLesson[];
