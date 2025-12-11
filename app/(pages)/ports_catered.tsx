import { Text, ImageBackground } from "react-native";

export default function PortsCatered() {
  return (
    <>
      <ImageBackground
        source={require("../../assets/banners/small.png")}
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
    </>
  );
}
