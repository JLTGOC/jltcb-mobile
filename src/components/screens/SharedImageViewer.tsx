import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Directory, File, Paths } from "expo-file-system";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
	Dimensions,
	Platform,
	Pressable,
	StyleSheet,
	View,
} from "react-native";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { showToast } from "@/src/utils/showToast";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_DISMISS_THRESHOLD = SCREEN_HEIGHT * 0.2;
const SWIPE_VELOCITY_THRESHOLD = 500;

export default function SharedImageViewer() {
	const { url, fileName } = useLocalSearchParams<{
		url: string;
		fileName?: string;
	}>();
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const [isSaving, setIsSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">(
		"idle",
	);

	const translateY = useSharedValue(0);
	const backdropOpacity = useSharedValue(1);

	const resetPosition = () => {
		"worklet";
		translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
		backdropOpacity.value = withTiming(1, { duration: 150 });
	};

	const animateDismiss = () => {
		"worklet";
		translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 });
		backdropOpacity.value = withTiming(0, { duration: 220 }, (finished) => {
			if (finished) {
				scheduleOnRN(router.back);
			}
		});
	};

	const panGesture = Gesture.Pan()
		.activeOffsetY(10)
		.failOffsetX([-15, 15])
		.onUpdate((e) => {
			if (e.translationY > 0) {
				translateY.value = e.translationY;
				backdropOpacity.value = Math.max(
					0,
					1 - e.translationY / (SCREEN_HEIGHT * 0.6),
				);
			}
		})
		.onEnd((e) => {
			const shouldDismiss =
				e.translationY > SWIPE_DISMISS_THRESHOLD ||
				e.velocityY > SWIPE_VELOCITY_THRESHOLD;

			if (shouldDismiss) {
				animateDismiss();
			} else {
				resetPosition();
			}
		});

	const containerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	const backdropStyle = useAnimatedStyle(() => ({
		opacity: backdropOpacity.value,
	}));

	const handleSave = async () => {
		if (isSaving) return;
		setIsSaving(true);
		setSaveStatus("idle");
		try {
			const destination = new Directory(Paths.cache, "images");
			if (destination.exists) {
				destination.delete();
			}
			destination.create();

			const downloaded = await File.downloadFileAsync(url, destination);

			// Android 13+ (API 33) doesn't require permissions to save to media store.
			// iOS always needs write permission. Older Android needs it too.
			const needsPermission =
				Platform.OS === "ios" || Number(Platform.Version) < 33;
			if (needsPermission) {
				const { status } = await MediaLibrary.requestPermissionsAsync(false);
				if (status !== "granted") {
					setSaveStatus("error");
					return;
				}
			}

			await MediaLibrary.saveToLibraryAsync(downloaded.uri);

			setSaveStatus("saved");
			showToast("Saved image");
			setTimeout(() => setSaveStatus("idle"), 2500);
		} catch (e) {
			console.error(e);
			setSaveStatus("idle");
			showToast("Failed to save image");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<GestureHandlerRootView style={styles.root}>
			{/* Backdrop */}
			<Animated.View style={[styles.backdrop, backdropStyle]} />

			<GestureDetector gesture={panGesture}>
				<Animated.View style={[styles.container, containerStyle]}>
					{/* Top bar */}
					<View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
						<Pressable
							style={styles.button}
							onPress={animateDismiss}
							hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
						>
							<MaterialIcons name="close" size={24} color="white" />
						</Pressable>
						<View style={styles.topBarCenter}>
							<View style={styles.swipeIndicator} />
						</View>
						<Pressable
							style={styles.button}
							onPress={handleSave}
							disabled={isSaving}
							hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
						>
							{isSaving ? (
								<MaterialIcons name="downloading" size={24} color="white" />
							) : saveStatus === "saved" ? (
								<MaterialIcons name="download-done" size={24} color="white" />
							) : (
								<MaterialIcons name="download" size={24} color="white" />
							)}
						</Pressable>
					</View>

					{/* Image */}
					<Image source={url} style={styles.image} contentFit="contain" />
				</Animated.View>
			</GestureDetector>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "transparent",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "#000",
	},
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
	topBar: {
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingBottom: 12,
		zIndex: 10,
	},
	topBarCenter: {
		flex: 1,
		alignItems: "center",
	},
	swipeIndicator: {
		width: 36,
		height: 4,
		borderRadius: 2,
		backgroundColor: "rgba(255,255,255,0.35)",
	},
	button: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "rgba(255,255,255,0.15)",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		flex: 1,
		width: "100%",
	},
});
