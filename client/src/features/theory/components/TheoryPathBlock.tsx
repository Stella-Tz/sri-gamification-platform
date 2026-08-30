// client/src/features/theory/components/TheoryPathBlock.tsx

import { ArrowRight } from "lucide-react";

import type {
  TheoryBlockAccent,
  TheoryPathBlock as TheoryPathBlockType,
} from "../types/theory.types";

import { getTheoryIcon } from "./theoryIconMap";

type Props = {
  block: TheoryPathBlockType;
};

const accentStyles: Record<
  TheoryBlockAccent,
  {
    iconWrap: string;
    icon: string;
  }
> = {
  blue: {
    iconWrap:
      "bg-blue-50 text-blue-700 ring-blue-100",
    icon: "text-blue-700",
  },
  green: {
    iconWrap:
      "bg-emerald-50 text-emerald-700 ring-emerald-100",
    icon: "text-emerald-700",
  },
  purple: {
    iconWrap:
      "bg-violet-50 text-violet-700 ring-violet-100",
    icon: "text-violet-700",
  },
  amber: {
    iconWrap:
      "bg-amber-50 text-amber-700 ring-amber-100",
    icon: "text-amber-700",
  },
  rose: {
    iconWrap:
      "bg-rose-50 text-rose-700 ring-rose-100",
    icon: "text-rose-700",
  },
  cyan: {
    iconWrap:
      "bg-cyan-50 text-cyan-700 ring-cyan-100",
    icon: "text-cyan-700",
  },
};

const getPathGridClasses = (
  stepCount: number,
) => {
  switch (stepCount) {
    case 1:
      return "lg:grid-cols-1 lg:max-w-[11rem]";

    case 2:
      return "lg:grid-cols-2 lg:max-w-[24rem]";

    case 3:
      return "lg:grid-cols-3 lg:max-w-[37rem]";

    case 4:
      return "lg:grid-cols-4 lg:max-w-[50rem]";

    case 5:
      return "lg:grid-cols-5 lg:max-w-[63rem]";

    case 6:
      return "lg:grid-cols-3 lg:max-w-[37rem] xl:grid-cols-6 xl:max-w-[76rem]";

    default:
      return "lg:grid-cols-4 lg:max-w-[50rem]";
  }
};

const TheoryPathBlock = ({ block }: Props) => {
  const showArrows = block.showArrows ?? true;
  const stepCount = block.steps.length;

  const pathGridClasses =
    getPathGridClasses(stepCount);

  const arrowGridTemplate =
    stepCount > 1
      ? `repeat(${stepCount - 1}, minmax(0, 1fr) auto) minmax(0, 1fr)`
      : "minmax(0, 1fr)";

  return (
    <section>
      {block.title ? (
        <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-blue-950">
          {block.title}
        </h2>
      ) : null}

      {showArrows ? (
        <div
          className="flex flex-col gap-8 lg:grid lg:items-start lg:gap-x-5"
          style={{
            gridTemplateColumns:
              arrowGridTemplate,
          }}
        >
          {block.steps.map((step, index) => {
            const Icon = getTheoryIcon(step.icon);
            const accent = step.accent ?? "blue";
            const styles = accentStyles[accent];
            const isLast =
              index === stepCount - 1;

            return (
              <div
                key={step.id}
                className="contents"
              >
                <article className="flex min-w-0 flex-col items-center text-center">
                  <div
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ring-1 ${styles.iconWrap}`}
                  >
                    <Icon
                      className={`h-9 w-9 ${styles.icon}`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-4 max-w-[12rem] text-sm font-extrabold leading-5 text-blue-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-[12rem] text-xs font-medium leading-5 text-slate-600">
                    {step.description}
                  </p>
                </article>

                {!isLast ? (
                  <div className="hidden items-center justify-center pt-7 lg:flex">
                    <ArrowRight
                      className="h-6 w-6 text-slate-300"
                      aria-hidden="true"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className={`mx-auto flex w-full flex-wrap justify-center gap-x-10 gap-y-10 px-2 sm:px-4 lg:grid lg:gap-x-8 lg:gap-y-10 lg:px-0 ${pathGridClasses}`}
        >
          {block.steps.map((step) => {
            const Icon = getTheoryIcon(step.icon);
            const accent = step.accent ?? "blue";
            const styles = accentStyles[accent];

            return (
              <article
                key={step.id}
                className="flex w-44 shrink-0 flex-col items-center text-center lg:w-full lg:min-w-0 lg:max-w-[11rem] lg:justify-self-center"
              >
                <div
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ring-1 ${styles.iconWrap}`}
                >
                  <Icon
                    className={`h-9 w-9 ${styles.icon}`}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-4 w-full text-sm font-extrabold leading-5 text-blue-950">
                  {step.title}
                </h3>

                <p className="mt-2 w-full text-xs font-medium leading-5 text-slate-600">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TheoryPathBlock;
