// client/src/features/course/components/AssessmentHeader.tsx

import {
  CircleAlert,
} from "lucide-react";

import testBannerImage from "../../../assets/course/test_banner.png";

type AssessmentStatusTone =
  | "amber"
  | "red";

type AssessmentHeaderProps = {
  eyebrow: string;
  title: string;

  currentQuestionNumber: number;
  totalQuestions: number;

  statusText?: string;
  statusTone?: AssessmentStatusTone;
};

const clampPercentage = (
  value: number,
): number => {
  return Math.min(
    100,
    Math.max(0, value),
  );
};

const AssessmentHeader = ({
  eyebrow,
  title,

  currentQuestionNumber,
  totalQuestions,

  statusText,
  statusTone = "amber",
}: AssessmentHeaderProps) => {
  const progressPercentage =
    totalQuestions > 0
      ? clampPercentage(
          Math.round(
            (
              currentQuestionNumber /
              totalQuestions
            ) * 100,
          ),
        )
      : 0;

  return (
    <header className="relative px-4 pt-4 sm:px-5 sm:pt-5">
      <div className="h-40 w-full overflow-hidden rounded-[2rem] bg-blue-100 sm:h-44 lg:h-48">
        <img
          src={testBannerImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[center_78%]"
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          -mt-20
          w-[calc(100%-2rem)]
          max-w-4xl
          rounded-[2rem]
          border
          border-blue-100
          bg-white
          px-5
          pb-8
          pt-14
          text-center
          shadow-[0_10px_30px_rgba(37,99,235,0.10)]
          sm:w-[86%]
          sm:px-8
          sm:pb-10
          sm:pt-16
          lg:w-[82%]
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            flex
            h-[72px]
            w-[72px]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            p-1
            shadow-sm
            sm:h-[78px]
            sm:w-[78px]
          "
          style={{
            background: `conic-gradient(
              #2563eb ${progressPercentage}%,
              #dbeafe ${progressPercentage}% 100%
            )`,
          }}
          aria-hidden="true"
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
            <span className="text-xl font-extrabold leading-none text-blue-950">
              {currentQuestionNumber}
            </span>
          </div>
        </div>

        <p className="break-words text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700 sm:text-sm">
          {eyebrow}
        </p>

        <p className="mt-2 text-sm font-semibold text-slate-500">
          Question{" "}
          {currentQuestionNumber} of{" "}
          {totalQuestions}
        </p>

        {statusText ? (
          <div className="mt-4">
            <span
              aria-live="polite"
              className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                font-extrabold
                ${getStatusClasses(
                  statusTone,
                )}
              `}
            >
              <CircleAlert
                size={15}
                strokeWidth={2.3}
                aria-hidden="true"
              />

              {statusText}
            </span>
          </div>
        ) : null}

        <h1
          className={`
            mx-auto
            max-w-3xl
            break-words
            text-left
            text-lg
            font-bold
            leading-8
            text-blue-950
            sm:text-xl
            ${
              statusText
                ? "mt-5"
                : "mt-7"
            }
          `}
        >
          {title}
        </h1>
      </div>
    </header>
  );
};

const getStatusClasses = (
  tone: AssessmentStatusTone,
): string => {
  switch (tone) {
    case "amber":
      return `
        border-amber-200
        bg-amber-50
        text-amber-700
      `;

    case "red":
      return `
        border-red-200
        bg-red-50
        text-red-700
      `;
  }
};

export default AssessmentHeader;