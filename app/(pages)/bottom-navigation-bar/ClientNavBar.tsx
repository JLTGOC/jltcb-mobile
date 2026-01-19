import { Text } from "react-native-paper";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NavIcons = [
  { iconName: "grid-outline", route: "(client)/dashboard" },
  { iconName: "newspaper-outline", route: "../home" },
  { iconName: "ticket-outline", route: "(client)/get-quote-request-form" },
  { iconName: "chatbox-ellipses-outline", route: "(client)/chatbox" },
];

export default function ClientNavBar() {
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
    justifyContent: "space-evenly",
    backgroundColor: "#ffffffff",
    height: 60,
  },
});
