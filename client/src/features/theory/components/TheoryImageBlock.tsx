// client/src/features/theory/components/TheoryImageBlock.tsx

import { Info } from "lucide-react";

import type { TheoryImageBlock as TheoryImageBlockType } from "../types/theory.types";

type Props = {
  block: TheoryImageBlockType;
};

const TheoryImageBlock = ({ block }: Props) => {
  const { image } = block;
  const isWide = image.presentation === "wide";

  return (
    <figure className={isWide ? "py-8" : "py-2"}>
      <img
        src={image.src}
        alt={image.alt}
        className={
          isWide
            ? "mx-auto max-h-[520px] w-full max-w-6xl object-contain"
            : "mx-auto max-h-[360px] w-full max-w-5xl object-contain"
        }
      />

      {image.info ? (
        <figcaption
          className={
            isWide
              ? "mx-auto mt-4 flex max-w-6xl items-start gap-2 text-xs font-semibold leading-5 text-slate-500"
              : "mx-auto mt-3 flex max-w-5xl items-start gap-2 text-xs font-semibold leading-5 text-slate-500"
          }
        >
          <Info
            size={14}
            className="mt-0.5 shrink-0 text-blue-500"
            aria-hidden="true"
          />

          <span>{image.info}</span>
        </figcaption>
      ) : null}
    </figure>
  );
};

export default TheoryImageBlock;
