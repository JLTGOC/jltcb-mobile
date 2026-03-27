import { queryOptions } from "@tanstack/react-query";
import { quotationKeys } from "@/src/query-key-factories/asLeadQuotations";
import { fetchQuotations } from "@/src/services/quotations";
import type { QuotationFilter, QuotationStatus } from "@/src/types/quotations";

export const asQuotationsQueryOptions = <T extends QuotationStatus>(
	filter: QuotationFilter<T>,
) =>
	queryOptions({
		queryKey: quotationKeys.getQuotations(filter),
		queryFn: () => fetchQuotations(filter),
	});
