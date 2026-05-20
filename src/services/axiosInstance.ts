import {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  create,
} from "axios";
import * as SecureStore from "expo-secure-store";

import type { ApiResponse } from "@/types/api";

const baseURL = (process.env.EXPO_PUBLIC_API_URL ?? "").trim();

if (!baseURL) {
  throw new Error(
    "Missing EXPO_PUBLIC_API_URL. Please set it in .env and restart Expo.",
  );
}

const api = create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(token);

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message: string }>) => {
    const { data, status, config } = error.response!;

    const method = config.method?.toUpperCase();
    const url = config.url;

    const errorMessageHeader = `[${method}] ${url} -`;

    switch (status) {
      case 400:
        console.error(data);
        break;

      case 401:
        console.error("unauthorised");
        break;

      case 404:
        console.error("/not-found");
        break;

      case 500:
        console.error("/server-error");
        break;

      default:
        console.error(errorMessageHeader, data.message);
        console.error(errorMessageHeader, data);
    }
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const apiGet = <T = any, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
) => api.get<ApiResponse<T>>(url, config).then(responseBody);

export const apiPost = <T = any, D = any>(
  url: string,
  body?: D,
  config?: AxiosRequestConfig<D>,
) => api.post<ApiResponse<T>>(url, body, config).then(responseBody);

export const apiPut = <T = any, D = any>(
  url: string,
  body?: D,
  config?: AxiosRequestConfig<D>,
) => api.put<ApiResponse<T>>(url, body, config).then(responseBody);

export const apiDelete = <T = any, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
) => api.delete<ApiResponse<T>>(url, config).then(responseBody);

export default api;
