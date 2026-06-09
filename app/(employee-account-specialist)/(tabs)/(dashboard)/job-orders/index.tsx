import { zodResolver } from "@hookform/resolvers/zod";
import Assignment from "@material-symbols/svg-500/outlined/assignment.svg";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { JobOrderCard } from "@/components/job-order-section/JobOrderCard";
import BannerHeader from "@/components/ui/BannerHeader";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import PageList from "@/components/ui/PageList";
import { RecordCard } from "@/components/ui/RecordCard";
import Search from "@/components/ui/Search";

import { THEMES } from "@/constants/themes";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { jobOrderQueries } from "@/queries/job-orders";
import { searchSchema, type SearchForm } from "@/schemas/searchSchema";
import { useQuery } from "@tanstack/react-query";

export default function JobOrders() {
  const router = useRouter();
  const [submittedSearch, setSubmittedSearch] = useState("");

  const { control, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = handleSubmit(({ search }) => {
    setSubmittedSearch(search);
  });

  const { data, isPending, refetch, error } = useQuery(
    jobOrderQueries.list({
      search: submittedSearch,
    }),
  );

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  return (
    <PageList
      data={data?.data.job_orders}
      ListHeaderComponent={
        <View style={{ backgroundColor: THEMES.pageBackgroundColor }}>
          <BannerHeader variant="light" title="List of Job Order" />
          <Controller
            control={control}
            name="search"
            render={({ field: { onChange, onBlur, value } }) => (
              <Search
                variant="dark"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                onSearch={onSubmit}
              />
            )}
          />
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      renderItem={({ item }) => (
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

              <RecordCard.Details>
                <RecordCard.Detail
                  label={
                    <RecordCard.DetailText>Date Created</RecordCard.DetailText>
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
              </RecordCard.Details>
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
              <RecordCard.FooterButton
                onPress={() =>
                  router.push({
                    pathname: "/job-orders/quotations/[quotationId]",
                    params: {
                      quotationId: item.quotation_id,
                    },
                  })
                }
              >
                View Details
              </RecordCard.FooterButton>
            </RecordCard.Footer>
          </Card.Root>
        </JobOrderCard.Provider>
      )}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      ListEmptyComponent={() => {
        if (isPending) {
          return (
            <View style={styles.emptyComponentContainer}>
              <ActivityIndicator size="large" />
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
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  itemSeparator: {
    height: 10,
  },
  emptyComponentContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
