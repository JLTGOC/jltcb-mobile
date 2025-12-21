import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/landing-page/landing-page-styles";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import SocialLogos from "@/components/landingPage/SocialLogos";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <ImageBackground
        source={require("../assets/landingPage.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.whiteOverlay} />
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/black_logos/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Image
            source={require("../assets/black_logos/word.png")}
            style={styles.wordImage}
            resizeMode="cover"
          />
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={["#EE9034", "#FFFFFF"]} // BORDER gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.outerGradient}
            >
              <TouchableOpacity>
                <LinearGradient
                  colors={["#161F3C", "#000000"]} // BUTTON gradient fill
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.innerGradient}
                >
                  <Ionicons name="people" size={22} color="#EE9034" />
                  <Text style={styles.buttonText} >Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={["#EE9034", "#FFFFFF"]} // BORDER gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.outerGradient}
            >
              <TouchableOpacity
                onPress={() => 
                  router.push("/home")
                }
              >
                <LinearGradient
                  colors={["#161F3C", "#000000"]} // BUTTON gradient fill
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.innerGradient}
                >
                  <Ionicons name="person" size={22} color="#EE9034"/>
                  <Text style={styles.buttonText}>Guest</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        <View>
          <SocialLogos/>
        </View>
      </ImageBackground>
    </>
  );
}
