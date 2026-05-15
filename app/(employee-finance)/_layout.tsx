import { Stack } from "expo-router";

import Index from "@/components/header-nav-bar-section";

export default function FinanceLayout() {
	return (
		<>
			<Index />
			<Stack screenOptions={{ headerShown: false }} />
		</>
	);
}
