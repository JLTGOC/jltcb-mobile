import { QueryClientProvider } from "@tanstack/react-query";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { queryClient } from "@/src/lib/queryClient";
import { AuthProvider } from "./../src/contexts/AuthContext";
import SplashScreen from "./index";
import RootNavigation from "./RootNavigation";
import * as Sentry from '@sentry/react-native';

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
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<AutocompleteDropdownContextProvider>
					<PaperProvider theme={theme}>
						<RootNavigation />
						<SplashScreen />
					</PaperProvider>
				</AutocompleteDropdownContextProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
});