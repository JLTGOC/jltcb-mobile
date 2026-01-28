import ClientNavBarLink from "@/src/components/header-nav-bar-section/client-navbar/ClientNavBarLink";
import { routes } from "@/src/constants/routes";
import { useAuth } from "@/src/hooks/useAuth";
import { useNavigate } from "@/src/hooks/useNavigate";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const MENU = [
  {
    text: "Calculator",
    link: routes.CLIENT_DB,
  },
  {
    text: "AHTN Checker",
    link: routes.AHTN,
  },
  {
    text: "Account Settings",
    link: routes.CLIENT_DB,
  },
];

export default function ClientNavBar() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const { logoutContext } = useAuth();
  const { navigate } = useNavigate();

  const handleLogout = () => {
    logoutContext();
  };

  return (
    <View style={{ position: "relative", zIndex: 100 }}>
      <View style={styles.container}>
        <Image
          source={require("../../../src/assets/white_logos/fullLogo.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <View style={styles.icons}>
          <TouchableOpacity>
            <Ionicons name="notifications" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsMenuToggled((prev) => !prev)}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient
        colors={["#EE9034", "#161F3C"]}
        style={styles.borderBottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      {isMenuToggled && (
        <View style={styles.menu}>
          {MENU.map((menu) => (
            <ClientNavBarLink
              key={menu.text}
              onPress={() => {
                navigate(menu.link);
                setIsMenuToggled(false);
              }}
              style={{
                borderTopColor: "#464646",
                borderTopWidth:
                  menu.text.toLowerCase() === "account settings" ? 1 : 0,
              }}
            >
              <Text style={styles.menuText}>{menu.text}</Text>
            </ClientNavBarLink>
          ))}
          <ClientNavBarLink
            style={styles.menuLink}
            onPress={() => {
              handleLogout();
              setIsMenuToggled(false);
            }}
          >
            <Text style={styles.menuText}>Logout</Text>
          </ClientNavBarLink>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#161F3C",
  },
  logo: {
    width: 200,
    height: 50,
  },
  icons: {
    flexDirection: "row",
    gap: 12,
  },
  borderBottom: {
    height: 4,
    width: "100%",
  },
  menu: {
    backgroundColor: "#161F3C",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 10,
  },
  menuText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 14,
  },
  menuLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
  },
});
