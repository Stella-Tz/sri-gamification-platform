// client/src/features/caseStudy/components/results/ApplicableServicesByDomainCard.tsx

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { X } from "lucide-react";

import { ImpactCriterionIcon } from "../../../../components/ui/impact-criteria";

import { domainIcons } from "../../data/domainIcons";
import { sriTechnicalDomainNames } from "../../data/sriOfficialConstants";

import type {
  ImpactCriterionName,
  ResultsServiceEntry,
  TechnicalDomainName,
} from "../../types/caseStudy.types";

type ApplicableServicesByDomainCardProps = {
  servicesByDomain: Readonly<
    Record<
      TechnicalDomainName,
      readonly ResultsServiceEntry[]
    >
  >;
};

type ActiveSegment = {
  domain: TechnicalDomainName;
  level: number;
};

type ServiceLevelEntry = {
  service: ResultsServiceEntry;
  level: number;
  levelId: string;
  share: number;
};

type DomainSummary = {
  domain: TechnicalDomainName;
  servicesCount: number;
  entries: readonly ServiceLevelEntry[];
  levelGroups: Record<
    number,
    ServiceLevelEntry[]
  >;
};

const levelColorClasses: Record<
  number,
  string
> = {
  0: "bg-amber-400",
  1: "bg-blue-500",
  2: "bg-emerald-500",
  3: "bg-purple-500",
  4: "bg-indigo-500",
};

const ApplicableServicesByDomainCard = ({
  servicesByDomain,
}: ApplicableServicesByDomainCardProps) => {
  const domainSummaries =
    useMemo<readonly DomainSummary[]>(() => {
      return sriTechnicalDomainNames
        .map((domain) => {
          const services =
            servicesByDomain[domain] ?? [];

          const entries =
            services.flatMap(
              getServiceLevelEntries,
            );

          const levelGroups =
            entries.reduce<
              Record<
                number,
                ServiceLevelEntry[]
              >
            >(
              (
                accumulator,
                entry,
              ) => {
                accumulator[entry.level] =
                  accumulator[entry.level] ??
                  [];

                accumulator[
                  entry.level
                ].push(entry);

                return accumulator;
              },
              {},
            );

          return {
            domain,
            servicesCount:
              services.length,
            entries,
            levelGroups,
          };
        })
        .filter(
          (summary) =>
            summary.servicesCount > 0,
        );
    }, [servicesByDomain]);

  const visibleLevels = useMemo(() => {
    return Object.keys(
      levelColorClasses,
    )
      .map(Number)
      .filter((level) =>
        domainSummaries.some(
          (summary) =>
            Boolean(
              summary.levelGroups[level]
                ?.length,
            ),
        ),
      )
      .sort(
        (
          firstLevel,
          secondLevel,
        ) =>
          firstLevel - secondLevel,
      );
  }, [domainSummaries]);

  const [
    previewSegment,
    setPreviewSegment,
  ] = useState<ActiveSegment | null>(
    null,
  );

  const [
    selectedSegment,
    setSelectedSegment,
  ] = useState<ActiveSegment | null>(
    null,
  );

  const activeSegment =
    previewSegment ?? selectedSegment;

  const activeSummary =
    activeSegment
      ? domainSummaries.find(
          (summary) =>
            summary.domain ===
            activeSegment.domain,
        )
      : null;

  const activeEntries =
    activeSummary && activeSegment
      ? activeSummary.levelGroups[
          activeSegment.level
        ] ?? []
      : [];

  const closeTimerRef =
    useRef<number | null>(null);

  const cancelScheduledClose = () => {
    if (closeTimerRef.current === null) {
      return;
    }

    window.clearTimeout(
      closeTimerRef.current,
    );

    closeTimerRef.current = null;
  };

  const showPreview = (
    segment: ActiveSegment,
  ) => {
    cancelScheduledClose();
    setPreviewSegment(segment);
  };

  const schedulePreviewClose = () => {
    cancelScheduledClose();

    closeTimerRef.current =
      window.setTimeout(() => {
        setPreviewSegment(null);
        closeTimerRef.current = null;
      }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(
          closeTimerRef.current,
        );
      }
    };
  }, []);

  const toggleSelectedSegment = (
    segment: ActiveSegment,
  ) => {
    cancelScheduledClose();
    setPreviewSegment(null);

    setSelectedSegment((current) => {
      const isSameSegment =
        current?.domain ===
          segment.domain &&
        current.level === segment.level;

      return isSameSegment
        ? null
        : segment;
    });
  };

  const closeDetails = () => {
    cancelScheduledClose();
    setPreviewSegment(null);
    setSelectedSegment(null);
  };

  return (
    <section
      className="relative min-w-0 flex h-full flex-col overflow-visible rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeDetails();
        }
      }}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold leading-7 text-blue-950">
            Assessed Services by Domain
          </h2>

          <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500">
            Each bar groups assessed services by functionality level,
            accounting for the share assigned to each level.
          </p>
        </div>

        {visibleLevels.length > 0 ? (
          <ul
            aria-label="Functionality level colours"
            className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-extrabold text-slate-600"
          >
            {visibleLevels.map(
              (level) => (
                <Legend
                  key={level}
                  color={
                    levelColorClasses[
                      level
                    ] ?? "bg-slate-300"
                  }
                  label={`Level ${level}`}
                />
              ),
            )}
          </ul>
        ) : null}
      </div>

      {domainSummaries.length > 0 ? (
        <div className="mt-8 flex flex-1 flex-col justify-evenly gap-4">
          {domainSummaries.map(
            (summary) => (
              <DomainLevelBar
                key={summary.domain}
                summary={summary}
                activeSegment={
                  activeSegment
                }
                onPreviewStart={
                  showPreview
                }
                onPreviewEnd={
                  schedulePreviewClose
                }
                onToggle={
                  toggleSelectedSegment
                }
              />
            ),
          )}
        </div>
      ) : (
        <p
          role="status"
          className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-500"
        >
          No assessed services are available for the technical domains
          included in this assessment.
        </p>
      )}

      {activeSegment ? (
        <LevelDetailsPopover
          domain={activeSegment.domain}
          level={activeSegment.level}
          entries={activeEntries}
          onClose={closeDetails}
          onMouseEnter={
            cancelScheduledClose
          }
          onMouseLeave={
            schedulePreviewClose
          }
        />
      ) : null}
    </section>
  );
};

