import { FlatList, View, Image } from "react-native";
import styles from "../../../styles/home/video-styles";
import VideoItem from "./VideoItem";

const data = [
  { id: "v1", type: "video", source: require("../../../assets/reels/vid_1.mp4") },
  { id: "v2", type: "video", source: require("../../../assets/reels/vid_2.mp4") },

  { id: "i1", type: "image", source: require("../../../assets/reels/image_1.png") },
  { id: "i2", type: "image", source: require("../../../assets/reels/image_2.png") },
  { id: "i3", type: "image", source: require("../../../assets/reels/image_3.png") },
  { id: "i4", type: "image", source: require("../../../assets/reels/image_4.png") },
  { id: "i5", type: "image", source: require("../../../assets/reels/image_5.png") },
  { id: "i6", type: "image", source: require("../../../assets/reels/image_6.png") },
];

export default function VideoReels() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.type === "video") {
            return <VideoItem video={item.source} />;
          }

          return <Image source={item.source} style={styles.video} />;
        }}
      />
    </View>
  );
}
