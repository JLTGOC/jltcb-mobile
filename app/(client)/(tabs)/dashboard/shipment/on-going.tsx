import { useMemo, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CardTemplate from "@/src/components/client-section/shipment/CardTemplate";
import Search from "@/src/components/client-section/shipment/Search";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import useDebounce from "@/src/hooks/useDebounce";
import { fetchShipments } from "@/src/services/shipment";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { ActivityIndicator } from "react-native-paper";
import type { ShipmentData } from "@/src/types/shipment-type";

export default function OnGoing() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500) || "";

  // Data Fetching
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    ShipmentData,
    Error,
    InfiniteData<ShipmentData>,
    string[],
    string
  >({
    queryKey: ["shipments", "ONGOING", debouncedSearch],
    queryFn: ({ pageParam }) => 
      fetchShipments({ 
        search: debouncedSearch, 
        status: "ONGOING", 
        cursor: pageParam || undefined,
      }),
    initialPageParam: "",
    // This tells React Query where to find the next cursor in your JSON
    getNextPageParam: (lastPage) => lastPage.pagination.next_cursor || undefined,
  });

  // FlatList needs a flat array, so we flatten the 'pages' from React Query
  const allShipments = useMemo(
    () => data?.pages.flatMap((page) => page.shipments) ?? [],
    [data],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      <BannerHeader title={"OnGoing Shipments"} variant="dark" />
      <Search search={search} setSearch={setSearch} />
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
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
        onEndReachedThreshold={0.5} // Trigger fetch when halfway through the last item
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
