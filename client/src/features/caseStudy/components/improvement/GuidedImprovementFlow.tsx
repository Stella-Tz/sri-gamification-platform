// client/src/features/caseStudy/components/improvement/GuidedImprovementFlow.tsx

import {
  ArrowRight,
  BarChart3,
  Building2,
  ListChecks,
  SlidersHorizontal,
  Target,
} from "lucide-react";

const flowSteps = [
  {
    label: "Impact criterion",
    description:
      "Identify the impact criterion with the highest official weight.",
    icon: BarChart3,
    circleClassName:
      "bg-violet-50 text-violet-700 ring-violet-100",
  },
  {
    label: "Technical domain",
    description:
      "Find the technical domain with the highest official weight for that impact criterion.",
    icon: Building2,
    circleClassName:
      "bg-blue-50 text-blue-700 ring-blue-100",
  },
  {
    label: "Applicable services",
    description:
      "List the services available in that domain and review their impact scores.",
    icon: ListChecks,
    circleClassName:
      "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  {
    label: "Highest service impact",
    description:
      "Select the service with the highest impact score at maximum functionality level.",
    icon: Target,
    circleClassName:
      "bg-amber-50 text-amber-700 ring-amber-100",
  },
  {
    label: "Simulation",
    description:
      "Upgrade that service to its maximum functionality level and recalculate the SRI score using the official calculation method.",
    icon: SlidersHorizontal,
    circleClassName:
      "bg-purple-50 text-purple-700 ring-purple-100",
  },
] as const;

const GuidedImprovementFlow = () => {
  return (
    <section className="min-w-0 max-w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
        Analysis Overview
      </h2>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
        Follow the reasoning path step by step to select a smart-ready
        service for the simulated upgrade.
      </p>

      <div
        role="region"
        tabIndex={0}
        aria-label="Guided improvement analysis overview. Scroll horizontally to view all steps."
        style={{
          contain: "layout paint",
        }}
        className="results-horizontal-scroll mt-8 w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-2xl px-1 pb-3 pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <ol className="mx-auto flex min-w-[1106px] max-w-6xl items-start justify-center">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast =
              index === flowSteps.length - 1;

            return (
              <li
                key={step.label}
                className="flex items-start"
              >
                <div className="flex w-[170px] min-w-0 flex-col items-center text-center">
                  <div
                    aria-hidden="true"
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ring-1 ${step.circleClassName}`}
                  >
                    <Icon
                      size={34}
                      strokeWidth={2.2}
                    />
                  </div>

                  <h3 className="mt-4 break-words text-sm font-extrabold leading-5 text-blue-950">
                    {step.label}
                  </h3>

                  <p className="mt-2 max-w-[150px] break-words text-xs font-semibold leading-5 text-slate-600">
                    {step.description}
                  </p>
                </div>

                {!isLast ? (
                  <div
                    aria-hidden="true"
                    className="mt-[30px] flex w-16 shrink-0 items-center justify-center"
                  >
                    <ArrowRight
                      size={20}
                      className="text-slate-400"
                    />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default GuidedImprovementFlow;
