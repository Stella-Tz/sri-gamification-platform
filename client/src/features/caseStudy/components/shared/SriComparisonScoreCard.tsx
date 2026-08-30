// client/src/features/caseStudy/components/shared/SriComparisonScoreCard.tsx

type SriComparisonScoreTone =
  | "blue"
  | "violet";

type SriComparisonScoreCardVariant =
  | "default"
  | "compact";

type SriComparisonScoreCardProps = {
  label: string;
  value: number;
  sriClass: string;
  tone: SriComparisonScoreTone;
  variant?: SriComparisonScoreCardVariant;
};

const SriComparisonScoreCard = ({
  label,
  value,
  sriClass,
  tone,
  variant = "default",
}: SriComparisonScoreCardProps) => {
  const isViolet =
    tone === "violet";

  const isCompact =
    variant === "compact";

  const cardClassName =
    isViolet
      ? "border-violet-200 bg-violet-50/70"
      : "border-blue-200 bg-blue-50/70";

  const valueClassName =
    isViolet
      ? "text-violet-700"
      : "text-blue-700";

  const strokeColor =
    isViolet
      ? "#7c3aed"
      : "#2563eb";

  const sizeClassName =
    isCompact
      ? "px-6 py-5 sm:px-8 md:min-h-[240px]"
      : "px-5 py-6 sm:px-7 lg:min-h-[300px]";

  return (
    <article
      aria-label={`${label}: ${formatScore(
        value,
      )}, SRI Class ${sriClass}`}
      className={`
        flex
        min-w-0
        flex-col
        rounded-3xl
        border
        text-center
        ${cardClassName}
        ${sizeClassName}
      `}
    >
      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <div className="flex flex-1 items-center justify-center">
        <SriHalfDonutGauge
          value={value}
          strokeColor={
            strokeColor
          }
          valueClassName={
            valueClassName
          }
        />
      </div>

      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-[230px] bg-slate-300/80"
      />

      <p className="mt-4 text-sm font-semibold text-slate-600">
        SRI Class {sriClass}
      </p>
    </article>
  );
};

type SriHalfDonutGaugeProps = {
  value: number;
  strokeColor: string;
  valueClassName: string;
};

const SriHalfDonutGauge = ({
  value,
  strokeColor,
  valueClassName,
}: SriHalfDonutGaugeProps) => {
  const centerX = 120;
  const centerY = 112;
  const radius = 84;
  const strokeWidth = 12;

  const safeValue =
    Math.min(
      100,
      Math.max(
        0,
        value,
      ),
    );

  const backgroundPath =
    describeArc(
      centerX,
      centerY,
      radius,
      180,
      360,
    );

  const progressPath =
    describeArc(
      centerX,
      centerY,
      radius,
      180,
      180 +
        safeValue * 1.8,
    );

  return (
    <div className="relative mx-auto h-[126px] w-[240px] max-w-full">
      <svg
        viewBox="0 0 240 140"
        focusable="false"
        aria-hidden="true"
        className="h-full w-full overflow-visible"
      >
        <path
          d={backgroundPath}
          fill="none"
          stroke="#e2e8f0"
          strokeLinecap="round"
          strokeWidth={
            strokeWidth
          }
        />

        {safeValue > 0 ? (
          <path
            d={progressPath}
            fill="none"
            stroke={
              strokeColor
            }
            strokeLinecap="round"
            strokeWidth={
              strokeWidth
            }
          />
        ) : null}
      </svg>

      <div className="absolute inset-x-0 bottom-5 flex items-baseline justify-center">
        <span
          className={`text-4xl font-extrabold leading-none tracking-tight ${valueClassName}`}
        >
          {value.toFixed(1)}
        </span>

        <span
          className={`ml-1 text-2xl font-extrabold leading-none ${valueClassName}`}
        >
          %
        </span>
      </div>
    </div>
  );
};

const formatScore = (
  value: number,
): string => {
  return `${value.toFixed(1)}%`;
};

type Point = {
  x: number;
  y: number;
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): Point => {
  const angleInRadians =
    (angleInDegrees *
      Math.PI) /
    180;

  return {
    x:
      centerX +
      radius *
        Math.cos(
          angleInRadians,
        ),

    y:
      centerY +
      radius *
        Math.sin(
          angleInRadians,
        ),
  };
};

const describeArc = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string => {
  const start =
    polarToCartesian(
      centerX,
      centerY,
      radius,
      startAngle,
    );

  const end =
    polarToCartesian(
      centerX,
      centerY,
      radius,
      endAngle,
    );

  const largeArcFlag =
    endAngle -
      startAngle <=
    180
      ? "0"
      : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
  ].join(" ");
};

export default SriComparisonScoreCard;
