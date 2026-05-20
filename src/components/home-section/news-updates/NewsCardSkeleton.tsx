import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function NewsCardSkeleton() {
  // Get screen width
  const screenWidth = Dimensions.get("window").width;

  // Helper to scale font size
  const scaleFont = (size: number) => (screenWidth < 768 ? size : size * 1.5);

  return (
    <Card style={styles.cardContainer} mode="contained">
      <View style={styles.content}>
        {/* LEFT: IMAGE */}
        <View
          style={[
            styles.imageBackground,
            {
              width: screenWidth * 0.25,
              height: screenWidth * 0.25,
            },
          ]}
        >
          <Text style={styles.textStyle} allowFontScaling={false}>
            READ MORE
          </Text>
        </View>

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
              {/*{article.created_at}*/}
            </Text>

            <Text
              style={[styles.title_1, { fontSize: scaleFont(9) }]}
              allowFontScaling={false}
            >
              {/*{article.user}*/}
            </Text>
          </View>

          <View style={styles.title}>{/*{article.title}*/}</View>
          <View style={[styles.title, { maxWidth: "50%" }]}>
            {/*{article.content}*/}
          </View>
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
    backgroundColor: "#e8e8e8",
    paddingHorizontal: 5,
    color: "white",
    minWidth: 54,
    marginBottom: 8,
  },
  title: {
    // fontWeight: 700,
    backgroundColor: "#e8e8e8",
    width: "100%",
    height: 8,
    borderRadius: 20,
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
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
  },
});
