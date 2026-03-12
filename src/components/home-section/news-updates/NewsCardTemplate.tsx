import type { Article } from "@/src/types/articles";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

type NewsCardTemplateProps = {
  article: Article;
};

export default function NewsCardTemplate({ article }: NewsCardTemplateProps) {
  // Get screen width
  const screenWidth = Dimensions.get("window").width;

  // Helper to scale font size
  const scaleFont = (size: number) => (screenWidth < 768 ? size : size * 1.5);

  return (
    <Card style={styles.cardContainer} mode="contained">
      <View style={styles.content}>
        {/* LEFT: IMAGE */}
        <Link
          href={{ pathname: "/home/articles/[id]", params: { id: article.id } }}
          asChild
        >
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <ImageBackground
              source={article.image_url}
              style={[
                styles.imageBackground,
                {
                  width: screenWidth * 0.25,
                  height: screenWidth * 0.25,
                },
              ]}
              imageStyle={{ borderRadius: 8 }}
              contentFit="cover"
            >
              <Text style={styles.textStyle} allowFontScaling={false}>
                READ MORE
              </Text>
            </ImageBackground>
          </Pressable>
        </Link>

        {/* RIGHT: TEXT CONTENT */}
        <View style={styles.textContent}>
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
              {article.created_at}
            </Text>

            <Text
              style={[styles.title_1, { fontSize: scaleFont(9) }]}
              allowFontScaling={false}
            >
              {article.user}
            </Text>
          </View>

          <Text
            style={[styles.title_2, { fontSize: scaleFont(9) }]}
            allowFontScaling={false}
          >
            {article.title}
          </Text>
          <Text
            numberOfLines={3}
            style={{ fontSize: scaleFont(8) }}
            allowFontScaling={false}
          >
            {article.content}
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
  content: {
    flexDirection: "row",
    justifyContent: "center",
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
  textContent: {
    flex: 1,
    gap: 5,
    marginLeft: 10,
  },
  textStyle: {
    color: "#c9c7c7",
    textDecorationLine: "underline",
  },
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
});
