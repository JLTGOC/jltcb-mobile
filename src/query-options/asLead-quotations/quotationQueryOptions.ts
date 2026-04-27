import { queryOptions } from "@tanstack/react-query";

import { quotationKeys } from "@/src/query-key-factories/quotations";
import { fetchQuotation } from "@/src/services/quotations";

export const quotationQueryOptions = (quotationId: string) =>
  queryOptions({
    queryKey: quotationKeys.getQuotation(quotationId),
    queryFn: () => fetchQuotation(quotationId),
  });
