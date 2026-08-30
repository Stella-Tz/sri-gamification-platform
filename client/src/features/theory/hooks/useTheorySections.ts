// client/src/features/theory/hooks/useTheorySections.ts

import { useMemo } from "react";

import { getTheorySections } from "../utils/theoryContent.utils";

export const useTheorySections = () => {
  const sections = useMemo(() => {
    return getTheorySections();
  }, []);

  return {
    sections,
  };
};