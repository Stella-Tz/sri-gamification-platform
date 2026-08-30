// client/src/features/caseStudy/components/results/ResultsHeroCard.tsx

import {
  AlertCircle,
  BatteryCharging,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type {
  CaseStudySubmitResult,
  KeyFunctionalityName,
} from "../../types/caseStudy.types";

type FunctionalityTone =
  | "green"
  | "blue"
  | "purple";

type KeyFunctionalityItem = {
  name: KeyFunctionalityName;
  icon: LucideIcon;
  tone: FunctionalityTone;
};

type ResolvedKeyFunctionalityItem =
  KeyFunctionalityItem & {
    score: number | null;
  };

type ResultsHeroCardProps = {
  result: CaseStudySubmitResult;
};

const keyFunctionalities:
  readonly KeyFunctionalityItem[] = [
    {
      name:
        "Energy performance and operation",
      icon: Zap,
      tone: "green",
    },
    {
      name:
        "Response to user needs",
      icon: Users,
      tone: "blue",
    },
    {
      name:
        "Energy flexibility",
      icon: BatteryCharging,
      tone: "purple",
    },
  ];

const ResultsHeroCard = ({
  result,
}: ResultsHeroCardProps) => {
  const resolvedKeyFunctionalities =
    resolveKeyFunctionalityScores(
      result,
    );

  if (
    !isValidPercentageScore(
      result.totalScore,
    ) ||
    resolvedKeyFunctionalities ===
      null
  ) {
    return <ResultsHeroErrorState />;
  }

  return (
    <section
      aria-label="SRI result overview"
      className="grid gap-4 lg:grid-cols-[1fr_1.35fr]"
    >
      <OverallSriScoreCard
        result={result}
      />

      <KeyFunctionalitiesCard
        functionalities={
          resolvedKeyFunctionalities
        }
      />
    </section>
  );
};

type OverallSriScoreCardProps = {
  result: CaseStudySubmitResult;
};

const OverallSriScoreCard = ({
  result,
}: OverallSriScoreCardProps) => {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-extrabold leading-7 text-blue-950">
        Overall SRI Score
      </h2>

      <div className="mt-4 grid flex-1 gap-6 sm:grid-cols-[minmax(0,1fr)_140px] sm:items-center">
        <div className="min-w-0 text-center">
          <SriScoreGauge
            score={result.totalScore}
          />

          <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
            Score
          </p>

          <p className="mt-1 text-4xl font-extrabold tracking-tight text-emerald-600">
            {formatScore(
              result.totalScore,
            )}
          </p>
        </div>

        <div className="text-center sm:border-l sm:border-slate-200 sm:pl-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
            SRI Class
          </p>

          <div className="mx-auto mt-3 flex h-24 w-24 items-center justify-center rounded-2xl bg-amber-100 text-5xl font-extrabold text-amber-700">
            {result.sriClass}
          </div>

          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
            Score Range
          </p>

          <p className="mt-1 text-xs font-semibold leading-5 text-blue-950">
            {getSriClassRange(
              result.sriClass,
            )}
          </p>
        </div>
      </div>
    </article>
  );
};

type KeyFunctionalitiesCardProps = {
  functionalities:
    readonly ResolvedKeyFunctionalityItem[];
};

const KeyFunctionalitiesCard = ({
  functionalities,
}: KeyFunctionalitiesCardProps) => {
  return (
    <article className="h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-extrabold leading-7 text-blue-950">
        Key Functionalities Overview
      </h2>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
        Review the building&apos;s performance across the three key
        functionalities of the SRI.
      </p>

      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {functionalities.map(
          ({
            name,
            icon: Icon,
            tone,
            score,
          }) => (
            <li
              key={name}
              className="h-full min-w-0"
            >
              <KeyFunctionalityScoreCard
                name={name}
                icon={Icon}
                tone={tone}
                score={score}
              />
            </li>
          ),
        )}
      </ul>
    </article>
  );
};

type KeyFunctionalityScoreCardProps = {
  name: KeyFunctionalityName;
  icon: LucideIcon;
  tone: FunctionalityTone;
  score: number | null;
};

