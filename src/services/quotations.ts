import type { DocumentPickerAsset } from "expo-document-picker";

import { apiDelete, apiGet, apiPost, apiPut } from "@/services/axiosInstance";
import type {
  LogisticsQuoteEnums,
  RegulatoryQuoteEnums,
} from "@/types/client-quotation";
import type { JobType } from "@/types/job-order";
import type {
  CreateQuotationRequestBody,
  FetchQuoteParamsByService,
  Quotation,
  QuotationFile,
  QuotationFileType,
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

export const fetchQuotation = (quotationId: number) =>
  apiGet<Quotation>(`quotations/${quotationId}`);

export const fetchQuotationFiles = (
  quotationId: number,
  type: QuotationFileType,
) =>
  apiGet<QuotationFile[]>(`quotations/${quotationId}/files`, {
    params: { type },
  });

export const uploadQuotationFile = (
  quotationId: number,
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

export const reassignAS = async (quotationId: number, asId: number) => {
  return apiPut(`quotations/${quotationId}/reassign-specialist`, {
    status: "APPROVED",
    as_id: asId,
  });
};

export const acceptQuotationProposal = (quotationId: number) =>
  apiPut<Quotation>(`quotations/${quotationId}/accept-proposal`);

export const deleteQuotation = (quotationId: number) =>
  apiDelete(`quotations/${quotationId}`);

interface QuoteEnumsMap {
  LOGISTICS: LogisticsQuoteEnums;
  REGULATORY: RegulatoryQuoteEnums;
}

export async function fetchQuotationEnumOptions<T extends JobType>(
  params: FetchQuoteParamsByService<T>,
) {
  return await apiGet<QuoteEnumsMap[T]>(`quotations/enum-options`, { params });
}
