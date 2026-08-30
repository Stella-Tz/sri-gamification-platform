// client/src/features/caseStudy/components/improvement/ServiceMaximumImpactScoresTable.tsx

import ImpactCriterionIcon from "../../../../components/ui/impact-criteria/ImpactCriterionIcon";

import {
  sriImpactCriterionNames,
} from "../../data/sriOfficialConstants";

import {
  getMaximumFunctionalityLevel,
  getServiceById,
} from "../../utils/serviceCatalogue.utils";

import type {
  ImpactCriterionName,
  ResultsServiceEntry,
  SriService,
  TechnicalDomainName,
} from "../../types/caseStudy.types";

type ServiceMaximumImpactScoresTableProps = {
  domain: TechnicalDomainName;
  impactCriterion: ImpactCriterionName;

  /**
   * Fully resolved Catalogue A or Catalogue B.
   */
  services: readonly SriService[];

  /**
   * Assessed services grouped by technical domain.
   */
  servicesByDomain: Readonly<
    Record<
      TechnicalDomainName,
      readonly ResultsServiceEntry[]
    >
  >;

  showHighlight?: boolean;
};

const getImpactScoreAtMaximumLevel = (
  service: SriService,
  impactCriterion: ImpactCriterionName,
): number | null => {
  const maximumLevel =
    getMaximumFunctionalityLevel(
      service,
    );

  const score =
    service
      .impactScoresByLevel[
      maximumLevel.id
    ]?.[impactCriterion];

  return (
    typeof score ===
      "number" &&
    Number.isFinite(score)
  )
    ? score
    : null;
};

const ServiceMaximumImpactScoresTable =
  ({
    domain,
    impactCriterion,
    services:
      catalogueServices,
    servicesByDomain,
    showHighlight = false,
  }: ServiceMaximumImpactScoresTableProps) => {
    const domainServiceEntries =
      servicesByDomain[
        domain
      ] ?? [];

    return (
      <div
        role="region"
        tabIndex={0}
        aria-label={`Maximum-level service impact scores for ${domain}. Scroll horizontally to view all impact criteria.`}
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
        <table className="w-full min-w-[960px] border-separate border-spacing-0 text-sm sm:min-w-[1080px]">
          <caption className="sr-only">
            Maximum-functionality-level impact scores for the assessed
            services in {domain} across the seven impact criteria.
          </caption>

          <thead>
            <tr className="bg-slate-100">
              <th
                scope="col"
                className="sticky left-0 z-20 w-[128px] min-w-[128px] border-b border-slate-200 bg-slate-100 px-3 py-5 text-center text-xs font-extrabold uppercase tracking-wide text-blue-950 sm:w-[170px] sm:min-w-[170px] sm:px-5"
              >
                Code
              </th>

              {sriImpactCriterionNames.map(
                (criterion) => {
                  const isFocused =
                    criterion ===
                    impactCriterion;

                  return (
                    <th
                      key={
                        criterion
                      }
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
                            criterion
                          }
                          size={22}
                          className="text-blue-600"
                          aria-hidden="true"
                        />

                        <span className="break-words">
                          {
                            criterion
                          }
                        </span>
                      </div>
                    </th>
                  );
                },
              )}
            </tr>
          </thead>

          <tbody>
            {domainServiceEntries.map(
              (
                serviceEntry,
                serviceIndex,
              ) => {
                const service =
                  getServiceById(
                    catalogueServices,
                    serviceEntry.serviceId,
                  );

                const maximumLevel =
                  service
                    ? getMaximumFunctionalityLevel(
                        service,
                      )
                    : null;

                const isLastRow =
                  serviceIndex ===
                  domainServiceEntries.length -
                    1;

                const rowBorderClass =
                  isLastRow
                    ? ""
                    : "border-b border-slate-200";

                return (
                  <tr
                    key={
                      serviceEntry.serviceId
                    }
                    className="group"
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-10 w-[128px] min-w-[128px] border-b border-slate-200 bg-white px-3 py-4 text-left align-middle transition-colors duration-200 group-hover:bg-slate-50 sm:w-[170px] sm:min-w-[170px] sm:px-5"
                    >
                      <div className="flex min-w-0 flex-col gap-1.5">
                        <span className="break-words text-base font-bold leading-none text-blue-950">
                          {
                            serviceEntry.serviceCode
                          }
                        </span>

                        <span className="break-words text-xs font-semibold leading-4 text-slate-500">
                          {maximumLevel
                            ? `Max level ${maximumLevel.level}`
                            : "Max level —"}
                        </span>
                      </div>
                    </th>

                    {sriImpactCriterionNames.map(
                      (
                        criterion,
                      ) => {
                        const isFocused =
                          criterion ===
                          impactCriterion;

                        const score =
                          service
                            ? getImpactScoreAtMaximumLevel(
                                service,
                                criterion,
                              )
                            : null;

                        return (
                          <td
                            key={`${serviceEntry.serviceId}-${criterion}`}
                            className={`${rowBorderClass} px-4 py-4 text-center text-base font-semibold transition-colors duration-200 ${
                              showHighlight &&
                              isFocused
                                ? "border-x border-blue-200 bg-blue-50 text-blue-800"
                                : "border-l border-slate-200 text-blue-950 group-hover:bg-slate-50"
                            }`}
                          >
                            {score ===
                            null
                              ? "—"
                              : score}
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

        {domainServiceEntries.length ===
        0 ? (
          <div
            role="status"
            className="px-5 py-5 text-sm font-semibold leading-6 text-slate-500"
          >
            No assessed services are available for this domain.
          </div>
        ) : null}
      </div>
    );
  };

export default ServiceMaximumImpactScoresTable;