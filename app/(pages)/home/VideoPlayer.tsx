import { useVideoPlayer, VideoView } from "expo-video"
import { StyleSheet, Dimensions } from "react-native"

export default function VideoPlayer({video}:{video: number}){
const player = useVideoPlayer(video, (player) => {
    player.play()
})
 const screenWidth = Dimensions.get("window").width
    return(
        <VideoView
            player={player}
            style={[styles.videoSize, {width: screenWidth * .20, height: screenWidth * .30}]}
            contentFit="cover"
            nativeControls={false}
        />
    )
}

const styles = StyleSheet.create({
 
  videoSize:{
    marginRight: 5,
    borderRadius: 5,
    overflow: "hidden",
  }
});
