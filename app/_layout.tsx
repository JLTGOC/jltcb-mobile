import { Stack, usePathname } from "expo-router";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import GuestNavBar from "./GuestNavBar";
import Header from "./Header";

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
    <>
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: "#b1b1b3ff",
        }}
      >
        {!hideHeader && <Header />}
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        />
        {!hideNavigationBar && <GuestNavBar />}
      </SafeAreaView>
    </>
  );
}
