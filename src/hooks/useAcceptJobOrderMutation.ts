import { acceptJobOrderMutationOptions } from "@/mutation-options/job-orders/acceptJobOrderMutationOptions";
import { useMutation } from "@tanstack/react-query";

export function useAcceptJobOrderMutation() {
  return useMutation(acceptJobOrderMutationOptions);
}
