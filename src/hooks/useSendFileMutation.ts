import { useMutation } from "@tanstack/react-query";
import { sendFileMutationOptions } from "../mutation-options/sendFileMutationOptions";
import { chatKeys } from "../query-key-factories/chats";
import { Message, MessagesApiResponse } from "../types/chats";
import { useAuth } from "./useAuth";

export function useSendFileMutation(conversationId: string) {
  const { userData } = useAuth();
  const queryKey = chatKeys.getMessages(conversationId);

  return useMutation({
    ...sendFileMutationOptions(conversationId),
    onMutate: async (newFile, context) => {
      const previousMessagesData =
        context.client.getQueryData<MessagesApiResponse>(queryKey);

      const optimisticFile: Message = {
        created_at: new Date().toISOString(),
        id: Date.now(), // temporary id
        type: newFile.type,
        client_id: newFile.client_id,
        sender: {
          id: userData?.id!,
          full_name: userData?.full_name!,
          image_path: userData?.image_path!,
        },
        file_name: newFile.file.name,
        file_url: newFile.file.uri,
      };

      context.client.setQueryData<MessagesApiResponse>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            messages: [optimisticFile, ...old.data.messages],
          },
        };
      });

      return { previousMessagesData };
    },
    onError: (_err, _newMessage, onMutateResult, context) => {
      context.client.setQueryData(
        queryKey,
        onMutateResult?.previousMessagesData,
      );
    },
  });
}
