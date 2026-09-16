// client/src/features/caseStudy/components/setup/BuildingInformationForm.tsx

import type { ReactNode } from "react";

import {
  buildingStateOptions,
  buildingTypeOptions,
  buildingUsageOptionsByType,
  getClimateZoneLabel,
  locationOptions,
} from "../../data/sriSetupOptions";

import type {
  BuildingState,
  BuildingType,
  BuildingUsage,
  ClimateZone,
  SelectOption,
} from "../../types/caseStudy.types";

type Props = {
  buildingType: BuildingType | "";
  setBuildingType: (value: BuildingType) => void;

  buildingUsage: BuildingUsage | "";
  setBuildingUsage: (
    value: BuildingUsage | "",
  ) => void;

  country: string;
  setCountry: (value: string) => void;

  climateZone: ClimateZone | "";

  floorArea: string;
  setFloorArea: (value: string) => void;

  constructionYear: string;
  setConstructionYear: (
    value: string,
  ) => void;

  buildingState: BuildingState | "";
  setBuildingState: (
    value: BuildingState,
  ) => void;

  renovationYear: string;
  setRenovationYear: (
    value: string,
  ) => void;

  errors?: Record<string, string>;
};

const BuildingInformationForm = ({
  buildingType,
  setBuildingType,

  buildingUsage,
  setBuildingUsage,

  country,
  setCountry,

  climateZone,

  floorArea,
  setFloorArea,

  constructionYear,
  setConstructionYear,

  buildingState,
  setBuildingState,

  renovationYear,
  setRenovationYear,

  errors = {},
}: Props) => {
  const usageOptions = buildingType
    ? buildingUsageOptionsByType[buildingType]
    : [];

  const handleBuildingTypeChange = (
    value: BuildingType,
  ) => {
    setBuildingType(value);
    setBuildingUsage("");
  };

  const handleBuildingStateChange = (
    value: BuildingState,
  ) => {
    setBuildingState(value);

    if (value === "original") {
      setRenovationYear("");
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle
        number={1}
        title="General Building Information"
      />

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <FormRow
          label="Building Type"
          required
          error={errors.buildingType}
        >
          {buildingTypeOptions.map((option) => (
            <RadioInline
              key={option.value}
              name="buildingType"
              label={option.label}
              checked={
                buildingType === option.value
              }
              onChange={() =>
                handleBuildingTypeChange(
                  option.value,
                )
              }
            />
          ))}
        </FormRow>

        <FormRow
          label="Building Usage"
          required
          error={errors.buildingUsage}
        >
          <SelectField
            value={buildingUsage}
            options={usageOptions}
            onChange={(value) =>
              setBuildingUsage(
                value as BuildingUsage | "",
              )
            }
            placeholder={
              buildingType
                ? "Select building usage"
                : "Select building type first"
            }
            disabled={!buildingType}
          />
        </FormRow>

        <FormRow
          label="Location"
          required
          error={errors.country}
        >
          <SelectField
            value={country}
            options={locationOptions}
            onChange={setCountry}
            placeholder="Select location"
          />
        </FormRow>

        <FormRow
          label="Climate Zone"
          error={errors.climateZone}
        >
          <input
            value={getClimateZoneLabel(
              climateZone,
            )}
            disabled
            placeholder="Auto-generated from location"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-400"
          />
        </FormRow>

        <FormRow
          label="Year of Construction"
          required
          error={errors.constructionYear}
        >
          <input
            value={constructionYear}
            onChange={(event) =>
              setConstructionYear(
                event.target.value,
              )
            }
            inputMode="numeric"
            placeholder="e.g. 2014"
            className="h-11 w-full max-w-[280px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition-colors duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </FormRow>

        <FormRow
          label="Building Status"
          required
          error={errors.buildingState}
        >
          {buildingStateOptions.map((option) => (
            <RadioInline
              key={option.value}
              name="buildingState"
              label={option.label}
              checked={
                buildingState === option.value
              }
              onChange={() =>
                handleBuildingStateChange(
                  option.value,
                )
              }
            />
          ))}
        </FormRow>

        <FormRow
          label="Year of Last Renovation"
          error={errors.renovationYear}
        >
          <input
            value={renovationYear}
            disabled={
              buildingState !== "renovated"
            }
            onChange={(event) =>
              setRenovationYear(
                event.target.value,
              )
            }
            inputMode="numeric"
            placeholder={
              buildingState === "renovated"
                ? "e.g. 2023"
                : "Only required for renovated buildings"
            }
            className="h-11 w-full max-w-[280px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition-colors duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-50 disabled:text-slate-400"
          />
        </FormRow>

        <FormRow
          label="Total Useful Floor Area (m²)"
          required
          error={errors.floorArea}
        >
          <input
            value={floorArea}
            onChange={(event) =>
              setFloorArea(event.target.value)
            }
            inputMode="decimal"
            placeholder="e.g. 12500"
            className="h-11 w-full max-w-[280px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition-colors duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </FormRow>
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

type FormRowProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

const FormRow = ({
  label,
  required = false,
  error,
  children,
}: FormRowProps) => {
  const hasError = Boolean(error);

  return (
    <div
      data-setup-error={
        hasError ? "true" : undefined
      }
      tabIndex={hasError ? -1 : undefined}
      className="grid min-h-[64px] border-b border-slate-200 outline-none last:border-b-0 md:grid-cols-[280px_1fr]"
    >
      <div className="flex items-center bg-white px-5 pt-4 pb-2 md:py-0">
        <p className="text-sm font-extrabold text-slate-800">
          {label}

          {required ? (
            <span className="text-red-500">
              {" "}
              *
            </span>
          ) : null}
        </p>
      </div>

      <div className="flex flex-col justify-center px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-16 gap-y-3">
          {children}
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-2 text-xs font-semibold text-red-600"
          >
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
};

type RadioInlineProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

const RadioInline = ({
  name,
  label,
  checked,
  onChange,
}: RadioInlineProps) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-700">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-blue-600"
      />

      <span>{label}</span>
    </label>
  );
};

type SelectFieldProps = {
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
};

const SelectField = ({
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
}: SelectFieldProps) => {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="h-11 w-full max-w-[620px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition-colors duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-50 disabled:text-slate-400"
    >
      <option value="">
        {placeholder}
      </option>

      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default BuildingInformationForm;