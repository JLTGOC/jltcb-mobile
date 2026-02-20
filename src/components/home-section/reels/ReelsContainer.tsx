import type {
	QueryObserverResult,
	RefetchOptions,
} from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
	type ViewabilityConfig,
	type ViewToken,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import type { ApiResponse } from "@/src/types/api";
import type { Reel } from "@/src/types/reels";
import ReelsPlayer from "./ReelsPlayer";

type ReelsContainerProps = {
	reels?: Reel[];
	isPending?: boolean;
	refetch: (
		options?: RefetchOptions,
	) => Promise<QueryObserverResult<ApiResponse<Reel[]>, Error>>;
	error?: Error | null;
};

export default function ReelsContainer({
	reels,
	isPending,
	refetch,
	error,
}: ReelsContainerProps) {
	const router = useRouter();
	const [activeItemId, setActiveItemId] = useState<number | null>(
		reels?.length ? reels[0].id : null,
	);

	useEffect(() => {
		if (reels?.length && !activeItemId) {
			setActiveItemId(reels?.[0]?.id ?? null);
		}
	}, [reels, activeItemId]);

	const visibleItemsRef = useRef<number[]>([]);

	const viewabilityConfig = useRef<ViewabilityConfig>({
		itemVisiblePercentThreshold: 85,
		minimumViewTime: 100,
	}).current;

	const onViewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			visibleItemsRef.current = viewableItems.map((v) => v.item.id);
		},
	).current;

	const handleMomentumScrollEnd = () => {
		setActiveItemId((currentActiveId) => {
			if (visibleItemsRef.current.length === 0) return currentActiveId;
			const isCurrentStillVisible = visibleItemsRef.current.includes(
				currentActiveId as number,
			);
			if (isCurrentStillVisible) return currentActiveId;
			return visibleItemsRef.current[0];
		});
	};

	const screenWidth = Dimensions.get("window").width;

	if (isPending) {
		return (
			<ActivityIndicator color="gray" style={{ height: screenWidth * 0.3 }} />
		);
	}

	if (error) {
		return (
			<View
				style={{
					height: screenWidth * 0.3,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text onPress={() => refetch()}>Reload Reels</Text>
			</View>
		);
	}

	return (
		<View style={styles.videoContainer}>
			<FlatList
				data={reels ?? []}
				horizontal
				initialNumToRender={3} 
                maxToRenderPerBatch={3}
                windowSize={5}
                removeClippedSubviews={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => String(item.id)}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				onMomentumScrollEnd={handleMomentumScrollEnd}
				renderItem={({ item }) => (
					<Pressable
						onLongPress={() => setActiveItemId(item.id)}
						onPress={() => {
							router.push({
								pathname: "/home/reels/[id]",
								params: { id: item.id, placeholder: item.thumbnail_path },
							});
						}}
						style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
					>
						<ReelsPlayer reel={item} shouldPlay={activeItemId === item.id} />
					</Pressable>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	videoContainer: {
		flexDirection: "row",
		paddingHorizontal: 5,
	},
	videoSize: {
		marginRight: 5,
		borderRadius: 5,
		overflow: "hidden",
	},
});
