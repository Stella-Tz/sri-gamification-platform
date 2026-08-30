// client/src/features/course/components/AssessmentQuestionCard.tsx

import {
  CheckCircle2,
  CircleAlert,
  XCircle,
} from "lucide-react";

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";

import type {
  CourseQuestion,
  LessonQuizFeedback,
} from "../course.types";

import AssessmentHeader from "./AssessmentHeader";


type AssessmentQuestionCardProps = {
  eyebrow: string;

  currentQuestionNumber: number;
  totalQuestions: number;

  question: CourseQuestion;

  correctOptionId:
    | string
    | null;

  explanation:
    | string
    | null;

  isSubmittingAnswer?: boolean;
  isContinuing?: boolean;

  selectedOptionId:
    | string
    | null;

  feedback:
    LessonQuizFeedback;

  isLastQuestion: boolean;

  onSelectOption: (
    optionId: string,
  ) => void;

  onSubmitAnswer: () => void;
  onContinue: () => void;

  finalActionLabel?: string;
};

const AssessmentQuestionCard = ({
  eyebrow,

  currentQuestionNumber,
  totalQuestions,

  question,
  correctOptionId,
  explanation,
  isSubmittingAnswer = false,
  isContinuing = false,

  selectedOptionId,
  feedback,

  isLastQuestion,

  onSelectOption,
  onSubmitAnswer,
  onContinue,

  finalActionLabel = "Complete Quiz",
}: AssessmentQuestionCardProps) => {
  const isSubmitted =
    feedback === "correct" ||
    feedback === "incorrect";

  const hasVisibleFeedback =
    feedback === "correct" ||
    feedback === "incorrect";

  const feedbackId =
    `${question.id}-feedback`;

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

                const isCorrectOption =
                  option.id ===
                  correctOptionId;

                const showCorrectState =
                  isSubmitted &&
                  isCorrectOption;

                const showIncorrectState =
                  isSubmitted &&
                  feedback ===
                    "incorrect" &&
                  isSelected &&
                  !isCorrectOption;

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
                        isCorrectOption,
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
                        ${getOptionLabelClassName({
                          showCorrectState,
                          showIncorrectState,
                          isSelected,
                        })}
                      `}
                      aria-hidden="true"
                    >
                      {getOptionLabel(
                        index,
                      )}.
                    </span>

                    <span className="relative z-10 min-w-0 flex-1 break-words">
                      {option.text}
                    </span>

                    {showCorrectState ? (
                      <>
                        <CheckCircle2
                          size={19}
                          strokeWidth={2.3}
                          className="relative z-10 mt-0.5 shrink-0 text-emerald-600"
                          aria-hidden="true"
                        />

                        <span className="sr-only">
                          Correct answer
                        </span>
                      </>
                    ) : null}

                    {showIncorrectState ? (
                      <>
                        <XCircle
                          size={19}
                          strokeWidth={2.3}
                          className="relative z-10 mt-0.5 shrink-0 text-red-600"
                          aria-hidden="true"
                        />

                        <span className="sr-only">
                          Selected incorrect
                          answer
                        </span>
                      </>
                    ) : null}
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
            <QuizFeedbackMessage
              feedback={feedback}
              explanation={
                explanation ?? undefined
              }
            />
          </div>
        ) : null}

        <div className="mt-6 flex justify-end">
          {isSubmitted ? (
            <PrimaryButton
              type="button"
              onClick={onContinue}
              disabled={isContinuing}
              className="group w-full justify-center sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                {isLastQuestion
                  ? finalActionLabel
                  : "Next Question"}

                <ForwardArrowIcon />
              </span>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              type="button"
              onClick={onSubmitAnswer}
              disabled={
                selectedOptionId === null ||
                isSubmittingAnswer
              }
              className="
                w-full
                justify-center
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              {isSubmittingAnswer
                ? "Checking..."
                : "Check Answer"}
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
  isCorrectOption: boolean;

  feedback:
    LessonQuizFeedback;
};

const getOptionClassName = ({
  isSelected,
  isSubmitted,
  isCorrectOption,
  feedback,
}: OptionClassNameOptions): string => {
  if (
    isSubmitted &&
    isCorrectOption
  ) {
    return `
      cursor-default
      border-emerald-300
      bg-emerald-50
      text-emerald-950
    `;
  }

  if (
    isSubmitted &&
    feedback === "incorrect" &&
    isSelected &&
    !isCorrectOption
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

type OptionLabelClassNameOptions = {
  showCorrectState: boolean;
  showIncorrectState: boolean;
  isSelected: boolean;
};

const getOptionLabelClassName = ({
  showCorrectState,
  showIncorrectState,
  isSelected,
}: OptionLabelClassNameOptions): string => {
  if (showCorrectState) {
    return "text-emerald-800";
  }

  if (showIncorrectState) {
    return "text-red-800";
  }

  if (isSelected) {
    return "text-current";
  }

  return "text-blue-950";
};

type QuizFeedbackMessageProps = {
  feedback:
    LessonQuizFeedback;

  explanation?: string;
};

const QuizFeedbackMessage = ({
  feedback,
  explanation,
}: QuizFeedbackMessageProps) => {
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
          strokeWidth={2.3}
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
          rounded-2xl
          border
          border-amber-200
          bg-amber-50
          px-4
          py-3
          text-sm
          font-semibold
          leading-6
          text-amber-800
        "
      >
        <div className="flex items-start gap-3">
          <CircleAlert
            size={19}
            strokeWidth={2.3}
            className="mt-0.5 shrink-0 text-amber-600"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <p className="font-extrabold">
              Not Quite
            </p>

            {explanation ? (
              <p className="mt-2 break-words text-amber-800">
                {explanation}
              </p>
            ) : null}
          </div>
        </div>
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

export default AssessmentQuestionCard;