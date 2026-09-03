// client/src/features/caseStudy/components/assessment/ServiceNavigator.tsx

import {
  Check,
} from "lucide-react";

import type {
  CaseStudyAssessmentService,
} from "../../assessment/caseStudyAssessment.presentation";

type ServiceNavigatorProps = {
  services:
    readonly CaseStudyAssessmentService[];

  selectedServiceId:
    string;

  onSelectService: (
    serviceId:
      string,
  ) => void;

  isServiceValidated: (
    serviceId:
      string,
  ) => boolean;

  canSelectService: (
    serviceId:
      string,
  ) => boolean;
};

const ServiceNavigator = ({
  services,
  selectedServiceId,
  onSelectService,
  isServiceValidated,
  canSelectService,
}: ServiceNavigatorProps) => {
  return (
    <nav
      aria-label="Services in the selected domain"
      className="w-full min-w-0 max-w-full overflow-hidden"
    >
      <ul
        style={{
          contain:
            "layout paint",
        }}
        className="
          flex
          w-full
          min-w-0
          max-w-full
          snap-x
          snap-mandatory
          gap-3
          overflow-x-auto
          overscroll-x-contain
          pb-2
          pr-1
          lg:grid
          lg:grid-cols-5
          lg:overflow-visible
          lg:pb-0
          lg:pr-0
        "
      >
        {services.map(
          (service) => {
            const isSelected =
              service.id ===
              selectedServiceId;

            const isCompleted =
              isServiceValidated(
                service.id,
              );

            const isLocked =
              !canSelectService(
                service.id,
              );

            return (
              <li
                key={
                  service.id
                }
                className="
                  w-[220px]
                  shrink-0
                  snap-start
                  sm:w-[240px]
                  lg:h-full
                  lg:w-auto
                  lg:min-w-0
                  lg:shrink
                "
              >
                <button
                  type="button"
                  disabled={
                    isLocked
                  }
                  aria-pressed={
                    isSelected
                  }
                  onClick={() =>
                    onSelectService(
                      service.id,
                    )
                  }
                  className={`h-full min-h-[122px] w-full min-w-0 rounded-2xl border p-4 text-center shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-blue-300 bg-blue-50 ring-4 ring-inset ring-blue-50"
                      : isLocked
                        ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                  >
                    {isCompleted ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check
                          size={
                            14
                          }
                        />
                      </span>
                    ) : isSelected ? (
                      <span className="h-6 w-6 rounded-full bg-blue-600" />
                    ) : (
                      <span className="h-6 w-6 rounded-full border border-slate-300 bg-white" />
                    )}
                  </div>

                  {isCompleted ? (
                    <span className="sr-only">
                      Completed service.{" "}
                    </span>
                  ) : null}

                  {isLocked ? (
                    <span className="sr-only">
                      Locked service.{" "}
                    </span>
                  ) : null}

                  <p
                    className={`mt-3 text-sm font-extrabold ${
                      isSelected
                        ? "text-blue-700"
                        : "text-slate-900"
                    }`}
                  >
                    {
                      service.code
                    }
                  </p>

                  <p className="mt-2 line-clamp-3 break-words text-[13px] font-semibold leading-5 text-slate-600">
                    {
                      service
                        .serviceGroup
                    }
                  </p>
                </button>
              </li>
            );
          },
        )}
      </ul>
    </nav>
  );
};

export default ServiceNavigator;