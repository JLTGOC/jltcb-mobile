import { queryOptions } from "@tanstack/react-query";

import { chatKeys } from "@/query-key-factories/chats";
import { fetchChats } from "@/services/chats";

export const chatsQueryOptions = (search: string) =>
  queryOptions({
    queryKey: chatKeys.getChats(search),
    queryFn: () => fetchChats(search),
  });
