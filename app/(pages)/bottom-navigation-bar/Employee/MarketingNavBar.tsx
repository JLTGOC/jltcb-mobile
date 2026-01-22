import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const NavIcons = [
  {
    iconName: "grid-outline",
    route: "(employee-marketing)/dashboard",
  },
  {
    iconName: "chatbox-ellipses-outline",
    route: "(employee-marketing)/chatbox",
  },
];

export default function LeadASNavBar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const router = useRouter();

  return (
    <View style={styles.navContainer}>
      {NavIcons.map((icon, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => (
              setActiveIndex(index),
              router.push(icon.route as any)
            )}
          >
            <Ionicons
              name={icon.iconName as any}
              size={28}
              color={index === activeIndex ? "#EE9034" : "#000000"}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffffff",
    height: 60,
    paddingHorizontal: 50,
  },
});
