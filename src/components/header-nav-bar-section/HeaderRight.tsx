import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import HeaderMenu, { type HeaderMenuProps } from "./HeaderMenu";

interface HeaderRightProps {
	menuProps: HeaderMenuProps;
}

export default function HeaderRight({ menuProps }: HeaderRightProps) {
	return (
		<View style={styles.iconsContainer}>
			<Pressable>
				<Ionicons name="notifications" size={30} color={menuProps.iconColor} />
			</Pressable>
			<HeaderMenu {...menuProps} />
		</View>
	);
}

const styles = StyleSheet.create({
	iconsContainer: {
		flexDirection: "row",
		gap: 14,
	},
});
