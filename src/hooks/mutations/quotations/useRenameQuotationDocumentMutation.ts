import { useMutation } from "@tanstack/react-query";

import { updateFileName } from "@/services/quotations";

export function useRenameQuotationDocumentMutation(quotationId: number) {
  return useMutation({
    mutationFn: async ({
      documentId,
      fileName,
    }: {
      documentId: number;
      fileName: string;
    }) => updateFileName(quotationId, documentId, fileName),
    meta: {
      invalidates: [],
    },
  });
}
