import { useQuery } from "@tanstack/react-query";

import { jobOrderQueryOptions } from "@/query-options/job-orders/jobOrderQueryOptions";
import type { JobOrder } from "@/types/job-order";

export function useJobOrderQuery<T extends JobOrder = JobOrder>(
  jobOrderId: number,
) {
  return useQuery(jobOrderQueryOptions<T>(jobOrderId));
}
