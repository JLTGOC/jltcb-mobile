import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Animated, Image } from "react-native";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const leftAnim = useRef(new Animated.Value(0)).current;
  const rightAnim = useRef(new Animated.Value(0)).current;
  const finalFade = useRef(new Animated.Value(0)).current;

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const imagesToLoad = [
    require("../assets/black_logos/full_logo.png"),
    require("../assets/landingPage.png"),
    require("../assets/black_logos/logo.png"),
    require("../assets/black_logos/word.png"),
    require("../assets/social_logos/facebook.png"),
    require("../assets/social_logos/instagram.png"),
    require("../assets/social_logos/youtube.png"),
    require("../assets/social_logos/tiktok.png"),
    require("../assets/social_logos/twitter.png"),
    require("../assets/social_logos/linkedIn.png"),
  ];

  useEffect(() => {
    async function loadAssets() {
      const cacheImages = imagesToLoad.map((img) =>
        Asset.fromModule(img).downloadAsync()
      );
      await Promise.all(cacheImages);
      setImagesLoaded(true); // mark images as loaded
    }
    loadAssets();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return; // wait for images

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.parallel([
        Animated.timing(leftAnim, {
          toValue: -width * 2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rightAnim, {
          toValue: width * 2,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }).start(() => {
              Animated.timing(finalFade, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
              }).start(() => {
                router.replace("./landing-page")
              });
            });
          }, 1000);
        });
      });
    });
  }, [imagesLoaded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "26deg"],
  });

  const finalBackgroundColor = finalFade.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "#161F3C"],
  });

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: finalBackgroundColor }]}
    >
      <Animated.View
        style={[styles.halfContainer, { transform: [{ rotate }] }]}
      >
        <Animated.View
          style={[
            styles.half,
            {
              backgroundColor: "#EE9034",
              transform: [{ translateX: leftAnim }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.half,
            {
              backgroundColor: "#161F3C",
              transform: [{ translateX: rightAnim }],
            },
          ]}
        />
      </Animated.View>

      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require("../assets/black_logos/full_logo.png")}
          style={{ width: 300, height: 220 }}
          resizeMode="contain"
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
