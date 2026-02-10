import axios, {
  type AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";
import type { ApiResponse } from "../types/api";

const baseURL = process.env.EXPO_PUBLIC_API_URL

console.log("Requesting URL:", baseURL);
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
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
