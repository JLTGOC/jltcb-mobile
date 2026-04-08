
import { queryOptions } from "@tanstack/react-query";
import { jobOrderListKeys } from "@/src/query-key-factories/jobOrders";
import { fetchJobOrders } from "@/src/services/jobOrder";

export const createdJobOrdersQueryOptions = (params?: { status?: string }) =>
  queryOptions({
    queryKey: jobOrderListKeys.created({ status: params?.status ?? "created" }),
    queryFn: fetchJobOrders,
    staleTime: 30_000,
  });