// client/src/features/caseStudy/components/assessment/ServiceAssessmentWorkspace.tsx

import type {
  CaseStudyAssessmentService,
} from "../../assessment/caseStudyAssessment.presentation";

import type {
  ImpactCriterionName,
  ServiceAnswer,
} from "../../types/caseStudy.types";

import {
  createDefaultServiceAnswer,
} from "../../utils/caseStudyInitialState.utils";

import AssessmentNavigation from "./AssessmentNavigation";
import FunctionalityLevelSelector from "./FunctionalityLevelSelector";
import ServiceAssessmentHeader from "./ServiceAssessmentHeader";
import ServiceInfoRow from "./ServiceInfoRow";
import ServiceNavigator from "./ServiceNavigator";
import ServiceScenarioPanel from "./ServiceScenarioPanel";
import ShareSelector from "./ShareSelector";

type ScenarioByServiceId =
  Record<
    string,
    {
      evidence:
        readonly string[];
    }
  >;

type ServiceAssessmentWorkspaceProps = {
  services:
    readonly CaseStudyAssessmentService[];

  isReviewMode?: boolean;

  selectedService:
    | CaseStudyAssessmentService
    | null;

  selectedServiceId:
    string;

  answers:
    Record<
      string,
      ServiceAnswer
    >;

  onChangeAnswer: (
    answer:
      ServiceAnswer,
  ) => void;

  errorsByField?:
    Record<
      string,
      string
    >;

  scenarioByServiceId:
    ScenarioByServiceId;

  onSelectService: (
    serviceId:
      string,
  ) => void;

  canSelectService: (
    serviceId:
      string,
  ) => boolean;

  isServiceValidated: (
    serviceId:
      string,
  ) => boolean;

  canGoPrevious:
    boolean;

  onPrevious:
    () => void;

  onSaveAndNext:
    () => void;

  onSubmitAssessment:
    () => void;

  isFinalRemainingService:
    boolean;
};

