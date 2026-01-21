import { Image, ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function LandingPage() {
  const { navigate } = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/black_logos/logo.png")}
            contentFit="contain"
          />
          <Text style={styles.title} allowFontScaling={false}>
            Jill L. Tolentino Group
          </Text>
        </View>

        <View style={styles.solutions}>
          <Pressable
            onPress={() => navigate("/landing-page/customs-brokerage")}
            style={styles.solution}
          >
            <Image
              style={styles.image}
              source={require("../assets/landing-page/customs-brokerage.png")}
              contentFit="contain"
            />
            <Text style={styles.solutionText} allowFontScaling={false}>
              CUSTOMS BROKERAGE
            </Text>
          </Pressable>
          <View style={styles.solution}>
            <Image
              style={styles.image}
              source={require("../assets/landing-page/global-trade.png")}
              contentFit="contain"
            />
            <Text style={styles.solutionText} allowFontScaling={false}>
              GLOBAL TRADE AND BUSINESS SOLUTIONS CORPORATIONS
            </Text>
          </View>
          <View style={styles.solution}>
            <Image
              style={styles.image}
              source={require("../assets/landing-page/world-wide-logistics.png")}
              contentFit="contain"
            />
            <Text style={styles.solutionText} allowFontScaling={false}>
              WORLD WIDE LOGISTICS CORPORATION
            </Text>
          </View>
        </View>
      </View>

      <ImageBackground
        style={styles.bottomBanner}
        source={require("../assets/banners/large.png")}
        contentFit="fill"
      >
        <Image
          style={styles.skyline}
          source={require("../assets/landing-page/skyline_vector_white 1.png")}
          contentFit="cover"
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: "white",
  },
  main: {
    justifyContent: "flex-end",
    flex: 1,
    gap: 30,
    paddingHorizontal: 20,
  },
  logoContainer: {
    gap: 20,
    height: "50%",
  },
  logo: {
    flex: 1,
    marginLeft: "8%",
  },
  image: {
    height: 100,
  },
  title: {
    textTransform: "uppercase",
    fontFamily: Platform.select({
      android: "MartelSans_900Black",
      ios: "MartelSans-Black",
    }),
    textAlign: "center",
    fontSize: 36,
    lineHeight: 48,
  },
  solutions: {
    flexDirection: "row",
    gap: 10,
  },
  solution: {
    flex: 1,
  },
  solutionText: {
    color: "#16324A",
    fontFamily: Platform.select({
      android: "MartelSans_800ExtraBold",
      ios: "MartelSans-ExtraBold",
    }),
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: 20,
    fontSize: 12,
  },
  bottomBanner: {
    aspectRatio: 2.5,
    transform: [{ rotate: "180deg" }],
  },
  skyline: {
    flex: 1,
    width: "100%",
    transform: [{ rotate: "180deg" }, { translateY: 20 }],
  },
});
