// client/src/features/landing/components/LandingHero.tsx

import ForwardArrowIcon from "../../../components/ui/ForwardArrowIcon";
import PrimaryLink from "../../../components/ui/PrimaryLink";

import landingSmartBuildingImage from "../../../assets/landing/landing_smart_building.png";
import { ROUTES } from "../../../constants/routes";

const LandingHero = () => {
  return (
    <section className="relative px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pb-10 lg:pt-16">
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-96
          w-96
          rounded-full
          bg-blue-200/25
          blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          top-0
          h-[420px]
          w-[420px]
          rounded-full
          bg-violet-200/20
          blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-10
          lg:min-h-[520px]
          lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]
        "
      >
        <div className="min-w-0">
          <h1
            className="
              max-w-[720px]
              text-4xl
              font-extrabold
              leading-[1.06]
              tracking-tight
              text-slate-900
              sm:text-5xl
              xl:text-6xl
            "
          >
            Learn and Apply the{" "}
            <span
              className="
                bg-gradient-to-r
                from-blue-600
                via-blue-500
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              Smart Readiness
            </span>{" "}
            Indicator
          </h1>

          <div
            className="mt-5 h-1 w-14 rounded-full bg-blue-600"
            aria-hidden="true"
          />

          <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-slate-600 md:text-lg">
            Understand the SRI methodology through structured learning,
            interactive quizzes and practical application.
          </p>

          <div className="mt-8">
            <PrimaryLink
              to={ROUTES.login}
              size="large"
              className="group gap-3"
            >
              Start Learning
              <ForwardArrowIcon size={20} />
            </PrimaryLink>
          </div>
        </div>

        <div className="hidden min-w-0 items-center justify-end lg:flex">
          <img
            src={landingSmartBuildingImage}
            alt="Smart residential building connected to automated building systems"
            className="
              max-h-[500px]
              w-full
              max-w-[650px]
              object-contain
              object-right
            "
          />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;