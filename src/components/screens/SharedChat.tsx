import ChatMessageInput from "@/src/components/chats-section/ChatMessageInput";
import ChatQuotationCard from "@/src/components/chats-section/ChatQuotationCard";
import ChatTextBubble from "@/src/components/chats-section/ChatTextBubble";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { useSendMessageMutation } from "@/src/hooks/useSendMessageMutation";
import { pusher } from "@/src/lib/pusher";
import { chatKeys } from "@/src/query-key-factories/chats";
import { chatMessagesQueryOptions } from "@/src/query-options/chats/chatMessagesQueryOptions";
import { chatQueryOptions } from "@/src/query-options/chats/chatQueryOptions";
import type {
  ChatEvent,
  Message,
  MessageSentEvent,
  MessagesResponse
} from "@/src/types/chats";
import { parseEventData, subscribeToChat } from "@/src/utils/pusher";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

import {
  type MessageForm,
  messageFormSchema,
} from "@/src/schemas/messageSchema";
import { useCallback, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";

type Props = {
  variant: "dark" | "light";
};

export default function SharedChat({ variant }: Props) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList>(null);

  const { data: messages, isPending: isMessagesPending } = useQuery({
    ...chatMessagesQueryOptions(id),
    select: (data) => ({ ...data, data: data.data.toReversed() }),
  });

  const { data: chatDetails } = useQuery(chatQueryOptions(id));

  const { control, handleSubmit, reset } = useForm<MessageForm>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const sendMessageMutation = useSendMessageMutation(id);

  const onSendMessage = handleSubmit(({ content }) => {
    const client_id = Crypto.randomUUID();

    sendMessageMutation.mutate({ content, type: "TEXT", client_id });
    reset();
  });

  useFocusEffect(
    useCallback(() => {
      const onEvent = (e: PusherEvent) => {
        const { eventName, data } = e;
        const chatEventName = eventName as ChatEvent;

        switch (chatEventName) {
          case "message.sent":
            const chatData = parseEventData<MessageSentEvent>(data);

            if (!chatData) return;

            const { message, client_id } = chatData;

            queryClient.setQueryData<MessagesResponse>(
              chatKeys.getMessages(id),
              (old) => {
                if (!old) return old;

                const exists = old.data.some((msg) => msg.id === message.id);
                if (exists) return old;

                const replacedMessages = old.data.map((msg) =>
                  msg.client_id === client_id ? message : msg,
                );

                const didReplace = replacedMessages.some(
                  (m) => m.id === message.id,
                );

                return didReplace
                  ? { ...old, data: replacedMessages }
                  : { ...old, data: [...old.data, message] };
              },
            );
            break;
        }
      };

      let channel: PusherChannel;

      const subscribe = async () => {
        channel = await subscribeToChat(id, onEvent);
      };

      subscribe();

      return () => {
        if (channel) {
          pusher.unsubscribe({ channelName: channel.channelName });
        }
      };
    }, [id, queryClient]),
  );

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
        <BannerHeader
          title={chatDetails?.data.title ?? ""}
          titleProps={{ numberOfLines: 1 }}
          variant={variant}
        >
          {chatDetails?.data.type === "GROUP" ? (
            <Avatar.Text label="GC" size={36} />
          ) : (
            <Avatar.Image
              source={{ uri: chatDetails?.data.image_path ?? undefined }}
              size={36}
            />
          )}
        </BannerHeader>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={110}
      >
        <View style={{ flex: 1 }}>
          {isMessagesPending ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              inverted
              data={messages?.data}
              keyExtractor={(item) => item.id.toString()}
              ref={flatListRef}
              contentContainerStyle={styles.messagesListContainer}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          )}
        </View>

        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <ChatMessageInput
              onSend={onSendMessage}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              sendDisabled={!value}
            />
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messagesListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 120,
    gap: 18,
  },
});
