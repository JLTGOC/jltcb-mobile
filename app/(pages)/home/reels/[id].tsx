import { useLocalSearchParams } from "expo-router";
import ReelsFullScreen from "@/src/components/home-section/reels/ReelsFullScreen";

export default function Reel() {
	const { id } = useLocalSearchParams<{ id: string }>();
	return <ReelsFullScreen id={id} />;
}
