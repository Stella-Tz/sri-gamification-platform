// client/src/features/landing/components/LandingFooter.tsx

import { ExternalLink } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="bg-indigo-400/20 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-8">
          <div
            className="
              grid
              gap-y-8
              lg:grid-cols-2
              lg:gap-x-16
              xl:grid-cols-[420px_520px]
              xl:gap-x-32
            "
          >
            <div className="w-full">
              <p className="text-base font-extrabold tracking-tight text-blue-950">
                SRI Smart Tool
              </p>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                An educational platform for learning and applying the Smart
                Readiness Indicator methodology.
              </p>
            </div>

            <div className="w-full">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
                Sources
              </p>

              <div className="mt-3 flex flex-col gap-2.5">
                <a
                  href="https://energy.ec.europa.eu/topics/energy-efficiency/energy-performance-buildings/smart-readiness-indicator_en"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
                >
                  European Commission — Smart Readiness Indicator
                  <ExternalLink
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://learning.sri2market.eu/moodle/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
                >
                  SRI2MARKET Learning Platform
                  <ExternalLink
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-7 border-t border-indigo-300/25 pt-5">
            <p className="text-xs font-medium text-slate-400">
              © 2026 SRI Smart Tool. Developed as part of a diploma thesis.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;