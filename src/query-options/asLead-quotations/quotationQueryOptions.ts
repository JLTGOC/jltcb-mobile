import { queryOptions } from "@tanstack/react-query";

import { quotationKeys } from "@/query-key-factories/quotations";
import { fetchQuotation } from "@/services/quotations";

export const quotationQueryOptions = (quotationId: string) =>
  queryOptions({
    queryKey: quotationKeys.getQuotation(quotationId),
    queryFn: () => fetchQuotation(quotationId),
  });
