import { useState } from "react";
import { View } from "react-native";
import { TextInput, ActivityIndicator, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";

import Table from "@/src/components/ui/Table";
import Header from "@/src/components/client-section/Header";
import { routes } from "@/src/constants/routes";
import useDebounce from "@/src/hooks/useDebounce";
import { fetchClientQuote } from "@/src/services/ClientQuote";

export default function Index() {
  const [search, setSearch] = useState<string>("");
  
  const debouncedSearch = useDebounce(search, 500) || "";

  const queryKey = ["quotes", "REQUESTED", debouncedSearch];

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey,
    queryFn: () => fetchClientQuote({ status: "REQUESTED", search: debouncedSearch }),
    placeholderData: (previousData) => previousData,
  });

  console.log(`Status: ${isLoading ? 'Loading' : 'Idle'}, Fetching: ${isFetching}, Data:`, data);

  return (
    <View style={{ flex: 1 }}>
      <Header title={"REQUESTED QUOTATION"} route={routes.CLIENT_DB} />
      
      <TextInput 
        label="Search quotes..."
        value={search} 
        onChangeText={setSearch} 
        mode="outlined"
        style={{ margin: 10, height: 50}}
      />

      {isLoading && !data ? (
        <ActivityIndicator animating={true} style={{ marginTop: 20 }} />
      ) : isError ? (
        <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error?.message}</Text>
      ) : (
        <Table/>
      )}
    </View>
  );
}