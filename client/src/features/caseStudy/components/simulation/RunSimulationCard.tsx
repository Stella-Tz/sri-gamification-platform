// client/src/features/caseStudy/components/simulation/RunSimulationCard.tsx

import { useId } from "react";

import { Play } from "lucide-react";

import runSimulationImage from "../../../../assets/caseStudy/run_simulation.png";

type RunSimulationCardProps = {
  onRunSimulation: () => void;
  isSimulationRun?: boolean;
};

const RunSimulationCard = ({
  onRunSimulation,
  isSimulationRun = false,
}: RunSimulationCardProps) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:items-center">
        <div
          aria-hidden="true"
          className="flex justify-center lg:justify-start"
        >
          <img
            src={runSimulationImage}
            alt=""
            className="h-32 max-w-full object-contain"
          />
        </div>

        <div className="min-w-0 text-center lg:text-left">
          <h2
            id={titleId}
            className="break-words text-2xl font-extrabold tracking-tight text-blue-950"
          >
            Run Simulation
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500 lg:mx-0">
            Apply this recommendation and compare the current SRI score
            with the simulated upgrade scenario. All other assessed
            services remain unchanged.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <button
            type="button"
            onClick={onRunSimulation}
            disabled={isSimulationRun}
            className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-emerald-300 disabled:hover:bg-emerald-300 sm:w-auto sm:min-w-[220px]"
          >
            <Play
              size={18}
              strokeWidth={2.4}
              fill="currentColor"
              aria-hidden="true"
            />

            {isSimulationRun
              ? "Simulation completed"
              : "Run Simulation"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default RunSimulationCard;
