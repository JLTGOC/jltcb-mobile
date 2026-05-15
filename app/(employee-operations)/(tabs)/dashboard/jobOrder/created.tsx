import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import JobOrderListCardTemplate from "@/components/operations-section/JobOrderListCardTemplate";
import BannerHeader from "@/components/ui/BannerHeader";
import Search from "@/components/ui/Search";
import SwitchToggle from "@/components/ui/SwitchToggle";

import { createdJobOrdersQueryOptions } from "@/query-options/operations/jobOrder";

export default function ListOfCreatedJO() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [jobFilter, setJobFilter] = useState<"all" | "my_jobs">("all");

  const { data, isPending, error, refetch } = useQuery(
    createdJobOrdersQueryOptions({ status: "created" }),
  );

  console.log("khate", data);

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
        variant="dark"
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

      <SwitchToggle
        value={jobFilter}
        onValueChange={(value) => setJobFilter(value as "all" | "my_jobs")}
        options={[
          { label: "ALL", value: "all" },
          { label: "MY JOBS", value: "my_jobs" },
        ]}
      />

      {/* ALL */}
      {jobFilter === "all" ? (
        <FlatList
          style={{ flex: 1 }}
          data={data ?? []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push(
                  "/(employee-operations)/(tabs)/dashboard/jobOrder/[id]/details",
                )
              }
            >
              <JobOrderListCardTemplate
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
                rightActionLabel={
                  item.assigned_to.toLowerCase() === "available"
                    ? "ACCEPT"
                    : "REASSIGN"
                }
              />
            </Pressable>
          )}
        />
      ) : (
        <>
          <Text>Not yet implemented</Text>
        </>
      )}
    </View>
  );
}
