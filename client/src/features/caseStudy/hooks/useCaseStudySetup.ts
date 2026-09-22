// client/src/features/caseStudy/hooks/useCaseStudySetup.ts

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  caseStudyApi,
} from "../../../api/caseStudyApi";

import type {
  CompleteCaseStudySetupResult,
} from "../setup/caseStudySetup.types";

import type {
  CaseStudyProgress,
} from "../progress/caseStudyProgress.types";

import type {
  BuildingState,
  BuildingType,
  BuildingUsage,
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

type UseCaseStudySetupParams = {
  domains:
    TechnicalDomainName[];

  initialAnswers?:
    | SetupAnswers
    | null;

  onProgressChange?: (
    progress:
      CaseStudyProgress,
  ) => void;
};

const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  return error instanceof Error
    ? error.message
    : fallback;
};

export const useCaseStudySetup = ({
  domains,
  initialAnswers = null,
  onProgressChange,
}: UseCaseStudySetupParams) => {
  const initialBuildingInformation =
    initialAnswers
      ?.buildingInformation ??
    null;

  const initialMethodologySelection =
    initialAnswers
      ?.methodologySelection ??
    null;

  // ---------------------------------------------------------------------------
  // Form state
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Validation / request state
  // ---------------------------------------------------------------------------

  const [
    errors,
    setErrors,
  ] = useState<
    Record<string, string>
  >({});

  const [
    submitError,
    setSubmitError,
  ] = useState<
    string | null
  >(null);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  /*
   * The queue serializes Setup draft requests.
   * This prevents an older autosave request from
   * overwriting a newer value.
   */
  const saveQueueRef =
    useRef<
      Promise<void>
    >(
      Promise.resolve(),
    );

  const submitInFlightRef =
    useRef(false);

  const clearValidationErrors =
    useCallback(
      (...keys: string[]) => {
        setErrors(
          (currentErrors) => {
            const nextErrors = {
              ...currentErrors,
            };

            let changed = false;

            keys.forEach((key) => {
              if (
                key in nextErrors
              ) {
                delete nextErrors[key];
                changed = true;
              }
            });

            return changed
              ? nextErrors
              : currentErrors;
          },
        );
      },
      [],
    );

  // ---------------------------------------------------------------------------
  // Presentation-only derived value
  // ---------------------------------------------------------------------------

  /*
   * Temporary frontend derivation used only
   * so the current form can immediately display
   * the climate zone.
   *
   * The backend remains authoritative and derives
   * the canonical climate zone from SriCountry.
   *
   * This frontend mapping will be removed when
   * Setup reference data comes from the backend.
   */
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

  // ---------------------------------------------------------------------------
  // Complete form snapshot
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Form actions
  // ---------------------------------------------------------------------------

  const setDomainPresence =
    useCallback(
      (
        domain:
          TechnicalDomainName,

        value:
          DomainPresence,
      ) => {
        setDomainPresenceState(
          (current) => ({
            ...current,

            [domain]:
              value,
          }),
        );

        clearValidationErrors(
          `domainPresence.${domain}`,
        );
      },
      [
        clearValidationErrors,
      ],
    );

  const setValidationErrors =
    useCallback(
      (
        nextErrors:
          Record<string, string>,
      ) => {
        setErrors(
          nextErrors,
        );
      },
      [],
    );
  
  const changeBuildingType =
    useCallback(
      (
        value:
          BuildingType | "",
      ) => {
        setBuildingType(
          value,
        );

        clearValidationErrors(
          "buildingType",
        );
      },
      [
        clearValidationErrors,
      ],
    );

  const changeBuildingUsage =
    useCallback(
      (
        value:
          BuildingUsage | "",
      ) => {
        setBuildingUsage(
          value,
        );

        clearValidationErrors(
          "buildingUsage",
        );
      },
      [
        clearValidationErrors,
      ],
    );

  const changeCountry =
    useCallback(
      (
        value: string,
      ) => {
        setCountry(
          value,
        );

        /*
        * Climate zone is derived from
        * country, therefore changing the
        * country also invalidates any old
        * climate-zone validation message.
        */
        clearValidationErrors(
          "country",
          "climateZone",
        );
      },
      [
        clearValidationErrors,
      ],
    );

  const changeConstructionYear =
    useCallback(
      (
        value: string,
      ) => {
        setConstructionYear(
          value,
        );

        /*
        * Renovation year can also depend
        * on construction year.
        */
        clearValidationErrors(
          "constructionYear",
          "renovationYear",
        );
      },
      [
        clearValidationErrors,
      ],
    );

  const changeBuildingState =
    useCallback(
      (
        value:
          BuildingState | "",
      ) => {
        setBuildingState(
          value,
        );

        clearValidationErrors(
          "buildingState",
          "renovationYear",
        );
      },
      [
        clearValidationErrors,
      ],
    );

  const changeRenovationYear =
    useCallback(
      (
        value: string,
      ) => {
        setRenovationYear(
          value,
        );

        clearValidationErrors(
          "renovationYear",
        );
      },
      [
        clearValidationErrors,
      ],
    );

  const changeFloorArea =
    useCallback(
      (
        value: string,
      ) => {
        setFloorArea(
          value,
        );

        clearValidationErrors(
          "floorArea",
        );
      },
      [
        clearValidationErrors,
      ],
    );

  const changeAssessmentMethod =
    useCallback(
      (
        value:
          OfficialAssessmentMethod | "",
      ) => {
        setAssessmentMethod(
          value,
        );

        clearValidationErrors(
          "assessmentMethod",
        );
      },
      [
        clearValidationErrors,
      ],
    );

  // ---------------------------------------------------------------------------
  // Canonical backend autosave
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const answersSnapshot =
      answers;

    saveQueueRef.current =
      saveQueueRef.current
        .then(
          async () => {
            const nextProgress =
              await caseStudyApi
                .saveSetupDraft(
                  answersSnapshot,
                );

            onProgressChange?.(
              nextProgress,
            );
          },
        )
        .catch(
          (error) => {
            /*
             * A later Complete request persists
             * the complete current snapshot again,
             * so an autosave failure must not make
             * the form unusable.
             */
            console.error(
              "Could not save Case Study Setup draft.",
              error,
            );
          },
        );
  }, [
    answers,
    onProgressChange,
  ]);

  // ---------------------------------------------------------------------------
  // Complete Setup
  // ---------------------------------------------------------------------------

  const complete =
    useCallback(
      async (): Promise<
        CompleteCaseStudySetupResult | null
      > => {
        if (
          submitInFlightRef.current
        ) {
          return null;
        }

        submitInFlightRef.current =
          true;

        setIsSubmitting(
          true,
        );

        setSubmitError(
          null,
        );

        try {
          /*
           * Finish all queued draft writes first.
           *
           * This guarantees that an older autosave
           * cannot execute after Setup completion and
           * accidentally make the Setup incomplete.
           */
          await saveQueueRef.current;

          const response =
            await caseStudyApi
              .completeSetup(
                answers,
              );

          if (
            !response
              .validation
              .isValid
          ) {
            setErrors(
              response
                .validation
                .errors,
            );

            return response;
          }

          setErrors({});

          return response;
        } catch (error) {
          setSubmitError(
            getErrorMessage(
              error,
              "Could not complete the Case Study Setup.",
            ),
          );

          return null;
        } finally {
          submitInFlightRef.current =
            false;

          setIsSubmitting(
            false,
          );
        }
      },
      [
        answers,
      ],
    );

  return {
    answers,
    
    buildingType,
    setBuildingType:
      changeBuildingType,

    buildingUsage,
    setBuildingUsage:
      changeBuildingUsage,

    country,
    setCountry:
      changeCountry,

    climateZone,

    constructionYear,
    setConstructionYear:
      changeConstructionYear,

    buildingState,
    setBuildingState:
      changeBuildingState,

    renovationYear,
    setRenovationYear:
      changeRenovationYear,

    floorArea,
    setFloorArea:
      changeFloorArea,

    assessmentMethod,
    setAssessmentMethod:
      changeAssessmentMethod,

    domainPresence,
    setDomainPresence,

    errors,
    setValidationErrors,

    submitError,
    isSubmitting,

    complete,
  };
};