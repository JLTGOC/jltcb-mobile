import { useMutation } from "@tanstack/react-query";

import { dashboardQueries } from "@/queries/dashboard";
import { quotationQueries } from "@/queries/quotations";
import { deleteQuotation } from "@/services/quotations";

export function useDeleteQuotationMutation() {
  return useMutation({
    mutationFn: (quotationId: number) => deleteQuotation(quotationId),
    meta: {
      invalidates: [
        quotationQueries.list({ filter: { status: "RESPONDED" } }).queryKey,
        dashboardQueries.detail().queryKey,
      ],
    },
  });
}
