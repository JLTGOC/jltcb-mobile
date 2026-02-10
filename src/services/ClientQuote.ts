import { QuoteForm, QuoteParams} from "./../types/client";
import { apiPost, apiGet } from "./axiosInstance";
import * as SecureStore from "expo-secure-store";


//Post Quote
export async function postClientQuote(formData: QuoteForm) {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiPost<{ data: any }, QuoteForm>(
    "quotations",
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
export async function fetchClientQuote({ status, search }: QuoteParams) {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const params = {
      "filter[status]": status,
      search: search || undefined,
    }

  const response = await apiGet("quotations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data;
}
