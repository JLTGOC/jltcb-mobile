import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import FolderSection from "@/src/components/dashboard-section/FolderSection";
import UserHeader from "@/src/components/dashboard-section/UserHeader";
import { CLIENT_DB_FOLDER_SECTIONS } from "@/src/constants/user-dashboards";
import { useAuth } from "@/src/hooks/useAuth";
import { dashboardQueryOptions } from "@/src/query-options/dashboard/dashboardQueryOptions";
import type { ClientDashboard } from "@/src/types/dashboard";
import { mapDashboardData } from "@/src/utils/mapDashboardData";

export default function Index() {
	const { userData } = useAuth();
	const { data, isPending, error } = useQuery({
		...dashboardQueryOptions<ClientDashboard>(userData?.id),
		select: ({ data }) => mapDashboardData(data, CLIENT_DB_FOLDER_SECTIONS),
	});

	return (
		<FlatList
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
