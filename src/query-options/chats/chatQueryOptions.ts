import { queryOptions } from "@tanstack/react-query";

import { chatKeys } from "@/query-key-factories/chats";
import { fetchConversationData } from "@/services/chats";

export const chatQueryOptions = (conversationId: string) =>
	queryOptions({
		queryKey: chatKeys.getChat(conversationId),
		queryFn: () => fetchConversationData(conversationId),
	});
