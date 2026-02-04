import { Reel } from "@/src/types/reels";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions, StyleSheet, Text, View } from "react-native";

type ReelsPlayerProps = {
  reel: Reel;
  shouldPlay: boolean;
};

export default function ReelsPlayer({ reel, shouldPlay }: ReelsPlayerProps) {
  const screenWidth = Dimensions.get("window").width;
  const videoSize = { width: screenWidth * 0.2, height: screenWidth * 0.3 };

  return (
    <View pointerEvents="none" style={[styles.videoSize, videoSize]}>
      {shouldPlay ? (
        // Hook is only active when this component is mounted
        <ActiveVideo key={reel.id} reel={reel} />
      ) : (
        // Show a lightweight image when not active
        <Image
          source="https://placehold.co/400x600"
          style={styles.fullscreenVideo}
        />
      )}
      <View style={styles.viewsContainer}>
        <Ionicons name="eye" color="white" />
        <Text style={styles.viewCountText}>{reel.view_count}</Text>
      </View>
    </View>
  );
}

function ActiveVideo({ reel }: Omit<ReelsPlayerProps, "shouldPlay">) {
  const player = useVideoPlayer(
    { uri: encodeURI(reel.video_path), useCaching: true },
    (p) => {
      p.muted = true;
      p.loop = true;
      p.play();
    },
  );

  return (
    <VideoView
      player={player}
      style={styles.fullscreenVideo}
      contentFit="cover"
      nativeControls={false}
    />
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
