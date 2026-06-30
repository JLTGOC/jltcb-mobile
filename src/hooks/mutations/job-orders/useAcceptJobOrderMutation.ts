import { useMutation } from "@tanstack/react-query";

import { jobOrderQueries } from "@/queries/job-orders";
import { acceptJobOrder } from "@/services/jobOrder";

export function useAcceptJobOrderMutation() {
  return useMutation({
    mutationFn: (jobOrderId: number) => acceptJobOrder(jobOrderId),
    meta: {
      invalidatesQuery: jobOrderQueries.lists(),
    },
  });
}
