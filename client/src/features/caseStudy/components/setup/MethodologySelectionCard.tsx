// client/src/features/caseStudy/components/setup/MethodologySelectionCard.tsx

import { assessmentMethodOptions } from "../../data/sriSetupOptions";

import type { OfficialAssessmentMethod } from "../../types/caseStudy.types";

type Props = {
  assessmentMethod:
    | OfficialAssessmentMethod
    | "";

  setAssessmentMethod: (
    value: OfficialAssessmentMethod,
  ) => void;

  errors?: Record<string, string>;
};

const MethodologySelectionCard = ({
  assessmentMethod,
  setAssessmentMethod,
  errors = {},
}: Props) => {
  const assessmentMethodError =
    errors.assessmentMethod;

  const hasError = Boolean(
    assessmentMethodError,
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle
        number={2}
        title="Methodology Selection"
      />

      <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
        Use the methodology context from the
        scenario above to select the appropriate
        SRI assessment method.
      </p>

      <div
        data-setup-error={
          hasError ? "true" : undefined
        }
        tabIndex={hasError ? -1 : undefined}
        className="mt-7 max-w-4xl outline-none"
      >
        <fieldset>
          <legend className="text-sm font-extrabold text-slate-900">
            Assessment Method{" "}
            <span className="text-red-500">
              *
            </span>
          </legend>

          <div className="mt-3 divide-y divide-slate-200 border-y border-slate-200">
            {assessmentMethodOptions.map(
              (option) => {
                const isSelected =
                  assessmentMethod ===
                  option.value;

                return (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-start gap-4 py-5"
                  >
                    <input
                      type="radio"
                      name="assessmentMethod"
                      value={option.value}
                      checked={isSelected}
                      aria-invalid={hasError}
                      onChange={() =>
                        setAssessmentMethod(
                          option.value,
                        )
                      }
                      className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <span>
                      <span
                        className={`block text-base font-extrabold ${
                          isSelected
                            ? "text-blue-700"
                            : "text-slate-900"
                        }`}
                      >
                        {option.label}
                      </span>

                      {option.description ? (
                        <span className="mt-1 block text-sm font-semibold leading-6 text-slate-500">
                          {option.description}
                        </span>
                      ) : null}
                    </span>
                  </label>
                );
              },
            )}
          </div>
        </fieldset>

        {assessmentMethodError ? (
          <p
            role="alert"
            className="mt-3 text-xs font-semibold text-red-600"
          >
            {assessmentMethodError}
          </p>
        ) : null}
      </div>
    </section>
  );
};

type SectionTitleProps = {
  number: number;
  title: string;
};

const SectionTitle = ({
  number,
  title,
}: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-extrabold text-white shadow-sm"
      >
        {number}
      </div>

      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
        <span className="sr-only">
          Step {number}:{" "}
        </span>

        {title}
      </h2>
    </div>
  );
};

export default MethodologySelectionCard;