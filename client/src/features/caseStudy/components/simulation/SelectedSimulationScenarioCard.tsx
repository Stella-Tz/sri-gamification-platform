// client/src/features/caseStudy/components/simulation/SelectedSimulationScenarioCard.tsx

import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Info,
  Rocket,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { getTechnicalDomainIcon } from "../../data/technicalDomainIcons";

import type {
  GuidedImprovementBackendFindings,
} from "../../improvement/guidedImprovement.types";

type SelectedSimulationScenarioCardProps = {
  findings:
    GuidedImprovementBackendFindings;
};

type ScenarioTone =
  | "violet"
  | "amber"
  | "emerald"
  | "blue";

type ImplementationSegment = {
  level: number;
  share: number;
};

type ResolvedUpgrade = {
  currentSegments:
    ImplementationSegment[];
  maximumLevel: number;
};

const scenarioCardClassName = `
  flex
  h-full
  min-w-0
  flex-col
  rounded-3xl
  border
  border-slate-200
  bg-white
  px-5
  py-6
  text-center

  xl:grid
  xl:grid-rows-[80px_20px_1px_96px_minmax(0,1fr)]
  xl:gap-y-3
`;

const SelectedSimulationScenarioCard = ({
  findings,
}: SelectedSimulationScenarioCardProps) => {
  const service =
    findings
      .highestImpactService;

  const resolvedUpgrade =
    resolveUpgrade({
      currentLevel:
        service
          .currentLevelNumber,

      currentShare:
        service
          .currentShare,

      currentAdditionalLevel:
        service
          .currentAdditionalLevelNumber,

      maximumLevel:
        service
          .maxLevelNumber,
    });

  if (!resolvedUpgrade) {
    return (
      <SelectedSimulationScenarioErrorState />
    );
  }

  const TechnicalDomainIcon =
    getTechnicalDomainIcon(
      findings
        .highestWeightTechnicalDomain,
    );

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
          Recommended Upgrade
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          Review the upgrade scenario identified through the Guided
          Improvement Analysis before running the simulation.
        </p>
      </div>

      <div className="mt-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-stretch">
        <ScenarioStep
          icon={
            Zap
          }
          label="Impact Criterion"
          value={
            findings
              .highestImpactCriterion
          }
          note="It has the highest official weighting among the impact criteria considered in the Guided Improvement Analysis."
          tone="violet"
        />

        <ScenarioArrow />

        <ScenarioStep
          icon={
            TechnicalDomainIcon
          }
          label="Technical Domain"
          value={
            findings
              .highestWeightTechnicalDomain
          }
          note={`It has the highest official domain weight for ${findings.highestImpactCriterion}.`}
          tone="amber"
        />

        <ScenarioArrow />

        <ScenarioStep
          icon={
            BarChart3
          }
          label="Service"
          value={
            service
              .serviceCode
          }
          secondaryValue={
            service
              .serviceName
          }
          note={`It has the highest maximum-level impact score among the assessed services that can still be upgraded in the ${findings.highestWeightTechnicalDomain} domain.`}
          tone="emerald"
        />

        <ScenarioArrow />

        <UpgradeStep
          serviceCode={
            service
              .serviceCode
          }
          currentSegments={
            resolvedUpgrade
              .currentSegments
          }
          maximumLevel={
            resolvedUpgrade
              .maximumLevel
          }
        />
      </div>
    </section>
  );
};

type ScenarioStepProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  secondaryValue?: string;
  note: string;
  tone: ScenarioTone;
};

