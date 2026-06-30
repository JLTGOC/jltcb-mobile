import { useQueries } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import NewsCardSkeleton from "@/components/home-section/news-updates/NewsCardSkeleton";
import NewsCardTemplate from "@/components/home-section/news-updates/NewsCardTemplate";
import NewsUpdates from "@/components/home-section/news-updates/NewsUpdatesContainer";
import Reels from "@/components/home-section/reels/ReelsContainer";

import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { articleQueries } from "@/queries/articles";
import { reelQueries } from "@/queries/reels";

export default function SharedHome() {
  const [isReelsVisible, setIsReelsVisible] = useState(true);
  const reelsLayoutY = useRef(0);

  const [
    {
      data: reels,
      isPending: isReelsPending,
      refetch: refetchReels,
      error: reelsError,
    },
    {
      data: articles,
      isPending: isArticlesPending,
      refetch: refetchArticles,
      error: articlesError,
    },
  ] = useQueries({
    queries: [reelQueries.list(), articleQueries.list()],
  });

  const listData = isArticlesPending
    ? Array.from({ length: 3 }, () => undefined)
    : (articles?.data ?? []);

  const {
    isRefetchingByUser: isReelsRefetchingByUser,
    refetchByUser: refetchReelsByUser,
  } = useRefreshByUser(refetchReels);
  const {
    isRefetchingByUser: isArticlesRefetchingByUser,
    refetchByUser: refetchArticlesByUser,
  } = useRefreshByUser(refetchArticles);

  const refreshPage = () => {
    refetchReelsByUser();
    refetchArticlesByUser();
  };

  return (
    <FlatList
      onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollY = e.nativeEvent.contentOffset.y;
        const screenHeight = e.nativeEvent.layoutMeasurement.height;

        const reelsTop = reelsLayoutY.current;
        const reelsBottom = reelsTop + 50; // height to autoplay reels

        const isVisible =
          reelsBottom > scrollY && reelsTop < scrollY + screenHeight;

        setIsReelsVisible(isVisible);
      }}
      scrollEventThrottle={16}
      ListHeaderComponentStyle={styles.listHeaderComponent}
      ListHeaderComponent={
        <>
          <View
            onLayout={(e) => {
              reelsLayoutY.current = e.nativeEvent.layout.y;
            }}
          >
            <Reels
              reels={reels?.data}
              isPending={isReelsPending}
              refetch={refetchReels}
              error={reelsError}
              isVisible={isReelsVisible}
            />
          </View>

          <NewsUpdates />
        </>
      }
      data={listData}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        articlesError && (
          <View style={styles.articlesErrorContainer}>
            <Text onPress={() => refetchArticles()}>Reload Articles</Text>
          </View>
        )
      }
      renderItem={({ item: article }) => (
        <View style={styles.content}>
          {isArticlesPending || !article ? (
            <NewsCardSkeleton />
          ) : (
            <NewsCardTemplate article={article} />
          )}
        </View>
      )}
      keyExtractor={(item, index) =>
        item ? String(item.id) : `skeleton-${index}`
      }
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isReelsRefetchingByUser || isArticlesRefetchingByUser}
          onRefresh={refreshPage}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 20,
  },
  articlesErrorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 56,
  },
  listHeaderComponent: {
    paddingVertical: 10,
  },
});
