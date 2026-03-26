import type { DocumentPickerAsset } from "expo-document-picker";
import type {
	ASRequestedQuotation,
	ASRespondedQuotation,
	QuotationDetails,
	QuotationFilter,
} from "../types/quotations";
import { apiGet, apiPost, apiPut } from "./axiosInstance";

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

export const updateFileName = (
  quotationId: number,
  documentId: number,
  fileName: string,
) => {
  const body = { file_name: fileName };

  return apiPut(`/quotations/${quotationId}/files/${documentId}`, body);
};

export const updateAsQuotation = async (quotationId: number, asId: number) => {
  return apiPost(`quotations/${quotationId}`, { as_id: asId });
};

export const acceptQuotation = (quotationId: number) =>
  apiPut<QuotationDetails>(`quotations/${quotationId}/accept`);
