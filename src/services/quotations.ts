import type { DocumentPickerAsset } from "expo-document-picker";

import { apiGet, apiPost, apiPut } from "@/src/services/axiosInstance";
import type {
	ASAcceptedQuotation,
	ASRequestedQuotationSummary,
	ASRespondedQuotation,
	CreateQuotationRequestBody,
	Quotation,
	QuotationFile,
	QuotationFilter,
	QuotationStatus,
} from "@/src/types/quotations";
import { jsonToFormData } from "../utils/jsonToFormData";

interface QuotationResponseMap {
	REQUESTED: ASRequestedQuotationSummary;
	RESPONDED: ASRespondedQuotation;
	ACCEPTED: ASAcceptedQuotation;
	DISCARDED: unknown;
}

export const fetchQuotations = <T extends QuotationStatus>({
	filter,
	search,
}: QuotationFilter<T>) =>
	apiGet<QuotationResponseMap[T][]>("quotations", {
		params: { "filter[status]": filter, search },
	});

export const createQuotation = (payload: CreateQuotationRequestBody) => {
	const formData = jsonToFormData(payload);

	return apiPost("quotations", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const fetchQuotation = (quotationId: string) =>
	apiGet<Quotation>(`quotations/${quotationId}`);

export const fetchClientQuotationDocuments = (quotationId: string) =>
	apiGet<QuotationFile[]>(`quotations/${quotationId}/files`, {
		params: { type: "REQUESTED" },
	});

export const fetchCompanyQuotationDocuments = (quotationId: string) =>
	apiGet<QuotationFile[]>(`quotations/${quotationId}/files`, {
		params: { type: "PROPOSAL" },
	});

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

export const updateFileName = (
	quotationId: number,
	documentId: number,
	fileName: string,
) => {
	const body = { file_name: fileName };

	return apiPut(`/quotations/${quotationId}/files/${documentId}`, body);
};

export const updateAsQuotation = async (quotationId: number, asId: number) => {
	return apiPut(`quotations/${quotationId}/reassign-specialist`, {
		status: "APPROVED",
		as_id: asId,
	});
};

export const acceptQuotation = (quotationId: number) =>
	apiPut<Quotation>(`quotations/${quotationId}/accept-proposal`);
