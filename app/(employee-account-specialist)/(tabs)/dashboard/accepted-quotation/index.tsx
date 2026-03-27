import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import * as Linking from "expo-linking";
import * as Print from "expo-print";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
	ActivityIndicator,
	DataTable,
	IconButton,
	Menu,
} from "react-native-paper";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { asQuotationsQueryOptions } from "@/src/query-options/asLead-quotations/asQuotationsQueryOptions";
import { quotationQueryOptions } from "@/src/query-options/asLead-quotations/quotationQueryOptions";
import type { MenuOption, TableHeader } from "@/src/types";
import { showToast } from "@/src/utils/showToast";

const TABLE_HEADERS: TableHeader[] = [
	{ title: "Reference" },
	{ title: "Date" },
	{ title: "Shipment Details" },
	{
		title: "",
		style: { maxWidth: 20 },
	},
];

const MENU_OPTIONS = [
	{ title: "Print", icon: "printer" },
	{ title: "Download", icon: "download" },
	{ title: "Make Job Order", icon: "truck-fast-outline" },
] as const satisfies MenuOption[];

type MenuTitle = (typeof MENU_OPTIONS)[number]["title"];

export default function AcceptedQuotation() {
	const queryClient = useQueryClient();
	const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);

	const { data, isPending, error } = useQuery(
		asQuotationsQueryOptions({ filter: "ACCEPTED" }),
	);

	const handlePrint = async (fileUrl: string) => {
		try {
			await Print.printAsync({
				uri: fileUrl,
			});
		} catch (error) {
			console.error("Print error:", error);
		}
	};

	const getQuotationFile = async (quotationId: string) => {
		const { data } = await queryClient.fetchQuery(
			quotationQueryOptions(quotationId),
		);

		if (typeof data.quotation_file === "string") {
			showToast(data.quotation_file);
			return null;
		}

		return data.quotation_file[0].file_url;
	};

	const handleRowPress = async (quotationId: string) => {
		const fileUrl = await getQuotationFile(quotationId);
		if (fileUrl) Linking.openURL(fileUrl);
	};

	const handleMenuAction = async (title: MenuTitle, quotationId: string) => {
		if (title === "Make Job Order") return;

		const fileUrl = await getQuotationFile(quotationId);
		if (!fileUrl) return;

		if (title === "Download") Linking.openURL(fileUrl);
		else if (title === "Print") handlePrint(fileUrl);
	};

	return (
		<ScrollView>
			<BannerHeader title="Accepted Quotation" variant="light" />
			{isPending ? (
				<ActivityIndicator style={{ marginTop: 20 }} />
			) : (
				data && (
					<DataTable>
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
						{data.data.map((quotation) => {
							const formattedDate = format(
								parse(quotation.date, "yyyy/MM/dd", new Date()),
								"MM/dd/yyyy",
							);

							const cells = [
								quotation.reference_number,
								formattedDate,
								quotation.commodity,
							];

							return (
								<DataTable.Row
									onPress={() => handleRowPress(String(quotation.id))}
									key={quotation.id}
									style={styles.row}
								>
									{cells.map((cell, i) => {
										const tableHeader = TABLE_HEADERS[i];
										return (
											<DataTable.Cell
												key={`${quotation.id}-${tableHeader.title}`}
												style={[styles.cell, tableHeader.style]}
											>
												<Text style={styles.cellText}>{cell}</Text>
											</DataTable.Cell>
										);
									})}
									<DataTable.Cell
										numeric
										style={[styles.cell, TABLE_HEADERS[3].style]}
									>
										<Menu
											anchor={
												<IconButton
													icon="dots-vertical"
													size={20}
													onPress={() => setVisibleMenuId(quotation.id)}
												/>
											}
											anchorPosition="bottom"
											onDismiss={() => setVisibleMenuId(null)}
											visible={visibleMenuId === quotation.id}
										>
											{MENU_OPTIONS.map((menu) => (
												<Menu.Item
													dense
													key={menu.title}
													leadingIcon={menu.icon}
													title={menu.title}
													onPress={() =>
														handleMenuAction(menu.title, String(quotation.id))
													}
												/>
											))}
										</Menu>
									</DataTable.Cell>
								</DataTable.Row>
							);
						})}
					</DataTable>
				)
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	tableHeader: {
		backgroundColor: "#E5E5E5",
	},
	headerTitle: {
		paddingVertical: 4,
	},
	uppercase: {
		textTransform: "uppercase",
	},
	row: {
		minHeight: 48,
		height: "auto",
	},
	cell: {
		flex: 1,
		alignItems: "center",
	},
	cellText: {
		flexShrink: 1,
		flexWrap: "wrap",
	},
});
