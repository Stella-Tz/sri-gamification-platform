// client/src/features/caseStudy/components/improvement/GuidedImprovementQuestionCard.tsx

import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import ForwardArrowIcon from "../../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

import keyFunctionalitiesImpactCriteriaImage from "../../../../assets/caseStudy/key_functionalities_and_impact_criteria.png";

import type {
  ImpactCriterionName,
  TechnicalDomainName,
} from "../../types/caseStudy.types";

import type {
  GuidedImprovementDomainWeightingTable,
  GuidedImprovementPublicQuestion,
  GuidedImprovementServiceMaximumImpactScoresTable,
} from "../../improvement/guidedImprovement.types";

import DomainWeightingTable from "./DomainWeightingTable";
import GuidedImprovementQuestionStepper from "./GuidedImprovementQuestionStepper";
import ServiceMaximumImpactScoresTable from "./ServiceMaximumImpactScoresTable";

type FeedbackState =
  | "correct"
  | "wrong"
  | "empty"
  | null;

type GuidedImprovementQuestionCardProps = {
  questions:
    readonly GuidedImprovementPublicQuestion[];

  currentIndex: number;

  currentQuestion:
    GuidedImprovementPublicQuestion;

  selectedOptionValue: string;
  feedback: FeedbackState;

    resolvedImpactCriterion:
      | ImpactCriterionName
      | null;

    resolvedTechnicalDomain:
      | TechnicalDomainName
      | null;

    isChecking: boolean;
    isAdvancing: boolean;

  hasSimulationScenario: boolean;

  domainWeightingTable:
    | GuidedImprovementDomainWeightingTable
    | null;

  serviceMaximumImpactScoresTable:
    | GuidedImprovementServiceMaximumImpactScoresTable
    | null;

  onSelectOption: (
    value: string,
  ) => void;

  onCheckAnswer: () => void;
  onNextQuestion: () => void;

  onContinueToSimulation:
    () => void;

  isLastQuestion: boolean;
};


