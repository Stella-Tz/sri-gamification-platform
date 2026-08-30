// client/src/features/caseStudy/components/assessment/AssessmentNavigation.tsx

import { ArrowLeft } from "lucide-react";

import ForwardArrowIcon from "../../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

type AssessmentNavigationProps = {
  canGoPrevious: boolean;
  isFinalRemainingService: boolean;
  onPrevious: () => void;
  onSaveAndNext: () => void;
  onSubmitAssessment: () => void;
};

const AssessmentNavigation = ({
  canGoPrevious,
  isFinalRemainingService,
  onPrevious,
  onSaveAndNext,
  onSubmitAssessment,
}: AssessmentNavigationProps) => {
  const primaryButtonLabel =
    isFinalRemainingService
      ? "Submit Assessment"
      : "Save & Next Service";

  const handlePrimaryAction =
    isFinalRemainingService
      ? onSubmitAssessment
      : onSaveAndNext;

  return (
    <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
      {canGoPrevious ? (
        <button
          type="button"
          onClick={onPrevious}
          className="
            inline-flex
            min-h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-blue-200
            bg-white
            px-5
            py-2.5
            text-sm
            font-extrabold
            text-blue-700
            shadow-sm
            transition-colors
            duration-200
            hover:bg-blue-50
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
            sm:w-auto
          "
        >
          <ArrowLeft
            size={18}
            aria-hidden="true"
          />

          Previous Service
        </button>
      ) : null}

      <PrimaryButton
        onClick={handlePrimaryAction}
        className="group w-full sm:ml-auto sm:w-auto"
      >
        <span className="inline-flex items-center gap-2">
          {primaryButtonLabel}

          <ForwardArrowIcon />
        </span>
      </PrimaryButton>
    </div>
  );
};

export default AssessmentNavigation;