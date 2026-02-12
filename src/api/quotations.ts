import { apiGet } from "../services/axiosInstance";
import type {
	ASRequestedQuotation,
	QuotationDetails,
	QuotationFilter,
} from "../types/quotations";

export const fetchQuotations = ({ filter, search }: QuotationFilter) =>
	apiGet<ASRequestedQuotation[]>("quotations", {
		params: { "filter[status]": filter, search },
	});

export const fetchQuotation = (quotationId: string) =>
	apiGet<QuotationDetails>(`quotations/${quotationId}`);
