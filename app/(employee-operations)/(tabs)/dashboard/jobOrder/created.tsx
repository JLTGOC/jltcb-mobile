import { createdJobOrdersQueryOptions } from "@/src/query-options/operations/jobOrder";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, View, Pressable } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useRouter } from "expo-router";

import BannerHeader from "@/src/components/ui/BannerHeader";
import Search from "@/src/components/ui/Search";
import SwitchToggle from "@/src/components/ui/SwitchToggle";
import JobOrderListCardTemplate from "@/src/components/operations-section/JobOrderListCardTemplate";

export default function ListOfCreatedJO() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [jobFilter, setJobFilter] = useState<"all" | "my_jobs">("all");

  const { data, isPending, error, refetch } = useQuery(
    createdJobOrdersQueryOptions({ status: "created" }),
  );

  console.log("khate-ops", data);

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
          data={data.job_orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(
              "/(employee-operations)/(tabs)/dashboard/jobOrder/[id]/details"
            )}>
              <JobOrderListCardTemplate
                referenceNumber={item.reference_number}
                serviceType={item.service}
                clientName={item.client}
                dateCreated={item.date_created}
                quotationSource={String(item.quotation_id)}
                assignedTo={item.assigned_to}
                assignedColor={
                  item.assigned_to === "Available"
                    ? "#16A34A"
                    : "#1F6FFF"
                }
                rightActionLabel={
                  item.assigned_to === "Available"
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
