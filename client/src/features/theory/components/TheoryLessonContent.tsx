// client/src/features/theory/components/TheoryLessonContent.tsx

import type {
  TheoryContentBlock,
  TheoryLesson,
} from "../types/theory.types";

import TheoryContentBlockComponent from "./TheoryContentBlock";

type Props = {
  lesson: TheoryLesson;
  sectionTitle?: string;
  sectionOrder?: number;
};

const TheoryLessonContent = ({
  lesson,
  sectionTitle,
  sectionOrder,
}: Props) => {
  const sectionLabel =
    sectionOrder !== undefined
      ? `Section ${sectionOrder} · ${sectionTitle ?? "Theory"}`
      : sectionTitle ?? "Theory";

  return (
    <article>
      <header className="mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
          {sectionLabel}
        </p>

        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-blue-800 md:text-4xl">
          {lesson.title}
        </h1>

        <div
          className="mt-3 h-1 w-12 rounded-full bg-blue-800"
          aria-hidden="true"
        />

        <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-600">
          {lesson.question}
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-7">
        <div className="space-y-8">
          {renderLessonBlocks(lesson.blocks)}
        </div>
      </section>
    </article>
  );
};

const renderLessonBlocks = (
  blocks: readonly TheoryContentBlock[],
) => {
  const renderedBlocks = [];

  for (
    let index = 0;
    index < blocks.length;
    index += 1
  ) {
    const currentBlock = blocks[index];
    const nextBlock = blocks[index + 1];

    const shouldGroupHighlightCards =
      currentBlock.type === "note" &&
      nextBlock?.type === "takeaway";

    if (shouldGroupHighlightCards) {
      renderedBlocks.push(
        <div
          key={`${currentBlock.id}-${nextBlock.id}`}
          className="grid gap-5 lg:grid-cols-2"
        >
          <TheoryContentBlockComponent
            block={currentBlock}
          />

          <TheoryContentBlockComponent
            block={nextBlock}
          />
        </div>,
      );

      index += 1;
      continue;
    }

    renderedBlocks.push(
      <TheoryContentBlockComponent
        key={currentBlock.id}
        block={currentBlock}
      />,
    );
  }

  return renderedBlocks;
};

export default TheoryLessonContent;
