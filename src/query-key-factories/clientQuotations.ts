import type { FetchQuoteParamsByService } from "@/src/services/clientQuotation";
import type { QuotesParams } from "@/src/types/client-quotation";
import type { JobType } from "@/src/types/job-order";

export const clientQuotationKeys = {
  all: () => ["quotes"] as const,
  getEnums: (params: FetchQuoteParamsByService<JobType>) =>
    [...clientQuotationKeys.all(), "enums", { params }] as const,
  getQuotes: (params: QuotesParams) =>
    [...clientQuotationKeys.all(), "list", { params }] as const,
  getQuote: (quotationId: number) =>
    [...clientQuotationKeys.all(), "detail", { quotationId }] as const,
};
