import { quotationKeys } from "@/src/query-key-factories/asLeadQuotations";
import { fetchQuotation } from "@/src/services/quotations";
import { queryOptions } from "@tanstack/react-query";

export const quotationQueryOptions = (quotationId: string) =>
  queryOptions({
    queryKey: quotationKeys.getQuotation(quotationId),
    queryFn: () => fetchQuotation(quotationId),
  });
