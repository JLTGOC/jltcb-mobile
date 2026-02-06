import { QuoteForm } from "./../types/client";
import { apiPost } from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

export async function postClientQuote(formData: QuoteForm) {
  const token = await SecureStore.getItemAsync("token");

  if (!token) throw new Error("No authentication token found");

  const response = await apiPost<{ data: any }, QuoteForm>(
    "/quotations",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
}
