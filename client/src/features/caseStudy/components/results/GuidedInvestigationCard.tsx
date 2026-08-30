// client/src/features/caseStudy/components/results/GuidedInvestigationCard.tsx

import {
  AlertCircle,
  Check,
  CheckCircle2,
  Lightbulb,
  Network,
  PanelTop,
  Settings,
  Target,
  UsersRound,
  XCircle,
  Zap,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useNavigate } from "react-router-dom";

import ForwardArrowIcon from "../../../../components/ui/ForwardArrowIcon";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

import { CASE_STUDY_ROUTES } from "../../../../constants/routes";

import investigationCompleteBuildingsImage from "../../../../assets/caseStudy/investigation-complete-buildings.png";
import investigationCompleteCheckImage from "../../../../assets/caseStudy/investigation-complete-check.png";
import keyFunctionalitiesImpactCategoriesImage from "../../../../assets/caseStudy/key_functionalites_impact_categories.png";

import type {
  BuildingType,
  CaseStudyDetails,
  CaseStudySubmitResult,
  ClimateZone,
  DomainPresence,
  GuidedInvestigationFindings,
  GuidedInvestigationQuestion,
  OfficialAssessmentMethod,
  ServiceAnswer,
  SriService,
  TechnicalDomainName,
} from "../../types/caseStudy.types";

import type {
  CaseStudyResultsInvestigationAnswer,
  CaseStudyResultsInvestigationProgress,
} from "../../progress/caseStudyProgress.types";

type GuidedImprovementNavigationState = {
  result?: CaseStudySubmitResult;
  caseStudy?: CaseStudyDetails;

  answers?: Record<
    string,
    ServiceAnswer
  >;

  assessmentMethod?: OfficialAssessmentMethod;

  serviceApplicability?: Record<
    string,
    boolean
  >;

  domainPresence?: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  buildingType?: BuildingType;
  climateZone?: ClimateZone;

  /*
   * Fully resolved Catalogue A or B.
   */
  services?: readonly SriService[];
};


type GuidedInvestigationCardProps = {
  questions:
    readonly GuidedInvestigationQuestion[];

  findings:
    GuidedInvestigationFindings;

  navigationState?:
    GuidedImprovementNavigationState;

  initialProgress?:
    | CaseStudyResultsInvestigationProgress
    | null;

  onProgressChange?: (
    progress:
      CaseStudyResultsInvestigationProgress,
  ) => void;

  onCompleted?: () => void;
  onStepChange?: () => void;
};

type FeedbackState =
  | "correct"
  | "wrong"
  | "empty"
  | null;

const questionPathLabelsById:
  Readonly<Record<string, string>> = {
    "lowest-key-functionality":
      "Key Functionality",

    "related-impact-criteria":
      "Impact Criteria",

    "lowest-impact-within-functionality":
      "Lowest Impact",

    "lowest-domain-for-impact":
      "Technical Domains",

    "candidate-services-for-improvement":
      "Candidate Services",
  };

