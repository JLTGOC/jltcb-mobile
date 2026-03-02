import axios, {
  AxiosError,
  type AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";
import type { ApiResponse } from "../types/api";

const baseURL = (process.env.EXPO_PUBLIC_API_URL ?? "").trim();

if (!baseURL) {
  throw new Error(
    "Missing EXPO_PUBLIC_API_URL. Please set it in .env and restart Expo.",
  );
}

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    const apiMessage = (response.data as { message?: string } | undefined)
      ?.message;
    const apiData = (response.data as { data?: unknown } | undefined)?.data;
    const method = response.config.method?.toUpperCase() ?? "REQUEST";
    const url = response.config.url ?? "";

    return response;
  },
  (error: AxiosError | unknown) => {
    let errorMessage = "Unknown API error";
    let errorData: unknown;
    let method = "REQUEST";
    let url = "";

    if (axios.isAxiosError(error)) {
      method = error.config?.method?.toUpperCase() ?? method;
      url = error.config?.url ?? url;
      errorData = error.response?.data;
      errorMessage =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message ??
        errorMessage;

      if (!error.response) {
        errorMessage = `Network Error. Check EXPO_PUBLIC_API_URL (${baseURL}) and device network access.`;
      }
    }

    console.error(`[API ${method}] ${url} - ${errorMessage}`);
    console.error(`[API ${method}] ${url} - error data:`, errorData);

    return Promise.reject(error);
  },
);

export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  const { data } = await api.get<ApiResponse<T>>(url, config);
  return data;
}

export async function apiPost<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
) {
  const { data } = await api.post<ApiResponse<T>>(url, body, config);
  return data;
}

export async function apiPut<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
) {
  const { data } = await api.put<ApiResponse<T>>(url, body, config);
  return data;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig) {
  const { data } = await api.delete<ApiResponse<T>>(url, config);
  return data;
}

export default api;
