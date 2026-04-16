import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ASDropdown from "@/src/components/lead-as-section/ASDropdown";
import BannerHeader from "@/src/components/ui/BannerHeader";
import DataTable from "@/src/components/ui/DataTable";

import { useAuth } from "@/src/hooks/useAuth";
import { updateAsMutationOptions } from "@/src/mutation-options/asLead-quotations/updateAsMutationOptions";
import { asQueryOptions } from "@/src/query-options/users/asQueryOptions";
import type { TableHeader } from "@/src/types";
import type { Quotation, UpdateAsArgs } from "@/src/types/quotations";
import { showToast } from "@/src/utils/showToast";

const TABLE_HEADERS: TableHeader[] = [
	{
		title: "Date",
	},
	{
		title: "Commodity",
		cellTextStyle: { textTransform: "uppercase" },
	},
	{
		title: "Person in Charge",
	},
];

export default function RequestList() {
	const { role } = useAuth();
	const router = useRouter();
	const { quotations: quotationsString, clientName } = useLocalSearchParams<{
		quotations: string;
		clientName: string;
	}>();
	const isLeadAS = role === "Lead Account Specialist";
	const { data: asUsers, isPending } = useQuery({
		...asQueryOptions,
		select: (data) => {
			const formattedNames = data.data.map((user) => ({
				id: String(user.id),
				title: user.full_name.split(" ")[0],
			}));
			return { ...data, data: formattedNames };
		},
		enabled: isLeadAS,
	});
	const { mutateAsync } = useMutation(updateAsMutationOptions);
	const [updatingId, setUpdatingId] = useState<number | null>(null);

	const handleChangeAs = async (data: UpdateAsArgs) => {
		setUpdatingId(data.quotationId);
		try {
			await mutateAsync(data);
			showToast(
				`Changed AS to ${asUsers?.data.find((user) => Number(user.id) === data.asId)?.title}`,
			);
		} catch (e) {
			console.error(e);
		} finally {
			setUpdatingId(null);
		}
	};

	const navigateToQuotation = (quotationId: number, clientName: string) => {
		router.push({
			pathname: "/dashboard/request-quotation/[id]",
			params: { id: quotationId, clientName },
		});
	};

	const quotations: Quotation[] = quotationsString
		? JSON.parse(quotationsString)
		: [];

	return (
		<ScrollView style={{ backgroundColor: "#F5F5F5" }}>
			<BannerHeader variant="light" title="List of Request for Quotation" />

			<View style={styles.table}>
				<DataTable
					headers={TABLE_HEADERS}
					data={quotations}
					keyExtractor={(item) => item.id.toString()}
					extractCells={(quotation) => {
						const formattedDate = format(
							parse(quotation.date, "yyyy/MM/dd", new Date()),
							"MM/dd/yyyy",
						);
						return [
							formattedDate,
							quotation.commodity,
							isLeadAS ? (
								<ASDropdown
									key={quotation.id}
									quotationId={quotation.id}
									personInChargeName={quotation.person_in_charge}
									asUsers={asUsers?.data}
									loading={isPending || updatingId === quotation.id}
									handleChangeAs={handleChangeAs}
								/>
							) : (
								quotation.person_in_charge
							),
						];
					}}
					onRowPress={(quotation) =>
						navigateToQuotation(quotation.id, clientName)
					}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	table: {
		marginTop: 20,
	},
});
