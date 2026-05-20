import { infiniteQueryOptions } from "@tanstack/react-query";

import { chatKeys } from "@/query-key-factories/chats";
import { fetchChatMessages } from "@/services/chats";

export const chatMessagesInfiniteQueryOptions = (conversationId: string) =>
  infiniteQueryOptions({
    queryKey: chatKeys.getMessages(conversationId),
    queryFn: ({ pageParam }) => fetchChatMessages(conversationId, pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage) =>
      lastPage.data.pagination.next_cursor ?? undefined,
  });
