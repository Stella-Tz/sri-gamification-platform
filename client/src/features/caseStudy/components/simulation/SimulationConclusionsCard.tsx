// client/src/features/caseStudy/components/simulation/SimulationConclusionsCard.tsx

import type {
  ReactNode,
} from "react";

import {
  AlertCircle,
  Layers3,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import {
  sriImpactCriterionNames,
} from "../../data/sriOfficialConstants";

import type {
  ImpactCriterionName,
  SimulationResult,
} from "../../types/caseStudy.types";

type SimulationConclusionsCardProps = {
  result: SimulationResult;
};

const SIMULATION_EPSILON = 1e-9;

type ImpactImprovement = {
  impactCriterion: ImpactCriterionName;
  delta: number;
};

type SimulationConclusionData = {
  overallDelta: number;
  largestImpactImprovement:
    ImpactImprovement;
  secondaryImprovements:
    ImpactImprovement[];
};

type ConclusionTone =
  | "emerald"
  | "blue"
  | "amber";

const SimulationConclusionsCard = ({
  result,
}: SimulationConclusionsCardProps) => {
  const conclusionData =
    resolveSimulationConclusionData(
      result,
    );

  /*
   * The simulation is specifically an improvement
   * simulation. Missing scores, negative impact changes
   * or a non-positive overall change indicate an
   * incomplete or inconsistent simulation result.
   */
  if (!conclusionData) {
    return (
      <SimulationConclusionsErrorState />
    );
  }

  const {
    overallDelta,
    largestImpactImprovement,
    secondaryImprovements,
  } = conclusionData;

  const hasClassImproved =
    result.before.sriClass !==
    result.after.sriClass;

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
          Key Conclusions
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          Summarize the main effects of the simulated upgrade on the
          building&apos;s smart readiness.
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <ConclusionPanel
          icon={TrendingUp}
          title="Overall SRI Improvement"
          tone="emerald"
        >
          <Bullet tone="emerald">
            The overall SRI score increased
            from{" "}
            <Highlight tone="emerald">
              {formatScore(
                result.before.totalScore,
              )}
            </Highlight>{" "}
            to{" "}
            <Highlight tone="emerald">
              {formatScore(
                result.after.totalScore,
              )}
            </Highlight>
            .
          </Bullet>

          {hasClassImproved ? (
            <Bullet tone="emerald">
              The SRI class improved from{" "}
              <Highlight tone="emerald">
                Class{" "}
                {result.before.sriClass}
              </Highlight>{" "}
              to{" "}
              <Highlight tone="emerald">
                Class{" "}
                {result.after.sriClass}
              </Highlight>
              .
            </Bullet>
          ) : (
            <Bullet tone="emerald">
              The SRI class remained at{" "}
              <Highlight tone="emerald">
                Class{" "}
                {result.after.sriClass}
              </Highlight>
              .
            </Bullet>
          )}

          <Bullet tone="emerald">
            This corresponds to an overall
            increase of{" "}
            <Highlight tone="emerald">
              {formatDelta(
                overallDelta,
              )}
            </Highlight>
            .
          </Bullet>
        </ConclusionPanel>

        <ConclusionPanel
          icon={Layers3}
          title="Primary and Secondary Impacts"
          tone="blue"
        >
          <Bullet tone="blue">
            The largest improvement was
            achieved in{" "}
            <Highlight tone="blue">
              {
                largestImpactImprovement
                  .impactCriterion
              }
            </Highlight>{" "}
            (
            <Highlight tone="blue">
              {formatDelta(
                largestImpactImprovement
                  .delta,
              )}
            </Highlight>
            ).
          </Bullet>

          {secondaryImprovements.length >
          0 ? (
            <Bullet tone="blue">
              Smaller improvements were also
              observed in{" "}
              <Highlight tone="blue">
                {formatImpactList(
                  secondaryImprovements,
                )}
              </Highlight>
              .
            </Bullet>
          ) : (
            <Bullet tone="blue">
              No additional impact criterion
              recorded a positive change.
            </Bullet>
          )}

          <Bullet tone="blue">
            These secondary improvements occur because the upgraded smart-ready
            service contributes to multiple impact criteria at its maximum
            functionality level. The remaining impact criteria were unaffected
            by this specific upgrade.
          </Bullet>
        </ConclusionPanel>

        <ConclusionPanel
          icon={Target}
          title="Interpretation and Scope"
          tone="amber"
        >
          <Bullet tone="amber">
            The simulated upgrade was selected
            through the Guided Improvement
            Analysis.
          </Bullet>

          <Bullet tone="amber">
            Only the selected service was
            upgraded to its maximum
            functionality level for 100% of
            the building&apos;s net surface
            area.
          </Bullet>

          <Bullet tone="amber">
            All other assessed services
            remained unchanged, so the score
            improvement represents the
            isolated effect of this specific
            upgrade.
          </Bullet>
        </ConclusionPanel>
      </div>
    </section>
  );
};

