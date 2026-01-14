import { Image, ImageBackground, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-paper";
import styles from "./styles";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import SocialLogos from "./SocialLogos";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <ImageBackground
        source={require("../../../src/assets/landingPage.png")}
        style={styles.image}
      >
        <SocialLogos />

        <View style={styles.whiteOverlay} />

        <View style={styles.buttonContainer}>
          <Image
            source={require("../../../src/assets/black_logos/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Image
            source={require("../../../src/assets/black_logos/word.png")}
            style={styles.wordImage}
            resizeMode="cover"
          />
        </View>
        <View
          style={{ justifyContent: "flex-end", alignItems: "center", gap: 10, marginBottom: 20}}
        >
          <TouchableOpacity onPress={() => router.push("/home")}>
            <LinearGradient
              colors={["#161F3C", "#000000"]} // BUTTON gradient fill
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.innerGradient}
            >
              <Ionicons name="person" size={22} color="#EE9034" />
              <Text style={styles.buttonText}>Guest</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text variant="titleMedium">
            Already have an account?{" "}
            <Text
              onPress={() => router.push("/(pages)/sign-in")}
              style={{ fontWeight: "bold" }}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </>
  );
}
