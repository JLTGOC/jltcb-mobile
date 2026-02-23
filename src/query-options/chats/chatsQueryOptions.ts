import { chatKeys } from "@/src/query-key-factories/chats";
import { fetchChats } from "@/src/services/chats";
import { queryOptions } from "@tanstack/react-query";

export const chatsQueryOptions = (search: string) =>
  queryOptions({
    queryKey: chatKeys.getChats(search),
    queryFn: () => fetchChats(search),
  });
