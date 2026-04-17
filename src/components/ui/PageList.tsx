import { FlatList, type FlatListProps, StyleSheet } from "react-native";
import { THEMES } from "@/src/constants/themes";

export default function PageList<T>({
	contentContainerStyle,
	...props
}: FlatListProps<T>) {
	return (
		<FlatList
			contentContainerStyle={[
				styles.listContentContainer,
				contentContainerStyle,
			]}
			keyboardShouldPersistTaps="handled"
			overScrollMode="never"
			bounces={false}
			stickyHeaderIndices={[0]}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	listContentContainer: {
		paddingBottom: 20,
		backgroundColor: THEMES.pageBackgroundColor,
	},
});
