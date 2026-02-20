import { Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { routes } from "@/src/constants/routes";
import { useAuth } from "@/src/hooks/useAuth";
import { useNavigate } from "@/src/hooks/useNavigate";

import BottomNavBar from "../src/components/bottom-nav-bar-section/index";
import HeaderNavBar from "../src/components/header-nav-bar-section/index";

const hidePaths = {
  header: ["/landing-page", "/landing-page/customs-brokerage"],
  navigationBar: ["/landing-page", "/landing-page/customs-brokerage"],
};
export default function RootNaviagtion() {
  const { replace } = useNavigate();
  const { token, role, isLoading } = useAuth();

  const pathname = usePathname();

  const hideHeader = pathname === "/" || hidePaths.header.includes(pathname);
  const hideNavigationBar =
    pathname === "/" || hidePaths.navigationBar.includes(pathname);

  useEffect(() => {
    if (isLoading) return;

    if (!token) {
      replace(routes.LANDING_PAGE);
      return;
    }

    if (role === "Client") {
      replace(routes.CLIENT_DB);
    } else if (role === "Account Specialist") {
      replace(routes.AS_DB);
    }
  }, [token, role, isLoading]);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: "#b1b1b3ff",
      }}
    >
      {!hideHeader && <HeaderNavBar />}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
      {!hideNavigationBar && <BottomNavBar />}
    </SafeAreaView>
  );
}
