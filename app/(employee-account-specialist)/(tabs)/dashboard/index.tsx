import Handyman from "@material-symbols/svg-500/outlined/handyman.svg";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import FolderSection from "@/components/dashboard-section/FolderSection";
import UserHeader from "@/components/dashboard-section/UserHeader";

import { AS_DB_FOLDER_SECTIONS } from "@/constants/user-dashboards";
import { useAuth } from "@/hooks/useAuth";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { dashboardQueryOptions } from "@/query-options/dashboard/dashboardQueryOptions";
import type { AccountSpecialistDashboard } from "@/types/dashboard";
import { mapDashboardData } from "@/utils/mapDashboardData";

export default function Index() {
  const { userData } = useAuth();
  const { data, isPending, refetch } = useQuery({
    ...dashboardQueryOptions<AccountSpecialistDashboard>(String(userData?.id)),
    select: ({ data }) => mapDashboardData(data, AS_DB_FOLDER_SECTIONS),
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
      keyExtractor={(item) => item.title}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={{ position: "relative" }}>
          <UserHeader variant="light" />
          <Link style={styles.toolLink} href="/dashboard/tools" asChild>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Handyman width={24} height={24} fill="#3B3B3B" />
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
  itemContainer: {
    paddingHorizontal: 20,
  },
  loader: {
    flex: 1,
  },
});
