// client/src/features/caseStudy/components/results/ResultsDomainScoresCard.tsx

import { AlertCircle } from "lucide-react";

import { domainIcons } from "../../data/domainIcons";
import { sriImpactCriterionNames } from "../../data/sriOfficialConstants";

import type {
  TechnicalDomainName,
} from "../../types/caseStudy.types";

import type {
  CaseStudyResultsPublicResult,
} from "../../results/caseStudyResults.types";

type ResultsDomainScoresCardProps = {
  result: CaseStudyResultsPublicResult;
};

type ResolvedDomainScore = {
  domain: TechnicalDomainName;
  score: number | null;
};

const ResultsDomainScoresCard = ({
  result,
}: ResultsDomainScoresCardProps) => {
  const includedDomains = Array.from(
    new Set<TechnicalDomainName>([
      ...result.presentDomains,
      ...result.absentMandatoryDomains,
    ]),
  );

  const domainScores = resolveDomainScores(
    result,
    includedDomains,
  );

  if (domainScores === null) {
    return <DomainScoresErrorState />;
  }

  return (
    <section className="min-w-0 max-w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
        Technical Domain Scores
      </h2>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
        Review the smart readiness score for each technical domain
        included in the assessment results.
      </p>

      {domainScores.length > 0 ? (
        <div
          role="region"
          tabIndex={0}
          aria-label="Technical domain scores. Scroll horizontally to view all domains."
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
          <ul className="flex min-w-max gap-4 pb-2">
            {domainScores.map(({ domain, score }) => (
              <DomainScoreCard
                key={domain}
                domain={domain}
                score={score}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p
          role="status"
          className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-500"
        >
          No technical domains are included in the assessment results.
        </p>
      )}
    </section>
  );
};

const resolveDomainScores = (
  result: CaseStudyResultsPublicResult,
  includedDomains: readonly TechnicalDomainName[],
): ResolvedDomainScore[] | null => {
  const resolvedScores: ResolvedDomainScore[] = [];

  for (const domain of includedDomains) {
    let hasCalculableMatrixScore = false;

    for (const impactCriterion of sriImpactCriterionNames) {
      const matrixCell = result.scoreMatrix.find(
        (cell) =>
          cell.domain === domain &&
          cell.impactCriterion === impactCriterion,
      );

      if (!matrixCell) {
        return null;
      }

      if (matrixCell.score !== null) {
        if (!isValidPercentageScore(matrixCell.score)) {
          return null;
        }

        hasCalculableMatrixScore = true;
      }
    }

    const domainScoreItem = result.domainScores.find(
      (item) => item.domain === domain,
    );

    if (!domainScoreItem) {
      return null;
    }

    if (!hasCalculableMatrixScore) {
      resolvedScores.push({
        domain,
        score: null,
      });

      continue;
    }

    if (!isValidPercentageScore(domainScoreItem.score)) {
      return null;
    }

    resolvedScores.push({
      domain,
      score: domainScoreItem.score,
    });
  }

  return resolvedScores;
};

type DomainScoreCardProps = {
  domain: TechnicalDomainName;
  score: number | null;
};

const DomainScoreCard = ({
  domain,
  score,
}: DomainScoreCardProps) => {
  const accessibleScore =
    score === null
      ? "No calculable score"
      : formatScore(score);

  return (
    <li className="w-[165px] shrink-0">
      <article
        aria-label={`${domain}: ${accessibleScore}`}
        className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/40 p-4 text-center"
      >
        <img
          src={domainIcons[domain]}
          alt=""
          aria-hidden="true"
          className="mx-auto h-10 w-10 object-contain"
        />

        <h3 className="mt-3 min-h-[48px] break-words text-xs font-extrabold leading-5 text-blue-950">
          {domain}
        </h3>

        <div
          aria-hidden="true"
          className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200"
        >
          {score !== null ? (
            <div
              className={`h-full rounded-full ${getScoreBarClass(
                score,
              )}`}
              style={{
                width: `${score}%`,
              }}
            />
          ) : null}
        </div>

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
      </article>
    </li>
  );
};

const DomainScoresErrorState = () => {
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
            Technical Domain Scores Unavailable
          </h2>

          <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
            The required technical domain score data could not be
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
    return "bg-amber-400";
  }

  return "bg-red-500";
};

export default ResultsDomainScoresCard;
