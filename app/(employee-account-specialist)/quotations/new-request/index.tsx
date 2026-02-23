import BannerHeader from "@/src/components/ui/BannerHeader";
import Search from "@/src/components/ui/Search";
import { routes } from "@/src/constants/routes";
import { asQuotationsQueryOptions } from "@/src/query-options/quotations/asQuotationsQueryOptions";
import type { QuotationFilter } from "@/src/types/quotations";
import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, DataTable } from "react-native-paper";

const TABLE_HEADERS = [
  { title: "Date", style: { flex: 2 } },
  { title: "Name", style: { flex: 5 } },
  { title: "Request", numeric: true, style: { flex: 2 } },
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
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            {TABLE_HEADERS.map((header) => (
              <DataTable.Title
                style={[styles.headerTitle, header.style]}
                textStyle={styles.uppercase}
                numeric={header?.numeric}
                key={header.title}
                numberOfLines={2}
              >
                {header.title}
              </DataTable.Title>
            ))}
          </DataTable.Header>
          {data.data.map((userRow) => {
            const formattedDate = format(
              parse(
                userRow.quotations.at(-1)?.date ?? "",
                "yyyy/MM/dd",
                new Date(),
              ),
              "MM/dd/yyyy",
            );
            return (
              <TouchableOpacity
                key={userRow.name}
                onPress={() => {
                  router.push({
                    pathname: routes.AS_QUOTE_REQUEST_LIST,
                    params: {
                      quotations: JSON.stringify(userRow.quotations),
                      clientName: userRow.name,
                    },
                  });
                }}
              >
                <DataTable.Row>
                  <DataTable.Cell style={styles.flexLow}>
                    {formattedDate}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={[styles.uppercase, { flex: 1 }]}
                    style={styles.flexHigh}
                  >
                    {userRow.name}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={styles.requestCountText}
                    style={styles.flexLow}
                    numeric
                  >
                    {userRow.request_count}
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            );
          })}
        </DataTable>
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
  requestCountText: {
    color: "#FF9933",
    fontWeight: "semibold",
  },
  flexLow: {
    flex: 2,
  },
  flexHigh: {
    flex: 5,
  },
});
