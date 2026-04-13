import { clientQuotationKeys } from "@/src/query-key-factories/clientQuotations";
import { fetchClientQuotes, fetchGetQuoteEnums } from "@/src/services/clientQuotation";
import type { QuotesParams } from "@/src/types/client-quotation";
import { queryOptions } from "@tanstack/react-query";

export const clientQuotesQueryOptions = (params: QuotesParams) =>
  queryOptions({
    queryKey: clientQuotationKeys.getQuotes(params),
    queryFn: () => fetchClientQuotes(params),
  });

export const clientQuoteEnumsQueryOptions = () =>
  queryOptions({
    queryKey: clientQuotationKeys.getEnums(),
    queryFn: fetchGetQuoteEnums,
  });
