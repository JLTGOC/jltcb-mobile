import Handyman from "@material-symbols/svg-500/outlined/handyman.svg";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
<<<<<<< HEAD:app/(employee-account-specialist)/(tabs)/dashboard/index.tsx
  Pressable,
=======
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0:app/(employee-account-specialist)/(tabs)/(dashboard)/index.tsx
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import FolderSection from "@/components/dashboard-section/FolderSection";
import UserHeader from "@/components/dashboard-section/UserHeader";

import { AS_DB_FOLDER_SECTIONS } from "@/constants/user-dashboards";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { dashboardQueries } from "@/queries/dashboard";
import type { AccountSpecialistDashboard } from "@/types/dashboard";
import { mapDashboardData } from "@/utils/mapDashboardData";

export default function Index() {
  const { data, isPending, refetch } = useQuery({
    ...dashboardQueries.detail<AccountSpecialistDashboard>(),
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
<<<<<<< HEAD:app/(employee-account-specialist)/(tabs)/dashboard/index.tsx
          <Link style={styles.toolLink} href="/dashboard/tools" asChild>
=======
          <Link style={styles.toolLink} href="/tools" asChild>
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0:app/(employee-account-specialist)/(tabs)/(dashboard)/index.tsx
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
<<<<<<< HEAD:app/(employee-account-specialist)/(tabs)/dashboard/index.tsx
              <Image
                style={styles.toolsIcon}
                contentFit="contain"
                source={require("@/src/assets/icons/tools.svg")}
              />
=======
              <Handyman width={24} height={24} fill="#3B3B3B" />
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0:app/(employee-account-specialist)/(tabs)/(dashboard)/index.tsx
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
