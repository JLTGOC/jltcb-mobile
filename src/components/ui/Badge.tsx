import { StyleSheet, View, type ViewProps } from "react-native";

export default function Badge({ style, ...props }: ViewProps) {
  return <View style={[styles.badge, style]} {...props} />;
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 15,
  },
});
