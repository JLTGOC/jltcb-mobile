import { quotationKeys } from "@/src/query-key-factories/quotations";
import { fetchQuotations } from "@/src/services/quotations";
import type { QuotationFilter } from "@/src/types/quotations";
import { queryOptions } from "@tanstack/react-query";

export const asQuotationsQueryOptions = <T extends "REQUESTED" | "RESPONDED">(
	filter: QuotationFilter<T>,
) =>
	queryOptions({
		queryKey: quotationKeys.getQuotations(filter),
		queryFn: () => fetchQuotations(filter),
	});
