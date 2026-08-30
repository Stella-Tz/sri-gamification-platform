// client/src/pages/CourseLessonPage.tsx

import {
  useMemo,
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
    completeLesson,
  } = useCourseProgress();

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

  const isLessonCompleted =
    lessonStep?.status ===
    "completed";

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

  if (!isLessonOpenable) {
    return (
      <Navigate
        to={ROUTES.courses}
        replace
      />
    );
  }

  const handleContinueToQuiz =
    () => {
      if (!isLessonCompleted) {
        completeLesson(
          lesson.id,
        );
      }

      navigate(
        getCourseStepPath(
          quizStep,
        ),
      );
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

      <div className="mt-10 flex justify-end">
        <PrimaryButton
          type="button"
          onClick={
            handleContinueToQuiz
          }
          className="group w-full justify-center sm:w-auto"
        >
          <span className="inline-flex items-center gap-2">
            Continue to Quiz

            <ForwardArrowIcon />
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CourseLessonPage;