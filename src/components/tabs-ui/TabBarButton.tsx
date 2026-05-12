import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { usePathname } from "expo-router";
import {
	Pressable,
	type StyleProp,
	StyleSheet,
	type ViewStyle,
} from "react-native";

interface Props extends Omit<BottomTabBarButtonProps, "ref"> {
	activeStyle?: StyleProp<ViewStyle>;
}

export default function TabBarButton({ style, activeStyle, ...props }: Props) {
	const pathname = usePathname();
	const isActive = pathname.includes(props.href ?? "");

	return (
		<Pressable
			{...props}
			style={[styles.button, style, isActive && activeStyle]}
		/>
	);
}

const styles = StyleSheet.create({
	button: {
		borderBottomWidth: 4,
		borderBottomColor: "transparent",
	},
});
