// client/src/features/caseStudy/components/assessment/ShareSelector.tsx

import {
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

import type { FunctionalityLevel } from "../../types/caseStudy.types";

type ShareSelectorProps = {
  share: number;

  additionalLevelId?: string;

  levels:
    readonly FunctionalityLevel[];

  shareError?: string;

  additionalLevelError?: string;

  onChangeShare: (
    share: number,
  ) => void;

  onChangeAdditionalLevel: (
    levelId: string | undefined,
  ) => void;
};

const ShareSelector = ({
  share,
  additionalLevelId,
  levels,
  shareError,
  additionalLevelError,
  onChangeShare,
  onChangeAdditionalLevel,
}: ShareSelectorProps) => {
  const [
    shareInputValue,
    setShareInputValue,
  ] = useState(
    String(share),
  );

  const [
    shareInputError,
    setShareInputError,
  ] = useState<
    string | null
  >(null);

  /*
   * Step 2 IDs
   */
  const shareHeadingId =
    useId();

  const shareDescriptionId =
    useId();

  const shareInputErrorId =
    useId();

  const shareScenarioErrorId =
    useId();

  /*
   * Step 3 IDs
   */
  const additionalHeadingId =
    useId();

  const additionalDescriptionId =
    useId();

  const additionalScenarioErrorId =
    useId();

  const remainingShare =
    Math.max(
      0,
      100 - share,
    );

  const hasRemainingArea =
    remainingShare > 0;

  const selectedAdditionalLevel =
    useMemo(
      () =>
        levels.find(
          (level) =>
            level.id ===
            additionalLevelId,
        ),
      [
        levels,
        additionalLevelId,
      ],
    );

  /*
   * Keep the editable percentage field
   * synchronized with the external answer.
   */
  useEffect(() => {
    setShareInputValue(
      String(share),
    );

    setShareInputError(
      null,
    );
  }, [share]);

  const handleShareChange = (
    value: number,
  ) => {
    const normalizedValue =
      clampShare(value);

    setShareInputValue(
      String(normalizedValue),
    );

    setShareInputError(
      null,
    );

    onChangeShare(
      normalizedValue,
    );
  };

  const validateAndApplyShareInput = (
    value: string,
  ) => {
    const trimmedValue =
      value.trim();

    if (
      trimmedValue === ""
    ) {
      setShareInputError(
        "Share of the main functionality level is required.",
      );

      setShareInputValue(
        String(share),
      );

      return;
    }

    if (
      !/^\d+$/.test(
        trimmedValue,
      )
    ) {
      setShareInputError(
        "Share of the main functionality level must be a whole number.",
      );

      setShareInputValue(
        String(share),
      );

      return;
    }

    const numericValue =
      Number(
        trimmedValue,
      );

    if (
      numericValue < 0 ||
      numericValue > 100
    ) {
      setShareInputError(
        "Share of the main functionality level must be between 0% and 100%.",
      );

      setShareInputValue(
        String(share),
      );

      return;
    }

    handleShareChange(
      numericValue,
    );
  };

  const shareSectionDescribedBy =
    shareError
      ? `${shareDescriptionId} ${shareScenarioErrorId}`
      : shareDescriptionId;

  const shareInputDescribedBy = [
    shareDescriptionId,

    shareInputError
      ? shareInputErrorId
      : null,

    shareError
      ? shareScenarioErrorId
      : null,
  ]
    .filter(
      (
        id,
      ): id is string =>
        Boolean(id),
    )
    .join(" ");

  const additionalSectionDescribedBy =
    additionalLevelError
      ? `${additionalDescriptionId} ${additionalScenarioErrorId}`
      : additionalDescriptionId;

  return (
    <div className="space-y-6">
      {/*
       * STEP 2
       * Share of the Main Functionality Level
       */}
      <div
        data-assessment-error={
          shareError
            ? "true"
            : undefined
        }
        tabIndex={
          shareError
            ? -1
            : undefined
        }
        aria-describedby={
          shareError
            ? shareScenarioErrorId
            : undefined
        }
        className="scroll-mt-24 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <section
          aria-labelledby={
            shareHeadingId
          }
          aria-describedby={
            shareSectionDescribedBy
          }
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <SectionHeader
            number={2}
            headingId={
              shareHeadingId
            }
            descriptionId={
              shareDescriptionId
            }
            title="Share of the Main Functionality Level"
            description="Indicate the percentage of the building's net surface area that complies with the main functionality level."
          />

          <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_124px] md:items-center">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={share}
              onChange={(
                event,
              ) =>
                handleShareChange(
                  Number(
                    event.target
                      .value,
                  ),
                )
              }
              aria-label="Main functionality level share slider"
              aria-invalid={
                Boolean(
                  shareError,
                )
              }
              aria-describedby={
                shareSectionDescribedBy
              }
              aria-valuetext={`${share}%`}
              className="w-full rounded-full accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />

            <div>
              <div
                className={`flex h-[52px] items-center justify-center gap-1 rounded-2xl border px-4 py-3 text-base font-extrabold transition-colors duration-200 ${
                  shareInputError
                    ? "border-red-300 bg-red-50/40"
                    : "border-slate-200 bg-slate-50 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50"
                }`}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={
                    shareInputValue
                  }
                  onChange={(
                    event,
                  ) => {
                    const nextValue =
                      event.target
                        .value;

                    /*
                     * Allow only up to
                     * three numeric
                     * characters while
                     * editing.
                     */
                    if (
                      !/^\d{0,3}$/.test(
                        nextValue,
                      )
                    ) {
                      return;
                    }

                    setShareInputValue(
                      nextValue,
                    );

                    setShareInputError(
                      null,
                    );

                    if (
                      nextValue ===
                      ""
                    ) {
                      return;
                    }

                    const numericValue =
                      Number(
                        nextValue,
                      );

                    if (
                      numericValue >=
                        0 &&
                      numericValue <=
                        100
                    ) {
                      handleShareChange(
                        numericValue,
                      );
                    }
                  }}
                  onBlur={() =>
                    validateAndApplyShareInput(
                      shareInputValue,
                    )
                  }
                  onKeyDown={(
                    event,
                  ) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      event.preventDefault();

                      validateAndApplyShareInput(
                        event
                          .currentTarget
                          .value,
                      );

                      event.currentTarget.blur();
                    }
                  }}
                  aria-label="Main functionality level share percentage"
                  aria-invalid={
                    Boolean(
                      shareInputError ||
                        shareError,
                    )
                  }
                  aria-describedby={
                    shareInputDescribedBy
                  }
                  className="w-[54px] bg-transparent text-right font-extrabold text-slate-900 outline-none"
                />

                <span
                  aria-hidden="true"
                  className="text-slate-400"
                >
                  %
                </span>
              </div>

              {shareInputError ? (
                <p
                  id={
                    shareInputErrorId
                  }
                  role="alert"
                  className="mt-2 text-xs font-semibold leading-5 text-red-600"
                >
                  {
                    shareInputError
                  }
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-600">
            {share === 100
              ? "The main functionality level applies to 100% of the building's net surface area."
              : `The main functionality level applies to ${share}% of the building's net surface area.`}
          </p>
        </section>

        {shareError ? (
          <p
            id={
              shareScenarioErrorId
            }
            role="alert"
            className="mt-2 px-1 text-xs font-semibold leading-5 text-red-600"
          >
            {shareError}
          </p>
        ) : null}
      </div>

      {/*
       * STEP 3
       * Additional Functionality Level
       */}
      <div
        data-assessment-error={
          additionalLevelError
            ? "true"
            : undefined
        }
        tabIndex={
          additionalLevelError
            ? -1
            : undefined
        }
        aria-describedby={
          additionalLevelError
            ? additionalScenarioErrorId
            : undefined
        }
        className="scroll-mt-24 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <section
          aria-labelledby={
            additionalHeadingId
          }
          aria-describedby={
            additionalSectionDescribedBy
          }
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <SectionHeader
            number={3}
            headingId={
              additionalHeadingId
            }
            descriptionId={
              additionalDescriptionId
            }
            title="Additional Functionality Level"
            description="If the main functionality level applies to less than 100% of the building's net surface area, select the functionality level that applies to the remaining surface area."
          />

          <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_124px]">
            <select
              value={
                additionalLevelId ??
                ""
              }
              disabled={
                !hasRemainingArea
              }
              onChange={(
                event,
              ) =>
                onChangeAdditionalLevel(
                  event.target
                    .value ||
                    undefined,
                )
              }
              aria-label="Additional functionality level"
              aria-invalid={
                Boolean(
                  additionalLevelError,
                )
              }
              aria-describedby={
                additionalSectionDescribedBy
              }
              className="min-w-0 truncate rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition-colors duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">
                {hasRemainingArea
                  ? "Select additional functionality level"
                  : "Not applicable"}
              </option>

              {levels.map(
                (level) => (
                  <option
                    key={
                      level.id
                    }
                    value={
                      level.id
                    }
                  >
                    Level{" "}
                    {
                      level.level
                    }
                  </option>
                ),
              )}
            </select>

            <div
              role="status"
              aria-label={`Remaining surface area: ${remainingShare}%`}
              className="flex min-h-[52px] items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-extrabold text-slate-900"
            >
              <span
                aria-hidden="true"
              >
                {remainingShare}
              </span>

              <span
                aria-hidden="true"
                className="text-slate-400"
              >
                %
              </span>
            </div>
          </div>

          {selectedAdditionalLevel ? (
            <div className="mt-4 rounded-2xl bg-blue-50 px-4 py-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
                Selected Additional
                Functionality Level
              </p>

              <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-700">
                Level{" "}
                {
                  selectedAdditionalLevel.level
                }{" "}
                —{" "}
                {
                  selectedAdditionalLevel
                    .officialDescription
                }
              </p>
            </div>
          ) : null}

          <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-600">
            {hasRemainingArea
              ? `The additional functionality level applies to the remaining ${remainingShare}% of the building's net surface area.`
              : "The additional functionality level is not used because the main functionality level applies to 100% of the building's net surface area."}
          </p>
        </section>

        {additionalLevelError ? (
          <p
            id={
              additionalScenarioErrorId
            }
            role="alert"
            className="mt-2 px-1 text-xs font-semibold leading-5 text-red-600"
          >
            {
              additionalLevelError
            }
          </p>
        ) : null}
      </div>
    </div>
  );
};

const clampShare = (
  value: number,
): number => {
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value),
    ),
  );
};

type SectionHeaderProps = {
  number: number;

  headingId: string;

  descriptionId: string;

  title: string;

  description: string;
};

const SectionHeader = ({
  number,
  headingId,
  descriptionId,
  title,
  description,
}: SectionHeaderProps) => {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4">
      <div
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-extrabold text-white shadow-sm"
      >
        {number}
      </div>

      <h3
        id={headingId}
        className="min-w-0 text-lg font-extrabold tracking-tight text-slate-900"
      >
        <span className="sr-only">
          Step {number}:{" "}
        </span>

        {title}
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
        {description}
      </p>
    </div>
  );
};

export default ShareSelector;