// client/src/features/theory/components/TheoryTextBlock.tsx

import type { TheoryTextBlock as TheoryTextBlockType } from "../types/theory.types";

type Props = {
  block: TheoryTextBlockType;
};

const TheoryTextBlock = ({ block }: Props) => {
  const paragraphs = block.body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section>
      {block.title ? (
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
          {block.title}
        </h2>
      ) : null}

      <div
        className={
          block.title
            ? "mt-4 space-y-4"
            : "space-y-4"
        }
      >
        {paragraphs.map((paragraph, index) => (
          <p
            key={`${block.id}-paragraph-${index}`}
            className="max-w-5xl text-base font-semibold leading-8 text-slate-600"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default TheoryTextBlock;
