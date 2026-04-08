import { jobOrderKeys } from "@/src/query-key-factories/jobOrder";
import { createJobOrder } from "@/src/services/jobOrder";
import type { CreateJobOrderRequestBody } from "@/src/types/job-order";
import { mutationOptions } from "@tanstack/react-query";

export const createJobOrderMutationOptions = mutationOptions({
  mutationFn: (data: CreateJobOrderRequestBody) => createJobOrder(data),
  meta: { invalidatesQuery: jobOrderKeys.created({ status: "created" }) },
});
