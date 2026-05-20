import type { FetchQuoteParamsByService } from "@/services/clientQuotation";
import type { QuotesParams } from "@/types/client-quotation";
import type { JobType } from "@/types/job-order";

export const clientQuotationKeys = {
  all: () => ["quotes"] as const,
  getEnums: (params: FetchQuoteParamsByService<JobType>) =>
    [...clientQuotationKeys.all(), "enums", { params }] as const,
  getQuotes: (params: QuotesParams) =>
    [...clientQuotationKeys.all(), "list", { params }] as const,
  getQuote: (quotationId: number) =>
    [...clientQuotationKeys.all(), "detail", { quotationId }] as const,
};
