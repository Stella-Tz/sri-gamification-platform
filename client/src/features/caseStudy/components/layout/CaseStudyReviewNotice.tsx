import {
  LockKeyhole,
} from "lucide-react";

const CaseStudyReviewNotice = () => {
  return (
    <section
      role="status"
      className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4"
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm"
        >
          <LockKeyhole
            size={18}
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-extrabold text-blue-950">
            Review mode
          </h2>

          <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
            This step has already been completed.
            You can review what you submitted,
            but it can no longer be changed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyReviewNotice;