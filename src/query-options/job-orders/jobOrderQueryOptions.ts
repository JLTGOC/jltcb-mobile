import { queryOptions } from "@tanstack/react-query";

import { jobOrderKeys } from "@/query-key-factories/jobOrders";
import { fetchJobOrder } from "@/services/jobOrder";
import type { JobOrder } from "@/types/job-order";

export const jobOrderQueryOptions = <T extends JobOrder>(id: number) =>
  queryOptions({
    queryKey: jobOrderKeys.detail(id),
    queryFn: () => fetchJobOrder<T>(id),
  });
