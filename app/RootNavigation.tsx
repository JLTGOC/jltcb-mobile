import { Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { routes } from "@/src/constants/routes";
import { useAuth } from "@/src/hooks/useAuth";
import { useNavigate } from "@/src/hooks/useNavigate";

import { Pusher } from "@pusher/pusher-websocket-react-native";
import BottomNavBar from "../src/components/bottom-nav-bar-section/index";
import HeaderNavBar from "../src/components/header-nav-bar-section/index";

const hidePaths = {
  header: ["/landing-page", "/landing-page/customs-brokerage"],
  navigationBar: ["/landing-page", "/landing-page/customs-brokerage"],
};

const pusher = Pusher.getInstance();

export default function RootNaviagtion() {
  const { replace } = useNavigate();
  const { token, role, userData, isLoading } = useAuth();
  console.log(token);

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

  useEffect(() => {
    const connect = async () => {
      if (pusher.connectionState === "CONNECTED") {
        console.log("Pusher already connected");
        return;
      }

      try {
        await pusher.init({
          apiKey: process.env.EXPO_PUBLIC_PUSHER_API_KEY!,
          cluster: process.env.EXPO_PUBLIC_PUSHER_API_CLUSTER!,
          onConnectionStateChange: (
            currentState: string,
            previousState: string,
          ) => {
            console.log(
              `onConnectionStateChange. previousState=${previousState} newState=${currentState}`,
            );
          },
        });

        await pusher.connect();
      } catch (e) {
        console.error(e);
      }
    };

    connect();

    return () => {
      if (pusher.connectionState === "CONNECTED") {
        pusher.disconnect();
      }
    };
  }, []);

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
