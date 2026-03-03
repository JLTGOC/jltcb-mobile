import { Inbox } from "@/src/types/chats";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function InboxListItem({
  image_path,
  time,
  unread_count,
  title,
  last_message,
}: Inbox) {
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
        <Text>{time}</Text>
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
