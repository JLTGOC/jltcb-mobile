import { BANNERS } from "@/src/constants/banners";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { PropsWithChildren } from "react";
import {
  StyleSheet,
  type TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, type TextProps } from "react-native-paper";

const TEXT_COLOR_DARK = "#1C213B";
const TEXT_COLOR_LIGHT = "#FF9933";

interface BannerHeaderProps {
  back?: boolean;
  title: string;
  variant: "light" | "dark";
  titleProps?: Omit<TextProps<never>, "children">;
}

export default function BannerHeader({
  back = true,
  title,
  variant,
  titleProps,
  children,
}: BannerHeaderProps & PropsWithChildren) {
  const router = useRouter();

  const textColorStyle: TextStyle = {
    color: variant === "dark" ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  };

  return (
    <ImageBackground
      source={BANNERS[variant]}
      contentPosition="bottom"
      style={[styles.container]}
    >
      <View style={styles.content}>
        {back && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} style={textColorStyle} />
          </TouchableOpacity>
        )}
        {children}
        <Text
          variant="titleLarge"
          style={[styles.title, textColorStyle]}
          {...titleProps}
        >
          {title}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: 120,
  },
  content: {
    flexDirection: "row",
    padding: 5,
    gap: 10,
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
