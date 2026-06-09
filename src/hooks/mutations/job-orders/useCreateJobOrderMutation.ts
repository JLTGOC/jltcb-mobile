import { useMutation } from "@tanstack/react-query";

import { dashboardQueries } from "@/queries/dashboard";
import { jobOrderQueries } from "@/queries/job-orders";
import { createJobOrder } from "@/services/jobOrder";
import type { CreateJobOrderRequestBody } from "@/types/job-order";

export function useCreateJobOrderMutation() {
  return useMutation({
    mutationFn: (data: CreateJobOrderRequestBody) => createJobOrder(data),
    meta: {
      invalidates: [
        jobOrderQueries.list().queryKey,
        dashboardQueries.detail().queryKey,
      ],
    },
  });
}
