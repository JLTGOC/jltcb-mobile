import { apiGet } from "./axiosInstance";

export const fetchDashboardData = <T>() => apiGet<T>("dashboard");
