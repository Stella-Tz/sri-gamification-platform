// client/src/features/caseStudy/hooks/useCaseStudyAssessment.ts

import {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  caseStudyApi,
} from "../../../api/caseStudyApi";

import type {
  CaseStudyAssessmentData,
} from "../assessment/caseStudyAssessment.types";

import {
  groupCaseStudyAssessmentServicesByDomain,
  type CaseStudyAssessmentService,
} from "../assessment/caseStudyAssessment.presentation";

import type {
  DomainPresence,
  ServiceAnswer,
  TechnicalDomainName,
} from "../types/caseStudy.types";

import {
  createDefaultServiceAnswer,
} from "../utils/caseStudyInitialState.utils";

import {
  getAbsentMandatoryDomains,
  getAbsentNotMandatoryDomains,
  getPresentDomains,
} from "../utils/domainPresence.utils";

import {
  prefixValidationErrors,
} from "../utils/validationMerge.utils";

type AssessmentProgressSnapshot =
  CaseStudyAssessmentData["progress"];

type UseCaseStudyAssessmentParams = {
  services:
    CaseStudyAssessmentService[];

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  scenarioByServiceId: Record<
    string,
    {
      evidence:
        string[];
    }
  >;

  initialProgress?:
    | AssessmentProgressSnapshot
    | null;
};

type AssessmentSubmitSuccess = {
  result:
    Awaited<
      ReturnType<
        typeof caseStudyApi.submitAssessment
      >
    >;

  validatedServiceIds:
    string[];

  selectedServiceId:
    string;
};

const createInitialAnswers = ({
  services,
  initialProgress,
}: {
  services:
    CaseStudyAssessmentService[];

  initialProgress:
    | AssessmentProgressSnapshot
    | null;
}): Record<
  string,
  ServiceAnswer
> => {
  const initialAnswers =
    services.reduce<
      Record<
        string,
        ServiceAnswer
      >
    >(
      (
        accumulator,
        service,
      ) => {
        accumulator[
          service.id
        ] =
          createDefaultServiceAnswer(
            service.id,
          );

        return accumulator;
      },
      {},
    );

  if (
    !initialProgress
  ) {
    return initialAnswers;
  }

  services.forEach(
    (service) => {
      const savedAnswer =
        initialProgress
          .answers[
            service.id
          ];

      if (
        !savedAnswer ||
        savedAnswer
          .serviceId !==
          service.id
      ) {
        return;
      }

      initialAnswers[
        service.id
      ] = {
        ...savedAnswer,
      };
    },
  );

  return initialAnswers;
};

const createInitialValidatedServiceIds =
  ({
    services,
    initialProgress,
  }: {
    services:
      CaseStudyAssessmentService[];

    initialProgress:
      | AssessmentProgressSnapshot
      | null;
  }): string[] => {
    if (
      !initialProgress
    ) {
      return [];
    }

    const serviceIds =
      new Set(
        services.map(
          (service) =>
            service.id,
        ),
      );

    return initialProgress
      .validatedServiceIds
      .filter(
        (serviceId) =>
          serviceIds.has(
            serviceId,
          ),
      );
  };

const getInitialSelectedServiceId =
  ({
    services,
    validatedServiceIds,
    initialProgress,
  }: {
    services:
      CaseStudyAssessmentService[];

    validatedServiceIds:
      string[];

    initialProgress:
      | AssessmentProgressSnapshot
      | null;
  }): string => {
    const savedSelectedServiceId =
      initialProgress
        ?.selectedServiceId ??
      null;

    const savedServiceExists =
      savedSelectedServiceId !==
        null &&
      services.some(
        (service) =>
          service.id ===
          savedSelectedServiceId,
      );

    if (
      savedServiceExists &&
      savedSelectedServiceId
    ) {
      return savedSelectedServiceId;
    }

    const firstIncompleteService =
      services.find(
        (service) =>
          !validatedServiceIds
            .includes(
              service.id,
            ),
      );

    return (
      firstIncompleteService
        ?.id ??
      services[0]?.id ??
      ""
    );
  };

