// client/src/features/course/components/FinalTestQuestionCard.tsx

import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";

import type {
  CourseQuestion,
  FinalTestFeedback,
} from "../course.types";

import AssessmentHeader from "./AssessmentHeader";

type FinalTestQuestionCardProps = {
  eyebrow: string;

  currentQuestionNumber: number;
  totalQuestions: number;

  question: CourseQuestion;

  selectedOptionId:
    | string
    | null;

  feedback:
    FinalTestFeedback;

  isSubmitted: boolean;
  remainingMistakes: number;

  onSelectOption: (
    optionId: string,
  ) => void;

  onSubmitAnswer: () => void;
  onContinue: () => void;
};

const FinalTestQuestionCard = ({
  eyebrow,

  currentQuestionNumber,
  totalQuestions,

  question,

  selectedOptionId,
  feedback,

  isSubmitted,
  remainingMistakes,

  onSelectOption,
  onSubmitAnswer,
  onContinue,
}: FinalTestQuestionCardProps) => {
  const hasVisibleFeedback =
    feedback === "correct" ||
    feedback === "incorrect";

  const feedbackId =
    `${question.id}-final-test-feedback`;

  const mistakesStatusText =
    `${remainingMistakes} ${
      remainingMistakes === 1
        ? "Mistake"
        : "Mistakes"
    } Remaining`;

  return (
    <article className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm">
      <AssessmentHeader
        eyebrow={eyebrow}
        title={question.prompt}
        currentQuestionNumber={
          currentQuestionNumber
        }
        totalQuestions={
          totalQuestions
        }
        statusText={
          mistakesStatusText
        }
        statusTone={
          remainingMistakes === 0
            ? "red"
            : "amber"
        }
      />

      <div className="px-5 pb-6 pt-14 sm:px-6 sm:pb-7 sm:pt-16 lg:px-8 lg:pb-8">
        <fieldset
          disabled={isSubmitted}
          aria-describedby={
            hasVisibleFeedback
              ? feedbackId
              : undefined
          }
        >
          <legend className="sr-only">
            {question.prompt}
          </legend>

          <div className="grid gap-3">
            {question.options.map(
              (option, index) => {
                const inputId =
                  `${question.id}-${option.id}`;

                const isSelected =
                  selectedOptionId ===
                  option.id;

                return (
                  <label
                    key={option.id}
                    htmlFor={inputId}
                    className={`
                      relative
                      flex
                      min-w-0
                      items-start
                      gap-3
                      rounded-2xl
                      border
                      px-4
                      py-4
                      text-sm
                      font-semibold
                      leading-6
                      transition-none
                      sm:px-5
                      ${getOptionClassName({
                        isSelected,
                        isSubmitted,
                        feedback,
                      })}
                    `}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={isSelected}
                      onChange={() =>
                        onSelectOption(
                          option.id,
                        )
                      }
                      className="peer sr-only"
                    />

                    <span
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-2xl
                        peer-focus-visible:outline
                        peer-focus-visible:outline-2
                        peer-focus-visible:outline-offset-2
                        peer-focus-visible:outline-blue-300
                      "
                      aria-hidden="true"
                    />

                    <span
                      className={`
                        relative
                        z-10
                        shrink-0
                        font-extrabold
                        ${
                          isSelected
                            ? "text-current"
                            : "text-blue-950"
                        }
                      `}
                      aria-hidden="true"
                    >
                      {getOptionLabel(
                        index,
                      )}.
                    </span>

                    <span className="relative z-10 min-w-0 break-words">
                      {option.text}
                    </span>
                  </label>
                );
              },
            )}
          </div>
        </fieldset>

        {hasVisibleFeedback ? (
          <div
            id={feedbackId}
            className="mt-5"
            aria-live="polite"
          >
            <FinalTestFeedbackMessage
              feedback={feedback}
            />
          </div>
        ) : null}

        <div className="mt-6 flex justify-end">
          {isSubmitted ? (
            <PrimaryButton
              type="button"
              onClick={onContinue}
              className="group w-full justify-center sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                Next Question

                <ForwardArrowIcon />
              </span>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              type="button"
              onClick={onSubmitAnswer}
              disabled={
                selectedOptionId ===
                null
              }
              className="
                w-full
                justify-center
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              Check Answer
            </PrimaryButton>
          )}
        </div>
      </div>
    </article>
  );
};

type OptionClassNameOptions = {
  isSelected: boolean;
  isSubmitted: boolean;

  feedback:
    FinalTestFeedback;
};

const getOptionClassName = ({
  isSelected,
  isSubmitted,
  feedback,
}: OptionClassNameOptions): string => {
  if (
    isSelected &&
    isSubmitted &&
    feedback === "correct"
  ) {
    return `
      cursor-default
      border-emerald-300
      bg-emerald-50
      text-emerald-950
    `;
  }

  if (
    isSelected &&
    isSubmitted &&
    feedback === "incorrect"
  ) {
    return `
      cursor-default
      border-red-300
      bg-red-50
      text-red-950
    `;
  }

  if (isSubmitted) {
    return `
      cursor-default
      border-slate-200
      bg-white
      text-slate-500
    `;
  }

  if (isSelected) {
    return `
      cursor-pointer
      border-blue-300
      bg-blue-50
      text-blue-950
    `;
  }

  return `
    cursor-pointer
    border-slate-200
    bg-white
    text-slate-700
    hover:border-blue-200
    hover:bg-blue-50/30
  `;
};

type FinalTestFeedbackMessageProps = {
  feedback:
    FinalTestFeedback;
};

const FinalTestFeedbackMessage = ({
  feedback,
}: FinalTestFeedbackMessageProps) => {
  if (feedback === "correct") {
    return (
      <div
        role="status"
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-emerald-200
          bg-emerald-50
          px-4
          py-3
          text-sm
          font-semibold
          leading-6
          text-emerald-700
        "
      >
        <CheckCircle2
          size={19}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        <p>Correct Answer</p>
      </div>
    );
  }

  if (
    feedback === "incorrect"
  ) {
    return (
      <div
        role="alert"
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-red-200
          bg-red-50
          px-4
          py-3
          text-sm
          font-semibold
          leading-6
          text-red-700
        "
      >
        <XCircle
          size={19}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        <p>Incorrect Answer</p>
      </div>
    );
  }

  return null;
};

const getOptionLabel = (
  index: number,
): string => {
  return String.fromCharCode(
    65 + index,
  );
};

export default FinalTestQuestionCard;