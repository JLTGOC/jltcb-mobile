import { zodResolver } from "@hookform/resolvers/zod";
import Assignment from "@material-symbols/svg-500/outlined/assignment.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import { JobOrderCard } from "@/components/job-order-section/JobOrderCard";
import BannerHeader from "@/components/ui/BannerHeader";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import PageList from "@/components/ui/PageList";
import { RecordCard } from "@/components/ui/RecordCard";
import Search from "@/components/ui/Search";
import SwitchToggle from "@/components/ui/SwitchToggle";

import { THEMES } from "@/constants/themes";
import { useAcceptJobOrderMutation } from "@/hooks/mutations/job-orders/useAcceptJobOrderMutation";
import { useAuth } from "@/hooks/useAuth";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { jobOrderQueries } from "@/queries/job-orders";
import { searchSchema, type SearchForm } from "@/schemas/searchSchema";
import { showToast } from "@/utils/showToast";
import { useQuery } from "@tanstack/react-query";

type JobFilterOption = "all" | "my-jobs";

export default function JobOrders() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { role } = useAuth();
  const { tab = "all", status } = useLocalSearchParams<{
    tab?: JobFilterOption;
    status: "created" | "processed";
  }>();
  const router = useRouter();

  const [submittedSearch, setSubmittedSearch] = useState("");

  const { mutate: acceptJobOrder, variables: acceptJobOrderVariables } =
    useAcceptJobOrderMutation();

  const { control, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const { data, isPending, error, refetch } = useQuery(
    jobOrderQueries.list({
      filter: {
        completion_status: status === "created" ? "CREATED" : "PROCESSED",
      },
      search: submittedSearch,
    }),
  );

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const onSubmit = handleSubmit(({ search }) => {
    setSubmittedSearch(search);
  });

  const handleAcceptJobOrder = (jobOrderId: number) => {
    acceptJobOrder(jobOrderId, {
      onSuccess: () => {
        showToast("Job order accepted successfully.");
      },
      onError: (err) => {
        showToast("Error accepting job order. Please try again.");
        console.error("Error accepting job order:", err);
      },
    });
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
        const isAcceptingJobOrder = acceptJobOrderVariables === item.id;

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
                  <RecordCard.Detail
                    label={
                      <RecordCard.DetailText>
                        Date Created
                      </RecordCard.DetailText>
                    }
                    value={<JobOrderCard.DetailValue valueKey="date_created" />}
                  />

                  <RecordCard.Detail
                    label={
                      <RecordCard.DetailText>
                        Quotation Reference
                      </RecordCard.DetailText>
                    }
                    value={
                      <JobOrderCard.DetailValue valueKey="quotation_reference_number" />
                    }
                  />

                  {item.assigned_to !== "Available" && (
                    <RecordCard.Detail
                      label={
                        <RecordCard.DetailText>Assigned</RecordCard.DetailText>
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
