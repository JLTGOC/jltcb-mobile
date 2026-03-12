import {
	type InfiniteData,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useChatPendingIdsContext } from "../contexts/ChatPendingIdsContext";
import { sendImageMutationOptions } from "../mutation-options/sendImageMutationOptions";
import { chatKeys } from "../query-key-factories/chats";
import type { Message, MessagesApiResponse } from "../types/chats";
import { useAuth } from "./useAuth";

export function useSendImageMutation(conversationId: string) {
	const { userData } = useAuth();
	const queryClient = useQueryClient();
	const queryKey = chatKeys.getMessages(conversationId);
	const { addPending, removePending } = useChatPendingIdsContext();

	return useMutation({
		...sendImageMutationOptions(conversationId),
		onMutate: async (newImage) => {
			addPending(newImage.client_id);
			await queryClient.cancelQueries({ queryKey });

			const previousMessagesData =
				queryClient.getQueryData<InfiniteData<MessagesApiResponse>>(queryKey);

			const optimisticFile: Message = {
				created_at: new Date().toISOString(),
				id: Date.now(),
				type: newImage.type,
				client_id: newImage.client_id,
				sender: {
					id: userData?.id ?? null,
					full_name: userData?.full_name ?? "",
					image_path: userData?.image_path ?? "",
				},
				file_name: newImage.file.name,
				file_url: newImage.file.uri,
				width: newImage.file.width,
				height: newImage.file.height,
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
									messages: [optimisticFile, ...page.data.messages],
								},
							};
						}),
					};
				},
			);

			return { previousMessagesData, clientId: newImage.client_id };
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
