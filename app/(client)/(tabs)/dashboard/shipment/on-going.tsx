import { useState } from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import CardTemplate from "@/src/components/client-section/shipment/CardTemplate";
import Search from "@/src/components/client-section/shipment/Search";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/src/hooks/useDebounce";
import { fetchShipments } from "@/src/services/shipment";

export default function OnGoing() {
    const [search, setSearch] = useState<string>("");  
    const debouncedSearch = useDebounce(search, 500) || ""; 

     // Data Fetching
      const { data, isLoading } = useQuery({
        queryKey: ["shipments", debouncedSearch],
        queryFn: () =>
          fetchShipments(debouncedSearch),
        placeholderData: (previousData) => previousData,
      });

      console.log("shipments data:", data)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
        <Search search={search} setSearch={setSearch}></Search>
        <CardTemplate/>
    </View>
  );
}

const styles = StyleSheet.create({});
