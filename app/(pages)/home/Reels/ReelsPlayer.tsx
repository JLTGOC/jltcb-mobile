import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Dimensions, Pressable } from "react-native";
import { useEffect, useState } from "react";

type Props = {
  video: number;
};

export default function ReelsPlayer({ video }: Props) {

  const player = useVideoPlayer(video);
  useEffect(() => {
    player.muted = true; //this muted prop is not working i dont know why
    player.volume = 0;
    player.play();
  })

  const screenWidth = Dimensions.get("window").width;

  

  return (
    <>
      <VideoView
        player={player}
        style={[
          styles.videoSize,
          { width: screenWidth * 0.2, height: screenWidth * 0.3 },
        ]}
        contentFit="cover"
        nativeControls={false} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  videoSize: {
    marginRight: 5,
    borderRadius: 5,
    overflow: "hidden",
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
});
