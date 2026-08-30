// client/src/features/caseStudy/components/setup/DomainsPresenceTable.tsx

import { domainIcons } from "../../data/domainIcons";
import { domainPresenceOptions } from "../../data/sriSetupOptions";

import type {
  DomainPresence,
  SelectOption,
  TechnicalDomainName,
} from "../../types/caseStudy.types";

type Props = {
  domains: readonly TechnicalDomainName[];

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  setDomainPresence: (
    domain: TechnicalDomainName,
    value: DomainPresence,
  ) => void;

  errors?: Record<string, string>;
};

const DomainsPresenceTable = ({
  domains,
  domainPresence,
  setDomainPresence,
  errors = {},
}: Props) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle
        number={3}
        title="Domain Presence"
      />

      <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
        For each technical domain, use the scenario
        information to determine whether it is present,
        absent but mandatory, or absent and not mandatory.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <div className="min-w-0 md:min-w-[760px]">
          <div className="hidden grid-cols-[280px_repeat(3,1fr)] border-b border-slate-200 bg-white md:grid">
            <HeaderCell label="Domain" />

            {domainPresenceOptions.map(
              (option) => (
                <HeaderCell
                  key={option.value}
                  label={option.label}
                />
              ),
            )}
          </div>

          {domains.map((domain) => {
            const error =
              errors[
                `domainPresence.${domain}`
              ];

            const hasError = Boolean(error);
            const domainId =
              createDomainId(domain);

            const labelId =
              `${domainId}-label`;

            const errorId =
              `${domainId}-error`;

            return (
              <div
                key={domain}
                data-setup-error={
                  hasError
                    ? "true"
                    : undefined
                }
                tabIndex={
                  hasError ? -1 : undefined
                }
                className="border-b border-slate-100 outline-none last:border-b-0"
              >
                <div
                  role="radiogroup"
                  aria-labelledby={labelId}
                  aria-describedby={
                    hasError
                      ? errorId
                      : undefined
                  }
                  className="
                    min-w-0
                    md:grid
                    md:min-h-[52px]
                    md:grid-cols-[280px_repeat(3,1fr)]
                  "
                >
                  <div className="flex items-center gap-3 px-5 py-4 md:py-0">
                    <img
                      src={domainIcons[domain]}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 object-contain"
                    />

                    <p
                      id={labelId}
                      className="text-sm font-extrabold text-slate-700"
                    >
                      {domain}
                    </p>
                  </div>

                  {domainPresenceOptions.map(
                    (option) => (
                      <PresenceCell
                        key={option.value}
                        name={domainId}
                        domain={domain}
                        option={option}
                        checked={
                          domainPresence[
                            domain
                          ] ===
                          option.value
                        }
                        hasError={hasError}
                        errorId={
                          hasError
                            ? errorId
                            : undefined
                        }
                        onChange={() =>
                          setDomainPresence(
                            domain,
                            option.value,
                          )
                        }
                      />
                    ),
                  )}
                </div>

                {error ? (
                  <p
                    id={errorId}
                    role="alert"
                    className="border-t border-slate-100 px-5 py-2 text-xs font-semibold text-red-600"
                  >
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

type PresenceCellProps = {
  name: string;
  domain: TechnicalDomainName;
  option: SelectOption<DomainPresence>;
  checked: boolean;
  hasError: boolean;
  errorId?: string;
  onChange: () => void;
};

const PresenceCell = ({
  name,
  domain,
  option,
  checked,
  hasError,
  errorId,
  onChange,
}: PresenceCellProps) => {
  const accessibleLabel =
    option.description
      ? `${domain}: ${option.label}. ${option.description}`
      : `${domain}: ${option.label}`;

  return (
    <label
      title={option.description}
      className="
        flex
        min-h-12
        cursor-pointer
        items-center
        gap-3
        border-t
        border-slate-100
        px-5
        py-3
        transition-colors
        duration-200
        hover:bg-blue-50/40

        md:justify-center
        md:border-l
        md:border-t-0
        md:px-3
        md:py-0
      "
    >
      <input
        type="radio"
        name={name}
        value={option.value}
        aria-label={accessibleLabel}
        aria-invalid={hasError}
        aria-describedby={errorId}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-blue-600"
      />

      <span className="min-w-0 text-sm font-semibold text-slate-700 md:hidden">
        {option.label}
      </span>
    </label>
  );
};

type HeaderCellProps = {
  label: string;
};

const HeaderCell = ({
  label,
}: HeaderCellProps) => {
  return (
    <div className="flex min-h-[44px] items-center justify-center border-l border-slate-100 px-3 first:border-l-0">
      <p className="text-center text-xs font-extrabold leading-4 text-slate-600">
        {label}
      </p>
    </div>
  );
};

type SectionTitleProps = {
  number: number;
  title: string;
};

const SectionTitle = ({
  number,
  title,
}: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-extrabold text-white shadow-sm"
      >
        {number}
      </div>

      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
        <span className="sr-only">
          Step {number}:{" "}
        </span>

        {title}
      </h2>
    </div>
  );
};

const createDomainId = (
  domain: TechnicalDomainName,
) => {
  const normalizedDomain = domain
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `domain-presence-${normalizedDomain}`;
};

export default DomainsPresenceTable;