import { useQuery } from "@tanstack/react-query";

import { quotationKeys } from "@/query-key-factories/quotations";
import { fetchClientQuotationDocuments } from "@/services/quotations";

export function useClientQuotationDocumentsQuery(quotationId: string) {
  return useQuery({
    queryKey: quotationKeys.getClientQuotationDocuments(quotationId),
    queryFn: async () => fetchClientQuotationDocuments(quotationId),
    enabled: !!quotationId,
  });
}
