import { focusManager, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { type AppStateStatus, Platform } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

import StartupScreen from "@/components/screens/StartupScreen";

import { AuthProvider } from "@/contexts/AuthContext";
import { useAppState } from "@/hooks/useAppState";
import { useAuth } from "@/hooks/useAuth";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import { initPusher } from "@/lib/pusher";
import { queryClient } from "@/lib/queryClient";

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
          <GestureHandlerRootView>
            <KeyboardProvider>
              <PaperProvider theme={theme}>
                <RootNavigator />
                {!animationDone && (
                  <StartupScreen onFinish={() => setAnimationDone(true)} />
                )}
              </PaperProvider>
            </KeyboardProvider>
          </GestureHandlerRootView>
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
        <Stack.Protected
          guard={
            role === "Account Specialist" || role === "Lead Account Specialist"
          }
        >
          <Stack.Screen name="(employee-account-specialist)" />
        </Stack.Protected>
        <Stack.Protected
          guard={role === "Operations" || role === "Client Success"}
        >
          <Stack.Screen name="(employee-operations)" />
        </Stack.Protected>
        <Stack.Protected guard={role === "Finance"}>
          <Stack.Screen name="(employee-finance)" />
        </Stack.Protected>
        <Stack.Protected guard={role === "Marketing"}>
          <Stack.Screen name="(employee-marketing)" />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  );
}
