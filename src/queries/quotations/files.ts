import { fetchQuotationFiles } from "@/services/quotations";
import type { QuotationFileType } from "@/types/quotations";
import { queryOptions } from "@tanstack/react-query";
import { quotationQueries } from ".";

export const quotationFileQueries = {
  all: (id: number) => [quotationQueries.detail(id).queryKey, "files"],
  lists: (id: number) => [...quotationFileQueries.all(id), "list"],
  // REQUESTED: files uploaded by client, PROPOSAL: files uploaded by company
  list: (id: number, type: QuotationFileType) =>
    queryOptions({
      queryKey: [...quotationFileQueries.lists(id), { type }],
      queryFn: () => fetchQuotationFiles(id, type),
    }),
  details: (quotationId: number, fileId: number) => [
    ...quotationFileQueries.all(quotationId),
    "detail",
    fileId,
  ],
  detail: (quotationId: number, fileId: number) => [
    ...quotationFileQueries.details(quotationId, fileId),
  ],
};
