import { queryOptions } from "@tanstack/react-query";

import { clientQuotationKeys } from "@/query-key-factories/clientQuotations";
import {
  type FetchQuoteParamsByService,
  fetchClientQuotes,
  fetchGetQuoteEnums,
} from "@/services/clientQuotation";
import type { QuotesParams } from "@/types/client-quotation";
import type { JobType } from "@/types/job-order";

export const clientQuotesQueryOptions = (params: QuotesParams) =>
  queryOptions({
    queryKey: clientQuotationKeys.getQuotes(params),
    queryFn: () => fetchClientQuotes(params),
  });

export const clientQuoteEnumsQueryOptions = <T extends JobType>(
  params: FetchQuoteParamsByService<T>,
) =>
  queryOptions({
    queryKey: clientQuotationKeys.getEnums(params),
    queryFn: () => fetchGetQuoteEnums(params),
  });
