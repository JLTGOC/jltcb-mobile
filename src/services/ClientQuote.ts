import {
  QuoteForm,
  QuotesParams,
  ClientQuoteResponse,
} from "./../types/client";
import { apiPost, apiGet, apiPut } from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

//Post Quote
export async function postClientQuote(formData: QuoteForm) {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No authentication token found");

  const data = new FormData();

  // 1. Append the File
  if (formData.files && formData.files.length > 0) {
    const file = formData.files[0];

    data.append("files[]", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    } as any);
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

  const response = await apiPost(`quotations`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function fetchClientQuotes({ status, search }: QuotesParams) {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const params = {
    "filter[status]": status,
    search: search || undefined,
  };

  const response = await apiGet(`quotations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data;
}

//Get PER Quotation of the Client
export async function fetchClientQuote(id: number): Promise<QuoteForm> {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiGet<QuoteForm>(`quotations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("CleintQuote.tsx - fetchClientQuote", response);
  return response.data;
}

//Update Quotation of the Client
export async function updateClientQuote(
  id: number,
  formData: QuoteForm,
): Promise<ClientQuoteResponse> {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiPost<ClientQuoteResponse>(
    `quotations/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("ClientQuote.tsx - updateClientQuote", response);
  return response.data;
}
