import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import type { BaseFolderSection } from "@/src/types/dashboard";
import FolderButton from "./FolderButton";

type FolderSectionProps = {
	section: BaseFolderSection;
	variant: "light" | "dark";
};

export default function FolderSection({
	section,
	variant = "dark",
}: FolderSectionProps) {
	return (
		<View>
			<Text style={styles.sectionTitle} variant="titleLarge">
				{section.title}
			</Text>
			<Divider />

			<View style={styles.foldersContainer}>
				{section.data.map((item) => (
					<Link key={section.title + item.title} href={item.href} asChild>
						<FolderButton folder={item} variant={variant} />
					</Link>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	foldersContainer: {
		marginTop: 6,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	sectionTitle: {
		textTransform: "uppercase",
		fontWeight: "600",
		marginBottom: 4,
	},
});
