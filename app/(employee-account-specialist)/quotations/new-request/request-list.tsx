import { Picker } from "@react-native-picker/picker";
import { format, parse } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { DataTable, Text } from "react-native-paper";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { routes } from "@/src/constants/routes";
import type { Quotation } from "@/src/types/quotations";

const TABLE_HEADERS = [
	{
		title: "Date",
		style: { flex: 2 },
	},
	{
		title: "Commodity",
		style: { flex: 5 },
	},
	{
		title: "Person in Charge",
		style: { flex: 4 },
	},
];

const AS_USERS = ["Zoie Conroy", "Carrie Ryan", "Henry Bruen", "Ona Wilderman"];

export default function RequestList() {
	const router = useRouter();
	const { quotations: quotationsString, clientName } = useLocalSearchParams<{
		quotations: string;
		clientName: string;
	}>();
	const quotations: Quotation[] = quotationsString
		? JSON.parse(quotationsString)
		: [];

	return (
		<ScrollView style={{ backgroundColor: "#F5F5F5" }}>
			<BannerHeader variant="light" title="List of Request for Quotation" />

			<DataTable style={styles.table}>
				<DataTable.Header style={styles.tableHeader}>
					{TABLE_HEADERS.map((header) => (
						<DataTable.Title
							style={[styles.headerTitle, header.style]}
							textStyle={styles.uppercase}
							key={header.title}
						>
							{header.title}
						</DataTable.Title>
					))}
				</DataTable.Header>
				{quotations.map((quotation) => {
					const formattedDate = format(
						parse(quotation.date, "yyyy/MM/dd", new Date()),
						"MM/dd/yyyy",
					);
					return (
						<TouchableOpacity
							key={quotation.id}
							onPress={() => {
								router.push({
									pathname: routes.AS_QUOTE_REQUEST,
									params: { id: quotation.id, clientName },
								});
							}}
						>
							<DataTable.Row>
								<DataTable.Cell style={{ flex: 2 }}>
									<TouchableOpacity>
										<Text>{formattedDate}</Text>
									</TouchableOpacity>
								</DataTable.Cell>
								<DataTable.Cell
									textStyle={[styles.uppercase, { flex: 1 }]}
									style={{ flex: 5 }}
								>
									{quotation.commodity}
								</DataTable.Cell>
								<DataTable.Cell onPress={() => {}} style={{ flex: 4 }}>
									<Picker
										style={{ flex: 1 }}
										selectedValue={quotation.contact_person}
										mode="dropdown"
									>
										{AS_USERS.map((option) => (
											<Picker.Item
												key={option}
												label={option.toLocaleUpperCase()}
												value={option}
											/>
										))}
									</Picker>
								</DataTable.Cell>
							</DataTable.Row>
						</TouchableOpacity>
					);
				})}
			</DataTable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	table: {
		marginTop: 20,
	},
	tableHeader: {
		backgroundColor: "#E5E5E5",
	},
	headerTitle: {
		paddingVertical: 4,
	},
	uppercase: {
		textTransform: "uppercase",
	},
	requestCountText: {
		color: "#FF9933",
	},
	flexLow: {
		flex: 2,
	},
	flexHigh: {
		flex: 5,
	},
});
