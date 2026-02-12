import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import QuotationRequestDetailCard from "@/src/components/quote-section/QuotationRequestDetailCard";
import QuotationRequestDocumentCard from "@/src/components/quote-section/QuotationRequestDocumentCard";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { quotationQueryOptions } from "@/src/query-options/quotations/quotationQueryOptions";
import type { Document, QuotationDetailsSection } from "@/src/types/quotations";

const TABS = ["Details", "Documents"] as const;

type TabType = (typeof TABS)[number];

export default function Quotation() {
	const { id, clientName } = useLocalSearchParams<{
		id: string;
		clientName: string;
	}>();
	const [activeTab, setActiveTab] = useState<TabType>(TABS[0]);

	const { data, isPending, error, isRefetching, refetch } = useQuery(
		quotationQueryOptions(id),
	);

	const isTabActive = (tab: TabType) => activeTab === tab;

	const renderItem = ({
		item,
	}: {
		item: QuotationDetailsSection | Document;
	}) => {
		if (isTabActive("Details")) {
			return (
				<View style={{ paddingHorizontal: 20 }}>
					<QuotationRequestDetailCard
						section={item as QuotationDetailsSection}
					/>
				</View>
			);
		}

		return (
			<View style={{ paddingHorizontal: 20 }}>
				<QuotationRequestDocumentCard document={item as Document} />
			</View>
		);
	};

	return (
		<FlatList
			refreshControl={
				<RefreshControl refreshing={isRefetching} onRefresh={refetch} />
			}
			data={
				(isTabActive("Details") ? data?.sections : data?.documents) as (
					| QuotationDetailsSection
					| Document
				)[]
			}
			ListHeaderComponent={
				<>
					<BannerHeader variant="light" title={clientName} />
					<View style={[styles.tabs, styles.container]}>
						{TABS.map((tab) => (
							<TouchableOpacity
								onPress={() => setActiveTab(tab)}
								style={styles.tabButton}
								key={tab}
							>
								<Text
									numberOfLines={1}
									style={[
										styles.tabText,

										{ color: isTabActive(tab) ? "#3B3B3B" : "#9D9D9D" },
									]}
								>
									{tab}
								</Text>
								{isTabActive(tab) && <View style={styles.underline} />}
							</TouchableOpacity>
						))}
					</View>
				</>
			}
			renderItem={renderItem}
			contentContainerStyle={{ gap: 8 }}
			style={{ backgroundColor: "#F5F5F5" }}
			keyExtractor={(item) =>
				isTabActive("Details")
					? (item as QuotationDetailsSection).title
					: String((item as Document).id)
			}
			ListEmptyComponent={
				isPending ? (
					<ActivityIndicator color="black" style={{ marginTop: 20 }} />
				) : (
					<Text style={{ marginHorizontal: 20 }}>
						No {isTabActive("Details") ? "details" : "documents"} available.
					</Text>
				)
			}
			ListFooterComponent={
				!isPending && !error && isTabActive("Details") ? (
					<Button
						mode="contained"
						style={[styles.button, styles.container]}
						labelStyle={{ textTransform: "uppercase" }}
					>
						Make Quotation
					</Button>
				) : null
			}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
	tabs: {
		flexDirection: "row",
		borderBottomWidth: 2,
		borderColor: "#ACACAC",
		marginBottom: 10,
	},
	tabButton: {
		paddingVertical: 2,
		minWidth: 72,
		paddingHorizontal: 8,
	},
	tabText: {
		textAlign: "center",
		textTransform: "uppercase",
	},
	underline: {
		height: 2,
		backgroundColor: "#FF9933",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: -2,
	},
	button: {
		marginTop: 12,
		borderRadius: 6,
		backgroundColor: "#1C213B",
		paddingVertical: 5,
	},
});
