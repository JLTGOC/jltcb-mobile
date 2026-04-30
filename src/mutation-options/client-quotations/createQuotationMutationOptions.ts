import { mutationOptions } from "@tanstack/react-query";

import { dashboardKeys } from "@/src/query-key-factories/dashboard";
import { createQuotation } from "@/src/services/quotations";
import type { CreateQuotationRequestBody } from "@/src/types/quotations";

export const createQuotationMutationOptions = (userId: string) =>
	mutationOptions({
		mutationFn: async (payload: CreateQuotationRequestBody) =>
			createQuotation(payload),
		meta: {
			invalidatesQuery: dashboardKeys.getDashboard(userId),
		},
	});
