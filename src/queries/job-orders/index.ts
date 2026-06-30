import { queryOptions } from "@tanstack/react-query";

import { fetchJobOrder, fetchJobOrders } from "@/services/jobOrder";
import type { JobOrder, JobOrderListQueryParams } from "@/types/job-order";
import { cleanParams } from "@/utils/query";

export const jobOrderQueries = {
  all: () => ["jobOrders"],
  lists: () => [...jobOrderQueries.all(), "list"],
  list: (filters: JobOrderListQueryParams = {}) => {
    const cleanedParams = cleanParams(filters);
    return queryOptions({
      queryKey: [...jobOrderQueries.lists(), cleanedParams],
      queryFn: () => fetchJobOrders(cleanedParams),
    });
  },
  details: () => [...jobOrderQueries.all(), "detail"],
  detail: <T extends JobOrder>(id: number) =>
    queryOptions({
      queryKey: [...jobOrderQueries.details(), id],
      queryFn: () => fetchJobOrder<T>(id),
    }),
};
