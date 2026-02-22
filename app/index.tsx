import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Button,View } from "react-native";
import * as Sentry from "@sentry/react-native"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const rotateAnim = useSharedValue(0);
  const fadeAnim = useSharedValue(0);
  const leftAnim = useSharedValue(0);
  const rightAnim = useSharedValue(0);
  const finalFade = useSharedValue(1); // start fully visible

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
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
        Asset.fromModule(img).downloadAsync()
      );
      await Promise.all(cacheImages);
      setImagesLoaded(true); // mark images as loaded
    }
    loadAssets();
  }, []);

  // Start animation once images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    rotateAnim.value = withTiming(26, { duration: 1000 });
    leftAnim.value = withDelay(1000, withTiming(-width * 2, { duration: 800 }));
    rightAnim.value = withDelay(1000, withTiming(width * 2, { duration: 800 }));
    fadeAnim.value = withDelay(1800, withTiming(1, { duration: 100 }));

    // Final fade-out
    finalFade.value = withDelay(
      2500,
      withTiming(0, { duration: 500 }) // fade to 0 opacity
    );
  }, [imagesLoaded]);

  // Animated styles
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

  const containerStyle = useAnimatedStyle(() => ({
    opacity: finalFade.value,
    zIndex: finalFade.value === 0 ? -1 : 999, // hide behind app when done
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.halfContainer, rotateStyle]}>
        <Animated.View
          style={[
            styles.half,
            { backgroundColor: "#EE9034" },
            leftStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.half,
            { backgroundColor: "#161F3C" },
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
        <View style={{ marginTop: 20 }}>
          <Button 
            title='Test Sentry Error' 
            onPress={() => { Sentry.captureException(new Error('Sentry Setup Test!')) }} 
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
