// client/src/features/theory/components/TheoryContentBlock.tsx

import type { TheoryContentBlock as TheoryContentBlockType } from "../types/theory.types";

import TheoryCardsBlock from "./TheoryCardsBlock";
import TheoryImageBlock from "./TheoryImageBlock";
import TheoryNoteBlock from "./TheoryNoteBlock";
import TheoryPathBlock from "./TheoryPathBlock";
import TheoryServiceBlock from "./TheoryServiceBlock";
import TheoryStepsGridBlock from "./TheoryStepsGridBlock";
import TheoryTakeawayBlock from "./TheoryTakeawayBlock";
import TheoryTextBlock from "./TheoryTextBlock";

type Props = {
  block: TheoryContentBlockType | null | undefined;
};

const TheoryContentBlock = ({ block }: Props) => {
  if (!block) {
    console.error(
      "TheoryContentBlock received an undefined or null block. Check the lesson blocks array and imported service blocks.",
    );

    return null;
  }

  switch (block.type) {
    case "text":
      return <TheoryTextBlock block={block} />;

    case "image":
      return <TheoryImageBlock block={block} />;

    case "cards":
      return <TheoryCardsBlock block={block} />;

    case "path":
      return <TheoryPathBlock block={block} />;

    case "stepsGrid":
      return <TheoryStepsGridBlock block={block} />;

    case "note":
      return <TheoryNoteBlock block={block} />;

    case "takeaway":
      return <TheoryTakeawayBlock block={block} />;

    case "service":
      return <TheoryServiceBlock block={block} />;

    default: {
      const unsupportedBlock: never = block;

      console.error(
        "Unsupported theory block type:",
        unsupportedBlock,
      );

      return null;
    }
  }
};

export default TheoryContentBlock;
