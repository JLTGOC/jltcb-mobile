import type { QuotesParams } from "@/src/types/client-quotation";

export const clientQuotationKeys = {
  all: () => ["quotes"] as const,
  getQuotes: (params: QuotesParams) =>
    [...clientQuotationKeys.all(), "list", { params }] as const,
  getQuote: (quotationId: number) =>
    [...clientQuotationKeys.all(), "detail", { quotationId }] as const,
};
