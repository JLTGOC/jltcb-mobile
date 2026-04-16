import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import BannerHeader from "@/src/components/ui/BannerHeader";
import DataTable from "@/src/components/ui/DataTable";
import Search from "@/src/components/ui/Search";

import { asQuotationsQueryOptions } from "@/src/query-options/asLead-quotations/asQuotationsQueryOptions";
import type { TableHeader } from "@/src/types";
import type { QuotationFilter } from "@/src/types/quotations";

const TABLE_HEADERS: TableHeader[] = [
	{ title: "Date" },
	{ title: "Name", style: { flex: 1.875 } },
	{
		title: "No of Request",
		style: { flexDirection: "row", justifyContent: "center" },
		cellTextStyle: { color: "#FF9933" },
	},
];

export default function NewRequest() {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const [submittedSearch, setSubmittedSearch] = useState("");

	const filter: QuotationFilter<"REQUESTED"> = {
		filter: "REQUESTED",
		...(submittedSearch.length && { search: submittedSearch }),
	};
	const { data, isPending, error } = useQuery(asQuotationsQueryOptions(filter));

	const handleSearch = () => {
		setSubmittedSearch(search.trim());
	};

	return (
		<ScrollView
			style={{ backgroundColor: "#F5F5F5" }}
			keyboardShouldPersistTaps="handled"
		>
			<BannerHeader variant="light" title="New Request" />

			<Search
				onSearch={handleSearch}
				onChangeText={setSearch}
				value={search}
				placeholder="SEARCH QUOTATION"
				autoCapitalize="none"
				placeholderTextColor="black"
				onSubmitEditing={handleSearch}
				returnKeyType="search"
			/>

			{isPending && <ActivityIndicator style={{ marginTop: 20 }} />}

			{data && (
				<DataTable
					headers={TABLE_HEADERS}
					data={data.data}
					keyExtractor={(item) => item.name}
					extractCells={(item) => {
						const formattedDate = format(
							parse(
								item.quotations.at(-1)?.date ?? "",
								"yyyy/MM/dd",
								new Date(),
							),
							"MM/dd/yyyy",
						);

						return [formattedDate, item.name, item.request_count];
					}}
					onRowPress={(item) => {
						router.push({
							pathname: "/dashboard/request-quotation/request-list",
							params: {
								quotations: JSON.stringify(item.quotations),
								clientName: item.name,
							},
						});
					}}
				/>
			)}
		</ScrollView>
	);
}
