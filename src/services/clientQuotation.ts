import * as SecureStore from "expo-secure-store";
import {
  ClientQuoteResponse,
  QuoteForm,
  QuotesParams,
} from "../types/client-type";
import { apiGet, apiPost } from "./axiosInstance";
import {
  appendFilesToFormData,
  appendObjectToFormData,
} from "../helper/client-form-helper";

// Post Quote
export async function postClientQuote(formData: QuoteForm) {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No authentication token found");

  const data = new FormData();

  appendFilesToFormData(data, formData.documents);
  appendObjectToFormData(data, formData.company, "company");
  appendObjectToFormData(data, formData.service, "service");
  appendObjectToFormData(data, formData.commodity, "commodity");
  appendObjectToFormData(data, formData.shipment, "shipment");

  return (await apiPost(`quotations`, data)).data;
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

// Update Quote
export async function updateClientQuote(
  id: number,
  formData: QuoteForm,
): Promise<ClientQuoteResponse> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No authentication token found");

  const data = new FormData();

  // Only new files (local URIs)
  const newFiles =
    formData.documents?.filter(
      (doc) =>
        doc.file_url.startsWith("file://") ||
        doc.file_url.startsWith("content://"),
    ) || [];
  appendFilesToFormData(data, newFiles);

  if (formData.account_specialist) {
    data.append("account_specialist", formData.account_specialist);
  }

  appendObjectToFormData(data, formData.company, "company");
  appendObjectToFormData(data, formData.service, "service");
  appendObjectToFormData(data, formData.commodity, "commodity");
  appendObjectToFormData(data, formData.shipment, "shipment");

  if (formData.removed_documents?.length) {
    formData.removed_documents.forEach((id) =>
      data.append("removed_documents[]", id.toString()),
    );
  }

  return (await apiPost<ClientQuoteResponse>(`quotations/${id}`, data)).data;
}
