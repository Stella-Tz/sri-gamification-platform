// client/src/pages/CoursePage.tsx

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";

import {
  ROUTES,
} from "../constants/routes";

import {
  caseStudyMockData,
} from "../features/caseStudy/data/caseStudyMockData";

import {
  useCaseStudyProgress,
} from "../features/caseStudy/progress/useCaseStudyProgress";

import CaseStudyStageCard from "../features/course/components/CaseStudyStageCard";
import CourseProgressCard from "../features/course/components/CourseProgressCard";
import CourseSectionCard from "../features/course/components/CourseSectionCard";

import {
  getCourseStepPath,
} from "../features/course/course.routes";

import type {
  CourseOverviewView,
  CourseSectionStatus,
  CourseStepView,
} from "../features/course/course.types";

import {
  courseDefinition,
} from "../features/course/data/courseDefinition";

import {
  useCourseProgress,
} from "../features/course/hooks/useCourseProgress";

import {
  buildCourseOverview,
} from "../features/course/utils/buildCourseOverview";

import type {
  TheorySectionId,
} from "../features/theory/types/theory.types";

/**
 * Initially, every section that has not yet been
 * completed is expanded.
 *
 * Completed sections start collapsed but may still
 * be opened manually for review.
 */
const getInitialExpandedSectionIds = (
  overview: CourseOverviewView,
): Set<TheorySectionId> => {
  return new Set(
    overview.sections
      .filter(
        (section) =>
          section.status !==
          "completed",
      )
      .map(
        (section) =>
          section.id,
      ),
  );
};

/**
 * Stores the current status of every section so
 * status transitions can be detected after progress
 * changes.
 */
const createSectionStatusMap = (
  overview: CourseOverviewView,
): Map<
  TheorySectionId,
  CourseSectionStatus
> => {
  return new Map(
    overview.sections.map(
      (section): [
        TheorySectionId,
        CourseSectionStatus,
      ] => [
        section.id,
        section.status,
      ],
    ),
  );
};

const CoursePage = () => {
  const navigate =
    useNavigate();

  const {
    progress,
  } = useCourseProgress();

  const {
    getProgressForCaseStudy,
  } = useCaseStudyProgress();

  const overview = useMemo(
    () =>
      buildCourseOverview(
        courseDefinition,
        progress,
      ),
    [progress],
  );

  /*
   * There is currently one practical Case Study
   * in the learning path.
   */
  const caseStudy =
    caseStudyMockData[0] ??
    null;

  const caseStudyRecord =
    caseStudy
      ? getProgressForCaseStudy(
          caseStudy.id,
        )
      : null;

  /*
   * Case Study completion is a durable learning
   * achievement.
   *
   * Practice Again resets the current attempt,
   * but does not remove this completion.
   */
  const hasCompletedCaseStudy =
    caseStudyRecord
      ?.completion != null;

  const [
    expandedSectionIds,
    setExpandedSectionIds,
  ] = useState<
    Set<TheorySectionId>
  >(() =>
    getInitialExpandedSectionIds(
      overview,
    ),
  );

  const previousSectionStatusesRef =
    useRef<
      Map<
        TheorySectionId,
        CourseSectionStatus
      >
    >(
      createSectionStatusMap(
        overview,
      ),
    );

  /**
   * Synchronises expansion state only when a
   * section's progress status changes.
   *
   * - A newly completed section closes.
   * - A newly current section opens.
   * - Manual Show / Hide choices remain untouched
   *   while the section status stays the same.
   */
  useEffect(() => {
    const previousStatuses =
      previousSectionStatusesRef.current;

    setExpandedSectionIds(
      (currentExpandedIds) => {
        const nextExpandedIds =
          new Set(
            currentExpandedIds,
          );

        let hasChanged = false;

        overview.sections.forEach(
          (section) => {
            const previousStatus =
              previousStatuses.get(
                section.id,
              );

            const becameCompleted =
              section.status ===
                "completed" &&
              previousStatus !==
                "completed";

            const becameCurrent =
              section.status ===
                "current" &&
              previousStatus !==
                "current";

            if (becameCompleted) {
              const wasRemoved =
                nextExpandedIds.delete(
                  section.id,
                );

              if (wasRemoved) {
                hasChanged = true;
              }

              return;
            }

            if (
              becameCurrent &&
              !nextExpandedIds.has(
                section.id,
              )
            ) {
              nextExpandedIds.add(
                section.id,
              );

              hasChanged = true;
            }
          },
        );

        return hasChanged
          ? nextExpandedIds
          : currentExpandedIds;
      },
    );

    previousSectionStatusesRef.current =
      createSectionStatusMap(
        overview,
      );
  }, [overview]);

  const openStep = (
    step: CourseStepView,
  ) => {
    if (
      step.status === "locked"
    ) {
      return;
    }

    navigate(
      getCourseStepPath(step),
    );
  };

  const continueLearning = () => {
    if (
      !overview.currentStep
    ) {
      return;
    }

    openStep(
      overview.currentStep,
    );
  };

  const toggleSection = (
    sectionId: TheorySectionId,
  ) => {
    setExpandedSectionIds(
      (currentExpandedIds) => {
        const nextExpandedIds =
          new Set(
            currentExpandedIds,
          );

        if (
          nextExpandedIds.has(
            sectionId,
          )
        ) {
          nextExpandedIds.delete(
            sectionId,
          );
        } else {
          nextExpandedIds.add(
            sectionId,
          );
        }

        return nextExpandedIds;
      },
    );
  };

  const openCaseStudy = () => {
    if (
      !overview.isCaseStudyUnlocked
    ) {
      return;
    }

    navigate(
      ROUTES.caseStudy,
    );
  };

  return (
    <div className="pb-16">
      <PageHeader
        title="Courses"
        subtitle="Complete each lesson, learning quiz and final section test to progress through the SRI course."
      />

      <div className="mt-8">
        <CourseProgressCard
          overview={overview}
          onContinue={
            continueLearning
          }
        />
      </div>

      <div className="mt-10 space-y-6">
        {overview.sections.map(
          (section) => (
            <CourseSectionCard
              key={section.id}
              section={section}
              expanded={
                expandedSectionIds.has(
                  section.id,
                )
              }
              onToggle={() =>
                toggleSection(
                  section.id,
                )
              }
              onOpenStep={
                openStep
              }
            />
          ),
        )}
      </div>

      <div className="mt-8">
        <CaseStudyStageCard
          unlocked={
            overview.isCaseStudyUnlocked
          }
          completed={
            hasCompletedCaseStudy
          }
          completedSections={
            overview.completedSections
          }
          totalSections={
            overview.totalSections
          }
          onOpen={
            openCaseStudy
          }
        />
      </div>
    </div>
  );
};

export default CoursePage;