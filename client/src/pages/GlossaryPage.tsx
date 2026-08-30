// client/src/pages/GlossaryPage.tsx

import { useMemo, useState } from "react";

import { BookOpen, Search } from "lucide-react";

import PageHeader from "../components/ui/PageHeader";

import glossaryImage from "../assets/glossary/glossary.png";

import GlossaryList from "../features/glossary/components/GlossaryList";
import { glossaryEntries } from "../features/glossary/data/glossaryEntries";

const GlossaryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = useMemo(() => {
    const normalizedQuery = searchQuery
      .trim()
      .toLocaleLowerCase("en");

    return [...glossaryEntries]
      .sort((firstEntry, secondEntry) =>
        firstEntry.acronym.localeCompare(
          secondEntry.acronym,
          "en",
          {
            sensitivity: "base",
          },
        ),
      )
      .filter((entry) => {
        if (!normalizedQuery) {
          return true;
        }

        const normalizedAcronym =
          entry.acronym.toLocaleLowerCase("en");

        const normalizedTerm =
          entry.term.toLocaleLowerCase("en");

        return (
          normalizedAcronym.includes(normalizedQuery) ||
          normalizedTerm.includes(normalizedQuery)
        );
      });
  }, [searchQuery]);

  return (
    <div className="pb-16">
      <PageHeader
        title="Glossary"
        subtitle="Technical terms and abbreviations used throughout the Smart Readiness Indicator platform."
      />

      <section className="mt-8 overflow-hidden rounded-3xl border border-blue-100 bg-blue-100/60 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="relative z-10 min-w-0 lg:w-[45%]">
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-900 md:text-3xl">
              Terms and Abbreviations
            </h2>

            <div
              className="mt-3 h-1 w-12 rounded-full bg-blue-900"
              aria-hidden="true"
            />

            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-700">
              A quick reference to the acronyms and technical terms used across
              the SRI theory and assessment.
            </p>

            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-blue-950">
              <BookOpen
                className="h-5 w-5 text-blue-700"
                aria-hidden="true"
              />

              <span>
                {glossaryEntries.length}{" "}
                {glossaryEntries.length === 1
                  ? "term"
                  : "terms"}
              </span>
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-end lg:flex">
            <img
              src={glossaryImage}
              alt=""
              aria-hidden="true"
              className="max-h-[180px] w-full max-w-[380px] object-contain object-center"
            />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
          Quick Reference
        </p>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-blue-950 md:text-3xl">
          Acronyms
        </h2>

        <div className="mt-8 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
          <div
            className="border-b border-blue-100 bg-blue-50/40 p-5 sm:p-6 md:p-7"
            role="search"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="w-full max-w-3xl">
                <label
                  htmlFor="glossary-search"
                  className="sr-only"
                >
                  Search glossary
                </label>

                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />

                  <input
                    id="glossary-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search by acronym or term..."
                    autoComplete="off"
                    aria-controls="glossary-results"
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-300
                      bg-white
                      pl-12
                      pr-4
                      text-sm
                      font-medium
                      text-slate-800
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-blue-300
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                </div>
              </div>

              <p
                className="shrink-0 text-sm font-semibold text-slate-500"
                aria-live="polite"
              >
                {filteredEntries.length}{" "}
                {filteredEntries.length === 1
                  ? "term"
                  : "terms"}
              </p>
            </div>
          </div>

          <div id="glossary-results">
            {filteredEntries.length > 0 ? (
              <GlossaryList entries={filteredEntries} />
            ) : (
              <div className="px-7 py-14 text-center">
                <h3 className="text-base font-extrabold text-blue-950">
                  No Matching Terms
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  Try a different acronym or term.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlossaryPage;