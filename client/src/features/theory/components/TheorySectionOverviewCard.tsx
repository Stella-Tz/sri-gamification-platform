// client/src/features/theory/components/TheorySectionOverviewCard.tsx

import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";

import {
  THEORY_ROUTES,
} from "../../../constants/routes";

import type {
  TheoryLesson,
  TheorySection,
} from "../types/theory.types";

type Props = {
  section: TheorySection;
  lessons: readonly TheoryLesson[];
};

const TheorySectionOverviewCard = ({
  section,
  lessons,
}: Props) => {
  const firstLesson =
    lessons[0];

  return (
    <article className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
      <div className="p-5 sm:p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-sm font-extrabold text-white">
                {String(
                  section.order,
                ).padStart(
                  2,
                  "0",
                )}
              </div>

              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
                Section
              </p>
            </div>

            <h2 className="mt-5 max-w-4xl break-words text-xl font-extrabold leading-tight text-blue-950 sm:text-2xl">
              {section.title}
            </h2>

            <div
              className="mt-3 h-1 w-14 rounded-full bg-blue-600"
              aria-hidden="true"
            />

            <p className="mt-4 max-w-5xl break-words text-sm font-semibold leading-7 text-slate-600">
              {section.description}
            </p>
          </div>

          {firstLesson ? (
            <Link
              to={THEORY_ROUTES.lesson(
                section.id,
                firstLesson.id,
              )}
              className="
                group
                inline-flex
                min-h-11
                w-full
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-blue-700
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-sm
                transition-colors
                duration-200
                hover:bg-blue-800
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-blue-100
                sm:w-auto
              "
            >
              Open Section

              <ForwardArrowIcon />
            </Link>
          ) : null}
        </div>

        <div className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-950">
              Lessons
            </p>

            <p className="text-xs font-semibold text-slate-500">
              {lessons.length}{" "}
              {lessons.length === 1
                ? "lesson"
                : "lessons"}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {lessons.map(
              (lesson) => (
                <Link
                  key={lesson.id}
                  to={THEORY_ROUTES.lesson(
                    section.id,
                    lesson.id,
                  )}
                  className="
                    group
                    min-w-0
                    rounded-2xl
                    border
                    border-blue-200
                    bg-white
                    p-4
                    transition-colors
                    duration-200
                    hover:border-blue-500
                    hover:bg-blue-50/30
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-blue-100
                  "
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-colors duration-200 group-hover:bg-blue-100">
                      <BookOpen
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        Lesson{" "}
                        {lesson.order}
                      </p>

                      <h3 className="mt-1 break-words text-sm font-extrabold leading-5 text-blue-950 transition-colors duration-200 group-hover:text-blue-700">
                        {lesson.title}
                      </h3>

                      <p className="mt-1.5 break-words text-xs font-medium leading-5 text-slate-500">
                        {lesson.question}
                      </p>
                    </div>

                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-700"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TheorySectionOverviewCard;