const formatList = (
  values: readonly string[],
): string => {
  if (values.length === 0) return "";

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values
    .slice(0, -1)
    .join(", ")}, and ${values[values.length - 1]}`;
};

const getWrongFeedback = (
  questionId: string,
  findings: GuidedInvestigationFindings,
): string => {
  const domainLabel = formatList(
    findings.weakestTechnicalDomains,
  );

  switch (questionId) {
    case "lowest-key-functionality":
      return "Not quite. Compare the three key functionality scores and identify the one with the lowest score.";

    case "related-impact-criteria":
      return `Not quite. Use the relationship shown above and select all impact criteria associated with ${findings.weakestKeyFunctionality}.`;

    case "lowest-impact-within-functionality":
      return `Not quite. Compare the scores of the impact criteria associated with ${findings.weakestKeyFunctionality} and identify the lowest-scoring one.`;

    case "lowest-domain-for-impact":
      return `Not quite. In the detailed score matrix, look under ${findings.lowestImpactCriterion} and identify all technical domains that share the lowest score.`;

    case "candidate-services-for-improvement":
      return `Not quite. Review ${domainLabel} in the Assessed Services by Domain card. Look for services that affect ${findings.lowestImpactCriterion} and are not already at their maximum functionality level.`;

    default:
      return "Not quite. Review the relevant assessment results and try again.";
  }
};

const getInvestigationAnswer = (
  answers:
    readonly CaseStudyResultsInvestigationAnswer[],

  questionId: string,
): CaseStudyResultsInvestigationAnswer | null => {
  return (
    answers.find(
      (answer) =>
        answer.questionId ===
        questionId,
    ) ?? null
  );
};

const upsertInvestigationAnswer = (
  answers:
    readonly CaseStudyResultsInvestigationAnswer[],

  nextAnswer:
    CaseStudyResultsInvestigationAnswer,
): CaseStudyResultsInvestigationAnswer[] => {
  return [
    ...answers.filter(
      (answer) =>
        answer.questionId !==
        nextAnswer.questionId,
    ),

    nextAnswer,
  ];
};

const getSafeInvestigationIndex = (
  questions:
    readonly GuidedInvestigationQuestion[],

  requestedIndex: number,
): number => {
  if (questions.length === 0) {
    return 0;
  }

  return Math.min(
    Math.max(
      requestedIndex,
      0,
    ),

    questions.length - 1,
  );
};

const GuidedInvestigationCard = ({
  questions,
  findings,
  navigationState,

  initialProgress = null,

  onProgressChange,
  onCompleted,
  onStepChange,
}: GuidedInvestigationCardProps) => {
  const initialIndex =
    getSafeInvestigationIndex(
      questions,

      initialProgress
        ?.currentIndex ?? 0,
    );

  const initialAnswers =
    initialProgress
      ?.answers ?? [];

  const initialQuestion =
    questions[
      initialIndex
    ] ?? null;

  const initialQuestionAnswer =
    initialQuestion
      ? getInvestigationAnswer(
          initialAnswers,
          initialQuestion.id,
        )
      : null;

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(
    () => initialIndex,
  );

  const [
    answers,
    setAnswers,
  ] = useState<
    CaseStudyResultsInvestigationAnswer[]
  >(
    () => [
      ...initialAnswers,
    ],
  );

  const [
    selectedAnswers,
    setSelectedAnswers,
  ] = useState<string[]>(
    () =>
      initialQuestionAnswer
        ?.selectedAnswers ?? [],
  );

  const [
    feedback,
    setFeedback,
  ] = useState<FeedbackState>(
    () =>
      initialQuestionAnswer
        ?.feedback ?? null,
  );

  const [
    isCompleted,
    setIsCompleted,
  ] = useState(
    () =>
      initialProgress
        ?.completed === true,
  );

  if (questions.length === 0) {
    return (
      <GuidedInvestigationErrorState />
    );
  }

  const currentQuestion =
    questions[
      currentIndex
    ];

  if (!currentQuestion) {
    return (
      <GuidedInvestigationErrorState />
    );
  }

  const currentSavedAnswer =
    getInvestigationAnswer(
      answers,
      currentQuestion.id,
    );

  const isLastQuestion =
    currentIndex ===
    questions.length - 1;

  const emitProgress = ({
    nextCurrentIndex =
      currentIndex,

    nextAnswers =
      answers,

    nextCompleted =
      isCompleted,
  }: {
    nextCurrentIndex?: number;

    nextAnswers?:
      CaseStudyResultsInvestigationAnswer[];

    nextCompleted?: boolean;
  }) => {
    onProgressChange?.({
      currentIndex:
        nextCurrentIndex,

      answers:
        nextAnswers,

      completed:
        nextCompleted,
    });
  };

  /*
   * Selecting an option changes only the local
   * draft. The answer is persisted after the
   * user explicitly presses Check Answer.
   */
  const handleSingleChoice = (
    value: string,
  ) => {
    const nextSelectedAnswers =
      [value];

    setSelectedAnswers(
      nextSelectedAnswers,
    );

    setFeedback(null);
  };

  const handleMultipleChoice = (
    value: string,
  ) => {
    const nextSelectedAnswers =
      selectedAnswers.includes(
        value,
      )
        ? selectedAnswers.filter(
            (answer) =>
              answer !== value,
          )
        : [
            ...selectedAnswers,
            value,
          ];

    setSelectedAnswers(
      nextSelectedAnswers,
    );

    setFeedback(null);
  };

  const handleCheckAnswer = () => {
    if (
      selectedAnswers.length === 0
    ) {
      /*
       * An empty check only updates the local
       * feedback. It is not a submitted answer
       * and therefore is not persisted.
       */
      setFeedback("empty");

      return;
    }

    const isCorrect =
      areAnswersEqual(
        selectedAnswers,

        currentQuestion
          .correctOptionValues,
      );

    const nextFeedback:
      FeedbackState =
      isCorrect
        ? "correct"
        : "wrong";

    const nextAnswer:
      CaseStudyResultsInvestigationAnswer =
      {
        questionId:
          currentQuestion.id,

        selectedAnswers:
          [
            ...selectedAnswers,
          ],

        feedback:
          nextFeedback,

        attempts:
          (
            currentSavedAnswer
              ?.attempts ?? 0
          ) + 1,
      };

    const nextAnswers =
      upsertInvestigationAnswer(
        answers,
        nextAnswer,
      );

    setFeedback(
      nextFeedback,
    );

    setAnswers(
      nextAnswers,
    );

    emitProgress({
      nextAnswers,
      nextCompleted: false,
    });
  };

  const handleNext = () => {
    onStepChange?.();

    if (isLastQuestion) {
      setIsCompleted(true);

      emitProgress({
        nextCompleted: true,
      });

      onCompleted?.();

      return;
    }

    const nextIndex =
      currentIndex + 1;

    const nextQuestion =
      questions[
        nextIndex
      ] ?? null;

    const nextQuestionAnswer =
      nextQuestion
        ? getInvestigationAnswer(
            answers,
            nextQuestion.id,
          )
        : null;

    setCurrentIndex(
      nextIndex,
    );

    setSelectedAnswers(
      nextQuestionAnswer
        ?.selectedAnswers ?? [],
    );

    setFeedback(
      nextQuestionAnswer
        ?.feedback ?? null,
    );

    emitProgress({
      nextCurrentIndex:
        nextIndex,

      nextCompleted:
        false,
    });
  };

  if (isCompleted) {
    return (
      <InvestigationCompletedPanel
        findings={findings}
        navigationState={
          navigationState
        }
      />
    );
  }

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-blue-950">
            Assessment Results Investigation
          </h2>

          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
            Explore the assessment results step by step to trace a low-scoring
            path from the lowest-scoring key functionality to candidate
            smart-ready services with room for improvement.
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-xl bg-blue-50 px-4 py-2 text-xs font-extrabold text-blue-700">
          Question {currentIndex + 1} of{" "}
          {questions.length}
        </span>
      </div>

      <QuestionPath
        currentIndex={
          currentIndex
        }
        questions={
          questions
        }
      />

      <article className="mt-8 min-w-0 rounded-3xl border border-blue-100 bg-blue-100/50 p-5 sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">
          Investigation Question
        </p>

        <h3 className="mt-3 break-words text-xl font-extrabold leading-8 text-blue-950">
          {
            currentQuestion
              .prompt
          }
        </h3>

        {currentQuestion
          .helperText ? (
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            {
              currentQuestion
                .helperText
            }
          </p>
        ) : null}

        {currentQuestion.id ===
        "related-impact-criteria" ? (
          <div
            className="
              mt-5
              w-full
              min-w-0
              max-w-full
              overflow-x-auto
              overscroll-x-contain
              [contain:inline-size]
              pb-1
            "
          >
            <div className="flex min-w-[720px] justify-center lg:min-w-0">
              <img
                src={keyFunctionalitiesImpactCategoriesImage}
                alt="Official SRI relationship between key functionalities and impact criteria"
                className="w-[720px] max-w-none object-contain lg:w-full lg:max-w-5xl"
              />
            </div>
          </div>
        ) : null}

        <AnswerOptions
          question={
            currentQuestion
          }
          selectedAnswers={
            selectedAnswers
          }
          onSingleChoice={
            handleSingleChoice
          }
          onMultipleChoice={
            handleMultipleChoice
          }
        />

        {feedback ? (
          <FeedbackMessage
            feedback={feedback}
            questionId={currentQuestion.id}
            findings={findings}
          />
        ) : null}

        <div className="mt-6 flex justify-end">
          {feedback ===
          "correct" ? (
            <PrimaryButton
              onClick={
                handleNext
              }
              className="group w-full px-7 sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                {isLastQuestion
                  ? "View Investigation Summary"
                  : "Next Question"}

                <ForwardArrowIcon />
              </span>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={
                handleCheckAnswer
              }
              className="w-full px-7 sm:w-auto"
            >
              Check Answer
            </PrimaryButton>
          )}
        </div>
      </article>
    </section>
  );
};

type QuestionPathProps = {
  currentIndex: number;

  questions:
    readonly GuidedInvestigationQuestion[];
};

const QuestionPath = ({
  currentIndex,
  questions,
}: QuestionPathProps) => {
  const scrollContainerRef =
    useRef<HTMLElement | null>(
      null,
    );

  const activeStepRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const hasMountedRef =
    useRef(false);

  useEffect(() => {
    /*
     * The first step is already visible on initial render.
     * Skipping the first run prevents the browser from
     * moving the entire Results Page down to this section.
     */
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const scrollContainer =
      scrollContainerRef.current;

    const activeStep =
      activeStepRef.current;

    if (!scrollContainer || !activeStep) {
      return;
    }

    const containerRect =
      scrollContainer.getBoundingClientRect();

    const activeStepRect =
      activeStep.getBoundingClientRect();

    const targetScrollLeft =
      scrollContainer.scrollLeft +
      activeStepRect.left -
      containerRect.left -
      (scrollContainer.clientWidth -
        activeStepRect.width) /
        2;

    const maximumScrollLeft =
      Math.max(
        0,
        scrollContainer.scrollWidth -
          scrollContainer.clientWidth,
      );

    scrollContainer.scrollTo({
      left: Math.min(
        maximumScrollLeft,
        Math.max(0, targetScrollLeft),
      ),
      behavior: "smooth",
    });
  }, [currentIndex]);

  return (
    <nav
      ref={scrollContainerRef}
      aria-label="Investigation progress"
      style={{
        contain: "layout paint",
      }}
      className="
        mt-8
        w-full
        min-w-0
        max-w-full
        overflow-x-auto
        overscroll-x-contain
        px-2
        pb-3
        pt-3
      "
>
      <ol className="flex min-w-[720px] items-start">
        {questions.map(
          (question, index) => {
            const questionNumber =
              index + 1;

            const isActive =
              index === currentIndex;

            const isDone =
              index < currentIndex;

            const isLast =
              index ===
              questions.length - 1;

            const label =
              questionPathLabelsById[
                question.id
              ] ??
              `Question ${questionNumber}`;

            return (
              <li
                key={question.id}
                aria-current={
                  isActive
                    ? "step"
                    : undefined
                }
                className="flex flex-1 items-start last:flex-none"
              >
                <div
                  ref={
                    isActive
                      ? activeStepRef
                      : undefined
                  }
                  className="flex min-w-[120px] flex-col items-center text-center"
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg font-extrabold transition-colors duration-200 ${
                      isActive
                        ? "border-blue-100 bg-blue-600 text-white ring-4 ring-blue-100"
                        : isDone
                          ? "border-emerald-100 bg-emerald-600 text-white"
                          : "border-slate-300 bg-white text-slate-500"
                    }`}
                  >
                    {isDone ? (
                      <Check
                        size={18}
                        aria-hidden="true"
                      />
                    ) : (
                      questionNumber
                    )}
                  </span>

                  <span
                    className={`mt-3 text-xs font-extrabold leading-4 ${
                      isActive
                        ? "text-blue-700"
                        : isDone
                          ? "text-emerald-700"
                          : "text-slate-500"
                    }`}
                  >
                    <span className="sr-only">
                      {isDone
                        ? "Completed: "
                        : isActive
                          ? "Current step: "
                          : ""}
                    </span>

                    {label}
                  </span>
                </div>

                {!isLast ? (
                  <div
                    aria-hidden="true"
                    className={`mt-6 h-px flex-1 ${
                      isDone
                        ? "bg-emerald-200"
                        : "bg-slate-300"
                    }`}
                  />
                ) : null}
              </li>
            );
          },
        )}
      </ol>
    </nav>
  );
};

