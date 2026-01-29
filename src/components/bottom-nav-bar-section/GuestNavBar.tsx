import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonIcon from "@/src/components/nav-bar-section/ButtonIcon";
import MenuItem from "@/src/components/nav-bar-section/MenuItem";
import { leftMenu, rightMenu } from "@/src/constants/bottom-navigation-bar";
import { routes } from "../../constants/routes";
import { useNavigate } from "../../hooks/useNavigate";

export default function NavigationBar() {
	const insets = useSafeAreaInsets();

	const [leftMenuVisible, setLeftMenuVisible] = useState(false);
	const [rightMenuVisible, setRightMenuVisible] = useState(false);

	const closeBeforeNavigate = () => {
		setLeftMenuVisible(false);
		setRightMenuVisible(false);
	};

	const { navigate } = useNavigate({
		beforeNavigate: closeBeforeNavigate,
	});

	const toggleMenu = (position: string) => {
		if (position === "left") {
			setLeftMenuVisible((prev) => !prev);
			setRightMenuVisible(false);
		} else {
			setRightMenuVisible((prev) => !prev);
			setLeftMenuVisible(false);
		}
	};

	return (
		<>
			{/* Navigation Bar */}
			<View
				style={[
					styles.navContainer,
					{ height: 40 + insets.bottom, paddingBottom: insets.bottom },
				]}
			>
				<ButtonIcon
					onPress={() => toggleMenu("left")}
					iconName="newspaper"
					iconSize={25}
					iconColor="#898989"
				/>
				<ButtonIcon
					onPress={() => navigate(routes.HOME)}
					iconName="home"
					iconSize={25}
					iconColor="#EE9034"
				/>
				<ButtonIcon
					onPress={() => toggleMenu("right")}
					iconName="clipboard"
					iconSize={25}
					iconColor="#898989"
				/>
			</View>

			{/* Curve Left */}
			{leftMenuVisible && (
				<View style={[styles.borderContainer, { bottom: 40 + insets.bottom }]}>
					<LinearGradient
						colors={["#1d2b5b", "#d5893c", "#ffffff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.leftBorder}
					>
						<View
							style={[
								styles.menuContainer,
								{
									borderTopRightRadius: 300,
									paddingLeft: 20,
								},
							]}
						>
							{leftMenu.map((item) => (
								<MenuItem
									key={item.route}
									label={item.label}
									onPress={() => navigate(item.route)}
								/>
							))}
						</View>
					</LinearGradient>
				</View>
			)}

			{/* Curve Right */}
			{rightMenuVisible && (
				<View style={[styles.borderContainer, { bottom: 40 + insets.bottom }]}>
					<LinearGradient
						colors={["#1d2b5b", "#d5893c", "#ffffff"]}
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 1 }}
						style={styles.rightBorder}
					>
						<View
							style={[
								styles.menuContainer,
								{
									borderTopLeftRadius: 300,
									paddingRight: 20,
									alignItems: "flex-end",
								},
							]}
						>
							{rightMenu.map((item) => (
								<MenuItem
									key={item.route}
									label={item.label}
									onPress={() => navigate(item.route)}
								/>
							))}
						</View>
					</LinearGradient>
				</View>
			)}
		</>
	);
}
const styles = StyleSheet.create({
	navContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-evenly",
		backgroundColor: "#ffffffff",
	},
	borderContainer: {
		position: "absolute",
		alignContent: "flex-end",
		width: "100%",
		justifyContent: "space-between",
	},
	menuContainer: {
		backgroundColor: "#ffffff",
		height: 200,
		justifyContent: "center",
		gap: 10,
	},
	leftBorder: {
		height: 217,
		width: 240,
		borderTopRightRadius: 360,
		paddingTop: 16,
		paddingRight: 2,
		paddingBottom: 6,
	},
	rightBorder: {
		height: 217,
		width: 240,
		borderTopLeftRadius: 360,
		paddingTop: 16,
		paddingLeft: 2,
		paddingBottom: 6,
		alignSelf: "flex-end",
	},
});
