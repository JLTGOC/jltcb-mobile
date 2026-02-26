import ChatMessageInput from "@/src/components/chats-section/ChatMessageInput";
import ChatQuotationCard from "@/src/components/chats-section/ChatQuotationCard";
import ChatTextBubble from "@/src/components/chats-section/ChatTextBubble";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { useAuth } from "@/src/hooks/useAuth";
import { chatKeys } from "@/src/query-key-factories/chats";
import { apiGet } from "@/src/services/axiosInstance";
import { sendMessage } from "@/src/services/chats";
import { ChatEvent, Message, SendMessageData } from "@/src/types/chats";
import { parseEventData, subscribeToChat } from "@/src/utils/pusher";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Pusher,
  type PusherEvent,
} from "@pusher/pusher-websocket-react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import * as z from "zod";

const messageSchema = z.object({
  content: z.string().trim(),
});

const pusher = Pusher.getInstance();

export default function Chatbox() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { userData } = useAuth();

  const { control, handleSubmit, reset } = useForm<
    z.infer<typeof messageSchema>
  >({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const sendMutate = useMutation({
    mutationFn: (data: SendMessageData) => sendMessage(id, data),
    onMutate: async (newMessage, context) => {
      await context.client.cancelQueries({ queryKey: chatKeys.getChat(id) });

      const previousMessages =
        context.client.getQueryData<Message[]>(chatKeys.getChat(id)) ?? [];

      const optimisticMessage = {
        id: Date.now(), // temporary id
        ...(newMessage.type === "TEXT" && { content: newMessage.content }),
        type: newMessage.type,
        sender: { id: userData?.id! },
      };

      context.client.setQueryData(
        chatKeys.getChat(id),
        (old: Message[] = []) => [...old, optimisticMessage],
      );

      return { previousMessages };
    },
    onError: (err, newTodo, onMutateResult, context) => {
      context.client.setQueryData(
        chatKeys.getChat(id),
        onMutateResult?.previousMessages,
      );
    },
  });

  const onSubmit = handleSubmit(({ content }) => {
    sendMutate.mutate({ content, type: "TEXT" });
    reset();
  });

  const { data: messages } = useQuery({
    queryKey: chatKeys.getChat(id),
    queryFn: async () =>
      (await apiGet<Message[]>(`conversations/${id}/messages`)).data,
    select: (data) => data.toReversed(),
  });

  useEffect(() => {
    console.log(
      messages?.map(
        (message) => message.type === "TEXT" && [message.content, message.id],
      ),
    );
  }, [messages]);

  const queryClient = useQueryClient();

  const onEvent = (e: PusherEvent) => {
    const { eventName, data } = e;
    const chatEventName = eventName as ChatEvent;

    switch (chatEventName) {
      case "message.sent":
        const chatData = parseEventData<{ message: Message }>(data);
        if (!chatData) return;

        // if (chatData.message.sender.id === userData?.id) {
        //   return;
        // }

        queryClient.setQueryData<Message[]>(
          chatKeys.getChat(id),
          (old = []) => {
            const filtered = old.filter(
              (msg) =>
                !(
                  msg.sender.id === userData?.id &&
                  msg.type === chatData.message.type &&
                  msg.type === "TEXT" &&
                  chatData.message.type === "TEXT" &&
                  msg.content === chatData.message.content &&
                  typeof msg.id === "number" &&
                  msg.id > 1000000000000
                ),
            );

            return [...filtered, chatData.message];
          },
        );
        break;
    }
  };

  useEffect(() => {
    const channelName = `private-chat.${id}`;

    const subscribe = async () => {
      const channel = await subscribeToChat(id, onEvent);
      return channel;
    };

    subscribe();

    return () => {
      pusher
        .unsubscribe({ channelName })
        .then(() => console.log(`unsubbed ${channelName}`))
        .catch((e) => console.error(e));
    };
  }, [id]);

  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: Message }) => {
    switch (item.type) {
      case "TEXT":
        return <ChatTextBubble message={item} />;

      case "QUOTATION_CARD":
        return <ChatQuotationCard quotation={item} />;

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", zIndex: 10, left: 0, right: 0 }}>
        <BannerHeader title="Message Title" variant="dark">
          <Avatar.Text label="GC" size={36} />
        </BannerHeader>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={110}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            inverted
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            ref={flatListRef}
            contentContainerStyle={styles.messagesListContainer}
            keyboardShouldPersistTaps="handled"
            renderItem={renderItem}
          />
        </View>

        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <ChatMessageInput
              onSend={onSubmit}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              sendDisabled={!value}
              onSubmitEditing={onSubmit}
            />
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  messagesListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 120,
    gap: 18,
  },
});
