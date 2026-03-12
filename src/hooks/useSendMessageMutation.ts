import {
	type InfiniteData,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "@/src/hooks/useAuth";
import { chatKeys } from "@/src/query-key-factories/chats";
import { sendMessage } from "@/src/services/chats";
import type {
	Message,
	MessagesApiResponse,
	SendMessageBody,
} from "@/src/types/chats";
import { useChatPendingIdsContext } from "../contexts/ChatPendingIdsContext";

export function useSendMessageMutation(conversationId: string) {
	const { userData } = useAuth();
	const queryClient = useQueryClient();
	const queryKey = chatKeys.getMessages(conversationId);
	const { addPending, removePending } = useChatPendingIdsContext();

	return useMutation({
		mutationFn: (data: SendMessageBody) => sendMessage(conversationId, data),
		onMutate: async (newMessage) => {
			addPending(newMessage.client_id);
			await queryClient.cancelQueries({ queryKey });

			const previousMessagesData =
				queryClient.getQueryData<InfiniteData<MessagesApiResponse>>(queryKey);

			const optimisticMessage: Message = {
				created_at: new Date().toISOString(),
				id: Date.now(),
				content: newMessage.content,
				type: newMessage.type,
				client_id: newMessage.client_id,
				sender: {
					id: userData?.id ?? null,
					full_name: userData?.full_name ?? "",
					image_path: userData?.image_path ?? "",
				},
			};

			queryClient.setQueryData<InfiniteData<MessagesApiResponse>>(
				queryKey,
				(old) => {
					if (!old) return old;
					return {
						...old,
						pages: old.pages.map((page, index) => {
							if (index !== 0) return page;
							return {
								...page,
								data: {
									...page.data,
									messages: [optimisticMessage, ...page.data.messages],
								},
							};
						}),
					};
				},
			);

			return { previousMessagesData, clientId: newMessage.client_id };
		},
		onSuccess: (_data, _variables, context) => {
			removePending(context.clientId);
		},
		onError: (_err, _variables, context) => {
			if (context?.clientId) {
				removePending(context.clientId);
			}
			queryClient.setQueryData(queryKey, context?.previousMessagesData);
		},
	});
}
