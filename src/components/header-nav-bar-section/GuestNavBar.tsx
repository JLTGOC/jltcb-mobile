import { routes } from "@/src/constants/routes";
import { useNavigate } from "@/src/hooks/useNavigate";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Header() {
  const { navigate } = useNavigate();

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../../../src/assets/white_logos/fullLogo.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigate(routes.SIGN_IN)}
        >
          <Image
            source={require("../../../src/assets/images/profile.png")}
            style={styles.profileImage}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
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
