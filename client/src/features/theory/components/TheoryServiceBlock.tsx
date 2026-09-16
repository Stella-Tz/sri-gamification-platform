// client/src/features/theory/components/TheoryServiceBlock.tsx

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefCallback,
} from "react";

import {
  BookOpen,
  Info,
} from "lucide-react";

import type {
  TheoryFunctionalityLevel,
  TheoryServiceBlock as TheoryServiceBlockType,
  TheoryServiceCatalogue,
} from "../types/theory.types";

type Props = {
  block: TheoryServiceBlockType;
};

const catalogueLabels: Record<
  TheoryServiceCatalogue,
  string
> = {
  "catalogue-a": "Catalogue A",
  "catalogue-b": "Catalogue B",
  "catalogues-a-and-b": "Catalogues A and B",
};

const TheoryServiceBlock = ({ block }: Props) => {
  return (
    <section className="border-t border-slate-200 pt-8 first:border-t-0 first:pt-0">
      <ServiceHeader block={block} />

      <FunctionalityLevelsGrid
        levels={block.levels}
      />

      {block.info ? (
        <div className="mt-6 flex items-start gap-2 text-xs font-semibold leading-5 text-slate-500">
          <Info
            size={14}
            className="mt-0.5 shrink-0 text-blue-500"
            aria-hidden="true"
          />

          <span>{block.info}</span>
        </div>
      ) : null}
    </section>
  );
};

type ServiceHeaderProps = {
  block: TheoryServiceBlockType;
};

const ServiceHeader = ({
  block,
}: ServiceHeaderProps) => {
  return (
    <header>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 max-w-4xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
          SRI Service ·{" "}
          <span className="normal-case tracking-normal">{block.serviceCode}</span>
        </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-blue-950">
            {block.title}
          </h2>

          {block.description ? (
            <p className="mt-3 max-w-4xl text-base font-semibold leading-8 text-slate-600">
              {block.description}
            </p>
          ) : null}
        </div>

        {block.catalogue ? (
          <span className="inline-flex w-fit shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700">
            {catalogueLabels[block.catalogue]}
          </span>
        ) : null}
      </div>

      {block.applicability ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Applicability
          </p>

          <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
            {block.applicability}
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
          <BookOpen
            size={20}
            strokeWidth={2.3}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
            Service Purpose
          </p>

          <p className="mt-1 max-w-4xl text-sm font-semibold leading-7 text-blue-900">
            {block.purpose}
          </p>
        </div>
      </div>
    </header>
  );
};

type FunctionalityLevelsGridProps = {
  levels: readonly TheoryFunctionalityLevel[];
};

const FunctionalityLevelsGrid = ({
  levels,
}: FunctionalityLevelsGridProps) => {
  const gridRef = useRef<HTMLDivElement | null>(
    null,
  );

  const cardRefs = useRef<
    (HTMLElement | null)[]
  >([]);

  const descriptionRefs = useRef<
    (HTMLDivElement | null)[]
  >([]);

  const [descriptionHeights, setDescriptionHeights] =
    useState<Record<number, number>>({});

  const calculateDescriptionHeights = useCallback(() => {
    const descriptions = descriptionRefs.current.filter(
      (description): description is HTMLDivElement =>
        description !== null,
    );

    // Temporarily remove previously calculated min-heights
    // so that the intrinsic content height can be measured.
    const previousMinHeights = descriptions.map(
      (description) => description.style.minHeight,
    );

    descriptions.forEach((description) => {
      description.style.minHeight = "0px";
    });

    // Force the browser to recalculate layout before measuring.
    void gridRef.current?.offsetHeight;

    const rows = new Map<
      number,
      {
        indexes: number[];
        maximumHeight: number;
      }
    >();

    cardRefs.current.forEach((card, index) => {
      const description = descriptionRefs.current[index];

      if (!card || !description) {
        return;
      }

      const rowTop = Math.round(card.offsetTop);
      const descriptionHeight = description.scrollHeight;

      const row = rows.get(rowTop);

      if (row) {
        row.indexes.push(index);
        row.maximumHeight = Math.max(
          row.maximumHeight,
          descriptionHeight,
        );
      } else {
        rows.set(rowTop, {
          indexes: [index],
          maximumHeight: descriptionHeight,
        });
      }
    });

    // Restore the current DOM styles until React applies
    // the newly calculated values.
    descriptions.forEach((description, index) => {
      description.style.minHeight =
        previousMinHeights[index];
    });

    const nextHeights: Record<number, number> = {};

    rows.forEach(({ indexes, maximumHeight }) => {
      indexes.forEach((index) => {
        nextHeights[index] = maximumHeight;
      });
    });

    setDescriptionHeights(nextHeights);
  }, []);

  useEffect(() => {
    calculateDescriptionHeights();

    const resizeObserver = new ResizeObserver(
      calculateDescriptionHeights,
    );

    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateDescriptionHeights, levels]);

  const registerCard =
    (index: number): RefCallback<HTMLElement> =>
    (element) => {
      cardRefs.current[index] = element;
    };

  const registerDescription =
    (
      index: number,
    ): RefCallback<HTMLDivElement> =>
    (element) => {
      descriptionRefs.current[index] = element;
    };

  return (
    <div
      ref={gridRef}
      className="mt-7 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      {levels.map((level, index) => (
        <FunctionalityLevelCard
          key={level.id}
          level={level}
          cardRef={registerCard(index)}
          descriptionRef={registerDescription(
            index,
          )}
          descriptionHeight={
            descriptionHeights[index]
          }
        />
      ))}
    </div>
  );
};

type FunctionalityLevelCardProps = {
  level: TheoryFunctionalityLevel;
  cardRef: RefCallback<HTMLElement>;
  descriptionRef: RefCallback<HTMLDivElement>;
  descriptionHeight?: number;
};

const FunctionalityLevelCard = ({
  level,
  cardRef,
  descriptionRef,
  descriptionHeight,
}: FunctionalityLevelCardProps) => {
  return (
    <article
      ref={cardRef}
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
    >
      <LevelImage level={level} />

      <div className="flex min-h-[88px] flex-col items-center justify-center bg-blue-600 px-5 py-3.5 text-center text-white">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-100">
          Level {level.level}
        </p>

        <h3 className="mt-1 text-base font-extrabold leading-5 text-white">
          {level.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col px-6 py-6">
        <div
          ref={descriptionRef}
          style={
            descriptionHeight
              ? {
                  minHeight: `${descriptionHeight}px`,
                }
              : undefined
          }
        >
          <p className="text-sm font-semibold leading-7 text-slate-700">
            {level.description}
          </p>
        </div>

        {level.examples?.length ? (
          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
              Examples
            </p>

            <ul className="mt-3 space-y-2.5">
              {level.examples.map((example) => (
                <li
                  key={example}
                  className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-600"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                    aria-hidden="true"
                  />

                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
};

type LevelImageProps = {
  level: TheoryFunctionalityLevel;
};

const LevelImage = ({
  level,
}: LevelImageProps) => {
  if (!level.image) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center bg-slate-100">
        <BookOpen
          className="h-12 w-12 text-slate-300"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
      <img
        src={level.image.src}
        alt={level.image.alt}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default TheoryServiceBlock;
