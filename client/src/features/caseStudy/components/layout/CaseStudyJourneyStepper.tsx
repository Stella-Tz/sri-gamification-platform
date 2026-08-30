// client/src/features/caseStudy/components/layout/CaseStudyJourneyStepper.tsx

import {
  useEffect,
  useRef,
} from "react";

import { Check } from "lucide-react";

import type { CaseStudyJourneyStage } from "../../types/caseStudy.types";

type JourneyStageItem = {
  id: CaseStudyJourneyStage;
  label: string;
};

type Props = {
  currentStage: CaseStudyJourneyStage;
};

const journeyStages: readonly JourneyStageItem[] = [
  {
    id: "building-information",
    label: "Building Information",
  },
  {
    id: "service-assessment",
    label: "Service Assessment",
  },
  {
    id: "results",
    label: "Results",
  },
  {
    id: "guided-improvement-analysis",
    label: "Guided Analysis",
  },
  {
    id: "simulation-results",
    label: "Simulation Results",
  },
];

const CaseStudyJourneyStepper = ({
  currentStage,
}: Props) => {
  const scrollContainerRef =
    useRef<HTMLElement | null>(null);

  const currentStageRef =
    useRef<HTMLDivElement | null>(null);

  const currentIndex = journeyStages.findIndex(
    (stage) => stage.id === currentStage,
  );

  useEffect(() => {
    const scrollContainer =
      scrollContainerRef.current;

    const currentStageElement =
      currentStageRef.current;

    if (
      !scrollContainer ||
      !currentStageElement
    ) {
      return;
    }

    const maximumScrollLeft =
      Math.max(
        0,
        scrollContainer.scrollWidth -
          scrollContainer.clientWidth,
      );

    if (maximumScrollLeft <= 0) {
      return;
    }

    const containerRect =
      scrollContainer.getBoundingClientRect();

    const currentStageRect =
      currentStageElement.getBoundingClientRect();

    const targetScrollLeft =
      scrollContainer.scrollLeft +
      currentStageRect.left -
      containerRect.left -
      (scrollContainer.clientWidth -
        currentStageRect.width) /
        2;

    scrollContainer.scrollTo({
      left: Math.min(
        maximumScrollLeft,
        Math.max(0, targetScrollLeft),
      ),
      behavior: "auto",
    });
  }, [currentStage]);

  return (
    <nav
      ref={scrollContainerRef}
      aria-label="Case study journey progress"
      style={{
        contain: "layout paint",
      }}
      className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-2"
    >
      <ol className="flex min-w-[840px] items-start">
        {journeyStages.map((stage, index) => {
          const isCompleted =
            index < currentIndex;

          const isCurrent =
            index === currentIndex;

          const isLast =
            index === journeyStages.length - 1;

          return (
            <li
              key={stage.id}
              className="flex flex-1 items-start last:flex-none"
            >
              <div
                ref={
                  isCurrent
                    ? currentStageRef
                    : undefined
                }
                className="flex min-w-[132px] flex-col items-center text-center"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-extrabold transition-colors duration-200 ${
                    isCurrent
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : isCompleted
                        ? "border-slate-700 bg-slate-700 text-white"
                        : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check
                      size={16}
                      aria-hidden="true"
                    />
                  ) : (
                    index + 1
                  )}
                </span>

                <span
                  aria-current={
                    isCurrent ? "step" : undefined
                  }
                  className={`mt-2 text-xs font-extrabold leading-4 ${
                    isCurrent
                      ? "text-blue-700"
                      : isCompleted
                        ? "text-slate-700"
                        : "text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <span className="sr-only">
                      Completed:{" "}
                    </span>
                  ) : null}

                  {stage.label}
                </span>
              </div>

              {!isLast ? (
                <div
                  aria-hidden="true"
                  className={`mt-[18px] h-px flex-1 ${
                    isCompleted
                      ? "bg-slate-700"
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

export default CaseStudyJourneyStepper;