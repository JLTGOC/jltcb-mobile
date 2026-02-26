import * as SecureStore from "expo-secure-store";
import {
  appendFilesToFormData,
  appendObjectToFormData,
} from "../helper/client-form-helper";
import type { ApiResponse } from "../types/api";
import {
  ClientQuoteResponse,
  QuoteForm,
  QuotesParams,
} from "../types/client-type";
import { apiDelete, apiGet, apiPost } from "./axiosInstance";

const getUploadableFiles = (documents: QuoteForm["documents"] | undefined) =>
  Array.isArray(documents)
    ? documents.filter(
        (doc) =>
          !!doc &&
          typeof doc.file_url === "string" &&
          doc.file_url.length > 0 &&
          (doc.file_url.startsWith("file://") ||
            doc.file_url.startsWith("content://")),
      )
    : [];

const getApiBaseUrl = () => {
  const apiBaseUrl = (process.env.EXPO_PUBLIC_API_URL ?? "").trim();

  if (!apiBaseUrl) {
    throw new Error("Missing EXPO_PUBLIC_API_URL");
  }

  return apiBaseUrl.endsWith("/") ? apiBaseUrl : `${apiBaseUrl}/`;
};

const toAbsoluteApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

const postMultipart = async <T>(
  path: string,
  token: string,
  body: FormData,
): Promise<ApiResponse<T>> => {
  const response = await fetch(toAbsoluteApiUrl(path), {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const rawResponse = await response.text();
  let parsedResponse: unknown = rawResponse;

  try {
    parsedResponse = rawResponse ? JSON.parse(rawResponse) : null;
  } catch {
    parsedResponse = rawResponse;
  }

  if (!response.ok) {
    const error = new Error(
      (parsedResponse as { message?: string } | null)?.message ??
        `HTTP ${response.status}`,
    ) as Error & {
      response?: {
        status: number;
        data: unknown;
      };
    };

    error.response = {
      status: response.status,
      data: parsedResponse,
    };

    throw error;
  }

  return parsedResponse as ApiResponse<T>;
};

// Post Quote
export async function postClientQuote(formData: QuoteForm) {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No authentication token found");

  const newFiles = getUploadableFiles(formData.documents);

  if (!newFiles.length) {
    return (
      await apiPost(`quotations`, {
        ...(formData.account_specialist
          ? { account_specialist: formData.account_specialist }
          : {}),
        ...(formData.company ? { company: formData.company } : {}),
        ...(formData.service ? { service: formData.service } : {}),
        ...(formData.commodity ? { commodity: formData.commodity } : {}),
        ...(formData.shipment ? { shipment: formData.shipment } : {}),
      })
    ).data;
  }

  const data = new FormData();

  appendFilesToFormData(data, newFiles);
  appendObjectToFormData(data, formData.company, "company");
  appendObjectToFormData(data, formData.service, "service");
  appendObjectToFormData(data, formData.commodity, "commodity");
  appendObjectToFormData(data, formData.shipment, "shipment");

  return (await postMultipart("quotations", token, data)).data;
}

// Update Quote
export async function updateClientQuote(
  id: number,
  formData: QuoteForm,
): Promise<ClientQuoteResponse> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No authentication token found");

  const newFiles = getUploadableFiles(formData.documents);
  const removedDocumentIds = Array.isArray(formData.removed_documents)
    ? [
        ...new Set(
          formData.removed_documents
            .map((value) =>
              typeof value === "number"
                ? value
                : Number.parseInt(String(value), 10),
            )
            .filter((value) => Number.isInteger(value) && value > 0),
        ),
      ]
    : [];

  if (!newFiles.length) {
    return (
      await apiPost<ClientQuoteResponse>(`quotations/${id}`, {
        ...(formData.account_specialist
          ? { account_specialist: formData.account_specialist }
          : {}),
        ...(formData.company ? { company: formData.company } : {}),
        ...(formData.service ? { service: formData.service } : {}),
        ...(formData.commodity ? { commodity: formData.commodity } : {}),
        ...(formData.shipment ? { shipment: formData.shipment } : {}),
        ...(removedDocumentIds.length
          ? { removed_documents: removedDocumentIds }
          : {}),
      })
    ).data;
  }

  const data = new FormData();

  appendFilesToFormData(data, newFiles);

  if (formData.account_specialist) {
    data.append("account_specialist", formData.account_specialist);
  }

  appendObjectToFormData(data, formData.company, "company");
  appendObjectToFormData(data, formData.service, "service");
  appendObjectToFormData(data, formData.commodity, "commodity");
  appendObjectToFormData(data, formData.shipment, "shipment");

  if (removedDocumentIds.length) {
    removedDocumentIds.forEach((removedDocumentId) =>
      data.append("removed_documents[]", removedDocumentId.toString()),
    );
  }

  return (
    await postMultipart<ClientQuoteResponse>(`quotations/${id}`, token, data)
  ).data;
}

// Fetch Quotes
export async function fetchClientQuotes({ status, search }: QuotesParams) {
  const params = {
    "filter[status]": status,
    search: search || undefined,
  };
  const response = await apiGet(`quotations`, {
    params,
  });
  return response.data;
}

// Get Single Quote
export async function fetchClientQuote(id: number): Promise<QuoteForm> {
  return (await apiGet<QuoteForm>(`quotations/${id}`)).data;
}

// Delete Single Quotation
export async function deleteClientSingleQuote(id: number) {
  return (await apiDelete(`quotations/${id}`)).data;
}
