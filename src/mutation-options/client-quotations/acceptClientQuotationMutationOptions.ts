import { mutationOptions } from "@tanstack/react-query";

import { clientQuotationKeys } from "@/query-key-factories/clientQuotations";
import { dashboardKeys } from "@/query-key-factories/dashboard";
import { acceptQuotation } from "@/services/quotations";

export const acceptClientQuotationMutationOptions = (userId: string) =>
  mutationOptions({
    mutationFn: (quotationId: number) => acceptQuotation(quotationId),
    meta: {
      invalidatesQuery: [
        clientQuotationKeys.getQuotes({ status: "RESPONDED" }),
        dashboardKeys.getDashboard(userId),
      ],
    },
  });
