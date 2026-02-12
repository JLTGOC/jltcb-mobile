import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import type { QuotationDetailsSection } from "@/src/types/quotations";

interface QuotationRequestDetailCardProps {
	section: QuotationDetailsSection;
}

export default function QuotationRequestDetailCard({
	section,
}: QuotationRequestDetailCardProps) {
	return (
		<Card>
			<Card.Title
				style={{ minHeight: 50 }}
				title={section.title}
				titleVariant="titleMedium"
				titleStyle={{ textTransform: "uppercase", textAlignVertical: "center" }}
				left={() => <section.icon size={20} />}
				leftStyle={{
					aspectRatio: 1,
					alignItems: "center",
					width: 20,
				}}
			/>
			<Card.Content style={styles.content}>
				{section.details.map(([label, value]) => (
					<View style={styles.detail} key={label + value}>
						<Text style={[styles.label, styles.text]}>{label}</Text>
						<Text style={[styles.value, styles.text]}>{value}</Text>
					</View>
				))}
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	content: {
		gap: 7,
	},
	detail: {
		flexDirection: "row",
		gap: 2,
	},
	label: {
		width: "35%",
		color: "#9D9D9D",
	},
	value: {
		flex: 1,
	},
	text: {
		textTransform: "uppercase",
	},
});
