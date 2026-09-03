// client/src/features/caseStudy/components/improvement/GuidedImprovementQuestionStepper.tsx

import {
  useEffect,
  useRef,
} from "react";

import { Check } from "lucide-react";

import type {
  GuidedImprovementPublicQuestion,
} from "../../improvement/guidedImprovement.types";

type GuidedImprovementQuestionStepperProps = {
  questions:
    readonly GuidedImprovementPublicQuestion[];

  currentIndex: number;
};

const stepLabels: Readonly<
  Record<string, string>
> = {
  "highest-impact-criterion":
    "Impact Criterion",
  "highest-weight-domain":
    "Technical Domain",
  "highest-impact-service":
    "Selected Service",
};

const GuidedImprovementQuestionStepper = ({
  questions,
  currentIndex,
}: GuidedImprovementQuestionStepperProps) => {
  const scrollContainerRef =
    useRef<HTMLElement | null>(null);

  const activeStepRef =
    useRef<HTMLDivElement | null>(null);

  const hasMountedRef =
    useRef(false);

  useEffect(() => {
    /*
     * The first step is already visible on the initial render.
     * Skipping the first run prevents any unnecessary movement.
     */
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const scrollContainer =
      scrollContainerRef.current;

    const activeStep =
      activeStepRef.current;

    if (!scrollContainer || !activeStep) {
      return;
    }

    const containerRect =
      scrollContainer.getBoundingClientRect();

    const activeStepRect =
      activeStep.getBoundingClientRect();

    const targetScrollLeft =
      scrollContainer.scrollLeft +
      activeStepRect.left -
      containerRect.left -
      (scrollContainer.clientWidth -
        activeStepRect.width) /
        2;

    const maximumScrollLeft =
      Math.max(
        0,
        scrollContainer.scrollWidth -
          scrollContainer.clientWidth,
      );

    scrollContainer.scrollTo({
      left: Math.min(
        maximumScrollLeft,
        Math.max(0, targetScrollLeft),
      ),
      behavior: "auto",
    });
  }, [currentIndex]);

  return (
    <nav
      ref={scrollContainerRef}
      aria-label="Guided improvement analysis progress"
      tabIndex={0}
      style={{
        contain: "layout paint",
      }}
      className="results-horizontal-scroll w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-2xl px-2 pb-3 pt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <ol className="mx-auto flex min-w-[720px] max-w-[920px] items-start">
        {questions.map((question, index) => {
          const stepNumber =
            index + 1;

          const isActive =
            index === currentIndex;

          const isDone =
            index < currentIndex;

          const isLast =
            index ===
            questions.length - 1;

          const label =
            stepLabels[question.id] ??
            `Question ${stepNumber}`;

          return (
            <li
              key={question.id}
              aria-current={
                isActive
                  ? "step"
                  : undefined
              }
              className="flex flex-1 items-start last:flex-none"
            >
              <div
                ref={
                  isActive
                    ? activeStepRef
                    : undefined
                }
                className="flex w-[132px] flex-col items-center text-center"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-extrabold transition-colors duration-200 ${
                    isActive
                      ? "border-blue-100 bg-blue-600 text-white ring-4 ring-blue-100"
                      : isDone
                        ? "border-emerald-100 bg-emerald-600 text-white"
                        : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  {isDone ? (
                    <Check
                      size={17}
                      aria-hidden="true"
                    />
                  ) : (
                    stepNumber
                  )}
                </span>

                <span
                  className={`mt-3 break-words text-xs font-extrabold leading-4 ${
                    isActive
                      ? "text-blue-700"
                      : isDone
                        ? "text-emerald-700"
                        : "text-slate-500"
                  }`}
                >
                  <span className="sr-only">
                    {isDone
                      ? "Completed: "
                      : isActive
                        ? "Current step: "
                        : ""}
                  </span>

                  {label}
                </span>
              </div>

              {!isLast ? (
                <div
                  aria-hidden="true"
                  className={`mt-[22px] h-px flex-1 transition-colors duration-200 ${
                    isDone
                      ? "bg-emerald-200"
                      : "bg-slate-300"
                  }`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default GuidedImprovementQuestionStepper;
