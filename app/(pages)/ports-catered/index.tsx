import { Text, ImageBackground, Image } from "react-native";
import Ports from "@/app/(pages)/ports-catered/Ports";

export default function Index() {
  return (
    <>
      <ImageBackground
        source={require("../../../assets/banners/small.png")}
        style={{
          aspectRatio: 3,
          paddingVertical: 30,
          paddingHorizontal: 40,
        }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Text
          style={{
            color: "#EE9034",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          PORTS CATERED
        </Text>
      </ImageBackground>
      <Image
        source={require("../../assets/ports_catered/map.png")}
        resizeMode="cover"
        style={{ height: "70%", width:"100%", marginTop: -30 }}
      />
      <Ports/>
    </>
  );
}
