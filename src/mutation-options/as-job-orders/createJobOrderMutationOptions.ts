import { mutationOptions } from "@tanstack/react-query";

import { dashboardKeys } from "@/query-key-factories/dashboard";
import { jobOrderKeys } from "@/query-key-factories/jobOrders";
import { createJobOrder } from "@/services/jobOrder";
import type { CreateJobOrderRequestBody } from "@/types/job-order";

export const createJobOrderMutationOptions = (userId: string) =>
  mutationOptions({
    mutationFn: (data: CreateJobOrderRequestBody) => createJobOrder(data),
    meta: {
      invalidatesQuery: [
        dashboardKeys.getDashboard(userId),
        jobOrderKeys.list(),
      ],
    },
  });
