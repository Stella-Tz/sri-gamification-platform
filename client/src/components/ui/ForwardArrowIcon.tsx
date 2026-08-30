// client/src/components/ui/ForwardArrowIcon.tsx

import { ArrowRight } from "lucide-react";

type ForwardArrowIconProps = {
  size?: number;
  className?: string;
};

const ForwardArrowIcon = ({
  size = 18,
  className = "",
}: ForwardArrowIconProps) => {
  return (
    <ArrowRight
      size={size}
      aria-hidden="true"
      className={`
        shrink-0
        transition-transform
        duration-200
        group-hover:translate-x-1
        group-focus-visible:translate-x-1
        motion-reduce:transform-none
        motion-reduce:transition-none
        ${className}
      `}
    />
  );
};

export default ForwardArrowIcon;
