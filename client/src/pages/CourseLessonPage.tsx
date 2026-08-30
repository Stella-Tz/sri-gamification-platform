// client/src/pages/CourseLessonPage.tsx

import {
  useMemo,
  useState,
} from "react";

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

import {
  courseApi,
} from "../api/courseApi";

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
} from "../features/course/hooks/useCourseProgress";

import {
  buildCourseOverview,
} from "../features/course/utils/buildCourseOverview";

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
    replaceProgress,
  } = useCourseProgress();

  const [
    isCompletingLesson,
    setIsCompletingLesson,
  ] = useState(false);

  const [
    completionError,
    setCompletionError,
  ] = useState<string | null>(
    null,
  );

  const overview = useMemo(
    () =>
      buildCourseOverview(
        courseDefinition,
        progress,
      ),
    [progress],
  );

  const courseSection =
    overview.sections.find(
      (item) =>
        item.id === sectionId,
    ) ?? null;

  const lessonStep =
    courseSection?.steps.find(
      (step) =>
        step.type === "lesson" &&
        step.lessonId ===
          lessonId,
    ) ?? null;

  const quizStep =
    courseSection?.steps.find(
      (step) =>
        step.type === "quiz" &&
        step.lessonId ===
          lessonId,
    ) ?? null;

  const isLessonOpenable =
    lessonStep !== null &&
    lessonStep.status !==
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
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500 shadow-sm">
        Loading course progress...
      </div>
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
      if (isCompletingLesson) {
        return;
      }

      try {
        setIsCompletingLesson(
          true,
        );

        setCompletionError(
          null,
        );

        const nextProgress =
          await courseApi.completeLesson(
            lessonStep.id,
          );

        replaceProgress(
          nextProgress,
        );

        navigate(
          getCourseStepPath(
            quizStep,
          ),
        );
      } catch (error) {
        setCompletionError(
          error instanceof Error
            ? error.message
            : "Failed to complete lesson.",
        );
      } finally {
        setIsCompletingLesson(
          false,
        );
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
      {completionError ? (
        <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {completionError}
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