// client/src/features/caseStudy/components/improvement/DomainWeightingTable.tsx

import ImpactCriterionIcon from "../../../../components/ui/impact-criteria/ImpactCriterionIcon";

import { getTechnicalDomainIcon } from "../../data/technicalDomainIcons";

import {
  sriImpactCriterionNames,
  sriTechnicalDomainNames,
} from "../../data/sriOfficialConstants";

import { getOfficialSriWeight } from "../../data/sriMethodWeightings";

import type {
  BuildingType,
  ClimateZone,
  ImpactCriterionName,
  OfficialAssessmentMethod,
} from "../../types/caseStudy.types";

type DomainWeightingTableProps = {
  assessmentMethod: OfficialAssessmentMethod;
  buildingType: BuildingType;
  climateZone: ClimateZone;
  focusImpactCriterion: ImpactCriterionName;
  showHighlight?: boolean;
};

const DomainWeightingTable = ({
  assessmentMethod,
  buildingType,
  climateZone,
  focusImpactCriterion,
  showHighlight = false,
}: DomainWeightingTableProps) => {
  return (
    <div
      role="region"
      tabIndex={0}
      aria-label={`Official technical-domain weightings for ${focusImpactCriterion}. Scroll horizontally to view all impact criteria.`}
      style={{
        contain: "layout paint",
      }}
      className="
        results-horizontal-scroll
        mt-5
        w-full
        min-w-0
        max-w-full
        overflow-x-auto
        overscroll-x-contain
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        !pb-0
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500
        focus-visible:ring-offset-2
      "
    >
      <table className="w-full min-w-[970px] border-separate border-spacing-0 text-sm sm:min-w-[1080px]">
        <caption className="sr-only">
          Official SRI technical-domain weightings across the seven impact
          criteria.
        </caption>

        <thead>
          <tr className="bg-slate-100">
            <th
              scope="col"
              className="sticky left-0 z-20 w-[140px] min-w-[140px] border-b border-slate-200 bg-slate-100 px-3 py-5 text-center text-xs font-extrabold uppercase tracking-wide text-blue-950 sm:w-[230px] sm:min-w-[230px] sm:px-5"
            >
              Technical domain
            </th>

            {sriImpactCriterionNames.map(
              (impactCriterion) => {
                const isFocused =
                  impactCriterion ===
                  focusImpactCriterion;

                return (
                  <th
                    key={impactCriterion}
                    scope="col"
                    className={`min-w-[118px] border-b border-slate-200 px-4 py-5 text-center text-xs font-extrabold leading-4 text-blue-950 ${
                      showHighlight &&
                      isFocused
                        ? "border-x border-blue-200 bg-blue-50"
                        : "border-l border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImpactCriterionIcon
                        criterion={
                          impactCriterion
                        }
                        size={22}
                        className="text-blue-600"
                        aria-hidden="true"
                      />

                      <span className="break-words">
                        {impactCriterion}
                      </span>
                    </div>
                  </th>
                );
              },
            )}
          </tr>
        </thead>

        <tbody>
          {sriTechnicalDomainNames.map(
            (
              domain,
              domainIndex,
            ) => {
              const DomainIcon =
                getTechnicalDomainIcon(
                  domain,
                );

              const isLastRow =
                domainIndex ===
                sriTechnicalDomainNames.length -
                  1;

              const rowBorderClass =
                isLastRow
                  ? ""
                  : "border-b border-slate-200";

              return (
                <tr
                  key={domain}
                  className="group"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 w-[140px] min-w-[140px] border-b border-slate-200 bg-white px-3 py-4 text-left font-extrabold text-slate-700 transition-colors duration-200 group-hover:bg-slate-50 sm:w-[230px] sm:min-w-[230px] sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <DomainIcon
                        size={18}
                        className="shrink-0 text-blue-600"
                        aria-hidden="true"
                      />

                      <span className="min-w-0 break-words">
                        {domain}
                      </span>
                    </div>
                  </th>

                  {sriImpactCriterionNames.map(
                    (
                      impactCriterion,
                    ) => {
                      const isFocused =
                        impactCriterion ===
                        focusImpactCriterion;

                      const value =
                        getOfficialSriWeight(
                          {
                            assessmentMethod,
                            buildingType,
                            climateZone,
                            domain,
                            impactCriterion,
                          },
                        );

                      return (
                        <td
                          key={`${domain}-${impactCriterion}`}
                          className={`${rowBorderClass} px-4 py-4 text-center text-base font-semibold transition-colors duration-200 ${
                            showHighlight &&
                            isFocused
                              ? "border-x border-blue-200 bg-blue-50 text-blue-800"
                              : "border-l border-slate-200 text-blue-950 group-hover:bg-slate-50"
                          }`}
                        >
                          {value.toFixed(
                            2,
                          )}
                        </td>
                      );
                    },
                  )}
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DomainWeightingTable;