// client/src/pages/CourseLessonPage.tsx

import {
  ArrowLeft,
} from "lucide-react";

import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import ForwardArrowIcon from "../components/ui/ForwardArrowIcon";

import PrimaryButton from "../components/ui/PrimaryButton";

import RouteLoadingState from "../components/ui/RouteLoadingState";

import {
  ROUTES,
} from "../constants/routes";

import {
  getCourseStepPath,
} from "../features/course/course.routes";

import {
  courseDefinition,
} from "../features/course/data/courseDefinition";

import {
  useCourseProgress,
} from "../app/providers/CourseProgressProvider";

import TheoryLessonContent from "../features/theory/components/TheoryLessonContent";

import {
  useTheoryLesson,
} from "../features/theory/hooks/useTheoryLesson";

const CourseLessonPage = () => {
  const navigate =
    useNavigate();

  const {
    sectionId,
    lessonId,
  } = useParams<{
    sectionId: string;
    lessonId: string;
  }>();

  const {
    lesson,
    section,
    isFound,
  } = useTheoryLesson(
    sectionId,
    lessonId,
  );

  const {
    progress,

    isLoading:
      isProgressLoading,

    error:
      progressError,

    completeLesson,
    isCompletingLesson,
    actionError,
  } =
    useCourseProgress();

  /*
   * courseDefinition supplies only static
   * presentation/routing metadata.
   *
   * Availability comes directly from the
   * canonical backend progress DTO.
   */
  const courseSection =
    courseDefinition.sections.find(
      (item) =>
        item.id ===
        sectionId,
    ) ?? null;

  const lessonStep =
    courseSection?.steps.find(
      (step) =>
        step.type ===
          "lesson" &&
        step.lessonId ===
          lessonId,
    ) ?? null;

  const quizStep =
    courseSection?.steps.find(
      (step) =>
        step.type ===
          "quiz" &&
        step.lessonId ===
          lessonId,
    ) ?? null;

  const lessonStepProgress =
    lessonStep
      ? progress.steps.find(
          (item) =>
            item.stepId ===
            lessonStep.id,
        ) ?? null
      : null;

  const isLessonOpenable =
    lessonStepProgress !==
      null &&
    lessonStepProgress.status !==
      "locked";

  if (
    !sectionId ||
    !lessonId ||
    !isFound ||
    !lesson ||
    !section ||
    !lessonStep ||
    !quizStep
  ) {
    return (
      <Navigate
        to={ROUTES.courses}
        replace
      />
    );
  }

  if (isProgressLoading) {
    return (
      <RouteLoadingState
        label="Loading course progress..."
      />
    );
  }

  if (progressError) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm font-semibold text-red-700">
        {progressError}
      </div>
    );
  }

  if (!isLessonOpenable) {
    return (
      <Navigate
        to={ROUTES.courses}
        replace
      />
    );
  }

  const handleContinueToQuiz =
    async () => {
      if (
        isCompletingLesson
      ) {
        return;
      }

      try {
        /*
         * API orchestration and canonical
         * progress replacement live in the
         * shared Course progress hook.
         */
        await completeLesson(
          lessonStep.id,
        );

        navigate(
          getCourseStepPath(
            quizStep,
          ),
        );
      } catch {
        /*
         * actionError is owned by the hook
         * and rendered below.
         */
      }
    };

  return (
    <div className="mx-auto w-full max-w-6xl pb-16">
      <div className="mb-6">
        <Link
          to={ROUTES.courses}
          className="
            inline-flex
            min-h-9
            items-center
            gap-2
            rounded-md
            px-1
            py-1
            text-sm
            font-extrabold
            text-slate-500
            transition-colors
            duration-200
            hover:text-blue-700
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-blue-100
          "
        >
          <ArrowLeft
            size={17}
            aria-hidden="true"
          />

          Back to Course
        </Link>
      </div>

      <TheoryLessonContent
        lesson={lesson}
        sectionTitle={
          section.shortTitle ??
          section.title
        }
        sectionOrder={
          section.order
        }
      />

      {actionError ? (
        <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {actionError}
        </p>
      ) : null}

      <div className="mt-10 flex justify-end">
        <PrimaryButton
          type="button"
          onClick={() => {
            void handleContinueToQuiz();
          }}
          disabled={
            isCompletingLesson
          }
          className="group w-full justify-center sm:w-auto"
        >
          <span className="inline-flex items-center gap-2">
            {isCompletingLesson
              ? "Saving..."
              : "Continue to Quiz"}

            {!isCompletingLesson ? (
              <ForwardArrowIcon />
            ) : null}
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CourseLessonPage;