const GuidedImprovementQuestionCard = ({
  questions,
  currentIndex,
  currentQuestion,
  selectedOptionValue,
  feedback,
  resolvedImpactCriterion,
  resolvedTechnicalDomain,
  isChecking,
  isAdvancing,
  hasSimulationScenario,
  domainWeightingTable,
  serviceMaximumImpactScoresTable,
  onSelectOption,
  onCheckAnswer,
  onNextQuestion,
  onContinueToSimulation,
  isLastQuestion,
}: GuidedImprovementQuestionCardProps) => {
  const selectedImpactCriterion =
    resolvedImpactCriterion ??
    undefined;

  const selectedDomain =
    resolvedTechnicalDomain ??
    undefined;

  const isBusy =
    isChecking ||
    isAdvancing;

  const shouldShowHintVisuals =
    feedback === "wrong";

  const handleCorrectAction = () => {
    if (isBusy) {
      return;
    }

    if (isLastQuestion) {
      onContinueToSimulation();
      return;
    }

    onNextQuestion();
  };

  return (
    <section className="min-w-0 max-w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="min-w-0">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
          Interactive Analysis
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          Answer the following questions step by step.
        </p>
      </div>

      <div className="mt-6">
        <GuidedImprovementQuestionStepper
          questions={questions}
          currentIndex={currentIndex}
        />
      </div>

      <article className="mt-6 min-w-0 max-w-full rounded-3xl border border-blue-100 bg-blue-100/40 p-5 sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">
          Analysis question
        </p>

        <h3 className="mt-3 break-words text-xl font-extrabold leading-8 text-blue-950">
          {currentQuestion.title}
        </h3>

        <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-600">
          {currentQuestion.context}
        </p>

        {currentQuestion.id ===
        "highest-impact-criterion" ? (
          <div
            role="region"
            tabIndex={0}
            aria-label="Official SRI relationship between key functionalities and impact criteria. Scroll horizontally to view the full diagram."
            style={{
              contain: "layout paint",
            }}
            className="results-horizontal-scroll mb-7 mt-7 w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <div className="flex min-w-[560px] justify-center lg:min-w-0">
              <img
                src={keyFunctionalitiesImpactCriteriaImage}
                alt="Official SRI relationship between key functionalities and impact criteria"
                className="w-[560px] max-w-none object-contain lg:w-full lg:max-w-[780px]"
              />
            </div>
          </div>
        ) : null}

        {currentQuestion.id ===
          "highest-weight-domain" &&
        selectedImpactCriterion &&
        domainWeightingTable ? (
          <DomainWeightingTable
            table={
              domainWeightingTable
            }
            focusImpactCriterion={
              selectedImpactCriterion
            }
            showHighlight={
              shouldShowHintVisuals
            }
          />
        ) : null}

        {currentQuestion.id ===
          "highest-impact-service" &&
        selectedImpactCriterion &&
        selectedDomain &&
        serviceMaximumImpactScoresTable ? (
          <ServiceMaximumImpactScoresTable
            table={
              serviceMaximumImpactScoresTable
            }
            impactCriterion={
              selectedImpactCriterion
            }
            showHighlight={
              shouldShowHintVisuals
            }
          />
        ) : null}

        <p className="mt-5 text-sm font-extrabold leading-6 text-blue-950">
          Select one option:
        </p>

        <fieldset
          aria-disabled={isBusy}
          className={`mt-3 grid gap-3 md:grid-cols-2 ${
            isBusy
              ? "pointer-events-none select-none"
              : ""
          }`}
        >
          <legend className="sr-only">
            {currentQuestion.title}
          </legend>

          {currentQuestion.options.map(
            (option) => {
              const isSelected =
                selectedOptionValue ===
                option.value;

              return (
                <label
                  key={option.value}
                  className={`flex min-w-0 items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-colors duration-200 ${
                    isBusy
                      ? "cursor-default"
                      : "cursor-pointer"
                  } ${
                    isSelected
                      ? "border-blue-300 ring-4 ring-blue-100"
                      : isBusy
                        ? "border-slate-200"
                        : "border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <input
                    type="radio"
                    name={
                      currentQuestion.id
                    }
                    value={
                      option.value
                    }
                    checked={
                      isSelected
                    }
                    aria-disabled={isBusy}
                    tabIndex={isBusy ? -1 : 0}
                    onChange={() => {
                      if (isBusy) {
                        return;
                      }

                      onSelectOption(
                        option.value,
                      );
                    }}
                    className="h-4 w-4 shrink-0 accent-blue-600"
                  />

                  <span className="min-w-0 break-words">
                    {option.label}
                  </span>
                </label>
              );
            },
          )}
        </fieldset>

        {feedback ? (
          <div className="mt-5">
            {feedback === "empty" ? (
              <FeedbackBox variant="empty">
                Please select an answer before checking.
              </FeedbackBox>
            ) : null}

            {feedback === "wrong" ? (
              <FeedbackBox variant="wrong">
                {
                  currentQuestion
                    .wrongFeedback
                }
              </FeedbackBox>
            ) : null}

            {feedback === "correct" ? (
              <FeedbackBox variant="correct">
                {isLastQuestion
                  ? hasSimulationScenario
                    ? "Correct. The selected simulation scenario is now ready."
                    : "Correct. The analysis outcome is now ready."
                  : "Correct. You can continue to the next step."}
              </FeedbackBox>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex justify-end">
          {feedback === "correct" ? (
            <PrimaryButton
              onClick={
                handleCorrectAction
              }
              className="
                group
                w-full
                px-7
                sm:w-auto
                disabled:!bg-blue-600
                disabled:!opacity-100
              "
              disabled={isAdvancing}
            >
              <span className="inline-flex items-center gap-2">
                {isLastQuestion
                  ? hasSimulationScenario
                    ? "Show Simulation Scenario"
                    : "View Analysis Outcome"
                  : "Next Question"}

                <ForwardArrowIcon />
              </span>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={
                onCheckAnswer
              }
              className="
                w-full
                px-7
                sm:w-auto
                disabled:!bg-blue-600
                disabled:!opacity-100
              "
              disabled={isChecking || isAdvancing}
            >
              Check Answer
            </PrimaryButton>
          )}
        </div>
      </article>
    </section>
  );
};

type FeedbackBoxProps = {
  variant:
    | "empty"
    | "wrong"
    | "correct";

  children: string;
};

const FeedbackBox = ({
  variant,
  children,
}: FeedbackBoxProps) => {
  const styles = {
    empty:
      "bg-amber-50 text-amber-700",
    wrong:
      "bg-red-50 text-red-700",
    correct:
      "bg-emerald-50 text-emerald-700",
  } as const;

  const Icon =
    variant === "correct"
      ? CheckCircle2
      : XCircle;

  const role =
    variant === "correct"
      ? "status"
      : "alert";

  return (
    <div
      role={role}
      className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${styles[variant]}`}
    >
      <Icon
        size={18}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />

      <span className="min-w-0 break-words">
        {children}
      </span>
    </div>
  );
};

export default GuidedImprovementQuestionCard;