const KeyFunctionalityScoreCard = ({
  name,
  icon: Icon,
  tone,
  score,
}: KeyFunctionalityScoreCardProps) => {
  const accessibleScore =
    score === null
      ? "No calculable score"
      : formatScore(score);

  return (
    <article
      aria-label={`${name}: ${accessibleScore}`}
      className="
        grid
        h-full
        min-w-0
        grid-rows-[48px_auto_auto_8px]
        gap-y-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-center
        shadow-sm
        md:min-h-[230px]
        md:grid-rows-[48px_80px_1fr_8px]
        xl:grid-rows-[48px_60px_1fr_8px]
      "
    >
      <div
        aria-hidden="true"
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${getIconClass(
          tone,
        )}`}
      >
        <Icon
          size={22}
          strokeWidth={2.4}
        />
      </div>

      <h3
        className="
          flex
          min-w-0
          items-start
          justify-center
          break-words
          text-sm
          font-extrabold
          leading-5
          text-blue-950
        "
      >
        {name}
      </h3>

      <p
        className="
          flex
          items-end
          justify-center
          pb-1
          text-3xl
          font-extrabold
          tracking-tight
          text-blue-950
        "
      >
        {score === null ? (
          <>
            <span aria-hidden="true">
              —
            </span>

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
        className="h-2 overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className={`h-full rounded-full ${getScoreBarClass(
            score,
          )}`}
          style={{
            width: `${score ?? 0}%`,
          }}
        />
      </div>
    </article>
  );
};

type SriScoreGaugeProps = {
  score: number;
};

const SriScoreGauge = ({
  score,
}: SriScoreGaugeProps) => {
  const pointerRotation =
    -90 +
    (score / 100) * 180;

  return (
    <div
      aria-hidden="true"
      className="mx-auto h-[130px] w-[240px] max-w-full"
    >
      <svg
        viewBox="0 0 260 150"
        focusable="false"
        className="h-full w-full"
      >
        <path
          d="M 35 120 A 95 95 0 0 1 225 120"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M 35 120 A 95 95 0 0 1 82 42"
          fill="none"
          stroke="#dc2626"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M 82 42 A 95 95 0 0 1 130 25"
          fill="none"
          stroke="#f97316"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M 130 25 A 95 95 0 0 1 178 42"
          fill="none"
          stroke="#facc15"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M 178 42 A 95 95 0 0 1 225 120"
          fill="none"
          stroke="#22c55e"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <g
          style={{
            transform: `rotate(${pointerRotation}deg)`,
            transformOrigin:
              "130px 120px",
          }}
        >
          <line
            x1="130"
            y1="120"
            x2="130"
            y2="45"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        <circle
          cx="130"
          cy="120"
          r="7"
          fill="#0f172a"
        />

        <text
          x="35"
          y="145"
          textAnchor="middle"
          className="fill-blue-950 text-xs font-extrabold"
        >
          0%
        </text>

        <text
          x="225"
          y="145"
          textAnchor="middle"
          className="fill-blue-950 text-xs font-extrabold"
        >
          100%
        </text>
      </svg>
    </div>
  );
};

const resolveKeyFunctionalityScores = (
  result: CaseStudySubmitResult,
): ResolvedKeyFunctionalityItem[] | null => {
  const resolvedItems:
    ResolvedKeyFunctionalityItem[] = [];

  for (
    const item of
    keyFunctionalities
  ) {
    const scoreItem =
      result.keyFunctionalityScores.find(
        (candidate) =>
          candidate.keyFunctionality ===
          item.name,
      );

    if (!scoreItem) {
      return null;
    }

    if (
      scoreItem.score !== null &&
      !isValidPercentageScore(
        scoreItem.score,
      )
    ) {
      return null;
    }

    resolvedItems.push({
      ...item,
      score: scoreItem.score,
    });
  }

  return resolvedItems;
};

const ResultsHeroErrorState = () => {
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
            SRI Result Overview Unavailable
          </h2>

          <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
            The overall SRI score or the required key functionality
            scores could not be displayed. Return to the service
            assessment and calculate the results again.
          </p>
        </div>
      </div>
    </section>
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

const formatScore = (
  score: number,
) => {
  return `${score.toFixed(1)}%`;
};

const getSriClassRange = (
  sriClass:
    CaseStudySubmitResult["sriClass"],
) => {
  switch (sriClass) {
    case "A":
      return "90% to 100%";

    case "B":
      return "80% to below 90%";

    case "C":
      return "65% to below 80%";

    case "D":
      return "50% to below 65%";

    case "E":
      return "35% to below 50%";

    case "F":
      return "20% to below 35%";

    case "G":
      return "0% to below 20%";
  }
};

const getIconClass = (
  tone: FunctionalityTone,
) => {
  switch (tone) {
    case "green":
      return "bg-emerald-50 text-emerald-600";

    case "blue":
      return "bg-blue-50 text-blue-600";

    case "purple":
      return "bg-purple-50 text-purple-600";
  }
};

const getScoreBarClass = (
  score: number | null,
) => {
  if (score === null) {
    return "bg-slate-300";
  }

  if (score >= 60) {
    return "bg-emerald-500";
  }

  if (score >= 30) {
    return "bg-amber-400";
  }

  return "bg-red-500";
};

export default ResultsHeroCard;