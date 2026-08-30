// src/components/ui/impact-criteria/impactCriterionIcons.ts

import {
  Armchair,
  HeartPulse,
  MousePointerClick,
  Network,
  Smartphone,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { ImpactCriterionName } from "../../../types/sri.types";

export const impactCriterionIconMap = {
  "Energy efficiency": Zap,
  "Energy flexibility and storage": Network,
  Comfort: Armchair,
  Convenience: MousePointerClick,
  "Health, well-being and accessibility": HeartPulse,
  "Maintenance and fault prediction": Wrench,
  "Information to occupants": Smartphone,
} satisfies Record<ImpactCriterionName, LucideIcon>;

export const getImpactCriterionIcon = (
  criterion: ImpactCriterionName,
): LucideIcon => {
  return impactCriterionIconMap[criterion];
};