// client/src/features/caseStudy/utils/validationMerge.utils.ts

export const mergeValidationErrors = (
  ...errorGroups: ReadonlyArray<Record<string, string>>
): Record<string, string> => {
  return errorGroups.reduce<Record<string, string>>(
    (accumulator, currentErrors) => {
      return {
        ...accumulator,
        ...currentErrors,
      };
    },
    {},
  );
};

export const hasErrors = (
  errors: Record<string, string>,
): boolean => {
  return Object.keys(errors).length > 0;
};

export const prefixValidationErrors = (
  prefix: string,
  errors: Record<string, string>,
): Record<string, string> => {
  return Object.entries(errors).reduce<Record<string, string>>(
    (accumulator, [field, message]) => {
      accumulator[`${prefix}.${field}`] = message;
      return accumulator;
    },
    {},
  );
};