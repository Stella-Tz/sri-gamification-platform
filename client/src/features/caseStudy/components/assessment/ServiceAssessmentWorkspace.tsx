// client/src/features/caseStudy/components/assessment/ServiceAssessmentWorkspace.tsx

import type {
  ServiceAnswer,
  SriService,
} from "../../types/caseStudy.types";

import { getImpactCriteriaForService } from "../../data/sriServiceCatalogue";
import { getServiceAnswer } from "../../utils/assessment.utils";

import AssessmentNavigation from "./AssessmentNavigation";
import FunctionalityLevelSelector from "./FunctionalityLevelSelector";
import ServiceAssessmentHeader from "./ServiceAssessmentHeader";
import ServiceInfoRow from "./ServiceInfoRow";
import ServiceNavigator from "./ServiceNavigator";
import ServiceScenarioPanel from "./ServiceScenarioPanel";
import ShareSelector from "./ShareSelector";

type ScenarioByServiceId = Record<
  string,
  {
    evidence: readonly string[];
  }
>;

type ServiceAssessmentWorkspaceProps = {
  services: readonly SriService[];

  selectedService: SriService | null;

  selectedServiceId: string;

  answers: Record<string, ServiceAnswer>;

  onChangeAnswer: (
    answer: ServiceAnswer,
  ) => void;

  errorsByField?: Record<
    string,
    string
  >;

  scenarioByServiceId:
    ScenarioByServiceId;

  onSelectService: (
    serviceId: string,
  ) => void;

  canSelectService: (
    serviceId: string,
  ) => boolean;

  isServiceValidated: (
    serviceId: string,
  ) => boolean;

  canGoPrevious: boolean;

  onPrevious: () => void;

  onSaveAndNext: () => void;

  onSubmitAssessment: () => void;

  isFinalRemainingService: boolean;
};

const ServiceAssessmentWorkspace = ({
  services,
  selectedService,
  selectedServiceId,
  answers,
  onChangeAnswer,
  errorsByField = {},
  scenarioByServiceId,
  onSelectService,
  canSelectService,
  isServiceValidated,
  canGoPrevious,
  onPrevious,
  onSaveAndNext,
  onSubmitAssessment,
  isFinalRemainingService,
}: ServiceAssessmentWorkspaceProps) => {
  if (!selectedService) {
    return (
      <section
        role="status"
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <p className="text-sm font-semibold leading-6 text-slate-500">
          No applicable services are
          available for this domain.
        </p>
      </section>
    );
  }

  const answer = getServiceAnswer(
    selectedService,
    answers,
  );

  const scenarioEvidence =
    scenarioByServiceId[
      selectedService.id
    ]?.evidence ?? [];

  const impactCriteria =
    getImpactCriteriaForService(
      selectedService,
    );

  const methodologyNote =
    selectedService.methodologyNote?.trim() ||
    undefined;

  const selectedServiceDomId =
    createSafeId(selectedService.id);

  /*
   * Raw validation errors returned for the
   * current service.
   */
  const selectedLevelError =
    errorsByField[
      `${selectedService.id}.selectedLevelId`
    ];

  const shareError =
    errorsByField[
      `${selectedService.id}.share`
    ];

  const additionalLevelError =
    errorsByField[
      `${selectedService.id}.additionalLevelId`
    ];

  /*
   * Validation feedback is intentionally
   * revealed in assessment order:
   *
   * 1. Main functionality level
   * 2. Share
   * 3. Additional functionality level
   *
   * A later error is not shown while an
   * earlier step still requires correction.
   */
  const visibleShareError =
    selectedLevelError
      ? undefined
      : shareError;

  const visibleAdditionalLevelError =
    selectedLevelError ||
    visibleShareError
      ? undefined
      : additionalLevelError;

  const selectedLevelErrorId =
    `${selectedServiceDomId}-selected-level-error`;

  const updateAnswer = (
    changes: Partial<ServiceAnswer>,
  ) => {
    onChangeAnswer({
      ...answer,
      ...changes,
      serviceId: selectedService.id,
    });
  };

  return (
    <div className="space-y-6">
      <p className="max-w-6xl text-sm font-medium leading-6 text-slate-500">
        Only smart-ready services requiring
        functionality-level assessment for
        this building are shown.
        Non-applicable services are excluded.
      </p>

      <ServiceAssessmentHeader
        code={selectedService.code}
        serviceGroup={
          selectedService.serviceGroup
        }
        smartReadyService={
          selectedService.smartReadyService
        }
      />

      <ServiceNavigator
        services={services}
        selectedServiceId={
          selectedServiceId
        }
        onSelectService={
          onSelectService
        }
        isServiceValidated={
          isServiceValidated
        }
        canSelectService={
          canSelectService
        }
      />

      <ServiceScenarioPanel
        scenarioEvidence={
          scenarioEvidence
        }
      />

      {/*
       * STEP 1
       * Main functionality level
       */}
      <div
        data-assessment-error={
          selectedLevelError
            ? "true"
            : undefined
        }
        tabIndex={
          selectedLevelError
            ? -1
            : undefined
        }
        aria-describedby={
          selectedLevelError
            ? selectedLevelErrorId
            : undefined
        }
        className="scroll-mt-24 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <FunctionalityLevelSelector
          serviceId={
            selectedService.id
          }
          selectedLevelId={
            answer.selectedLevelId
          }
          levels={
            selectedService.functionalityLevels
          }
          onChangeLevel={(levelId) =>
            updateAnswer({
              selectedLevelId: levelId,
            })
          }
        />

        {selectedLevelError ? (
          <p
            id={
              selectedLevelErrorId
            }
            role="alert"
            className="mt-2 px-1 text-xs font-semibold leading-5 text-red-600"
          >
            {selectedLevelError}
          </p>
        ) : null}
      </div>

      {/*
       * STEPS 2 + 3
       *
       * ShareSelector is responsible for
       * placing each error directly below
       * its corresponding activity card
       * and for marking the exact activity
       * that should receive focus.
       */}
      <ShareSelector
        key={selectedService.id}
        share={answer.share}
        additionalLevelId={
          answer.additionalLevelId
        }
        levels={
          selectedService.functionalityLevels
        }
        shareError={
          visibleShareError
        }
        additionalLevelError={
          visibleAdditionalLevelError
        }
        onChangeShare={(share) =>
          updateAnswer({
            share,

            additionalLevelId:
              share === 100
                ? undefined
                : answer.additionalLevelId,
          })
        }
        onChangeAdditionalLevel={(
          levelId,
        ) =>
          updateAnswer({
            additionalLevelId:
              levelId,
          })
        }
      />

      <ServiceInfoRow
        impactCriteria={
          impactCriteria
        }
        methodologyNote={
          methodologyNote
        }
      />

      <AssessmentNavigation
        canGoPrevious={
          canGoPrevious
        }
        isFinalRemainingService={
          isFinalRemainingService
        }
        onPrevious={
          onPrevious
        }
        onSaveAndNext={
          onSaveAndNext
        }
        onSubmitAssessment={
          onSubmitAssessment
        }
      />
    </div>
  );
};

const createSafeId = (
  value: string,
) => {
  const normalizedValue = value
    .toLowerCase()
    .replace(
      /[^a-z0-9_-]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );

  return (
    normalizedValue ||
    "selected-service"
  );
};

export default ServiceAssessmentWorkspace;