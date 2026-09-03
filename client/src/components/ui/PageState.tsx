// client/src/components/ui/PageState.tsx

import type {
  ReactNode,
} from "react";

import RouteLoadingState from "./RouteLoadingState";

type PageStateProps = {
  isLoading: boolean;

  error?: string | null;

  isEmpty?: boolean;

  loadingText?: string;

  emptyText?: string;

  errorText?: string;

  children: ReactNode;
};

const PageState = ({
  isLoading,

  error,

  isEmpty = false,

  loadingText = "Loading...",

  emptyText =
    "No content is available.",

  errorText =
    "Something went wrong.",

  children,
}: PageStateProps) => {
  if (isLoading) {
    return (
      <RouteLoadingState
        label={loadingText}
      />
    );
  }

  const hasError =
    error !== undefined &&
    error !== null;

  if (hasError) {
    return (
      <section
        role="alert"
        className="rounded-3xl border border-red-100 bg-red-50 px-6 py-5 shadow-sm"
      >
        <p className="text-sm font-semibold leading-6 text-red-700">
          {error || errorText}
        </p>
      </section>
    );
  }

  if (isEmpty) {
    return (
      <section
        role="status"
        className="rounded-3xl border border-slate-200 bg-white px-7 py-14 text-center shadow-sm"
      >
        <h2 className="text-base font-extrabold text-blue-950">
          No Content Available
        </h2>

        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          {emptyText}
        </p>
      </section>
    );
  }

  return <>{children}</>;
};

export default PageState;