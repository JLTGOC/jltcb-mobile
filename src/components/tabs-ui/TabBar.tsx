import { FlatList, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

import { THEMES } from "@/constants/themes";

interface TabBarProps<T extends string> {
	tabs: readonly T[];
	activeTab: T;
	onTabChange: (tab: T) => void;
}

export default function TabBar<T extends string>({
	tabs,
	activeTab,
	onTabChange,
}: TabBarProps<T>) {
	return (
		<FlatList
			style={styles.tabs}
			contentContainerStyle={styles.tabsContentContainer}
			horizontal
			showsHorizontalScrollIndicator={false}
			data={tabs}
			nestedScrollEnabled
			renderItem={({ item: tab }) => {
				const isActive = tab === activeTab;

				return (
					<Pressable
						onPress={() => onTabChange(tab)}
						style={({ pressed }) => [
							styles.tabButton,
							{ opacity: pressed ? 0.7 : 1 },
						]}
					>
						<Text
							style={[
								styles.tabText,
								{ color: isActive ? "#3B3B3B" : "#9D9D9D" },
							]}
						>
							{tab}
						</Text>
						{isActive && <View style={styles.underline} />}
					</Pressable>
				);
			}}
		/>
	);
}

const styles = StyleSheet.create({
	tabs: {
		backgroundColor: THEMES.pageBackgroundColor,
		paddingHorizontal: 20,
	},
	tabsContentContainer: {
		borderBottomWidth: 2,
		flex: 1,
		borderBottomColor: "#ACACAC",
	},
	tabButton: {
		paddingVertical: 2,
		minWidth: 72,
		paddingHorizontal: 20,
	},
	tabText: {
		textAlign: "center",
		textTransform: "uppercase",
	},
	underline: {
		height: 2,
		backgroundColor: "#FF9933",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: -2,
	},
});
