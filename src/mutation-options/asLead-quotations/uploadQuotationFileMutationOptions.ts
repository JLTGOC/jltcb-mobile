import { mutationOptions } from "@tanstack/react-query";
import type { DocumentPickerAsset } from "expo-document-picker";

import { dashboardKeys } from "@/src/query-key-factories/dashboard";
import { quotationKeys } from "@/src/query-key-factories/quotations";
import { uploadQuotationFile } from "@/src/services/quotations";
import type { QuotationStatus } from "@/src/types/quotations";

export const uploadQuotationFileMutationOptions = ({
  userId,
  status,
}: {
  userId: string;
  status?: QuotationStatus;
}) =>
  mutationOptions({
    mutationFn: (variables: {
      quotationId: string;
      file: DocumentPickerAsset;
    }) => uploadQuotationFile(variables.quotationId, variables.file),
    meta: {
      invalidatesQuery: [
        ...(status
          ? [quotationKeys.getQuotations({ filter: status })]
          : [
              quotationKeys.getQuotations({ filter: "REQUESTED" }),
              quotationKeys.getQuotations({ filter: "RESPONDED" }),
            ]),
        dashboardKeys.getDashboard(userId),
      ],
    },
  });
