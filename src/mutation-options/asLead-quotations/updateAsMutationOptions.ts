import { quotationKeys } from "@/src/query-key-factories/asLeadQuotations";
import { updateAsQuotation } from "@/src/services/quotations";
import type { UpdateAsArgs } from "@/src/types/quotations";
import { mutationOptions } from "@tanstack/react-query";

export const updateAsMutationOptions = mutationOptions({
  mutationFn: ({ quotationId, asId }: UpdateAsArgs) =>
    updateAsQuotation(quotationId, asId),
  meta: {
    invalidatesQuery: quotationKeys.getQuotations({ filter: "REQUESTED" }),
  },
});
