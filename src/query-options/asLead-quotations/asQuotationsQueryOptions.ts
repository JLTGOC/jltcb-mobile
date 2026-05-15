import { queryOptions } from "@tanstack/react-query";

import { quotationKeys } from "@/query-key-factories/quotations";
import { fetchQuotations } from "@/services/quotations";
import type { QuotationFilter, QuotationStatus } from "@/types/quotations";

export const asQuotationsQueryOptions = <T extends QuotationStatus>(
	filter: QuotationFilter<T>,
) =>
	queryOptions({
		queryKey: quotationKeys.getQuotations(filter),
		queryFn: () => fetchQuotations(filter),
	});
