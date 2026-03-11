import { clientQuotationKeys } from "@/src/query-key-factories/clientQuotations";
import { fetchClientQuotes } from "@/src/services/clientQuotation";
import type { QuotesParams } from "@/src/types/client-type";
import { queryOptions } from "@tanstack/react-query";

export const clientQuotesQueryOptions = (params: QuotesParams) =>
  queryOptions({
    queryKey: clientQuotationKeys.getQuotes(params),
    queryFn: () => fetchClientQuotes(params),
  });
