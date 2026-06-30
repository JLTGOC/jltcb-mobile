import { fetchQuotation, fetchQuotations } from "@/services/quotations";
import type { QuotationListQueryParams } from "@/types/quotations";
import { cleanParams } from "@/utils/query";
import { queryOptions } from "@tanstack/react-query";

export const quotationQueries = {
  all: () => ["quotations"],
  lists: () => [...quotationQueries.all(), "list"],
  list: <T>(filters: QuotationListQueryParams = {}) => {
    const cleanedParams = cleanParams(filters);
    return queryOptions({
      queryKey: [...quotationQueries.lists(), cleanedParams],
      queryFn: () => fetchQuotations<T>(cleanedParams),
    });
  },
  details: () => [...quotationQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...quotationQueries.details(), id],
      queryFn: () => fetchQuotation(id),
    }),
};
