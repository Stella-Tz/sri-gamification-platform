// client/src/pages/TheoryPage.tsx

import {
  BookOpen,
  CircleCheck,
} from "lucide-react";

import PageHeader from "../components/ui/PageHeader";

import theoryLibraryBooksImage from "../assets/theory/theory_library_books.png";
import TheorySectionOverviewCard from "../features/theory/components/TheorySectionOverviewCard";
import { theoryLessons } from "../features/theory/data/theoryLessons";
import { theorySections } from "../features/theory/data/theorySections";

const TheoryPage = () => {
  return (
    <div className="pb-16">
      <PageHeader
        title="Theory Library"
        subtitle="Smart Readiness Indicator concepts, assessment framework and technical domains."
      />

      <section className="mt-8 overflow-hidden rounded-3xl border border-blue-100 bg-blue-100/60 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="relative z-10 min-w-0 lg:w-[45%]">
            <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-blue-900 md:text-3xl">
              From Core Concepts to Technical Domains
            </h2>

            <div
              className="mt-3 h-1 w-12 rounded-full bg-blue-900"
              aria-hidden="true"
            />

            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-700">
              Browse the complete collection of SRI theory lessons, from the
              basic concepts and assessment framework to the nine technical
              domains. Open any topic directly for study, review or reference.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-950">
                <CircleCheck
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />

                <span>{theorySections.length} sections</span>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-blue-950">
                <BookOpen
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />

                <span>{theoryLessons.length} lessons</span>
              </div>
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-end justify-end lg:flex">
            <img
              src={theoryLibraryBooksImage}
              alt=""
              aria-hidden="true"
              className="max-h-[220px] w-full max-w-[650px] object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
            Library Contents
          </p>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-blue-950 md:text-3xl">
            Sections and Lessons
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          {theorySections.map((section) => {
            const sectionLessons = theoryLessons
              .filter(
                (lesson) =>
                  lesson.sectionId === section.id,
              )
              .sort((a, b) => a.order - b.order);

            return (
              <TheorySectionOverviewCard
                key={section.id}
                section={section}
                lessons={sectionLessons}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TheoryPage;
