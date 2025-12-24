import { useVideoPlayer, VideoView } from "expo-video"
import styles from "./styles"

export default function VideoPlayer({video}:{video: number}){
const player = useVideoPlayer(video, (player) => {
    player.play()
})

    return(
        <VideoView
            player={player}
            style={styles.videoSize}
            contentFit="cover"
            nativeControls={false}
        />
    )
}