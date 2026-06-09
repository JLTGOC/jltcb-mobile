import { useMutation } from "@tanstack/react-query";

import { dashboardQueries } from "@/queries/dashboard";
import { quotationQueries } from "@/queries/quotations";
import { acceptQuotationProposal } from "@/services/quotations";

export function useAcceptQuotationProposalMutation() {
  return useMutation({
    mutationFn: (quotationId: number) => acceptQuotationProposal(quotationId),
    meta: {
      invalidates: [
        quotationQueries.list({ filter: { status: "RESPONDED" } }).queryKey,
        dashboardQueries.detail().queryKey,
      ],
    },
  });
}
