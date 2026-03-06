import { useAuth } from "@/src/hooks/useAuth";
import { chatKeys } from "@/src/query-key-factories/chats";
import { sendMessage } from "@/src/services/chats";
import type {
  Message,
  MessagesApiResponse,
  SendMessageBody,
} from "@/src/types/chats";
import { useMutation } from "@tanstack/react-query";

export function useSendMessageMutation(conversationId: string) {
  const { userData } = useAuth();
  const queryKey = chatKeys.getMessages(conversationId);

  return useMutation({
    mutationFn: (data: SendMessageBody) => sendMessage(conversationId, data),
    onMutate: async (newMessage, context) => {
      await context.client.cancelQueries({ queryKey });

      const previousMessagesData =
        context.client.getQueryData<MessagesApiResponse>(queryKey);

      const optimisticMessage: Message = {
        created_at: new Date().toISOString(),
        id: Date.now(), // temporary id
        content: newMessage.content,
        type: newMessage.type,
        client_id: newMessage.client_id,
        sender: {
          id: userData?.id!,
          full_name: userData?.full_name!,
          image_path: userData?.image_path!,
        },
      };

      context.client.setQueryData<MessagesApiResponse>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            messages: [optimisticMessage, ...old.data.messages],
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
