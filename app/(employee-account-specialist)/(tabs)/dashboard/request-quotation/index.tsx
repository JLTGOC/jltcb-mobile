import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import BannerHeader from "@/components/ui/BannerHeader";
import DataTable from "@/components/ui/DataTable";
import Search from "@/components/ui/Search";

import { THEMES } from "@/constants/themes";
import { asQuotationsQueryOptions } from "@/query-options/asLead-quotations/asQuotationsQueryOptions";
import type { TableHeader } from "@/types";
import type { QuotationFilter } from "@/types/quotations";

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
  const { data, isPending } = useQuery(asQuotationsQueryOptions(filter));

  const handleSearch = () => {
    setSubmittedSearch(search.trim());
  };

  return (
    <ScrollView
      style={{ backgroundColor: THEMES.pageBackgroundColor }}
      keyboardShouldPersistTaps="handled"
    >
      <BannerHeader variant="light" title="New Request" />

      <Search
        variant="dark"
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
          keyExtractor={(item) => item.client_full_name}
          extractCells={(item) => {
            const formattedDate = format(
              parse(
                item.quotations.at(-1)?.date ?? "",
                "yyyy/MM/dd",
                new Date(),
              ),
              "MM/dd/yyyy",
            );

            return [
              formattedDate,
              item.client_full_name,
              item.quotations_count,
            ];
          }}
          onRowPress={(item) => {
            router.push({
              pathname: "/dashboard/request-quotation/request-list",
              params: {
                clientId: item.client_id,
              },
            });
          }}
        />
      )}
    </ScrollView>
  );
}
