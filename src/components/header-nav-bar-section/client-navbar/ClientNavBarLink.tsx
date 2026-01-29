import {
	Pressable,
	type PressableProps,
	type StyleProp,
	StyleSheet,
	type ViewStyle,
} from "react-native";

type ClientHeaderMenuLinkProps = {
	style: StyleProp<ViewStyle>;
};

export default function ClientHeaderMenuLink({
	style,
	...props
}: ClientHeaderMenuLinkProps & PressableProps) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.menuLink,
				{ opacity: pressed ? 0.5 : 1 },
				style,
			]}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	menuLink: {
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
