import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { useSegments } from "expo-router";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";

interface Props extends Omit<BottomTabBarButtonProps, "ref"> {
  activeStyle?: StyleProp<ViewStyle>;
}

export default function TabBarButton({ style, activeStyle, ...props }: Props) {
  const segments = useSegments() as string[];
  const isActive = segments.includes(
    props.accessibilityLargeContentTitle ?? "",
  );

  return (
    <Pressable
      {...props}
      style={[styles.button, style, isActive && activeStyle]}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderBottomWidth: 4,
    borderBottomColor: "transparent",
  },
});
