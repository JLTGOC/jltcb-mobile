import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEvent } from "expo";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import {
	Dimensions,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

const videoMap: Record<string, number> = {
	v1: require("../../../../src/assets/reels/vid_1.mp4"),
	v2: require("../../../../src/assets/reels/vid_2.mp4"),
};

export default function ReelsFullScreen({ id }: { id: string }) {
	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;

	const source = videoMap[id];

	const router = useRouter();

	const player = useVideoPlayer(source, (player) => {
		player.loop = true;
		player.play();
	});

	const { isPlaying } = useEvent(player, "playingChange", {
		isPlaying: player.playing,
	});

	const togglePlay = () => (isPlaying ? player.pause() : player.play());

	const isFocused = useIsFocused();

	useEffect(() => {
		if (!isFocused) {
			player.pause();
		} else {
			player.play();
		}
	}, [isFocused, player]);

	return (
		<>
			<VideoView
				key={id}
				player={player}
				style={[
					styles.videoSize,
					{ width: screenWidth, height: screenHeight * 0.81 },
				]}
				contentFit="cover"
				nativeControls={false}
			/>

			{/* Overlay Play/Pause Button */}
			<Pressable
				style={[
					styles.buttonOverlay,
					{ width: screenWidth, height: screenHeight * 0.81 },
					{ opacity: isPlaying ? 0 : 1 },
				]}
				onPress={togglePlay}
			>
				<Ionicons name="play" size={70} color="white" />
			</Pressable>

			<View style={styles.headerOverlay}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="close" size={28} color="white" />
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	videoSize: {
		marginRight: 5,
		borderRadius: 5,
		overflow: "hidden",
	},
	buttonOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff2d",
	},
	headerOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		paddingHorizontal: 10,
		backgroundColor: "#00000080",
	},
});
