import { useQuery } from "@tanstack/react-query";

import { jobOrdersQueryOptions } from "@/query-options/job-orders/jobOrdersQueryOptions";
import type { JobOrderListQueryParams } from "@/types/job-order";

export function useJobOrdersQuery(params?: JobOrderListQueryParams) {
  return useQuery(
    jobOrdersQueryOptions({
      filter: params?.filter,
      ...(params?.search && { search: params.search }),
    }),
  );
}
