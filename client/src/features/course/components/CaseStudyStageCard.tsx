// client/src/features/course/components/CaseStudyStageCard.tsx

import {
  Building2,
  LockKeyhole,
} from "lucide-react";

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";

import {
  caseStudyAchievement,
} from "../data/courseAchievements";

import AchievementBadgePreview from "./AchievementBadgePreview";
import CourseStatusBadge from "./CourseStatusBadge";

type CaseStudyStageCardProps = {
  /*
   * unlocked:
   * The theory Course is complete and the
   * Case Study can be opened.
   *
   * completed:
   * The learner has completed the official
   * Case Study at least once. This is durable
   * and remains true during Practice Again.
   */
  unlocked: boolean;
  completed: boolean;

  completedSections: number;
  totalSections: number;

  onOpen: () => void;
};

const CaseStudyStageCard = ({
  unlocked,
  completed,

  completedSections,
  totalSections,

  onOpen,
}: CaseStudyStageCardProps) => {
  const status =
  !unlocked
    ? "locked"
    : completed
      ? "completed"
      : "available";

  return (
    <section
      className={`
        overflow-hidden
        rounded-3xl
        border
        bg-white
        shadow-sm
        ${
          unlocked
            ? "border-blue-200"
            : "border-slate-200"
        }
      `}
    >
      <div className="p-5 sm:p-6 md:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4">
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    ${
                      unlocked
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-400"
                    }
                  `}
                >
                  <Building2
                    size={23}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </div>

                <p
                  className={`
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.18em]
                    ${
                      unlocked
                        ? "text-blue-700"
                        : "text-slate-500"
                    }
                  `}
                >
                  Practical Application
                </p>
              </div>

              <h2 className="mt-5 break-words text-xl font-extrabold tracking-tight text-blue-950 sm:text-2xl">
                Practical Case Study
              </h2>

              <p className="mt-3 max-w-3xl break-words text-sm font-semibold leading-7 text-slate-600">
                Apply the SRI methodology in a complete fictional
                building scenario after completing all theory sections.
              </p>

              <div className="mt-5">
                <AchievementBadgePreview
                  achievement={caseStudyAchievement}
                  unlocked={unlocked && completed}
                />
              </div>

            </div>

            <CourseStatusBadge
              status={status}
            />

          </div>

          {unlocked ? (
            <div className="mt-6 flex justify-start">
              <PrimaryButton
                type="button"
                onClick={onOpen}
                className="group w-full justify-center sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  Open Case Study
                  <ForwardArrowIcon />
                </span>
              </PrimaryButton>
            </div>
          ) : null}
        {!unlocked ? (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-4
            "
          >
            <LockKeyhole
              size={18}
              strokeWidth={2.2}
              className="mt-0.5 shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <p className="text-sm font-semibold leading-6 text-slate-600">
              {completedSections} of{" "}
              {totalSections} sections
              completed. Complete all
              sections to unlock the
              practical case study.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CaseStudyStageCard;
