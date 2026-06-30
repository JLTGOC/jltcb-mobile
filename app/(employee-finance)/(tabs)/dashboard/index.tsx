<<<<<<< HEAD
import FolderSection from "@/src/components/dashboard-section/FolderSection";
import UserHeader from "@/src/components/dashboard-section/UserHeader";
import { FINANCE_DB_FOLDER_SECTION } from "@/src/constants/user-dashboards";
import { useAuth } from "@/src/hooks/useAuth";
import { dashboardQueryOptions } from "@/src/query-options/dashboard/dashboardQueryOptions";
import type { FinanceDashboard } from "@/src/types/dashboard";
import { mapDashboardData } from "@/src/utils/mapDashboardData";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Pressable,
=======
import Handyman from "@material-symbols/svg-500/outlined/handyman.svg";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

<<<<<<< HEAD
export default function Index() {
  const { userData } = useAuth();
  const { data, isPending, error, isRefetching, refetch } = useQuery({
    ...dashboardQueryOptions<FinanceDashboard>(String(userData?.id)),
    select: ({ data }) => mapDashboardData(data, FINANCE_DB_FOLDER_SECTION),
  });

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
=======
import FolderSection from "@/components/dashboard-section/FolderSection";
import UserHeader from "@/components/dashboard-section/UserHeader";

import { FINANCE_DB_FOLDER_SECTION } from "@/constants/user-dashboards";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { dashboardQueries } from "@/queries/dashboard";
import type { FinanceDashboard } from "@/types/dashboard";
import { mapDashboardData } from "@/utils/mapDashboardData";

export default function Index() {
  const { data, isPending, refetch } = useQuery({
    ...dashboardQueries.detail<FinanceDashboard>(),
    select: ({ data }) => mapDashboardData(data, FINANCE_DB_FOLDER_SECTION),
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
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
      }
      contentContainerStyle={[
        styles.container,
        { flex: isPending ? 1 : undefined },
      ]}
      keyExtractor={(item) => item.title}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={{ position: "relative" }}>
          <UserHeader variant="light" />
<<<<<<< HEAD
          <Link style={styles.toolLink} href="/dashboard/tools" asChild>
=======
          <Link style={styles.toolLink} href="/tools" asChild>
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
<<<<<<< HEAD
              <Image
                style={styles.toolsIcon}
                contentFit="contain"
                source={require("@/src/assets/icons/tools.svg")}
              />
=======
              <Handyman width={24} height={24} fill="#3B3B3B" />
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
            </Pressable>
          </Link>
        </View>
      }
      data={data?.sections}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <FolderSection section={item} variant="light" />
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
  toolLink: {
    position: "absolute",
    bottom: 0,
    right: 20,
  },
<<<<<<< HEAD
  toolsIcon: {
    height: 24,
    width: 24,
  },
=======
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  itemContainer: {
    paddingHorizontal: 20,
  },
  loader: {
    flex: 1,
  },
});
