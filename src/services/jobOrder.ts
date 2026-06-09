import type {
  CreateJobOrderRequestBody,
  JobOrder,
  JobOrderListQueryParams,
  JobOrderResponse,
} from "@/types/job-order";
import { jsonToFormData } from "@/utils/jsonToFormData";
import { apiGet, apiPost, apiPut } from "./axiosInstance";

export const fetchJobOrders = (params?: JobOrderListQueryParams) =>
  apiGet<JobOrderResponse>("job-orders", { params });

export const createJobOrder = (data: CreateJobOrderRequestBody) => {
  const formData = jsonToFormData(data);

  return apiPost("job-orders", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchJobOrder = <T extends JobOrder>(id: number) =>
  apiGet<T>(`job-orders/${id}`);

export const acceptJobOrder = (jobOrderId: number) =>
  apiPut(`job-orders/${jobOrderId}/accept`);

export const fetchJobOrderFormEnums = (quotationReference?: string) =>
  apiGet<JobOrderResponse>("job-orders/enums", {
    params: { quotation_reference_number: quotationReference },
  });