type DomainLevelBarProps = {
  summary: DomainSummary;
  activeSegment: ActiveSegment | null;
  onPreviewStart: (
    segment: ActiveSegment,
  ) => void;
  onPreviewEnd: () => void;
  onToggle: (
    segment: ActiveSegment,
  ) => void;
};

const DomainLevelBar = ({
  summary,
  activeSegment,
  onPreviewStart,
  onPreviewEnd,
  onToggle,
}: DomainLevelBarProps) => {
  const sortedLevels =
    Object.entries(
      summary.levelGroups,
    )
      .map(([level, entries]) => ({
        level: Number(level),
        entries,
      }))
      .sort(
        (
          firstGroup,
          secondGroup,
        ) =>
          firstGroup.level -
          secondGroup.level,
      );

  const totalShare =
    summary.entries.reduce(
      (sum, entry) =>
        sum + entry.share,
      0,
    );

  return (
    <div className="grid gap-3 xl:grid-cols-[210px_minmax(0,1fr)] xl:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={
            domainIcons[
              summary.domain
            ]
          }
          alt=""
          aria-hidden="true"
          className="h-7 w-7 shrink-0 object-contain"
        />

        <div className="min-w-0">
          <p className="break-words text-sm font-extrabold leading-5 text-blue-950">
            {summary.domain}
          </p>

          <p className="mt-0.5 text-xs font-semibold leading-5 text-slate-400">
            {summary.servicesCount}{" "}
            {summary.servicesCount === 1
              ? "assessed service"
              : "assessed services"}
          </p>
        </div>
      </div>

      <div
        aria-label={`${summary.domain} functionality level distribution`}
        className="flex h-4 min-w-0 overflow-hidden rounded-full bg-slate-200"
        onMouseLeave={
          onPreviewEnd
        }
      >
        {sortedLevels.map(
          ({ level, entries }) => {
            const levelShare =
              entries.reduce(
                (sum, entry) =>
                  sum + entry.share,
                0,
              );

            const width =
              totalShare > 0
                ? (levelShare /
                    totalShare) *
                  100
                : 0;

            const isActive =
              activeSegment?.domain ===
                summary.domain &&
              activeSegment.level ===
                level;

            const detailsId =
              getLevelDetailsId(
                summary.domain,
                level,
              );

            const serviceLabel =
              entries.length === 1
                ? "service entry"
                : "service entries";

            return (
              <button
                key={`${summary.domain}-${level}`}
                type="button"
                aria-label={`${summary.domain}, Level ${level}: ${width.toFixed(
                  1,
                )}% of assessed service shares across ${
                  entries.length
                } ${serviceLabel}`}
                aria-expanded={
                  isActive
                }
                aria-controls={
                  isActive
                    ? detailsId
                    : undefined
                }
                onMouseEnter={() => {
                  onPreviewStart({
                    domain:
                      summary.domain,
                    level,
                  });
                }}
                onPointerUp={(event) => {
                  if (event.pointerType !== "mouse") {
                    onToggle({
                      domain:
                        summary.domain,
                      level,
                    });
                  }
                }}
                onFocus={() =>
                  onPreviewStart({
                    domain:
                      summary.domain,
                    level,
                  })
                }
                onBlur={
                  onPreviewEnd
                }
                onClick={(event) => {
                  if (event.detail === 0) {
                    onToggle({
                      domain:
                        summary.domain,
                      level,
                    });
                  }
                }}
                className={`h-full transition-[filter] duration-200 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-2 ${
                  levelColorClasses[
                    level
                  ] ?? "bg-slate-300"
                } ${
                  isActive
                    ? "brightness-105"
                    : "hover:brightness-105"
                }`}
                style={{
                  width: `${width}%`,
                }}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

type LevelDetailsPopoverProps = {
  domain: TechnicalDomainName;
  level: number;
  entries: readonly ServiceLevelEntry[];
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const LevelDetailsPopover = ({
  domain,
  level,
  entries,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: LevelDetailsPopoverProps) => {
  const sharedEntries =
    entries.filter(
      (entry) =>
        hasOtherLevel(entry),
    );

  const popoverId =
    getLevelDetailsId(
      domain,
      level,
    );

  const headingId =
    `${popoverId}-heading`;

  return (
    <aside
      id={popoverId}
      aria-labelledby={headingId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="pointer-events-auto absolute right-6 top-[84px] z-30 w-[390px] rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl max-xl:static max-xl:mt-6 max-xl:w-full xl:max-h-[70vh] xl:overflow-y-auto xl:overscroll-contain"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={domainIcons[domain]}
            alt=""
            aria-hidden="true"
            className="h-7 w-7 shrink-0 object-contain"
          />

          <h3
            id={headingId}
            className="break-words text-lg font-extrabold text-blue-950"
          >
            {domain}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-xl px-3 py-1 text-xs font-extrabold text-white ${
              levelColorClasses[level] ??
              "bg-slate-400"
            }`}
          >
            Level {level}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close service level details"
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <X
              size={17}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h4
          className={`text-sm font-extrabold ${getLevelTextClass(
            level,
          )}`}
        >
          Services at This Level
        </h4>

        <div className="mt-4 space-y-4">
          {entries.map((entry) => (
            <ServiceImpactItem
              key={`${entry.service.serviceId}-${entry.levelId}`}
              entry={entry}
            />
          ))}
        </div>
      </div>

      {sharedEntries.length > 0 ? (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <h4 className="text-sm font-extrabold leading-6 text-blue-950">
            Services with Shares at Other Functionality Levels
          </h4>

          <div className="mt-3 space-y-3">
            {sharedEntries.map(
              (entry) => {
                const otherLevel =
                  getOtherLevelNumber(
                    entry,
                  );

                return (
                  <div
                    key={`${entry.service.serviceId}-${entry.levelId}-other`}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="flex min-w-0 items-start gap-2">
                      <span
                        aria-hidden="true"
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                          levelColorClasses[
                            otherLevel
                          ] ??
                          "bg-slate-300"
                        }`}
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-blue-950">
                          {
                            entry.service
                              .serviceCode
                          }
                        </p>

                        <p className="mt-0.5 break-words text-xs font-semibold leading-5 text-slate-500">
                          <span>
                            {
                              entry.service
                                .serviceGroup
                            }
                          </span>

                          <span className="ml-2 whitespace-nowrap text-slate-400">
                            (Level{" "}
                            {entry.level} of{" "}
                            {
                              entry.service
                                .maxLevelNumber
                            }
                            )
                          </span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 text-xs font-extrabold ${getLevelTextClass(
                        otherLevel,
                      )}`}
                    >
                      {getOtherLevelText(
                        entry,
                      )}
                    </span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      ) : null}
    </aside>
  );
};

type ServiceImpactItemProps = {
  entry: ServiceLevelEntry;
};

const ServiceImpactItem = ({
  entry,
}: ServiceImpactItemProps) => {
  return (
    <article className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-2">
          <span
            aria-hidden="true"
            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
              levelColorClasses[
                entry.level
              ] ?? "bg-slate-300"
            }`}
          />

          <div className="min-w-0">
            <p className="text-sm font-extrabold leading-5 text-blue-950">
              {
                entry.service
                  .serviceCode
              }
            </p>

            <p className="mt-0.5 break-words text-xs font-semibold leading-5 text-slate-500">
              <span>
                {
                  entry.service
                    .serviceGroup
                }
              </span>

              <span className="ml-2 whitespace-nowrap text-slate-400">
                (Level {entry.level} of{" "}
                {
                  entry.service
                    .maxLevelNumber
                }
                )
              </span>
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 text-xs font-extrabold ${getLevelTextClass(
            entry.level,
          )}`}
        >
          {formatShare(
            entry.share,
          )}
        </span>
      </div>

      {entry.service.impacts.length >
      0 ? (
        <div className="mt-3 flex flex-wrap gap-2 pl-4">
          {entry.service.impacts.map(
            (impact) => (
              <ImpactChip
                key={impact}
                impact={impact}
              />
            ),
          )}
        </div>
      ) : null}
    </article>
  );
};

type ImpactChipProps = {
  impact: ImpactCriterionName;
};

const ImpactChip = ({
  impact,
}: ImpactChipProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold ${getImpactChipClass(
        impact,
      )}`}
    >
      <ImpactCriterionIcon
        criterion={impact}
        size={13}
        aria-hidden="true"
      />

      {impact}
    </span>
  );
};

type LegendProps = {
  color: string;
  label: string;
};

const Legend = ({
  color,
  label,
}: LegendProps) => {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 rounded-full ${color}`}
      />

      <span>{label}</span>
    </li>
  );
};

const getServiceLevelEntries = (
  service: ResultsServiceEntry,
): ServiceLevelEntry[] => {
  const mainShare =
    clampShare(service.share);

  const additionalShare =
    100 - mainShare;

  const entries:
    ServiceLevelEntry[] = [];

  if (mainShare > 0) {
    entries.push({
      service,
      level:
        service.selectedLevelNumber,
      levelId:
        service.selectedLevelId,
      share: mainShare,
    });
  }

  if (
    additionalShare > 0 &&
    service.additionalLevelId &&
    service.additionalLevelNumber !==
      undefined
  ) {
    entries.push({
      service,
      level:
        service.additionalLevelNumber,
      levelId:
        service.additionalLevelId,
      share: additionalShare,
    });
  }

  return entries;
};

const hasOtherLevel = (
  entry: ServiceLevelEntry,
): boolean => {
  const mainShare =
    clampShare(entry.service.share);

  return (
    mainShare > 0 &&
    mainShare < 100 &&
    Boolean(
      entry.service
        .additionalLevelId,
    ) &&
    entry.service
      .additionalLevelNumber !==
      undefined
  );
};

const getOtherLevelText = (
  entry: ServiceLevelEntry,
): string => {
  const mainShare =
    clampShare(entry.service.share);

  const additionalShare =
    100 - mainShare;

  if (
    entry.levelId ===
    entry.service.selectedLevelId
  ) {
    return `${formatShare(
      additionalShare,
    )} at Level ${entry.service.additionalLevelNumber}`;
  }

  return `${formatShare(
    mainShare,
  )} at Level ${entry.service.selectedLevelNumber}`;
};

const getOtherLevelNumber = (
  entry: ServiceLevelEntry,
): number => {
  if (
    entry.levelId ===
    entry.service.selectedLevelId
  ) {
    return (
      entry.service
        .additionalLevelNumber ??
      entry.level
    );
  }

  return entry.service
    .selectedLevelNumber;
};

const getLevelDetailsId = (
  domain: TechnicalDomainName,
  level: number,
) => {
  return `level-details-${createSafeId(
    domain,
  )}-${level}`;
};

const createSafeId = (
  value: string,
) => {
  const normalizedValue = value
    .toLowerCase()
    .replace(
      /[^a-z0-9_-]+/g,
      "-",
    )
    .replace(/^-+|-+$/g, "");

  return normalizedValue ||
    "technical-domain";
};

const getLevelTextClass = (
  level: number,
) => {
  switch (level) {
    case 0:
      return "text-amber-600";

    case 1:
      return "text-blue-600";

    case 2:
      return "text-emerald-600";

    case 3:
      return "text-purple-600";

    case 4:
      return "text-indigo-600";

    default:
      return "text-slate-700";
  }
};

const clampShare = (
  share: number,
) => {
  if (!Number.isFinite(share)) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(0, share),
  );
};

const formatShare = (
  share: number,
) => {
  return Number.isInteger(share)
    ? `${share}%`
    : `${share.toFixed(1)}%`;
};

const getImpactChipClass = (
  impact: ImpactCriterionName,
) => {
  switch (impact) {
    case "Energy efficiency":
      return "bg-amber-50 text-amber-700";

    case "Energy flexibility and storage":
      return "bg-emerald-50 text-emerald-700";

    case "Comfort":
      return "bg-blue-50 text-blue-700";

    case "Convenience":
      return "bg-purple-50 text-purple-700";

    case "Health, well-being and accessibility":
      return "bg-rose-50 text-rose-700";

    case "Maintenance and fault prediction":
      return "bg-orange-50 text-orange-700";

    case "Information to occupants":
      return "bg-sky-50 text-sky-700";

    default:
      return "bg-slate-50 text-slate-700";
  }
};

export default ApplicableServicesByDomainCard;