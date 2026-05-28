import type { DocumentPickerAsset } from "expo-document-picker";

import { apiGet, apiPost, apiPut } from "@/services/axiosInstance";
import type {
  CreateQuotationRequestBody,
  Quotation,
  QuotationFile,
  QuotationListQueryParams,
} from "@/types/quotations";
import { jsonToFormData } from "@/utils/jsonToFormData";

export const fetchQuotations = <T>(params?: QuotationListQueryParams) =>
  apiGet<T>("quotations", { params });

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
