// client/src/features/caseStudy/components/improvement/GuidedImprovementHero.tsx

import guidedImprovementAnalysisImage from "../../../../assets/caseStudy/guided_improvement_analysis.png";

const GuidedImprovementHero = () => {
  return (
    <section className="grid gap-6 rounded-3xl border border-slate-200 bg-indigo-100/60 px-5 py-6 shadow-sm sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="min-w-0 self-start lg:py-3">
        <h1 className="break-words text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
          Guided Improvement Analysis
        </h1>

        <div className="mt-5 max-w-xl space-y-4 text-sm font-semibold leading-7 text-slate-600 sm:mt-6">
          <p>
            This analysis uses the official Smart Readiness Indicator
            weighting factors and service impact scores to identify a
            high-priority smart-ready service for improvement. You will
            progressively examine the weighting structure and the
            maximum-level service impact scores before evaluating the
            effect of a simulated upgrade.
          </p>
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-center">
        <img
          src={guidedImprovementAnalysisImage}
          alt="Guided improvement analysis illustration"
          className="w-full max-w-[320px] object-contain"
        />
      </div>
    </section>
  );
};

export default GuidedImprovementHero;
