import type { JobOrderListQueryParams } from "@/types/job-order";

export const jobOrderKeys = {
  all: () => ["jobOrders"] as const,
  lists: () => [...jobOrderKeys.all(), "list"] as const,
  list: (params?: JobOrderListQueryParams) =>
    [...jobOrderKeys.lists(), params] as const,
  details: () => [...jobOrderKeys.all(), "detail"] as const,
  detail: (id: number) => [...jobOrderKeys.details(), id] as const,
  getEnums: (quotationReference?: string) =>
    [...jobOrderKeys.all(), "enums", quotationReference] as const,
};
