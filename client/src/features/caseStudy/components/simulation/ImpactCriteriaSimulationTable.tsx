// client/src/features/caseStudy/components/simulation/ImpactCriteriaSimulationTable.tsx

import {
  AlertCircle,
  ArrowUp,
} from "lucide-react";

import ImpactCriterionIcon from "../../../../components/ui/impact-criteria/ImpactCriterionIcon";

import {
  sriImpactCriterionNames,
} from "../../data/sriOfficialConstants";

import type {
  CaseStudySimulationResult,
} from "../../simulation/caseStudySimulation.types";

import type {
  ImpactCriterionName,
} from "../../types/caseStudy.types";

type ImpactCriteriaSimulationTableProps = {
  result: CaseStudySimulationResult;
};

const SIMULATION_EPSILON = 1e-9;

type ImpactComparisonRow = {
  impactCriterion:
    ImpactCriterionName;

  beforeScore: number;
  afterScore: number;
  delta: number;
};

const ImpactCriteriaSimulationTable = ({
  result,
}: ImpactCriteriaSimulationTableProps) => {
  const comparisonRows =
    resolveImpactComparisonRows(
      result,
    );

  if (!comparisonRows) {
    return (
      <ImpactCriteriaSimulationErrorState />
    );
  }

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
          Impact on Impact Criteria
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          Compare the seven impact criterion scores before and after
          the simulated service upgrade.
        </p>
      </div>

      <div
        role="region"
        tabIndex={0}
        aria-label="Impact criteria comparison table. Scroll horizontally to view all columns."
        style={{
          contain: "layout paint",
        }}
        className="
          results-horizontal-scroll
          mt-6
          w-full
          min-w-0
          max-w-full
          overflow-x-auto
          overscroll-x-contain
          rounded-3xl
          border
          border-slate-200
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
        "
      >
        <table className="w-full min-w-[500px] border-collapse text-sm sm:min-w-[860px]">
          <caption className="sr-only">
            Impact criterion scores before and after the simulated
            service upgrade, including each change in percentage
            points.
          </caption>

          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-blue-950">
              <th
                scope="col"
                className="
                  sticky
                  left-0
                  z-20
                  w-[132px]
                  min-w-[132px]
                  max-w-[132px]
                  bg-slate-50
                  px-3
                  py-4
                  text-left
                  text-xs
                  font-extrabold
                  sm:w-[240px]
                  sm:min-w-[240px]
                  sm:max-w-[240px]
                  sm:px-5
                "
              >
                Impact Criterion
              </th>

              <th
                scope="col"
                className="min-w-[118px] border-l border-slate-200 px-3 py-4 text-center text-xs font-extrabold sm:px-5"
              >
                Before Upgrade
              </th>

              <th
                scope="col"
                className="min-w-[118px] border-l border-slate-200 px-3 py-4 text-center text-xs font-extrabold sm:px-5"
              >
                After Upgrade
              </th>

              <th
                scope="col"
                className="min-w-[126px] border-l border-slate-200 px-3 py-4 text-center text-xs font-extrabold sm:px-5"
              >
                Change
              </th>
            </tr>
          </thead>

          <tbody>
            {comparisonRows.map(
              ({
                impactCriterion,
                beforeScore,
                afterScore,
                delta,
              }) => (
                <tr
                  key={impactCriterion}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="
                      sticky
                      left-0
                      z-10
                      w-[132px]
                      min-w-[132px]
                      max-w-[132px]
                      bg-white
                      px-3
                      py-4
                      text-left
                      sm:w-[240px]
                      sm:min-w-[240px]
                      sm:max-w-[240px]
                      sm:px-5
                    "
                  >
                    <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
                      <span
                        aria-hidden="true"
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${getImpactCriterionBadgeClass(
                          impactCriterion,
                        )}`}
                      >
                        <ImpactCriterionIcon
                          criterion={
                            impactCriterion
                          }
                          size={18}
                          className={getImpactCriterionIconClass(
                            impactCriterion,
                          )}
                        />
                      </span>

                      <span className="min-w-0 break-words text-sm font-extrabold leading-5 text-blue-950">
                        {impactCriterion}
                      </span>
                    </div>
                  </th>

                  <ScoreCell
                    score={
                      beforeScore
                    }
                  />

                  <ScoreCell
                    score={
                      afterScore
                    }
                  />

                  <td className="min-w-[126px] border-l border-slate-100 px-3 py-4 text-center sm:px-5">
                    <ChangePill
                      delta={delta}
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const resolveImpactComparisonRows = (
  result: CaseStudySimulationResult,
): ImpactComparisonRow[] | null => {
  const rows:
    ImpactComparisonRow[] = [];

  for (
    const impactCriterion of
    sriImpactCriterionNames
  ) {
    const beforeScore =
      result.before.impactScores.find(
        (item) =>
          item.impactCriterion ===
          impactCriterion,
      )?.score;

    const afterScore =
      result.after.impactScores.find(
        (item) =>
          item.impactCriterion ===
          impactCriterion,
      )?.score;

    /*
     * All seven aggregate impact criterion scores
     * are required simulation results.
     *
     * A genuine score of 0 is valid.
     */
    if (
      !isValidPercentageScore(
        beforeScore,
      ) ||
      !isValidPercentageScore(
        afterScore,
      )
    ) {
      return null;
    }

    const rawDelta =
      afterScore - beforeScore;

    /*
     * The simulation upgrades one eligible service
     * to its maximum functionality level and leaves
     * every other assessed service unchanged.
     *
     * An impact criterion may improve or remain
     * unchanged, but it must not decrease. Use the
     * raw values for validation so display rounding
     * cannot hide an invalid decrease.
     */
    if (
      rawDelta <
      -SIMULATION_EPSILON
    ) {
      return null;
    }

    rows.push({
      impactCriterion,
      beforeScore,
      afterScore,
      delta: normalizeDisplayedDelta(
        Math.max(0, rawDelta),
      ),
    });
  }

  return rows;
};

const isValidPercentageScore = (
  score: number | null | undefined,
): score is number => {
  return (
    score !== null &&
    score !== undefined &&
    Number.isFinite(score) &&
    score >= 0 &&
    score <= 100
  );
};

type ScoreCellProps = {
  score: number;
};

const ScoreCell = ({
  score,
}: ScoreCellProps) => {
  return (
    <td className="min-w-[118px] border-l border-slate-100 px-3 py-4 text-center font-extrabold text-blue-950 sm:px-5">
      {formatScore(score)}
    </td>
  );
};

type ChangePillProps = {
  delta: number;
};

const ChangePill = ({
  delta,
}: ChangePillProps) => {
  const hasImproved =
    delta > 0;

  return (
    <span
      aria-label={
        hasImproved
          ? `Increased by ${delta.toFixed(
              1,
            )} percentage points`
          : "No change"
      }
      className={`inline-flex min-w-[88px] items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold ${
        hasImproved
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span aria-hidden="true">
        {hasImproved
          ? "+"
          : ""}
        {delta.toFixed(1)} pp
      </span>

      {hasImproved ? (
        <ArrowUp
          size={14}
          strokeWidth={3}
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
};

const normalizeDisplayedDelta = (
  delta: number,
) => {
  /*
   * Avoid displaying insignificant floating-point
   * differences as either an increase or decrease.
   */
  if (
    Math.abs(delta) < 0.05
  ) {
    return 0;
  }

  return Number(
    delta.toFixed(1),
  );
};

const formatScore = (
  score: number,
) => {
  return `${score.toFixed(1)}%`;
};

const ImpactCriteriaSimulationErrorState =
  () => {
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
              Impact Criteria Comparison Unavailable
            </h2>

            <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
              The required impact criterion comparison could not be
              displayed because the simulation result is incomplete or
              inconsistent. Return to the Guided Improvement Analysis
              and run the simulation again.
            </p>
          </div>
        </div>
      </section>
    );
  };

const getImpactCriterionBadgeClass = (
  criterion:
    ImpactCriterionName,
) => {
  switch (criterion) {
    case "Energy efficiency":
      return "bg-amber-50";

    case "Maintenance and fault prediction":
      return "bg-sky-50";

    case "Comfort":
      return "bg-orange-50";

    case "Convenience":
      return "bg-indigo-50";

    case "Health, well-being and accessibility":
      return "bg-rose-50";

    case "Information to occupants":
      return "bg-cyan-50";

    case "Energy flexibility and storage":
      return "bg-violet-50";
  }
};

const getImpactCriterionIconClass = (
  criterion:
    ImpactCriterionName,
) => {
  switch (criterion) {
    case "Energy efficiency":
      return "text-amber-600";

    case "Maintenance and fault prediction":
      return "text-sky-600";

    case "Comfort":
      return "text-orange-600";

    case "Convenience":
      return "text-indigo-600";

    case "Health, well-being and accessibility":
      return "text-rose-600";

    case "Information to occupants":
      return "text-cyan-600";

    case "Energy flexibility and storage":
      return "text-violet-600";
  }
};

export default ImpactCriteriaSimulationTable;