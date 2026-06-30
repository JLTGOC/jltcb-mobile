import { zodResolver } from "@hookform/resolvers/zod";
import type {
<<<<<<< HEAD
	PusherChannel,
	PusherEvent,
=======
  PusherChannel,
  PusherEvent,
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
} from "@pusher/pusher-websocket-react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
<<<<<<< HEAD
	FlatList,
	Pressable,
	RefreshControl,
	StyleSheet,
	View,
} from "react-native";
import { ActivityIndicator, HelperText } from "react-native-paper";
import * as z from "zod";
import InboxListItem from "@/src/components/chats-section/InboxListItem";
import BannerHeader from "@/src/components/ui/BannerHeader";
import Search from "@/src/components/ui/Search";
import { useAuth } from "@/src/hooks/useAuth";
import { useRefreshByUser } from "@/src/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/src/hooks/useRefreshOnFocus";
import { pusher } from "@/src/lib/pusher";
import { chatKeys } from "@/src/query-key-factories/chats";
import { chatMessagesInfiniteQueryOptions } from "@/src/query-options/chats/chatMessagesInfiniteQueryOptions";
import { chatsQueryOptions } from "@/src/query-options/chats/chatsQueryOptions";
import type {
	ChatEvent,
	InboxListApiResponse,
	InboxUpdatedEvent,
} from "@/src/types/chats";
import { parseEventData, subscribeToUser } from "@/src/utils/pusher";

const searchSchema = z.object({
	search: z.string().trim(),
});
=======
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, HelperText } from "react-native-paper";

import InboxListItem from "@/components/chats-section/InboxListItem";
import BannerHeader from "@/components/ui/BannerHeader";
import Search from "@/components/ui/Search";

import { THEMES } from "@/constants/themes";
import { useAuth } from "@/hooks/useAuth";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { pusher } from "@/lib/pusher";
import { chatQueries } from "@/queries/chats";
import { chatMessageQueries } from "@/queries/chats/messages";
import { searchSchema, type SearchForm } from "@/schemas/searchSchema";
import type {
  ChatEvent,
  InboxListApiResponse,
  InboxUpdatedEvent,
} from "@/types/chats";
import { parseEventData, subscribeToUser } from "@/utils/pusher";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

type Props = {
	variant: "dark" | "light";
};

export default function SharedMessages({ variant }: Props) {
	const { userData } = useAuth();
	const router = useRouter();
	const queryClient = useQueryClient();
	const [submittedSearch, setSubmittedSearch] = useState("");
	const submittedSearchRef = useRef(submittedSearch);

<<<<<<< HEAD
	const { data, isPending, isRefetching, error, refetch } = useQuery({
		...chatsQueryOptions(submittedSearch),
		placeholderData: (prev) => prev,
	});
=======
  const { data, isPending, isRefetching, error, refetch } = useQuery(
    chatQueries.list(submittedSearch),
  );
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);

<<<<<<< HEAD
	const { control, handleSubmit } = useForm<z.infer<typeof searchSchema>>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			search: "",
		},
	});
=======
  const { control, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

	useEffect(() => {
		submittedSearchRef.current = submittedSearch;
	}, [submittedSearch]);

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

<<<<<<< HEAD
						queryClient.setQueryData<InboxListApiResponse>(
							chatKeys.getChats(submittedSearchRef.current),
							(old) => {
								if (!old) return old;
=======
            queryClient.setQueryData<InboxListApiResponse>(
              chatQueries.list(submittedSearchRef.current).queryKey,
              (old) => {
                if (!old) return old;
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

								const newInbox = [
									inbox,
									...old.data.filter((i) => i.id !== inbox.id),
								];

								return { ...old, data: newInbox };
							},
						);

<<<<<<< HEAD
						queryClient.prefetchInfiniteQuery(
							chatMessagesInfiniteQueryOptions(inbox.id),
						);
=======
            queryClient.prefetchInfiniteQuery(
              chatMessageQueries.list(inbox.id),
            );
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

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
		}, [queryClient, userData]),
	);

<<<<<<< HEAD
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
						router.push({
							pathname: "/messages/[id]",
							params: { id: item.id, group: String(item.type === "GROUP") },
						})
					}
					style={({ pressed }) => [
						styles.container,
						styles.inboxListItem,
						{
							opacity: pressed ? 0.7 : 1,
						},
					]}
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

				if (error) {
					return (
						<View style={[styles.centeredContainer, styles.container]}>
							<HelperText type="error" style={styles.infoText}>
								{error.message || "Something went wrong. Please try again."}
							</HelperText>
						</View>
					);
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
=======
  return (
    <View style={{ backgroundColor: THEMES.pageBackgroundColor, flex: 1 }}>
      <BannerHeader back={false} title="Messages" variant={variant} />

      <Controller
        name="search"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Search
            variant="dark"
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

      <FlatList
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        data={data?.data}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: THEMES.pageBackgroundColor,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/messages/[id]",
                params: { id: item.id, group: String(item.type === "GROUP") },
              })
            }
            style={({ pressed }) => [
              styles.container,
              styles.inboxListItem,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <InboxListItem {...item} />
          </Pressable>
        )}
        ListEmptyComponent={() => {
          if (isPending) {
            return (
              <View style={[styles.centeredContainer, styles.container]}>
                <ActivityIndicator size="large" />
              </View>
            );
          }

          if (submittedSearch && isRefetching) {
            return null;
          }

          if (error) {
            return (
              <View style={[styles.centeredContainer, styles.container]}>
                <HelperText type="error" style={styles.infoText}>
                  {error.message || "Something went wrong. Please try again."}
                </HelperText>
              </View>
            );
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
    </View>
  );
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
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
