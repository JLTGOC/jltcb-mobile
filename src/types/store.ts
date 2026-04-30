import type { LogisticsQuotationFormSlice } from "@/src/stores/slices/client-quotation-form-slices/createLogisticsFormSlice";
import type { QuotationFormHeaderSlice } from "@/src/stores/slices/client-quotation-form-slices/createQuotationFormHeaderSlice";
import type { RegulatoryQuotationFormSlice } from "@/src/stores/slices/client-quotation-form-slices/createRegulatoryFormSlice";
import type { SharedQuotationFormSlice } from "@/src/stores/slices/client-quotation-form-slices/createSharedQuotationFormSlice";
import type { LogisticsFormSlice } from "@/src/stores/slices/job-order-form-slices/createLogisticsFormSlice";
import type { QuotationReferenceSlice } from "@/src/stores/slices/job-order-form-slices/createQuotationReferenceSlice";

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