type AnswerOptionsProps = {
  question:
    GuidedInvestigationQuestion;

  selectedAnswers:
    readonly string[];

  onSingleChoice: (
    value: string,
  ) => void;

  onMultipleChoice: (
    value: string,
  ) => void;
};

const AnswerOptions = ({
  question,
  selectedAnswers,
  onSingleChoice,
  onMultipleChoice,
}: AnswerOptionsProps) => {
  const isMultipleChoice =
    question.type ===
    "multiple-choice";

  const shouldUseTwoColumns =
    question.id ===
      "lowest-domain-for-impact" ||
    question.options.length > 4;

  return (
    <fieldset
      className={`mt-5 grid gap-3 ${
        shouldUseTwoColumns
          ? "md:grid-cols-2"
          : "md:grid-cols-1"
      }`}
    >
      <legend className="sr-only">
        {question.prompt}
      </legend>

      {question.options.map(
        (option) => {
          const isSelected =
            selectedAnswers.includes(
              option.value,
            );

          return (
            <label
              key={option.value}
              className={`
                flex
                min-w-0
                cursor-pointer
                items-center
                gap-3
                rounded-2xl
                border
                bg-white
                px-4
                py-3
                text-sm
                font-bold
                text-slate-700
                transition-colors
                duration-200
                ${
                  isSelected
                    ? "border-blue-300 ring-4 ring-blue-100"
                    : "border-slate-200 hover:border-blue-200"
                }
              `}
            >
              <input
                type={
                  isMultipleChoice
                    ? "checkbox"
                    : "radio"
                }
                name={question.id}
                value={option.value}
                checked={isSelected}
                onChange={() =>
                  isMultipleChoice
                    ? onMultipleChoice(
                        option.value,
                      )
                    : onSingleChoice(
                        option.value,
                      )
                }
                className="
                  h-4
                  w-4
                  shrink-0
                  accent-blue-600
                "
              />

              <span className="min-w-0 break-words">
                {option.label}
              </span>
            </label>
          );
        },
      )}
    </fieldset>
  );
};

