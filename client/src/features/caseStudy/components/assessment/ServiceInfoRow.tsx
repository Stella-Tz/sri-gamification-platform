// client/src/features/caseStudy/components/assessment/ServiceInfoRow.tsx

import {
  Info,
  Leaf,
} from "lucide-react";

import ImpactCriterionIcon from "../../../../components/ui/impact-criteria/ImpactCriterionIcon";

import type { ImpactCriterionName } from "../../types/caseStudy.types";

type ServiceInfoRowProps = {
  impactCriteria?:
    readonly ImpactCriterionName[];

  methodologyNote?: string;
};

const ServiceInfoRow = ({
  impactCriteria = [],
  methodologyNote,
}: ServiceInfoRowProps) => {
  const cleanNote =
    methodologyNote?.trim();

  const hasImpactCriteria =
    impactCriteria.length > 0;

  const hasMethodologyNote =
    Boolean(cleanNote);

  if (
    !hasImpactCriteria &&
    !hasMethodologyNote
  ) {
    return null;
  }

  return (
    <section className="grid gap-3 lg:grid-cols-2">
      {hasImpactCriteria ? (
        <article className="min-w-0 rounded-2xl border border-[#d7e6dd] bg-[#f1f7f3] px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Leaf
              size={18}
              className="shrink-0 text-[#5f7f68]"
              aria-hidden="true"
            />

            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#496b55]">
              SRI Impact Criteria
            </h3>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {impactCriteria.map(
              (criterion) => (
                <ImpactItem
                  key={criterion}
                  criterion={criterion}
                />
              ),
            )}
          </ul>
        </article>
      ) : null}

      {cleanNote ? (
        <article className="min-w-0 rounded-2xl border border-indigo-100 bg-indigo-50/50 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Info
              size={18}
              className="shrink-0 text-indigo-500"
              aria-hidden="true"
            />

            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-indigo-600">
              Methodology Note
            </h3>
          </div>

          <p className="mt-3 break-words text-sm font-semibold leading-6 text-slate-700">
            {cleanNote}
          </p>
        </article>
      ) : null}
    </section>
  );
};

type ImpactItemProps = {
  criterion: ImpactCriterionName;
};

const ImpactItem = ({
  criterion,
}: ImpactItemProps) => {
  return (
    <li className="inline-flex min-w-0 items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold text-slate-700">
      <ImpactCriterionIcon
        criterion={criterion}
        size={15}
        className="shrink-0 text-[#5f7f68]"
        aria-hidden="true"
      />

      <span className="break-words">
        {criterion}
      </span>
    </li>
  );
};

export default ServiceInfoRow;