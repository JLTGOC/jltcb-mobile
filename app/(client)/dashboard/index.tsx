import { FlatList, StyleSheet, View } from "react-native";
import FolderSection from "@/src/components/dashboard-section/FolderSection";
import UserHeader from "@/src/components/dashboard-section/UserHeader";
import { CLIENT_DB_FOLDER_SECTIONS } from "@/src/constants/user-dashboards";

export default function Index() {
	return (
		<FlatList
			contentContainerStyle={{ paddingBottom: 12 }}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			data={CLIENT_DB_FOLDER_SECTIONS}
			keyExtractor={(item) => item.title}
			ListHeaderComponent={<UserHeader />}
			renderItem={({ item }) => (
				<View style={styles.itemContainer}>
					<FolderSection section={item} variant="dark" />
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	separator: {
		height: 20,
	},
	itemContainer: {
		paddingHorizontal: 20,
	},
});
