import { clientQuotationKeys } from "@/src/query-key-factories/clientQuotations";
import { acceptQuotation } from "@/src/services/shipment";
import { mutationOptions } from "@tanstack/react-query";

export const acceptClientQuotationMutationOptions = (
  token?: string | null,
) =>
  mutationOptions({
    mutationFn: (referenceNumber: string) => {
      if (!token) throw new Error("No auth token found");
      return acceptQuotation(referenceNumber);
    },
    meta: {
      invalidatesQuery: clientQuotationKeys.getQuotes({ status: "RESPONDED" }),
    },
  });
