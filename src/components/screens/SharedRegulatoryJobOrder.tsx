import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { type FlatListProps, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import BannerHeader from "@/components/ui/BannerHeader";
import PageList from "@/components/ui/PageList";
import SubjectCard from "@/components/ui/SubjectCard";
import SummaryCard from "@/components/ui/SummaryCard";

import { THEMES } from "@/constants/themes";
import { jobOrderQueryOptions } from "@/query-options/job-orders/jobOrderQueryOptions";
import type { RegulatoryJobOrder, SummaryCardData } from "@/types/job-order";
import { buildSummaryItems } from "@/utils/summaryItems";

const COLOR = "#4E6174";

export default function SharedRegulatoryJobOrder({
  ...props
}: Partial<Omit<FlatListProps<any>, "data" | "renderItem">>) {
  const { referenceNumber, id } = useLocalSearchParams<{
    referenceNumber: string;
    id: string;
  }>();

  const { data, isPending } = useQuery(
    jobOrderQueryOptions<RegulatoryJobOrder>(Number(id)),
  );

  const summaryCardsData: SummaryCardData[] =
    !isPending && data
      ? [
          {
            title: "Client Information",
            renderIcon: () => (
              <MaterialIcons name="person-outline" size={20} color={COLOR} />
            ),
            content: [
              {
                label: "Client Type",
                value: data.data.client.client_type,
              },
              {
                label: "Service",
                value: data.data.client.service_type,
              },
              {
                label: "Processing Type",
                value: data.data.client.accredited.toUpperCase(),
              },
              {
                label: "Remarks On Handling Client",
                value: data.data.client.remarks,
              },
            ],
          },
        ]
      : [];

  const listData = data ? buildSummaryItems(summaryCardsData) : [];

  return (
    <PageList
      ListHeaderComponent={
        <View style={{ backgroundColor: THEMES.pageBackgroundColor }}>
          <BannerHeader variant="light" title={referenceNumber} />
        </View>
      }
      data={listData}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          {item.type === "subject" ? (
            <SubjectCard
              subject={data?.data.subject ?? ""}
              body={data?.data.email_body ?? ""}
            />
          ) : (
            <SummaryCard item={item.item} />
          )}
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      ListEmptyComponent={() => {
        if (isPending) {
          return (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" />
            </View>
          );
        }
      }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  upper: {
    textTransform: "uppercase",
  },
  itemContainer: {
    marginHorizontal: 20,
  },
  contentLabel: {
    color: "#979797",
  },
  flexLabel: {
    width: "40%",
  },
  flexContent: {
    flex: 1,
  },
  itemSeparator: {
    height: 10,
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
  },
});
