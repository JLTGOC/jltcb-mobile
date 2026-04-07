// src/query-options/job-orders/createdJobOrdersQueryOptions.ts
import { queryOptions } from "@tanstack/react-query";
import { jobOrderKeys } from "@/src/query-key-factories/jobOrder";
import { fetchJobOrders } from "@/src/services/jobOrder";

export const createdJobOrdersQueryOptions = (params?: { status?: string }) =>
  queryOptions({
    queryKey: jobOrderKeys.created({ status: params?.status ?? "created" }),
    queryFn: fetchJobOrders,
    staleTime: 30_000,
  });