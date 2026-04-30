import { queryOptions } from "@tanstack/react-query";

import { clientQuotationKeys } from "@/src/query-key-factories/clientQuotations";
import {
	type FetchQuoteParamsByService,
	fetchClientQuotes,
	fetchGetQuoteEnums,
} from "@/src/services/clientQuotation";
import type { QuotesParams } from "@/src/types/client-quotation";
import type { JobType } from "@/src/types/job-order";

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
