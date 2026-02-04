import { LinearGradient } from "expo-linear-gradient";
import { type Href, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonIcon from "@/src/components/nav-bar-section/ButtonIcon";
import MenuItem from "@/src/components/nav-bar-section/MenuItem";
import { leftMenu, rightMenu } from "@/src/constants/bottom-navigation-bar";
import { routes } from "../../constants/routes";

export default function NavigationBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const [leftMenuVisible, setLeftMenuVisible] = useState(false);
  const [rightMenuVisible, setRightMenuVisible] = useState(false);

  const closeBeforeNavigate = () => {
    setLeftMenuVisible(false);
    setRightMenuVisible(false);
  };

  const router = useRouter();

  const navigate = (href: Href) => {
    closeBeforeNavigate();
    if (href.toString().includes(pathname)) {
      router.replace(href);
      return;
    }
    router.navigate(href);
  };

  const toggleMenu = (position: string) => {
    if (position === "left") {
      setLeftMenuVisible((prev) => !prev);
      setRightMenuVisible(false);
    } else {
      setRightMenuVisible((prev) => !prev);
      setLeftMenuVisible(false);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <View
        style={[
          styles.navContainer,
          { height: 50 + insets.bottom, paddingBottom: insets.bottom },
        ]}
      >
        <TouchableOpacity onPress={() => toggleMenu("left")}>
          <View style={styles.navBarButton}>
            <ButtonIcon
              iconName="newspaper"
              iconSize={25}
              iconColor="#898989"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(routes.HOME)}>
          <View style={styles.navBarButton}>
            <ButtonIcon iconName="home" iconSize={25} iconColor="#EE9034" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleMenu("right")}>
          <View style={styles.navBarButton}>
            <ButtonIcon
              iconName="clipboard"
              iconSize={25}
              iconColor="#898989"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Curve Left */}
      {leftMenuVisible && (
        <View style={[styles.borderContainer, { bottom: 50 + insets.bottom }]}>
          <LinearGradient
            colors={["#1d2b5b", "#d5893c", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.leftBorder}
          >
            <View
              style={[
                styles.menuContainer,
                {
                  borderTopRightRadius: 300,
                  paddingLeft: 20,
                },
              ]}
            >
              {leftMenu.map((item) => (
                <MenuItem
                  key={item.route}
                  label={item.label}
                  onPress={() => navigate(item.route)}
                />
              ))}
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Curve Right */}
      {rightMenuVisible && (
        <View style={[styles.borderContainer, { bottom: 50 + insets.bottom }]}>
          <LinearGradient
            colors={["#1d2b5b", "#d5893c", "#ffffff"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.rightBorder}
          >
            <View
              style={[
                styles.menuContainer,
                {
                  borderTopLeftRadius: 300,
                  paddingRight: 20,
                  alignItems: "flex-end",
                },
              ]}
            >
              {rightMenu.map((item) => (
                <MenuItem
                  key={item.route}
                  label={item.label}
                  onPress={() => navigate(item.route)}
                />
              ))}
            </View>
          </LinearGradient>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#ffffffff",
    paddingVertical: 5,
  },
  borderContainer: {
    position: "absolute",
    alignContent: "flex-end",
    width: "100%",
    justifyContent: "space-between",
  },
  menuContainer: {
    backgroundColor: "#ffffff",
    height: 200,
    justifyContent: "center",
    gap: 10,
  },
  leftBorder: {
    height: 217,
    width: 240,
    borderTopRightRadius: 360,
    paddingTop: 16,
    paddingRight: 2,
    paddingBottom: 6,
  },
  rightBorder: {
    height: 217,
    width: 240,
    borderTopLeftRadius: 360,
    paddingTop: 16,
    paddingLeft: 2,
    paddingBottom: 6,
    alignSelf: "flex-end",
  },
  navBarButton: {
    backgroundColor: "#f8f8f8",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    borderRadius: 10,
  },
});
