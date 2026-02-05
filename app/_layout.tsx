import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./../src/contexts/AuthContext";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import RootNavigation from "./RootNavigation";
import SplashScreen from "./index";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AutocompleteDropdownContextProvider>
          <RootNavigation />
          <SplashScreen />
        </AutocompleteDropdownContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
