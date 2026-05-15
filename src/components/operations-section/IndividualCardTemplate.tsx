import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

type Value = string | number | null | undefined;

export type SubjectCardItem = {
	type: "subject";
	title: string;
	value: Value;
	icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

export type DetailRow = {
	label: string;
	value: Value;
};

export type DetailCardItem = {
	type: "details";
	title: string;
	rows: DetailRow[];
	icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

export type IndividualCardItem = SubjectCardItem | DetailCardItem;

type Props = {
	item: IndividualCardItem;
};

function formatValue(value: Value) {
	if (value === null || value === undefined || value === "") return "-";
	return String(value);
}

function SubjectCard({
	title,
	value,
	icon = "clipboard-text-outline",
}: SubjectCardItem) {
	return (
		<Card style={styles.card} mode="elevated" elevation={1}>
			<Card.Content style={styles.content}>
				<View style={styles.headerRow}>
					<MaterialCommunityIcons name={icon} size={16} color="#6E7681" />
					<Text style={styles.headerTitle}>{title}</Text>
				</View>

				<Divider style={styles.divider} />

				<Text style={styles.subjectValue}>{formatValue(value)}</Text>
			</Card.Content>
		</Card>
	);
}

function DetailCard({ title, rows, icon = "account-outline" }: DetailCardItem) {
	return (
		<Card style={styles.card} mode="elevated" elevation={1}>
			<Card.Content style={styles.content}>
				<View style={styles.headerRow}>
					<MaterialCommunityIcons name={icon} size={16} color="#6E7681" />
					<Text style={styles.headerTitle}>{title}</Text>
				</View>

				<Divider style={styles.divider} />

				{rows.map((row, index) => (
					<View key={`${title}-${row.label}-${index}`} style={styles.row}>
						<Text style={styles.rowLabel}>{row.label}</Text>
						<Text style={styles.rowValue}>{formatValue(row.value)}</Text>
					</View>
				))}
			</Card.Content>
		</Card>
	);
}

export default function IndividualCardTemplate({ item }: Props) {
	if (item.type === "subject") {
		return <SubjectCard {...item} />;
	}

	return <DetailCard {...item} />;
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 6,
		backgroundColor: "#FFFFFF",
		marginHorizontal: 10,
		marginBottom: 8,
		overflow: "hidden",
	},
	content: {
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	headerTitle: {
		fontSize: 14,
		fontWeight: "500",
		color: "#5D6976",
		textTransform: "uppercase",
	},
	divider: {
		marginTop: 6,
		marginBottom: 8,
		marginHorizontal: -10,
		backgroundColor: "#D9DDE2",
		height: 1,
	},
	subjectValue: {
		fontSize: 22,
		fontWeight: "400",
		color: "#2B2F33",
		lineHeight: 30,
	},
	row: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingVertical: 2,
	},
	rowLabel: {
		width: "37%",
		fontSize: 17,
		color: "#9BA1A8",
		lineHeight: 24,
		paddingRight: 8,
	},
	rowValue: {
		flex: 1,
		fontSize: 17,
		color: "#2F3439",
		lineHeight: 24,
	},
});
