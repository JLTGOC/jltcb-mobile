import { View } from "react-native";
import Reels from "@/src/components/home-section/reels/ReelsContainer";
import GovermentLogos from "../../../src/components/home-section/GovernmentLogos";
import NewsUpdates from "../../../src/components/home-section/news-updates/NewsUpdatesContainer";

export default function Index() {
	return (
		<View style={{ backgroundColor: "#fff" }}>
			<GovermentLogos />
			<Reels />
			<NewsUpdates />
		</View>
	);
}
