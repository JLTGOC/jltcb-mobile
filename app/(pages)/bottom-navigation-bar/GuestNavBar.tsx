import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "../../../src/hooks/useNavigate";
import { routes } from "../../../src/constants/routes";
import MenuItem from "@/src/components/nav-bar-section/MenuItem";
import { left_menu, right_menu } from "@/src/constants/menu_item";

export default function NavigationBar() {
  const insets = useSafeAreaInsets();

  const [leftMenuVisible, setLeftMenuVisible] = useState(false);
  const [rightMenuVisible, setRightMenuVisible] = useState(false);

  const closeBeforeNavigate = () => {
    setLeftMenuVisible(false);
    setRightMenuVisible(false);
  };

  const { navigate } = useNavigate({
    beforeNavigate: closeBeforeNavigate,
  });

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
          { height: 40 + insets.bottom, paddingBottom: insets.bottom },
        ]}
      >
        <TouchableOpacity onPress={() => toggleMenu("left")}>
          <Ionicons name="newspaper" size={25} color="#898989" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(routes.HOME)}>
          <Ionicons name="home" size={25} color="#EE9034" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleMenu("right")}>
          <Ionicons name="clipboard" size={25} color="#898989" />
        </TouchableOpacity>
      </View>

      {/* Curve Left */}
      {leftMenuVisible && (
        <View style={styles.borderContainer}>
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
              {left_menu.map((item) => (
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
        <View style={styles.borderContainer}>
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
              {right_menu.map((item) => (
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
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    backgroundColor: "#ffffffff",
  },
  borderContainer: {
    position: "absolute",
    alignContent: "flex-end",
    bottom: 70,
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
});
