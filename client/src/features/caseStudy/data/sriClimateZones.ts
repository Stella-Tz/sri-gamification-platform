// client/src/features/caseStudy/data/sriClimateZones.ts

import type { ClimateZone } from "../types/caseStudy.types";

export const sriCountriesByClimateZone = {
  "northern-europe": [
    "Denmark",
    "Finland",
    "Sweden",
    "Norway",
    "Iceland",
  ],

  "western-europe": [
    "Austria",
    "Belgium",
    "France",
    "Germany",
    "Ireland",
    "Luxembourg",
    "Netherlands",
    "United Kingdom",
    "Liechtenstein",
    "Switzerland",
  ],

  "southern-europe": [
    "Greece",
    "Italy",
    "Malta",
    "Portugal",
    "Spain",
    "Cyprus",
  ],

  "north-eastern-europe": [
    "Czech Republic",
    "Estonia",
    "Latvia",
    "Lithuania",
    "Poland",
    "Slovakia",
  ],

  "south-eastern-europe": [
    "Bulgaria",
    "Croatia",
    "Hungary",
    "Romania",
    "Slovenia",
  ],
} as const satisfies Record<ClimateZone, readonly string[]>;

export const sriSupportedCountries = Object.values(
  sriCountriesByClimateZone,
).flat();

export const getClimateZoneFromCountry = (
  country: string,
): ClimateZone | "" => {
  const normalizedCountry = country.trim().toLowerCase();

  const climateZoneEntry = Object.entries(sriCountriesByClimateZone).find(
    ([, countries]) =>
      countries.some(
        (supportedCountry) =>
          supportedCountry.trim().toLowerCase() === normalizedCountry,
      ),
  );

  return (climateZoneEntry?.[0] as ClimateZone | undefined) ?? "";
};

export const isCountrySupportedForDefaultWeighting = (
  country: string,
): boolean => {
  return getClimateZoneFromCountry(country) !== "";
};