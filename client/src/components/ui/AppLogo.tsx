import sriLogoMark from "../../assets/branding/sri-logo-mark.png";

type AppLogoVariant =
  | "topbar"
  | "sidebar";

type AppLogoProps = {
  variant?: AppLogoVariant;
  className?: string;
};

const gradientTextClass =
  "bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 bg-clip-text text-transparent";

const AppLogo = ({
  variant = "topbar",
  className = "",
}: AppLogoProps) => {
  const isSidebar =
    variant === "sidebar";

  return (
    <div
      className={`
        inline-flex
        items-center
        ${isSidebar ? "gap-3" : "gap-2.5"}
        ${className}
      `}
    >
      <img
        src={sriLogoMark}
        alt=""
        aria-hidden="true"
        className={`
          shrink-0
          object-contain
          ${
            isSidebar
              ? "h-11 w-11"
              : "h-10 w-10 sm:h-11 sm:w-11"
          }
        `}
      />

      {isSidebar ? (
        <div
          className="
            min-w-0
            text-lg
            font-extrabold
            leading-[1.05]
            tracking-tight
          "
        >
          <div className="whitespace-nowrap">
            <span className="text-blue-950">
              SRI{" "}
            </span>

            <span
              className={
                gradientTextClass
              }
            >
              Smart
            </span>
          </div>

          <span
            className={`
              block
              ${gradientTextClass}
            `}
          >
            Tool
          </span>
        </div>
      ) : (
        <div
          className="
            hidden
            whitespace-nowrap
            text-xl
            font-extrabold
            tracking-tight
            sm:block
          "
        >
          <span className="text-blue-950">
            SRI{" "}
          </span>

          <span className={gradientTextClass}>
            Smart Tool
          </span>
        </div>
      )}
    </div>
  );
};

export default AppLogo;