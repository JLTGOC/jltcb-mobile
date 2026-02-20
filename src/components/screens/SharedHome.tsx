import { useQueries } from "@tanstack/react-query";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import Logos from "@/src/components/home-section/Logos";
import NewsCardSkeleton from "@/src/components/home-section/news-updates/NewsCardSkeleton";
import NewsCardTemplate from "@/src/components/home-section/news-updates/NewsCardTemplate";
import NewsUpdates from "@/src/components/home-section/news-updates/NewsUpdatesContainer";
import Reels from "@/src/components/home-section/reels/ReelsContainer";
import { articlesQueryOptions } from "@/src/query-options/articles/articlesQueryOptions";
import { reelsQueryOptions } from "@/src/query-options/reels/reelsQueryOptions";

export default function SharedHome() {
	const [
		{
			data: reels,
			isPending: isReelsPending,
			refetch: refetchReels,
			error: reelsError,
			isRefetching: isReelsRefetching,
		},
		{
			data: articles,
			isPending: isArticlesPending,
			refetch: refetchArticles,
			error: articlesError,
			isRefetching: isArticlesRefetching,
		},
	] = useQueries({
		queries: [reelsQueryOptions, articlesQueryOptions],
	});

	const listData = isArticlesPending
		? Array.from({ length: 3 }, () => undefined)
		: (articles?.data ?? []);

	const refreshPage = () => {
		refetchReels();
		refetchArticles();
	};

	return (
		<FlatList
			ListHeaderComponent={
				<>
					<Reels
						reels={reels?.data}
						isPending={isReelsPending}
						refetch={refetchReels}
						error={reelsError}
					/>
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
					refreshing={isReelsRefetching || isArticlesRefetching}
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
});
