import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
	type OpaqueColorValue,
	Pressable,
	type StyleProp,
	StyleSheet,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { Portal, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { HeaderMenu as THeaderMenu } from "@/src/constants/user-navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { useNavigate } from "@/src/hooks/useNavigate";
import ClientHeaderMenuLink from "./client-navbar/ClientNavBarLink";

const TAB_HEADER_HEIGHT = 64;

export interface HeaderMenuProps {
	menus: THeaderMenu[];
	iconColor?: string | OpaqueColorValue;
	menuStyle?: StyleProp<ViewStyle>;
	linkStyle?: StyleProp<TextStyle>;
}

export default function HeaderMenu({
	menus,
	iconColor,
	menuStyle,
	linkStyle,
}: HeaderMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const insets = useSafeAreaInsets();
	const { logoutContext } = useAuth();
	const { navigate } = useNavigate();

	const { mutate, isPending } = useMutation({
		mutationFn: logoutContext,
	});

	return (
		<>
			<Pressable onPress={() => setIsOpen((prev) => !prev)}>
				<Ionicons name="menu" size={28} color={iconColor} />
			</Pressable>

			<Portal>
				{isOpen && (
					<>
						{/* Backdrop */}
						<Pressable
							style={styles.backdrop}
							onPress={() => setIsOpen(false)}
						/>

						{/* Menu */}
						<View
							style={[
								styles.menu,
								menuStyle,
								{ top: insets.top + TAB_HEADER_HEIGHT },
							]}
						>
							{menus.map((menu) => (
								<ClientHeaderMenuLink
									key={menu.text}
									onPress={() => {
										navigate(menu.link);
										setIsOpen(false);
									}}
									style={[
										styles.linkBorder,
										{
											borderTopWidth:
												menu.text.toLowerCase() === "account settings" ? 1 : 0,
										},
									]}
								>
									<Text style={[styles.menuText, linkStyle]}>{menu.text}</Text>
								</ClientHeaderMenuLink>
							))}

							<ClientHeaderMenuLink
								onPress={() => mutate()}
								disabled={isPending}
							>
								<Text style={[styles.menuText, linkStyle]}>
									{isPending ? "Logging out..." : "Logout"}
								</Text>
							</ClientHeaderMenuLink>
						</View>
					</>
				)}
			</Portal>
		</>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	menu: {
		position: "absolute",
		left: 0,
		right: 0,
		elevation: 20,
	},
	border: {
		height: 4,
		width: "100%",
	},
	menuText: {
		textTransform: "uppercase",
		fontSize: 14,
	},
	linkBorder: {
		borderTopColor: "#464646",
	},
});
