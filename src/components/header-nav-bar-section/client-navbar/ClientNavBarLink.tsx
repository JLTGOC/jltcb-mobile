import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

type ClientNavBarLinkProps = {
  style: StyleProp<ViewStyle>;
};

export default function ClientNavBarLink({
  style,
  ...props
}: ClientNavBarLinkProps & PressableProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuLink,
        { opacity: pressed ? 0.5 : 1 },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  menuLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
