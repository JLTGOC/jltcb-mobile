import {
  Text,
  ImageBackground,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Ports from "@/app/(pages)/ports-catered/Ports";
import ports from "./ports";

export default function Index() {
  const screenWidth = Dimensions.get("window").width;

  const mapImage = require("../../../src/assets/ports_catered/map.png");
  const { width, height } = Image.resolveAssetSource(mapImage);
  const scaledHeight = (screenWidth * height) / width;
  return (
    <FlatList
      data={ports}
      keyExtractor={(item) => item.region}
      ListHeaderComponent={
        <>
          <ImageBackground
            source={require("../../../src/assets/banners/small.png")}
            style={{
              aspectRatio: 3,
              paddingVertical: 30,
              paddingHorizontal: 40,
            }}
            resizeMode="cover"
          >
            <Text
              style={{
                color: "#EE9034",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              PORTS CATERED
            </Text>
          </ImageBackground>

          <Image
            source={mapImage}
            resizeMode="contain"
            style={{
              width: screenWidth,
              height: scaledHeight,
              marginTop: -30,
            }}
          />

          <Ports />
        </>
      }
      renderItem={() => null}
    />
  );
}
