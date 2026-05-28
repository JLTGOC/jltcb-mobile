import { useQuery } from "@tanstack/react-query";

import { quotationsQueryOptions } from "@/query-options/quotations/quotationsQueryOptions";
import type { QuotationListQueryParams } from "@/types/quotations";

export function useQuotationsQuery<T>(params?: QuotationListQueryParams) {
  return useQuery(quotationsQueryOptions<T>(params));
}
