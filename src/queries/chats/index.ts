import { queryOptions } from "@tanstack/react-query";

import { fetchChat, fetchChats } from "@/services/chats";

export const chatQueries = {
  all: () => ["chats"],
  lists: () => [...chatQueries.all(), "list"],
  list: (filters: string) =>
    queryOptions({
      queryKey: [...chatQueries.lists(), { filters }],
      queryFn: () => fetchChats(filters),
    }),
  details: () => [...chatQueries.all(), "detail"],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...chatQueries.details(), id],
      queryFn: () => fetchChat(id),
    }),
};
