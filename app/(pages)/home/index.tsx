import GovermentLogos from "./GovernmentLogos"
import NewsUpdates from "./NewsUpdates"
import VideoReels from "./VideoContainer"
import { View } from "react-native"

export default function Index(){
    return(
        <View style={{backgroundColor: "#fff"}}>
        <GovermentLogos></GovermentLogos>
        <VideoReels></VideoReels>
        <NewsUpdates></NewsUpdates>
        </View>
    )
}