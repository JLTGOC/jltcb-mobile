import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { Text } from "react-native-paper";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/job-order-section/Card";

import type { SummaryCardData } from "@/types/job-order";

interface SummaryCardProps {
	item: SummaryCardData;
	style?: StyleProp<ViewStyle>;
}

export default function SummaryCard({ item, style }: SummaryCardProps) {
	return (
		<Card style={style}>
			<CardHeader>
				{item.renderIcon()}
				<CardTitle variant="labelSmall" style={styles.upper}>
					{item.title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				{item.content.map((contentItem) => (
					<View
						key={`${item.title}-${contentItem.label}`}
						style={{ flexDirection: "row", gap: 4 }}
					>
						<Text
							variant="bodySmall"
							style={[styles.contentLabel, styles.flexLabel]}
						>
							{contentItem.label}
						</Text>
						<Text variant="bodySmall" style={styles.flexContent}>
							{contentItem.value}
						</Text>
					</View>
				))}
			</CardContent>
		</Card>
	);
}

const styles = StyleSheet.create({
	upper: { textTransform: "uppercase" },
	contentLabel: { color: "#979797" },
	flexLabel: { width: "40%" },
	flexContent: { flex: 1 },
	row: { flexDirection: "row", gap: 4, marginBottom: 4 },
});
