// client/src/app/routes/CaseStudyRouteGuard.tsx

import {
  useEffect,
  useMemo,
} from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  CASE_STUDY_ROUTES,
} from "../../constants/routes";

import {
  caseStudyMockData,
} from "../../features/caseStudy/data/caseStudyMockData";

import type {
  CaseStudyProgressRecord,
  CaseStudyRouteStage,
} from "../../features/caseStudy/progress/caseStudyProgress.types";

import {
  useCaseStudyProgress,
} from "../../features/caseStudy/progress/useCaseStudyProgress";

import {
  courseDefinition,
} from "../../features/course/data/courseDefinition";

import {
  useCourseProgress,
} from "../../features/course/hooks/useCourseProgress";

import {
  buildCourseOverview,
} from "../../features/course/utils/buildCourseOverview";

type CaseStudyRouteGuardProps = {
  stage: CaseStudyRouteStage;
};

const hasCurrentSimulationResult = (
  record:
    | CaseStudyProgressRecord
    | null,
): boolean => {
  return (
    record?.simulationResult != null
  );
};

const hasPermanentOfficialSimulationResult = (
  record:
    | CaseStudyProgressRecord
    | null,
): boolean => {
  return (
    record?.officialResult
      ?.simulationResult != null
  );
};

const canAccessCaseStudyStage = ({
  record,
  stage,
}: {
  record:
    | CaseStudyProgressRecord
    | null;

  stage:
    CaseStudyRouteStage;
}): boolean => {
  /*
   * Building Information is the first stage.
   * It is accessible as soon as the Case Study
   * has been unlocked through Course completion.
   */
  if (stage === "setup") {
    return true;
  }

  const hasCompletedSetup =
    record?.setup?.completed ===
    true;

  if (
    stage === "assessment"
  ) {
    return hasCompletedSetup;
  }

  const hasCompletedAssessment =
    hasCompletedSetup &&
    record?.assessment
      ?.completed === true &&
    record.baselineResult !==
      null;

  if (stage === "results") {
    return hasCompletedAssessment;
  }

  const hasCompletedResultsInvestigation =
    hasCompletedAssessment &&
    record
      ?.resultsInvestigation
      ?.completed === true;

  if (
    stage ===
    "guided-improvement-analysis"
  ) {
    return hasCompletedResultsInvestigation;
  }

  const hasCompletedGuidedImprovement =
    hasCompletedResultsInvestigation &&
    record
      ?.guidedImprovement
      ?.completed === true;

  if (
    stage ===
    "simulation-results"
  ) {
    const hasCompletedCurrentSimulation =
      hasCompletedGuidedImprovement &&
      hasCurrentSimulationResult(
        record,
      );

    /*
     * The Simulation Results page has two valid
     * read paths:
     *
     * 1. the current attempt has reached and
     *    completed its simulation, or
     * 2. the learner already has a permanent
     *    official result from the first completed
     *    Case Study attempt.
     *
     * The second path is important after
     * Practice Again, because the active practice
     * attempt intentionally clears its own
     * simulationResult while officialResult stays
     * available for review.
     */
    return (
      hasCompletedCurrentSimulation ||
      hasPermanentOfficialSimulationResult(
        record,
      )
    );
  }

  return false;
};

const CaseStudyRouteGuard = ({
  stage,
}: CaseStudyRouteGuardProps) => {
  /*
   * The practical Case Study is unlocked only
   * after all guided Course sections have been
   * completed.
   */
  const {
    progress: courseProgress,
  } = useCourseProgress();

  const courseOverview =
    useMemo(
      () =>
        buildCourseOverview(
          courseDefinition,
          courseProgress,
        ),
      [courseProgress],
    );

  const totalSections =
    courseOverview
      .sections.length;

  const completedSections =
    courseOverview
      .sections.filter(
        (section) =>
          section.status ===
          "completed",
      ).length;

  const isCaseStudyUnlocked =
    totalSections > 0 &&
    completedSections ===
      totalSections;

  /*
   * There is currently one Case Study.
   */
  const caseStudyId =
    caseStudyMockData[0]?.id ??
    null;

  const {
    getProgressForCaseStudy,
    getNextActionForCaseStudy,
    markStageVisited,
  } = useCaseStudyProgress();

  const progressRecord =
    caseStudyId
      ? getProgressForCaseStudy(
          caseStudyId,
        )
      : null;

  const canAccessStage =
    caseStudyId !== null &&
    isCaseStudyUnlocked &&
    canAccessCaseStudyStage({
      record:
        progressRecord,

      stage,
    });

  /*
   * A permanent official Simulation Result can
   * be reviewed while a new practice attempt is
   * still in progress.
   *
   * In that case, opening /simulation-results is
   * review navigation only. It must not change
   * lastVisitedStage for the active practice
   * attempt, because that would make the practice
   * record claim that the learner has already
   * visited its Simulation Results stage.
   */
  const isReviewingPermanentOfficialResult =
    stage ===
      "simulation-results" &&
    !hasCurrentSimulationResult(
      progressRecord,
    ) &&
    hasPermanentOfficialSimulationResult(
      progressRecord,
    );

  /*
   * Every successful active-attempt page visit is
   * recorded. Breadcrumb navigation therefore
   * remains non-destructive, while review of the
   * permanent official result is kept separate
   * from the active practice attempt.
   */
  useEffect(() => {
    if (
      !canAccessStage ||
      !caseStudyId ||
      isReviewingPermanentOfficialResult
    ) {
      return;
    }

    markStageVisited(
      caseStudyId,
      stage,
    );
  }, [
    canAccessStage,
    caseStudyId,
    isReviewingPermanentOfficialResult,
    markStageVisited,
    stage,
  ]);

  /*
   * A locked Case Study or a missing Case Study
   * definition returns the user to the Case
   * Study overview page.
   */
  if (
    !isCaseStudyUnlocked ||
    !caseStudyId
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
   * Opening a future URL manually redirects the
   * user to the first stage that still requires
   * attention in the current attempt.
   *
   * The one exception is Simulation Results:
   * once a permanent officialResult exists, that
   * result remains reviewable independently of a
   * later Practice Again attempt.
   *
   * Examples:
   *
   * /results without a completed assessment
   * → /assessment
   *
   * /guided-improvement-analysis without a
   * completed Results Investigation
   * → /results
   *
   * /simulation-results without either a current
   * completed simulation or a permanent official
   * result
   * → current attempt next action
   */
  if (!canAccessStage) {
    const fallbackAction =
      getNextActionForCaseStudy(
        caseStudyId,
      );

    return (
      <Navigate
        to={
          fallbackAction.path
        }
        replace
      />
    );
  }

  return <Outlet />;
};

export default CaseStudyRouteGuard;