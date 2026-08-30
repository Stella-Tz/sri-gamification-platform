import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { motion } from "motion/react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import {
  fadeUp,
  staggerContainer,
} from "../../../lib/motion";

import {
  getCourseAchievementIcon,
} from "../../course/data/courseAchievementIcons";

import type {
  DashboardAchievement,
} from "../dashboard.types";

type AchievementsRowProps = {
  achievements: DashboardAchievement[];
};

const getAchievementTitleLines = (
  title: string,
): readonly string[] => {
  const specialistSuffix = " Specialist";

  if (
    title.endsWith(specialistSuffix) &&
    title.length >= 25
  ) {
    return [
      title.slice(
        0,
        -specialistSuffix.length,
      ),
      "Specialist",
    ];
  }

  return [title];
};

const AchievementsRow = ({
  achievements,
}: AchievementsRowProps) => {
  const scrollContainerRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const latestUnlockedRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(false);

  const unlockedCount =
    achievements.filter(
      (achievement) =>
        achievement.status ===
        "unlocked",
    ).length;

  const latestUnlockedIndex =
    useMemo(() => {
      return achievements.reduce(
        (
          latestIndex,
          achievement,
          index,
        ) => {
          return achievement.status ===
            "unlocked"
            ? index
            : latestIndex;
        },
        -1,
      );
    }, [achievements]);

  const updateScrollButtons =
    useCallback(() => {
      const container =
        scrollContainerRef.current;

      if (!container) {
        setCanScrollLeft(false);
        setCanScrollRight(false);
        return;
      }

      const maximumScrollLeft =
        Math.max(
          0,
          container.scrollWidth -
            container.clientWidth,
        );

      const tolerance = 2;

      setCanScrollLeft(
        container.scrollLeft >
          tolerance,
      );

      setCanScrollRight(
        container.scrollLeft <
          maximumScrollLeft -
            tolerance,
      );
    }, []);

  /*
   * When the Dashboard opens, reveal the most
   * recently unlocked achievement immediately.
   *
   * Because the Case Study achievement is the
   * final item, completing the Case Study will
   * automatically focus that achievement.
   */
  useLayoutEffect(() => {
    const container =
      scrollContainerRef.current;

    if (!container) {
      return;
    }

    if (
      latestUnlockedIndex < 0 ||
      !latestUnlockedRef.current
    ) {
      container.scrollLeft = 0;
      updateScrollButtons();
      return;
    }

    const achievement =
      latestUnlockedRef.current;

    const targetScrollLeft =
      achievement.offsetLeft -
      container.clientWidth / 2 +
      achievement.offsetWidth / 2;

    const maximumScrollLeft =
      Math.max(
        0,
        container.scrollWidth -
          container.clientWidth,
      );

    container.scrollLeft =
      Math.max(
        0,
        Math.min(
          targetScrollLeft,
          maximumScrollLeft,
        ),
      );

    updateScrollButtons();
  }, [
    achievements.length,
    latestUnlockedIndex,
    updateScrollButtons,
  ]);

  useLayoutEffect(() => {
    const container =
      scrollContainerRef.current;

    if (!container) {
      return;
    }

    updateScrollButtons();

    const handleScroll = () => {
      updateScrollButtons();
    };

    container.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    const resizeObserver =
      new ResizeObserver(() => {
        updateScrollButtons();
      });

    resizeObserver.observe(
      container,
    );

    return () => {
      container.removeEventListener(
        "scroll",
        handleScroll,
      );

      resizeObserver.disconnect();
    };
  }, [updateScrollButtons]);

  const scrollAchievements = (
    direction: "left" | "right",
  ) => {
    const container =
      scrollContainerRef.current;

    if (!container) {
      return;
    }

    const scrollDistance =
      container.clientWidth * 0.5;

    container.scrollBy({
      left:
        direction === "right"
          ? scrollDistance
          : -scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
            SRI Achievements
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Your Achievements
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Pass each theory section final test and complete the practical case study to unlock all achievements.
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {unlockedCount}/
          {achievements.length} unlocked
        </span>
      </div>

      <div className="mt-7 grid grid-cols-[40px_minmax(0,1fr)_40px] items-start gap-2 sm:grid-cols-[44px_minmax(0,1fr)_44px] sm:gap-3">
        <button
          type="button"
          onClick={() =>
            scrollAchievements(
              "left",
            )
          }
          disabled={!canScrollLeft}
          aria-label="Show previous achievements"
          className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-25 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600 sm:mt-[18px] sm:h-11 sm:w-11"
        >
          <ChevronLeft
            className="h-5 w-5"
            aria-hidden="true"
          />
        </button>

        <div
          ref={scrollContainerRef}
          className="relative min-w-0 overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="flex min-w-0 gap-5 py-3"
          >
            {achievements.map(
              (
                achievement,
                index,
              ) => {
                const Icon =
                  getCourseAchievementIcon(
                    achievement.icon,
                  );

                const isUnlocked =
                  achievement.status ===
                  "unlocked";

                const isLatestUnlocked =
                  isUnlocked &&
                  index ===
                    latestUnlockedIndex;

                const titleLines =
                  getAchievementTitleLines(
                    achievement.title,
                  );

                return (
                  <motion.div
                    key={achievement.id}
                    ref={
                      isLatestUnlocked
                        ? latestUnlockedRef
                        : null
                    }
                    variants={fadeUp}
                    className="relative flex w-[calc((100%-1.25rem)/2)] shrink-0 flex-col items-center text-center sm:w-[calc((100%-2.5rem)/3)] md:w-[calc((100%-3.75rem)/4)] lg:w-[calc((100%-5rem)/5)] xl:w-[calc((100%-6.25rem)/6)]"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200 ${
                        isUnlocked
                          ? "border-amber-200 bg-amber-50 text-amber-500"
                          : "border-slate-200 bg-slate-100 text-slate-400"
                      } ${
                        isLatestUnlocked
                          ? "ring-4 ring-amber-100"
                          : ""
                      }`}
                    >
                      <Icon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>

                    <p
                      className={`mt-3 min-h-10 max-w-[190px] text-xs font-semibold leading-4 ${
                        isUnlocked
                          ? "text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      {titleLines.map(
                        (line) => (
                          <span
                            key={line}
                            className="block"
                          >
                            {line}
                          </span>
                        ),
                      )}
                    </p>

                    <span className="sr-only">
                      {isLatestUnlocked
                        ? "Latest unlocked achievement"
                        : isUnlocked
                          ? "Unlocked"
                          : "Locked"}
                    </span>
                  </motion.div>
                );
              },
            )}
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() =>
            scrollAchievements(
              "right",
            )
          }
          disabled={!canScrollRight}
          aria-label="Show next achievements"
          className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-25 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600 sm:mt-[18px] sm:h-11 sm:w-11"
        >
          <ChevronRight
            className="h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>
    </Card>
  );
};

export default AchievementsRow;
