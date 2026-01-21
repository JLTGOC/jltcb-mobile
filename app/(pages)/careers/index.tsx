import { Text, ImageBackground, View, ScrollView } from "react-native";
import Form from "./Form";

export default function Index() {
  return (
    <ScrollView>
      <ImageBackground
        source={require("../../../src/assets/banners/large.png")}
        style={{
          padding: 10,
          aspectRatio: 2,
        }}
        resizeMode="cover"
      >
        <Text
          style={{
            color: "#EE9034",
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 0,
            padding: 0,
          }}
          allowFontScaling={false}
        >
          INTERNSHIP OPPORTUNITIES
        </Text>
        <View
          style={{
            borderLeftWidth: 4, // thickness
            borderLeftColor: "#EE9034", // color
            margin: 5,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 10, color: "white" }} allowFontScaling={false}>
            At Jill L. Tolentino Customs Brokerage, we believe in nurturing the
            next generation of customs and logistics professionals. Our
            Internship Program is designed to give students real-world
            experience in the fields of customs brokerage, freight forwarding,
            and regulatory compliance.Whether you’re pursuing a degree in
            customs administration, international trade, logistics, supply chain
            management, or a related field, our internship will immerse you in
            the day-to-day operations of a fast-paced, client-centered brokerage
            firm.
          </Text>
        </View>
      </ImageBackground>

      <View style={{ flex: 1, padding: 10 }}>
        <Form />
      </View>
    </ScrollView>
  );
}
