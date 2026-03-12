import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "@/src/hooks/useNavigate";

const NavIcons = [
  {
    iconName: "view-dashboard",
    route: "(employee-account-specialist)/dashboard",
  },
  {
    iconName: "message",
    route: "(employee-account-specialist)/chatbox",
  },
];

export default function OperationsNavBar() {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { navigate } = useNavigate();

  return (
    <View
      style={[
        styles.navContainer,
        { height: 40 + insets.bottom, paddingBottom: insets.bottom },
      ]}
    >
      {NavIcons.map((icon, index) => (
        <View key={index}>
          <Pressable
            onPress={() => (setActiveIndex(index), navigate(icon.route as any))}
            style={({ pressed }) => [
              styles.tabButton,
              index === activeIndex && styles.activeTabButton,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={icon.iconName as any}
              size={28}
              color={index === activeIndex ? "#EE9034" : "#000000"}
            />
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#ffffffff",
    paddingHorizontal: 20,
  },
  tabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: "#EE9034",
  },
});
