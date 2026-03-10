import { mutationOptions } from "@tanstack/react-query";
import { sendImage } from "../services/chats";
import type { SendImageBody } from "../types/chats";

export const sendImageMutationOptions = (conversationId: string) =>
  mutationOptions({
    mutationFn: (data: SendImageBody) => sendImage(conversationId, data),
  });
