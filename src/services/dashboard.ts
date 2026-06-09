import { apiGet } from "./axiosInstance";

export const fetchDashboard = <T>() => apiGet<T>("dashboard");
