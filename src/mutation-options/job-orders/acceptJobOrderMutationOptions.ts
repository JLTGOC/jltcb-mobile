import { jobOrderKeys } from "@/query-key-factories/jobOrders";
import { acceptJobOrder } from "@/services/jobOrder";
import { mutationOptions } from "@tanstack/react-query";

export const acceptJobOrderMutationOptions = mutationOptions({
  mutationFn: (jobOrderId: number) => acceptJobOrder(jobOrderId),
  meta: {
    invalidatesQuery: jobOrderKeys.lists(),
  },
});
