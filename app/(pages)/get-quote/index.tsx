import { ImageBackground } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import Form from "../../../src/components/quote-section/Form";

export default function Index() {
  return (
    <ScrollView >
      {/* banner */}
      <ImageBackground
        source={require("../../../src/assets/banners/large.png")}
        style={{
          padding: 20,
          aspectRatio: 2,
        }}
        contentFit="cover"
      >
        <Text
          style={{
            color: "#EE9034",
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 4,
          }}
          allowFontScaling={false}
        >
          Get Qoute
        </Text>
        <View
          style={{
            borderLeftWidth: 4, // thickness
            borderLeftColor: "#EE9034", // color
            margin: 5,
            paddingHorizontal: 5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 12, color: "white" }}
            allowFontScaling={false}
          >
            Whether you’re importing, exporting, or need help navigating customs
            regulations, JLTCB provides professional support for seamless
            clearance, freight forwarding, and compliance solutions. Fill out
            the form to get started we’ll send you a tailored quotation
            promptly.
          </Text>
        </View>
      </ImageBackground>
      <Form />
    </ScrollView>
  );
}
