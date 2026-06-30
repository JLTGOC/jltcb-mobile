import type { Quotation } from "@/types/quotations";
import { useAuth } from "./useAuth";

export function useQuotationBannerTitle(quotation?: Quotation) {
  const { role } = useAuth();

  switch (role) {
    case "Operations": {
      return String(quotation?.job_order?.reference_number ?? "");
    }

    default: {
      return quotation?.client ?? "";
    }
  }
}
