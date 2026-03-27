import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
	ScrollView,
	type StyleProp,
	StyleSheet,
	Text,
	type ViewStyle,
} from "react-native";
import {
	ActivityIndicator,
	DataTable,
	IconButton,
	Menu,
} from "react-native-paper";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { asQuotationsQueryOptions } from "@/src/query-options/asLead-quotations/asQuotationsQueryOptions";

interface TableHeader {
	title: string;
	style?: StyleProp<ViewStyle>;
}

const TABLE_HEADERS: TableHeader[] = [
	{ title: "Reference" },
	{ title: "Date" },
	{ title: "Shipment Details" },
	{ title: "", style: { maxWidth: 20 } },
];

const MENUS: { icon: string; title: string; href: Href }[] = [
	{
		icon: "table-edit",
		title: "Edit Quotation",
		href: "/dashboard/responded-quotation/[id]/upload",
	},
];

export default function RespondedQuotation() {
	const { data, isPending, error } = useQuery(
		asQuotationsQueryOptions({ filter: "RESPONDED" }),
	);
	const router = useRouter();
	const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);

	const getUploadRoute = (id: string | number, clientName: string): Href => ({
		pathname: "/dashboard/responded-quotation/[id]/upload",
		params: { id: id.toString(), clientName },
	});

	return (
		<ScrollView>
			<BannerHeader title="Responded Quotations" variant="light" />
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
									numberOfLines={2}
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
								<DataTable.Row key={quotation.id} style={styles.row}>
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
											{MENUS.map((menu) => (
												<Menu.Item
													key={menu.title}
													leadingIcon={menu.icon}
													title={menu.title}
													dense
													onPress={() => {
														setVisibleMenuId(null);
														router.navigate(
															getUploadRoute(
																quotation.id,
																quotation.client_name,
															),
														);
													}}
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
