// client/src/features/caseStudy/components/results/ResultsImpactScoresCard.tsx

import { AlertCircle } from "lucide-react";

import ImpactCriterionIcon from "../../../../components/ui/impact-criteria/ImpactCriterionIcon";

import { sriImpactCriterionNames } from "../../data/sriOfficialConstants";

import type {
  ImpactCriterionName,
} from "../../types/caseStudy.types";

import type {
  CaseStudyResultsPublicResult,
} from "../../results/caseStudyResults.types";

type ResultsImpactScoresCardProps = {
  result: CaseStudyResultsPublicResult;
};

type ResolvedImpactScore = {
  impactCriterion: ImpactCriterionName;
  score: number | null;
};

const ResultsImpactScoresCard = ({
  result,
}: ResultsImpactScoresCardProps) => {
  const impactScores = resolveImpactScores(result);

  if (impactScores === null) {
    return <ImpactScoresErrorState />;
  }

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
        Impact Criterion Scores
      </h2>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
        Review the building&apos;s smart readiness performance across
        the seven official impact criteria.
      </p>

      <div
        role="region"
        tabIndex={0}
        aria-label="Impact criterion scores. Scroll horizontally to view all criteria."
        style={{
          contain: "layout paint",
        }}
        className="
          results-horizontal-scroll
          mt-8
          w-full
          min-w-0
          max-w-full
          overflow-x-auto
          overscroll-x-contain
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
        "
      >
        <ul className="grid min-w-[980px] grid-cols-7 items-end gap-6 pb-2">
          {impactScores.map(({ impactCriterion, score }) => (
            <ImpactScoreColumn
              key={impactCriterion}
              impactCriterion={impactCriterion}
              score={score}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

const resolveImpactScores = (
  result: CaseStudyResultsPublicResult,
): ResolvedImpactScore[] | null => {
  const resolvedScores: ResolvedImpactScore[] = [];

  for (const impactCriterion of sriImpactCriterionNames) {
    const scoreItem = result.impactScores.find(
      (item) =>
        item.impactCriterion === impactCriterion,
    );

    if (!scoreItem) {
      return null;
    }

    if (
      scoreItem.score !== null &&
      !isValidPercentageScore(scoreItem.score)
    ) {
      return null;
    }

    resolvedScores.push({
      impactCriterion,
      score: scoreItem.score,
    });
  }

  return resolvedScores;
};

type ImpactScoreColumnProps = {
  impactCriterion: ImpactCriterionName;
  score: number | null;
};

const ImpactScoreColumn = ({
  impactCriterion,
  score,
}: ImpactScoreColumnProps) => {
  const accessibleScore =
    score === null
      ? "No calculable score"
      : formatScore(score);

  const barHeight =
    score === null || score === 0
      ? 0
      : Math.max(6, score);

  return (
    <li>
      <article
        aria-label={`${impactCriterion}: ${accessibleScore}`}
        className="flex min-h-[250px] min-w-0 flex-col items-center text-center"
      >
        <ImpactCriterionIcon
          criterion={impactCriterion}
          size={24}
          className="text-slate-500"
          aria-hidden="true"
        />

        <h3 className="mt-3 min-h-[48px] break-words text-xs font-extrabold leading-5 text-blue-950">
          {impactCriterion}
        </h3>

        <p className="mt-3 text-2xl font-extrabold tracking-tight text-blue-950">
          {score === null ? (
            <>
              <span aria-hidden="true">—</span>
              <span className="sr-only">
                No calculable score
              </span>
            </>
          ) : (
            formatScore(score)
          )}
        </p>

        <div
          aria-hidden="true"
          className="mt-4 flex h-28 w-full items-end justify-center border-b border-slate-200"
        >
          {score === null ? (
            <div className="mb-2 h-1 w-14 rounded-full bg-slate-200" />
          ) : (
            <div
              className={`w-16 rounded-t-md shadow-sm ${getScoreBarClass(
                score,
              )}`}
              style={{
                height: `${barHeight}%`,
              }}
            />
          )}
        </div>
      </article>
    </li>
  );
};

const ImpactScoresErrorState = () => {
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
            Impact Criterion Scores Unavailable
          </h2>

          <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
            The required impact criterion score data could not be
            displayed. Return to the service assessment and calculate
            the results again.
          </p>
        </div>
      </div>
    </section>
  );
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

const formatScore = (score: number) => {
  return `${score.toFixed(1)}%`;
};

const getScoreBarClass = (score: number) => {
  if (score >= 60) {
    return "bg-emerald-500";
  }

  if (score >= 30) {
    return "bg-amber-500";
  }

  return "bg-red-500";
};

export default ResultsImpactScoresCard;