const ServiceAssessmentWorkspace = ({
  services,
  isReviewMode = false,
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
  if (
    !selectedService
  ) {
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

  const answer =
    answers[
      selectedService.id
    ] ??
    createDefaultServiceAnswer(
      selectedService.id,
    );

  const scenarioEvidence =
    scenarioByServiceId[
      selectedService.id
    ]?.evidence ??
    [];

  /*
  * SRI impact criteria are presented
  * dynamically according to the currently
  * selected functionality level(s).
  *
  * No selected level:
  * show every criterion that can receive
  * a non-zero impact score for this service.
  *
  * One selected level:
  * show only that level's non-zero criteria.
  *
  * Two selected levels:
  * take the functionality share into account
  * and show the union of the levels that
  * actually participate in the assessment.
  */
  const primaryLevel =
    selectedService
      .functionalityLevels
      .find(
        (level) =>
         level.id ===
         answer.selectedLevelId,
      ) ??
    null;
   
  const additionalLevel =
    selectedService
      .functionalityLevels
      .find(
       (level) =>
         level.id ===
         answer.additionalLevelId,
      ) ??
    null;
   
  const primaryImpactCriteria =
    primaryLevel
      ?.impactCriteria ??
    [];
   
  const additionalImpactCriteria =
     additionalLevel
      ?.impactCriteria ??
    [];
   
  const impactCriteria = (() => {
   /*
    * Nothing has been selected yet.
    *
    * Preserve the previous behaviour:
    * show all non-zero criteria that may
    * be affected by any functionality level.
    */
    if (
      !primaryLevel &&
      !additionalLevel
    ) {
     return selectedService
       .impactCriteria;
    }
   
    /*
    * Additional level exists without a
    * valid main level.
    */
   if (
     !primaryLevel &&
     additionalLevel
   ) {
     return additionalImpactCriteria;
   }
   
   /*
    * Main level exists without an
    * additional level.
    */
   if (
     primaryLevel &&
     !additionalLevel
   ) {
     return primaryImpactCriteria;
   }
   
   /*
    * At this point both levels exist.
    *
    * A 100% main share means that the
    * additional level contributes nothing.
    */
   if (
     answer.share >= 100
   ) {
     return primaryImpactCriteria;
   }
   
   /*
    * A 0% main share means that only the
    * additional level contributes.
    */
   if (
     answer.share <= 0
   ) {
     return additionalImpactCriteria;
   }
   
   /*
    * Both levels cover part of the building.
    *
    * Use the service-wide criterion list as
    * the ordering reference so the merged
    * result stays in canonical SRI order.
    */
   const selectedCriteria =
     new Set<
       ImpactCriterionName
     >([
       ...primaryImpactCriteria,
       ...additionalImpactCriteria,
     ]);
   
   return selectedService
     .impactCriteria
     .filter(
       (criterion) =>
         selectedCriteria.has(
           criterion,
         ),
     );
 })();

  const methodologyNote =
    selectedService
      .methodologyNote
      ?.trim() ||
    undefined;

  const selectedServiceDomId =
    createSafeId(
      selectedService.id,
    );

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
   * Validation feedback is revealed
   * in Assessment order:
   *
   * 1. Main functionality level
   * 2. Share
   * 3. Additional functionality level
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

  const updateAnswer =
    (
      changes:
        Partial<
          ServiceAnswer
        >,
    ) => {
      /*
       * Review mode is presentation-level
       * protection only.
       *
       * Completed earlier stages remain
       * immutable in the UI, while the
       * backend still keeps its canonical
       * mutation guards.
       */
      if (isReviewMode) {
        return;
      }

      onChangeAnswer({
        ...answer,
        ...changes,

        serviceId:
          selectedService
            .id,
      });
    };

  return (
    <div className="space-y-6">
      <p className="max-w-6xl text-sm font-medium leading-6 text-slate-500">
        Only smart-ready services identified as applicable for this building scenario 
        and requiring functionality-level assessment are shown. Non-applicable services 
        are not presented for user assessment.
      </p>

      <ServiceAssessmentHeader
        code={
          selectedService
            .code
        }
        serviceGroup={
          selectedService
            .serviceGroup
        }
        smartReadyService={
          selectedService
            .smartReadyService
        }
      />

      {/*
       * Service navigation remains available
       * in review mode so the learner can
       * inspect previously submitted services.
       */}
      <ServiceNavigator
        services={
          services
        }
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
      <fieldset
        disabled={
          isReviewMode
        }
        className="m-0 min-w-0 border-0 p-0"
      >
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
              selectedService
                .id
            }
            selectedLevelId={
              answer
                .selectedLevelId
            }
            levels={
              selectedService
                .functionalityLevels
            }
            onChangeLevel={(
              levelId,
            ) =>
              updateAnswer({
                selectedLevelId:
                  levelId,
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
              {
                selectedLevelError
              }
            </p>
          ) : null}
        </div>
      </fieldset>

      {/*
       * STEPS 2 + 3
       *
       * ShareSelector places each error
       * below its corresponding activity.
       */}
      <fieldset
        disabled={
          isReviewMode
        }
        className="m-0 min-w-0 border-0 p-0"
      >
        <ShareSelector
          key={
            selectedService
              .id
          }
          share={
            answer.share
          }
          additionalLevelId={
            answer
              .additionalLevelId
          }
          levels={
            selectedService
              .functionalityLevels
          }
          shareError={
            visibleShareError
          }
          additionalLevelError={
            visibleAdditionalLevelError
          }
          onChangeShare={(
            share,
          ) =>
            updateAnswer({
              share,

              additionalLevelId:
                share ===
                100
                  ? undefined
                  : answer
                      .additionalLevelId,
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
      </fieldset>

      <ServiceInfoRow
        impactCriteria={
          impactCriteria
        }
        methodologyNote={
          methodologyNote
        }
      />

      {/*
       * A reviewed Assessment stage has
       * already been completed, so there
       * are no mutation/navigation actions.
       */}
      {!isReviewMode ? (
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
      ) : null}
    </div>
  );
};

const createSafeId = (
  value:
    string,
) => {
  const normalizedValue =
    value
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