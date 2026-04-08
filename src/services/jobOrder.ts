import {
  CreateJobOrderRequestBody,
  JobOrderResponse,
} from "../types/job-order";
import { apiGet, apiPost } from "./axiosInstance";

export async function fetchJobOrders() {
  return (await apiGet<JobOrderResponse>("job-orders")).data;
}

export const createJobOrder = (data: CreateJobOrderRequestBody) =>
  apiPost("job-orders", data);
