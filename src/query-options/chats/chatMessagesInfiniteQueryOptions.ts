import { chatKeys } from "@/src/query-key-factories/chats";
import { fetchChatMessages } from "@/src/services/chats";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const chatMessagesInfiniteQueryOptions = (conversationId: string) =>
  infiniteQueryOptions({
    queryKey: chatKeys.getMessages(conversationId),
    queryFn: ({ pageParam }) => fetchChatMessages(conversationId, pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage) => lastPage.data.pagination.next_cursor ?? undefined,
  });