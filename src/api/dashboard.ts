import { apiGet } from "../services/axiosInstance";

export const fetchDashboardData = <T>() => apiGet<T>("dashboard");
