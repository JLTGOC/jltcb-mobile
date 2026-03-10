import { type InfiniteData, useMutation } from "@tanstack/react-query";
import { sendImageMutationOptions } from "../mutation-options/sendImageMutationOptions";
import { chatKeys } from "../query-key-factories/chats";
import type { Message, MessagesApiResponse } from "../types/chats";
import { useAuth } from "./useAuth";

export function useSendImageMutation(conversationId: string) {
  const { userData } = useAuth();
  const queryKey = chatKeys.getMessages(conversationId);

  return useMutation({
    ...sendImageMutationOptions(conversationId),
    onMutate: async (newImage, context) => {
      const previousMessagesData =
        context.client.getQueryData<InfiniteData<MessagesApiResponse>>(
          queryKey,
        );

      const optimisticFile: Message = {
        created_at: new Date().toISOString(),
        id: Date.now(),
        type: newImage.type,
        client_id: newImage.client_id,
        sender: {
          id: userData?.id!,
          full_name: userData?.full_name!,
          image_path: userData?.image_path!,
        },
        file_name: newImage.file.name,
        file_url: newImage.file.uri,
        width: newImage.file.width,
        height: newImage.file.height,
      };

      context.client.setQueryData<InfiniteData<MessagesApiResponse>>(
        queryKey,
        (old) => {
          if (!old) return old;

          const updatedPages = old.pages.map((page, index) => {
            if (index !== 0) return page;
            return {
              ...page,
              data: {
                ...page.data,
                messages: [optimisticFile, ...page.data.messages],
              },
            };
          });

          return { ...old, pages: updatedPages };
        },
      );

      return { previousMessagesData };
    },
    onError: (_err, _newFile, onMutateResult, context) => {
      context.client.setQueryData(
        queryKey,
        onMutateResult?.previousMessagesData,
      );
    },
  });
}
