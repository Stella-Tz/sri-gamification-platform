// client/src/features/caseStudy/components/layout/DomainSidebar.tsx

import { domainIcons } from "../../data/domainIcons";

import type { TechnicalDomainName } from "../../types/caseStudy.types";

type ExcludedDomain = {
  domain: TechnicalDomainName;
  reason: string;
};

type DomainSidebarVariant =
  | "desktop"
  | "mobile";

type DomainSidebarProps = {
  domains: readonly TechnicalDomainName[];
  selectedDomain: TechnicalDomainName | "";

  completedByDomain: Record<
    TechnicalDomainName,
    number
  >;

  totalByDomain: Record<
    TechnicalDomainName,
    number
  >;

  onSelectDomain: (
    domain: TechnicalDomainName,
  ) => void;

  excludedDomains?: readonly ExcludedDomain[];
  variant?: DomainSidebarVariant;
};

const DomainSidebar = ({
  domains,
  selectedDomain,
  completedByDomain,
  totalByDomain,
  onSelectDomain,
  excludedDomains = [],
  variant = "desktop",
}: DomainSidebarProps) => {
  if (variant === "mobile") {
    return (
      <MobileDomainNavigation
        domains={domains}
        selectedDomain={selectedDomain}
        completedByDomain={completedByDomain}
        totalByDomain={totalByDomain}
        onSelectDomain={onSelectDomain}
        excludedDomains={excludedDomains}
      />
    );
  }

  return (
    <DesktopDomainSidebar
      domains={domains}
      selectedDomain={selectedDomain}
      completedByDomain={completedByDomain}
      totalByDomain={totalByDomain}
      onSelectDomain={onSelectDomain}
      excludedDomains={excludedDomains}
    />
  );
};

type DomainNavigationContentProps = Omit<
  DomainSidebarProps,
  "variant"
>;

const DesktopDomainSidebar = ({
  domains,
  selectedDomain,
  completedByDomain,
  totalByDomain,
  onSelectDomain,
  excludedDomains = [],
}: DomainNavigationContentProps) => {
  return (
    <aside
      className="
        hidden
        h-full
        min-h-0
        w-[280px]
        shrink-0
        flex-col
        overflow-hidden
        border-r
        border-slate-200
        bg-white
        px-3
        py-4
        lg:flex
      "
    >
      <p className="px-1 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
        Present Domains
      </p>

      <nav
        aria-label="Technical domains"
        className="mt-4"
      >
        <DomainList
          domains={domains}
          selectedDomain={selectedDomain}
          completedByDomain={
            completedByDomain
          }
          totalByDomain={totalByDomain}
          onSelectDomain={onSelectDomain}
          layout="desktop"
        />
      </nav>

      {excludedDomains.length > 0 ? (
        <ExcludedDomainsSection
          excludedDomains={excludedDomains}
        />
      ) : null}
    </aside>
  );
};

const MobileDomainNavigation = ({
  domains,
  selectedDomain,
  completedByDomain,
  totalByDomain,
  onSelectDomain,
  excludedDomains = [],
}: DomainNavigationContentProps) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
        Present Domains
      </p>

      <nav
        aria-label="Technical domains"
        className="mt-3 min-w-0 max-w-full"
      >
        <DomainList
          domains={domains}
          selectedDomain={selectedDomain}
          completedByDomain={
            completedByDomain
          }
          totalByDomain={totalByDomain}
          onSelectDomain={onSelectDomain}
          layout="mobile"
        />
      </nav>

      {excludedDomains.length > 0 ? (
        <ExcludedDomainsSection
          excludedDomains={excludedDomains}
          compact
        />
      ) : null}
    </section>
  );
};

type DomainListProps = {
  domains: readonly TechnicalDomainName[];
  selectedDomain: TechnicalDomainName | "";

  completedByDomain: Record<
    TechnicalDomainName,
    number
  >;

  totalByDomain: Record<
    TechnicalDomainName,
    number
  >;

  onSelectDomain: (
    domain: TechnicalDomainName,
  ) => void;

  layout: DomainSidebarVariant;
};

const DomainList = ({
  domains,
  selectedDomain,
  completedByDomain,
  totalByDomain,
  onSelectDomain,
  layout,
}: DomainListProps) => {
  const isMobile =
    layout === "mobile";

  return (
    <ul
      style={
        isMobile
          ? {
              contain:
                "layout paint",
            }
          : undefined
      }
      className={
        isMobile
          ? "flex w-full min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1"
          : "space-y-1"
      }
    >
      {domains.map((domain) => {
        const isSelected =
          selectedDomain === domain;

        const completed =
          completedByDomain[domain] ?? 0;

        const total =
          totalByDomain[domain] ?? 0;

        return (
          <li
            key={domain}
            className={
              isMobile
                ? "shrink-0"
                : undefined
            }
          >
            <button
              type="button"
              onClick={() =>
                onSelectDomain(domain)
              }
              aria-pressed={isSelected}
              className={
                isMobile
                  ? `flex min-h-11 min-w-[184px] items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      isSelected
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50"
                    }`
                  : `flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      isSelected
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
              }
            >
              <img
                src={domainIcons[domain]}
                alt=""
                aria-hidden="true"
                className="h-5 w-5 shrink-0 object-contain"
              />

              <span className="min-w-0 flex-1 text-sm font-extrabold">
                {domain}
              </span>

              <span className="shrink-0 text-xs font-extrabold text-slate-400">
                <span aria-hidden="true">
                  {completed}/{total}
                </span>

                <span className="sr-only">
                  {completed} of {total} completed
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

type ExcludedDomainsSectionProps = {
  excludedDomains:
    readonly ExcludedDomain[];

  compact?: boolean;
};

const ExcludedDomainsSection = ({
  excludedDomains,
  compact = false,
}: ExcludedDomainsSectionProps) => {
  const headingId = compact
    ? "excluded-domains-mobile-heading"
    : "excluded-domains-heading";

  return (
    <section
      aria-labelledby={headingId}
      className={
        compact
          ? "mt-4 border-t border-slate-200 pt-4"
          : "mt-5 border-t border-slate-200 pt-4"
      }
    >
      <h2
        id={headingId}
        className="px-1 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500"
      >
        Not in This Assessment
      </h2>

      <ul
        className={
          compact
            ? "mt-3 grid gap-3 sm:grid-cols-2"
            : "mt-3 space-y-3"
        }
      >
        {excludedDomains.map((item) => (
          <li
            key={item.domain}
            className="flex items-start gap-2 px-1"
          >
            <img
              src={domainIcons[item.domain]}
              alt=""
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 object-contain opacity-70"
            />

            <div className="min-w-0">
              <p className="text-xs font-extrabold text-slate-700">
                {item.domain}
              </p>

              <p className="mt-0.5 break-words text-xs font-medium leading-5 text-slate-500">
                {item.reason}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DomainSidebar;