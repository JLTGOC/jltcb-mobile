import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { AS_HEADER_MENUS } from "@/constants/user-navigation";

export default function ASTabsLayout() {
  const insets = useSafeAreaInsets();

  const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
    height: 64 + insets.bottom,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEMES.darkAccentColor,
        tabBarInactiveTintColor: THEMES.tabBarInactiveTintColor,
        tabBarShowLabel: false,
        tabBarStyle,
        tabBarIconStyle: styles.tabBarIcon,
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
              menus: AS_HEADER_MENUS,
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
            <MaterialCommunityIcons name="forum-outline" {...props} />
          ),
        }}
      />
      <Tabs.Screen name="account-settings" options={{ href: null }} />
      <Tabs.Screen name="ahtn-checker" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
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
});
