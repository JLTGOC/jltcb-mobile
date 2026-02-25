import StartupScreen from "@/src/components/screens/StartupScreen";
import { useAuth } from "@/src/hooks/useAuth";
import { queryClient } from "@/src/lib/queryClient";
import * as Sentry from '@sentry/react-native';
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { AuthProvider } from "./../src/contexts/AuthContext";

Sentry.init({
  dsn: 'https://bc2fc61b24521ebf8a01926f58abd702@o4510918216384512.ingest.de.sentry.io/4510918232571984',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    onSurface: "#000000",
  },
};

export default Sentry.wrap(function RootLayout() {
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
})

function RootNavigator() {
  const { userData, role } = useAuth();

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
      </Stack.Protected>
    </Stack>
  );
}
