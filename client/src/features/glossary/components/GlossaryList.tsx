// client/src/features/glossary/components/GlossaryList.tsx

import type { GlossaryEntry } from "../types/glossary.types";

type Props = {
  entries: readonly GlossaryEntry[];
};

const GlossaryList = ({ entries }: Props) => {
  return (
    <dl className="divide-y divide-blue-100">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="
            grid
            min-w-0
            gap-2
            px-6
            py-5
            sm:grid-cols-[6rem_minmax(0,1fr)]
            sm:items-baseline
            sm:gap-6
            md:px-7
          "
        >
          <dt className="break-words text-sm font-extrabold text-blue-700">
            {entry.acronym}
          </dt>

          <dd className="min-w-0 break-words text-sm font-semibold leading-6 text-slate-700">
            {entry.term}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default GlossaryList;