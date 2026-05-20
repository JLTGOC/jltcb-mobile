import type { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

export default function ArrowLine({
  style,
  ...props
}: ComponentProps<typeof View>) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.line} />
      <View style={styles.dot} />
      <View style={styles.arrowHead} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  line: {
    height: 1.5,
    backgroundColor: "#898989",
    borderRadius: 2,
  },
  dot: {
    position: "absolute",
    left: 0,
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#898989",
  },
  arrowHead: {
    position: "absolute",
    right: 0,
    width: 6,
    height: 6,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: "#898989",
    transform: [{ rotate: "45deg" }],
  },
});
