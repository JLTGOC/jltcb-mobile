import { Text, ImageBackground, View, Image } from "react-native";
import ContactDetails from "@/app/(pages)/contact-us/ContactDetails";

export default function Index() {
  return (
    <>
      {/* banner */}
      <ImageBackground
        source={require("../../../assets/banners/large.png")}
        style={{
          padding: 20,
          aspectRatio: 2,
        }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Text
          style={{
            color: "#EE9034",
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 15,
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
            height: 35,
          }}
        >
          <Text style={{ fontSize: 15, color: "white" }}>
            If you have any inquiries get in touch with us. We’ll be happy to
            help.
          </Text>
        </View>
      </ImageBackground>

      {/* details */}
      <ContactDetails />

      {/* image */}
      <Image
        source={require("../../../assets/contact_us/location.png")}
        style={{ height: 300, width: "100%" }}
      />
    </>
  );
}
