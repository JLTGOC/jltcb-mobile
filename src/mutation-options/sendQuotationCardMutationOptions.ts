import { mutationOptions } from "@tanstack/react-query";
import { sendQuotationCard } from "../services/chats";

export const sendQuotationCardMutationOptions = () =>
  mutationOptions({
    mutationFn: (quotationId: string) => sendQuotationCard(quotationId),
    meta: {
      invalidatesQuery: ["RESPONDED"],
    },
  });
