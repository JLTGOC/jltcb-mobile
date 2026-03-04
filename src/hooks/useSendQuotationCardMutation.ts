import { useMutation } from "@tanstack/react-query";
import { sendQuotationCardMutationOptions } from "../mutation-options/sendQuotationCardMutationOptions";

export function useSendQuotationCardMutation() {
  return useMutation(sendQuotationCardMutationOptions())
} 