import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { ImageBackground, Image } from "expo-image";
import { useAuth } from "@/src/hooks/useAuth";

export default function Header() {
  const { userData } = useAuth();

  const { width } = Dimensions.get("window");
  return (
    <>
      <ImageBackground
        source={require("../../../assets/banners/small.png")}
        contentFit="cover"
        style={{
          padding: 10,
          aspectRatio: 3,
          width: width,
        }}
      >
        <View style={{ flexDirection: "row", padding: 5, gap: 20}}>
          <Image
            source={require("../../../assets/images/profile.png")}
            style={{ borderRadius: 50, width: 90, height: 90 }}
          />
          <Text style={{ color: "white", fontWeight: 700, paddingTop: 20 }} variant="titleLarge">
            {userData ? userData.full_name : "Loading..."}
          </Text>
        </View>
      </ImageBackground>
    </>
  );
}
