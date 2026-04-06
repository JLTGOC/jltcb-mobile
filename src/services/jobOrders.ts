import type { JobOrderEnums } from "../types/jobOrders";
import { apiGet } from "./axiosInstance";

export const fetchJobOrderEnums = () =>
  apiGet<JobOrderEnums>("job-orders/enums");
