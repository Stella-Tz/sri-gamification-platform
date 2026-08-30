// client/src/features/caseStudy/components/assessment/ServiceAssessmentHeader.tsx

type ServiceAssessmentHeaderProps = {
  code: string;
  serviceGroup: string;
  smartReadyService: string;
};

const ServiceAssessmentHeader = ({
  code,
  serviceGroup,
  smartReadyService,
}: ServiceAssessmentHeaderProps) => {
  const cleanCode = code.trim();
  const cleanGroup =
    serviceGroup.trim();

  const cleanService =
    smartReadyService.trim();

  const primaryTitle =
    cleanGroup || cleanService;

  const showServiceName =
    Boolean(cleanService) &&
    cleanService !== cleanGroup;

  return (
    <section className="min-w-0 rounded-3xl border border-blue-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
          Service
        </p>

        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
          {cleanCode}
        </span>
      </div>

      <h2 className="mt-3 max-w-full break-words text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
        {primaryTitle}
      </h2>

      {showServiceName ? (
        <p className="mt-3 max-w-4xl break-words text-sm font-semibold leading-7 text-slate-600">
          {cleanService}
        </p>
      ) : null}
    </section>
  );
};

export default ServiceAssessmentHeader;