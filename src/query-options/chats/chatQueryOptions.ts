import { chatKeys } from "@/src/query-key-factories/chats";
import { fetchConversationData } from "@/src/services/chats";
import { queryOptions } from "@tanstack/react-query";

export const chatQueryOptions = (conversationId: string) =>
  queryOptions({
    queryKey: chatKeys.getChat(conversationId),
    queryFn: () => fetchConversationData(conversationId),
  });
