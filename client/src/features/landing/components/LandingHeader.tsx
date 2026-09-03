// client/src/features/landing/components/LandingHeader.tsx

import { Link } from "react-router-dom";

import AppLogo from "../../../components/ui/AppLogo";
import PrimaryLink from "../../../components/ui/PrimaryLink";
import { ROUTES } from "../../../constants/routes";

const LandingHeader = () => {
  return (
    <header
      className="
        relative
        z-30
        border-b
        border-white/40
        bg-white/15
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-20
          w-full
          items-center
          justify-between
          px-3
          sm:px-6
          lg:px-10
          xl:px-12
          2xl:px-16
        "
      >
        <Link
          to={ROUTES.landing}
          aria-label="SRI Smart Tool home"
          className="
            inline-flex
            min-w-0
            items-center
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-blue-100
          "
        >
          <AppLogo variant="topbar" />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <Link
            to={ROUTES.login}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              rounded-xl
              border
              border-blue-300/70
              bg-white/15
              px-3
              text-sm
              font-bold
              text-blue-900
              backdrop-blur-md
              transition
              hover:border-blue-400
              hover:bg-white/35
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-blue-100
              sm:px-5
            "
          >
            Log in
          </Link>

          <PrimaryLink to={ROUTES.register}>
            Sign up
          </PrimaryLink>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;