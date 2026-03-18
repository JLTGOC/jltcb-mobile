import {
	type InfiniteData,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useChatPendingIdsContext } from "../contexts/ChatPendingIdsContext";
import { sendFileMutationOptions } from "../mutation-options/asLead-quotations/sendFileMutationOptions";
import { chatKeys } from "../query-key-factories/chats";
import type { Message, MessagesApiResponse } from "../types/chats";
import { useAuth } from "./useAuth";

export function useSendFileMutation(conversationId: string) {
	const { userData } = useAuth();
	const queryClient = useQueryClient();
	const queryKey = chatKeys.getMessages(conversationId);
	const { addPending, removePending } = useChatPendingIdsContext();

	return useMutation({
		...sendFileMutationOptions(conversationId),
		onMutate: async (newFile) => {
			addPending(newFile.client_id);
			await queryClient.cancelQueries({ queryKey });

			const previousMessagesData =
				queryClient.getQueryData<InfiniteData<MessagesApiResponse>>(queryKey);

			const optimisticFile: Message = {
				created_at: new Date().toISOString(),
				id: Date.now(),
				type: newFile.type,
				client_id: newFile.client_id,
				sender: {
					id: userData?.id ?? null,
					full_name: userData?.full_name ?? "",
					image_path: userData?.image_path ?? "",
				},
				file_name: newFile.file.name,
				file_url: newFile.file.uri,
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

			return { previousMessagesData, clientId: newFile.client_id };
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
