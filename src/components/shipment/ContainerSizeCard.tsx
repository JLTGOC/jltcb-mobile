import type { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import type { container_sizes } from "@/src/constants/client-const";

type ContainerSize = (typeof container_sizes)[number];

interface Props
	extends Omit<ComponentProps<typeof Card>, "children" | "elevation"> {
	size: ContainerSize;
	cardCoverStyle?: ComponentProps<typeof Card.Cover>["style"];
}

export default function ContainerSizeCard({
	size,
	style,
	cardCoverStyle,
	...props
}: Props) {
	return (
		<Card style={[styles.card, style]} {...props}>
			<Card.Cover
				source={size.image}
				style={[size.style, styles.image, cardCoverStyle]}
			/>
			<Card.Content style={styles.content}>
				<Text style={[styles.text, styles.uppercase]}>{size.size}</Text>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "white",
		borderRadius: 6,
		borderWidth: 0,
	},
	image: {
		alignSelf: "center",
		backgroundColor: "white",
	},
	content: {
		paddingBottom: 4,
	},
	text: {
		textAlign: "center",
	},
	uppercase: {
		textTransform: "uppercase",
	},
});
