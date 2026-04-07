export const jobOrderKeys = {
  all: () => ["job-orders"] as const,
  created: (params?: { status?: string; page?: number }) =>
    [...jobOrderKeys.all(), "created", params ?? {}] as const,
};