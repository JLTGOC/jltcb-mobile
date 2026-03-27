import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export interface Props extends PropsWithChildren {}

export default function FieldLegend({ children }: Props) {
	return (
		<View style={styles.container}>
			<Text variant="titleSmall" style={styles.text}>
				{children}
			</Text>

			<View style={styles.divider}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 2,
	},
	text: {
		color: "#1C213B",
	},
	divider: {
		height: 1,
		backgroundColor: "#666666",
	},
});
