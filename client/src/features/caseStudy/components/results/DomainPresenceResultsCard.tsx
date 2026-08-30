// client/src/features/caseStudy/components/results/DomainPresenceResultsCard.tsx

import {
  CheckCircle2,
  TriangleAlert,
  XCircle,
} from "lucide-react";

import { domainIcons } from "../../data/domainIcons";

import type { TechnicalDomainName } from "../../types/caseStudy.types";

type DomainGroupTone =
  | "mandatory"
  | "optional";

type DomainPresenceResultsCardProps = {
  presentDomains: readonly TechnicalDomainName[];
  absentMandatoryDomains: readonly TechnicalDomainName[];
  absentNotMandatoryDomains: readonly TechnicalDomainName[];
};

const DomainPresenceResultsCard = ({
  presentDomains,
  absentMandatoryDomains,
  absentNotMandatoryDomains,
}: DomainPresenceResultsCardProps) => {
  return (
    <section className="h-full min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-extrabold leading-7 text-blue-950">
        Domain Presence
      </h2>

      <div className="mt-5 space-y-3">
        <PresentDomainsGroup
          domains={presentDomains}
        />

        <CompactDomainGroup
          title="Absent but Mandatory"
          domains={absentMandatoryDomains}
          tone="mandatory"
        />

        <CompactDomainGroup
          title="Absent and Not Mandatory"
          domains={absentNotMandatoryDomains}
          tone="optional"
        />
      </div>
    </section>
  );
};

type PresentDomainsGroupProps = {
  domains: readonly TechnicalDomainName[];
};

const PresentDomainsGroup = ({
  domains,
}: PresentDomainsGroupProps) => {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
      <div className="flex items-start justify-between gap-3 border-b border-emerald-100 pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <CheckCircle2
            size={17}
            className="shrink-0 text-emerald-700"
            aria-hidden="true"
          />

          <h3 className="min-w-0 break-words text-sm font-extrabold leading-5 text-emerald-700">
            Present
          </h3>
        </div>

        <DomainCount
          count={domains.length}
          className="text-emerald-700"
        />
      </div>

      {domains.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
          {domains.map((domain) => (
            <DomainIconItem
              key={domain}
              domain={domain}
            />
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs font-semibold leading-5 text-emerald-700">
          No present domains.
        </p>
      )}
    </article>
  );
};

type CompactDomainGroupProps = {
  title: string;
  domains: readonly TechnicalDomainName[];
  tone: DomainGroupTone;
};

const CompactDomainGroup = ({
  title,
  domains,
  tone,
}: CompactDomainGroupProps) => {
  return (
    <article
      className={`rounded-2xl border p-4 ${getGroupClass(
        tone,
      )}`}
    >
      <div className="flex flex-col items-start gap-3 min-[420px]:flex-row min-[420px]:justify-between">
        <div className="flex w-full min-w-0 items-center gap-2 min-[420px]:w-auto min-[420px]:flex-1">
          {tone === "mandatory" ? (
            <TriangleAlert
              size={16}
              className="shrink-0 text-amber-700"
              aria-hidden="true"
            />
          ) : (
            <XCircle
              size={16}
              className="shrink-0 text-slate-600"
              aria-hidden="true"
            />
          )}

          <h3
            className={`min-w-0 break-words text-sm font-extrabold leading-5 ${getTitleClass(
              tone,
            )}`}
          >
            {title}
          </h3>
        </div>

        <DomainCount
          count={domains.length}
          className="ml-6 text-slate-700 min-[420px]:ml-0"
        />
      </div>

      {domains.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {domains.map((domain) => (
            <li
              key={domain}
              className="flex min-w-0 items-center gap-2"
            >
              <img
                src={domainIcons[domain]}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 shrink-0 object-contain"
              />

              <span className="min-w-0 break-words text-xs font-semibold leading-5 text-slate-700">
                {domain}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
          No domains in this category.
        </p>
      )}
    </article>
  );
};

type DomainCountProps = {
  count: number;
  className: string;
};

const DomainCount = ({
  count,
  className,
}: DomainCountProps) => {
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-extrabold shadow-sm ${className}`}
    >
      {count}{" "}
      {count === 1
        ? "domain"
        : "domains"}
    </span>
  );
};

type DomainIconItemProps = {
  domain: TechnicalDomainName;
};

const DomainIconItem = ({
  domain,
}: DomainIconItemProps) => {
  return (
    <li className="flex min-w-0 flex-col items-center text-center">
      <img
        src={domainIcons[domain]}
        alt=""
        aria-hidden="true"
        className="h-9 w-9 object-contain"
      />

      <span className="mt-2 break-words text-xs font-extrabold leading-4 text-blue-950">
        {domain}
      </span>
    </li>
  );
};

const getGroupClass = (
  tone: DomainGroupTone,
) => {
  switch (tone) {
    case "mandatory":
      return "border-amber-100 bg-amber-50/60";

    case "optional":
      return "border-slate-100 bg-slate-50";
  }
};

const getTitleClass = (
  tone: DomainGroupTone,
) => {
  switch (tone) {
    case "mandatory":
      return "text-amber-700";

    case "optional":
      return "text-slate-700";
  }
};

export default DomainPresenceResultsCard;
