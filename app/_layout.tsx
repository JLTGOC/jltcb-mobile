import StartupScreen from "@/src/components/screens/StartupScreen";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { useAppState } from "@/src/hooks/useAppState";
import { useAuth } from "@/src/hooks/useAuth";
import { useOnlineManager } from "@/src/hooks/useOnlineManager";
import { initPusher } from "@/src/lib/pusher";
import { queryClient } from "@/src/lib/queryClient";
import { QueryClientProvider, focusManager } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

import { Platform, type AppStateStatus } from "react-native";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    onSurface: "#000000",
  },
};

export default function RootLayout() {
  const [animationDone, setAnimationDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AutocompleteDropdownContextProvider>
          <PaperProvider theme={theme}>
            <RootNavigator />
            {!animationDone && (
              <StartupScreen onFinish={() => setAnimationDone(true)} />
            )}
          </PaperProvider>
        </AutocompleteDropdownContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

function RootNavigator() {
  const { userData, role } = useAuth();

  useOnlineManager();

  useAppState(onAppStateChange);

  useEffect(() => {
    initPusher();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!userData}>
        <Stack.Screen name="landing-page" />
        <Stack.Screen name="(guest)" />
      </Stack.Protected>

      <Stack.Protected guard={!!userData}>
        <Stack.Protected guard={role === "Client"}>
          <Stack.Screen name="(client)" />
        </Stack.Protected>

        <Stack.Protected guard={role === "Account Specialist"}>
          <Stack.Screen name="(employee-account-specialist)" />
        </Stack.Protected>

        <Stack.Protected guard={role === "Marketing"}>
          <Stack.Screen name="(employee-marketing)" />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  );
}
