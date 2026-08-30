// client/src/features/glossary/types/glossary.types.ts

export type GlossarySource = {
  label: string;
  reference?: string;
};

export type GlossaryEntry = {
  id: string;
  acronym: string;
  term: string;

  /**
   * Used only for internal traceability.
   * It is not displayed on the glossary page.
   */
  source?: GlossarySource;
};