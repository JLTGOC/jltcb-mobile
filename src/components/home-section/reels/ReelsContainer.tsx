import { Image } from "expo-image";

import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
	type ViewabilityConfig,
	type ViewToken,
} from "react-native";
import ReelsPlayer from "./ReelsPlayer";

const data = [
	{
		id: "v1",
		type: "video",
		source: require("../../../../src/assets/reels/vid_1.mp4"),
	},
	{
		id: "v2",
		type: "video",
		source: require("../../../../src/assets/reels/vid_2.mp4"),
	},
	{
		id: "i1",
		type: "image",
		source: require("../../../../src/assets/reels/image_1.png"),
	},
	{
		id: "i2",
		type: "image",
		source: require("../../../../src/assets/reels/image_2.png"),
	},
	{
		id: "i3",
		type: "image",
		source: require("../../../../src/assets/reels/image_3.png"),
	},
	{
		id: "i4",
		type: "image",
		source: require("../../../../src/assets/reels/image_4.png"),
	},
	{
		id: "i5",
		type: "image",
		source: require("../../../../src/assets/reels/image_5.png"),
	},
	{
		id: "i6",
		type: "image",
		source: require("../../../../src/assets/reels/image_6.png"),
	},
];

export default function ReelsConatainer() {
	const screenWidth = Dimensions.get("window").width;

	const router = useRouter();

	const [activeItemId, setActiveItemId] = useState(null);

	// viewabilityConfig defines the rules for what counts as "visible"
	// itemVisiblePercentThreshold: 50 means at least 50% of the item must be visible
	const viewabilityConfig = useRef<ViewabilityConfig>({
		itemVisiblePercentThreshold: 100,
		minimumViewTime: 100,
	}).current;

	const onViewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			if (viewableItems.length === 0) return;
			setActiveItemId((currentActiveId) => {
				const isCurrentStillVisible = viewableItems.some(
					(v) => v.item.id === currentActiveId && v.isViewable,
				);

				if (isCurrentStillVisible) {
					return currentActiveId;
				}

				const firstAvailableVideo = viewableItems.find(
					(v) => v.item.type === "video",
				);

				return firstAvailableVideo ? firstAvailableVideo.item.id : null;
			});
		},
	).current;

	return (
		<View style={styles.videoContainer}>
			<FlatList
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				renderItem={({ item }) => {
					if (item.type === "video") {
						return (
							<TouchableOpacity
								onPress={() => {
									router.push({
										pathname: "/home/reels/[id]",
										params: { id: item.id },
									});
								}}
							>
								<ReelsPlayer
									video={item.source}
									shouldPlay={activeItemId === item.id}
								/>
							</TouchableOpacity>
						);
					}
					return (
						<Image
							source={item.source}
							style={[
								styles.videoSize,
								{ width: screenWidth * 0.2, height: screenWidth * 0.3 },
							]}
						/>
					);
				}}
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
