// client/src/features/caseStudy/components/simulation/TechnicalDomainSimulationChart.tsx

import { AlertCircle } from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { domainIcons } from "../../data/domainIcons";

import {
  sriImpactCriterionNames,
  sriTechnicalDomainNames,
} from "../../data/sriOfficialConstants";

import type {
  CaseStudySimulationResult,
} from "../../simulation/caseStudySimulation.types";

import type {
  TechnicalDomainName,
} from "../../types/caseStudy.types";

type TechnicalDomainSimulationChartProps = {
  result: CaseStudySimulationResult;
};

type SimulationSnapshot =
  CaseStudySimulationResult["before"];

type ChartRow = {
  domain: TechnicalDomainName;
  before: number | null;
  after: number | null;
};

type TooltipPayloadItem = {
  payload?: ChartRow;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

type DomainTickProps = {
  x?: number;
  y?: number;

  payload?: {
    value: TechnicalDomainName;
  };

  nonCalculableDomains:
    ReadonlySet<TechnicalDomainName>;
};

const TechnicalDomainSimulationChart = ({
  result,
}: TechnicalDomainSimulationChartProps) => {
  const chartData =
    buildChartData(result);

  if (chartData === null) {
    return (
      <TechnicalDomainSimulationErrorState />
    );
  }

  const nonCalculableDomains =
    new Set<TechnicalDomainName>(
      chartData
        .filter(
          (row) =>
            row.before === null &&
            row.after === null,
        )
        .map(
          (row) =>
            row.domain,
        ),
    );

  const hasNonCalculableScores =
    nonCalculableDomains.size > 0;

  return (
    <section className="min-w-0 max-w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
            Impact on Technical Domains
          </h2>

          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            Compare the scores of the assessed technical domains before
            and after the simulated upgrade.
          </p>
        </div>

        <ul
          aria-label="Chart legend"
          className="flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <LegendItem
            colorClassName="bg-blue-300"
            label="Before Upgrade"
          />

          <LegendItem
            colorClassName="bg-violet-500"
            label="After Upgrade"
          />
        </ul>
      </div>

      {chartData.length > 0 ? (
        <div
          role="region"
          tabIndex={0}
          aria-label="Technical domain score comparison chart. Scroll horizontally to view all domains."
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
            overflow-y-hidden
            overscroll-x-contain
            rounded-2xl
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
          "
        >
          <div
            aria-hidden="true"
            className="min-w-[920px]"
          >
            <p className="ml-[58px] text-sm font-semibold text-slate-600">
              Technical Domain Score (%)
            </p>

            <div className="mt-2 h-[360px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={chartData}
                  margin={{
                    top: 8,
                    right: 24,
                    left: 8,
                    bottom: 50,
                  }}
                  barGap={8}
                  barCategoryGap="26%"
                  onMouseDown={(_, event) => {
                    event.preventDefault();
                  }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="#E2E8F0"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="domain"
                    interval={0}
                    tick={
                      <DomainTick
                        nonCalculableDomains={
                          nonCalculableDomains
                        }
                      />
                    }
                    tickLine={false}
                    axisLine={{
                      stroke: "#CBD5E1",
                    }}
                    height={60}
                  />

                  <YAxis
                    width={58}
                    domain={[0, 100]}
                    ticks={[
                      0,
                      25,
                      50,
                      75,
                      100,
                    ]}
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "#334155",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />

                  <Tooltip
                    shared={true}
                    filterNull={false}
                    cursor={{
                      fill:
                        "rgba(148, 163, 184, 0.10)",
                    }}
                    content={
                      <CustomTooltip />
                    }
                  />

                  <Bar
                    name="Before Upgrade"
                    dataKey="before"
                    fill="#93C5FD"
                    radius={[
                      7,
                      7,
                      0,
                      0,
                    ]}
                    barSize={32}
                    minPointSize={(value) =>
                      typeof value ===
                        "number" &&
                      value === 0
                        ? 3
                        : 0
                    }
                    isAnimationActive={false}
                  />

                  <Bar
                    name="After Upgrade"
                    dataKey="after"
                    fill="#8B5CF6"
                    radius={[
                      7,
                      7,
                      0,
                      0,
                    ]}
                    barSize={32}
                    minPointSize={(value) =>
                      typeof value ===
                        "number" &&
                      value === 0
                        ? 3
                        : 0
                    }
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AccessibleDomainComparisonTable
            chartData={chartData}
          />
        </div>
      ) : (
        <p
          role="status"
          className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-500"
        >
          No assessed technical domains are available for this
          simulation.
        </p>
      )}

      {hasNonCalculableScores ? (
        <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
          Domains without a calculable score are marked with —.
        </p>
      ) : null}
    </section>
  );
};

const buildChartData = (
  result: CaseStudySimulationResult,
): ChartRow[] | null => {
  const beforeDomains =
    getAssessedDomains(
      result.before,
    );

  const afterDomains =
    getAssessedDomains(
      result.after,
    );

  /*
   * A simulation changes the selected service level.
   * It must not change domain presence.
   */
  if (
    !haveSameDomains(
      beforeDomains,
      afterDomains,
    )
  ) {
    return null;
  }

  const rows: ChartRow[] = [];

  for (const domain of beforeDomains) {
    const beforeScore =
      resolveDomainScore(
        result.before,
        domain,
      );

    const afterScore =
      resolveDomainScore(
        result.after,
        domain,
      );

    if (
      beforeScore === "error" ||
      afterScore === "error"
    ) {
      return null;
    }

    /*
     * Calculability should remain unchanged because
     * domain presence and applicability do not change
     * during this simulation.
     */
    if (
      (beforeScore === null) !==
      (afterScore === null)
    ) {
      return null;
    }

    rows.push({
      domain,
      before: beforeScore,
      after: afterScore,
    });
  }

  return rows;
};

const getAssessedDomains = (
  snapshot: SimulationSnapshot,
): TechnicalDomainName[] => {
  const assessedDomains =
    new Set<TechnicalDomainName>([
      ...snapshot.presentDomains,
      ...snapshot.absentMandatoryDomains,
    ]);

  /*
   * Use the official domain order consistently
   * throughout the Results and Simulation pages.
   */
  return sriTechnicalDomainNames.filter(
    (domain) =>
      assessedDomains.has(domain),
  );
};

const haveSameDomains = (
  beforeDomains:
    readonly TechnicalDomainName[],
  afterDomains:
    readonly TechnicalDomainName[],
): boolean => {
  if (
    beforeDomains.length !==
    afterDomains.length
  ) {
    return false;
  }

  const afterDomainSet =
    new Set(afterDomains);

  return beforeDomains.every(
    (domain) =>
      afterDomainSet.has(domain),
  );
};

const resolveDomainScore = (
  snapshot: SimulationSnapshot,
  domain: TechnicalDomainName,
): number | null | "error" => {
  let hasCalculableMatrixScore =
    false;

  for (
    const impactCriterion of
      sriImpactCriterionNames
  ) {
    const matrixCell =
      snapshot.scoreMatrix.find(
        (cell) =>
          cell.domain === domain &&
          cell.impactCriterion ===
            impactCriterion,
      );

    /*
     * A missing matrix cell means that the
     * calculated result is incomplete.
     */
    if (!matrixCell) {
      return "error";
    }

    if (
      matrixCell.score !== null
    ) {
      if (
        !isValidPercentageScore(
          matrixCell.score,
        )
      ) {
        return "error";
      }

      hasCalculableMatrixScore =
        true;
    }
  }

  /*
   * Every domain-impact score is non-calculable.
   * The summary fallback value must therefore
   * not be displayed as a genuine score of 0%.
   */
  if (!hasCalculableMatrixScore) {
    return null;
  }

  const domainScoreItem =
    snapshot.domainScores.find(
      (item) =>
        item.domain === domain,
    );

  if (
    !domainScoreItem ||
    !isValidPercentageScore(
      domainScoreItem.score,
    )
  ) {
    return "error";
  }

  return domainScoreItem.score;
};

const isValidPercentageScore = (
  score:
    | number
    | null
    | undefined,
): score is number => {
  return (
    score !== null &&
    score !== undefined &&
    Number.isFinite(score) &&
    score >= 0 &&
    score <= 100
  );
};

type AccessibleDomainComparisonTableProps = {
  chartData: readonly ChartRow[];
};

const AccessibleDomainComparisonTable = ({
  chartData,
}: AccessibleDomainComparisonTableProps) => {
  return (
    <table className="sr-only">
      <caption>
        Technical domain scores before and after the simulated upgrade.
      </caption>

      <thead>
        <tr>
          <th scope="col">
            Technical Domain
          </th>

          <th scope="col">
            Before Upgrade
          </th>

          <th scope="col">
            After Upgrade
          </th>

          <th scope="col">
            Change
          </th>
        </tr>
      </thead>

      <tbody>
        {chartData.map((row) => {
          const delta = getDelta(
            row.before,
            row.after,
          );

          return (
            <tr key={row.domain}>
              <th scope="row">
                {row.domain}
              </th>

              <td>
                {formatNullableScore(
                  row.before,
                )}
              </td>

              <td>
                {formatNullableScore(
                  row.after,
                )}
              </td>

              <td>
                {formatNullableDelta(
                  delta,
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

type LegendItemProps = {
  colorClassName: string;
  label: string;
};

const LegendItem = ({
  colorClassName,
  label,
}: LegendItemProps) => {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`h-3.5 w-3.5 rounded-sm ${colorClassName}`}
      />

      <span className="text-sm font-semibold text-slate-600">
        {label}
      </span>
    </li>
  );
};

const DomainTick = ({
  x = 0,
  y = 0,
  payload,
  nonCalculableDomains,
}: DomainTickProps) => {
  if (!payload) {
    return null;
  }

  const domain = payload.value;

  const hasNoCalculableScore =
    nonCalculableDomains.has(
      domain,
    );

  return (
    <g
      transform={`translate(${x},${y})`}
    >
      {hasNoCalculableScore ? (
        <text
          x={0}
          y={-10}
          textAnchor="middle"
          fill="#64748B"
          fontSize={20}
          fontWeight={800}
          aria-hidden="true"
        >
          —
        </text>
      ) : null}

      <foreignObject
        x={-55}
        y={10}
        width={110}
        height={76}
      >
        <div className="flex h-full flex-col items-center text-center">
          <img
            src={domainIcons[domain]}
            alt=""
            className="h-8 w-8 object-contain"
          />

          <p className="mt-2 max-w-[105px] text-xs font-extrabold leading-4 text-blue-950">
            {domain}
          </p>
        </div>
      </foreignObject>
    </g>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: CustomTooltipProps) => {
  if (
    !active ||
    !payload?.length
  ) {
    return null;
  }

  const row =
    payload[0]?.payload;

  if (!row) {
    return null;
  }

  const delta = getDelta(
    row.before,
    row.after,
  );

  return (
    <div className="w-[180px] rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-lg sm:w-auto sm:min-w-[220px] sm:px-4">
      <div className="flex min-w-0 items-start gap-2">
        <img
          src={domainIcons[row.domain]}
          alt=""
          className="h-6 w-6 shrink-0 object-contain"
        />

        <p className="min-w-0 break-words font-extrabold leading-5 text-blue-950">
          {row.domain}
        </p>
      </div>

      <div className="mt-3 space-y-2 sm:space-y-1.5">
        <TooltipScoreRow
          label="Before"
          value={row.before}
          valueClassName="text-blue-500"
        />

        <TooltipScoreRow
          label="After"
          value={row.after}
          valueClassName="text-violet-600"
        />
      </div>

      <div className="mt-3 border-t border-slate-100 pt-2">
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span className="text-xs font-semibold text-slate-500">
            Change
          </span>

          <span
            className={`break-words text-left text-sm font-extrabold sm:text-right ${getDeltaToneClass(
              delta,
            )}`}
          >
            {formatNullableDelta(
              delta,
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

type TooltipScoreRowProps = {
  label: string;
  value: number | null;
  valueClassName: string;
};

const TooltipScoreRow = ({
  label,
  value,
  valueClassName,
}: TooltipScoreRowProps) => {
  return (
    <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

      <span
        className={`text-sm font-extrabold ${valueClassName}`}
      >
        {formatNullableScore(
          value,
        )}
      </span>
    </div>
  );
};

const getDelta = (
  beforeScore: number | null,
  afterScore: number | null,
): number | null => {
  if (
    beforeScore === null ||
    afterScore === null
  ) {
    return null;
  }

  return normalizeDisplayedDelta(
    afterScore - beforeScore,
  );
};

const normalizeDisplayedDelta = (
  delta: number,
) => {
  if (Math.abs(delta) < 0.05) {
    return 0;
  }

  return Number(
    delta.toFixed(1),
  );
};

const formatNullableScore = (
  score: number | null,
) => {
  if (score === null) {
    return "No calculable score";
  }

  return `${score.toFixed(1)}%`;
};

const formatNullableDelta = (
  delta: number | null,
) => {
  if (delta === null) {
    return "No calculable score";
  }

  const sign =
    delta > 0 ? "+" : "";

  return `${sign}${delta.toFixed(
    1,
  )} percentage points`;
};

const getDeltaToneClass = (
  delta: number | null,
) => {
  if (delta === null) {
    return "text-slate-400";
  }

  if (delta > 0) {
    return "text-emerald-600";
  }

  if (delta < 0) {
    return "text-red-600";
  }

  return "text-slate-500";
};

const TechnicalDomainSimulationErrorState =
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
              Technical Domain Comparison Unavailable
            </h2>

            <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
              The required technical domain score data could not be
              displayed for this simulation. Return to the guided
              improvement analysis and run the simulation again.
            </p>
          </div>
        </div>
      </section>
    );
  };

export default TechnicalDomainSimulationChart;