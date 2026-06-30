import { Image, ImageBackground } from "expo-image";
<<<<<<< HEAD
import { Dimensions, StyleSheet, View, type TextStyle } from "react-native";
=======
import { Dimensions, StyleSheet, type TextStyle, View } from "react-native";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
import { Text } from "react-native-paper";

import { useAuth } from "@/hooks/useAuth";

const BANNERS = {
  dark: require("@/assets/banners/small.png"),
  light: require("@/assets/banners/light.png"),
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
        {/* <Link href="/account-settings" asChild> */}
        {/* <Pressable style={({ pressed }) => [
    {
<<<<<<< HEAD
      opacity: pressed ? 0.7 : 1, 
=======
      opacity: pressed ? 0.7 : 1,
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
    }
  ]}> */}
        <Image
          source={{ uri: encodeURI(userData?.image_path ?? "") }}
          style={styles.userImage}
        />
        {/* </Pressable> */}
        {/* </Link> */}
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
