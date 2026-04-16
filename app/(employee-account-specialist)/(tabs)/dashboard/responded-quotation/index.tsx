import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, type StyleProp, type ViewStyle } from "react-native";
import { ActivityIndicator, IconButton, Menu } from "react-native-paper";

import BannerHeader from "@/src/components/ui/BannerHeader";
import DataTable from "@/src/components/ui/DataTable";
import { asQuotationsQueryOptions } from "@/src/query-options/asLead-quotations/asQuotationsQueryOptions";

interface TableHeader {
	title: string;
	style?: StyleProp<ViewStyle>;
}

const TABLE_HEADERS: TableHeader[] = [
	{ title: "Reference" },
	{ title: "Date" },
	{ title: "Shipment Details", style: { flex: 1.125 } },
	{ title: "", style: { maxWidth: 35 } },
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
					<DataTable
						headers={TABLE_HEADERS}
						data={data.data}
						keyExtractor={(item) => item.id.toString()}
						extractCells={(quotation) => {
							const formattedDate = format(
								parse(quotation.date, "yyyy/MM/dd", new Date()),
								"MM/dd/yyyy",
							);
							return [
								quotation.reference_number,
								formattedDate,
								quotation.commodity,
								<Menu
									key={quotation.id}
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
													getUploadRoute(quotation.id, quotation.client_name),
												);
											}}
										/>
									))}
								</Menu>,
							];
						}}
					/>
				)
			)}
		</ScrollView>
	);
}
