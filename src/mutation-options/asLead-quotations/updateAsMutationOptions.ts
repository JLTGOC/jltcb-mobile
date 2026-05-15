import { mutationOptions } from "@tanstack/react-query";

import { quotationKeys } from "@/query-key-factories/quotations";
import { updateAsQuotation } from "@/services/quotations";
import type { UpdateAsArgs } from "@/types/quotations";

export const updateAsMutationOptions = mutationOptions({
	mutationFn: ({ quotationId, asId }: UpdateAsArgs) =>
		updateAsQuotation(quotationId, asId),
	meta: {
		invalidatesQuery: quotationKeys.getQuotations({ filter: "REQUESTED" }),
	},
});
