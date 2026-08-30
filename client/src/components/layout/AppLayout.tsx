// client/src/components/layout/AppLayout.tsx

import { useLayoutEffect } from "react";

import {
  matchPath,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  CASE_STUDY_ROUTES,
  ROUTES,
} from "../../constants/routes";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  const { pathname } =
    useLocation();

  const isCaseStudyFlow =
    pathname.startsWith(
      `${ROUTES.caseStudy}/`,
    );

  const isAssessmentPage =
    Boolean(
      matchPath(
        {
          path:
            CASE_STUDY_ROUTES.assessment,
          end: true,
        },
        pathname,
      ),
    );

  /*
   * Building Information uses window scrolling.
   * Reset any previous window position when
   * entering Service Assessment.
   */
  useLayoutEffect(() => {
    if (!isAssessmentPage) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [
    isAssessmentPage,
    pathname,
  ]);

  /*
   * Service Assessment:
   *
   * - window scrolling on mobile/tablet
   * - viewport-bound layout with its own
   *   content scroll on desktop
   */
  if (isAssessmentPage) {
    return (
      <div
        className="
          min-h-screen
          min-w-0
          bg-white
          text-slate-900

          lg:fixed
          lg:inset-0
          lg:flex
          lg:min-h-0
          lg:flex-col
          lg:overflow-hidden
        "
      >
        <Topbar />

        <main
          className="
            min-h-[calc(100vh-64px)]
            min-w-0

            lg:min-h-0
            lg:flex-1
            lg:overflow-hidden
          "
        >
          <Outlet />
        </main>
      </div>
    );
  }

  /*
   * Building Information, Results,
   * Guided Analysis, Simulation and
   * the rest of the internal Case Study flow.
   *
   * These pages do not use the normal
   * desktop application Sidebar.
   */
  if (isCaseStudyFlow) {
    return (
      <div className="min-h-screen w-full min-w-0 max-w-full overflow-x-clip bg-white text-slate-900">
        <Topbar />

        <main className="min-h-[calc(100vh-64px)] w-full min-w-0 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    );
  }

  /*
   * Normal application shell:
   *
   * Dashboard
   * Courses
   * Case Study landing
   * Theory
   * Glossary
   */
  return (
    <div
      className="
        min-h-screen
        min-w-0
        bg-slate-100
        text-slate-900

        lg:grid
        lg:grid-cols-[16rem_minmax(0,1fr)]
      "
    >
      <Sidebar />

      <div className="min-w-0">
        <Topbar />

        <main className="min-h-[calc(100vh-64px)] min-w-0">
          <div className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;