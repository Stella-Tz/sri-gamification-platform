// client/src/features/theory/components/theoryIconMap.ts

import {
  AirVent,
  BatteryCharging,
  BookOpen,
  Calculator,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleHelp,
  CircleSlash2,
  ClipboardList,
  Cylinder,
  Flame,
  Gauge,
  Layers3,
  Link2,
  ListChecks,
  ListOrdered,
  Network,
  PlugZap,
  Radar,
  RefreshCw,
  Route,
  Scale,
  SlidersHorizontal,
  Smartphone,
  Snowflake,
  Sparkles,
  Sun,
  SunDim,
  Thermometer,
  Timer,
  ToggleRight,
  TriangleAlert,
  UtilityPole,
  Users,
  Wind,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const theoryIconMap = {
  AirVent,
  BatteryCharging,
  BookOpen,
  Calculator,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleHelp,
  CircleSlash2,
  ClipboardList,
  Cylinder,
  Flame,
  Gauge,
  Layers3,
  Link2,
  ListChecks,
  ListOrdered,
  Network,
  PlugZap,
  Radar,
  RefreshCw,
  Route,
  Scale,
  SlidersHorizontal,
  Smartphone,
  Snowflake,
  Sparkles,
  Sun,
  SunDim,
  Thermometer,
  Timer,
  ToggleRight,
  TriangleAlert,
  UtilityPole,
  Users,
  Wind,
  Workflow,
  Zap,
} satisfies Record<string, LucideIcon>;

export type TheoryIconName =
  keyof typeof theoryIconMap;

export const isTheoryIconName = (
  iconName: string,
): iconName is TheoryIconName => {
  return Object.prototype.hasOwnProperty.call(
    theoryIconMap,
    iconName,
  );
};

export const getTheoryIcon = (
  iconName?: string,
): LucideIcon => {
  if (!iconName) {
    return CircleHelp;
  }

  if (isTheoryIconName(iconName)) {
    return theoryIconMap[iconName];
  }

  if (import.meta.env.DEV) {
    console.warn(
      `Unknown theory icon: ${iconName}`,
    );
  }

  return CircleHelp;
};