export const jobOrderKeys = {
  all: () => ["jobOrder"] as const,
  lists: () => [...jobOrderKeys.all(), "list"] as const,
  getEnums: (quotationReference?: string) =>
    [...jobOrderKeys.all(), "enums", quotationReference] as const,
};

export const jobOrderListKeys = {
  all: () => ["job-orders"] as const,
  created: (params?: { status?: string; page?: number }) =>
    [...jobOrderListKeys.all(), "created", params ?? {}] as const,
};
