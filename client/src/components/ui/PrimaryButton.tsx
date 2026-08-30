// client/src/components/ui/PrimaryButton.tsx

import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type PrimaryButtonSize =
  | "default"
  | "large";

type PrimaryButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    size?: PrimaryButtonSize;
  };

const sizeClasses: Record<
  PrimaryButtonSize,
  string
> = {
  default: "px-5 py-3",
  large: "px-7 py-3",
};

const PrimaryButton = ({
  children,
  className = "",
  type = "button",
  size = "default",
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      className={`
        inline-flex
        min-h-11
        items-center
        justify-center
        rounded-xl
        bg-blue-600
        text-sm
        font-extrabold
        text-white
        shadow-sm
        transition-colors
        duration-200
        hover:bg-blue-700
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-blue-100
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;