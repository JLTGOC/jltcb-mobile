import ChatMessageInput from "@/src/components/chats-section/ChatMessageInput";
import ChatQuotationCard from "@/src/components/chats-section/ChatQuotationCard";
import ChatTextBubble from "@/src/components/chats-section/ChatTextBubble";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { pusher } from "@/src/lib/pusher";
import { chatKeys } from "@/src/query-key-factories/chats";
import { chatQueryOptions } from "@/src/query-options/chats/chatQueryOptions";
import type {
  ChatEvent,
  Message,
  MessagesApiResponse,
  MessageSentEvent,
} from "@/src/types/chats";
import { parseEventData, subscribeToChat } from "@/src/utils/pusher";
import type {
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";

import { chatMessagesInfiniteQueryOptions } from "@/src/query-options/chats/chatMessagesInfiniteQueryOptions";
import { markAsRead } from "@/src/services/chats";
import { useCallback, useMemo, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import { ActivityIndicator, Avatar, Text } from "react-native-paper";
import ChatFileCard from "../chats-section/ChatFileCard";
import ChatShipmentCard from "../chats-section/ChatShipmentCard";

type Props = {
  variant: "dark" | "light";
};

export default function SharedChat({ variant }: Props) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList>(null);
  const hasMarkedRead = useRef(false);

  const {
    data,
    isPending: isMessagesPending,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...chatMessagesInfiniteQueryOptions(id),
    staleTime: Infinity,
  });

  // Flatten all pages into a single messages array
  const messages = useMemo(
    () => data?.pages.flatMap((page) => page.data.messages) ?? [],
    [data],
  );

  useFocusEffect(
    useCallback(() => {
      refetch().then(() => {
        hasMarkedRead.current = false;
        markAsRead(id);
      });
    }, [id, refetch]),
  );

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    }, [queryClient]),
  );

  const { data: chatDetails } = useQuery(chatQueryOptions(id));

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

            queryClient.setQueryData<{
              pages: MessagesApiResponse[];
              pageParams: unknown[];
            }>(chatKeys.getMessages(id), (old) => {
              if (!old) return old;

              // Check if the optimistic message exists in any page
              const exists = old.pages.some((page) =>
                page.data.messages.some((m) => m.client_id === client_id),
              );

              const updatedPages = old.pages.map((page, pageIndex) => {
                if (pageIndex !== 0) return page; // Only modify the first (latest) page

                let updatedMessages;

                if (exists) {
                  // Sender: replace optimistic message
                  updatedMessages = page.data.messages.map((m) =>
                    m.client_id === client_id ? message : m,
                  );
                } else {
                  // Receiver: prepend new message (list is inverted)
                  updatedMessages = [message, ...page.data.messages];
                  hasMarkedRead.current = false;
                }

                return {
                  ...page,
                  data: {
                    ...page.data,
                    messages: updatedMessages,
                  },
                };
              });

              return { ...old, pages: updatedPages };
            });
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

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<Message>[] }) => {
      const isLastMessageVisible = viewableItems.some(
        (item) => item.index === 0,
      );

      if (isLastMessageVisible && !hasMarkedRead.current) {
        hasMarkedRead.current = true;
        markAsRead(id);
      }
    },
    [id],
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 90,
  });

  const renderItem = ({ item }: { item: Message }) => {
    let message;

    switch (item.type) {
      case "TEXT":
        message = <ChatTextBubble message={item} />;
        break;
      case "QUOTATION_CARD":
        message = <ChatQuotationCard quotation={item} />;
        break;
      case "SHIPMENT_CARD":
        message = <ChatShipmentCard shipment={item} />;
        break;
      case "FILE":
        message = <ChatFileCard file={item} />;
        break;
      default:
        return null;
    }

    return (
      <>
        {item.client_id && (
          <Text
            variant="bodySmall"
            style={{ alignSelf: "flex-end", marginTop: 2 }}
          >
            Sending...
          </Text>
        )}
        {message}
      </>
    );
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", zIndex: 10, left: 0, right: 0 }}>
        <BannerHeader
          onBack={() => router.dismissTo("/messages")}
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
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              ref={flatListRef}
              contentContainerStyle={styles.messagesListContainer}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig.current}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              onEndReachedThreshold={0.3}
              ListFooterComponent={renderFooter}
            />
          )}
        </View>

        <ChatMessageInput chatId={id} />
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
    paddingBottom: 150,
    gap: 18,
  },
  footerLoader: {
    paddingVertical: 12,
    alignItems: "center",
  },
});
