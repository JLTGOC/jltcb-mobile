import ContactDetails from "@/app/(pages)/contact-us/ContactDetails";
import { Image, ImageBackground } from "expo-image";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <>
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
            marginBottom: 15,
          }}
          allowFontScaling={false}
        >
          CONTACT US
        </Text>
        <View
          style={{
            borderLeftWidth: 4, // thickness
            borderLeftColor: "#EE9034", // color
            margin: 5,
            paddingHorizontal: 5,
            height: 35,
          }}
        >
          <Text
            style={{ fontSize: 15, color: "white" }}
            allowFontScaling={false}
          >
            If you have any inquiries get in touch with us. We’ll be happy to
            help.
          </Text>
        </View>
      </ImageBackground>

      {/* details */}
      <ContactDetails />

      {/* image */}
      <Image
        source={require("../../../src/assets/contact_us/location.png")}
        style={{ height: 300, width: "100%" }}
      />
    </>
  );
}
