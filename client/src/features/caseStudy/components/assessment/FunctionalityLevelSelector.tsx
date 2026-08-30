// client/src/features/caseStudy/components/assessment/FunctionalityLevelSelector.tsx

import type { FunctionalityLevel } from "../../types/caseStudy.types";

type FunctionalityLevelSelectorProps = {
  serviceId: string;
  selectedLevelId: string;
  levels: readonly FunctionalityLevel[];
  onChangeLevel: (
    levelId: string,
  ) => void;
};

const FunctionalityLevelSelector = ({
  serviceId,
  selectedLevelId,
  levels,
  onChangeLevel,
}: FunctionalityLevelSelectorProps) => {
  const normalizedServiceId =
    createSafeId(serviceId);

  const groupName =
    `functionality-level-${normalizedServiceId}`;

  const headingId =
    `${groupName}-heading`;

  const descriptionId =
    `${groupName}-description`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4">
        <StepNumber value={1} />

        <h3
          id={headingId}
          className="min-w-0 text-lg font-extrabold tracking-tight text-slate-900"
        >
          <span className="sr-only">
            Step 1:{" "}
          </span>
          Assess Functionality Level
        </h3>

        <p
          id={descriptionId}
          className="
            col-span-2
            mt-3
            text-sm
            font-semibold
            leading-6
            text-slate-500

            sm:col-span-1
            sm:col-start-2
            sm:mt-1
          "
        >
          Compare the scenario evidence with the official
          functionality level descriptions and select the main
          functionality level described in the scenario. Partial
          compliance is specified in the next step.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        className="mt-6 space-y-3"
      >
        {levels.map((level) => {
          const isSelected =
            selectedLevelId === level.id;

          return (
            <label
              key={level.id}
              className={`grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-2 rounded-2xl border px-5 py-4 transition-colors duration-200 sm:grid-cols-[auto_90px_minmax(0,1fr)] ${
                isSelected
                  ? "border-blue-300 bg-blue-50 ring-4 ring-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name={groupName}
                value={level.id}
                checked={isSelected}
                onChange={() =>
                  onChangeLevel(level.id)
                }
                className="mt-1 h-4 w-4 shrink-0 accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />

              <div className="min-w-0">
                <p className="text-sm font-extrabold text-slate-900">
                  Level {level.level}
                </p>
              </div>

              <div className="col-start-2 min-w-0 sm:col-start-3">
                <p className="break-words text-sm font-semibold leading-6 text-slate-600">
                  {level.officialDescription}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
};

type StepNumberProps = {
  value: number;
};

const StepNumber = ({
  value,
}: StepNumberProps) => {
  return (
    <div
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-extrabold text-white shadow-sm"
    >
      {value}
    </div>
  );
};

const createSafeId = (
  value: string,
) => {
  const normalizedValue = value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalizedValue || "service";
};

export default FunctionalityLevelSelector;