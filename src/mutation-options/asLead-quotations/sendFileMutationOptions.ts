import { sendFile } from "@/src/services/chats";
import type { SendFileBody } from "@/src/types/chats";
import { mutationOptions } from "@tanstack/react-query";

export const sendFileMutationOptions = (conversationId: string) =>
  mutationOptions({
    mutationFn: (data: SendFileBody) => sendFile(conversationId, data),
  });
