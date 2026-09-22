// client/src/features/dashboard/hooks/useDashboard.ts

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  dashboardApi,
} from "../../../api/dashboardApi";

import type {
  CaseStudyProgress,
} from "../../caseStudy/progress/caseStudyProgress.types";

import type {
  UserCourseProgress,
} from "../../course/course.types";

import {
  buildDashboardViewModel,
} from "../dashboard.presentation";

import type {
  DashboardDataDto,
} from "../dashboard.types";

const getErrorMessage = (
  error: unknown,
): string => {
  return error instanceof Error
    ? error.message
    : "Failed to load dashboard data.";
};

export const useDashboard = (
  courseProgress:
    UserCourseProgress,

  caseStudyProgress:
    CaseStudyProgress | null,
) => {
  const [
    data,
    setData,
  ] = useState<
    DashboardDataDto | null
  >(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  const requestIdRef =
    useRef(0);

  useEffect(() => {
    const requestId =
      ++requestIdRef.current;

    const loadDashboard =
      async () => {
        try {
          setIsLoading(true);
          setError(null);

          const nextData =
            await dashboardApi
              .getDashboard();

          if (
            requestId !==
            requestIdRef.current
          ) {
            return;
          }

          setData(nextData);
        } catch (loadError) {
          if (
            requestId !==
            requestIdRef.current
          ) {
            return;
          }

          setData(null);

          setError(
            getErrorMessage(
              loadError,
            ),
          );
        } finally {
          if (
            requestId ===
            requestIdRef.current
          ) {
            setIsLoading(false);
          }
        }
      };

    void loadDashboard();

    return () => {
      requestIdRef.current += 1;
    };
  }, []);

  const dashboard =
    useMemo(
      () =>
        data &&
        caseStudyProgress
          ? buildDashboardViewModel(
              data,
              courseProgress,
              caseStudyProgress,
            )
          : null,
      [
        data,
        courseProgress,
        caseStudyProgress,
      ],
    );

  return {
    dashboard,
    isLoading,
    error,
  };
};