import { useMutation, useQueryClient } from "@tanstack/react-query";

import { quotationKeys } from "@/src/query-key-factories/quotations";
import { updateFileName } from "@/src/services/quotations";

export function useRenameQuotationDocumentMutation(quotationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      documentId,
      fileName,
      type,
    }: {
      documentId: number;
      fileName: string;
      type: "client" | "company";
    }) => updateFileName(Number(quotationId), documentId, fileName),
    onSuccess: (_data, { type }) => {
      const queryKey =
        type === "client"
          ? quotationKeys.getClientQuotationDocuments(quotationId)
          : quotationKeys.getCompanyQuotationDocuments(quotationId);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
