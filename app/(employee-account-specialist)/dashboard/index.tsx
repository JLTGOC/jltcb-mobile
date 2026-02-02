import { Image } from "expo-image";
import { Link } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import FolderSection from "@/src/components/dashboard-section/FolderSection";
import UserHeader from "@/src/components/dashboard-section/UserHeader";
import { AS_DB_FOLDER_SECTIONS } from "@/src/constants/user-dashboards";

export default function Index() {
	return (
		<FlatList
			contentContainerStyle={{ paddingBottom: 12 }}
			keyExtractor={(item) => item.title}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			ListHeaderComponent={
				<View style={{ position: "relative" }}>
					<UserHeader variant="light" />
					<Link
						style={styles.toolLink}
						href="/(employee-account-specialist)/tools"
						asChild
					>
						<TouchableOpacity>
							<Image
								style={styles.toolsIcon}
								contentFit="contain"
								source={require("../../../src/assets/icons/tools.svg")}
							/>
						</TouchableOpacity>
					</Link>
				</View>
			}
			data={AS_DB_FOLDER_SECTIONS}
			renderItem={({ item }) => (
				<View style={styles.itemContainer}>
					<FolderSection section={item} variant="light" />
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
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
});
