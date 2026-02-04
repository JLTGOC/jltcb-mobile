import Logos from "@/src/components/home-section/Logos";
import NewsUpdates from "@/src/components/home-section/news-updates/NewsUpdatesContainer";
import Reels from "@/src/components/home-section/reels/ReelsContainer";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Logos/>
      <Reels />
      <NewsUpdates />
    </View>
  );
}
