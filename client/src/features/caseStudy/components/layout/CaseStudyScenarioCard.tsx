// client/src/features/caseStudy/components/layout/CaseStudyScenarioCard.tsx

import type { LucideIcon } from "lucide-react";

import {
  Building2,
  CalendarDays,
  MapPin,
  Maximize,
  Wrench,
} from "lucide-react";

import officeBuildingImage from "../../../../assets/caseStudy/office-building.png";

import type { CaseStudyDefinition } from "../../types/caseStudy.types";

import {
  getBuildingUsageLabel,
} from "../../data/sriSetupOptions";

type CaseStudyScenarioCardProps = {
  caseStudy: CaseStudyDefinition;
};

const CaseStudyScenarioCard = ({
  caseStudy,
}: CaseStudyScenarioCardProps) => {
  const generalBuildingInformation =
    caseStudy.scenario
      .generalBuildingInformation.bullets;

  const {
    buildingUsage,
    locationLabel,
    constructionYear,
    renovationYear,
    floorArea,
  } = caseStudy.buildingInformation;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,500px)]">
        <div className="flex h-full min-w-0 flex-col justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
              Case Study {caseStudy.order}
            </p>

            <h1 className="mt-3 break-words text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
              {caseStudy.title}
            </h1>

            <ul className="mt-6 space-y-3">
              {generalBuildingInformation.map(
                (information, index) => (
                  <li
                    key={`${index}-${information}`}
                    className="flex min-w-0 items-start gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-1.5 shrink-0 items-center justify-center"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    </span>

                    <p className="min-w-0 break-words text-sm font-semibold leading-7 text-slate-700">
                      {information}
                    </p>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <img
          src={officeBuildingImage}
          alt={`Exterior view of ${caseStudy.title}`}
          className="h-full min-h-[240px] w-full rounded-3xl object-cover shadow-sm sm:min-h-[320px]"
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <InfoPill
          icon={Building2}
          label={getBuildingUsageLabel(
            buildingUsage,
          )}
        />

        <InfoPill
          icon={MapPin}
          label={locationLabel}
        />

        <InfoPill
          icon={CalendarDays}
          label={`Constructed in ${constructionYear}`}
        />

        <InfoPill
          icon={Wrench}
          label={
            renovationYear
              ? `Renovated in ${renovationYear}`
              : "Original condition"
          }
        />

        <InfoPill
          icon={Maximize}
          label={`${floorArea.toLocaleString()} m²`}
        />
      </div>
    </section>
  );
};

type InfoPillProps = {
  icon: LucideIcon;
  label: string;
};

const InfoPill = ({
  icon: Icon,
  label,
}: InfoPillProps) => {
  return (
    <div className="flex min-h-[52px] min-w-0 items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-extrabold text-blue-900">
      <Icon
        size={18}
        className="shrink-0 text-blue-600"
        aria-hidden="true"
      />

      <span className="min-w-0 break-words">
        {label}
      </span>
    </div>
  );
};

export default CaseStudyScenarioCard;