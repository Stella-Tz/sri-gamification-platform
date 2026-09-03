// client/src/components/layout/Sidebar.tsx

import { NavLink } from "react-router-dom";

import { useAuth } from "../../app/providers/AuthProvider";

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

const getInitials = (
  firstName: string,
  lastName: string,
) => {
  const firstInitial =
    firstName.trim().charAt(0);

  const lastInitial =
    lastName.trim().charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
};

const getDisplayName = (
  firstName: string,
  lastName: string,
) => {
  return `${firstName.trim()} ${lastName.trim()}`.trim();
};

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside
      aria-label="Application sidebar"
      className="
        z-40
        hidden
        h-screen
        w-64
        overflow-y-auto
        border-r
        border-slate-200
        bg-white
        px-5
        py-6
        lg:sticky
        lg:top-0
        lg:block
      "
    >
      <div className="mb-6">
        <AppLogo variant="sidebar" />
      </div>

      {user ? (
        <div className="mb-10 flex flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-slate-700"
          >
            {getInitials(
              user.firstName,
              user.lastName,
            )}
          </div>

          <p className="mt-2 break-words text-base font-semibold text-slate-900">
            {getDisplayName(
              user.firstName,
              user.lastName,
            )}
          </p>
        </div>
      ) : null}

      <nav aria-label="Primary navigation">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
