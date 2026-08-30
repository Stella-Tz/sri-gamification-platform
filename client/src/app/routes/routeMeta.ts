//client\src\app\routes\routeMeta.ts
import { ROUTES } from "../../constants/routes";

export const routeMeta: Record<string, { topbarTitle: string }> = {
  [ROUTES.dashboard]: { topbarTitle: "Dashboard" },
  [ROUTES.courses]: { topbarTitle: "Learning Platform" },
  [ROUTES.caseStudy]: { topbarTitle: "Practical Assessment" },
  [ROUTES.theory]: { topbarTitle: "Theory" },
  [ROUTES.glossary]: { topbarTitle: "Glossary" },
};