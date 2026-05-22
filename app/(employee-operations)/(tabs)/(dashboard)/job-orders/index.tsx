import { zodResolver } from "@hookform/resolvers/zod";
import Assignment from "@material-symbols/svg-500/outlined/assignment.svg";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import * as z from "zod";

import { JobOrderCard } from "@/components/job-order-section/JobOrderCard";
import BannerHeader from "@/components/ui/BannerHeader";
import Button from "@/components/ui/Button";
import PageList from "@/components/ui/PageList";
import Search from "@/components/ui/Search";
import SwitchToggle from "@/components/ui/SwitchToggle";

import { THEMES } from "@/constants/themes";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { jobOrdersQueryOptions } from "@/query-options/job-orders/jobOrdersQueryOptions";

type JobFilterOption = "all" | "my-jobs";

const searchSchema = z.object({
  search: z.string().trim(),
});

export default function CreatedJobOrders() {
  const { tab = "all", status } = useLocalSearchParams<{
    tab?: JobFilterOption;
    status: "created" | "processed";
  }>();
  const router = useRouter();

  const [submittedSearch, setSubmittedSearch] = useState("");

  const { control, handleSubmit } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const { data, isPending, error, refetch } = useQuery(
    jobOrdersQueryOptions({
      filter: {
        completion_status: status === "created" ? "CREATED" : "PROCESSED",
      },
      ...(submittedSearch && { search: submittedSearch }),
    }),
  );

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const onSubmit = handleSubmit(({ search }) => {
    setSubmittedSearch(search);
  });

  const jobOrders = data?.data.job_orders ?? [];
  const myJobOrders = data?.data.my_job_orders ?? [];

  const filteredData = tab === "my-jobs" ? myJobOrders : jobOrders;

  return (
    <PageList
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View style={{ backgroundColor: THEMES.pageBackgroundColor }}>
          <BannerHeader
            variant="light"
            title={`${status === "created" ? "Pending" : "Processed"} Job Orders`}
          />

          <Controller
            control={control}
            name="search"
            render={({ field: { onChange, onBlur, value } }) => (
              <Search
                variant="dark"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSearch={onSubmit}
                onSubmitEditing={onSubmit}
                containerStyle={{
                  marginHorizontal: 16,
                  marginBottom: 20,
                }}
              />
            )}
          />

          <SwitchToggle
            value={tab}
            onValueChange={(value) => router.setParams({ tab: value })}
            options={[
              { label: "ALL", value: "all" },
              { label: "MY JOBS", value: "my-jobs" },
            ]}
          />
        </View>
      }
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => (
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
        >
          <JobOrderCard.Root>
            <JobOrderCard.Header>
              <Assignment width={24} height={24} />

              <JobOrderCard.HeaderTitle>
                {item.reference_number}
              </JobOrderCard.HeaderTitle>

              <JobOrderCard.Badge label={item.service} />
            </JobOrderCard.Header>

            <JobOrderCard.Content>
              <JobOrderCard.ContentTitle>
                {item.client}
              </JobOrderCard.ContentTitle>

              <View style={{ gap: 4 }}>
                <JobOrderCard.DetailRow
                  label="Date Created"
                  value={item.date_created}
                />

                <JobOrderCard.DetailRow
                  label="Quotation Source"
                  value={item.quotation_reference_number}
                />

                {item.assigned_to !== "Available" && (
                  <JobOrderCard.DetailRow
                    label="Assigned"
                    value={item.assigned_to}
                    valueStyle={{ color: "#4A7AFF" }}
                  />
                )}
              </View>
            </JobOrderCard.Content>

            <JobOrderCard.Footer>
              <JobOrderCard.Action
                first
                onPress={() =>
                  router.push({
                    pathname: "/job-orders/[jobOrderId]",
                    params: {
                      jobOrderId: item.id,
                      quotationId: item.quotation_id,
                      referenceNumber: item.reference_number,
                      service: item.service,
                      bannerTitle: item.reference_number,
                    },
                  })
                }
              >
                View JO
              </JobOrderCard.Action>
            </JobOrderCard.Footer>
          </JobOrderCard.Root>
        </View>
      )}
      ListEmptyComponent={() => {
        if (isPending) {
          return (
            <View style={styles.emptyComponentContainer}>
              <ActivityIndicator size="large" style={{ flex: 1 }} />
            </View>
          );
        }

        if (error) {
          return (
            <View style={{ marginTop: 20, alignItems: "center", gap: 12 }}>
              <Text>Something went wrong.</Text>
              <Button onPress={() => refetch()}>Retry</Button>
            </View>
          );
        }

        return (
          <Text style={{ textAlign: "center" }}>No job orders found.</Text>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  emptyComponentContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
});
