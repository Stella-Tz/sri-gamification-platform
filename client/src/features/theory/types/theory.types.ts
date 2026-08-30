// client/src/features/theory/types/theory.types.ts

export type TheorySectionId = string;
export type TheoryLessonId = string;
export type TheorySourceId = string;
export type TheoryBlockId = string;
export type TheoryImageId = string;

export type TheorySourceType =
  | "eu-regulation"
  | "technical-report"
  | "technical-publication"
  | "practical-guide"
  | "sri2market-material"
  | "other-official-source";

export type TheorySource = {
  id: TheorySourceId;
  title: string;
  shortTitle: string;
  year?: number;
  type: TheorySourceType;
  description?: string;
};

export type TheorySection = {
  id: TheorySectionId;
  order: number;
  title: string;
  shortTitle?: string;
  description: string;
  learningGoal: string;
  lessonIds: readonly TheoryLessonId[];
};

export type TheoryLesson = {
  id: TheoryLessonId;
  sectionId: TheorySectionId;
  order: number;
  title: string;
  question: string;
  blocks: readonly TheoryContentBlock[];
  previousLessonId?: TheoryLessonId | null;
  nextLessonId?: TheoryLessonId | null;
};

export type TheoryContentBlock =
  | TheoryTextBlock
  | TheoryImageBlock
  | TheoryCardsBlock
  | TheoryPathBlock
  | TheoryStepsGridBlock
  | TheoryNoteBlock
  | TheoryTakeawayBlock
  | TheoryServiceBlock;

export type TheoryBaseBlock = {
  id: TheoryBlockId;
  sourceRefs?: readonly TheorySourceId[];
};

export type TheoryTextBlock = TheoryBaseBlock & {
  type: "text";
  title?: string;
  body: string;
};

export type TheoryImageBlock = TheoryBaseBlock & {
  type: "image";
  title?: string;
  image: TheoryImage;
};

export type TheoryImagePresentation = "floating" | "background" | "wide";

export type TheoryImage = {
  id?: TheoryImageId;
  src: string;
  alt: string;
  caption?: string;
  info?: string;
  presentation?: TheoryImagePresentation;
};

export type TheoryBlockAccent =
  | "blue"
  | "green"
  | "purple"
  | "amber"
  | "rose"
  | "cyan";

export type TheoryCardsVariant = "default" | "method" | "compact" | "result"| "impact-details";

export type TheoryCardsBlock = TheoryBaseBlock & {
  type: "cards";
  title?: string;
  caption?: string;
  info?: string;
  variant?: TheoryCardsVariant;
  cards: readonly TheoryCardItem[];
};

export type TheoryCardItem = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  accent?: TheoryBlockAccent;
  eyebrow?: string;
  highlights?: readonly string[];
};

export type TheoryPathBlock = TheoryBaseBlock & {
  type: "path";
  title?: string;
  steps: readonly TheoryPathStep[];
  showArrows?: boolean;
};

export type TheoryPathStep = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  accent?: TheoryBlockAccent;
};

export type TheoryStepsGridBlock = TheoryBaseBlock & {
  type: "stepsGrid";
  title?: string;
  steps: readonly TheoryPathStep[];
};

export type TheoryServiceCatalogue =
  | "catalogue-a"
  | "catalogue-b"
  | "catalogues-a-and-b";

export type TheoryServiceBlock = TheoryBaseBlock & {
  type: "service";

  /**
   * Official SRI service code, e.g. H1a, H2b, H4.
   */
  serviceCode: string;

  /**
   * Official service title.
   */
  title: string;

  /**
   * Short official description of the service scope.
   */
  description?: string;

  /**
   * Official purpose of the service.
   */
  purpose: string;

  /**
   * Optional applicability information.
   */
  applicability?: string;

  /**
   * Catalogue membership.
   */
  catalogue?: TheoryServiceCatalogue;

  /**
   * Functionality levels in ascending order.
   */
  levels: readonly TheoryFunctionalityLevel[];

  /**
   * Optional source information shown below the cards.
   */
  info?: string;
};

export type TheoryFunctionalityLevel = {
  id: string;

  /**
   * Numeric level, normally 0–4.
   */
  level: number;

  /**
   * Official functionality-level title.
   */
  title: string;

  /**
   * Short, source-grounded explanation.
   */
  description: string;

  /**
   * Level illustration.
   */
  image?: TheoryImage;

  /**
   * Only examples explicitly included in official sources.
   */
  examples?: readonly string[];
};

export type TheoryNoteVariant = "info" | "warning";

export type TheoryNoteBlock = TheoryBaseBlock & {
  type: "note";
  title: string;
  body: string;
  variant?: TheoryNoteVariant;
};

export type TheoryTakeawayBlock = TheoryBaseBlock & {
  type: "takeaway";
  title?: string;
  body: string;
};

export type TheoryLessonProgressStatus =
  | "not-started"
  | "in-progress"
  | "completed";

export type TheoryLessonProgress = {
  lessonId: TheoryLessonId;
  status: TheoryLessonProgressStatus;
  completedAt?: string | null;
};

export type TheorySectionProgress = {
  sectionId: TheorySectionId;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
};