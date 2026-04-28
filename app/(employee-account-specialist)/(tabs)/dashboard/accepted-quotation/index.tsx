import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import * as Linking from "expo-linking";
import * as Print from "expo-print";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, IconButton, Menu } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";

import BannerHeader from "@/src/components/ui/BannerHeader";
import DataTable from "@/src/components/ui/DataTable";

import { asQuotationsQueryOptions } from "@/src/query-options/asLead-quotations/asQuotationsQueryOptions";
import { quotationQueryOptions } from "@/src/query-options/asLead-quotations/quotationQueryOptions";
import { useJobOrderFormStore } from "@/src/stores/useJobOrderFormStore";
import type { MenuOption, TableHeader } from "@/src/types";
import type { ASAcceptedQuotation } from "@/src/types/quotations";
import { showToast } from "@/src/utils/showToast";

const TABLE_HEADERS: TableHeader[] = [
	{ title: "Reference" },
	{ title: "Date" },
	{
		title: "Shipment Details",
		style: { flex: 1.125 },
	},
	{
		title: "",
		style: { maxWidth: 35 },
	},
];

const MENU_OPTIONS = [
	{ title: "Print", icon: "printer" },
	{ title: "Download", icon: "download" },
	{ title: "Make Job Order", icon: "truck-fast-outline" },
] as const satisfies MenuOption[];

type MenuTitle = (typeof MENU_OPTIONS)[number]["title"];

export default function AcceptedQuotation() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { setQuotationReference, reset } = useJobOrderFormStore(
		useShallow((state) => ({
			setQuotationReference: state.setQuotationReference,
			reset: state.reset,
		})),
	);

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

	const handleMenuAction = async ({
		title,
		quotation,
	}: {
		title: MenuTitle;
		quotation: ASAcceptedQuotation;
	}) => {
		if (title !== "Make Job Order") {
			const fileUrl = await getQuotationFile(quotation.id.toString());
			if (!fileUrl) return;

			if (title === "Download") Linking.openURL(fileUrl);
			else if (title === "Print") handlePrint(fileUrl);
			return;
		}

		reset();
		setQuotationReference(quotation.reference_number);
		if (quotation.service === "LOGISTICS") {
			router.push(
				"/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/shipment",
			);
		} else if (quotation.service === "REGULATORY") {
			router.push(
				"/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/regulatory-services",
			);
		}
		setVisibleMenuId(null);
	};

	return (
		<ScrollView>
			<BannerHeader title="Accepted Quotation" variant="light" />
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
									{MENU_OPTIONS.map((menu) => (
										<Menu.Item
											dense
											key={menu.title}
											leadingIcon={menu.icon}
											title={menu.title}
											onPress={() =>
												handleMenuAction({
													title: menu.title,
													quotation,
												})
											}
										/>
									))}
								</Menu>,
							];
						}}
						onRowPress={(item) => handleRowPress(item.id.toString())}
					/>
				)
			)}
		</ScrollView>
	);
}
