<<<<<<< HEAD
import type { LogisticsServiceFormSlice } from "@/src/stores/slices/job-order-form-slice";

export type Store = LogisticsServiceFormSlice;
=======
import type { LogisticsQuotationFormSlice } from "@/stores/slices/client-quotation-form-slices/createLogisticsFormSlice";
import type { QuotationFormHeaderSlice } from "@/stores/slices/client-quotation-form-slices/createQuotationFormHeaderSlice";
import type { RegulatoryQuotationFormSlice } from "@/stores/slices/client-quotation-form-slices/createRegulatoryFormSlice";
import type { SharedQuotationFormSlice } from "@/stores/slices/client-quotation-form-slices/createSharedQuotationFormSlice";
import type { LogisticsFormSlice } from "@/stores/slices/job-order-form-slices/createLogisticsFormSlice";
import type { QuotationReferenceSlice } from "@/stores/slices/job-order-form-slices/createQuotationReferenceSlice";

type ResetStore = {
  reset: () => void;
};

export type JobOrderFormStore = LogisticsFormSlice &
  QuotationReferenceSlice &
  ResetStore;

export type ClientQuotationFormStore = QuotationFormHeaderSlice &
  SharedQuotationFormSlice &
  LogisticsQuotationFormSlice &
  RegulatoryQuotationFormSlice &
  ResetStore;
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
