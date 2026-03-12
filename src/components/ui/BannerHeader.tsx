import { BANNERS } from "@/src/constants/banners";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View, type TextStyle } from "react-native";
import { Text, type TextProps } from "react-native-paper";

const TEXT_COLOR_DARK = "#1C213B";
const TEXT_COLOR_LIGHT = "#FF9933";

interface BannerHeaderProps {
  back?: boolean;
  onBack?: () => void;
  title: string;
  variant: "light" | "dark";
  titleProps?: Omit<TextProps<never>, "children">;
}

export default function BannerHeader({
  back = true,
  onBack,
  title,
  variant,
  titleProps,
  children,
}: BannerHeaderProps & PropsWithChildren) {
  const router = useRouter();

  const textColorStyle: TextStyle = {
    color: variant === "dark" ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <ImageBackground
      source={BANNERS[variant]}
      contentPosition="bottom"
      style={[styles.container]}
    >
      <View style={styles.content}>
        {back && (
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={24} style={textColorStyle} />
          </Pressable>
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
