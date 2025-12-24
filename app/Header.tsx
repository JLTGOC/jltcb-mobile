import { Image, View, TouchableOpacity } from "react-native";
import styles from "./header-styles";
import { LinearGradient } from "expo-linear-gradient";

export default function Header() {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/white_logos/fullLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profileImage}
            resizeMode="contain"
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
