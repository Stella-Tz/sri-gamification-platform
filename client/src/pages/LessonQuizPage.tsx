// client/src/pages/LessonQuizPage.tsx

import {
  useMemo,
  useRef,
} from "react";

import {
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import PrimaryButton from "../components/ui/PrimaryButton";

import {
  ROUTES,
} from "../constants/routes";

import AssessmentQuestionCard from "../features/course/components/AssessmentQuestionCard";

import {
  getCourseStepPath,
} from "../features/course/course.routes";

import type {
  CourseStepDefinition,
} from "../features/course/course.types";

import {
  courseDefinition,
} from "../features/course/data/courseDefinition";


import {
  useCourseProgress,
} from "../features/course/hooks/useCourseProgress";

import {
  useLessonQuizSession,
} from "../features/course/hooks/useLessonQuizSession";



const LessonQuizPage = () => {
  const navigate =
    useNavigate();

  const pageTopRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const {
    sectionId,
    quizId,
  } = useParams<{
    sectionId: string;
    quizId: string;
  }>();

  const {
    replaceProgress,
  } = useCourseProgress();



  const sectionDefinition =
    useMemo(() => {
      if (!sectionId) {
        return null;
      }

      return (
        courseDefinition.sections.find(
          (section) =>
            section.id ===
            sectionId,
        ) ?? null
      );
    }, [sectionId]);

  const quizStep =
    useMemo(() => {
      if (
        !sectionDefinition ||
        !quizId
      ) {
        return null;
      }

      const step =
        sectionDefinition.steps.find(
          (candidate) =>
            candidate.id ===
              quizId &&
            candidate.type ===
              "quiz",
        );

      return step?.type ===
        "quiz"
        ? step
        : null;
    }, [
      quizId,
      sectionDefinition,
    ]);

  const lessonStep =
    useMemo(() => {
      if (
        !sectionDefinition ||
        !quizStep
      ) {
        return null;
      }

      const step =
        sectionDefinition.steps.find(
          (candidate) =>
            candidate.type ===
              "lesson" &&
            candidate.lessonId ===
              quizStep.lessonId,
        );

      return step?.type ===
        "lesson"
        ? step
        : null;
    }, [
      quizStep,
      sectionDefinition,
    ]);



  const nextStep =
    useMemo<CourseStepDefinition | null>(
      () => {
        if (!quizStep) {
          return null;
        }

        const allSteps =
          courseDefinition.sections.flatMap(
            (section) =>
              section.steps,
          );

        const currentStepIndex =
          allSteps.findIndex(
            (step) =>
              step.id ===
                quizStep.id &&
              step.sectionId ===
                quizStep.sectionId,
          );

        if (
          currentStepIndex < 0
        ) {
          return null;
        }

        return (
          allSteps[
            currentStepIndex + 1
          ] ?? null
        );
      },
      [quizStep],
    );

  const quizSession =
    useLessonQuizSession({
      quizId:
        quizStep?.id ??
        "unavailable-quiz",

      enabled:
        Boolean(
          quizStep &&
          lessonStep,
        ),
    });

  const {
    questions,

    currentQuestion,
    currentQuestionNumber,
    totalQuestions,

    selectedOptionId,

    correctOptionId,
    explanation,

    feedback,

    isSubmitted,
    isLastQuestion,

    isLoading,
    isSubmittingAnswer,
    isCompletingQuiz,
    error,

    selectOption,
    submitAnswer,
    goToNextQuestion,

    completeQuiz:
      completeQuizOnServer,
  } = quizSession;

  if (
    !sectionDefinition ||
    !quizStep ||
    !lessonStep
  ) {
    return (
      <Navigate
        to={ROUTES.courses}
        replace
      />
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500 shadow-sm">
        Loading quiz...
      </div>
    );
  }


  if (
    questions.length === 0 ||
    !currentQuestion
  ) {
    return (
      <QuizContentUnavailable
        onReturn={() =>
          navigate(
            ROUTES.courses,
          )
        }
      />
    );
  }

  const finalActionLabel =
    getFinalActionLabel(
      nextStep,
    );

  const scrollToPageTop =
    () => {
      pageTopRef.current
        ?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
    };

  const continueFromQuestion =
   async () => {
      if (!isSubmitted) {
        return;
      }

      if (!isLastQuestion) {
        /*
         * Scroll while the current page-top element
         * is still mounted. React then updates the
         * displayed question before the next paint.
         */
        scrollToPageTop();
        goToNextQuestion();

        return;
      }

      try {
        const nextProgress =
          await completeQuizOnServer();

        replaceProgress(
          nextProgress,
        );
      } catch {
        return;
      }

      if (nextStep) {
        navigate(
          getCourseStepPath(
            nextStep,
          ),
        );

        return;
      }

      navigate(
        ROUTES.courses,
      );
    };

  return (
    <div
      ref={pageTopRef}
      className="mx-auto w-full max-w-5xl pb-16"
    >
      <button
        type="button"
        onClick={() =>
          navigate(
            ROUTES.courses,
          )
        }
        className="
          inline-flex
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
      </button>

      <div className="mt-6">
        <AssessmentQuestionCard
          key={currentQuestion.id}

          eyebrow={`${lessonStep.title} · Learning Quiz`}

          currentQuestionNumber={
            currentQuestionNumber
          }

          totalQuestions={
            totalQuestions
          }

          question={
            currentQuestion
          }

          selectedOptionId={
            selectedOptionId
          }

          correctOptionId={
            correctOptionId
          }

          explanation={
            explanation
          }

          feedback={feedback}

          isLastQuestion={
            isLastQuestion
          }

          isSubmittingAnswer={
            isSubmittingAnswer
          }

          isContinuing={
            isCompletingQuiz
          }

          onSelectOption={
            selectOption
          }

          onSubmitAnswer={() => {
            void submitAnswer();
          }}

          onContinue={() => {
            void continueFromQuestion();
          }}

          finalActionLabel={
            finalActionLabel
          }
        />
        {error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
};

type QuizContentUnavailableProps = {
  onReturn: () => void;
};

const QuizContentUnavailable = ({
  onReturn,
}: QuizContentUnavailableProps) => {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-sm sm:p-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
        <AlertTriangle
          size={27}
          aria-hidden="true"
        />
      </div>

      <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-blue-950">
        Quiz Content Unavailable
      </h1>

      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
        No questions have been
        registered for this lesson
        quiz. Return to the course
        overview and verify the
        corresponding question-bank
        entry.
      </p>

      <div className="mt-6 flex justify-center">
        <PrimaryButton
          type="button"
          onClick={onReturn}
        >
          Return to Course
        </PrimaryButton>
      </div>
    </section>
  );
};

const getFinalActionLabel = (
  nextStep:
    | CourseStepDefinition
    | null,
): string => {
  if (!nextStep) {
    return "Return to Course";
  }

  if (
    nextStep.type ===
    "final-test"
  ) {
    return "Continue to Final Test";
  }

  if (
    nextStep.type ===
    "lesson"
  ) {
    return "Continue to Next Lesson";
  }

  return "Continue";
};

export default LessonQuizPage;