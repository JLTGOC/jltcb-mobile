import { useMutation } from "@tanstack/react-query";
import { sendFileMutationOptions } from "../mutation-options/sendFileMutationOptions";

export function useSendFileMutation(conversationId: string) {
  return useMutation(sendFileMutationOptions(conversationId));
}
