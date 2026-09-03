// client/src/app/routes/ProtectedRoute.tsx

import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "../providers/AuthProvider";

import {
  CourseProgressProvider,
} from "../providers/CourseProgressProvider";

import {
  CaseStudyProgressProvider,
} from "../providers/CaseStudyProgressProvider";

import RouteLoadingState from "../../components/ui/RouteLoadingState";

import {
  ROUTES,
} from "../../constants/routes";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    isAuthLoading,
  } = useAuth();

  const location =
    useLocation();

  if (isAuthLoading) {
    return (
      <RouteLoadingState
        label="Checking session..."
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /*
   * Both progress providers live ABOVE the
   * protected route tree.
   *
   * This means route changes do not create
   * independent progress hook instances.
   *
   * CourseProgressProvider:
   * one canonical Course progress instance.
   *
   * CaseStudyProgressProvider:
   * one canonical Case Study progress instance.
   */
  return (
    <CourseProgressProvider>
      <CaseStudyProgressProvider>
        <Outlet />
      </CaseStudyProgressProvider>
    </CourseProgressProvider>
  );
};

export default ProtectedRoute;