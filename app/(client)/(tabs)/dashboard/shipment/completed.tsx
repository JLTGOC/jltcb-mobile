import { useMemo, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import CardTemplate from "@/src/components/client-section/shipment/CardTemplate";
import Search from "@/src/components/client-section/shipment/Search";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import useDebounce from "@/src/hooks/useDebounce";
import { fetchShipments, type ShipmentListPage } from "@/src/services/shipment";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { ActivityIndicator } from "react-native-paper";

export default function Completed() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500) || "";

  // Data Fetching
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    ShipmentListPage,
    Error,
    InfiniteData<ShipmentListPage>,
    string[],
    string
  >({
    queryKey: ["shipments", "DELIVERED", debouncedSearch],
    queryFn: ({ pageParam }) => 
      fetchShipments({ 
        search: debouncedSearch, 
        status: "DELIVERED", 
        cursor: pageParam || undefined,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.pagination.next_cursor || undefined,
    retry: false,
  });

  const allShipments = useMemo(
    () => data?.pages.flatMap((page) => page.shipments ?? []) ?? [],
    [data],
  );

  const showEmptyState = !isLoading && !isError && allShipments.length === 0;
  const emptyMessage =
    data?.pages.find((page) => page.message)?.message || "No Shipments available";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      <BannerHeader title={"Completed Shipments"} variant="dark" />
      <Search search={search} setSearch={setSearch} />
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : null}
      {isError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error?.message || "Failed to load shipments."}
          </Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Tap to retry
          </Text>
        </View>
      ) : null}
      <FlatList
        data={allShipments}
        keyExtractor={(item) => item.general_info.reference_number}
        renderItem={({ item }) => (
          <CardTemplate
            reference_number={item.general_info.reference_number}
            status={item.general_info.status}
            commodity={item.general_info.commodity}
            date={item.general_info.date}
            shipment_id={item.general_info.id}
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          showEmptyState ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{emptyMessage}</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  errorText: {
    fontSize: 14,
  },
  retryText: {
    fontSize: 14,
    marginTop: 6,
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
  },
});
