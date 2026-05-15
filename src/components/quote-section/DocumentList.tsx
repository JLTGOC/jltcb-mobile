import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { File } from "@/types";

interface Props {
	documents: File[];
	onDelete: (document: File) => void;
}

export default function DocumentList({ documents, onDelete }: Props) {
	return (
		<View style={styles.container}>
			{documents.map((item) => (
				<View style={styles.row} key={item.uri}>
					{/* File type icon badge */}
					<View style={styles.iconBadge}>
						<MaterialIcons name="insert-drive-file" size={18} color="#6366f1" />
					</View>

					{/* File info */}
					<View style={styles.textContainer}>
						<Text style={styles.fileName} numberOfLines={1}>
							{item.name}
						</Text>
						{item.mimeType && (
							<Text style={styles.mimeType} numberOfLines={1}>
								{item.mimeType}
							</Text>
						)}
					</View>

					{/* Delete button */}
					<Pressable
						style={({ pressed }) => [
							styles.deleteButton,
							pressed && styles.deleteButtonPressed,
						]}
						onPress={() => onDelete(item)}
					>
						<MaterialIcons name="delete-outline" size={20} color="#ef4444" />
					</Pressable>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
		paddingVertical: 4,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#ffffff",
		borderRadius: 6,
		paddingVertical: 12,
		paddingHorizontal: 14,
		gap: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
		borderWidth: 1,
		borderColor: "#f1f1f4",
	},
	iconBadge: {
		width: 36,
		height: 36,
		borderRadius: 4,
		backgroundColor: "#eef2ff",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	textContainer: {
		flex: 1,
		gap: 2,
	},
	fileName: {
		fontSize: 14,
		fontWeight: "600",
		color: "#111827",
		letterSpacing: -0.1,
	},
	mimeType: {
		fontSize: 11,
		color: "#9ca3af",
		textTransform: "uppercase",
		letterSpacing: 0.4,
		fontWeight: "500",
	},
	deleteButton: {
		width: 34,
		height: 34,
		borderRadius: 4,
		backgroundColor: "#fef2f2",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	deleteButtonPressed: {
		backgroundColor: "#fee2e2",
		transform: [{ scale: 0.93 }],
	},
});
