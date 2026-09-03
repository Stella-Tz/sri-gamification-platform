import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";

import {
  useCourseProgress as useCourseProgressState,
} from "../../features/course/hooks/useCourseProgress";

type CourseProgressContextValue =
  ReturnType<
    typeof useCourseProgressState
  >;

const CourseProgressContext =
  createContext<
    CourseProgressContextValue | null
  >(null);

type CourseProgressProviderProps = {
  children: ReactNode;
};

export const CourseProgressProvider = ({
  children,
}: CourseProgressProviderProps) => {
  /*
   * This is now the ONE Course progress
   * instance used by the protected app.
   */
  const value =
    useCourseProgressState();

  /*
   * Once the first successful hydration
   * has completed, later API errors must
   * not tear down the whole application.
   */
  const hasHydratedRef =
    useRef(false);

  if (
    !value.isLoading &&
    !value.error
  ) {
    hasHydratedRef.current =
      true;
  }

  /*
   * Do not mount pages while canonical
   * progress is still unknown.
   *
   * This prevents:
   * locked -> unlocked
   * 0% -> real %
   * locked achievements -> unlocked
   * redirects based on temporary state
   */
  if (!hasHydratedRef.current) {
    if (value.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
          <div
            role="alert"
            className="max-w-lg text-center"
          >
            <p className="text-sm font-semibold leading-6 text-red-700">
              {value.error}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-screen items-center justify-center bg-slate-100 px-6"
      >
        <p className="text-sm font-semibold text-slate-500">
          Loading your progress...
        </p>
      </div>
    );
  }

  return (
    <CourseProgressContext.Provider
      value={value}
    >
      {children}
    </CourseProgressContext.Provider>
  );
};

export const useCourseProgress =
  () => {
    const context =
      useContext(
        CourseProgressContext,
      );

    if (!context) {
      throw new Error(
        "useCourseProgress must be used within a CourseProgressProvider.",
      );
    }

    return context;
  };