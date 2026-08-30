// client/src/features/theory/components/TheoryNoteBlock.tsx

import {
  AlertCircle,
  Info,
} from "lucide-react";

import type { TheoryNoteBlock as TheoryNoteBlockType } from "../types/theory.types";

type Props = {
  block: TheoryNoteBlockType;
};

const TheoryNoteBlock = ({ block }: Props) => {
  const variant =
    block.variant ?? "warning";

  const isInfo =
    variant === "info";

  const Icon =
    isInfo ? Info : AlertCircle;

  return (
    <aside
      className={[
        "h-full rounded-3xl border p-6",
        isInfo
          ? "border-blue-100 bg-blue-50/80"
          : "border-amber-100 bg-amber-50/80",
      ].join(" ")}
    >
      <div
        className="
          grid
          min-w-0
          grid-cols-[48px_minmax(0,1fr)]
          gap-x-4
          gap-y-2
        "
      >
        <div
          className={[
            `
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              ring-1

              sm:row-span-2
            `,
            isInfo
              ? "bg-blue-100 text-blue-700 ring-blue-200"
              : "bg-amber-100 text-amber-700 ring-amber-200",
          ].join(" ")}
        >
          <Icon
            size={22}
            strokeWidth={2.3}
            aria-hidden="true"
          />
        </div>

        <h2
          className={[
            `
              min-w-0
              break-words
              self-center
              text-base
              font-extrabold
              leading-6

              sm:self-auto
            `,
            isInfo
              ? "text-blue-800"
              : "text-amber-800",
          ].join(" ")}
        >
          {block.title}
        </h2>

        <p
          className={[
            `
              col-span-2
              min-w-0
              whitespace-pre-line
              break-words
              text-sm
              font-semibold
              leading-7

              sm:col-span-1
              sm:col-start-2
            `,
            isInfo
              ? "text-blue-800"
              : "text-amber-800",
          ].join(" ")}
        >
          {block.body}
        </p>
      </div>
    </aside>
  );
};

export default TheoryNoteBlock;