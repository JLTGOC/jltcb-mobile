import { Stack, usePathname } from "expo-router";
import "react-native-reanimated";
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

  const user = "Client";
  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: "#b1b1b3ff",
        }}
      >
        {!hideHeader && <HeaderNavBar user={user}/>}
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        />
        {!hideNavigationBar && <BottomNavBar user={user} />}
      </SafeAreaView>
    </>
  );
}
