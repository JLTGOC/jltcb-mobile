import { THEMES } from "@/src/constants/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ASTabsLayout() {
  const insets = useSafeAreaInsets();

  const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
    height: 64 + insets.bottom,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEMES.tabBarActiveTintColor,
        tabBarInactiveTintColor: THEMES.tabBarInactiveTintColor,
        tabBarShowLabel: false,
        tabBarStyle,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarItemStyle: { marginRight: "auto", maxWidth: "25%" },
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="view-dashboard-outline" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarItemStyle: { marginLeft: "auto", maxWidth: "25%" },
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="message" {...props} />
          ),
        }}
      />
      <Tabs.Screen name="account-settings" options={{ href: null }} />
      <Tabs.Screen name="ahtn-checker" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginTop: 10,
  },
});
