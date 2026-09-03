// client/src/components/layout/Topbar.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../app/providers/AuthProvider";
import { routeMeta } from "../../app/routes/routeMeta";
import { ROUTES } from "../../constants/routes";

import AppLogo from "../ui/AppLogo";

const navItems = [
  {
    label: "Dashboard",
    path: ROUTES.dashboard,
  },
  {
    label: "Courses",
    path: ROUTES.courses,
  },
  {
    label: "Case Study",
    path: ROUTES.caseStudy,
  },
  {
    label: "Theory",
    path: ROUTES.theory,
  },
  {
    label: "Glossary",
    path: ROUTES.glossary,
  },
] as const;

const getTopbarTitle = (
  pathname: string,
) => {
  if (
    pathname.startsWith(
      "/theory/sections",
    )
  ) {
    return "Theory Lessons";
  }

  if (
    pathname.startsWith(
      "/theory",
    )
  ) {
    return (
      routeMeta[ROUTES.theory]
        ?.topbarTitle ??
      "Theory Library"
    );
  }

  if (
    pathname.startsWith(
      "/courses",
    )
  ) {
    return (
      routeMeta[ROUTES.courses]
        ?.topbarTitle ??
      "Learning Platform"
    );
  }

  if (
    pathname.startsWith(
      "/case-study",
    )
  ) {
    return (
      routeMeta[ROUTES.caseStudy]
        ?.topbarTitle ??
      "Practical Assessment"
    );
  }

  return (
    routeMeta[pathname]
      ?.topbarTitle ??
    "SRI Smart Tool"
  );
};

const Topbar = () => {
  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);

  const { pathname } =
    useLocation();

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const topbarTitle =
    getTopbarTitle(pathname);

  /*
   * In the internal Case Study flow there is
   * no normal desktop Sidebar, so the menu
   * button remains visible at every width.
   *
   * On the rest of the application it is
   * hidden from the desktop breakpoint upward.
   */
  const isCaseStudyFlow =
    pathname.startsWith(
      `${ROUTES.caseStudy}/`,
    );

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [isMenuOpen]);

  const handleLogout =
    async () => {
      await logout();

      navigate(
        ROUTES.login,
      );
    };

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-30
          flex
          h-16
          w-full
          min-w-0
          max-w-full
          shrink-0
          items-center
          justify-between
          border-b
          border-slate-200
          bg-slate-100/95
          pl-2
          pr-4
          backdrop-blur
          sm:pl-3
          sm:pr-6
          lg:pl-4
          lg:pr-8
        "
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
          <button
            type="button"
            onClick={() =>
              setIsMenuOpen(true)
            }
            aria-label="Open navigation menu"
            aria-expanded={
              isMenuOpen
            }
            aria-controls="application-navigation-drawer"
            className={[
              "h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors duration-200 hover:bg-slate-200/70 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              isCaseStudyFlow
                ? "flex"
                : "flex lg:hidden",
            ].join(" ")}
          >
            <Menu
              size={22}
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </button>

          {topbarTitle ? (
            <p className="min-w-0 truncate text-sm font-medium text-slate-500">
              {topbarTitle}
            </p>
          ) : null}
        </div>

        <div className="ml-2 flex shrink-0 items-center">
          <button
            type="button"
            onClick={
              handleLogout
            }
            className="
              rounded-full
              border
              border-slate-200
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-slate-700
              shadow-sm
              transition-colors
              duration-200
              hover:bg-slate-50
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
            "
          >
            Logout
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() =>
              setIsMenuOpen(false)
            }
            className="absolute inset-0 bg-slate-900/35"
          />

          <aside
            id="application-navigation-drawer"
            aria-label="Application navigation"
            className="
              relative
              h-full
              w-[280px]
              max-w-[calc(100vw-3rem)]
              overflow-y-auto
              bg-white
              px-5
              py-5
              shadow-2xl
            "
          >
            <div className="flex items-start justify-between gap-4">
              <AppLogo variant="sidebar" />

              <button
                type="button"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition-colors
                  duration-200
                  hover:bg-slate-100
                  hover:text-blue-700
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-2
                "
                aria-label="Close navigation menu"
              >
                <X
                  size={20}
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
              </button>
            </div>

            <nav
              aria-label="Primary navigation"
              className="mt-8"
            >
              <ul className="space-y-2">
                {navItems.map(
                  (item) => (
                    <li
                      key={
                        item.path
                      }
                    >
                      <NavLink
                        to={
                          item.path
                        }
                        onClick={() =>
                          setIsMenuOpen(
                            false,
                          )
                        }
                        className={({
                          isActive,
                        }) =>
                          `block rounded-xl px-4 py-3 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                          }`
                        }
                      >
                        {
                          item.label
                        }
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default Topbar;