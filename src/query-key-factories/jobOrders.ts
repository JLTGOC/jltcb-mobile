export const jobOrderKeys = {
  all: () => ["jobOrder"] as const,
  lists: () => [...jobOrderKeys.all(), "list"] as const,
  getEnums: (quotationReference?: string) =>
    [...jobOrderKeys.all(), "enums", quotationReference] as const,
};