const ScenarioStep = ({
  icon: Icon,
  label,
  value,
  secondaryValue,
  note,
  tone,
}: ScenarioStepProps) => {
  return (
    <article
      className={
        scenarioCardClassName
      }
    >
      <div
        aria-hidden="true"
        className={`mx-auto flex h-20 w-20 shrink-0 items-center justify-center rounded-full ring-1 ${getIconToneClass(
          tone,
        )}`}
      >
        <Icon
          size={34}
          strokeWidth={2.4}
        />
      </div>

      <p className="mt-6 text-xs font-extrabold uppercase leading-5 tracking-[0.14em] text-slate-500 xl:mt-0 xl:self-center">
        {label}
      </p>

      <div
        aria-hidden="true"
        className={`mx-auto mt-3 h-px w-16 ${getDividerClass(
          tone,
        )} xl:mt-0 xl:self-center`}
      />

      <div className="flex min-w-0 items-start justify-center pt-4 xl:items-center xl:pt-0">
        <div className="min-w-0">
          <p
            className={`mx-auto max-w-[215px] break-words text-lg font-extrabold leading-7 ${getValueToneClass(
              tone,
            )}`}
          >
            {value}
          </p>

          {secondaryValue ? (
            <p className="mx-auto mt-2 max-w-[200px] break-words text-xs font-semibold leading-5 text-slate-500">
              {secondaryValue}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 min-h-0 xl:mt-0">
        <InfoBox
          title="Why This Was Selected"
          note={
            note
          }
          tone={
            tone
          }
        />
      </div>
    </article>
  );
};

type UpgradeStepProps = {
  serviceCode: string;

  currentSegments:
    readonly ImplementationSegment[];

  maximumLevel: number;
};

const UpgradeStep = ({
  serviceCode,
  currentSegments,
  maximumLevel,
}: UpgradeStepProps) => {
  return (
    <article
      className={
        scenarioCardClassName
      }
    >
      <div
        aria-hidden="true"
        className="mx-auto flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100"
      >
        <Rocket
          size={34}
          strokeWidth={2.4}
        />
      </div>

      <p className="mt-6 text-xs font-extrabold uppercase leading-5 tracking-[0.14em] text-slate-500 xl:mt-0 xl:self-center">
        Upgrade
      </p>

      <div
        aria-hidden="true"
        className="mx-auto mt-3 h-px w-16 bg-blue-300 xl:mt-0 xl:self-center"
      />

      <div className="flex min-w-0 items-start justify-center pt-4 xl:items-center xl:pt-0">
        <div className="flex flex-col items-center justify-center gap-3 min-[420px]:flex-row min-[420px]:gap-4">
          <ImplementationBlock
            label="From"
            segments={
              currentSegments
            }
          />

          <ArrowRight
            aria-hidden="true"
            className="shrink-0 rotate-90 text-slate-400 min-[420px]:mt-6 min-[420px]:rotate-0"
            size={24}
          />

          <ImplementationBlock
            label="To"
            segments={[
              {
                level:
                  maximumLevel,

                share:
                  100,
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-4 min-h-0 xl:mt-0">
        <InfoBox
          title="Simulation Setup"
          note={`The simulation upgrades ${serviceCode} to functionality level ${maximumLevel} for 100% of the building's net surface area. All other assessed services remain unchanged.`}
          tone="blue"
        />
      </div>
    </article>
  );
};

type ImplementationBlockProps = {
  label: string;

  segments:
    readonly ImplementationSegment[];
};

const ImplementationBlock = ({
  label,
  segments,
}: ImplementationBlockProps) => {
  return (
    <div className="min-w-[88px]">
      <p className="text-sm font-semibold text-slate-500">
        {label}
      </p>

      <div className="mt-2 space-y-2">
        {segments.map(
          (
            segment,
            index,
          ) => (
            <div
              key={`${label}-${segment.level}-${segment.share}-${index}`}
              className="text-center"
            >
              <p className="text-lg font-extrabold leading-6 text-blue-700">
                Level{" "}
                {
                  segment
                    .level
                }
              </p>

              <p
                aria-label={`${segment.share}% of the building's net surface area`}
                className="mt-1 text-xs font-bold leading-4 text-slate-500"
              >
                {
                  segment
                    .share
                }
                %
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

type InfoBoxProps = {
  title: string;
  note: string;
  tone: ScenarioTone;
};

const InfoBox = ({
  title,
  note,
  tone,
}: InfoBoxProps) => {
  return (
    <div
      className={`h-full w-full rounded-2xl border px-4 py-4 text-left ${getNoteToneClass(
        tone,
      )}`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <Info
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0"
        />

        <div className="min-w-0">
          <p className="text-sm font-extrabold leading-5">
            {title}
          </p>

          <p className="mt-2 break-words text-sm font-semibold leading-6">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
};

const ScenarioArrow =
  () => {
    return (
      <div
        aria-hidden="true"
        className="flex items-center justify-center py-1"
      >
        <ArrowRight
          size={28}
          className="rotate-90 text-slate-400 xl:rotate-0"
        />
      </div>
    );
  };

type ResolveUpgradeParams = {
  currentLevel:
    number;

  currentShare:
    number;

  currentAdditionalLevel?:
    number;

  maximumLevel:
    number;
};

const resolveUpgrade = ({
  currentLevel,
  currentShare,
  currentAdditionalLevel,
  maximumLevel,
}: ResolveUpgradeParams):
  ResolvedUpgrade | null => {
  if (
    !isValidFunctionalityLevel(
      currentLevel,
    ) ||
    !isValidFunctionalityLevel(
      maximumLevel,
    ) ||
    !Number.isFinite(
      currentShare,
    ) ||
    currentShare < 0 ||
    currentShare > 100
  ) {
    return null;
  }

  if (
    currentShare < 100 &&
    !isValidFunctionalityLevel(
      currentAdditionalLevel,
    )
  ) {
    return null;
  }

  const currentSegments:
    ImplementationSegment[] =
      [];

  if (
    currentShare > 0
  ) {
    currentSegments.push({
      level:
        currentLevel,

      share:
        currentShare,
    });
  }

  if (
    currentShare < 100 &&
    currentAdditionalLevel !==
      undefined
  ) {
    currentSegments.push({
      level:
        currentAdditionalLevel,

      share:
        100 -
        currentShare,
    });
  }

  if (
    currentSegments
      .length === 0 ||
    currentSegments.some(
      (segment) =>
        segment.level >
        maximumLevel,
    )
  ) {
    return null;
  }

  const hasUpgradePotential =
    currentSegments.some(
      (segment) =>
        segment.level <
        maximumLevel,
    );

  if (
    !hasUpgradePotential
  ) {
    return null;
  }

  return {
    currentSegments,
    maximumLevel,
  };
};

const isValidFunctionalityLevel = (
  level:
    number | undefined,
): level is number => {
  return (
    level !==
      undefined &&
    Number.isInteger(
      level,
    ) &&
    level >= 0
  );
};

const SelectedSimulationScenarioErrorState =
  () => {
    return (
      <section
        role="alert"
        className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0 text-amber-700"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <h2 className="text-xl font-extrabold leading-7 text-amber-900">
              Recommended Upgrade Unavailable
            </h2>

            <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
              The selected service does not contain a complete and valid
              upgrade scenario. Review the Guided Improvement Analysis
              before running the simulation.
            </p>
          </div>
        </div>
      </section>
    );
  };

const getIconToneClass = (
  tone:
    ScenarioTone,
) => {
  switch (tone) {
    case "amber":
      return "bg-orange-50 text-orange-600 ring-orange-100";

    case "emerald":
      return "bg-emerald-50 text-emerald-700 ring-emerald-100";

    case "blue":
      return "bg-blue-50 text-blue-700 ring-blue-100";

    case "violet":
      return "bg-violet-50 text-violet-700 ring-violet-100";
  }
};

const getValueToneClass = (
  tone:
    ScenarioTone,
) => {
  switch (tone) {
    case "amber":
      return "text-orange-600";

    case "emerald":
      return "text-emerald-700";

    case "blue":
      return "text-blue-700";

    case "violet":
      return "text-violet-700";
  }
};

const getDividerClass = (
  tone:
    ScenarioTone,
) => {
  switch (tone) {
    case "amber":
      return "bg-orange-300";

    case "emerald":
      return "bg-emerald-300";

    case "blue":
      return "bg-blue-300";

    case "violet":
      return "bg-violet-300";
  }
};

const getNoteToneClass = (
  tone:
    ScenarioTone,
) => {
  switch (tone) {
    case "amber":
      return "border-orange-100 bg-orange-50/70 text-orange-800";

    case "emerald":
      return "border-emerald-100 bg-emerald-50/70 text-emerald-800";

    case "blue":
      return "border-blue-100 bg-blue-50/70 text-blue-900";

    case "violet":
      return "border-violet-100 bg-violet-50/70 text-violet-800";
  }
};

export default SelectedSimulationScenarioCard;