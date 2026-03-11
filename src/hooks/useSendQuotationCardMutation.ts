import { useMutation } from "@tanstack/react-query";
import { sendQuotationCardMutationOptions } from "../mutation-options/asLead-quotations/sendQuotationCardMutationOptions";
import type { ApiResponse } from "../types/api";

export function useSendQuotationCardMutation() {
  return useMutation<ApiResponse<{ conversation_id: string }>, Error, string>(
    sendQuotationCardMutationOptions(),
  );
} 