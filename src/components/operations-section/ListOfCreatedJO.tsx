import { createdJobOrdersQueryOptions } from "@/src/query-options/operations/jobOrder";
import type { JobOrder } from "@/src/types/job-order";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import JobOrderCardTemplate from "./JobOrderCardTemplate";

export default function ListOfCreatedJO() {
  const { data, isPending, error, refetch } = useQuery(
    createdJobOrdersQueryOptions({ status: "created" }),
  );

  console.log("khate", data);

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
      <FlatList
        style={{ flex: 1 }}
        data={data}
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
