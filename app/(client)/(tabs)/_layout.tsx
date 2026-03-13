import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs, useRouter } from "expo-router";
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
import { CLIENT_HEADER_MENUS } from "@/src/constants/user-navigation";

export default function ClientTabsLayout() {
	const router = useRouter();
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
						source={require("@/src/assets/white_logos/fullLogo.png")}
						style={styles.logo}
						contentFit="contain"
					/>
				),
				headerRightContainerStyle: styles.headerRight,
				headerRight: () => (
					<HeaderRight
						menuProps={{
							menus: CLIENT_HEADER_MENUS,
							iconColor: "white",
							menuStyle: styles.menu,
							linkStyle: styles.link,
						}}
					/>
				),
				headerBackground: () => (
					<HeaderBackground
						containerStyle={styles.headerBackgroundContainer}
						colors={["#FF9034", THEMES.darkAccentColor]}
					/>
				),
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					tabBarIcon: (props) => (
						<MaterialCommunityIcons name="view-dashboard-outline" {...props} />
					),
				}}
			/>
			<Tabs.Screen
				name="home"
				options={{
					tabBarIcon: (props) => <MaterialIcons name="list-alt" {...props} />,
				}}
			/>
			<Tabs.Screen
				name="get-quote"
				options={{
					tabBarIcon: (props) => (
						<MaterialCommunityIcons name="book-plus-outline" {...props} />
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				listeners={{
					tabPress: () => {
						router.dismissTo("/(client)/(tabs)/messages");
					},
				}}
				options={{
					tabBarIcon: (props) => (
						<MaterialCommunityIcons name="forum-outline" {...props} />
					),
				}}
			/>
			<Tabs.Screen name="ahtn-checker" options={{ href: null }} />
			<Tabs.Screen name="account-settings" options={{ href: null }} />
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
		backgroundColor: THEMES.darkAccentColor,
	},
	menu: {
		backgroundColor: THEMES.darkAccentColor,
	},
	link: {
		color: "white",
	},
	tabBarIcon: {
		marginTop: 10,
	},
});
