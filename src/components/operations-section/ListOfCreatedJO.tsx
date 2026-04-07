import { createdJobOrdersQueryOptions } from "@/src/query-options/operations/jobOrder";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import BannerHeader from "@/src/components/ui/BannerHeader";
import Search from "../ui/Search";
import SwitchToggle from "../ui/SwitchToggle";
import JobOrderCardTemplate from "./JobOrderCardTemplate";

export default function ListOfCreatedJO() {
  const [search, setSearch] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const { data, isPending, error, refetch } = useQuery(
    createdJobOrdersQueryOptions({ status: "created" }),
  );

  const handleSearch = () => {
    setSubmittedSearch(search.trim());
  };

  if (isPending) {
    return <ActivityIndicator style={{ marginTop: 16 }} />;
  }

  if (error) {
    return (
      <View style={{ marginTop: 16, paddingHorizontal: 12 }}>
        <Text>Failed to load job orders.</Text>
        <Text
          onPress={() => refetch()}
          style={{ color: "#1F6FFF", marginTop: 8 }}
        >
          Retry
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <BannerHeader variant="light" title="List of Pending Job Orders" />

      <Search
        onSearch={handleSearch}
        onChangeText={setSearch}
        value={search}
        placeholder="SEARCH QUOTATION"
        autoCapitalize="none"
        placeholderTextColor="black"
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        containerStyle={{
          marginHorizontal: 16,
          marginBottom: 20,
          backgroundColor: "#F8F8F8",
        }}
      />

      <FlatList
        style={{ flex: 1 }}
        data={data ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobOrderCardTemplate
            referenceNumber={item.reference_number}
            serviceType={item.service}
            clientName={item.client}
            dateCreated={item.date_created}
            quotationSource={String(item.quotation_id)}
            assignedTo={item.assigned_to}
            assignedColor={
              item.assigned_to.toLowerCase() === "available"
                ? "#16A34A"
                : "#1F6FFF"
            }
          />
        )}
      />
    </View>
  );
}
