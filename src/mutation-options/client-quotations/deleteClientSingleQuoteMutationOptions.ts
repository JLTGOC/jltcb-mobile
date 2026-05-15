import { mutationOptions } from "@tanstack/react-query";

import { clientQuotationKeys } from "@/query-key-factories/clientQuotations";
import { dashboardKeys } from "@/query-key-factories/dashboard";
import { deleteClientSingleQuote } from "@/services/clientQuotation";

export const deleteClientSingleQuoteMutationOptions = (userId: string) =>
	mutationOptions({
		mutationFn: (quotationId: number | string) => {
			const normalizedId =
				typeof quotationId === "string" ? Number(quotationId) : quotationId;

			if (!Number.isFinite(normalizedId)) {
				throw new Error(
					`Invalid quotation id for delete: ${String(quotationId)}`,
				);
			}

			return deleteClientSingleQuote(normalizedId);
		},
		meta: {
			invalidatesQuery: [
				clientQuotationKeys.getQuotes({ status: "RESPONDED" }),
				dashboardKeys.getDashboard(userId),
			],
		},
	});
