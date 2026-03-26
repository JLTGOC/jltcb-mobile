import { clientQuotationKeys } from "@/src/query-key-factories/clientQuotations";
import { dashboardKeys } from "@/src/query-key-factories/dashboard";
import { acceptQuotation } from "@/src/services/quotations";
import { mutationOptions } from "@tanstack/react-query";

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
