// client/src/features/theory/components/TheoryStepsGridBlock.tsx

import type {
  TheoryBlockAccent,
  TheoryStepsGridBlock as TheoryStepsGridBlockType,
} from "../types/theory.types";

import { getTheoryIcon } from "./theoryIconMap";

type Props = {
  block: TheoryStepsGridBlockType;
};

const accentStyles: Record<
  TheoryBlockAccent,
  {
    iconWrap: string;
    icon: string;
    number: string;
  }
> = {
  blue: {
    iconWrap: "bg-blue-50 ring-blue-100",
    icon: "text-blue-700",
    number: "bg-blue-600 text-white",
  },
  green: {
    iconWrap:
      "bg-emerald-50 ring-emerald-100",
    icon: "text-emerald-700",
    number: "bg-emerald-600 text-white",
  },
  purple: {
    iconWrap:
      "bg-violet-50 ring-violet-100",
    icon: "text-violet-700",
    number: "bg-violet-600 text-white",
  },
  amber: {
    iconWrap:
      "bg-amber-50 ring-amber-100",
    icon: "text-amber-700",
    number: "bg-amber-600 text-white",
  },
  rose: {
    iconWrap:
      "bg-rose-50 ring-rose-100",
    icon: "text-rose-700",
    number: "bg-rose-600 text-white",
  },
  cyan: {
    iconWrap:
      "bg-cyan-50 ring-cyan-100",
    icon: "text-cyan-700",
    number: "bg-cyan-600 text-white",
  },
};

const TheoryStepsGridBlock = ({
  block,
}: Props) => {
  return (
    <section>
      {block.title ? (
        <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-blue-950">
          {block.title}
        </h2>
      ) : null}

      <ol className="mx-auto grid max-w-5xl gap-x-12 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-20">
        {block.steps.map((step, index) => {
          const Icon = getTheoryIcon(step.icon);
          const accent = step.accent ?? "blue";
          const styles = accentStyles[accent];

          return (
            <li
              key={step.id}
              className="flex min-w-0 flex-col items-center text-center"
            >
              <div
                className={`relative mb-5 flex h-20 w-20 items-center justify-center rounded-full ring-1 ${styles.iconWrap}`}
              >
                <span
                  className={`absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-sm font-extrabold shadow-sm ${styles.number}`}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <Icon
                  className={`h-8 w-8 ${styles.icon}`}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mb-3 max-w-[13rem] text-base font-extrabold leading-snug text-blue-950">
                {step.title}
              </h3>

              <p className="w-full max-w-[16rem] text-left text-sm font-medium leading-6 text-slate-600">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default TheoryStepsGridBlock;
