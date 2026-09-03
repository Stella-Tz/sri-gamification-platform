// client/src/features/caseStudy/components/results/ResultsScoreMatrix.tsx

import { AlertCircle } from "lucide-react";

import { domainIcons } from "../../data/domainIcons";
import { sriImpactCriterionNames } from "../../data/sriOfficialConstants";

import type {
  ImpactCriterionName,
  TechnicalDomainName,
} from "../../types/caseStudy.types";

import type {
  CaseStudyResultsPublicResult,
} from "../../results/caseStudyResults.types";

type ResultsScoreMatrixProps = {
  result: CaseStudyResultsPublicResult;
};

type LegendTone =
  | "green"
  | "amber"
  | "red"
  | "slate";

type MatrixCellItem = {
  impactCriterion: ImpactCriterionName;
  score: number | null;
};

type MatrixRow = {
  domain: TechnicalDomainName;
  cells: MatrixCellItem[];
};

const legendToneClasses: Record<
  LegendTone,
  string
> = {
  green:
    "bg-emerald-100 text-emerald-700",

  amber:
    "bg-amber-100 text-amber-700",

  red:
    "bg-red-100 text-red-700",

  slate:
    "bg-slate-100 text-slate-600",
};

const ResultsScoreMatrix = ({
  result,
}: ResultsScoreMatrixProps) => {
  /*
   * Present domains and absent-but-mandatory domains
   * are included in the calculated assessment results.
   *
   * Absent-and-not-mandatory domains are excluded.
   */
  const includedDomains = Array.from(
    new Set<TechnicalDomainName>([
      ...result.presentDomains,
      ...result.absentMandatoryDomains,
    ]),
  );

  const matrixRows =
    buildMatrixRows(
      result,
      includedDomains,
    );

  if (matrixRows === null) {
    return <ScoreMatrixErrorState />;
  }

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
            Detailed Score Matrix
          </h2>

          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            Review the detailed scores across the technical domains
            included in the assessment results and the seven official
            impact criteria.
          </p>
        </div>

        <ul
          aria-label="Score ranges"
          className="flex flex-wrap gap-2 text-xs font-extrabold lg:max-w-md lg:justify-end"
        >
          <LegendPill
            label="60%–100%"
            tone="green"
          />

          <LegendPill
            label="30%–<60%"
            tone="amber"
          />

          <LegendPill
            label="0%–<30%"
            tone="red"
          />

          <LegendPill
            label="— No calculable score"
            tone="slate"
          />
        </ul>
      </div>

      {matrixRows.length > 0 ? (
        <div
          role="region"
          tabIndex={0}
          aria-label="Detailed score matrix. Scroll horizontally to view all impact criteria."
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
          <table className="w-full min-w-[900px] border-collapse text-xs sm:min-w-[980px]">
            <caption className="sr-only">
              SRI scores for each technical domain included in the
              assessment results across the seven official impact
              criteria.
            </caption>

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th
                  scope="col"
                  className="sticky left-0 z-20 min-w-[180px] bg-slate-50 px-4 py-4 text-left font-extrabold sm:min-w-[220px]"
                >
                  Technical Domain
                </th>

                {sriImpactCriterionNames.map(
                  (impactCriterion) => (
                    <th
                      key={
                        impactCriterion
                      }
                      scope="col"
                      className="min-w-[104px] border-l border-slate-200 px-3 py-4 text-center font-extrabold leading-5 sm:min-w-[112px]"
                    >
                      {impactCriterion}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {matrixRows.map(
                ({
                  domain,
                  cells,
                }) => (
                  <tr
                    key={domain}
                    className="border-b border-slate-200 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-10 min-w-[180px] bg-white px-4 py-4 text-left sm:min-w-[220px]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={
                            domainIcons[
                              domain
                            ]
                          }
                          alt=""
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 object-contain"
                        />

                        <span className="min-w-0 break-words text-xs font-extrabold leading-5 text-blue-950">
                          {domain}
                        </span>
                      </div>
                    </th>

                    {cells.map(
                      ({
                        impactCriterion,
                        score,
                      }) => (
                        <ScoreCell
                          key={
                            impactCriterion
                          }
                          value={score}
                        />
                      ),
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p
          role="status"
          className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-500"
        >
          No technical domains are included in the assessment results
          for the detailed score matrix.
        </p>
      )}
    </section>
  );
};

const buildMatrixRows = (
  result: CaseStudyResultsPublicResult,
  includedDomains:
    readonly TechnicalDomainName[],
): MatrixRow[] | null => {
  const rows: MatrixRow[] = [];

  for (
    const domain of
    includedDomains
  ) {
    const cells:
      MatrixCellItem[] = [];

    for (
      const impactCriterion of
      sriImpactCriterionNames
    ) {
      const matrixCell =
        result.scoreMatrix.find(
          (cell) =>
            cell.domain ===
              domain &&
            cell.impactCriterion ===
              impactCriterion,
        );

      /*
       * A missing matrix cell means that the calculated
       * result is incomplete.
       *
       * This is different from an existing cell whose
       * score is explicitly null.
       */
      if (!matrixCell) {
        return null;
      }

      /*
       * An explicit null means that no score can be
       * calculated for this domain-impact combination.
       *
       * A numeric value, including 0, must be a valid
       * percentage.
       */
      if (
        matrixCell.score !== null &&
        !isValidPercentageScore(
          matrixCell.score,
        )
      ) {
        return null;
      }

      cells.push({
        impactCriterion,
        score:
          matrixCell.score,
      });
    }

    rows.push({
      domain,
      cells,
    });
  }

  return rows;
};

type LegendPillProps = {
  label: string;
  tone: LegendTone;
};

const LegendPill = ({
  label,
  tone,
}: LegendPillProps) => {
  return (
    <li
      className={`whitespace-nowrap rounded-xl px-3 py-2 ${legendToneClasses[tone]}`}
    >
      {label}
    </li>
  );
};

type ScoreCellProps = {
  value: number | null;
};

const ScoreCell = ({
  value,
}: ScoreCellProps) => {
  const accessibleValue =
    value === null
      ? "No calculable score"
      : formatScore(value);

  return (
    <td
      aria-label={
        accessibleValue
      }
      className="border-l border-slate-100 px-3 py-4 text-center"
    >
      <span
        className={getScorePillClass(
          value,
        )}
      >
        {value === null ? (
          <>
            <span aria-hidden="true">
              —
            </span>

            <span className="sr-only">
              No calculable score
            </span>
          </>
        ) : (
          formatScore(value)
        )}
      </span>
    </td>
  );
};

const ScoreMatrixErrorState =
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
              Detailed Score Matrix Unavailable
            </h2>

            <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
              The detailed score matrix could not be displayed because
              some required score data are missing or invalid. Return
              to the service assessment and calculate the results
              again.
            </p>
          </div>
        </div>
      </section>
    );
  };

const isValidPercentageScore = (
  score: number,
): boolean => {
  return (
    Number.isFinite(score) &&
    score >= 0 &&
    score <= 100
  );
};

const formatScore = (
  score: number,
) => {
  return `${score.toFixed(1)}%`;
};

const getScorePillClass = (
  value: number | null,
) => {
  const baseClass =
    "inline-flex min-w-[58px] items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-extrabold";

  if (value === null) {
    return `${baseClass} bg-slate-100 text-slate-500`;
  }

  if (value >= 60) {
    return `${baseClass} bg-emerald-50 text-emerald-700`;
  }

  if (value >= 30) {
    return `${baseClass} bg-amber-50 text-amber-700`;
  }

  return `${baseClass} bg-red-50 text-red-700`;
};

export default ResultsScoreMatrix;