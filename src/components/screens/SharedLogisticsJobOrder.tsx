import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import BannerHeader from "@/components/ui/BannerHeader";
import PageList from "@/components/ui/PageList";
import SubjectCard from "@/components/ui/SubjectCard";
import SummaryCard from "@/components/ui/SummaryCard";

import { THEMES } from "@/constants/themes";
import { jobOrderQueryOptions } from "@/query-options/job-orders/jobOrderQueryOptions";
import type { LogisticsJobOrder, SummaryCardData } from "@/types/job-order";
import { formatTargetDeliveryDate } from "@/utils/jobOrderForm";
import { buildSummaryItems } from "@/utils/summaryItems";

const COLOR = "#4E6174";

export default function SharedLogisticsJobOrder() {
	const { referenceNumber, id } = useLocalSearchParams<{
		referenceNumber: string;
		id: string;
	}>();

	const { data, isPending } = useQuery(
		jobOrderQueryOptions<LogisticsJobOrder>(Number(id)),
	);

	const containerSize = data?.data?.shipment.container_size;
	const volumeDimension = `${data?.data?.shipment.cargo_type} ${containerSize ? ` - ${containerSize}` : ""}`;

	const summaryCardsData: SummaryCardData[] =
		!isPending && data
			? [
					{
						title: "Client Information",
						renderIcon: () => (
							<MaterialIcons name="person-outline" size={20} color={COLOR} />
						),
						content: [
							{
								label: "Consignee",
								value: data.data.client.consignee.toUpperCase(),
							},
							{
								label: "Client Type",
								value: data.data.client.client_type,
							},
							{
								label: "Accredited",
								value: data.data.client.accredited,
							},
							{
								label: "Shipper",
								value: data.data.client.shipper.toUpperCase(),
							},
							{
								label: "Remarks On Handling Client",
								value: data.data.client.remarks,
							},
						],
					},
					{
						title: "Service Information",
						renderIcon: () => (
							<MaterialCommunityIcons
								name="briefcase-variant-outline"
								size={20}
								color={COLOR}
							/>
						),
						content: [
							{
								label: "Service Level",
								value: data.data.service.service_level,
							},
							{ label: "BL NO", value: data.data.service.bl_no },
							{
								label: "ETA",
								value: format(data.data.service.eta, "P"),
							},
							{
								label: "ETD",
								value: format(data.data.service.etd, "P"),
							},
						],
					},
					{
						title: "Shipment Information",
						renderIcon: () => (
							<MaterialCommunityIcons
								name="package-variant-closed"
								size={20}
								color={COLOR}
							/>
						),
						content: [
							{
								label: "Commodity",
								value: data.data.shipment.commodity,
							},
							{
								label: "Volume/Dimension",
								value: volumeDimension,
							},
							{
								label: "Hs Code, As Verified By TWG:",
								value: data.data.shipment.hs_code,
							},
							{ label: "ROD", value: data.data.shipment.rod ?? "" },
							{
								label: "Permits Needed",
								value: data.data.shipment.permits ?? "",
							},
							{
								label: "If Coordinated:",
								value: data.data.shipment.if_coordinated,
							},
							{
								label: "Special Remarks",
								value: data.data.shipment.special_remarks,
							},
						],
					},
					{
						title: "Commitment Information",
						renderIcon: () => (
							<MaterialIcons name="linear-scale" size={20} color={COLOR} />
						),
						content: [
							{
								label: "Target Delivery",
								value: formatTargetDeliveryDate(
									new Date(data.data.target.target_delivery_date),
									new Date(data.data.service.eta),
								),
							},
							{
								label: "Target Completion Period",
								value: data.data.target.target_completion_date
									? format(data.data.target.target_completion_date, "P")
									: "",
							},
							{
								label: "Special Remarks",
								value: data.data.target.special_remarks,
							},
						],
					},
					{
						title: "Billing Information",
						renderIcon: () => (
							<MaterialCommunityIcons
								name="receipt-text-outline"
								size={20}
								color={COLOR}
							/>
						),
						content: [
							{
								label: "Terms of Payment",
								value: data.data.billing_details.terms_of_payment,
							},
							{
								label: "When To Bill",
								value: data.data.billing_details.billing_date
									? format(data.data.billing_details.billing_date, "P")
									: "",
							},
							{
								label: "Shall Be Billed",
								value: data.data.billing_details.shall_be_billed,
							},
							{
								label: "Availbale Docs Attached",
							},
						],
					},
				]
			: [];

	const listData = data ? buildSummaryItems(summaryCardsData) : [];

	return (
		<PageList
			ListHeaderComponent={
				<View style={{ backgroundColor: THEMES.pageBackgroundColor }}>
					<BannerHeader variant="light" title={referenceNumber} />
				</View>
			}
			data={listData}
			keyExtractor={(item) => item.key}
			renderItem={({ item }) => (
				<View style={styles.itemContainer}>
					{item.type === "subject" ? (
						<SubjectCard
							subject={data?.data.subject ?? ""}
							body={data?.data.email_body ?? ""}
						/>
					) : (
						<SummaryCard item={item.item} />
					)}
				</View>
			)}
			ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
			ListEmptyComponent={() => {
				if (isPending) {
					return (
						<View style={styles.loadingView}>
							<ActivityIndicator />
						</View>
					);
				}
			}}
		/>
	);
}

const styles = StyleSheet.create({
	upper: {
		textTransform: "uppercase",
	},
	itemContainer: {
		marginHorizontal: 20,
	},
	contentLabel: {
		color: "#979797",
	},
	flexLabel: {
		width: "40%",
	},
	flexContent: {
		flex: 1,
	},
	itemSeparator: {
		height: 10,
	},
	loadingView: {
		flex: 1,
		justifyContent: "center",
	},
});
