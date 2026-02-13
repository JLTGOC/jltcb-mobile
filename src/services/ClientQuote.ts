import { QuoteForm, QuotesParams, ClientQuoteResponse} from "./../types/client";
import { apiPost, apiGet,apiPut } from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

//Post Quote
export async function postClientQuote(formData: QuoteForm) {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiPost<{ data: any }, QuoteForm>(
    `quotations`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
}

// Get all of the client Quote
export async function fetchClientQuotes({ status, search }: QuotesParams) {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const params = {
      "filter[status]": status,
      search: search || undefined,
    }

  const response = await apiGet(`quotations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data;
}

//Get PER Quotation of the Client
export async function fetchClientQuote(id: number): Promise<ClientQuoteResponse> {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiGet<ClientQuoteResponse>(`quotations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

//Update Quotation of the Client
export async function updateClientQuote(id: number): Promise<ClientQuoteResponse> {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiPut<ClientQuoteResponse>(`quotations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}