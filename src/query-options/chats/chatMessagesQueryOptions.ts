import { chatKeys } from "@/src/query-key-factories/chats";
import { fetchChatMessages } from "@/src/services/chats";
import { queryOptions } from "@tanstack/react-query";

export const chatMessagesQueryOptions = (conversationId: string) =>
  queryOptions({
    queryKey: chatKeys.getChat(conversationId),
    queryFn: () => fetchChatMessages(conversationId),
  });
