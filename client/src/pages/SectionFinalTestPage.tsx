// client/src/pages/SectionFinalTestPage.tsx

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

import {
  courseApi,
} from "../api/courseApi";

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
  useCourseProgress,
} from "../features/course/hooks/useCourseProgress";

import {
  useFinalTestSession,
} from "../features/course/hooks/useFinalTestSession";

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

  const session =
    useFinalTestSession({
      finalTestId:
        finalTestStep?.id ??
        "unavailable-final-test",

      enabled:
        Boolean(
          sectionDefinition &&
          finalTestStep,
        ),
    });


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
    !finalTestStep
  ) {
    return (
      <Navigate
        to={ROUTES.courses}
        replace
      />
    );
  }

  if (session.isLoading) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500 shadow-sm">
        Loading final test...
      </div>
    );
  }

  if (
    session.error &&
    !session.currentQuestion &&
    session.result ===
      "in-progress"
  ) {
    return (
      <FinalTestUnavailable
        message={session.error}
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
          onReview={() => {
            void session.retry();
          }}
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
            session.allowedMistakes
          }
          onBack={() =>
            navigate(
              ROUTES.courses,
            )
          }
          onRetry={() => {
            void session.retry();
          }}
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
  
  const handleSubmitAnswer =
    async () => {
      const nextAttempt =
        await session.submitAnswer();

      if (
        !nextAttempt ||
        nextAttempt.status ===
          "in-progress"
      ) {
        return;
      }

      /**
     * Refresh Course progress after the
     * final-test attempt is completed.
     */
      try {
        const nextProgress =
          await courseApi.getProgress();

        replaceProgress(
          nextProgress,
        );
      } catch (error) {
        console.error(
          "Failed to refresh course progress.",
          error,
        );
      }
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
          onSubmitAnswer={() => {
            void handleSubmitAnswer();
          }}
          onContinue={
            continueToNextQuestion
          }
        />
      </div>
    </div>
  );
};

type FinalTestUnavailableProps = {
  message?: string;
  onReturn: () => void;
};

const FinalTestUnavailable = ({
  message,
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
       {message ??
         "The final test could not be loaded."}
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