type FeedbackMessageProps = {
  feedback: FeedbackState;
  questionId: string;
  findings: GuidedInvestigationFindings;
};

const FeedbackMessage = ({
  feedback,
  questionId,
  findings
}: FeedbackMessageProps) => {
  if (feedback === "empty") {
    return (
      <div
        role="alert"
        className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-700"
      >
        <XCircle
          size={18}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        <p>
          Please select at least one answer before checking.
        </p>
      </div>
    );
  }

  if (feedback === "wrong") {
    return (
      <div
        role="alert"
        className="mt-5 flex items-start gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
      >
        <XCircle
          size={18}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        <p>
          {getWrongFeedback(
            questionId,
            findings,
          )}
        </p>
      </div>
    );
  }

  if (feedback === "correct") {
    return (
      <div
        role="status"
        className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <p className="leading-6">
              Correct. You can continue to the next step.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

type InvestigationCompletedPanelProps = {
  findings:
    GuidedInvestigationFindings;

  navigationState?:
    GuidedImprovementNavigationState;
};

const InvestigationCompletedPanel = ({
  findings,
  navigationState,
}: InvestigationCompletedPanelProps) => {
  const navigate = useNavigate();

  const canContinue =
    isCompleteNavigationState(
      navigationState,
    );

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    navigate(
      CASE_STUDY_ROUTES
        .guidedImprovementAnalysis,
      {
        state: navigationState,
      },
    );
  };

  return (
    <section className="relative min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <img
        src={
          investigationCompleteCheckImage
        }
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-20 hidden w-36 opacity-70 lg:block"
      />

      <img
        src={
          investigationCompleteBuildingsImage
        }
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-24 hidden w-40 opacity-70 lg:block"
      />

      <div className="relative z-10 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700">
          <CheckCircle2
            size={18}
            aria-hidden="true"
          />

          Results Investigation Completed
        </div>

        <h2 className="mt-4 break-words text-2xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-3xl">
          Assessment Results Investigation Complete
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
          You followed a low-scoring path through the current assessment,
          from the lowest-scoring key functionality to candidate smart-ready
          services with room for improvement.
        </p>
      </div>

      <div className="relative z-10 mt-7 grid gap-5 xl:grid-cols-2">
        <WeakestPerformancePathCard
          findings={findings}
        />

        <div className="grid gap-5">
          <ImportantInsightCard />

          <WhatsNextCard />
        </div>
      </div>

      <div className="relative z-10 mt-6 border-t border-slate-200 pt-5">
        {canContinue ? (
          <div className="flex justify-center">
            <PrimaryButton
              onClick={handleContinue}
              className="group w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                Start Guided Improvement Analysis

                <ForwardArrowIcon />
              </span>
            </PrimaryButton>
          </div>
        ) : (
          <GuidedImprovementUnavailableState />
        )}
      </div>
    </section>
  );
};

type WeakestPerformancePathCardProps = {
  findings:
    GuidedInvestigationFindings;
};

const WeakestPerformancePathCard = ({
  findings,
}: WeakestPerformancePathCardProps) => {
  return (
    <article className="h-full min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex min-w-0 items-center gap-3">
        <Network
          size={20}
          className="text-emerald-700"
          aria-hidden="true"
        />

        <h3 className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
          Low-Scoring Performance Path
        </h3>
      </div>

      <div className="space-y-5">
        <PathStep
          icon={
            <UsersRound
              size={20}
            />
          }
          iconClassName="bg-emerald-50 text-emerald-700 ring-emerald-100"
          label="Lowest-scoring Key Functionality"
          value={
            findings
              .weakestKeyFunctionality
          }
          showConnector
        />

        <PathStep
          icon={
            <Zap size={20} />
          }
          iconClassName="bg-sky-50 text-sky-700 ring-sky-100"
          label="Lowest-scoring Impact Criterion"
          value={
            findings
              .lowestImpactCriterion
          }
          showConnector
        />

        <PathStep
          icon={
            <Settings
              size={20}
            />
          }
          iconClassName="bg-violet-50 text-violet-700 ring-violet-100"
          label={
            findings
              .weakestTechnicalDomains
              .length === 1
              ? "Lowest-scoring Technical Domain"
              : "Lowest-scoring Technical Domains"
          }
          value={findings.weakestTechnicalDomains.join(
            ", ",
          )}
          showConnector
        />

        <PathStep
          icon={
            <PanelTop
              size={20}
            />
          }
          iconClassName="bg-amber-50 text-slate-500 ring-amber-100"
          label={
            findings
              .candidateServices
              .length === 1
              ? "Candidate Service"
              : "Candidate Services"
          }
          value=""
        >
          {findings.candidateServices
            .length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {findings.candidateServices.map(
                (service) => (
                  <span
                    key={
                      service.serviceId
                    }
                    title={`${service.serviceCode} — ${service.serviceName}`}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-extrabold text-blue-950 shadow-sm"
                  >
                    {
                      service.serviceCode
                    }
                  </span>
                ),
              )}
            </div>
          ) : (
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
              No candidate service identified.
            </p>
          )}
        </PathStep>
      </div>
    </article>
  );
};

type PathStepProps = {
  icon: ReactNode;
  iconClassName: string;
  label: string;
  value: string;
  showConnector?: boolean;
  children?: ReactNode;
};

const PathStep = ({
  icon,
  iconClassName,
  label,
  value,
  showConnector = false,
  children,
}: PathStepProps) => {
  return (
    <div className="grid grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[72px_minmax(0,1fr)]">
      <div className="relative flex justify-center">
        <div
          aria-hidden="true"
          className={`z-10 flex h-11 w-11 items-center justify-center rounded-full ring-1 sm:h-12 sm:w-12 ${iconClassName}`}
        >
          {icon}
        </div>

        {showConnector ? (
          <div
            aria-hidden="true"
            className="absolute top-12 h-full border-l-2 border-dashed border-slate-200"
          />
        ) : null}
      </div>

      <div className="min-w-0 pb-8 pl-3 pt-1 sm:pl-4">
        <p className="break-words text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>

        {value ? (
          <p className="mt-1.5 break-words text-base font-extrabold leading-6 text-blue-950">
            {value}
          </p>
        ) : null}

        {children}
      </div>
    </div>
  );
};

const ImportantInsightCard = () => {
  return (
    <article className="min-w-0 rounded-3xl border border-blue-100 bg-blue-50/30 p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex min-w-0 items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"
        >
          <Lightbulb size={22} />
        </div>

        <h3 className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
          Important Insight
        </h3>
      </div>

      <ul className="space-y-3 text-sm font-semibold leading-6 text-slate-700">
        <li className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"
          />

          <span className="min-w-0 break-words">
            Traces a low-scoring path through the current assessment results.
          </span>
        </li>

        <li className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"
          />

          <span className="min-w-0 break-words">
            Highlights areas and services within that path that have room for
            improvement, but does not rank possible upgrades or identify which
            single-service upgrade would produce the largest increase in the
            overall SRI score.
          </span>
        </li>
      </ul>
    </article>
  );
};

const WhatsNextCard = () => {
  return (
    <article className="min-w-0 rounded-3xl border border-emerald-100 bg-emerald-50/40 p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex min-w-0 items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
        >
          <Target size={22} />
        </div>

        <h3 className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
          What’s Next
        </h3>
      </div>

      <ul className="space-y-3 text-sm font-semibold leading-6 text-slate-700">
        <li className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600"
          />

          <span className="min-w-0 break-words">
            Use a different reasoning process based on the official SRI weighting
            structure and service impact scores.
          </span>
        </li>

        <li className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600"
          />

          <span className="min-w-0 break-words">
            Identify a high-priority smart-ready service for improvement.
          </span>
        </li>

        <li className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600"
          />

          <span className="min-w-0 break-words">
            Simulate an upgrade of the selected service and compare the SRI
            results before and after the change.
          </span>
        </li>
      </ul>
    </article>
  );
};

const GuidedInvestigationErrorState =
  () => {
    return (
      <section
        role="alert"
        className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0 text-amber-700"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <h2 className="text-xl font-extrabold leading-7 text-amber-900">
              Results Investigation Unavailable
            </h2>

            <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
              The guided investigation could not be displayed because
              the required questions are missing. Return to the service
              assessment and calculate the results again.
            </p>
          </div>
        </div>
      </section>
    );
  };

const GuidedImprovementUnavailableState =
  () => {
    return (
      <div
        role="alert"
        className="mx-auto flex max-w-2xl items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"
      >
        <AlertCircle
          size={18}
          className="mt-0.5 shrink-0 text-amber-700"
          aria-hidden="true"
        />

        <div className="min-w-0">
          <h3 className="text-sm font-extrabold leading-6 text-amber-900">
            Guided Improvement Analysis Unavailable
          </h3>

          <p className="mt-1 text-sm font-semibold leading-6 text-amber-800">
            The assessment data required for the next step are missing.
            Return to the case study and complete the assessment again.
          </p>
        </div>
      </div>
    );
  };

type CompleteGuidedImprovementNavigationState = {
  result: CaseStudySubmitResult;
  caseStudy: CaseStudyDetails;

  answers: Record<
    string,
    ServiceAnswer
  >;

  assessmentMethod:
    OfficialAssessmentMethod;

  serviceApplicability: Record<
    string,
    boolean
  >;

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  buildingType: BuildingType;
  climateZone: ClimateZone;

  services: readonly SriService[];
};

const isCompleteNavigationState = (
  state:
    | GuidedImprovementNavigationState
    | undefined,
): state is CompleteGuidedImprovementNavigationState => {
  return (
    state?.result !== undefined &&
    state.caseStudy !== undefined &&
    state.answers !== undefined &&
    state.assessmentMethod !==
      undefined &&
    state.serviceApplicability !==
      undefined &&
    state.domainPresence !==
      undefined &&
    state.buildingType !==
      undefined &&
    state.climateZone !==
      undefined &&
    state.services !== undefined
  );
};

const areAnswersEqual = (
  selectedAnswers:
    readonly string[],

  correctAnswers:
    readonly string[],
) => {
  if (
    selectedAnswers.length !==
    correctAnswers.length
  ) {
    return false;
  }

  const selectedSet =
    new Set(selectedAnswers);

  return correctAnswers.every(
    (answer) =>
      selectedSet.has(answer),
  );
};

export default GuidedInvestigationCard;