const resolveSimulationConclusionData = (
  result: SimulationResult,
): SimulationConclusionData | null => {
  const beforeTotalScore =
    result.before.totalScore;

  const afterTotalScore =
    result.after.totalScore;

  if (
    !isValidPercentageScore(
      beforeTotalScore,
    ) ||
    !isValidPercentageScore(
      afterTotalScore,
    )
  ) {
    return null;
  }

  const overallDelta =
    afterTotalScore -
    beforeTotalScore;

  /*
   * This workflow always applies an eligible improvement.
   * The resulting overall score must therefore increase.
   */
  if (
    overallDelta <=
    SIMULATION_EPSILON
  ) {
    return null;
  }

  const improvements:
    ImpactImprovement[] = [];

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
     * All seven impact criterion scores are required.
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
      afterScore -
      beforeScore;

    /*
     * Increasing the selected service to its maximum
     * functionality level must not reduce any impact
     * criterion score.
     */
    if (
      rawDelta <
      -SIMULATION_EPSILON
    ) {
      return null;
    }

    if (
      rawDelta >
      SIMULATION_EPSILON
    ) {
      improvements.push({
        impactCriterion,
        delta:
          normalizeDisplayedDelta(
            rawDelta,
          ),
      });
    }
  }

  /*
   * An increased overall SRI score must be supported
   * by at least one positive impact criterion change.
   */
  if (improvements.length === 0) {
    return null;
  }

  improvements.sort(
    (first, second) =>
      second.delta -
      first.delta,
  );

  const [
    largestImpactImprovement,
    ...secondaryImprovements
  ] = improvements;

  if (!largestImpactImprovement) {
    return null;
  }

  return {
    overallDelta:
      normalizeDisplayedDelta(
        overallDelta,
      ),

    largestImpactImprovement,
    secondaryImprovements,
  };
};

type ConclusionPanelProps = {
  icon: LucideIcon;
  title: string;
  tone: ConclusionTone;
  children: ReactNode;
};

const ConclusionPanel = ({
  icon: Icon,
  title,
  tone,
  children,
}: ConclusionPanelProps) => {
  return (
    <article
      className={`min-w-0 rounded-3xl border p-5 sm:p-6 ${getPanelToneClass(
        tone,
      )}`}
    >
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-1 ${getIconToneClass(
            tone,
          )}`}
        >
          <Icon
            size={28}
            strokeWidth={2.3}
          />
        </div>

        <h3
          className={`min-w-0 break-words text-base font-extrabold leading-6 ${getTitleToneClass(
            tone,
          )}`}
        >
          {title}
        </h3>
      </div>

      <div
        aria-hidden="true"
        className={`mt-5 h-px w-full ${getDividerToneClass(
          tone,
        )}`}
      />

      <ul className="mt-5 space-y-4 text-sm font-semibold leading-6 text-slate-700">
        {children}
      </ul>
    </article>
  );
};

type BulletProps = {
  tone: ConclusionTone;
  children: ReactNode;
};

const Bullet = ({
  tone,
  children,
}: BulletProps) => {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className={`mt-2 h-2 w-2 shrink-0 rounded-full ${getBulletToneClass(
          tone,
        )}`}
      />

      <span className="min-w-0 break-words">{children}</span>
    </li>
  );
};

type HighlightProps = {
  tone: ConclusionTone;
  children: ReactNode;
};

const Highlight = ({
  tone,
  children,
}: HighlightProps) => {
  return (
    <strong
      className={`font-extrabold ${getHighlightToneClass(
        tone,
      )}`}
    >
      {children}
    </strong>
  );
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

const normalizeDisplayedDelta = (
  delta: number,
) => {
  if (
    !Number.isFinite(delta) ||
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

const formatDelta = (
  delta: number,
) => {
  const displayedDelta =
    normalizeDisplayedDelta(
      delta,
    );

  return `+${displayedDelta.toFixed(
    1,
  )} percentage points`;
};

const formatImpactList = (
  improvements:
    readonly ImpactImprovement[],
) => {
  const impactCriteria =
    improvements.map(
      (item) =>
        item.impactCriterion,
    );

  if (impactCriteria.length === 1) {
    return impactCriteria[0];
  }

  if (impactCriteria.length === 2) {
    return `${impactCriteria[0]} and ${impactCriteria[1]}`;
  }

  const finalImpact =
    impactCriteria[
      impactCriteria.length - 1
    ];

  return `${impactCriteria
    .slice(0, -1)
    .join(", ")}, and ${finalImpact}`;
};

const SimulationConclusionsErrorState =
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
              Simulation Conclusions Unavailable
            </h2>

            <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
              The expected improvement could not be displayed because
              the simulation result is incomplete or inconsistent.
              Return to the Guided Improvement Analysis and run the
              simulation again.
            </p>
          </div>
        </div>
      </section>
    );
  };

const getPanelToneClass = (
  tone: ConclusionTone,
) => {
  switch (tone) {
    case "blue":
      return "border-blue-100 bg-blue-50/80";

    case "amber":
      return "border-amber-100 bg-amber-50/80";

    case "emerald":
      return "border-emerald-100 bg-emerald-50/80";
  }
};

const getIconToneClass = (
  tone: ConclusionTone,
) => {
  switch (tone) {
    case "blue":
      return "bg-blue-100 text-blue-700 ring-blue-200";

    case "amber":
      return "bg-amber-100 text-amber-700 ring-amber-200";

    case "emerald":
      return "bg-emerald-100 text-emerald-700 ring-emerald-200";
  }
};

const getTitleToneClass = (
  tone: ConclusionTone,
) => {
  switch (tone) {
    case "blue":
      return "text-blue-700";

    case "amber":
      return "text-amber-700";

    case "emerald":
      return "text-emerald-700";
  }
};

const getDividerToneClass = (
  tone: ConclusionTone,
) => {
  switch (tone) {
    case "blue":
      return "bg-blue-200";

    case "amber":
      return "bg-amber-200";

    case "emerald":
      return "bg-emerald-200";
  }
};

const getBulletToneClass = (
  tone: ConclusionTone,
) => {
  switch (tone) {
    case "blue":
      return "bg-blue-500";

    case "amber":
      return "bg-amber-500";

    case "emerald":
      return "bg-emerald-500";
  }
};

const getHighlightToneClass = (
  tone: ConclusionTone,
) => {
  switch (tone) {
    case "blue":
      return "text-blue-700";

    case "amber":
      return "text-amber-700";

    case "emerald":
      return "text-emerald-700";
  }
};

export default SimulationConclusionsCard;