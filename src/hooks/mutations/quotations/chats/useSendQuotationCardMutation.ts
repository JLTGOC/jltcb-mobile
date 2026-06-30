import { useMutation } from "@tanstack/react-query";

import { sendQuotationCard } from "@/services/chats";

export function useSendQuotationCardMutation() {
  return useMutation({
    mutationFn: (quotationId: string) => sendQuotationCard(quotationId),
    meta: {
      invalidates: [["RESPONDED"]],
    },
  });
}
