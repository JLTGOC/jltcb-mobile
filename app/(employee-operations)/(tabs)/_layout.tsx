<<<<<<< HEAD
import { THEMES } from "@/src/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

=======
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import {
  type Animated,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HeaderBackground from "@/components/header-nav-bar-section/HeaderBackground";
import HeaderRight from "@/components/header-nav-bar-section/HeaderRight";
import TabBarButton from "@/components/tabs-ui/TabBarButton";

import { THEMES } from "@/constants/themes";
import { OPS_HEADER_MENUS } from "@/constants/user-navigation";

>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
export default function OperationsTabsLayout() {
  const insets = useSafeAreaInsets();

  const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
    height: 64 + insets.bottom,
  };

  return (
    <Tabs
<<<<<<< HEAD
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEMES.tabBarActiveTintColor,
=======
      screenOptions={{
        tabBarActiveTintColor: THEMES.darkAccentColor,
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
        tabBarInactiveTintColor: THEMES.tabBarInactiveTintColor,
        tabBarShowLabel: false,
        tabBarStyle,
        tabBarIconStyle: styles.tabBarIcon,
<<<<<<< HEAD
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarItemStyle: { marginRight: "auto", maxWidth: "25%" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size ?? 24} />
=======
        headerTitle: "",
        headerLeft: () => (
          <Image
            source={require("@/assets/black_logos/full_logo.png")}
            style={styles.logo}
            contentFit="contain"
          />
        ),
        headerRightContainerStyle: styles.headerRight,
        headerRight: () => (
          <HeaderRight
            menuProps={{
              menus: OPS_HEADER_MENUS,
              menuStyle: styles.menu,
              linkStyle: styles.link,
            }}
          />
        ),
        headerBackground: () => (
          <HeaderBackground
            colors={[THEMES.darkAccentColor, THEMES.lightVariantColor]}
            containerStyle={styles.headerBackgroundContainer}
          />
        ),
        tabBarButton: (props) => (
          <TabBarButton activeStyle={styles.activeTab} {...props} />
        ),
      }}
    >
      <Tabs.Screen
        name="(dashboard)"
        options={{
          tabBarItemStyle: { marginRight: "auto", maxWidth: "25%" },
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="view-dashboard-outline" {...props} />
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
          ),
        }}
      />
      <Tabs.Screen
<<<<<<< HEAD
        name="messages/index"
        options={{
          tabBarItemStyle: { marginLeft: "auto", maxWidth: "25%" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={size ?? 24}
            />
=======
        name="messages"
        options={{
          tabBarItemStyle: {
            marginLeft: "auto",
            maxWidth: "25%",
          },
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="forum-outline" {...props} />
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
          ),
        }}
      />
      <Tabs.Screen name="account-settings" options={{ href: null }} />
      <Tabs.Screen name="ahtn-checker" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  tabBarIcon: {
    marginTop: 10,
  },
=======
  headerRight: {
    paddingRight: 20,
  },
  logo: {
    width: 200,
    height: 50,
  },
  headerBackgroundContainer: {
    backgroundColor: THEMES.lightVariantColor,
  },
  menu: {
    backgroundColor: THEMES.lightVariantColor,
  },
  link: {
    color: THEMES.darkAccentColor,
  },
  tabBarIcon: {
    marginTop: 10,
  },
  activeTab: {
    borderBottomColor: THEMES.darkAccentColor,
  },
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
});
