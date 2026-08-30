// client/src/features/course/components/SectionCompletedCard.tsx

import {
  CheckCircle2,
  ListChecks,
  RotateCcw,
  Trophy,
} from "lucide-react";

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";

import {
  getCourseAchievementIcon,
} from "../data/courseAchievementIcons";

import type {
  CourseAchievement,
} from "../course.types";

type SectionCompletedCardProps = {
  sectionTitle: string;

  achievement:
    CourseAchievement;

  description: string;

  accuracyPercentage: number;
  correctCount: number;
  totalQuestions: number;

  onContinue: () => void;
  onReview: () => void;
};

const SectionCompletedCard = ({
  sectionTitle,

  achievement,
  description,

  accuracyPercentage,
  correctCount,
  totalQuestions,

  onContinue,
  onReview,
}: SectionCompletedCardProps) => {
  const AchievementIcon =
    getCourseAchievementIcon(
      achievement.icon,
    );

  return (
    <section
      className="
        mx-auto
        max-w-4xl
        rounded-3xl
        border
        border-emerald-200
        bg-white
        p-6
        text-center
        shadow-sm
        sm:p-8
        lg:px-10
        lg:py-9
      "
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2
          size={34}
          strokeWidth={2.3}
          aria-hidden="true"
        />
      </div>

      <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
        Section Completed
      </p>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
        Final Test Passed
      </h1>

      <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-600 sm:text-base sm:leading-7">
        You successfully completed{" "}
        <span className="font-extrabold text-blue-950">
          {sectionTitle}
        </span>
        . {description}
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
            border-blue-100
            bg-blue-50/70
            px-5
            py-6
          "
        >
          <Trophy
            size={24}
            strokeWidth={2.2}
            className="text-blue-600"
            aria-hidden="true"
          />

          <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.13em] text-blue-700">
            Accuracy
          </p>

          <p className="mt-1.5 text-2xl font-extrabold text-blue-950">
            {accuracyPercentage}%
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
            {correctCount}/
            {totalQuestions}
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
            border-amber-100
            bg-amber-50/80
            px-5
            py-6
          "
        >
          <AchievementIcon
            size={24}
            strokeWidth={2.2}
            className="text-amber-600"
            aria-hidden="true"
          />

          <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.13em] text-amber-700">
            Achievement Unlocked
          </p>

          <p className="mt-1.5 break-words text-sm font-extrabold leading-5 text-blue-950">
            {achievement.title}
          </p>
        </div>
      </div>

      <div className="mt-9 flex flex-col-reverse justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReview}
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
          <RotateCcw
            size={17}
            aria-hidden="true"
          />

          Retake Final Test
        </button>

        <PrimaryButton
          type="button"
          onClick={onContinue}
          className="group justify-center"
        >
          <span className="inline-flex items-center gap-2">
            Continue to Course

            <ForwardArrowIcon />
          </span>
        </PrimaryButton>
      </div>
    </section>
  );
};

export default SectionCompletedCard;
