import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import BannerHeader from "@/components/ui/BannerHeader";
import DataTable from "@/components/ui/DataTable";
import Search from "@/components/ui/Search";

import { THEMES } from "@/constants/themes";
import { useQuotationsQuery } from "@/hooks/useQuotationsQuery";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { searchSchema, type SearchForm } from "@/schemas/searchSchema";
import type { TableHeader } from "@/types";
import type { ASRequestedQuotationSummary } from "@/types/quotations";

const TABLE_HEADERS: TableHeader[] = [
  { title: "Date" },
  { title: "Name", style: { flex: 1.875 } },
  {
    title: "No of Request",
    style: { flexDirection: "row", justifyContent: "center" },
    cellTextStyle: { color: "#FF9933" },
  },
];

export default function RequestedQuotations() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const [submittedSearch, setSubmittedSearch] = useState("");

  const { data, isPending, refetch } = useQuotationsQuery<
    ASRequestedQuotationSummary[]
  >({
    filter: {
      status: "REQUESTED",
    },
    ...(submittedSearch && { search: submittedSearch }),
  });
  const { refetchByUser, isRefetchingByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const handleSearch = handleSubmit(({ search }) => setSubmittedSearch(search));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      overScrollMode="never"
      bounces={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
      <BannerHeader variant="light" title="New Request" />

      <Controller
        control={control}
        name="search"
        render={({ field: { onChange, onBlur, value } }) => (
          <Search
            variant="dark"
            onSearch={handleSearch}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            placeholder="SEARCH QUOTATION"
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        )}
      />

      {isPending && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {data && (
        <DataTable
          headers={TABLE_HEADERS}
          data={data.data ?? []}
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
              pathname: "/quotations",
              params: {
                status: "requested",
                clientId: item.client_id,
              },
            });
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEMES.pageBackgroundColor,
  },
  contentContainer: {
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
