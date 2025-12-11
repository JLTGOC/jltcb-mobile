import { Text, ImageBackground, View } from "react-native";

export default function ContactUs() {
  return (
    <>
      <ImageBackground
        source={require("../../assets/banners/large.png")}
       style={{
          padding:20,
          aspectRatio: 2,
        }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Text
          style={{
            color: "#EE9034",
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 10,
           
          }}
          
        >
          CONTACT US
        </Text>
        <View
          style={{
            borderLeftWidth: 4, // thickness
            borderLeftColor: "#EE9034", // color
            margin: 5,
            paddingHorizontal: 5,
            height: 30,
          }}
        >
          <Text style={{ fontSize: 12,  color: "white" }}>
            If you have any inquiries get in touch with us We’ll be happy to
            help.
          </Text>
        </View>
      </ImageBackground>
    </>
  );
}
