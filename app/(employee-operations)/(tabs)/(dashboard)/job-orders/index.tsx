import { zodResolver } from "@hookform/resolvers/zod";
import Assignment from "@material-symbols/svg-500/outlined/assignment.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import * as z from "zod";

import { JobOrderCard } from "@/components/job-order-section/JobOrderCard";
import BannerHeader from "@/components/ui/BannerHeader";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import PageList from "@/components/ui/PageList";
import { RecordCard } from "@/components/ui/RecordCard";
import Search from "@/components/ui/Search";
import SwitchToggle from "@/components/ui/SwitchToggle";

import { THEMES } from "@/constants/themes";
import { useAcceptJobOrderMutation } from "@/hooks/useAcceptJobOrderMutation";
import { useAuth } from "@/hooks/useAuth";
import { useJobOrdersQuery } from "@/hooks/useJobOrdersQuery";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { showToast } from "@/utils/showToast";

type JobFilterOption = "all" | "my-jobs";

const searchSchema = z.object({
  search: z.string().trim(),
});

export default function JobOrders() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { role } = useAuth();
  const { tab = "all", status } = useLocalSearchParams<{
    tab?: JobFilterOption;
    status: "created" | "processed";
  }>();
  const router = useRouter();

  const [submittedSearch, setSubmittedSearch] = useState("");

  const { mutateAsync, variables: acceptJobOrderVariables } =
    useAcceptJobOrderMutation();

  const { control, handleSubmit } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const { data, isPending, error, refetch, isFetching } = useJobOrdersQuery({
    filter: {
      completion_status: status === "created" ? "CREATED" : "PROCESSED",
    },
    search: submittedSearch,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const onSubmit = handleSubmit(({ search }) => {
    setSubmittedSearch(search);
  });

  const handleAcceptJobOrder = async (jobOrderId: number) => {
    try {
      await mutateAsync(jobOrderId);
      showToast("Job order accepted successfully.");
    } catch (err) {
      showToast("Error accepting job order. Please try again.");
      console.error("Error accepting job order:", err);
    }
  };

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
      renderItem={({ item }) => {
        const isAcceptingJobOrder =
          isFetching && acceptJobOrderVariables === item.id;

        return (
          <JobOrderCard.Provider jobOrder={item}>
            <Card.Root style={styles.itemContainer}>
              <Card.Header>
                <Assignment width={24} height={24} />
                <JobOrderCard.Title />
                <Card.Action>
                  <JobOrderCard.Badge />
                </Card.Action>
              </Card.Header>

              <Card.Content>
                <JobOrderCard.ContentTitle />

                <View style={{ gap: 4 }}>
                  <JobOrderCard.Detail
                    label={
                      <JobOrderCard.DetailLabel>
                        Date Created
                      </JobOrderCard.DetailLabel>
                    }
                    value={<JobOrderCard.DetailValue valueKey="date_created" />}
                  />

                  <JobOrderCard.Detail
                    label={
                      <JobOrderCard.DetailLabel>
                        Quotation Reference
                      </JobOrderCard.DetailLabel>
                    }
                    value={
                      <JobOrderCard.DetailValue valueKey="quotation_reference_number" />
                    }
                  />

                  {item.assigned_to !== "Available" && (
                    <JobOrderCard.Detail
                      label={
                        <JobOrderCard.DetailLabel>
                          Assigned
                        </JobOrderCard.DetailLabel>
                      }
                      value={
                        <JobOrderCard.DetailValue
                          valueKey="assigned_to"
                          style={{ color: "#4A7AFF" }}
                        />
                      }
                    />
                  )}
                </View>
              </Card.Content>

              <RecordCard.Footer>
                <RecordCard.FooterButton
                  onPress={() =>
                    router.push({
                      pathname: "/job-orders/[jobOrderId]",
                      params: {
                        jobOrderId: item.id,
                      },
                    })
                  }
                >
                  View JO
                </RecordCard.FooterButton>
                {/* TODO: Implement reassignment functionality */}
                {/* {item.reassignment_request_id && role === "Lead Operations" && (
                  <JobOrderCard.Action>Reassign</JobOrderCard.Action>
                )} */}
                {item.assigned_to === "Available" && (
                  <RecordCard.FooterButton
                    disabled={isAcceptingJobOrder}
                    loading={isAcceptingJobOrder}
                    onPress={() => handleAcceptJobOrder(item.id)}
                  >
                    Accept
                  </RecordCard.FooterButton>
                )}
              </RecordCard.Footer>
            </Card.Root>
          </JobOrderCard.Provider>
        );
      }}
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
  itemContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});
