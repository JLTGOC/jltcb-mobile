import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import type { Inbox } from "@/src/types/chats";
import { formatInboxItemTime } from "@/src/utils/chatTimeFormatter";

import type { Inbox } from "@/types/chats";
import { formatInboxItemTime } from "@/utils/chatTimeFormatter";

export default function InboxListItem({
	image_path,
	time,
	unread_count,
	title,
	last_message,
}: Inbox) {
<<<<<<< HEAD
	const formattedLastMessageTime = time ? formatInboxItemTime(time) : "";
=======
  const formattedLastMessageTime = time ? formatInboxItemTime(time) : "";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

	return (
		<View style={styles.container}>
			{image_path ? (
				<Avatar.Image size={48} source={{ uri: image_path }} />
			) : (
				<Avatar.Text size={48} label="GC" />
			)}
			<View style={styles.content}>
				<Text numberOfLines={1} variant="titleMedium">
					{title}
				</Text>
				<Text numberOfLines={1}>{last_message}</Text>
			</View>
			<View style={styles.details}>
				<Text>{formattedLastMessageTime}</Text>
				{unread_count ? (
					<Text style={styles.unreadCount}>{unread_count}</Text>
				) : (
					<Text> </Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 12,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		gap: 2,
	},
	details: {
		justifyContent: "center",
		alignItems: "flex-end",
		gap: 4,
	},
	unreadCount: {
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 2,
		backgroundColor: "#4A7AFF",
	},
});
