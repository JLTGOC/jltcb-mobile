import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import {
	type Animated,
	type StyleProp,
	StyleSheet,
	type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderBackground from "@/src/components/header-nav-bar-section/HeaderBackground";
import HeaderRight from "@/src/components/header-nav-bar-section/HeaderRight";
import { THEMES } from "@/src/constants/themes";
import { AS_HEADER_MENUS } from "@/src/constants/user-navigation";

export default function ASTabsLayout() {
	const insets = useSafeAreaInsets();

	const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
		height: 64 + insets.bottom,
	};

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: THEMES.tabBarActiveTintColor,
				tabBarInactiveTintColor: THEMES.tabBarInactiveTintColor,
				tabBarShowLabel: false,
				tabBarStyle,
				tabBarIconStyle: styles.tabBarIcon,
				headerTitle: "",
				headerLeft: () => (
					<Image
						source={require("@/src/assets/black_logos/full_logo.png")}
						style={styles.logo}
						contentFit="contain"
					/>
				),
				headerRightContainerStyle: styles.headerRight,
				headerRight: () => (
					<HeaderRight
						menuProps={{
							menus: AS_HEADER_MENUS,
							menuStyle: styles.menu,
							linkStyle: styles.link,
						}}
					/>
				),
				headerBackground: () => (
					<HeaderBackground
						colors={[THEMES.lightTextColor, THEMES.lightAccentColor]}
						containerStyle={styles.headerBackgroundContainer}
					/>
				),
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					tabBarItemStyle: { marginRight: "auto", maxWidth: "25%" },
					tabBarIcon: (props) => (
						<MaterialCommunityIcons name="view-dashboard-outline" {...props} />
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					tabBarItemStyle: { marginLeft: "auto", maxWidth: "25%" },
					tabBarIcon: (props) => (
						<MaterialCommunityIcons name="forum-outline" {...props} />
					),
				}}
			/>
			<Tabs.Screen name="account-settings" options={{ href: null }} />
			<Tabs.Screen name="ahtn-checker" options={{ href: null }} />
		</Tabs>
	);
}

const styles = StyleSheet.create({
	headerRight: {
		paddingRight: 20,
	},
	logo: {
		width: 200,
		height: 50,
	},
	headerBackgroundContainer: {
		backgroundColor: THEMES.lightAccentColor,
	},
	menu: {
		backgroundColor: THEMES.lightAccentColor,
	},
	link: {
		color: THEMES.lightTextColor,
	},
	tabBarIcon: {
		marginTop: 10,
	},
});
