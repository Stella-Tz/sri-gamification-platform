// client/src/features/landing/components/LandingHeader.tsx

import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

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
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <Link
          to={ROUTES.landing}
          className="inline-flex items-center gap-3 text-blue-950"
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-blue-200/70
              bg-white/20
              text-blue-700
              backdrop-blur-md
            "
          >
            <Building2
              className="h-6 w-6"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </div>

          <span className="text-xl font-extrabold tracking-tight">
            SRI Smart Tool
          </span>
        </Link>

        <div className="flex items-center gap-3">
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
              px-5
              text-sm
              font-bold
              text-blue-900
              backdrop-blur-md
              transition
              hover:border-blue-400
              hover:bg-white/35
            "
          >
            Log in
          </Link>

          <Link
            to={ROUTES.register}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              px-5
              text-sm
              font-bold
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
            "
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;