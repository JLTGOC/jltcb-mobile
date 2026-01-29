import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Stack, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../src/components/bottom-nav-bar-section/index";
import HeaderNavBar from "../src/components/header-nav-bar-section/index";
import { AuthProvider } from "./../src/contexts/AuthContext";

const hidePaths = {
	header: ["/landing-page", "/landing-page/customs-brokerage"],
	navigationBar: ["/landing-page", "/landing-page/customs-brokerage"],
};

const queryClient = new QueryClient();

export default function RootLayout() {
	const pathname = usePathname();

	const hideHeader = pathname === "/" || hidePaths.header.includes(pathname);
	const hideNavigationBar =
		pathname === "/" || hidePaths.navigationBar.includes(pathname);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
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
			</AuthProvider>
		</QueryClientProvider>
	);
}
