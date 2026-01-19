import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function CustomsBrokerageLanding() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/landingPage.png")}
      style={styles.image}
    >
      <View style={styles.whiteOverlay} />

      <View style={styles.main}>
        <View>
          <Image
            source={require("../assets/customs-brokerage/customs-brokerage.png")}
            style={styles.logoImage}
            contentFit="contain"
          />
          <Text style={styles.title}>Customs Brokerage</Text>
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Pressable onPress={() => router.push("/home")}>
            <LinearGradient
              colors={["#161F3C", "#000000"]} // BUTTON gradient fill
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.innerGradient}
            >
              <MaterialIcons name="person-outline" size={22} color="#EE9034" />
              <Text style={styles.buttonText}>Guest</Text>
            </LinearGradient>
          </Pressable>
          <Text variant="titleMedium">
            Already have an account?{" "}
            <Link href="/sign-in" style={{ fontWeight: "bold" }}>
              Sign In
            </Link>
          </Text>
        </View>
      </View>

      <ImageBackground
        style={styles.bottomBanner}
        source={require("../assets/banners/small.png")}
        contentFit="fill"
      >
        <SocialLogos />
      </ImageBackground>
    </ImageBackground>
  );
}

const openLink = (url: string) => {
  Linking.openURL(url);
};

function SocialLogos() {
  return (
    <View style={styles.socialIconsContainer}>
      <Pressable
        style={styles.socialLink}
        onPress={() => openLink("https://www.facebook.com/jltcb.ph")}
      >
        <Image
          style={styles.socialIcon}
          source={require("../assets/social_logos/facebook.png")}
        />
      </Pressable>
      <Pressable
        style={styles.socialLink}
        onPress={() =>
          openLink("https://www.instagram.com/jltcustomsbrokerage/</View>")
        }
      >
        <Image
          style={styles.socialIcon}
          source={require("../assets/social_logos/instagram.png")}
        />
      </Pressable>
      <Pressable
        style={styles.socialLink}
        onPress={() =>
          openLink("https://www.youtube.com/@jilll.tolentinocustomsbrok4791")
        }
      >
        <Image
          style={styles.socialIcon}
          source={require("../assets/social_logos/youtube.png")}
        />
      </Pressable>
      <Pressable
        style={styles.socialLink}
        onPress={() => openLink("https://www.tiktok.com/@jltcustomsbrokerage")}
      >
        <Image
          style={styles.socialIcon}
          source={require("../assets/social_logos/tiktok.png")}
        />
      </Pressable>
      <Pressable
        style={styles.socialLink}
        onPress={() => openLink("https://x.com/jltcb_ph")}
      >
        <Image
          style={styles.socialIcon}
          source={require("../assets/social_logos/linkedIn.png")}
        />
      </Pressable>
      <Pressable
        style={styles.socialLink}
        onPress={() => openLink("https://x.com/jltcb_ph")}
      >
        <Image
          style={styles.socialIcon}
          source={require("../assets/social_logos/twitter.png")}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  //LANDING PAGE
  main: {
    marginTop: 100,
    justifyContent: "center",
    flex: 1,
    gap: 100,
    paddingHorizontal: 20,
  },

  //logo image
  logoContainer: {
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  outerGradient: {
    padding: 3,
    borderRadius: 50,
  },
  innerGradient: {
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 350,
  },
  logoImage: {
    width: 500,
    height: 250,
    alignSelf: "center",
  },
  title: {
    fontSize: 44,
    fontFamily: Platform.select({
      android: "MartelSans_800ExtraBold",
      ios: "MartelSans-ExtraBold",
    }),
    textTransform: "uppercase",
    color: "#163048",
    textAlign: "center",
    lineHeight: 46,
  },
  image: {
    flex: 1,
    justifyContent: "space-between",
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject, // fill entire ImageBackground
    backgroundColor: "rgba(255, 255, 255, 0.64)",
  },

  buttonText: {
    color: "#EE9034",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  //social icons style
  socialIconsContainer: {
    transform: [{ rotate: "180deg" }],
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 20,
    backgroundColor: "#1C213B",
  },

  socialLink: {
    height: 32,
    width: 32,
  },

  socialIcon: {
    flex: 1,
  },

  bottomBanner: {
    height: 145,
    transform: [{ rotate: "180deg" }],
  },
});
