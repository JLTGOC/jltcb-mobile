import {
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
  type TextProps,
  View,
  type ViewProps,
} from "react-native";

function BottomNavigationRoot({ style, ...props }: ViewProps) {
  return <View style={[styles.container, style]} {...props} />;
}

function BottomNavigationAction({ style, ...props }: PressableProps) {
  return (
    <Pressable
      style={(state) => [
        styles.action,
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    />
  );
}

function BottomNavigationActionText({ style, ...props }: TextProps) {
  return <Text style={[styles.actionText, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 1,
    backgroundColor: "white",
  },
  action: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E6174",
    paddingVertical: 10,
    gap: 8,
  },
  actionText: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: 500,
  },
});

export const BottomNavigation = {
  Root: BottomNavigationRoot,
  Action: BottomNavigationAction,
  ActionText: BottomNavigationActionText,
};
