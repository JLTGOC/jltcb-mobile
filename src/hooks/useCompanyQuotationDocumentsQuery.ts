import { useQuery } from "@tanstack/react-query";

import { quotationKeys } from "@/query-key-factories/quotations";
import { fetchCompanyQuotationDocuments } from "@/services/quotations";

export function useCompanyQuotationDocumentsQuery(quotationId: string) {
	return useQuery({
		queryKey: quotationKeys.getCompanyQuotationDocuments(quotationId),
		queryFn: async () => fetchCompanyQuotationDocuments(quotationId),
		enabled: !!quotationId,
	});
}
