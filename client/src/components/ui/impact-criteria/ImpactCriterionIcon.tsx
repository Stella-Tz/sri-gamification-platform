// src/components/ui/impact-criteria/ImpactCriterionIcon.tsx

import type { LucideProps } from "lucide-react";

import type { ImpactCriterionName } from "../../../types/sri.types";
import { getImpactCriterionIcon } from "./impactCriterionIcons";

type Props = LucideProps & {
  criterion: ImpactCriterionName;
};

const ImpactCriterionIcon = ({
  criterion,
  "aria-hidden": ariaHidden = true,
  ...iconProps
}: Props) => {
  const Icon = getImpactCriterionIcon(criterion);

  return <Icon aria-hidden={ariaHidden} {...iconProps} />;
};

export default ImpactCriterionIcon;