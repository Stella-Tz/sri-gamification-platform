// client/src/features/theory/components/TheoryCardsBlock.tsx

import ImpactCriterionIcon from "../../../components/ui/impact-criteria/ImpactCriterionIcon";
import { impactCriterionIconMap } from "../../../components/ui/impact-criteria/impactCriterionIcons";

import type {
  TheoryBlockAccent,
  TheoryCardsBlock as TheoryCardsBlockType,
} from "../types/theory.types";

import { getTheoryIcon } from "./theoryIconMap";

type Props = {
  block: TheoryCardsBlockType;
};

type ImpactCriterionName =
  keyof typeof impactCriterionIconMap;

const isImpactCriterionName = (
  value: string,
): value is ImpactCriterionName => {
  return Object.prototype.hasOwnProperty.call(
    impactCriterionIconMap,
    value,
  );
};

const getImpactCriterionName = (
  value: string,
): ImpactCriterionName | null => {
  if (isImpactCriterionName(value)) {
    return value;
  }

  if (import.meta.env.DEV) {
    console.warn(
      `Unknown impact criterion: ${value}`,
    );
  }

  return null;
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

const methodCardStyles: Record<
  TheoryBlockAccent,
  {
    card: string;
    iconWrap: string;
    icon: string;
    title: string;
    eyebrow: string;
    description: string;
  }
> = {
  blue: {
    card: "border-blue-100 bg-blue-50/20",
    iconWrap: "bg-blue-50 ring-blue-100",
    icon: "text-blue-600",
    title: "text-blue-950",
    eyebrow: "text-blue-700",
    description: "text-slate-600",
  },
  green: {
    card:
      "border-emerald-100 bg-emerald-50/20",
    iconWrap:
      "bg-emerald-50 ring-emerald-100",
    icon: "text-emerald-700",
    title: "text-emerald-950",
    eyebrow: "text-emerald-700",
    description: "text-slate-600",
  },
  purple: {
    card: "border-violet-100 bg-violet-50/20",
    iconWrap:
      "bg-violet-50 ring-violet-100",
    icon: "text-violet-700",
    title: "text-violet-950",
    eyebrow: "text-violet-700",
    description: "text-slate-600",
  },
  amber: {
    card: "border-amber-100 bg-amber-50/20",
    iconWrap: "bg-amber-50 ring-amber-100",
    icon: "text-amber-700",
    title: "text-amber-950",
    eyebrow: "text-amber-700",
    description: "text-slate-600",
  },
  rose: {
    card: "border-rose-100 bg-rose-50/20",
    iconWrap: "bg-rose-50 ring-rose-100",
    icon: "text-rose-700",
    title: "text-rose-950",
    eyebrow: "text-rose-700",
    description: "text-slate-600",
  },
  cyan: {
    card: "border-cyan-100 bg-cyan-50/20",
    iconWrap: "bg-cyan-50 ring-cyan-100",
    icon: "text-cyan-700",
    title: "text-cyan-950",
    eyebrow: "text-cyan-700",
    description: "text-slate-600",
  },
};

const defaultAccentOrder:
  readonly TheoryBlockAccent[] = [
    "blue",
    "green",
    "purple",
    "amber",
    "cyan",
    "rose",
  ];

const TheoryCardsBlock = ({ block }: Props) => {
  if (block.variant === "method") {
    return <MethodCardsBlock block={block} />;
  }

  if (block.variant === "impact-details") {
    return <ImpactDetailsCardsBlock block={block} />;
  }

  return <DefaultCardsBlock block={block} />;
};

const MethodCardsBlock = ({ block }: Props) => {
  return (
    <section>
      <div className="grid gap-5 md:grid-cols-2">
        {block.cards.map((card, index) => {
          const accent =
            card.accent ??
            defaultAccentOrder[
              index % defaultAccentOrder.length
            ];

          const styles = methodCardStyles[accent];
          const Icon = getTheoryIcon(
            card.icon ?? "ClipboardList",
          );

          return (
            <article
              key={card.id}
              className={`rounded-2xl border px-5 py-4 shadow-sm ${styles.card}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-1 ${styles.iconWrap}`}
                >
                  <Icon
                    className={`h-7 w-7 ${styles.icon}`}
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <h3
                    className={`text-sm font-extrabold leading-5 ${styles.title}`}
                  >
                    {card.title}
                  </h3>

                  {card.eyebrow ? (
                    <p
                      className={`mt-1 text-xs font-extrabold uppercase leading-4 tracking-[0.16em] ${styles.eyebrow}`}
                    >
                      {card.eyebrow}
                    </p>
                  ) : null}

                  {card.description ? (
                    <p
                      className={`mt-1 max-w-[18rem] text-xs font-semibold leading-5 ${styles.description}`}
                    >
                      {card.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

const ImpactDetailsCardsBlock = ({
  block,
}: Props) => {
  return (
    <section>
      {block.title ? (
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
          {block.title}
        </h2>
      ) : null}

      {block.caption ? (
        <p className="mt-4 max-w-5xl text-base font-semibold leading-8 text-slate-600">
          {block.caption}
        </p>
      ) : null}

      <div className="mt-10 grid gap-x-12 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
        {block.cards.map((card, index) => {
          const accent =
            card.accent ??
            defaultAccentOrder[
              index % defaultAccentOrder.length
            ];

          const styles = accentStyles[accent];
          const impactCriterion =
            getImpactCriterionName(card.title);
          const FallbackIcon = getTheoryIcon();

          return (
            <article
              key={card.id}
              className="text-center"
            >
              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ring-1 ${styles.iconWrap}`}
              >
                {impactCriterion ? (
                  <ImpactCriterionIcon
                    criterion={impactCriterion}
                    className={`h-10 w-10 ${styles.icon}`}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                ) : (
                  <FallbackIcon
                    className={`h-10 w-10 ${styles.icon}`}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                )}
              </div>

              <h3 className="mt-5 text-base font-extrabold leading-6 text-blue-950">
                {card.title}
              </h3>

              {card.description ? (
                <p className="mx-auto mt-4 max-w-xs text-left text-sm font-medium leading-7 text-slate-600">
                  {card.description}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>

      {block.info ? (
        <p className="mt-8 text-xs font-semibold leading-5 text-slate-500">
          {block.info}
        </p>
      ) : null}
    </section>
  );
};

const DefaultCardsBlock = ({ block }: Props) => {
  const columnsClass =
    block.cards.length <= 2
      ? "md:grid-cols-2"
      : block.cards.length === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6">
      {block.title ? (
        <h2 className="text-xl font-extrabold text-blue-950">
          {block.title}
        </h2>
      ) : null}

      {block.caption ? (
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
          {block.caption}
        </p>
      ) : null}

      <div
        className={`mt-5 grid gap-4 ${columnsClass}`}
      >
        {block.cards.map((card, index) => {
          const accent =
            card.accent ??
            defaultAccentOrder[
              index % defaultAccentOrder.length
            ];

          const styles = accentStyles[accent];

          const Icon = card.icon
            ? getTheoryIcon(card.icon)
            : getFallbackIcon(
                block.cards.length,
                card.description,
              );

          const isSmallCard = !card.description;

          return (
            <article
              key={card.id}
              className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${
                isSmallCard ? "text-center" : ""
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ring-1 ${
                  isSmallCard ? "mx-auto" : ""
                } ${styles.iconWrap}`}
              >
                <Icon
                  className={`h-6 w-6 ${styles.icon}`}
                  strokeWidth={2.3}
                  aria-hidden="true"
                />
              </div>

              <h3
                className={`mt-4 font-extrabold text-blue-950 ${
                  isSmallCard
                    ? "text-lg"
                    : "text-base"
                }`}
              >
                {card.title}
              </h3>

              {card.description ? (
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {card.description}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>

      {block.info ? (
        <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
          {block.info}
        </p>
      ) : null}
    </section>
  );
};

const getFallbackIcon = (
  totalCards: number,
  description?: string,
) => {
  if (totalCards >= 6 && !description) {
    return getTheoryIcon("CheckCircle2");
  }

  if (!description) {
    return getTheoryIcon("Sparkles");
  }

  return getTheoryIcon("BookOpen");
};

export default TheoryCardsBlock;
