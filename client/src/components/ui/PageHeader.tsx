// client/src/components/ui/PageHeader.tsx

import type { ReactNode } from "react";

type PageHeaderProps = {
  title: ReactNode;
  subtitle?: string;
};

const PageHeader = ({
  title,
  subtitle,
}: PageHeaderProps) => {
  return (
    <header>
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h1>

      {subtitle ? (
        <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
};

export default PageHeader;