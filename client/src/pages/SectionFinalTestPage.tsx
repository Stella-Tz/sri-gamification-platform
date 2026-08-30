// client/src/pages/SectionFinalTestPage.tsx

import {
  useEffect,
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

import FinalTestFailedCard from "../features/course/components/FinalTestFailedCard";
import FinalTestQuestionCard from "../features/course/components/FinalTestQuestionCard";
import SectionCompletedCard from "../features/course/components/SectionCompletedCard";

import {
  courseDefinition,
} from "../features/course/data/courseDefinition";

import {
  getSectionFinalTestQuestionPool,
} from "../features/course/data/questions";

import {
  useCourseProgress,
} from "../features/course/hooks/useCourseProgress";

import {
  useFinalTestSession,
} from "../features/course/hooks/useFinalTestSession";

import {
  createFinalTestAttempt,
} from "../features/course/utils/assessment.utils";

import {
  buildCourseOverview,
} from "../features/course/utils/buildCourseOverview";

const SectionFinalTestPage = () => {
  const navigate =
    useNavigate();

  const pageTopRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const {
    sectionId,
    finalTestId,
  } = useParams<{
    sectionId: string;
    finalTestId: string;
  }>();

  const {
    progress,
    recordFinalTestAttempt,
  } = useCourseProgress();

  const overview = useMemo(
    () =>
      buildCourseOverview(
        courseDefinition,
        progress,
      ),
    [progress],
  );

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

  const finalTestStep =
    useMemo(() => {
      if (
        !sectionDefinition ||
        !finalTestId
      ) {
        return null;
      }

      const step =
        sectionDefinition.steps.find(
          (candidate) =>
            candidate.type ===
              "final-test" &&
            candidate.id ===
              finalTestId,
        );

      return step?.type ===
        "final-test"
        ? step
        : null;
    }, [
      finalTestId,
      sectionDefinition,
    ]);

  const sectionView =
    useMemo(() => {
      if (!sectionDefinition) {
        return null;
      }

      return (
        overview.sections.find(
          (section) =>
            section.id ===
            sectionDefinition.id,
        ) ?? null
      );
    }, [
      overview.sections,
      sectionDefinition,
    ]);

  const finalTestStepView =
    useMemo(() => {
      if (
        !sectionView ||
        !finalTestStep
      ) {
        return null;
      }

      const step =
        sectionView.steps.find(
          (candidate) =>
            candidate.id ===
            finalTestStep.id,
        );

      return step?.type ===
        "final-test"
        ? step
        : null;
    }, [
      finalTestStep,
      sectionView,
    ]);

  const questionPool =
    useMemo(() => {
      if (!sectionDefinition) {
        return [];
      }

      return getSectionFinalTestQuestionPool(
        sectionDefinition.id,
      );
    }, [sectionDefinition]);

  const session =
    useFinalTestSession({
      finalTestId:
        finalTestStep?.id ??
        "unavailable-final-test",

      questionPool,

      allowedMistakes:
        finalTestStep
          ?.allowedMistakes ?? 0,
    });

  const recordedSessionIdRef =
    useRef<string | null>(
      null,
    );

  useEffect(() => {
    if (
      !sectionDefinition ||
      !finalTestStep ||
      session.result ===
        "in-progress" ||
      recordedSessionIdRef.current ===
        session.sessionId
    ) {
      return;
    }

    recordedSessionIdRef.current =
      session.sessionId;

    recordFinalTestAttempt(
      createFinalTestAttempt({
        id: session.sessionId,

        sectionId:
          sectionDefinition.id,

        finalTestId:
          finalTestStep.id,

        correctCount:
          session.correctCount,

        wrongCount:
          session.wrongCount,

        totalQuestions:
          session.totalQuestions,

        passed:
          session.result ===
          "passed",
      }),
    );
  }, [
    finalTestStep,
    recordFinalTestAttempt,
    sectionDefinition,

    session.correctCount,
    session.result,
    session.sessionId,
    session.totalQuestions,
    session.wrongCount,
  ]);

  const nextSectionDefinition =
    useMemo(() => {
      if (!sectionDefinition) {
        return null;
      }

      const currentIndex =
        courseDefinition.sections.findIndex(
          (section) =>
            section.id ===
            sectionDefinition.id,
        );

      if (currentIndex < 0) {
        return null;
      }

      return (
        courseDefinition.sections[
          currentIndex + 1
        ] ?? null
      );
    }, [sectionDefinition]);

  if (
    !sectionDefinition ||
    !finalTestStep ||
    !sectionView ||
    !finalTestStepView
  ) {
    return (
      <Navigate
        to={ROUTES.courses}
        replace
      />
    );
  }

  if (
    finalTestStepView.status ===
    "locked"
  ) {
    return (
      <Navigate
        to={ROUTES.courses}
        replace
      />
    );
  }

  if (
    questionPool.length === 0
  ) {
    return (
      <FinalTestUnavailable
        onReturn={() =>
          navigate(
            ROUTES.courses,
          )
        }
      />
    );
  }

  if (
    session.result ===
    "passed"
  ) {
    const completionDescription =
      nextSectionDefinition
        ? `${nextSectionDefinition.shortTitle} is now available.`
        : "You completed the final course section. The practical case study is now unlocked.";

    return (
      <div className="py-4 sm:py-6">
        <SectionCompletedCard
          sectionTitle={
            sectionDefinition.title
          }
          achievement={
            sectionDefinition.achievement
          }
          description={
            completionDescription
          }
          accuracyPercentage={
            session.accuracyPercentage
          }
          correctCount={
            session.correctCount
          }
          totalQuestions={
            session.totalQuestions
          }
          onContinue={() => {
            navigate(
              ROUTES.courses,
            );
          }}
          onReview={
            session.retry
          }
        />
      </div>
    );
  }

  if (
    session.result ===
    "failed"
  ) {
    return (
      <div className="py-4 sm:py-6">
        <FinalTestFailedCard
          sectionTitle={
            sectionDefinition.title
          }
          correctCount={
            session.correctCount
          }
          wrongCount={
            session.wrongCount
          }
          answeredCount={
            session.answeredCount
          }
          totalQuestions={
            session.totalQuestions
          }
          allowedMistakes={
            finalTestStep.allowedMistakes
          }
          onBack={() =>
            navigate(
              ROUTES.courses,
            )
          }
          onRetry={
            session.retry
          }
        />
      </div>
    );
  }

  if (
    !session.currentQuestion
  ) {
    return (
      <FinalTestUnavailable
        onReturn={() =>
          navigate(
            ROUTES.courses,
          )
        }
      />
    );
  }

  const scrollToPageTop =
    () => {
      pageTopRef.current
        ?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
    };

  const continueToNextQuestion =
    () => {
      if (
        !session.isSubmitted ||
        session.result !==
          "in-progress"
      ) {
        return;
      }

      scrollToPageTop();
      session.goToNextQuestion();
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
        <FinalTestQuestionCard
          key={
            session.currentQuestion.id
          }
          eyebrow={`${sectionDefinition.shortTitle} · Final Section Test`}
          currentQuestionNumber={
            session.currentQuestionNumber
          }
          totalQuestions={
            session.totalQuestions
          }
          question={
            session.currentQuestion
          }
          selectedOptionId={
            session.selectedOptionId
          }
          feedback={
            session.feedback
          }
          isSubmitted={
            session.isSubmitted
          }
          remainingMistakes={
            session.remainingMistakes
          }
          onSelectOption={
            session.selectOption
          }
          onSubmitAnswer={
            session.submitAnswer
          }
          onContinue={
            continueToNextQuestion
          }
        />
      </div>
    </div>
  );
};

type FinalTestUnavailableProps = {
  onReturn: () => void;
};

const FinalTestUnavailable = ({
  onReturn,
}: FinalTestUnavailableProps) => {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-sm sm:p-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
        <AlertTriangle
          size={27}
          aria-hidden="true"
        />
      </div>

      <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-blue-950">
        Final Test Unavailable
      </h1>

      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
        No question pool has been
        registered for this section.
        Verify the corresponding entry
        in the course question
        registry.
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

export default SectionFinalTestPage;