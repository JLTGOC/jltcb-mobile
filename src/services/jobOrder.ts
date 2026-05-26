import type {
  CreateJobOrderRequestBody,
  JobOrder,
  JobOrderListQueryParams,
  JobOrderResponse,
} from "@/types/job-order";
import { apiGet, apiPost, apiPut } from "./axiosInstance";

export const fetchJobOrders = (params?: JobOrderListQueryParams) =>
  apiGet<JobOrderResponse>("job-orders", { params });

export const createJobOrder = (data: CreateJobOrderRequestBody) =>
  apiPost("job-orders", data);

export const fetchJobOrder = <T extends JobOrder>(id: number) =>
  apiGet<T>(`job-orders/${id}`);

export const acceptJobOrder = (jobOrderId: number) =>
  apiPut(`job-orders/${jobOrderId}/accept`);
