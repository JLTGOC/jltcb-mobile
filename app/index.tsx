import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  const rotateAnim = useSharedValue(0);
  const fadeAnim = useSharedValue(0);
  const leftAnim = useSharedValue(0);
  const rightAnim = useSharedValue(0);
  const finalFade = useSharedValue(0);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imagesToLoad = [
      require("../src/assets/black_logos/full_logo.png"),
      require("../src/assets/landingPage.png"),
      require("../src/assets/black_logos/logo.png"),
      require("../src/assets/black_logos/word.png"),
      require("../src/assets/social_logos/facebook.png"),
      require("../src/assets/social_logos/instagram.png"),
      require("../src/assets/social_logos/youtube.png"),
      require("../src/assets/social_logos/tiktok.png"),
      require("../src/assets/social_logos/twitter.png"),
      require("../src/assets/social_logos/linkedIn.png"),
    ];

    async function loadAssets() {
      const cacheImages = imagesToLoad.map((img) =>
        Asset.fromModule(img).downloadAsync(),
      );
      await Promise.all(cacheImages);
      setImagesLoaded(true); // mark images as loaded
    }
    loadAssets();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    rotateAnim.value = withTiming(26, { duration: 1000 });

    leftAnim.value = withDelay(1000, withTiming(-width * 2, { duration: 800 }));

    rightAnim.value = withDelay(1000, withTiming(width * 2, { duration: 800 }));

    fadeAnim.value = withDelay(1800, withTiming(1, { duration: 800 }));

    fadeAnim.value = withDelay(2800, withTiming(0, { duration: 800 }));

    finalFade.value = withDelay(
      3600,
      withTiming(1, { duration: 500 }, () => {
        runOnJS(router.replace)("/(pages)/landing-page");
      }),
    );
  }, [imagesLoaded]);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateAnim.value}deg` }],
  }));

  const leftStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftAnim.value }],
  }));

  const rightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightAnim.value }],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: finalFade.value === 1 ? "#161F3C" : "transparent",
  }));

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <Animated.View style={[styles.halfContainer, rotateStyle]}>
        <Animated.View
          style={[
            styles.half,
            {
              backgroundColor: "#EE9034",
            },
            leftStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.half,
            {
              backgroundColor: "#161F3C",
            },
            rightStyle,
          ]}
        />
      </Animated.View>

      <Animated.View style={[styles.logoContainer, fadeStyle]}>
        <Image
          source={require("../src/assets/black_logos/full_logo.png")}
          style={{ width: 300, height: 220 }}
          contentFit="contain"
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  halfContainer: {
    width: width * 2,
    height: height * 2,
    flexDirection: "row",
    overflow: "hidden",
  },
  half: {
    width: width,
    height: height * 2,
  },
  logoContainer: {
    position: "absolute",
    top: "40%",
    alignItems: "center",
    alignSelf: "center",
  },
});
