import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { imageData } from "../../../../src/constants/home_NewsArticle";

export default function NewsCardTemplate() {
  const router = useRouter();

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
        <View style={styles.imageContainer}>
          <Image
            source={imageData.testImage1}
            style={[
              styles.image,
              {
                width: screenWidth * 0.25,
                height: screenWidth * 0.25,
              },
            ]}
            contentFit="cover"
          />
          <TouchableOpacity
            style={styles.overLay}
            onPress={() => {
              {
                router.push("/(pages)/home/NewsArtice");
              }
            }}
          >
            <Text style={styles.textStyle} allowFontScaling={false}>
              READ MORE
            </Text>
          </TouchableOpacity>
        </View>

        {/* RIGHT: TEXT CONTENT */}
        <View style={{ flex: 1, gap: 5, marginLeft: 10 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 1,
            }}
          >
            <Text
              style={[styles.title_1, { fontSize: scaleFont(9) }]}
              allowFontScaling={false}
            >
              {formatted}
            </Text>

            <Text
              style={[styles.title_1, { fontSize: scaleFont(9) }]}
              allowFontScaling={false}
            >
              JANELLE
            </Text>
          </View>

          <Text
            style={[styles.title_2, { fontSize: scaleFont(9) }]}
            allowFontScaling={false}
          >
            {imageData.title}
          </Text>
          <Text
            numberOfLines={3}
            style={{ fontSize: scaleFont(8) }}
            allowFontScaling={false}
          >
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
    width: "100%",
  },
  title_1: {
    backgroundColor: "gray",
    paddingHorizontal: 5,
    color: "white",
  },
  title_2: {
    fontWeight: 700,
  },
  imageContainer: {
    position: "relative",
  },
  overLay: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#c9c7c7",
    textDecorationLine: "underline",
  },
  image: {
    borderRadius: 8,
  },
});
