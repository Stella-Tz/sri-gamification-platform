// client/src/features/caseStudy/components/assessment/ServiceScenarioPanel.tsx

import officeBuildingImage from "../../../../assets/caseStudy/office-building.png";

type ServiceScenarioPanelProps = {
  scenarioEvidence:
    readonly string[];
};

const ServiceScenarioPanel = ({
  scenarioEvidence,
}: ServiceScenarioPanelProps) => {
  const useTwoColumns =
    scenarioEvidence.length >= 6;

  return (
    <section className="rounded-3xl border border-indigo-200 bg-indigo-100/50 p-6 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
        Scenario Evidence
      </p>

      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
        Building Systems and Technologies
      </h3>

      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <img
          src={officeBuildingImage}
          alt="Office building used in the case study scenario"
          className="h-44 w-full rounded-2xl object-cover shadow-sm"
        />

        <ul
          className={
            useTwoColumns
              ? "columns-1 gap-10 xl:columns-2"
              : "space-y-3"
          }
        >
          {scenarioEvidence.map(
            (evidence, index) => (
              <li
                key={`${index}-${evidence}`}
                className={`flex break-inside-avoid items-start gap-3 ${
                  useTwoColumns
                    ? "mb-3"
                    : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 w-1.5 shrink-0 items-center justify-center"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                </span>

                <p className="min-w-0 break-words text-sm font-semibold leading-7 text-slate-700">
                  {evidence}
                </p>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default ServiceScenarioPanel;