import type { ReactNode } from "react";
import {
  Link,
  type LinkProps,
} from "react-router-dom";

type PrimaryLinkSize =
  | "default"
  | "large";

type PrimaryLinkProps = LinkProps & {
  children: ReactNode;
  size?: PrimaryLinkSize;
  className?: string;
};

const sizeClasses: Record<
  PrimaryLinkSize,
  string
> = {
  default: "px-5 py-3 text-sm",
  large: "px-6 py-4 text-base",
};

const PrimaryLink = ({
  children,
  className = "",
  size = "default",
  ...props
}: PrimaryLinkProps) => {
  return (
    <Link
      {...props}
      className={`
        inline-flex
        min-h-11
        items-center
        justify-center
        rounded-xl
        bg-blue-600
        font-extrabold
        text-white
        shadow-sm
        transition-colors
        duration-200
        hover:bg-blue-700
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-blue-100
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;