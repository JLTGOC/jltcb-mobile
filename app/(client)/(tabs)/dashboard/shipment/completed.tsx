import { useState } from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View, FlatList } from "react-native";
import CardTemplate from "@/src/components/client-section/shipment/CardTemplate";
import Search from "@/src/components/client-section/shipment/Search";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/src/hooks/useDebounce";
import { fetchShipments } from "@/src/services/shipment";
import BannerHeader from "@/src/components/ui/BannerHeader";

export default function Completed() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500) || "";

  // Data Fetching
  const { data, isLoading } = useQuery({
    queryKey: ["shipments", debouncedSearch],
    queryFn: () => fetchShipments({search: debouncedSearch, status: 'DELIVERED'}),
    placeholderData: (previousData) => previousData,
  });

  console.log("khate", data?.shipments);

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
      <FlatList
        data={data?.shipments || []}
        keyExtractor={(item) => item.general_info.reference_number}
        renderItem={({ item }) => (
          <CardTemplate
            reference_number={item.general_info.reference_number}
            status={item.general_info.status}
            commodity={item.commodity_details.commodity}
            date={item.shipment_information.created_at}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
