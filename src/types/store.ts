import type { LogisticsFormSlice } from "@/src/stores/slices/job-order-form-slices/createLogisticsFormSlice";
import type { QuotationReferenceSlice } from "@/src/stores/slices/job-order-form-slices/createQuotationReferenceSlice";

export type JobOrderFormStore = LogisticsFormSlice &
  QuotationReferenceSlice & { reset: () => void };
