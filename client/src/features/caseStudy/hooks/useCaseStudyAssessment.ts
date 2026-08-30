// client/src/features/caseStudy/hooks/useCaseStudyAssessment.ts

import {
  useMemo,
  useState,
} from "react";

import type {
  CaseStudyDetails,
  DomainPresence,
  ServiceAnswer,
  SriService,
  TechnicalDomainName,
} from "../types/caseStudy.types";

import type {
  CaseStudyAssessmentProgress,
} from "../progress/caseStudyProgress.types";

import {
  getAbsentMandatoryDomains,
  getAbsentNotMandatoryDomains,
  getPresentDomains,
} from "../utils/domainPresence.utils";

import {
  createDefaultServiceAnswer,
  createDefaultServiceAnswers,
} from "../utils/caseStudyInitialState.utils";

import {
  mapSelectedServicesToCatalogue,
} from "../utils/assessment.utils";

import {
  groupCatalogueServicesByDomain,
} from "../utils/serviceCatalogue.utils";

import {
  isAssessmentServiceAnswerCorrect,
  validateAssessmentServiceAnswer,
} from "../utils/caseStudyScenarioValidation.utils";

import {
  prefixValidationErrors,
} from "../utils/validationMerge.utils";

type UseCaseStudyAssessmentParams = {
  caseStudy: CaseStudyDetails;

  catalogue: SriService[];

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  initialProgress?:
    | CaseStudyAssessmentProgress
    | null;
};

type ServiceScenarioViewModel = {
  evidence: string[];
};

const createInitialAnswers = ({
  services,
  initialProgress,
}: {
  services: SriService[];

  initialProgress:
    | CaseStudyAssessmentProgress
    | null;
}): Record<string, ServiceAnswer> => {
  const initialAnswers =
    createDefaultServiceAnswers(
      services,
    );

  if (!initialProgress) {
    return initialAnswers;
  }

  services.forEach((service) => {
    const savedAnswer =
      initialProgress.answers[
        service.id
      ];

    if (
      !savedAnswer ||
      savedAnswer.serviceId !==
        service.id
    ) {
      return;
    }

    initialAnswers[service.id] = {
      ...savedAnswer,
    };
  });

  return initialAnswers;
};

