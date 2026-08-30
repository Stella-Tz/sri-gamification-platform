// client/src/features/landing/components/LandingFeatureCard.tsx

import type { LandingFeature } from "../data/landingFeatures";

type Props = {
  feature: LandingFeature;
};

const accentStyles = {
  blue: {
    iconWrapper:
      "border-blue-200 bg-white text-blue-700 ring-blue-100",
    decoration: "bg-blue-500",
    iconGlow: "shadow-[0_8px_24px_rgba(37,99,235,0.16)]",
  },
  violet: {
    iconWrapper:
      "border-violet-200 bg-white text-violet-700 ring-violet-100",
    decoration: "bg-violet-500",
    iconGlow: "shadow-[0_8px_24px_rgba(124,58,237,0.16)]",
  },
};

const LandingFeatureCard = ({ feature }: Props) => {
  const Icon = feature.icon;
  const styles = accentStyles[feature.accent];

  return (
    <article
      className="
        relative
        flex
        h-full
        min-h-[250px]
        flex-col
        items-center
        rounded-3xl
        border
        border-slate-200
        bg-white/85
        px-6
        pb-7
        pt-14
        text-center
        shadow-sm
        backdrop-blur-sm
      "
    >
      <div
        className={`
          absolute
          left-1/2
          top-0
          flex
          h-20
          w-20
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          ring-4
          ring-white/80
          ${styles.iconWrapper}
          ${styles.iconGlow}
        `}
      >
        <Icon
          className="h-9 w-9"
          strokeWidth={2.4}
          aria-hidden="true"
        />
      </div>

      <h3 className="max-w-[15rem] text-base font-extrabold leading-6 text-blue-950">
        {feature.title}
      </h3>

      <div
        className={`mt-4 h-1 w-9 rounded-full ${styles.decoration}`}
        aria-hidden="true"
      />

      <p className="mt-4 max-w-[15rem] text-sm font-medium leading-6 text-slate-600">
        {feature.description}
      </p>

    </article>
  );
};

export default LandingFeatureCard;