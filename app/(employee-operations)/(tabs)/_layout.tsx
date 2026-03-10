import { THEMES } from "@/src/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OperationsTabsLayout() {
  const insets = useSafeAreaInsets();

  const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
    height: 64 + insets.bottom,
  };

  return (
    <Tabs
      initialRouteName="dashboard/index"
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
        name="dashboard/index"
        options={{
          tabBarItemStyle: { marginRight: "auto", maxWidth: "25%" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages/index"
        options={{
          tabBarItemStyle: { marginLeft: "auto", maxWidth: "25%" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={size ?? 24}
            />
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
