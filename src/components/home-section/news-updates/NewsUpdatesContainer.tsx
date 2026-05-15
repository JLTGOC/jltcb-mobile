import { StyleSheet, Text, View } from "react-native";

import NewsTabButtons from "./NewsTabButtons";

export default function NewsUpdatesContainer() {
	return (
		<View style={styles.container}>
			<Text style={styles.title} allowFontScaling={false}>
				News and Updates
			</Text>
			<NewsTabButtons />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 10,
	},
	title: {
		fontSize: 18,
	},
});
