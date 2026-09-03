// client/src/features/caseStudy/components/improvement/ServiceMaximumImpactScoresTable.tsx

import ImpactCriterionIcon from "../../../../components/ui/impact-criteria/ImpactCriterionIcon";

import type {
  ImpactCriterionName,
} from "../../types/caseStudy.types";

import type {
  GuidedImprovementServiceMaximumImpactScoresTable as GuidedImprovementServiceMaximumImpactScoresTableData,
} from "../../improvement/guidedImprovement.types";

type Props = {
  table:
    GuidedImprovementServiceMaximumImpactScoresTableData;

  impactCriterion:
    ImpactCriterionName;

  showHighlight?: boolean;
};

const ServiceMaximumImpactScoresTable = ({
  table,
  impactCriterion,
  showHighlight = false,
}: Props) => {
  return (
    <div
      role="region"
      tabIndex={0}
      aria-label={`Maximum-level service impact scores for ${table.domain}. Scroll horizontally to view all impact criteria.`}
      className="results-horizontal-scroll mt-5 max-w-full overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <table className="w-full min-w-[1080px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th
              scope="col"
              className="sticky left-0 z-20 w-[170px] min-w-[170px] border-b border-slate-200 bg-slate-100 px-5 py-5 text-center text-xs font-extrabold uppercase tracking-wide text-blue-950"
            >
              Code
            </th>

            {table.impactCriteria.map(
              (criterion) => {
                const isFocused =
                  criterion ===
                  impactCriterion;

                return (
                  <th
                    key={criterion}
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
                        {criterion}
                      </span>
                    </div>
                  </th>
                );
              },
            )}
          </tr>
        </thead>

        <tbody>
          {table.rows.map(
            (row) => {
              return (
                <tr
                  key={
                    row.serviceId
                  }
                  className="group"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 min-w-[170px] border-b border-slate-200 bg-white px-5 py-4 text-left align-middle transition-colors duration-200 group-hover:bg-slate-50"
                  >
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <span className="break-words text-base font-bold leading-none text-blue-950">
                        {
                          row.serviceCode
                        }
                      </span>

                      <span className="break-words text-xs font-semibold leading-4 text-slate-500">
                        {`Max level ${row.maxLevelNumber}`}
                      </span>
                    </div>
                  </th>

                  {table
                    .impactCriteria
                    .map(
                      (
                        criterion,
                      ) => {
                        const isFocused =
                          criterion ===
                          impactCriterion;

                        const score =
                          row.scores[
                            criterion
                          ];

                        return (
                          <td
                            key={`${row.serviceId}-${criterion}`}
                            className={`border-b border-slate-200 px-4 py-4 text-center text-base font-semibold transition-colors duration-200 ${
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

      {table.rows.length ===
      0 ? (
        <div
          role="status"
          className="px-5 py-5 text-sm font-semibold leading-6 text-slate-500"
        >
          No assessed services are
          available for this domain.
        </div>
      ) : null}
    </div>
  );
};

export default ServiceMaximumImpactScoresTable;
