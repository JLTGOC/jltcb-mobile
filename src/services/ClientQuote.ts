import { QuoteForm, QuotesParams, ClientQuoteResponse} from "./../types/client";
import { apiPost, apiGet,apiPut } from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

//Post Quote
export async function postClientQuote(formData: QuoteForm) {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiPost< QuoteForm>(
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
export async function fetchClientQuote(id: number): Promise<QuoteForm> {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiGet<QuoteForm>(`quotations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("CleintQuote.tsx - fetchClientQuote",response)
  return response.data;
}

//Update Quotation of the Client
export async function updateClientQuote(id: number, formData: QuoteForm): Promise<ClientQuoteResponse> {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiPost<ClientQuoteResponse>(`quotations/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("ClientQuote.tsx - updateClientQuote",response)
  return response.data;
}