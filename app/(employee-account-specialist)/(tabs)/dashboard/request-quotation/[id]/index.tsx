import { useQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import ClientCard from "@/src/components/quote-section/ClientCard";
import QuotationRequestDetailCard from "@/src/components/quote-section/QuotationRequestDetailCard";
import QuotationRequestDocumentCard from "@/src/components/quote-section/QuotationRequestDocumentCard";
import TabBar from "@/src/components/tabs-ui/TabBar";
import BannerHeader from "@/src/components/ui/BannerHeader";
import PageList from "@/src/components/ui/PageList";

import { useQuotationData } from "@/src/hooks/useQuotationData";
import { useRefreshOnFocus } from "@/src/hooks/useRefreshOnFocus";
import { userQueryOptions } from "@/src/query-options/users/userQueryOptions";

const TABS = ["Details", "Documents"] as const;
type TabType = (typeof TABS)[number];

export default function Quotation() {
	const { id, clientName } = useLocalSearchParams<{
		id: string;
		clientName: string;
	}>();
	const [activeTab, setActiveTab] = useState<TabType>("Details");
	const { query, renameFileMutation } = useQuotationData(id);
	const { data, isPending, isRefetching, refetch } = query;

	useRefreshOnFocus(refetch);

	const ListHeaderComponent = (
		<>
			<BannerHeader variant="light" title={clientName} />
			<TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
		</>
	);

	const { data: clientData, isPending: isClientDataPending } = useQuery(
		userQueryOptions(data?.clientId.toString() ?? ""),
	);

	const detailsData =
		data && clientData
			? [
					{
						type: "userCard" as const,
						data: {
							fullName: clientData.data.full_name,
							userImage: clientData.data.image_path,
							companyName: clientData.data.company_name,
							contactNumber: clientData.data.contact_number,
							email: clientData.data.email,
							conversationId: data.conversationId,
						},
					},
					...data.sections.map((section) => ({
						data: section,
						type: "details" as const,
					})),
				]
			: [];

	const handleRename = (documentId: number, fileName: string) =>
		renameFileMutation.mutateAsync({ documentId, fileName });

	switch (activeTab) {
		case "Details": {
			return (
				<PageList
					refreshControl={
						<RefreshControl refreshing={isRefetching} onRefresh={refetch} />
					}
					ListHeaderComponent={ListHeaderComponent}
					contentContainerStyle={{ gap: 8 }}
					data={detailsData}
					keyExtractor={(item) => {
						switch (item.type) {
							case "details":
								return item.data.title;
							case "userCard":
								return item.data.fullName;
						}
					}}
					renderItem={({ item }) => (
						<View style={styles.container}>
							{item.type === "details" ? (
								<QuotationRequestDetailCard section={item.data} />
							) : (
								<ClientCard {...item.data} />
							)}
						</View>
					)}
					ListEmptyComponent={() => {
						if (isPending || isClientDataPending)
							return <ActivityIndicator style={styles.loader} />;
					}}
					ListFooterComponent={() => {
						if (data && clientData)
							return (
								<Link
									asChild
									href={{
										pathname: "/dashboard/request-quotation/[id]/upload",
										params: { id, clientName },
									}}
									style={[styles.button, styles.container]}
								>
									<Button mode="contained" labelStyle={styles.buttonLabel}>
										Upload Quotation
									</Button>
								</Link>
							);
					}}
				/>
			);
		}

		case "Documents": {
			return (
				<PageList
					refreshControl={
						<RefreshControl refreshing={isRefetching} onRefresh={refetch} />
					}
					ListHeaderComponent={ListHeaderComponent}
					contentContainerStyle={{ gap: 8 }}
					data={data?.documents}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={styles.container}>
							<QuotationRequestDocumentCard
								document={item}
								onRename={(fileName) => handleRename(item.id, fileName)}
							/>
						</View>
					)}
					ListEmptyComponent={() => {
						if (isPending) return <ActivityIndicator style={styles.loader} />;

						if (!data) return <Text>No documents available.</Text>;
					}}
				/>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
	button: {
		marginTop: 16,
		borderRadius: 6,
		backgroundColor: "#1C213B",
	},
	buttonLabel: {
		paddingVertical: 5,
		textTransform: "uppercase",
	},
	loader: {
		alignItems: "center",
		flex: 1,
	},
});
