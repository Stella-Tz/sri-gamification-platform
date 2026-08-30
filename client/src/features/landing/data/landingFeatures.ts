// client/src/features/landing/data/landingFeatures.ts

import {
  BookOpen,
  Building2,
  ClipboardCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type LandingFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "blue" | "violet";
};

export const landingFeatures: LandingFeature[] = [
  {
    id: "learn-sri",
    title: "Master the SRI",
    description:
      "Understand what smart readiness means and how it is assessed in buildings.",
    icon: BookOpen,
    accent: "blue",
  },
  {
    id: "interactive-quizzes",
    title: "Interactive Quizzes",
    description:
      "Check your understanding through short quizzes as you progress through the course.",
    icon: ClipboardCheck,
    accent: "violet",
  },
  {
    id: "guided-case-study",
    title: "Guided Case Study",
    description:
      "Apply what you have learned through a guided building assessment.",
    icon: Building2,
    accent: "blue",
  },
  {
    id: "track-progress",
    title: "Track Your Progress",
    description:
      "See what you have completed, review your results and continue from where you left off.",
    icon: TrendingUp,
    accent: "violet",
  },
];