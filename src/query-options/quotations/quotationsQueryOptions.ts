import { queryOptions } from "@tanstack/react-query";

import { quotationKeys } from "@/query-key-factories/quotations";
import { fetchQuotations } from "@/services/quotations";
import type { QuotationListQueryParams } from "@/types/quotations";

export const quotationsQueryOptions = <T>(params?: QuotationListQueryParams) =>
  queryOptions({
    queryKey: quotationKeys.getQuotations(params),
    queryFn: () => fetchQuotations<T>(params),
  });
