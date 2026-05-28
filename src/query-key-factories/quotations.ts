import type { QuotationListQueryParams } from "@/types/quotations";

export const quotationKeys = {
  all: () => ["quotations"] as const,
  lists: () => [...quotationKeys.all(), "list"] as const,
  getQuotations: (filters?: QuotationListQueryParams) =>
    [...quotationKeys.lists(), filters] as const,
  details: () => [...quotationKeys.all(), "detail"] as const,
  getQuotation: (quotationId: string) =>
    [...quotationKeys.details(), { quotationId }] as const,
  getClientQuotationDocuments: (quotationId: string) =>
    [...quotationKeys.getQuotation(quotationId), "client-documents"] as const,
  getCompanyQuotationDocuments: (quotationId: string) =>
    [...quotationKeys.getQuotation(quotationId), "company-documents"] as const,
};
