import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

export default function TabsBackground({ style, ...props }: SafeAreaViewProps) {
  return (
    <SafeAreaView
      style={[styles.tabList, style]}
      edges={["bottom", "left", "right"]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  tabList: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white", // Shadow won't show on 'transparent'

    // iOS Shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "visible", // ??

    // Android Shadow
    elevation: 15,
  },
});
