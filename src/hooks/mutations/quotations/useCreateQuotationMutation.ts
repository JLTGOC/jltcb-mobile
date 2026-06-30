import { useMutation } from "@tanstack/react-query";

import { dashboardQueries } from "@/queries/dashboard";
import { createQuotation } from "@/services/quotations";
import type { CreateQuotationRequestBody } from "@/types/quotations";

export function useCreateQuotationMutation() {
  return useMutation({
    mutationFn: async (payload: CreateQuotationRequestBody) =>
      createQuotation(payload),
    meta: {
      invalidates: [dashboardQueries.detail().queryKey],
    },
  });
}
