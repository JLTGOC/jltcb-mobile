import { apiGet } from "./axiosInstance";
import { JobOrderResponse } from "../types/job-order";

export async function fetchJobOrders() {
    return (await apiGet<JobOrderResponse>("job-orders")).data;
}