import { mutationOptions } from "@tanstack/react-query";

import { sendQuotationCard } from "@/services/chats";
import type { ApiResponse } from "@/types/api";

export const sendQuotationCardMutationOptions = () =>
	mutationOptions<ApiResponse<{ conversation_id: string }>, Error, string>({
		mutationFn: (quotationId: string) => sendQuotationCard(quotationId),
		meta: {
			invalidatesQuery: ["RESPONDED"],
		},
	});
