import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import ClientHeaderMenuLink from "@/src/components/header-nav-bar-section/client-navbar/ClientNavBarLink";
import type { HeaderMenu } from "@/src/constants/user-navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { useNavigate } from "@/src/hooks/useNavigate";

type LightHeaderProps = {
	menus: HeaderMenu[];
};

export default function LightHeader({ menus: menuOptions }: LightHeaderProps) {
	const [isMenuToggled, setIsMenuToggled] = useState(false);

	const { logoutContext } = useAuth();
	const { navigate } = useNavigate();

	const { mutate, isPending } = useMutation({
		mutationFn: logoutContext,
		onError: (err) => {
			console.log("Logout Failed", err);
		},
	});

	const handleLogout = () => {
		mutate();
	};

	return (
		<View style={{ position: "relative", zIndex: 100 }}>
			<View style={styles.container}>
				<Image
					source={require("../../../src/assets/black_logos/full_logo.png")}
					style={styles.logo}
					contentFit="contain"
				/>
				<View style={styles.icons}>
					<TouchableOpacity>
						<Ionicons name="notifications" size={30} color="#1C213B" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setIsMenuToggled((prev) => !prev)}>
						<Ionicons name="menu" size={30} color="#1C213B" />
					</TouchableOpacity>
				</View>
			</View>

			<LinearGradient
				colors={["#1C213B", "#D7D7D7"]}
				style={styles.borderBottom}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			/>

			{isMenuToggled && (
				<View style={styles.menu}>
					{menuOptions.map((menu) => (
						<ClientHeaderMenuLink
							key={menu.text}
							onPress={() => {
								navigate(menu.link);
								setIsMenuToggled(false);
							}}
							style={{
								borderTopColor: "#464646",
								borderTopWidth:
									menu.text.toLowerCase() === "account settings" ? 1 : 0,
							}}
						>
							<Text style={styles.menuText}>{menu.text}</Text>
						</ClientHeaderMenuLink>
					))}
					<ClientHeaderMenuLink
						style={styles.menuLink}
						onPress={() => {
							handleLogout();
							// setIsMenuToggled(false);
						}}
						disabled={isPending}
					>
						<Text style={styles.menuText}>
							{isPending ? "Logging out..." : "Logout"}
						</Text>
					</ClientHeaderMenuLink>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		paddingRight: 20,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		backgroundColor: "#D7D7D7",
	},
	logo: {
		width: 200,
		height: 50,
	},
	icons: {
		flexDirection: "row",
		gap: 12,
	},
	borderBottom: {
		height: 4,
		width: "100%",
	},
	menu: {
		backgroundColor: "#D7D7D7",
		position: "absolute",
		top: "100%",
		left: 0,
		right: 0,
		zIndex: 100,
		elevation: 10,
	},
	menuText: {
		color: "#1C213B",
		textTransform: "uppercase",
		fontSize: 14,
	},
	menuLink: {
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 50,
	},
});
