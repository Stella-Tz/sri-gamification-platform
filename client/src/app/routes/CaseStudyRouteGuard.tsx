// client/src/app/routes/CaseStudyRouteGuard.tsx

import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useCourseProgress,
} from "../providers/CourseProgressProvider";

import {
  useCaseStudyProgress,
} from "../providers/CaseStudyProgressProvider";

import {
  CASE_STUDY_ROUTES,
} from "../../constants/routes";

import {
  getCaseStudyStagePath,
} from "../../features/caseStudy/progress/caseStudyProgress.presentation";

import type {
  CaseStudyRouteStage,
} from "../../features/caseStudy/progress/caseStudyProgress.types";

type CaseStudyRouteGuardProps = {
  stage:
    CaseStudyRouteStage;
};

const CaseStudyRouteGuard = ({
  stage,
}: CaseStudyRouteGuardProps) => {
  /*
   * Course completion controls whether the
   * practical Case Study itself is available.
   *
   * The backend Course progress DTO already
   * contains the canonical unlock decision.
   * The guard must not rebuild Course progress
   * from the frontend Course definition.
   */
  const {
    progress:
      courseProgress,

    isLoading:
      isCourseProgressLoading,
  } =
    useCourseProgress();

  /*
   * Case Study stage access comes from the
   * shared canonical backend progress.
   */
  const {
    progress,
    isLoading:
      isCaseStudyProgressLoading,
  } =
    useCaseStudyProgress();

  /*
   * Do not make access decisions while either
   * canonical progress source is still hydrating.
   *
   * In particular, the Course hook starts with
   * an empty presentation-safe progress object,
   * whose isCaseStudyUnlocked value is false.
   * Redirecting from that temporary state would
   * incorrectly send an already-unlocked learner
   * back to the Case Study overview.
   */
  if (
    isCourseProgressLoading ||
    (
      isCaseStudyProgressLoading &&
      progress === null
    )
  ) {
    return null;
  }

  /*
   * Backend Course progress is authoritative
   * for the Course -> Case Study unlock.
   */
  if (
    !courseProgress
      .isCaseStudyUnlocked
  ) {
    return (
      <Navigate
        to={
          CASE_STUDY_ROUTES.home
        }
        replace
      />
    );
  }

  /*
   * The Case Study backend returns a real
   * "not-started" DTO when no attempt exists.
   *
   * Therefore null here represents an unavailable
   * progress state rather than a valid
   * "not started" journey.
   */
  if (!progress) {
    return (
      <Navigate
        to={
          CASE_STUDY_ROUTES.home
        }
        replace
      />
    );
  }

  /*
   * Backend-only Case Study stage access.
   *
   * The frontend does NOT infer whether Setup,
   * Assessment, Results Investigation, Guided
   * Improvement or Simulation are complete.
   *
   * All of that has already been resolved into
   * progress.allowedStages by the backend.
   */
  const canAccessStage =
    progress
      .allowedStages
      .includes(
        stage,
      );

  if (!canAccessStage) {
    /*
     * The backend also determines nextStage.
     *
     * This helper performs only the
     * stage -> React route mapping.
     */
    const fallbackPath =
      getCaseStudyStagePath(
        progress.nextStage,
      );

    return (
      <Navigate
        to={fallbackPath}
        replace
      />
    );
  }

  return <Outlet />;
};

export default CaseStudyRouteGuard;
