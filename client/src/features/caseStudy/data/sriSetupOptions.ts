// client/src/features/caseStudy/data/sriSetupOptions.ts

import type {
  BuildingState,
  BuildingType,
  BuildingUsage,
  ClimateZone,
  DomainPresence,
  OfficialAssessmentMethod,
  SelectOption,
} from "../types/caseStudy.types";

import { sriSupportedCountries } from "./sriClimateZones";

export const buildingTypeOptions: SelectOption<BuildingType>[] = [
  {
    value: "residential",
    label: "Residential",
  },
  {
    value: "non-residential",
    label: "Non-residential",
  },
];

export const buildingUsageOptionsByType: Record<
  BuildingType,
  SelectOption<BuildingUsage>[]
> = {
      residential: [
      {
        value: "single-family-house",
        label: "Single-family house",
      },
      {
        value: "small-multi-family-house",
        label: "Small multi-family house",
      },
      {
        value: "large-multi-family-house",
        label: "Large multi-family house",
      },
      {
        value: "residential-other",
        label: "Other",
      },
    ],

    "non-residential": [
    {
      value: "office",
      label: "Office",
    },
    {
      value: "educational-buildings",
      label: "Educational",
    },
    {
      value: "healthcare",
      label: "Healthcare",
    },
    {
      value: "non-residential-other",
      label: "Other",
    },
  ],
};

export const buildingStateOptions: SelectOption<BuildingState>[] = [
  {
    value: "original",
    label: "Original",
    description:
      "The building has not undergone important energetic upgrades since construction.",
  },
  {
    value: "renovated",
    label: "Renovated",
    description:
      "The building has undergone important energetic upgrades, such as thermal insulation or technical building system improvements.",
  },
];

export const locationOptions: SelectOption<string>[] = [
  ...sriSupportedCountries,
]
  .sort((a, b) => a.localeCompare(b))
  .map((country) => ({
    value: country,
    label: country,
  }));

export const assessmentMethodOptions: SelectOption<OfficialAssessmentMethod>[] =
  [
    {
      value: "A",
      label: "Method A — simplified",
      description:
        "Official simplified SRI assessment method using a reduced set of smart-ready services.",
    },
    {
      value: "B",
      label: "Method B — detailed",
      description:
        "Official detailed SRI assessment method using the complete set of smart-ready services.",
    },
  ];

export const domainPresenceOptions: SelectOption<DomainPresence>[] = [
  {
    value: "present",
    label: "Present",
    description:
      "The technical domain is present in the building and its applicable services can be assessed.",
  },
  {
    value: "absent-mandatory",
    label: "Absent but mandatory",
    description:
      "The technical domain is absent, but it is treated as mandatory. Its relevant services are included in the maximum obtainable score.",
  },
  {
    value: "absent-not-mandatory",
    label: "Absent and not mandatory",
    description:
      "The technical domain is absent and not mandatory. It is excluded from the assessment scope.",
  },
];

export const getClimateZoneLabel = (
  climateZone: ClimateZone | "",
): string => {
  switch (climateZone) {
    case "northern-europe":
      return "North Europe";

    case "western-europe":
      return "West Europe";

    case "southern-europe":
      return "South Europe";

    case "north-eastern-europe":
      return "North-East Europe";

    case "south-eastern-europe":
      return "South-East Europe";

    default:
      return "Not determined";
  }
};

export const getBuildingUsageLabel = (
  buildingUsage: BuildingUsage,
) => {
  const option = [
    ...buildingUsageOptionsByType
      .residential,

    ...buildingUsageOptionsByType[
      "non-residential"
    ],
  ].find(
    (item) =>
      item.value === buildingUsage,
  );

  return option?.label ?? buildingUsage;
};