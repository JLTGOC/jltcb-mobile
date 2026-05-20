import { queryOptions } from "@tanstack/react-query";

import { jobOrderKeys } from "@/query-key-factories/jobOrders";
import { fetchJobOrders } from "@/services/jobOrder";
import { JobOrderListQueryParams } from "@/types/job-order";

export const jobOrdersQueryOptions = (params?: JobOrderListQueryParams) =>
  queryOptions({
    queryKey: jobOrderKeys.list(params),
    queryFn: () => fetchJobOrders(params),
  });
