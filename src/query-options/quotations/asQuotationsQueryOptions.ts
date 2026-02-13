import { queryOptions } from "@tanstack/react-query";
import { fetchQuotations } from "@/src/api/quotations";
import { quotationKeys } from "@/src/query-key-factories/quotations";
import type { QuotationFilter } from "@/src/types/quotations";

export const asQuotationsQueryOptions = <T extends "REQUESTED" | "RESPONDED">(
	filter: QuotationFilter<T>,
) =>
	queryOptions({
		queryKey: quotationKeys.getQuotations(filter),
		queryFn: () => fetchQuotations(filter),
	});
