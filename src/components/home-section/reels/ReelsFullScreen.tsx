import { reelQueryOptions } from "@/src/query-options/reels/reelQueryOptions";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useEvent } from "expo";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function ReelsFullScreen() {
  const { id, placeholder } = useLocalSearchParams<{
    id: string;
    placeholder: string;
  }>();
  const { data, isPending } = useQuery(reelQueryOptions(id));

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const router = useRouter();

  const player = useVideoPlayer(
    { uri: data?.data.video_path, useCaching: false },
    (player) => {
      player.loop = true;
      player.play();
    },
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  const { status, error } = useEvent(player, "statusChange", {
    status: player.status,
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

      {status !== "readyToPlay" && !isPending && (
        <Image
          source={{ uri: placeholder }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
        />
      )}

      {/* Overlay Play/Pause Button */}
      <Pressable
        style={[
          styles.buttonOverlay,
          { width: screenWidth, height: screenHeight * 0.81 },
          { opacity: isPlaying ? 0 : 1 },
        ]}
        onPress={togglePlay}
      >
        {status === "loading" ? (
          <ActivityIndicator color="#d6d6d6" size="large" />
        ) : (
          <Ionicons name="play" size={70} color="white" />
        )}
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
