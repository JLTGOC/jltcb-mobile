import InboxListItem from "@/src/components/chats-section/InboxListItem";
import BannerHeader from "@/src/components/ui/BannerHeader";
import Search from "@/src/components/ui/Search";
import { useAuth } from "@/src/hooks/useAuth";
import { pusher } from "@/src/lib/pusher";
import { chatsQueryOptions } from "@/src/query-options/chats/chatsQueryOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
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

  useFocusEffect(
    useCallback(() => {
      if (!userData) return;

      const channelName = `private-user.${userData.id}`;

      const subscribe = async () => {
        const inboxChannel = await pusher.subscribe({
          channelName,
          // onEvent: (e: PusherEvent) => {
          //   console.log(e);
          // },
          onSubscriptionError: (
            channelName: string,
            message: string,
            e: any,
          ) => {
            console.log({ channelName, message, e });
          },
          onSubscriptionSucceeded: (data) => {
            console.log({ data });
          },
        });
      };

      subscribe();

      return () => {
        pusher
          .unsubscribe({ channelName })
          .then(() => console.log(`unsubbed ${channelName}`))
          .catch((e) => console.error(e));
      };
    }, [userData]),
  );

  const { control, handleSubmit } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const [submittedSearch, setSubmittedSearch] = useState("");

  const { data, isPending, isRefetching, error } = useQuery({
    ...chatsQueryOptions(submittedSearch),
    placeholderData: (prev) => prev,
  });

  const onSubmit = handleSubmit(({ search }) =>
    setSubmittedSearch(search.trim()),
  );

  if (error) {
    console.log(error);
    return null;
  }

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
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
        <Link
          href={{
            pathname: "/messages/[id]",
            params: { id: item.id },
          }}
          asChild
          style={[styles.container, styles.inboxListItem]}
        >
          <TouchableOpacity>
            <InboxListItem {...item} />
          </TouchableOpacity>
        </Link>
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
