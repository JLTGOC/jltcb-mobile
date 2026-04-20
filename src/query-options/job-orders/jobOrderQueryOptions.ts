import { queryOptions } from "@tanstack/react-query";

import { jobOrderKeys } from "@/src/query-key-factories/jobOrders";
import { fetchJobOrder } from "@/src/services/jobOrder";
import type { JobOrder } from "@/src/types/job-order";

export const jobOrderQueryOptions = <T extends JobOrder>(id: number) =>
	queryOptions({
		queryKey: jobOrderKeys.detail(id),
		queryFn: () => fetchJobOrder<T>(id),
	});
