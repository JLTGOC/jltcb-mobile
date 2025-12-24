import { Image, Text, View } from "react-native";
import CardTemplate2 from "@/app/(pages)/about-us/CoreValuesTemplate";
import Pillars from "@/app/(pages)/about-us/PrincipleList";
import styles from "./styles";
export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/about_us/header.png")}
        style={styles.imageHeader}
      />
      <Text
        style={{
          fontSize: 12,
          textAlign: "justify",
          width: "100%",
          paddingVertical: 10,
          color: "#404040",
          lineHeight: 14
        }}
      >
        Proudly recognized as the first customs brokerage in the Philippines
        certified compliant by the Professional Regulation Commission (PRC) and
        the Professional Regulatory Board for Customs Brokers (PRBCB), we uphold
        the highest standards of compliance, ethics, and professionalism in
        every transaction.
      </Text>
      <CardTemplate2/>
      <View style={{paddingHorizontal: 10}}>
      <Text
        numberOfLines={2}
        style={{ fontSize: 25, fontWeight: "bold", color: "#EE9034", marginVertical:10 }}
      >
        OUR SERVICES ARE BUILT ON THREE PILLARS:
      </Text>
      <Pillars/>
      </View>
    </View>
  );
}
