import { Text, ImageBackground } from "react-native";

export default function Services() {
  return (
    <>
      <ImageBackground
         source={require("../../assets/banners/small.png")}
        style={{
          aspectRatio: 3, 
          paddingVertical: 20,
          paddingHorizontal: 40,
        }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Text style={{ color: "#EE9034", fontSize: 20, fontWeight: 500 }}>
          SERVICES
        </Text>
      </ImageBackground>
    </>
  );
}
