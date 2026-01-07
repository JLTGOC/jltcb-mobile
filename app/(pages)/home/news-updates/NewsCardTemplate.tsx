import React from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { Card } from "react-native-paper";

export default function NewsCardTemplate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formatted = `${day}/${month}/${year}`;

  // Get screen width
  const screenWidth = Dimensions.get("window").width;

  // Helper to scale font size
  const scaleFont = (size: number) => (screenWidth < 768 ? size : size * 1.5);

  return (
    <Card style={styles.cardContainer} mode="contained">
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {/* LEFT: IMAGE */}
        <Image
          source={require("../../../../src/assets/images/testImage.png")}
          style={{
            width: screenWidth * 0.25,
            height: screenWidth * 0.25,
            borderRadius: 8,
            marginRight: 10,
          }}
          resizeMode="cover"
        />

        {/* RIGHT: TEXT CONTENT */}
        <View style={{ flex: 1, gap: 5 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 1,
            }}
          >
            <Text style={[styles.title_1, { fontSize: scaleFont(9) }]}>
              {formatted}
            </Text>

            <Text style={[styles.title_1, { fontSize: scaleFont(9) }]}>
              JANELLE
            </Text>
          </View>

          <Text style={[styles.title_2, { fontSize: scaleFont(9) }]}>
            What Is the Prior Disclosure Program and How It Can Save Your
            Business from Customs Penalties
          </Text>
          <Text numberOfLines={3} style={{ fontSize: scaleFont(8) }}>
            What Is the Prior Disclosure Program and How It Can Save Your
            Business from Customs Penalties Previously on...
          </Text>
        </View>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 5,
    justifyContent: "center",
    elevation: 0,
    borderWidth: 0,
    backgroundColor: "#ffffff",
    width:"100%"
  },
  title_1: {
    backgroundColor: "gray",
    paddingHorizontal: 5,
    color: "white",
  },
  title_2: { fontWeight: 700 },
});
