// client/src/features/theory/components/TheoryTakeawayBlock.tsx

import { CheckCircle2 } from "lucide-react";

import type { TheoryTakeawayBlock as TheoryTakeawayBlockType } from "../types/theory.types";

type Props = {
  block: TheoryTakeawayBlockType;
};

const TheoryTakeawayBlock = ({
  block,
}: Props) => {
  return (
    <section className="h-full rounded-3xl border border-blue-100 bg-blue-50/80 p-6">
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
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-100
            text-blue-700
            ring-1
            ring-blue-200

            sm:row-span-2
          "
        >
          <CheckCircle2
            size={22}
            strokeWidth={2.3}
            aria-hidden="true"
          />
        </div>

        <h2
          className="
            min-w-0
            self-center
            break-words
            text-base
            font-extrabold
            leading-6
            text-blue-800

            sm:self-auto
          "
        >
          {block.title ??
            "Key Takeaway"}
        </h2>

        <p
          className="
            col-span-2
            min-w-0
            break-words
            text-sm
            font-semibold
            leading-7
            text-blue-800

            sm:col-span-1
            sm:col-start-2
          "
        >
          {block.body}
        </p>
      </div>
    </section>
  );
};

export default TheoryTakeawayBlock;