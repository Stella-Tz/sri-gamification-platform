// client/src/features/caseStudy/hooks/useCaseStudySetup.ts

import {
  useMemo,
  useState,
} from "react";

import type {
  BuildingState,
  BuildingType,
  BuildingUsage,
  CaseStudyDetails,
  ClimateZone,
  DomainPresence,
  OfficialAssessmentMethod,
  SetupAnswers,
  TechnicalDomainName,
} from "../types/caseStudy.types";

import {
  getClimateZoneFromCountry,
} from "../data/sriClimateZones";

import {
  createEmptyDomainPresence,
} from "../utils/caseStudyInitialState.utils";

import {
  validateSetupAnswers,
} from "../utils/setupValidation.utils";

type UseCaseStudySetupParams = {
  caseStudy: CaseStudyDetails;

  domains:
    TechnicalDomainName[];

  initialAnswers?:
    | SetupAnswers
    | null;
};

export const useCaseStudySetup = ({
  caseStudy,
  domains,
  initialAnswers = null,
}: UseCaseStudySetupParams) => {
  const initialBuildingInformation =
    initialAnswers
      ?.buildingInformation ??
    null;

  const initialMethodologySelection =
    initialAnswers
      ?.methodologySelection ??
    null;

  const [
    buildingType,
    setBuildingType,
  ] = useState<
    BuildingType | ""
  >(
    () =>
      initialBuildingInformation
        ?.buildingType ?? "",
  );

  const [
    buildingUsage,
    setBuildingUsage,
  ] = useState<
    BuildingUsage | ""
  >(
    () =>
      initialBuildingInformation
        ?.buildingUsage ?? "",
  );

  const [
    country,
    setCountry,
  ] = useState(
    () =>
      initialBuildingInformation
        ?.country ?? "",
  );

  const [
    constructionYear,
    setConstructionYear,
  ] = useState(
    () =>
      initialBuildingInformation
        ?.constructionYear ?? "",
  );

  const [
    buildingState,
    setBuildingState,
  ] = useState<
    BuildingState | ""
  >(
    () =>
      initialBuildingInformation
        ?.buildingState ?? "",
  );

  const [
    renovationYear,
    setRenovationYear,
  ] = useState(
    () =>
      initialBuildingInformation
        ?.renovationYear ?? "",
  );

  const [
    floorArea,
    setFloorArea,
  ] = useState(
    () =>
      initialBuildingInformation
        ?.floorArea ?? "",
  );

  const [
    assessmentMethod,
    setAssessmentMethod,
  ] = useState<
    OfficialAssessmentMethod | ""
  >(
    () =>
      initialMethodologySelection
        ?.assessmentMethod ?? "",
  );

  const [
    domainPresence,
    setDomainPresenceState,
  ] = useState<
    Record<
      TechnicalDomainName,
      DomainPresence | ""
    >
  >(() => {
    return {
      ...createEmptyDomainPresence(
        domains,
      ),

      ...(
        initialAnswers
          ?.domainPresence ?? {}
      ),
    };
  });

  const [
    errors,
    setErrors,
  ] = useState<
    Record<string, string>
  >({});

  const climateZone =
    useMemo<
      ClimateZone | ""
    >(() => {
      return country
        ? getClimateZoneFromCountry(
            country,
          )
        : "";
    }, [country]);

  const answers =
    useMemo<SetupAnswers>(
      () => {
        return {
          buildingInformation: {
            buildingType,
            buildingUsage,
            country,
            climateZone,
            constructionYear,
            buildingState,
            renovationYear,
            floorArea,
          },

          methodologySelection: {
            assessmentMethod,
          },

          domainPresence,
        };
      },
      [
        buildingType,
        buildingUsage,
        country,
        climateZone,
        constructionYear,
        buildingState,
        renovationYear,
        floorArea,
        assessmentMethod,
        domainPresence,
      ],
    );

  const setDomainPresence = (
    domain:
      TechnicalDomainName,

    value:
      DomainPresence,
  ) => {
    setDomainPresenceState(
      (current) => ({
        ...current,
        [domain]: value,
      }),
    );
  };

  const validate = (): boolean => {
    const validation =
      validateSetupAnswers(
        answers,
        caseStudy
          .expectedSetupAnswers,
      );

    setErrors(
      validation.errors,
    );

    return validation.isValid;
  };

  return {
    answers,

    buildingType,
    setBuildingType,

    buildingUsage,
    setBuildingUsage,

    country,
    setCountry,

    climateZone,

    constructionYear,
    setConstructionYear,

    buildingState,
    setBuildingState,

    renovationYear,
    setRenovationYear,

    floorArea,
    setFloorArea,

    assessmentMethod,
    setAssessmentMethod,

    domainPresence,
    setDomainPresence,

    errors,
    validate,
  };
};