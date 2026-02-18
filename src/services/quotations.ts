import type { DocumentPickerAsset } from "expo-document-picker";
import type {
	ASRequestedQuotation,
	ASRespondedQuotation,
	QuotationDetails,
	QuotationFilter,
} from "../types/quotations";
import { apiGet, apiPost } from "./axiosInstance";

export const fetchQuotations = <T extends "REQUESTED" | "RESPONDED">({
	filter,
	search,
}: QuotationFilter<T>) =>
	apiGet<
		T extends "REQUESTED" ? ASRequestedQuotation[] : ASRespondedQuotation[]
	>("quotations", {
		params: { "filter[status]": filter, search },
	});

export const fetchQuotation = (quotationId: string) =>
	apiGet<QuotationDetails>(`quotations/${quotationId}`);

export const uploadQuotationFile = (
	quotationId: string,
	file: DocumentPickerAsset,
) => {
	const formData = new FormData();
	formData.append("file", {
		uri: file.uri,
		name: file.name,
		type: file.mimeType ?? "application/octet-stream",
	} as unknown as Blob);
	return apiPost(`/quotations/${quotationId}/upload`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
