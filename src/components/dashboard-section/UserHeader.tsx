import { useAuth } from "@/src/hooks/useAuth";
import { Image, ImageBackground } from "expo-image";
import { Link } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  type TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

const BANNERS = {
  dark: require("../../../src/assets/banners/small.png"),
  light: require("../../../src/assets/banners/light-small.svg"),
} as const;

type UserHeaderProps = {
  variant?: "light" | "dark";
};

export default function UserHeader({ variant = "dark" }: UserHeaderProps) {
  const { userData } = useAuth();

  const textStyles: TextStyle = {
    color: variant === "dark" ? "white" : "#1D274E",
    textTransform: "uppercase",
  };

  const { width } = Dimensions.get("window");
  return (
    <ImageBackground
      source={BANNERS[variant]}
      contentFit="cover"
      contentPosition="bottom"
      style={[styles.container, { width }]}
    >
      <View style={styles.content}>
        <Link href="/account-settings" asChild>
          <TouchableOpacity>
            <Image
              source={{ uri: encodeURI(userData?.image_path ?? "") }}
              style={styles.userImage}
            />
          </TouchableOpacity>
        </Link>
        <View style={styles.textContainer}>
          <Text
            style={[textStyles, { fontWeight: 700 }]}
            variant="titleLarge"
            numberOfLines={1}
          >
            {userData ? userData.full_name : "Loading..."}
          </Text>
          <Text style={[textStyles, { fontStyle: "italic" }]}>
            {userData?.company_name}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  content: {
    flexDirection: "row",
    padding: 5,
    paddingLeft: 24,
    gap: 20,
  },
  userImage: {
    borderRadius: 50,
    width: 90,
    height: 90,
  },
  textContainer: {
    paddingTop: 4,
    flex: 1,
    gap: 4,
  },
});
