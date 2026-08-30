// client/src/features/caseStudy/components/simulation/SimulationCompletionCard.tsx

import {
  CheckCircle2,
  Home,
} from "lucide-react";

import PrimaryButton from "../../../../components/ui/PrimaryButton";

type SimulationCompletionCardProps = {
  onReturnDashboard: () => void;
};

const SimulationCompletionCard = ({
  onReturnDashboard,
}: SimulationCompletionCardProps) => {
  return (
    <section
      aria-labelledby="simulation-completion-title"
      className="px-5 pb-4 pt-6 text-center sm:px-6"
    >
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-5xl bg-slate-200"
      />

      <div className="mt-8 flex flex-col items-center">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100"
        >
          <CheckCircle2
            size={30}
            strokeWidth={2.4}
          />
        </div>

        <h2
          id="simulation-completion-title"
          className="mt-5 break-words text-2xl font-extrabold tracking-tight text-blue-950"
        >
          Simulation Completed
        </h2>

        <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
          The smart readiness assessment, guided improvement analysis, 
          and simulation have been completed successfully.
        </p>

        <PrimaryButton
          onClick={onReturnDashboard}
          className="mt-6 w-full sm:w-auto"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <Home
              size={18}
              strokeWidth={2.4}
              aria-hidden="true"
            />

            Return to Dashboard
          </span>
        </PrimaryButton>
      </div>
    </section>
  );
};

export default SimulationCompletionCard;
