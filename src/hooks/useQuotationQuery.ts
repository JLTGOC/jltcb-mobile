import { useQuery } from "@tanstack/react-query";

import { quotationQueryOptions } from "@/query-options/asLead-quotations/quotationQueryOptions";

export function useQuotationQuery(quotationId: string) {
  return useQuery(quotationQueryOptions(quotationId));
}