export const useCaseStudyAssessment = ({
  services,
  domainPresence,
  scenarioByServiceId,
  initialProgress = null,
}: UseCaseStudyAssessmentParams) => {
  // ---------------------------------------------------------------------------
  // Presentation-derived collections
  // ---------------------------------------------------------------------------

  const servicesByDomain =
    useMemo(
      () =>
        groupCaseStudyAssessmentServicesByDomain(
          services,
        ),
      [
        services,
      ],
    );

  const presentDomains =
    useMemo(
      () =>
        getPresentDomains(
          domainPresence,
        ),
      [
        domainPresence,
      ],
    );

  const absentMandatoryDomains =
    useMemo(
      () =>
        getAbsentMandatoryDomains(
          domainPresence,
        ),
      [
        domainPresence,
      ],
    );

  const absentNotMandatoryDomains =
    useMemo(
      () =>
        getAbsentNotMandatoryDomains(
          domainPresence,
        ),
      [
        domainPresence,
      ],
    );

  const domainsWithServices =
    useMemo(
      () =>
        presentDomains.filter(
          (domain) =>
            servicesByDomain[
              domain
            ].length > 0,
        ),
      [
        presentDomains,
        servicesByDomain,
      ],
    );

  // ---------------------------------------------------------------------------
  // Assessment UI state
  // ---------------------------------------------------------------------------

  const [
    answers,
    setAnswers,
  ] = useState<
    Record<
      string,
      ServiceAnswer
    >
  >(
    () =>
      createInitialAnswers({
        services,
        initialProgress,
      }),
  );

  const [
    validatedServiceIds,
    setValidatedServiceIds,
  ] = useState<
    string[]
  >(
    () =>
      createInitialValidatedServiceIds({
        services,
        initialProgress,
      }),
  );

  const [
    selectedServiceId,
    setSelectedServiceId,
  ] = useState<string>(
    () => {
      const initialValidatedIds =
        createInitialValidatedServiceIds({
          services,
          initialProgress,
        });

      return getInitialSelectedServiceId({
        services,

        validatedServiceIds:
          initialValidatedIds,

        initialProgress,
      });
    },
  );

  const [
    errorsByField,
    setErrorsByField,
  ] = useState<
    Record<
      string,
      string
    >
  >({});

  const [
    actionError,
    setActionError,
  ] = useState<
    string | null
  >(null);

  // ---------------------------------------------------------------------------
  // Backend mutation queue
  // ---------------------------------------------------------------------------

  /*
   * Assessment mutations are serialized so
   * an older answer/navigation request cannot
   * finish after a newer operation.
   */
  const mutationQueueRef =
    useRef<
      Promise<void>
    >(
      Promise.resolve(),
    );

  const enqueueMutation =
    <T,>(
      operation:
        () => Promise<T>,
    ): Promise<T> => {
      const result =
        mutationQueueRef
          .current
          .then(
            operation,
          );

      mutationQueueRef.current =
        result.then(
          () =>
            undefined,

          () =>
            undefined,
        );

      return result;
    };

  const reportActionError =
    (
      error:
        unknown,
    ) => {
      setActionError(
        error instanceof Error
          ? error.message
          : "Could not save the Assessment progress.",
      );
    };

  const persistActiveService =
    (
      serviceId:
        string,
    ) => {
      setActionError(
        null,
      );

      void enqueueMutation(
        () =>
          caseStudyApi
            .setActiveAssessmentService(
              serviceId,
            ),
      ).catch(
        reportActionError,
      );
    };

  // ---------------------------------------------------------------------------
  // Current selection
  // ---------------------------------------------------------------------------

  const selectedService =
    services.find(
      (service) =>
        service.id ===
        selectedServiceId,
    ) ??
    services[0] ??
    null;

  const selectedDomain:
    | TechnicalDomainName
    | "" =
    selectedService
      ?.domain ??
    "";

  const selectedDomainServices =
    selectedDomain
      ? servicesByDomain[
          selectedDomain
        ]
      : [];

  // ---------------------------------------------------------------------------
  // Answer helpers
  // ---------------------------------------------------------------------------

  const getAnswer =
    (
      serviceId:
        string,
    ): ServiceAnswer => {
      return (
        answers[
          serviceId
        ] ??
        createDefaultServiceAnswer(
          serviceId,
        )
      );
    };

  const isServiceValidated =
    (
      serviceId:
        string,
    ): boolean => {
      return validatedServiceIds
        .includes(
          serviceId,
        );
    };

  // ---------------------------------------------------------------------------
  // Progress presentation
  // ---------------------------------------------------------------------------

  const completedServices =
    services.filter(
      (service) =>
        isServiceValidated(
          service.id,
        ),
    );

  const incompleteServices =
    services.filter(
      (service) =>
        !isServiceValidated(
          service.id,
        ),
    );

  const completedByDomain =
    domainsWithServices.reduce(
      (
        accumulator,
        domain,
      ) => {
        accumulator[
          domain
        ] =
          servicesByDomain[
            domain
          ].filter(
            (service) =>
              isServiceValidated(
                service.id,
              ),
          ).length;

        return accumulator;
      },
      {} as Record<
        TechnicalDomainName,
        number
      >,
    );

  const totalByDomain =
    domainsWithServices.reduce(
      (
        accumulator,
        domain,
      ) => {
        accumulator[
          domain
        ] =
          servicesByDomain[
            domain
          ].length;

        return accumulator;
      },
      {} as Record<
        TechnicalDomainName,
        number
      >,
    );

  const progress =
    services.length >
    0
      ? Math.round(
          (
            completedServices
              .length /
            services.length
          ) *
            100,
        )
      : 0;

  const isAssessmentCompleted =
    services.length >
      0 &&
    completedServices
      .length ===
      services.length;

  const isFinalRemainingService =
    isAssessmentCompleted ||
    (
      selectedService !==
        null &&
      incompleteServices
        .length ===
        1 &&
      incompleteServices[0]
        ?.id ===
        selectedService.id
    );

  // ---------------------------------------------------------------------------
  // Local state actions
  // ---------------------------------------------------------------------------

  const onChangeAnswer =
    (
      answer:
        ServiceAnswer,
    ) => {
      const previousAnswer =
        getAnswer(
          answer.serviceId,
        );

      const selectedLevelChanged =
        previousAnswer
          .selectedLevelId !==
        answer.selectedLevelId;

      const shareChanged =
        previousAnswer.share !==
        answer.share;

      const additionalLevelChanged =
        previousAnswer
          .additionalLevelId !==
        answer.additionalLevelId;

      setAnswers(
        (current) => ({
          ...current,

          [answer.serviceId]:
            answer,
        }),
      );

      /*
      * A changed answer must no longer
      * appear locally as validated.
      *
      * The backend performs the same
      * canonical invalidation.
      */
      setValidatedServiceIds(
        (current) =>
          current.filter(
            (serviceId) =>
              serviceId !==
              answer.serviceId,
          ),
      );

      /*
      * Clear only validation feedback
      * that belongs to a field whose
      * value actually changed.
      *
      * This does not validate the new
      * value. The backend remains the
      * canonical validation authority.
      */
      setErrorsByField(
        (current) => {
          const nextErrors = {
            ...current,
          };

          let changed = false;

          if (
            selectedLevelChanged
          ) {
            const key =
              `${answer.serviceId}.selectedLevelId`;

            if (key in nextErrors) {
              delete nextErrors[
                key
              ];

              changed = true;
            }
          }

          if (shareChanged) {
            const key =
              `${answer.serviceId}.share`;

            if (key in nextErrors) {
              delete nextErrors[
                key
              ];

              changed = true;
            }
          }

          if (
            additionalLevelChanged
          ) {
            const key =
              `${answer.serviceId}.additionalLevelId`;

            if (key in nextErrors) {
              delete nextErrors[
                key
              ];

              changed = true;
            }
          }

          return changed
            ? nextErrors
            : current;
        },
      );
    };

  const applyServerValidation =
    ({
      serviceId,
      errors,
      nextValidatedServiceIds,
      nextServiceId,
    }: {
      serviceId:
        string;

      errors:
        Record<
          string,
          string
        >;

      nextValidatedServiceIds:
        string[];

      nextServiceId:
        | string
        | null;
    }) => {
      setValidatedServiceIds(
        nextValidatedServiceIds,
      );

      const prefixedErrors =
        prefixValidationErrors(
          serviceId,
          errors,
        );

      setErrorsByField(
        prefixedErrors,
      );

      if (
        Object.keys(
          errors,
        ).length ===
          0 &&
        nextServiceId
      ) {
        setSelectedServiceId(
          nextServiceId,
        );
      }
    };

  const goToPreviousService =
    (): string | null => {
      if (
        !selectedService
      ) {
        return null;
      }

      const currentIndex =
        services.findIndex(
          (service) =>
            service.id ===
            selectedService.id,
        );

      if (
        currentIndex <=
        0
      ) {
        return null;
      }

      const previousServiceId =
        services[
          currentIndex - 1
        ]?.id ??
        null;

      if (
        previousServiceId
      ) {
        setErrorsByField(
          {},
        );

        setSelectedServiceId(
          previousServiceId,
        );
      }

      return previousServiceId;
    };

  const canSelectService =
    (
      _serviceId:
        string,
    ): boolean => {
      return true;
    };

  const onSelectService =
    (
      serviceId:
        string,
    ): string | null => {
      if (
        !canSelectService(
          serviceId,
        )
      ) {
        return null;
      }

      const serviceExists =
        services.some(
          (service) =>
            service.id ===
            serviceId,
        );

      if (
        !serviceExists
      ) {
        return null;
      }

      setErrorsByField(
        {},
      );

      setSelectedServiceId(
        serviceId,
      );

      return serviceId;
    };

  const canSelectDomain =
    (
      domain:
        TechnicalDomainName,
    ): boolean => {
      return (
        servicesByDomain[
          domain
        ].length >
        0
      );
    };

  const onSelectDomain =
    (
      domain:
        TechnicalDomainName,
    ): string | null => {
      if (
        !canSelectDomain(
          domain,
        )
      ) {
        return null;
      }

      const firstService =
        servicesByDomain[
          domain
        ].find(
          (service) =>
            !isServiceValidated(
              service.id,
            ),
        ) ??
        servicesByDomain[
          domain
        ][0];

      if (
        !firstService
      ) {
        return null;
      }

      setErrorsByField(
        {},
      );

      setSelectedServiceId(
        firstService.id,
      );

      return firstService.id;
    };

  // ---------------------------------------------------------------------------
  // Backend-backed user actions
  // ---------------------------------------------------------------------------

  const handleChangeAnswer =
    (
      answer:
        ServiceAnswer,
    ) => {
      onChangeAnswer(
        answer,
      );

      setActionError(
        null,
      );

      void enqueueMutation(
        () =>
          caseStudyApi
            .saveAssessmentAnswer(
              answer,
            ),
      ).catch(
        reportActionError,
      );
    };

  const handlePreviousService =
    (): string | null => {
      const previousServiceId =
        goToPreviousService();

      if (
        previousServiceId
      ) {
        persistActiveService(
          previousServiceId,
        );
      }

      return previousServiceId;
    };

  const handleSelectService =
    (
      serviceId:
        string,
    ): string | null => {
      const nextServiceId =
        onSelectService(
          serviceId,
        );

      if (
        nextServiceId
      ) {
        persistActiveService(
          nextServiceId,
        );
      }

      return nextServiceId;
    };

  const handleSelectDomain =
    (
      domain:
        TechnicalDomainName,
    ): string | null => {
      const nextServiceId =
        onSelectDomain(
          domain,
        );

      if (
        nextServiceId
      ) {
        persistActiveService(
          nextServiceId,
        );
      }

      return nextServiceId;
    };

  const saveAndNext =
    async (): Promise<
      boolean
    > => {
      if (
        !selectedService
      ) {
        return false;
      }

      setActionError(
        null,
      );

      try {
        const response =
          await enqueueMutation(
            () =>
              caseStudyApi
                .validateAssessmentAnswer(
                  getAnswer(
                    selectedService
                      .id,
                  ),
                ),
          );

        applyServerValidation({
          serviceId:
            selectedService
              .id,

          errors:
            response
              .validation
              .errors,

          nextValidatedServiceIds:
            response
              .validatedServiceIds,

          nextServiceId:
            response
              .nextServiceId,
        });

        return response
          .validation
          .isValid;
      } catch (error) {
        reportActionError(
          error,
        );

        return false;
      }
    };

  const submit =
    async (): Promise<
      AssessmentSubmitSuccess | null
    > => {
      if (
        !selectedService
      ) {
        return null;
      }

      setActionError(
        null,
      );

      try {
        /*
         * Validate the currently selected
         * service before submitting.
         */
        const validationResponse =
          await enqueueMutation(
            () =>
              caseStudyApi
                .validateAssessmentAnswer(
                  getAnswer(
                    selectedService
                      .id,
                  ),
                ),
          );

        applyServerValidation({
          serviceId:
            selectedService
              .id,

          errors:
            validationResponse
              .validation
              .errors,

          nextValidatedServiceIds:
            validationResponse
              .validatedServiceIds,

          nextServiceId:
            validationResponse
              .nextServiceId,
        });

        if (
          !validationResponse
            .validation
            .isValid ||
          !validationResponse
            .allServicesValidated
        ) {
          return null;
        }

        /*
         * Canonical SRI calculation and
         * baseline persistence are backend-owned.
         */
        const result =
          await enqueueMutation(
            () =>
              caseStudyApi
                .submitAssessment(),
          );

        return {
          result,

          validatedServiceIds:
            validationResponse
              .validatedServiceIds,

          selectedServiceId:
            selectedService
              .id,
        };
      } catch (error) {
        reportActionError(
          error,
        );

        return null;
      }
    };

  return {
    services,
    servicesByDomain,

    presentDomains,
    absentMandatoryDomains,
    absentNotMandatoryDomains,
    domainsWithServices,

    selectedDomain,
    selectedService,
    selectedServiceId,
    selectedDomainServices,

    answers,
    validatedServiceIds,

    getAnswer,

    onChangeAnswer:
      handleChangeAnswer,

    errorsByField,
    actionError,

    saveAndNext,
    submit,

    scenarioByServiceId,

    completedServicesCount:
      completedServices
        .length,

    totalServicesCount:
      services.length,

    completedByDomain,
    totalByDomain,
    progress,

    isAssessmentCompleted,
    isFinalRemainingService,

    goToPreviousService:
      handlePreviousService,

    canGoPrevious:
      selectedService !==
        null &&
      services.findIndex(
        (service) =>
          service.id ===
          selectedService
            .id,
      ) >
        0,

    onSelectService:
      handleSelectService,

    canSelectService,

    onSelectDomain:
      handleSelectDomain,

    canSelectDomain,

    isServiceValidated,
  };
};