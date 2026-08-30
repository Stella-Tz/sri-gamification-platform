// client/src/features/course/components/FinalTestFailedCard.tsx

import {
  ArrowLeft,
  CircleAlert,
  ClipboardList,
  ListChecks,
  RotateCcw,
  XCircle,
} from "lucide-react";

import PrimaryButton from "../../../components/ui/PrimaryButton";

type FinalTestFailedCardProps = {
  sectionTitle: string;

  correctCount: number;
  wrongCount: number;
  answeredCount: number;
  totalQuestions: number;

  allowedMistakes: number;

  onBack: () => void;
  onRetry: () => void;
};

const FinalTestFailedCard = ({
  sectionTitle,

  correctCount,
  wrongCount,
  answeredCount,
  totalQuestions,

  allowedMistakes,

  onBack,
  onRetry,
}: FinalTestFailedCardProps) => {
  return (
    <section
      className="
        mx-auto
        max-w-4xl
        rounded-3xl
        border
        border-red-200
        bg-white
        p-6
        text-center
        shadow-sm
        sm:p-8
        lg:px-10
        lg:py-9
      "
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-700">
        <XCircle
          size={34}
          strokeWidth={2.3}
          aria-hidden="true"
        />
      </div>

      <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-red-700">
        Final Test Attempt Failed
      </p>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
        Review the Section and Try Again
      </h1>

      <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-600 sm:text-base sm:leading-7">
        Your attempt for{" "}
        <span className="font-extrabold text-blue-950">
          {sectionTitle}
        </span>{" "}
        ended after the permitted
        mistake limit was exceeded.
      </p>

      <div
        className="
          mx-auto
          mt-8
          grid
          max-w-3xl
          gap-4
          sm:grid-cols-3
          lg:gap-5
        "
      >
        <div
          className="
            flex
            min-h-36
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-emerald-100
            bg-emerald-50/70
            px-5
            py-6
          "
        >
          <ListChecks
            size={24}
            strokeWidth={2.2}
            className="text-emerald-600"
            aria-hidden="true"
          />

          <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.13em] text-emerald-700">
            Correct Answers
          </p>

          <p className="mt-1.5 text-2xl font-extrabold text-blue-950">
            {correctCount}
          </p>
        </div>

        <div
          className="
            flex
            min-h-36
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-red-100
            bg-red-50/70
            px-5
            py-6
          "
        >
          <CircleAlert
            size={24}
            strokeWidth={2.2}
            className="text-red-600"
            aria-hidden="true"
          />

          <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.13em] text-red-700">
            Mistakes
          </p>

          <p className="mt-1.5 text-2xl font-extrabold text-red-700">
            {wrongCount}
          </p>
        </div>

        <div
          className="
            flex
            min-h-36
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-indigo-100
            bg-indigo-50/70
            px-5
            py-6
          "
        >
          <ClipboardList
            size={24}
            strokeWidth={2.2}
            className="text-indigo-600"
            aria-hidden="true"
          />

          <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.13em] text-indigo-700">
            Questions Answered
          </p>

          <p className="mt-1.5 text-2xl font-extrabold text-blue-950">
            {answeredCount}/
            {totalQuestions}
          </p>
        </div>
      </div>

      <div
        className="
          mx-auto
          mt-6
          max-w-2xl
          rounded-2xl
          border
          border-red-100
          bg-red-50/60
          px-4
          py-3
        "
      >
        <p className="text-sm font-semibold leading-6 text-red-700">
          This final test allows up to{" "}
          <span className="font-extrabold">
            {allowedMistakes}{" "}
            {allowedMistakes === 1
              ? "mistake"
              : "mistakes"}
          </span>{" "}
          per attempt.
        </p>
      </div>

      <div className="mt-9 flex flex-col-reverse justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            text-sm
            font-extrabold
            text-slate-600
            shadow-sm
            transition-colors
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-700
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-blue-100
          "
        >
          <ArrowLeft
            size={17}
            aria-hidden="true"
          />

          Back to Course
        </button>

        <PrimaryButton
          type="button"
          onClick={onRetry}
          className="justify-center"
        >
          <span className="inline-flex items-center gap-2">
            <RotateCcw
              size={17}
              strokeWidth={2.3}
              aria-hidden="true"
            />

            Retry Final Test
          </span>
        </PrimaryButton>
      </div>
    </section>
  );
};

export default FinalTestFailedCard;