// client/src/features/dashboard/components/LearningJourneyCard.tsx

import { useLayoutEffect, useMemo, useRef } from "react";
import { Check } from "lucide-react";

import Card from "../../../components/ui/Card";
import type { JourneyStep } from "../dashboard.types";

type LearningJourneyCardProps = {
  steps: JourneyStep[];
};

const LearningJourneyCard = ({ steps }: LearningJourneyCardProps) => {
  const completedCount = steps.filter(
    (step) => step.status === "completed",
  ).length;

  const focusStepId = useMemo(() => {
    const currentStep = steps.find(
      (step) => step.status === "current",
    );

    if (currentStep) {
      return currentStep.id;
    }

    const lastCompletedStep = [...steps]
      .reverse()
      .find(
        (step) =>
          step.status === "completed",
      );

    return lastCompletedStep?.id ?? null;
  }, [steps]);

  const scrollContainerRef =
    useRef<HTMLDivElement | null>(null);

  const focusStepRef =
    useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (
      !scrollContainerRef.current ||
      !focusStepRef.current
    ) {
      return;
    }

    const container =
      scrollContainerRef.current;

    const node =
      focusStepRef.current;

    const targetScrollLeft =
      node.offsetLeft -
      container.clientWidth / 2 +
      node.offsetWidth / 2;

    const maxScrollLeft =
      Math.max(
        0,
        container.scrollWidth -
          container.clientWidth,
      );

    container.scrollLeft =
      Math.max(
        0,
        Math.min(
          targetScrollLeft,
          maxScrollLeft,
        ),
      );
  }, [focusStepId]);

  return (
    <Card className="h-full min-w-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
            Learning Path
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            Learning Journey
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Follow your progress through the theory sections and the practical SRI case study.
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {completedCount}/{steps.length} completed
        </span>
      </div>

      <div className="mt-6 min-w-0">
        <div
          ref={scrollContainerRef}
          className="learning-journey-scroll w-full max-w-full overflow-x-auto pb-2 pt-3"
        >
          <div className="relative w-max min-w-full px-6">
            <div className="absolute left-[66px] right-[66px] top-5 h-[2px] bg-slate-200" />

            <div className="relative flex items-start gap-8">
              {steps.map((step) => {
                const isCompleted =
                  step.status === "completed";

                const isCurrent =
                  step.status === "current";

                const isLocked =
                  step.status === "locked";

                const isFocusStep =
                  step.id === focusStepId;

                return (
                  <div
                    key={step.id}
                    ref={
                      isFocusStep
                        ? focusStepRef
                        : null
                    }
                    className="flex w-[128px] shrink-0 flex-col items-center text-center"
                  >
                    <div
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-600 ring-2 ring-emerald-200"
                          : isCurrent
                            ? "bg-blue-100 text-blue-600 ring-2 ring-blue-200 shadow-[0_0_0_8px_rgba(59,130,246,0.08)]"
                            : "bg-slate-100 text-slate-400 ring-2 ring-slate-200"
                      }`}
                    >
                      {isCompleted ? (
                        <Check
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      ) : (
                        step.order
                      )}
                    </div>

                    <p
                      className={`mt-4 break-words text-sm font-semibold leading-5 ${
                        isLocked
                          ? "text-slate-400"
                          : "text-slate-900"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        isCompleted
                          ? "text-emerald-600"
                          : isCurrent
                            ? "text-blue-600"
                            : "text-slate-400"
                      }`}
                    >
                      {isCompleted
                        ? "Completed"
                        : isCurrent
                          ? "Current step"
                          : "Locked"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-slate-400">
          Scroll horizontally to view the full journey
        </p>
      </div>
    </Card>
  );
};

export default LearningJourneyCard;
