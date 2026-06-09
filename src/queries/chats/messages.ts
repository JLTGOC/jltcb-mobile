import { infiniteQueryOptions } from "@tanstack/react-query";

import { fetchChatMessages } from "@/services/chats";
import { chatQueries } from ".";

export const chatMessageQueries = {
  all: (id: string) => [...chatQueries.detail(id).queryKey, "messages"],
  lists: (id: string) => [...chatMessageQueries.all(id), "list"],
  list: (id: string) =>
    infiniteQueryOptions({
      queryKey: [...chatMessageQueries.lists(id)],
      queryFn: ({ pageParam }) => fetchChatMessages(id, pageParam),
      initialPageParam: "0",
      getNextPageParam: (lastPage) =>
        lastPage.data.pagination.next_cursor ?? undefined,
    }),
};
