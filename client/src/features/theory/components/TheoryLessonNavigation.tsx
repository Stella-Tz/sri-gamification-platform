// client/src/features/theory/components/TheoryLessonNavigation.tsx

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  ROUTES,
  THEORY_ROUTES,
} from "../../../constants/routes";

import type { TheoryLesson } from "../types/theory.types";

type Props = {
  previousLesson?: TheoryLesson;
  nextLesson?: TheoryLesson;
};

const secondaryLinkClasses =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 sm:w-auto";

const primaryLinkClasses =
  "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 sm:w-auto";

const TheoryLessonNavigation = ({
  previousLesson,
  nextLesson,
}: Props) => {
  return (
    <nav
      aria-label="Lesson navigation"
      className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="w-full sm:w-auto">
        {previousLesson ? (
          <Link
            to={THEORY_ROUTES.lesson(
              previousLesson.sectionId,
              previousLesson.id,
            )}
            className={secondaryLinkClasses}
          >
            <ArrowLeft
              size={18}
              aria-hidden="true"
            />

            Previous Lesson
          </Link>
        ) : (
          <Link
            to={ROUTES.theory}
            className={secondaryLinkClasses}
          >
            <ArrowLeft
              size={18}
              aria-hidden="true"
            />

            Back to Theory
          </Link>
        )}
      </div>

      <div className="w-full sm:w-auto">
        {nextLesson ? (
          <Link
            to={THEORY_ROUTES.lesson(
              nextLesson.sectionId,
              nextLesson.id,
            )}
            className={primaryLinkClasses}
          >
            Next Lesson

            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        ) : (
          <Link
            to={ROUTES.theory}
            className={primaryLinkClasses}
          >
            Back to Theory

            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TheoryLessonNavigation;
