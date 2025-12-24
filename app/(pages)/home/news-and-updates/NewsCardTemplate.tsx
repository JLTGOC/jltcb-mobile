import React from "react";
import { Image, Text, View } from "react-native";
import { Card } from "react-native-paper";
import styles from "../styles";

export default function NewsCardTemplate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formatted = `${day}/${month}/${year}`;
  return (
    <Card style={styles.cardContainer} mode="contained">
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {/* LEFT IMAGE */}
        <Image
          source={require("../../../../assets/images/testImage.png")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 8,
            marginRight: 10,
          }}
        />

        {/* RIGHT TEXT CONTENT */}
        <View style={{ flex: 1, gap: 5 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 1,
            }}
          >
            <Text style={styles.title_1}>{formatted}</Text>

            <Text style={styles.title_1}>JANELLE</Text>
          </View>

          <Text style={styles.title_2}>
            What Is the Prior Disclosure Program and How It Can Save Your
            Business from Customs Penalties
          </Text>
          <Text numberOfLines={3} style={styles.description}>
            What Is the Prior Disclosure Program and How It Can Save Your
            Business from Customs Penalties Previously on...
          </Text>
        </View>
      </View>
    </Card>
  );
}
