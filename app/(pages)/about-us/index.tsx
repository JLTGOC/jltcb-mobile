import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import CoreValuesTemplate from "@/src/components/about-section/CoreValuesTemplate";
import PrincipleList from "@/src/components/about-section/PrincipleList";
import styles from "./indexStyles";

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../src/assets/about_us/header.png")}
        style={styles.imageHeader}
      />
      <Text
        style={{
          fontSize: 12,
          textAlign: "justify",
          width: "100%",
          paddingVertical: 10,
          color: "#404040",
          lineHeight: 14,
        }}
        allowFontScaling={false}
      >
        Jill L. Tolentino Customs Brokerage (JLTCB) is a trusted and
        fast-growing customs brokerage and logistics firm in the Philippines.
        Built on strong regulatory expertise and ethical practice, we deliver
        reliable, precision-driven trade solutions to local and international
        clients. Led by nationally recognized customs and logistics leader 
		Jill L. Tolentino, JLTCB is known for operational excellence, strict
        compliance, and a client-first approach—helping businesses move goods
        efficiently and with confidence.
      </Text>
      <CoreValuesTemplate />
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#EE9034",
            marginVertical: 10,
          }}
          allowFontScaling={false}
        >
          OUR SERVICES ARE BUILT ON THREE PILLARS:
        </Text>
        <PrincipleList />
      </View>
    </ScrollView>
  );
}
