// client/src/pages/LandingPage.tsx

import LandingFeatures from "../features/landing/components/LandingFeatures";
import LandingHeader from "../features/landing/components/LandingHeader";
import LandingHero from "../features/landing/components/LandingHero";
import LandingFooter from "../features/landing/components/LandingFooter";

const LandingPage = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[linear-gradient(135deg,#f8fbff_0%,#edf4ff_42%,#f4efff_100%)]
        text-slate-900
      "
    >
      <div
        className="
          relative
          overflow-hidden
          bg-[radial-gradient(circle_at_14%_14%,rgba(147,197,253,0.24),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(196,181,253,0.24),transparent_30%),radial-gradient(circle_at_72%_78%,rgba(191,219,254,0.18),transparent_26%)]
        "
      >
        <LandingHeader />
        <LandingHero />
        <LandingFeatures />
        <LandingFooter />
      </div>
    </div>
  );
};

export default LandingPage;