import { LinearGradient, type LinearGradientProps } from "expo-linear-gradient";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

interface HeaderBackgroundProps extends LinearGradientProps {
	containerStyle?: StyleProp<ViewStyle>;
}

export default function HeaderBackground({
	containerStyle,
	style,
	...props
}: HeaderBackgroundProps) {
	return (
		<View style={[styles.headerBackgroundContainer, containerStyle]}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={[styles.linearGradient, style]}
				{...props}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	headerBackgroundContainer: {
		flex: 1,
	},
	linearGradient: {
		position: "absolute",
		bottom: 0,
		height: 4,
		width: "100%",
	},
});
