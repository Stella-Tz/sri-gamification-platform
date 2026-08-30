// client/src/pages/TheoryLessonPage.tsx

import { ArrowLeft } from "lucide-react";
import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import { ROUTES } from "../constants/routes";

import TheoryLessonContent from "../features/theory/components/TheoryLessonContent";
import TheoryLessonNavigation from "../features/theory/components/TheoryLessonNavigation";
import { useTheoryLesson } from "../features/theory/hooks/useTheoryLesson";

const TheoryLessonPage = () => {
  const { sectionId, lessonId } = useParams<{
    sectionId: string;
    lessonId: string;
  }>();

  const {
    lesson,
    section,
    previousLesson,
    nextLesson,
    isFound,
  } = useTheoryLesson(sectionId, lessonId);

  if (!sectionId || !lessonId || !isFound || !lesson) {
    return <Navigate to={ROUTES.theory} replace />;
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6">
        <Link
          to={ROUTES.theory}
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-500 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
          />

          Back to Theory
        </Link>
      </div>

      <TheoryLessonContent
        lesson={lesson}
        sectionTitle={
          section?.shortTitle ?? section?.title
        }
        sectionOrder={section?.order}
      />

      <TheoryLessonNavigation
        previousLesson={previousLesson}
        nextLesson={nextLesson}
      />
    </div>
  );
};

export default TheoryLessonPage;
