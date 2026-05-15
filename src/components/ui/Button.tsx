import { StyleSheet } from "react-native";
import { Button as BaseButton, type ButtonProps } from "react-native-paper";

import { THEMES } from "@/constants/themes";

export default function Button({ style, labelStyle, ...props }: ButtonProps) {
	return (
		<BaseButton
			mode="contained"
			style={[styles.button, style]}
			labelStyle={[styles.buttonLabel, labelStyle]}
			theme={{ colors: { onSurfaceDisabled: "#c2c2c2" } }}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: THEMES.darkAccentColor,
		borderRadius: 6,
		boxShadow: "0 4px 4px #BEBEBE",
	},
	buttonLabel: {
		paddingVertical: 4,
		fontSize: 16,
		textTransform: "uppercase",
	},
});
