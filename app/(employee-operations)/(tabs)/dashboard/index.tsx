import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import FolderSection from "@/src/components/dashboard-section/FolderSection";
import UserHeader from "@/src/components/dashboard-section/UserHeader";

import { OPERATIONS_DB_FOLDER_SECTION } from "@/src/constants/user-dashboards";
import { useAuth } from "@/src/hooks/useAuth";
import { useRefreshByUser } from "@/src/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/src/hooks/useRefreshOnFocus";
import { dashboardQueryOptions } from "@/src/query-options/dashboard/dashboardQueryOptions";
import type { OperationsDashboard } from "@/src/types/dashboard";
import { mapDashboardData } from "@/src/utils/mapDashboardData";

export default function Index() {
  const { userData } = useAuth();
  const { data, isPending, error, refetch } = useQuery({
    ...dashboardQueryOptions<OperationsDashboard>(String(userData?.id)),
    select: ({ data }) => mapDashboardData(data, OPERATIONS_DB_FOLDER_SECTION),
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
              <Image
                style={styles.toolsIcon}
                contentFit="contain"
                source={require("@/src/assets/icons/tools.svg")}
              />
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
  toolsIcon: {
    height: 24,
    width: 24,
  },
  itemContainer: {
    paddingHorizontal: 20,
  },
  loader: {
    flex: 1,
  },
});
