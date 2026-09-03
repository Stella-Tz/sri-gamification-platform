// client/src/components/ui/RouteLoadingState.tsx

type RouteLoadingStateProps = {
  label?: string;
};

const RouteLoadingState = ({
  label = "Loading...",
}: RouteLoadingStateProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-100
        px-6
      "
    >
      <p className="text-sm font-semibold text-slate-500">
        {label}
      </p>
    </div>
  );
};

export default RouteLoadingState;