import GovermentLogos from "@/components/home/GovernmentLogos"
import NewsUpdates from "@/components/home/NewsUpdates"
import VideoReels from "@/components/home/video/VideoReels"
import { View } from "react-native"

export default function Home(){
    return(
        <View style={{backgroundColor: "#fff"}}>
        <GovermentLogos></GovermentLogos>
        <VideoReels></VideoReels>
        <NewsUpdates></NewsUpdates>
        </View>
    )
}