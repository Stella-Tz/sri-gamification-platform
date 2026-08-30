// client/src/features/caseStudy/components/simulation/SimulationResultsSection.tsx

import {
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import ImpactCriteriaSimulationTable from "./ImpactCriteriaSimulationTable";
import SimulationConclusionsCard from "./SimulationConclusionsCard";
import TechnicalDomainSimulationChart from "./TechnicalDomainSimulationChart";

import SriComparisonScoreCard from "../shared/SriComparisonScoreCard";

import resultsComparisonImage from "../../../../assets/caseStudy/results_comparison.png";

import type {
  SimulationResult,
} from "../../types/caseStudy.types";

type SimulationResultsSectionProps = {
  result: SimulationResult;
};

type OverallScoreComparison = {
  beforeScore: number;
  afterScore: number;
  delta: number;
};

const SIMULATION_EPSILON = 1e-9;

const SimulationResultsSection = ({
  result,
}: SimulationResultsSectionProps) => {
  const scoreComparison =
    resolveOverallScoreComparison(
      result,
    );

  return (
    <section className="min-w-0 max-w-full space-y-6">
      <header className="border-b border-slate-200 pb-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-950 md:text-5xl">
              Comparison &amp; Interpretation
            </h1>

            <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-blue-900">
              Understand how the simulated upgrade affected the
              building&apos;s smart readiness across impact criteria
              and technical domains.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="hidden shrink-0 lg:block"
          >
            <img
              src={resultsComparisonImage}
              alt=""
              className="h-32 w-auto object-contain lg:-mb-[1px]"
            />
          </div>
        </div>
      </header>

      {scoreComparison ? (
        <>
          <OverallScoreComparisonCard
            result={result}
            comparison={scoreComparison}
          />

          <ImpactCriteriaSimulationTable
            result={result}
          />

          <TechnicalDomainSimulationChart
            result={result}
          />

          <SimulationConclusionsCard
            result={result}
          />

        </>
      ) : (
        <SimulationResultsErrorState />
      )}
    </section>
  );
};

type OverallScoreComparisonCardProps = {
  result: SimulationResult;
  comparison: OverallScoreComparison;
};

const OverallScoreComparisonCard = ({
  result,
  comparison,
}: OverallScoreComparisonCardProps) => {
  const {
    beforeScore,
    afterScore,
    delta,
  } = comparison;

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
          Overall SRI Score
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          Compare the current SRI score with the simulated upgrade
          scenario.
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
        <SriComparisonScoreCard
          label="Before Upgrade"
          value={beforeScore}
          sriClass={
            result.before.sriClass
          }
          tone="blue"
        />

        <FlowArrow />

        <SriComparisonScoreCard
          label="After Upgrade"
          value={afterScore}
          sriClass={
            result.after.sriClass
          }
          tone="violet"
        />

        <FlowArrow />

        <ChangeCard
          beforeScore={beforeScore}
          afterScore={afterScore}
          delta={delta}
        />
      </div>
    </section>
  );
};

const FlowArrow = () => {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center py-1 lg:py-0"
    >
      <ArrowRight
        className="rotate-90 text-slate-300 lg:rotate-0"
        size={26}
      />
    </div>
  );
};

type ChangeCardProps = {
  beforeScore: number;
  afterScore: number;
  delta: number;
};

const ChangeCard = ({
  beforeScore,
  afterScore,
  delta,
}: ChangeCardProps) => {
  return (
    <article
      aria-label={`The overall SRI score increased from ${beforeScore.toFixed(
        1,
      )}% to ${afterScore.toFixed(
        1,
      )}%, an increase of ${delta.toFixed(
        1,
      )} percentage points.`}
      className="flex min-w-0 flex-col rounded-3xl border border-emerald-200 bg-emerald-50/70 px-5 py-6 text-center sm:px-7 lg:min-h-[300px]"
    >
      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
        Change in SRI Score
      </p>

      <div className="flex flex-1 items-center justify-center">
        <ChangeMetric delta={delta} />
      </div>

      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-[230px] bg-slate-300/80"
      />

      <div className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-600">
        <span>
          {beforeScore.toFixed(1)}%
        </span>

        <ArrowRight
          size={16}
          strokeWidth={2.3}
          className="shrink-0 text-slate-400"
          aria-hidden="true"
        />

        <span>
          {afterScore.toFixed(1)}%
        </span>
      </div>
    </article>
  );
};

type ChangeMetricProps = {
  delta: number;
};

const ChangeMetric = ({
  delta,
}: ChangeMetricProps) => {
  return (
    <div className="relative mx-auto h-[126px] w-[240px] max-w-full">
      <div className="absolute inset-x-0 bottom-5 flex flex-col items-center">
        <p className="text-[44px] font-extrabold leading-none tracking-tight text-emerald-700">
          +{delta.toFixed(1)}
        </p>

        <p className="mt-3 text-sm font-extrabold leading-5 text-emerald-700">
          percentage points
        </p>
      </div>
    </div>
  );
};

const resolveOverallScoreComparison = (
  result: SimulationResult,
): OverallScoreComparison | null => {
  const beforeScore =
    result.before.totalScore;

  const afterScore =
    result.after.totalScore;

  if (
    !isValidScore(beforeScore) ||
    !isValidScore(afterScore)
  ) {
    return null;
  }

  const rawDelta =
    afterScore - beforeScore;

  /*
   * This workflow always applies an eligible service
   * improvement. Validate the raw values so display
   * rounding cannot turn a genuine increase into a
   * neutral result or hide an invalid result.
   */
  if (
    rawDelta <=
    SIMULATION_EPSILON
  ) {
    return null;
  }

  return {
    beforeScore,
    afterScore,
    delta:
      normalizeDisplayedDelta(
        rawDelta,
      ),
  };
};

const isValidScore = (
  score: number,
) => {
  return (
    Number.isFinite(score) &&
    score >= 0 &&
    score <= 100
  );
};

const normalizeDisplayedDelta = (
  delta: number,
) => {
  return Number(
    delta.toFixed(1),
  );
};

const SimulationResultsErrorState = () => {
  return (
    <section
      role="alert"
      className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          size={20}
          className="mt-0.5 shrink-0 text-amber-700"
          aria-hidden="true"
        />

        <div className="min-w-0">
          <h2 className="text-xl font-extrabold leading-7 text-amber-900">
            Simulation Results Unavailable
          </h2>

          <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
            The expected SRI improvement could not be displayed because
            the simulation result is incomplete or inconsistent. Return
            to the Guided Improvement Analysis and run the simulation
            again.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SimulationResultsSection;