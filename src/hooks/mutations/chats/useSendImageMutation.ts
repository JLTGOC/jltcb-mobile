import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useChatPendingIdsContext } from "@/contexts/ChatPendingIdsContext";
import { chatMessageQueries } from "@/queries/chats/messages";
import type {
  Message,
  MessagesApiResponse,
  SendImageBody,
} from "@/types/chats";

import { useAuth } from "@/hooks/useAuth";
import { sendImage } from "@/services/chats";

export function useSendImageMutation(conversationId: string) {
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = chatMessageQueries.list(conversationId).queryKey;
  const { addPending, removePending } = useChatPendingIdsContext();

  return useMutation({
    mutationFn: (data: SendImageBody) => sendImage(conversationId, data),
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