const createInitialValidatedServiceIds =
  ({
    services,
    initialProgress,
  }: {
    services: SriService[];

    initialProgress:
      | CaseStudyAssessmentProgress
      | null;
  }): string[] => {
    if (!initialProgress) {
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
      .filter((serviceId) =>
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
    services: SriService[];

    validatedServiceIds:
      string[];

    initialProgress:
      | CaseStudyAssessmentProgress
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
          !validatedServiceIds.includes(
            service.id,
          ),
      );

    return (
      firstIncompleteService?.id ??
      services[0]?.id ??
      ""
    );
  };

export const useCaseStudyAssessment = ({
  caseStudy,
  catalogue,
  domainPresence,
  initialProgress = null,
}: UseCaseStudyAssessmentParams) => {
  const services = useMemo(() => {
    return mapSelectedServicesToCatalogue(
      caseStudy.selectedServices,
      catalogue,
    );
  }, [
    caseStudy.selectedServices,
    catalogue,
  ]);

  const servicesByDomain =
    useMemo(() => {
      return groupCatalogueServicesByDomain(
        services,
      );
    }, [services]);

  const presentDomains =
    useMemo(() => {
      return getPresentDomains(
        domainPresence,
      );
    }, [domainPresence]);

  const absentMandatoryDomains =
    useMemo(() => {
      return getAbsentMandatoryDomains(
        domainPresence,
      );
    }, [domainPresence]);

  const absentNotMandatoryDomains =
    useMemo(() => {
      return getAbsentNotMandatoryDomains(
        domainPresence,
      );
    }, [domainPresence]);

  const domainsWithServices =
    useMemo(() => {
      return presentDomains.filter(
        (domain) =>
          servicesByDomain[
            domain
          ].length > 0,
      );
    }, [
      presentDomains,
      servicesByDomain,
    ]);

  const [
    answers,
    setAnswers,
  ] = useState<
    Record<string, ServiceAnswer>
  >(() =>
    createInitialAnswers({
      services,
      initialProgress,
    }),
  );

  const [
    validatedServiceIds,
    setValidatedServiceIds,
  ] = useState<string[]>(() =>
    createInitialValidatedServiceIds({
      services,
      initialProgress,
    }),
  );

  const [
    selectedServiceId,
    setSelectedServiceId,
  ] = useState<string>(() => {
    const initialValidatedIds =
      createInitialValidatedServiceIds(
        {
          services,
          initialProgress,
        },
      );

    return getInitialSelectedServiceId(
      {
        services,

        validatedServiceIds:
          initialValidatedIds,

        initialProgress,
      },
    );
  });

  /*
   * This remains true when a completed
   * assessment is reopened without changing
   * any answers.
   *
   * It becomes false as soon as an answer
   * changes, because the previous result is
   * no longer guaranteed to be valid.
   */
  const [
    isSavedAsCompleted,
    setIsSavedAsCompleted,
  ] = useState(
    () =>
      initialProgress
        ?.completed === true,
  );

  const [
    errorsByField,
    setErrorsByField,
  ] = useState<
    Record<string, string>
  >({});

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
    selectedService?.domain ?? "";

  const selectedDomainServices =
    selectedDomain
      ? servicesByDomain[
          selectedDomain
        ]
      : [];

  const scenarioByServiceId =
    useMemo(() => {
      return caseStudy
        .selectedServices
        .reduce<
          Record<
            string,
            ServiceScenarioViewModel
          >
        >(
          (
            accumulator,
            selectedServiceDefinition,
          ) => {
            accumulator[
              selectedServiceDefinition
                .serviceId
            ] = {
              evidence:
                selectedServiceDefinition
                  .scenarioEvidence,
            };

            return accumulator;
          },
          {},
        );
    }, [
      caseStudy.selectedServices,
    ]);

  const getAnswer = (
    serviceId: string,
  ): ServiceAnswer => {
    return (
      answers[serviceId] ??
      createDefaultServiceAnswer(
        serviceId,
      )
    );
  };

  const getServiceErrors = (
    serviceId: string,
  ): Record<string, string> => {
    return validateAssessmentServiceAnswer(
      getAnswer(serviceId),
      caseStudy.selectedServices,
    );
  };

  const isServiceCorrect = (
    serviceId: string,
  ): boolean => {
    return isAssessmentServiceAnswerCorrect(
      getAnswer(serviceId),
      caseStudy.selectedServices,
    );
  };

  const isServiceValidated = (
    serviceId: string,
  ): boolean => {
    return validatedServiceIds.includes(
      serviceId,
    );
  };

  const completedServices =
    services.filter((service) =>
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
      (accumulator, domain) => {
        accumulator[domain] =
          servicesByDomain[
            domain
          ].filter((service) =>
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
      (accumulator, domain) => {
        accumulator[domain] =
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
    services.length > 0
      ? Math.round(
          (
            completedServices.length /
            services.length
          ) * 100,
        )
      : 0;

  const isAssessmentCompleted =
    services.length > 0 &&
    completedServices.length ===
      services.length;

  const isFinalRemainingService =
    isAssessmentCompleted ||
    (
      selectedService !== null &&
      incompleteServices.length ===
        1 &&
      incompleteServices[0]?.id ===
        selectedService.id
    );

  const onChangeAnswer = (
    answer: ServiceAnswer,
  ) => {
    setAnswers((current) => ({
      ...current,

      [answer.serviceId]:
        answer,
    }));

    setValidatedServiceIds(
      (current) =>
        current.filter(
          (serviceId) =>
            serviceId !==
            answer.serviceId,
        ),
    );

    /*
     * Any changed answer invalidates the
     * previously submitted result.
     */
    setIsSavedAsCompleted(
      false,
    );

    setErrorsByField(
      (current) => {
        const nextErrors = {
          ...current,
        };

        delete nextErrors[
          `${answer.serviceId}.selectedLevelId`
        ];

        delete nextErrors[
          `${answer.serviceId}.share`
        ];

        delete nextErrors[
          `${answer.serviceId}.additionalLevelId`
        ];

        return nextErrors;
      },
    );
  };

  const validateCurrentService =
    (): boolean => {
      if (!selectedService) {
        return false;
      }

      const errors =
        getServiceErrors(
          selectedService.id,
        );

      const prefixedErrors =
        prefixValidationErrors(
          selectedService.id,
          errors,
        );

      setErrorsByField(
        prefixedErrors,
      );

      return (
        Object.keys(
          errors,
        ).length === 0
      );
    };

  const findNextIncompleteService = (
    nextValidatedServiceIds =
      validatedServiceIds,
  ): SriService | null => {
    if (
      !selectedService ||
      !selectedDomain
    ) {
      return null;
    }

    const isValidated = (
      serviceId: string,
    ) =>
      nextValidatedServiceIds.includes(
        serviceId,
      );

    const currentDomainIndex =
      domainsWithServices.findIndex(
        (domain) =>
          domain === selectedDomain,
      );

    if (
      currentDomainIndex === -1
    ) {
      return null;
    }

    const currentDomainServices =
      servicesByDomain[
        selectedDomain
      ];

    const currentServiceIndex =
      currentDomainServices.findIndex(
        (service) =>
          service.id ===
          selectedService.id,
      );

    if (
      currentServiceIndex === -1
    ) {
      return null;
    }

    /*
    * 1. Complete the current domain first.
    *
    * Search from the service immediately
    * to the right of the current one.
    *
    * If no incomplete service is found,
    * continue from the beginning of the
    * same domain up to the current service.
    */
    const servicesToSearchInCurrentDomain = [
      ...currentDomainServices.slice(
        currentServiceIndex + 1,
      ),

      ...currentDomainServices.slice(
        0,
        currentServiceIndex,
      ),
    ];

    const nextServiceInCurrentDomain =
      servicesToSearchInCurrentDomain.find(
        (service) =>
          !isValidated(
            service.id,
          ),
      );

    if (
      nextServiceInCurrentDomain
    ) {
      return nextServiceInCurrentDomain;
    }

    /*
    * 2. The current domain is complete.
    *
    * Continue through the domains below
    * the current one. If necessary, wrap
    * to the beginning of the domain list.
    */
    const domainsToSearch = [
      ...domainsWithServices.slice(
        currentDomainIndex + 1,
      ),

      ...domainsWithServices.slice(
        0,
        currentDomainIndex,
      ),
    ];

    for (
      const domain of
      domainsToSearch
    ) {
      const firstIncompleteService =
        servicesByDomain[
          domain
        ].find(
          (service) =>
            !isValidated(
              service.id,
            ),
        );

      if (
        firstIncompleteService
      ) {
        return firstIncompleteService;
      }
    }

    return null;
  };

  const saveAndNext =
    (): boolean => {
      if (!selectedService) {
        return false;
      }

      const isValid =
        validateCurrentService();

      if (!isValid) {
        return false;
      }

      const nextValidatedServiceIds =
        validatedServiceIds.includes(
          selectedService.id,
        )
          ? validatedServiceIds
          : [
              ...validatedServiceIds,
              selectedService.id,
            ];

      setValidatedServiceIds(
        nextValidatedServiceIds,
      );

      const nextService =
        findNextIncompleteService(
          nextValidatedServiceIds,
        );

      setErrorsByField({});

      if (nextService) {
        setSelectedServiceId(
          nextService.id,
        );
      }

      return true;
    };

  const goToPreviousService =
    () => {
      if (!selectedService) {
        return;
      }

      const currentIndex =
        services.findIndex(
          (service) =>
            service.id ===
            selectedService.id,
        );

      if (currentIndex > 0) {
        setSelectedServiceId(
          services[
            currentIndex - 1
          ]?.id ?? "",
        );
      }
    };

  const canSelectService = (
    _serviceId: string,
  ): boolean => {
    return true;
  };

  const onSelectService = (
    serviceId: string,
  ) => {
    if (
      !canSelectService(
        serviceId,
      )
    ) {
      return;
    }

    setErrorsByField({});

    setSelectedServiceId(
      serviceId,
    );
  };

  const canSelectDomain = (
    domain:
      TechnicalDomainName,
  ): boolean => {
    return (
      servicesByDomain[
        domain
      ].length > 0
    );
  };

  const onSelectDomain = (
    domain:
      TechnicalDomainName,
  ) => {
    if (
      !canSelectDomain(
        domain,
      )
    ) {
      return;
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

    if (firstService) {
      setErrorsByField({});

      setSelectedServiceId(
        firstService.id,
      );
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
    isSavedAsCompleted,

    onChangeAnswer,

    errorsByField,
    validateCurrentService,

    scenarioByServiceId,

    completedServicesCount:
      completedServices.length,

    totalServicesCount:
      services.length,

    completedByDomain,
    totalByDomain,
    progress,

    isAssessmentCompleted,
    isFinalRemainingService,

    saveAndNext,
    goToPreviousService,

    canGoPrevious:
      selectedService !==
        null &&
      services.findIndex(
        (service) =>
          service.id ===
          selectedService.id,
      ) > 0,

    onSelectService,
    canSelectService,

    onSelectDomain,
    canSelectDomain,

    isServiceCorrect,
    isServiceValidated,
  };
};