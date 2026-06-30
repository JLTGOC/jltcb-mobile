import { useMutation } from "@tanstack/react-query";
import type { DocumentPickerAsset } from "expo-document-picker";

import { dashboardQueries } from "@/queries/dashboard";
import { quotationQueries } from "@/queries/quotations";
import { uploadQuotationFile } from "@/services/quotations";
import type { QuotationStatus } from "@/types/quotations";

interface MutationVariables {
  quotationId: number;
  file: DocumentPickerAsset;
}

export function useUploadQuotationFileMutation(status: QuotationStatus) {
  const quotationQueryKeysToInvalidate =
    status === "REQUESTED"
      ? [
          quotationQueries.list({ filter: { status: "REQUESTED" } }).queryKey,
          quotationQueries.list({ filter: { status: "RESPONDED" } }).queryKey,
        ]
      : [quotationQueries.list({ filter: { status } }).queryKey];

  return useMutation({
    mutationFn: ({ quotationId, file }: MutationVariables) =>
      uploadQuotationFile(quotationId, file),
    meta: {
      invalidates: [
        ...quotationQueryKeysToInvalidate,
        dashboardQueries.detail().queryKey,
      ],
    },
  });
}
