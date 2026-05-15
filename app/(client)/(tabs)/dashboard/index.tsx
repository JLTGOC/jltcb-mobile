import { useQuery } from "@tanstack/react-query";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import FolderSection from "@/components/dashboard-section/FolderSection";
import UserHeader from "@/components/dashboard-section/UserHeader";

import { CLIENT_DB_FOLDER_SECTIONS } from "@/constants/user-dashboards";
import { useAuth } from "@/hooks/useAuth";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { dashboardQueryOptions } from "@/query-options/dashboard/dashboardQueryOptions";
import type { ClientDashboard } from "@/types/dashboard";
import { mapDashboardData } from "@/utils/mapDashboardData";

export default function Index() {
  const { userData } = useAuth();
  const { data, isPending, error, refetch } = useQuery({
    ...dashboardQueryOptions<ClientDashboard>(String(userData?.id)),
    select: ({ data }) => mapDashboardData(data, CLIENT_DB_FOLDER_SECTIONS),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      contentContainerStyle={[
        styles.container,
        { flex: isPending ? 1 : undefined },
      ]}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={data?.sections}
      keyExtractor={(item) => item.title}
      ListHeaderComponent={<UserHeader />}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <FolderSection section={item} variant="dark" />
        </View>
      )}
      ListEmptyComponent={
        <ActivityIndicator style={styles.loader} size="large" />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  separator: {
    height: 20,
  },
  itemContainer: {
    paddingHorizontal: 20,
  },
  loader: {
    flex: 1,
  },
});
