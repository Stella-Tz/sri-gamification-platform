// client/src/features/landing/components/LandingFeatures.tsx

import { landingFeatures } from "../data/landingFeatures";
import LandingFeatureCard from "./LandingFeatureCard";

const LandingFeatures = () => {
  return (
    <section
      id="platform-features"
      className="relative px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12"
    >
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-12
          h-80
          w-80
          rounded-full
          bg-blue-200/20
          blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-0
          h-96
          w-96
          rounded-full
          bg-violet-200/20
          blur-3xl
        "
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-950 md:text-4xl">
            Key Features of the Platform
          </h2>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-8 rounded-full bg-blue-500" />
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            <span className="h-0.5 w-8 rounded-full bg-violet-400" />
          </div>
        </header>

        <div className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {landingFeatures.map((feature) => (
            <LandingFeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;