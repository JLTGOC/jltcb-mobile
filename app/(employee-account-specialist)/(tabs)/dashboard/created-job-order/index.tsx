import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import * as z from "zod";

import JobOrderCard from "@/src/components/job-order-section/JobOrderCard";
import BannerHeader from "@/src/components/ui/BannerHeader";
import PageList from "@/src/components/ui/PageList";
import Search from "@/src/components/ui/Search";

import { THEMES } from "@/src/constants/themes";
import { useRefreshByUser } from "@/src/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/src/hooks/useRefreshOnFocus";
import { jobOrderKeys } from "@/src/query-key-factories/jobOrders";
import { apiGet } from "@/src/services/axiosInstance";
import type { JobOrderResponse } from "@/src/types/job-order";

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
          <JobOrderCard
            jobOrder={item}
            actions={[{ label: "View Details", onPress: () => {} }]}
            onViewJo={() =>
              router.push({
                pathname:
                  "/(employee-account-specialist)/(tabs)/dashboard/created-job-order/[id]",
                params: {
                  referenceNumber: item.reference_number,
                  id: item.id,
                  service: item.service,
                },
              })
            }
          />
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
