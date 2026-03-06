import InboxListItem from "@/src/components/chats-section/InboxListItem";
import BannerHeader from "@/src/components/ui/BannerHeader";
import Search from "@/src/components/ui/Search";
import { useAuth } from "@/src/hooks/useAuth";
import { useRefreshByUser } from "@/src/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/src/hooks/useRefreshOnFocus";
import { pusher } from "@/src/lib/pusher";
import { chatKeys } from "@/src/query-key-factories/chats";
import { chatsQueryOptions } from "@/src/query-options/chats/chatsQueryOptions";
import type {
  ChatEvent,
  InboxListApiResponse,
  InboxUpdatedEvent,
} from "@/src/types/chats";
import { parseEventData, subscribeToUser } from "@/src/utils/pusher";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, HelperText } from "react-native-paper";
import * as z from "zod";

const searchSchema = z.object({
  search: z.string().trim(),
});

type Props = {
  variant: "dark" | "light";
};

export default function SharedMessages({ variant }: Props) {
  const { userData } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submittedSearch, setSubmittedSearch] = useState("");
  const { data, isPending, isRefetching, error, refetch } = useQuery({
    ...chatsQueryOptions(submittedSearch),
    placeholderData: (prev) => prev,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const { control, handleSubmit } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = handleSubmit(({ search }) =>
    setSubmittedSearch(search.trim()),
  );

  useFocusEffect(
    useCallback(() => {
      if (!userData) return;

      const onEvent = (e: PusherEvent) => {
        const { eventName, data } = e;
        const inboxEventName = eventName as ChatEvent;

        switch (inboxEventName) {
          case "inbox.updated": {
            const chatData = parseEventData<InboxUpdatedEvent>(data);

            if (!chatData) return;

            const { inbox } = chatData;

            queryClient.setQueryData<InboxListApiResponse>(
              chatKeys.getChats(submittedSearch),
              (old) => {
                if (!old) return old;

                const newInbox = [
                  inbox,
                  ...old.data.filter((i) => i.id !== inbox.id),
                ];

                return { ...old, data: newInbox };
              },
            );

            break;
          }
        }
      };

      let channel: PusherChannel;

      const subscribe = async () => {
        channel = await subscribeToUser(String(userData.id), onEvent);
      };

      subscribe();

      return () => {
        if (channel) {
          pusher.unsubscribe({ channelName: channel.channelName });
        }
      };
    }, [queryClient, submittedSearch, userData]),
  );

  if (error) {
    console.log(error);
    return null;
  }

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      data={data?.data}
      contentContainerStyle={{ flex: 1 }}
      ListHeaderComponent={
        <>
          <BannerHeader back={false} title="Messages" variant={variant} />

          <Controller
            name="search"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Search
                containerStyle={styles.searchContainer}
                style={styles.searchInput}
                onSearch={onSubmit}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder="SEARCH QUERIES"
                autoCapitalize="none"
                placeholderTextColor="black"
                onSubmitEditing={onSubmit}
                returnKeyType="search"
              />
            )}
          />
        </>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({ pathname: "/messages/[id]", params: { id: item.id } })
          }
          style={[styles.container, styles.inboxListItem]}
        >
          <InboxListItem {...item} />
        </Pressable>
      )}
      ListEmptyComponent={() => {
        if (isPending && !isRefetching) {
          return (
            <View style={[styles.centeredContainer, styles.container]}>
              <ActivityIndicator size="large" />
            </View>
          );
        }

        if (submittedSearch && isRefetching) {
          return null;
        }

        if (data?.data?.length === 0) {
          return (
            <View style={styles.container}>
              <HelperText type="info" style={styles.infoText}>
                {data.message}
              </HelperText>
            </View>
          );
        }
      }}
      ListFooterComponent={
        isRefetching && submittedSearch ? <ActivityIndicator /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginHorizontal: 20,
  },
  searchInput: {
    paddingVertical: 14,
  },
  inboxListItem: {
    paddingBottom: 16,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
  },
});
