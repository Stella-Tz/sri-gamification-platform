// client/src/app/providers/CaseStudyProgressProvider.tsx

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import {
  useCaseStudyProgress as useCaseStudyProgressState,
} from "../../features/caseStudy/hooks/useCaseStudyProgress";

type CaseStudyProgressContextValue =
  ReturnType<
    typeof useCaseStudyProgressState
  >;

const CaseStudyProgressContext =
  createContext<
    CaseStudyProgressContextValue | null
  >(null);

type CaseStudyProgressProviderProps = {
  children:
    ReactNode;
};

export const CaseStudyProgressProvider =
  ({
    children,
  }: CaseStudyProgressProviderProps) => {
    /*
     * This becomes the ONE canonical
     * Case Study progress instance used
     * throughout the protected application.
     */
    const value =
      useCaseStudyProgressState();

    /*
     * Deliberately no full-screen loading UI here.
     *
     * This differs from CourseProgressProvider:
     *
     * - CourseProgressProvider protects the entire
     *   application from rendering before the first
     *   Course hydration.
     *
     * - CaseStudyProgressProvider keeps one shared
     *   Case Study state, but individual destination
     *   pages may still show their own loading state
     *   for sidebar/direct navigation.
     *
     * Button-driven transitions will remain on the
     * current page until their backend action has
     * completed.
     */
    return (
      <CaseStudyProgressContext.Provider
        value={value}
      >
        {children}
      </CaseStudyProgressContext.Provider>
    );
  };

export const useCaseStudyProgress =
  () => {
    const context =
      useContext(
        CaseStudyProgressContext,
      );

    if (!context) {
      throw new Error(
        "useCaseStudyProgress must be used within a CaseStudyProgressProvider.",
      );
    }

    return context;
  };