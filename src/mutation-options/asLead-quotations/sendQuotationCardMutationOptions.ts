import { mutationOptions } from "@tanstack/react-query";
import { sendQuotationCard } from "@/src/services/chats";
import type { ApiResponse } from "@/src/types/api";

export const sendQuotationCardMutationOptions = () =>
  mutationOptions<ApiResponse<{ conversation_id: string }>, Error, string>({
    mutationFn: (quotationId: string) => sendQuotationCard(quotationId),
    meta: {
      invalidatesQuery: ["RESPONDED"],
    },
  });
