import { useAuth } from "@/src/hooks/useAuth";
import { chatKeys } from "@/src/query-key-factories/chats";
import { sendMessage } from "@/src/services/chats";
import type { ApiResponse } from "@/src/types/api";
import type { Message, SendMessageBody } from "@/src/types/chats";
import { useMutation } from "@tanstack/react-query";

type MessageResponse = ApiResponse<Message>;
type MessagesResponse = ApiResponse<Message[]>;

export function useSendMessageMutation(conversationId: string) {
  const { userData } = useAuth();
  const queryKey = chatKeys.getMessages(conversationId);

  return useMutation<
    MessageResponse,
    Error,
    SendMessageBody,
    { previousMessagesData?: MessagesResponse }
  >({
    mutationFn: (data: SendMessageBody) => sendMessage(conversationId, data),
    onMutate: async (newMessage, context) => {
      await context.client.cancelQueries({ queryKey });

      const previousMessagesData =
        context.client.getQueryData<MessagesResponse>(queryKey);

      const optimisticMessage = {
        id: Date.now(), // temporary id
        ...(newMessage.type === "TEXT" && { content: newMessage.content }),
        type: newMessage.type,
        client_id: newMessage.client_id,
        sender: { id: userData?.id! },
      } as Message; // temporary type cast

      context.client.setQueryData<MessagesResponse>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          data: [...old.data, optimisticMessage],
        };
      });

      return { previousMessagesData };
    },
    onError: (err, newTodo, onMutateResult, context) => {
      context.client.setQueryData(
        queryKey,
        onMutateResult?.previousMessagesData,
      );
    },
  });
}
