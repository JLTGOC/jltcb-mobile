import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import * as z from "zod";

import BannerHeader from "@/components/ui/BannerHeader";
import PageList from "@/components/ui/PageList";
import Search from "@/components/ui/Search";

import { JobOrderCard } from "@/components/job-order-section/JobOrderCard";
import { THEMES } from "@/constants/themes";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { jobOrderKeys } from "@/query-key-factories/jobOrders";
import { apiGet } from "@/services/axiosInstance";
import type { JobOrderResponse } from "@/types/job-order";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const searchSchema = z.object({
  search: z.string().trim(),
});

export default function JobOrderList() {
  const router = useRouter();
  const [submittedSearch, setSubmittedSearch] = useState("");

  const { control, handleSubmit } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = handleSubmit(({ search }) => {
    setSubmittedSearch(search);
  });

  const { data, isPending, refetch } = useQuery({
    queryKey: jobOrderKeys.list(submittedSearch),
    queryFn: () =>
      apiGet<JobOrderResponse>("job-orders", {
        ...(submittedSearch ? { params: { search: submittedSearch } } : {}),
      }),
  });

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
        <View style={styles.itemContainer}>
          <JobOrderCard.Root>
            <JobOrderCard.Header>
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={24}
                color="black"
              />
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
                    label="Assigned To"
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
                    pathname: "/dashboard/created-job-order/[id]",
                    params: {
                      id: item.id,
                      referenceNumber: item.reference_number,
                      service: item.service,
                    },
                  })
                }
              >
                View JO
              </JobOrderCard.Action>
              <JobOrderCard.Action
                onPress={() =>
                  router.push({
                    pathname: "/dashboard/created-job-order/quotation/[id]",
                    params: { id: item.quotation_id, bannerTitle: item.client },
                  })
                }
              >
                View Details
              </JobOrderCard.Action>
            </JobOrderCard.Footer>
          </JobOrderCard.Root>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      ListEmptyComponent={
        isPending ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <Text style={{ textAlign: "center" }}>No results found</Text>
        )
      }
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
});
