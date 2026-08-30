// client/src/features/caseStudy/data/technicalDomainIcons.ts

import type { LucideIcon } from "lucide-react";

import {
  Building2,
  Car,
  Droplets,
  Eye,
  Fan,
  Flame,
  Lightbulb,
  Snowflake,
  Zap,
} from "lucide-react";

import type { TechnicalDomainName } from "../types/caseStudy.types";

const technicalDomainIconMap = {
  Heating: Flame,
  Cooling: Snowflake,
  "Domestic hot water": Droplets,
  Ventilation: Fan,
  Lighting: Lightbulb,
  "Dynamic building envelope": Building2,
  Electricity: Zap,
  "Electric vehicle charging": Car,
  "Monitoring and control": Eye,
} satisfies Record<
  TechnicalDomainName,
  LucideIcon
>;

export const getTechnicalDomainIcon = (
  domain: TechnicalDomainName,
): LucideIcon => {
  return technicalDomainIconMap[domain];
};