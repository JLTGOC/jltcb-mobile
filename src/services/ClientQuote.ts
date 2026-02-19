import * as SecureStore from "expo-secure-store";
import { ClientQuoteResponse, QuoteForm, QuotesParams } from "../types/client";
import { apiGet, apiPost } from "./axiosInstance";

//Post Quote
export async function postClientQuote(formData: QuoteForm) {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No authentication token found");

  const data = new FormData();

  if (formData.documents && formData.documents.length > 0) {
    formData.documents.forEach((document, index) => {
      data.append("documents[]", {
        uri: document.file_url,
        name: document.file_name || `file_${index}.pdf`,
        type: document.mimeType,
      } as any);
    });
  }

  if (formData.company) {
    Object.entries(formData.company).forEach(([key, value]) => {
      data.append(`company[${key}]`, value || "");
    });
  }

  if (formData.service) {
    Object.entries(formData.service).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          data.append(`service[${key}][]`, item);
        });
      } else {
        data.append(`service[${key}]`, value || "");
      }
    });
  }

  if (formData.commodity) {
    Object.entries(formData.commodity).forEach(([key, value]) => {
      data.append(`commodity[${key}]`, value?.toString() || "");
    });
  }

  if (formData.shipment) {
    Object.entries(formData.shipment).forEach(([key, value]) => {
      data.append(`shipment[${key}]`, value || "");
    });
  }

  const response = await apiPost(`quotations`, data);

  return response.data;
}

export async function fetchClientQuotes({ status, search }: QuotesParams) {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const params = {
    "filter[status]": status,
    search: search || undefined,
  };

  const response = await apiGet(`quotations`);
  return response.data;
}

//Get PER Quotation of the Client
export async function fetchClientQuote(id: number): Promise<QuoteForm> {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiGet<QuoteForm>(`quotations/${id}`);

  return response.data;
}

//Update Quotation of the Client
export async function updateClientQuote(
  id: number,
  formData: QuoteForm,
): Promise<ClientQuoteResponse> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No authentication token found");

  const data = new FormData();

  const newFiles =
    formData.documents?.filter(
      (document) =>
        document.file_url &&
        (document.file_url.startsWith("file://") ||
          document.file_url.startsWith("content://")),
    ) || [];

  if (newFiles.length > 0) {
    newFiles.forEach((file, index) => {
      data.append("files[]", {
        uri: file.file_url,
        name: file.file_name || `new_file_${index}`,
        type: file.mimeType || "image/jpeg",
      } as any);
    });
  }

  if (formData.account_specialist) {
    data.append("account_specialist", formData.account_specialist);
  }

  if (formData.company) {
    Object.entries(formData.company).forEach(([key, value]) => {
      data.append(`company[${key}]`, value || "");
    });
  }

  if (formData.service) {
    Object.entries(formData.service).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => data.append(`service[${key}][]`, item));
      } else {
        data.append(`service[${key}]`, value || "");
      }
    });
  }

  if (formData.commodity) {
    Object.entries(formData.commodity).forEach(([key, value]) => {
      data.append(`commodity[${key}]`, value?.toString() || "");
    });
  }

  if (formData.shipment) {
    Object.entries(formData.shipment).forEach(([key, value]) => {
      data.append(`shipment[${key}]`, value || "");
    });
  }

  if (formData.remove_documents && formData.remove_documents.length > 0) {
    formData.remove_documents.forEach((id: string | number) => {
      data.append("remove_documents[]", id.toString());
    });
  }

  const response = await apiPost<ClientQuoteResponse>(`quotations/${id}`, data);

  return response.data;
}
