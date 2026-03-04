import HeadlessTabButton from "@/src/components/tabs-ui/HeadlessTabButton";
import TabsBackground from "@/src/components/tabs-ui/TabsBackground";
import { NavLink } from "@/src/constants/user-navigation";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSegments } from "expo-router";
import { TabTrigger } from "expo-router/ui";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useSafeAreaInsets,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

const leftMenuLinks: NavLink[] = [
  { name: "about-us", title: "About Us" },
  { name: "contact-us", title: "Contact Us" },
  { name: "services", title: "Services" },
  { name: "ports-catered", title: "Ports Catered" },
] as const;

const rightMenuLinks: NavLink[] = [
  { name: "get-quote", title: "Get Quote" },
  { name: "get-appointment", title: "Get Appointment" },
  { name: "ahtn-checker", title: "AHTN Checker" },
  // { name: "calculator", title: "Calculator" },
] as const;

export default function GuestTabs({ style, ...props }: SafeAreaViewProps) {
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [tabButtonHeight, setTabButtonHeight] = useState(0);
  const insets = useSafeAreaInsets();
  const menuBottomStyle = { bottom: tabButtonHeight + insets.bottom };

  const segments = useSegments();

  const isSideActive = (links: NavLink[]) => {
    return links.some((link) => (segments as string[]).includes(link.name));
  };

  const leftActive = isSideActive(leftMenuLinks);
  const rightActive = isSideActive(rightMenuLinks);

  const closeMenus = () => {
    setIsLeftVisible(false);
    setIsRightVisible(false);
  };

  const openSideMenu = (side: "left" | "right") => {
    const menuActions = {
      left: () => {
        setIsLeftVisible((i) => !i);
        setIsRightVisible(false);
      },
      right: () => {
        setIsRightVisible((i) => !i);
        setIsLeftVisible(false);
      },
    };
    menuActions[side]();
  };
  return (
    <TabsBackground style={[styles.tabsBackground, style]} {...props}>
      <HeadlessTabButton
        onPress={() => openSideMenu("left")}
        isFocused={leftActive}
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout;
          setTabButtonHeight(height);
        }}
        tabBarIcon={(props) => (
          <MaterialCommunityIcons
            style={styles.tabButton}
            name="file-search-outline"
            {...props}
          />
        )}
      />

      <TabTrigger name="home" asChild>
        <HeadlessTabButton
          onPress={closeMenus}
          tabBarIcon={(props) => (
            <FontAwesome5 style={styles.tabButton} name="home" {...props} />
          )}
        />
      </TabTrigger>

      <HeadlessTabButton
        onPress={() => openSideMenu("right")}
        isFocused={rightActive}
        tabBarIcon={(props) => (
          <FontAwesome5
            style={styles.tabButton}
            name="clipboard-check"
            {...props}
          />
        )}
      />

      {isLeftVisible && (
        <LinearGradient
          colors={["#1d2b5b", "#d5893c", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.menu, styles.leftMenu, menuBottomStyle]}
        >
          <View style={[styles.menuContent, styles.leftMenuContent]}>
            {leftMenuLinks.map((link) => (
              <TabTrigger key={link.name} name={link.name} asChild>
                <HeadlessTabButton
                  onPress={closeMenus}
                  style={styles.leftTabLink}
                  label={link.title}
                  labelStyle={styles.tabLink}
                />
              </TabTrigger>
            ))}
          </View>
        </LinearGradient>
      )}

      {isRightVisible && (
        <LinearGradient
          colors={["#1d2b5b", "#d5893c", "#ffffff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.menu, styles.rightMenu, menuBottomStyle]}
        >
          <View style={[styles.menuContent, styles.rightMenuContent]}>
            {rightMenuLinks.map((link) => (
              <TabTrigger key={link.name} name={link.name} asChild>
                <HeadlessTabButton
                  onPress={closeMenus}
                  style={styles.rightTabLink}
                  label={link.title}
                  labelStyle={styles.tabLink}
                />
              </TabTrigger>
            ))}
          </View>
        </LinearGradient>
      )}
    </TabsBackground>
  );
}

const styles = StyleSheet.create({
  tabsBackground: {
  },
  tabButton: {
    marginHorizontal: "auto",
    marginBottom: 4,
  },
  menu: {
    position: "absolute",
    width: "48%",
    minHeight: 217,
    paddingTop: 17,
  },
  leftMenu: {
    left: 0,
    borderTopRightRadius: 360,
  },
  rightMenu: {
    right: 0,
    borderTopLeftRadius: 360,
  },
  menuContent: {
    marginTop: "auto",
    backgroundColor: "white",
    minHeight: 200,
    paddingVertical: 20,
    justifyContent: "center",
  },
  leftMenuContent: {
    borderTopRightRadius: 300,
  },
  rightMenuContent: {
    borderTopLeftRadius: 300,
    alignItems: "flex-end",
  },
  tabLink: {
    textTransform: "uppercase",
  },
  leftTabLink: {
    paddingTop: 8,
    paddingBottom: 8,
    flex: 0
  },
  rightTabLink: {
    paddingTop: 8,
    paddingBottom: 8,
    flex: 0,
    justifyContent: "flex-end",
  },
});
