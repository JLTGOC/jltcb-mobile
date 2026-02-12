import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Menu, Text } from "react-native-paper";
import type { Document } from "@/src/types/quotations";

const MENUS = [
	{
		leadingIcon: "eye",
		title: "View",
		onPress: () => {},
	},
	{
		leadingIcon: "printer",
		title: "Print",
		onPress: () => {},
	},
];

interface QuotationRequestDocumentCardProps {
	document: Document;
}

export default function QuotationRequestDocumentCard({
	document,
}: QuotationRequestDocumentCardProps) {
	const [visible, setVisible] = useState(false);

	return (
		<View style={styles.container}>
			<View style={styles.icon}></View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{document.file_name}</Text>
				{/*<Text>{document.date}</Text>*/}
			</View>
			<Menu
				anchor={
					<IconButton
						icon="dots-vertical"
						size={20}
						onPress={() => setVisible(true)}
					/>
				}
				visible={visible}
				onDismiss={() => setVisible(false)}
				anchorPosition="bottom"
			>
				{MENUS.map((menu) => (
					<Menu.Item
						key={menu.title}
						title={menu.title}
						onPress={menu.onPress}
						leadingIcon={menu.leadingIcon}
					/>
				))}
			</Menu>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	icon: {
		width: 50,
	},
	textContainer: { flex: 1 },
	title: {
		color: "black",
	},
});
