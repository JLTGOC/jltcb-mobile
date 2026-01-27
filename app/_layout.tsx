import "react-native-reanimated";

import { Stack, usePathname } from "expo-router";
import { AuthProvider } from "./../src/contexts/AuthContext";


import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "./(pages)/bottom-navigation-bar/index";
import HeaderNavBar from "./(pages)/header-navigation-bar/index";


const hidePaths = {
  header: ["/landing-page", "/landing-page/customs-brokerage"],
  navigationBar: ["/landing-page", "/landing-page/customs-brokerage"],
};

export default function RootLayout() {
  const pathname = usePathname();

  const hideHeader = pathname === "/" || hidePaths.header.includes(pathname);
  const hideNavigationBar =
    pathname === "/" || hidePaths.navigationBar.includes(pathname);

  return (
    <AuthProvider>
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: "#b1b1b3ff",
        }}
      >
        {!hideHeader && <HeaderNavBar/>}
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        />
        {!hideNavigationBar && <BottomNavBar/>}
      </SafeAreaView>
    </AuthProvider>
  );
}
