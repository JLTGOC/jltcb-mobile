import { clientQuotationKeys } from "@/src/query-key-factories/clientQuotations";
import { dashboardKeys } from "@/src/query-key-factories/dashboard";
import { deleteClientSingleQuote } from "@/src/services/clientQuotation";
import { mutationOptions } from "@tanstack/react-query";

export const deleteClientSingleQuoteMutationOptions = (userId: string) =>
  mutationOptions({
    mutationFn: (quotationId: number | string) => {
      const normalizedId =
        typeof quotationId === "string" ? Number(quotationId) : quotationId;

      if (!Number.isFinite(normalizedId)) {
        throw new Error(
          `Invalid quotation id for delete: ${String(quotationId)}`,
        );
      }

      return deleteClientSingleQuote(normalizedId);
    },
    meta: {
      invalidatesQuery: [
        clientQuotationKeys.getQuotes({ status: "RESPONDED" }),
        dashboardKeys.getDashboard(userId),
      ],
    },
  });
