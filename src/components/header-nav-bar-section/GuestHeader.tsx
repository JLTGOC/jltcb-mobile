import { routes } from "@/src/constants/routes";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GuestHeader() {
  return (
    <>
      <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
        <Image
          source={require("../../../src/assets/white_logos/fullLogo.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Link href={routes.LOG_IN} asChild style={styles.profileContainer}>
          <TouchableOpacity>
            <Image
              source={require("../../../src/assets/images/profile.png")}
              style={styles.profileImage}
              contentFit="contain"
            />
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
      <LinearGradient
        colors={["#EE9034", "#161F3C"]}
        style={styles.borderBottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingRight: 20,
    alignItems: "center", // centers the logo horizontally
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#161F3C",
  },
  logo: {
    width: 200,
    height: 50,
  },
  profileContainer: {
    width: 30,
    height: 30,
    borderRadius: 20, // makes it a circle
    overflow: "hidden", // ensures image stays circular
    borderWidth: 1,
    borderColor: "#fff",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  borderBottom: {
    height: 4,
    width: "100%",
  },
});
