import { mutationOptions } from "@tanstack/react-query";

import { dashboardKeys } from "@/query-key-factories/dashboard";
import { createQuotation } from "@/services/quotations";
import type { CreateQuotationRequestBody } from "@/types/quotations";

export const createQuotationMutationOptions = (userId: string) =>
	mutationOptions({
		mutationFn: async (payload: CreateQuotationRequestBody) =>
			createQuotation(payload),
		meta: {
			invalidatesQuery: dashboardKeys.getDashboard(userId),
		},
	});
