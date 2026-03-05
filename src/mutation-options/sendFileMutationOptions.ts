import { mutationOptions } from "@tanstack/react-query";
import { sendFile } from "../services/chats";
import type { SendFileBody } from "../types/chats";

export const sendFileMutationOptions = (conversationId: string) =>
  mutationOptions({
    mutationFn: (data: SendFileBody) => sendFile(conversationId, data),
  });
