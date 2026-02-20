import Ionicons from "@expo/vector-icons/Ionicons";
import { useEvent } from "expo";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, AppState } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { Reel } from "@/src/types/reels";

type ReelsPlayerProps = {
  reel: Reel;
  shouldPlay: boolean;
};

export default function ReelsPlayer({ reel, shouldPlay }: ReelsPlayerProps) {
  const screenWidth = Dimensions.get("window").width;
  const videoSize = { width: screenWidth * 0.2, height: screenWidth * 0.3 };

  return (
    <View pointerEvents="none" style={[styles.videoSize, videoSize]}>
      <Image
        alt={String(reel.id)}
        source={reel?.thumbnail_path ? encodeURI(reel.thumbnail_path) : ""}
        style={styles.fullscreenVideo}
      />
      {shouldPlay && <ActiveVideo reel={reel} />}
      <View style={styles.viewsContainer}>
        <Ionicons name="eye" color="white" />
        <Text style={styles.viewCountText}>{reel.view_count}</Text>
      </View>
    </View>
  );
}

function ActiveVideo({ reel }: Omit<ReelsPlayerProps, "shouldPlay">) {
  const opacity = useSharedValue(1);

  // Create the player safely
  const player = useVideoPlayer(
    { uri: reel?.video_path ? encodeURI(reel.video_path) : "", useCaching: true },
    (p) => {
      p.muted = true;
      p.loop = true;
      try {
        p.play();
      } catch (e) {
        console.warn("Initial play failed:", e);
      }
    }
  );

  // Handle app state changes safely
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      try {
        if (nextAppState !== "active") {
          player?.pause?.();
        } else {
          player?.play?.();
        }
      } catch (e) {
        console.warn("AppState player control failed:", e);
      }
    });

    return () => {
      subscription?.remove?.();
      try {
        player?.pause?.();
      } catch (e) {
        console.warn("Cleanup pause failed:", e);
      }
    };
  }, [player]);

  // Listen for status changes
  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  useEffect(() => {
    if (status === "readyToPlay") {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [status]);

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <VideoView
        player={player}
        style={styles.fullscreenVideo}
        contentFit="cover"
        nativeControls={false}
      />

      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, animatedOverlayStyle]}
      >
        <Image
          source={reel?.thumbnail_path ? encodeURI(reel.thumbnail_path) : ""}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          priority="low"
        />
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  videoSize: {
    marginRight: 5,
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenVideo: {
    width: "100%",
    height: "100%",
  },
  viewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 4,
    bottom: 4,
    gap: 3,
    position: "absolute",
  },
  viewCountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
