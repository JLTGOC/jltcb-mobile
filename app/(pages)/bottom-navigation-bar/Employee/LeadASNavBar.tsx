import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigate } from "@/src/hooks/useNavigate";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export default function LeadASNavBar() {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { navigate } = useNavigate();

  return (
    <View style={[
          styles.navContainer,
          { height: 40 + insets.bottom, paddingBottom: insets.bottom },
        ]}>
      {NavIcons.map((icon, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => (setActiveIndex(index), navigate(icon.route as any))}
          >
            <MaterialCommunityIcons
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
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#ffffffff",
  },
});
